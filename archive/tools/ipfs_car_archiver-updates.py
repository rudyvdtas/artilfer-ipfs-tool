#!/usr/bin/env python3
"""
IPFS CAR Archiver — correct implementation
==========================================

Probleem met het oude script
-----------------------------
Het oude script:
  1. Downloadt bestandsbytes via een gateway (bijv. https://ipfs.io/ipfs/<CID>)
  2. Berekent zelf een nieuwe CID over die bytes (raw sha256)
  3. Schrijft die bytes + nieuw-berekende CID als één block in de CAR

Dit is fout om twee redenen:
  a) IPFS-bestanden > ~256 KB worden intern opgesplitst in meerdere
     UnixFS DAG-blokken (chunks van 256 KB). De gateway levert je de
     geassembleerde bytes, maar NIET de losse onderliggende blocks.
  b) Elke block in een correcte IPFS CAR is protobuf-gewrapped (UnixFS),
     dus de CID over raw bytes ≠ de originele IPFS CID.

Waarom ipfs.io niet werkt voor ?format=car
------------------------------------------
ipfs.io is een "trusted" (deserializing) gateway en blokkeert CAR-requests
met HTTP 403. Je hebt een "trustless" gateway nodig die expliciet
application/vnd.ipld.car ondersteunt.

Correcte gateway: https://trustless-gateway.link
  - Speciaal gebouwd voor verifieerbare CAR/raw-block responses
  - Gehost door de IPFS Foundation
  - Ondersteunt ?format=car + Accept: application/vnd.ipld.car

Correcte aanpak
---------------
Gebruik ?format=car op trustless-gateway.link. Dit geeft de volledige
DAG voor die CID terug als CARv1, inclusief:
  - alle onderliggende chunk-blokken (ook voor bestanden > 256 KB)
  - de originele CIDs (niet herberekend)
  - de originele UnixFS/protobuf-structuur

Daarna plakken we alle ontvangen CAR-bestanden samen tot één groot CAR,
met de root-CID van het hele project als header.

Gebruik
-------
  python3 ipfs_car_archiver.py \
      --json   first-supper.json \
      --output first-supper-full.car

  # Standaard gateway is trustless-gateway.link (aanbevolen).
  # Alternatief: eigen Kubo node op localhost
  python3 ipfs_car_archiver.py \
      --json   first-supper.json \
      --output first-supper-full.car \
      --gateway http://localhost:8080

Optioneel:
  --gateway  IPFS trustless gateway URL
             (standaard: https://trustless-gateway.link)
  --timeout  Timeout per request in seconden (standaard: 120)
  --retries  Aantal pogingen per CID bij fout (standaard: 3)

NIET gebruiken als gateway
  ✗ https://ipfs.io       — trusted gateway, blokkeert ?format=car met 403
  ✗ https://dweb.link     — idem, trusted/deserializing gateway
"""

import argparse
import json
import struct
import sys
import time
import urllib.request
import urllib.error
from pathlib import Path


# ---------------------------------------------------------------------------
# CAR v1 helpers
# ---------------------------------------------------------------------------

def encode_varint(n: int) -> bytes:
    """Encode an unsigned integer as a protobuf/IPLD varint."""
    buf = []
    while True:
        b = n & 0x7F
        n >>= 7
        if n:
            buf.append(b | 0x80)
        else:
            buf.append(b)
            break
    return bytes(buf)


def decode_varint(data: bytes, offset: int = 0):
    """Decode a varint from bytes, return (value, new_offset)."""
    result = 0
    shift = 0
    while True:
        b = data[offset]
        offset += 1
        result |= (b & 0x7F) << shift
        if not (b & 0x80):
            break
        shift += 7
    return result, offset


def read_varint_from_file(f):
    """Read one varint from an open binary file. Returns None at EOF."""
    result = 0
    shift = 0
    while True:
        b = f.read(1)
        if not b:
            return None
        byte = b[0]
        result |= (byte & 0x7F) << shift
        if not (byte & 0x80):
            break
        shift += 7
    return result


