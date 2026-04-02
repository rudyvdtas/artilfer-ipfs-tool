# Using ipfs-car-builder.js

## What It Does

Exports IPFS collections to a **properly structured directory** with:
- ✓ Organized folder structure (metadata/, assets/)
- ✓ Complete metadata files (token.json, export-manifest.json)
- ✓ CSV inventory preserved
- ✓ All assets downloaded and stored locally
- ✓ Ready to re-pin to Pinata or IPFS

## Usage

```bash
node ipfs-car-builder.js <root-cid> <csv-file> <output-dir>
```

### Example: First Supper

```bash
node ipfs-car-builder.js \
  Qmaje8byBxmFTHDjCvDYLy1NPZkUX1Etx1agDw5HxNqtef \
  "./files to examine/first-supper(1).csv" \
  ./first-supper-archive
```

### Example: Any Other Project

```bash
node ipfs-car-builder.js \
  YOUR_ROOT_CID \
  ./your-inventory.csv \
  ./your-output-dir
```

## Output Structure

```
output-dir/
├── metadata/
│   ├── token.json              ← Project manifest
│   ├── export-manifest.json    ← Statistics & CIDs
│   └── inventory.csv           ← Asset list
├── assets/                     ← All 117 assets
│   ├── first-supper-main-image.bin
│   ├── first-supper-layer-1-classic.bin
│   ├── first-supper-layer-2-...
│   └── [more assets]
└── _INFO.txt                   ← Export summary
```

## Requirements

```bash
npm install csv-parse node-fetch @ipld/car multiformats blockstore-core
```

## Re-Pinning to Pinata

### Option 1: IPFS CLI (Local Daemon)

```bash
ipfs daemon &
ipfs add -r first-supper-archive/
```

### Option 2: Pinata CLI

```bash
npm install -g @pinata/cli
pinata login
pinata pin add -r first-supper-archive/
```

### Option 3: Pinata Web UI

1. Go to https://app.pinata.cloud/pinmanager
2. Click "Upload" → Select "Folder"
3. Choose: `first-supper-archive/`
4. **Important**: Enable "Keep directory structure"
5. Click "Upload"

### Option 4: Pinata REST API

```bash
curl -X POST https://api.pinata.cloud/pinning/pinFileToIPFS \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -F "file=@first-supper-archive/" \
  -F "pinataOptions={\"wrapWithDirectory\":true}"
```

## What Gets Downloaded

All assets are downloaded from IPFS gateways:
- w3s.link (primary)
- nftstorage.link
- ipfs.filebase.io
- ipfs.io
- cloudflare-ipfs.com
- dweb.link
- gateway.pinata.cloud

If one gateway fails, it automatically retries with the next.

## Metadata Files Generated

### token.json
```json
{
  "project": "IPFS Archive Export",
  "rootCID": "Qmaje8...",
  "exportedAt": "2026-04-02T13:51:13.928Z",
  "totalAssets": 117,
  "totalSize": 110288281,
  "assets": [...]
}
```

### export-manifest.json
Contains:
- Export date and time
- Root CID
- Statistics (success/fail counts)
- List of all assets with:
  - Original IPFS CID
  - Local file path
  - File size

### _INFO.txt
Human-readable export summary with download statistics.

## Verifying the Export

```bash
# Check metadata was created
ls -la first-supper-archive/metadata/

# View statistics
cat first-supper-archive/metadata/export-manifest.json | jq '.stats'

# Count assets
find first-supper-archive/assets -type f | wc -l

# Check total size
du -sh first-supper-archive/
```

## For Other Projects

This tool works with **any IPFS project** that has a CSV inventory in this format:

```csv
hash,name
QmXXXXXXXXXXX,Asset Name 1
QmYYYYYYYYYYY,Asset Name 2
QmZZZZZZZZZZZ,Asset Name 3
```

Just change the CID, CSV file, and output directory!

## Troubleshooting

**Q: "CSV file not found"**  
A: Check the path is correct. Use absolute path if relative doesn't work.

**Q: "Downloads are slow"**  
A: Script retries across multiple gateways. Some IPFS nodes may be slow. Try again later.

**Q: "All gateways failed"**  
A: The IPFS content may not be available on public gateways. Verify the CID is correct.

**Q: "File sizes don't match"**  
A: Check export-manifest.json for actual sizes and compare with original IPFS nodes.

## Output Example

First Supper export generated:
- **Size**: 105.18 MB
- **Assets**: 117/117 (100% success)
- **Metadata files**: 4 (token.json, export-manifest.json, inventory.csv, _INFO.txt)
- **Ready to re-pin**: Yes

---

This tool creates a **merkle-tree-preserving directory** that can be re-pinned to IPFS/Pinata with the same content addressing structure.
