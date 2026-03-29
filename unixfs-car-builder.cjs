function concatBytes(...chunks) {
  const totalLength = chunks.reduce((sum, chunk) => sum + chunk.length, 0)
  const output = new Uint8Array(totalLength)
  let offset = 0
  for (const chunk of chunks) {
    output.set(chunk, offset)
    offset += chunk.length
  }
  return output
}

function encodeVarint(value) {
  let current = BigInt(value)
  if (current < 0n) {
    throw new Error('Cannot encode negative values as varint')
  }

  const bytes = []
  while (current >= 0x80n) {
    bytes.push(Number((current & 0x7fn) | 0x80n))
    current >>= 7n
  }
  bytes.push(Number(current))
  return Uint8Array.from(bytes)
}

function encodeKey(fieldNumber, wireType) {
  return encodeVarint((BigInt(fieldNumber) << 3n) | BigInt(wireType))
}

function encodeVarintField(fieldNumber, value) {
  return concatBytes(encodeKey(fieldNumber, 0), encodeVarint(value))
}

function encodeBytesField(fieldNumber, bytes) {
  return concatBytes(encodeKey(fieldNumber, 2), encodeVarint(bytes.length), bytes)
}

function encodeUnixfsData({ type, data, fileSize, blockSizes = [] }) {
  const parts = [encodeVarintField(1, type)]

  if (data) {
    parts.push(encodeBytesField(2, data))
  }

  if (fileSize !== undefined) {
    parts.push(encodeVarintField(3, fileSize))
  }

  for (const blockSize of blockSizes) {
    parts.push(encodeVarintField(4, blockSize))
  }

  return concatBytes(...parts)
}

function makeUnixfsFileNode(dagPB, bytes) {
  return dagPB.encode(
    dagPB.prepare({
      Data: encodeUnixfsData({ type: 2, data: bytes, fileSize: bytes.length }),
      Links: [],
    }),
  )
}

function makeUnixfsDirNode(dagPB, links) {
  return dagPB.encode(
    dagPB.prepare({
      Data: encodeUnixfsData({ type: 1 }),
      Links: links,
    }),
  )
}

async function cidForBytes(CID, sha256, codecCode, bytes) {
  const digest = await sha256.digest(bytes)
  return CID.create(1, codecCode, digest)
}

const api = {
  concatBytes,
  encodeVarint,
  encodeKey,
  encodeVarintField,
  encodeBytesField,
  encodeUnixfsData,
  makeUnixfsFileNode,
  makeUnixfsDirNode,
  cidForBytes,
}

if (typeof module !== 'undefined') {
  module.exports = api
}

if (typeof exports !== 'undefined') {
  Object.assign(exports, api)
}