def build_car_header(root_cid_bytes: bytes) -> bytes:
    """
    Build a CARv1 header for a single root CID.

    Header CBOR structure: {version: 1, roots: [<cid tag>]}
    The CID is wrapped in a CBOR tag 42 with prefix 0x00.
    """
    # CBOR encoding van {"version": 1, "roots": [tag(42, bytes(0x00 + cid))]}
    # We schrijven dit handmatig omdat we geen cbor2 hebben.
    #
    # CBOR map met 2 entries: a2
    # key "roots" (5 bytes): 65726f6f7473
    # value: array van 1 element (81), tag 42 (d82a),
    #        bytes van lengte 1+34=35: 5823, 0x00 + cid_bytes (34 bytes)
    # key "version" (7 bytes): 6776657273696f6e
    # value: 1 (01)

    cid_with_prefix = b'\x00' + root_cid_bytes  # multibase identity prefix

    # CBOR: tag(42) = d8 2a
    # CBOR bytes van len 35: 58 23
    tagged_cid = (
        b'\xd8\x2a'              # tag 42
        b'\x58\x23'              # bytes(35)
        + cid_with_prefix        # 0x00 + 34-byte CIDv0
    )

    # CBOR array[1]
    roots_array = b'\x81' + tagged_cid

    # CBOR text "roots" = 65 72 6f 6f 74 73 (len=5 → 0x65)
    key_roots = b'\x65roots'
    # CBOR text "version" = 67 76 65 72 73 69 6f 6e (len=7 → 0x67)
    key_version = b'\x67version'
    # CBOR uint 1 = 0x01
    val_version = b'\x01'

    # CBOR map met 2 entries: 0xa2
    header_cbor = b'\xa2' + key_roots + roots_array + key_version + val_version

    return encode_varint(len(header_cbor)) + header_cbor


# ---------------------------------------------------------------------------
# Gateway fetch
# ---------------------------------------------------------------------------

def fetch_car_for_cid(cid: str, gateway: str, timeout: int, retries: int) -> bytes:
    """
    Fetch the complete DAG-CAR for a single CID from a trustless gateway.

    Vereisten voor de gateway:
      - Moet ?format=car ondersteunen (trustless gateway, NIET trusted/deserializing)
      - Aanbevolen: https://trustless-gateway.link
      - NIET: https://ipfs.io of https://dweb.link (geven HTTP 403 op CAR requests)

    De Accept header is verplicht voor trustless gateways per IPFS spec.
    """
    url = f"{gateway.rstrip('/')}/ipfs/{cid}?format=car"

    for attempt in range(1, retries + 1):
        try:
            req = urllib.request.Request(
                url,
                headers={
                    "Accept": "application/vnd.ipld.car",
                },
            )
            with urllib.request.urlopen(req, timeout=timeout) as resp:
                content_type = resp.headers.get("Content-Type", "")
                if "car" not in content_type and attempt == 1:
                    print(f"    Waarschuwing: onverwacht Content-Type: {content_type!r}", file=sys.stderr)
                return resp.read()
        except urllib.error.HTTPError as e:
            print(f"    HTTP {e.code} op poging {attempt}/{retries}: {url}", file=sys.stderr)
            if e.code == 403:
                print(
                    "    → 403 Forbidden: deze gateway ondersteunt geen ?format=car.\n"
                    "      Gebruik --gateway https://trustless-gateway.link",
                    file=sys.stderr,
                )
                raise  # Geen zin om te retrien bij 403
            if attempt == retries:
                raise
            time.sleep(2 ** attempt)
        except Exception as e:
            print(f"    Fout op poging {attempt}/{retries}: {e}", file=sys.stderr)
            if attempt == retries:
                raise
            time.sleep(2 ** attempt)


# ---------------------------------------------------------------------------
# CAR merge
# ---------------------------------------------------------------------------

def iter_car_blocks(car_bytes: bytes):
    """
    Yield (cid_bytes, data_bytes) voor elk block in een CARv1 byte-string.
    Slaat de header over.
    """
    offset = 0

    # Lees header
    header_len, offset = decode_varint(car_bytes, offset)
    offset += header_len  # sla header CBOR over

    while offset < len(car_bytes):
        if offset >= len(car_bytes):
            break
        block_len, offset = decode_varint(car_bytes, offset)
        if block_len == 0:
            break
        block_data = car_bytes[offset:offset + block_len]
        offset += block_len

        # CIDv0 is altijd 34 bytes: [0x12, 0x20, <32 bytes digest>]
        # CIDv1 kan langer zijn — we lezen de lengte uit de bytes zelf.
        # Heuristiek: als eerste byte 0x12 en tweede 0x20 → CIDv0 (34 bytes).
        # Anders: CIDv1, lees versie+codec+multihash via varint.
        cid_bytes, data_bytes = split_cid_from_block(block_data)
        yield cid_bytes, data_bytes


def split_cid_from_block(block_data: bytes):
    """
    Splits een CAR-block in (cid_bytes, payload_bytes).

    CIDv0: vaste lengte 34 bytes (0x12 0x20 + 32 bytes sha256).
    CIDv1: versie-varint + codec-varint + multihash.
    """
    if len(block_data) < 2:
        raise ValueError("Block te kort")

    if block_data[0] == 0x12 and block_data[1] == 0x20:
        # CIDv0
        return block_data[:34], block_data[34:]

    # CIDv1: lees versie
    version, pos = decode_varint(block_data, 0)
    if version == 1:
        # codec varint
        _, pos = decode_varint(block_data, pos)
        # multihash: functie-code + lengte + digest
        _, pos = decode_varint(block_data, pos)   # hash function code
        digest_len, pos = decode_varint(block_data, pos)
        pos += digest_len                          # digest bytes
        return block_data[:pos], block_data[pos:]

    raise ValueError(f"Onbekende CID-versie: {version}")


def merge_cars(root_cid_bytes: bytes, car_chunks: list[bytes]) -> bytes:
    """
    Combineer meerdere CAR-chunks tot één CARv1 met de gegeven root.
    Dedupliceert blocks op basis van CID.
    """
    seen_cids = set()
    all_blocks = []

    for chunk in car_chunks:
        for cid_bytes, data_bytes in iter_car_blocks(chunk):
            cid_key = cid_bytes  # bytes zijn hashable
            if cid_key not in seen_cids:
                seen_cids.add(cid_key)
                # Block = varint(len(cid+data)) + cid + data
                payload = cid_bytes + data_bytes
                block_entry = encode_varint(len(payload)) + payload
                all_blocks.append(block_entry)

    header = build_car_header(root_cid_bytes)
    return header + b''.join(all_blocks)


# ---------------------------------------------------------------------------
# Base58 decode (voor het omzetten van Qm... CID naar bytes)
# ---------------------------------------------------------------------------

BASE58_ALPHABET = b'123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz'

def base58_decode(s: str) -> bytes:
    """Decode een Base58-encoded string naar bytes."""
    alphabet = BASE58_ALPHABET
    n = 0
    for char in s.encode():
        n = n * 58 + alphabet.index(char)
    result = n.to_bytes((n.bit_length() + 7) // 8, 'big') if n else b''
    pad = len(s) - len(s.lstrip('1'))
    return b'\x00' * pad + result


# ---------------------------------------------------------------------------
# Hoofd-logica
# ---------------------------------------------------------------------------

def main():
    parser = argparse.ArgumentParser(
        description="IPFS CAR Archiver — haalt volledige DAG op via ?format=car"
    )
    parser.add_argument("--json",    required=True,  help="Pad naar de archiver JSON (bijv. first-supper.json)")
    parser.add_argument("--output",  required=True,  help="Output .car bestand")
    parser.add_argument("--gateway",
        default="https://trustless-gateway.link",
        help="IPFS trustless gateway URL die ?format=car ondersteunt. "
             "Standaard: https://trustless-gateway.link  "
             "NIET gebruiken: https://ipfs.io (geeft 403)")
    parser.add_argument("--timeout", type=int, default=120,  help="Timeout per request (seconden)")
    parser.add_argument("--retries", type=int, default=3,    help="Pogingen per CID bij fout")
    args = parser.parse_args()

    # Waarschuw als de gebruiker toch ipfs.io of dweb.link probeert
    blocked_gateways = ["ipfs.io", "dweb.link"]
    if any(g in args.gateway for g in blocked_gateways):
        print(
            "FOUT: " + args.gateway + " ondersteunt geen ?format=car (HTTP 403).\n"
            "Gebruik: --gateway https://trustless-gateway.link\n"
            "Of lokale Kubo node: --gateway http://localhost:8080",
            file=sys.stderr,
        )
        sys.exit(1)

    # Laad JSON
    with open(args.json) as f:
        manifest = json.load(f)

    root_cid_str = manifest["root_cid"]
    files = manifest["files"]

    print(f"Root CID : {root_cid_str}")
    print(f"Bestanden: {len(files)}")
    print(f"Gateway  : {args.gateway}")
    print()

    root_cid_bytes = base58_decode(root_cid_str)

    # Stap 1: Haal voor elke unieke CID een correcte CAR op via ?format=car
    # De root CID is al opgenomen als file id=1, dus we hoeven geen
    # aparte call te doen — die bevat de root + alle children al als
    # DAG. Maar sommige gateways exporteren bij de root alleen de top-node.
    # Veiligst: haal elke CID individueel op.

    all_car_chunks = []
    total = len(files)

    for i, file_entry in enumerate(files, 1):
        cid = file_entry["cid"]
        name = file_entry["name"]
        size = file_entry["size"]
        print(f"[{i:3}/{total}] {cid}  ({size:>10,} bytes)  {name}")

        try:
            car_bytes = fetch_car_for_cid(cid, args.gateway, args.timeout, args.retries)
            all_car_chunks.append(car_bytes)
            print(f"          ✓ ontvangen: {len(car_bytes):,} bytes CAR")
        except Exception as e:
            print(f"          ✗ FOUT: {e}", file=sys.stderr)
            # Ga door met de rest; je kunt dit later retry-en

    # Stap 2: Merge alle CAR-chunks tot één groot CAR
    print()
    print("Samenvoegen van alle blocks...")
    merged = merge_cars(root_cid_bytes, all_car_chunks)

    # Stap 3: Schrijf output
    output_path = Path(args.output)
    output_path.write_bytes(merged)

    size_mb = len(merged) / 1024 / 1024
    print(f"✓ Geschreven: {output_path}  ({size_mb:.1f} MB)")


if __name__ == "__main__":
    main()
