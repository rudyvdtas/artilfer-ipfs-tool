import { canonicalizeReference } from './reference.js'
import { discoverReferences } from './discover.js'
import { parseSeeds } from './seeds.js'

const cases = [
  { name: 'json object input', input: { ipfsHash: 'ipfs://bafybeigdyrztx3x3x3x3x3x3x3x3x3x3x3x3x3x3x3x3x3x3x3x3x3x3x3x3' } },
  { name: 'nested layout states options uri', input: { layout: { layers: [{ states: { options: [{ uri: 'ipfs://bafybeigdyrztx3x3x3x3x3x3x3x3x3x3x3x3x3x3x3x3x3x3x3x3x3x3x3x3/option.json' }] } }] } } },
  { name: 'async attributes nested object', input: { metadata: { 'async-attributes': [{ external_url: 'https://example.com/ipfs/bafybeigdyrztx3x3x3x3x3x3x3x3x3x3x3x3x3x3x3x3x3x3x3x3x3x3x3x3/asset.json' }] } } },
  { name: 'ipfs uri', input: 'ipfs://bafybeigdyrztx3x3x3x3x3x3x3x3x3x3x3x3x3x3x3x3x3x3x3x3x3x3x3x3/metadata.json' },
  { name: 'gateway url', input: 'https://example.com/ipfs/bafybeigdyrztx3x3x3x3x3x3x3x3x3x3x3x3x3x3x3x3x3x3x3x3x3x3x3x3/metadata.json' },
  { name: 'raw cid', input: 'bafybeigdyrztx3x3x3x3x3x3x3x3x3x3x3x3x3x3x3x3x3x3x3x3x3x3x3x3' },
  { name: 'malformed input', input: 'not a cid at all' },
]

for (const testCase of cases) {
  const seed = parseSeeds(typeof testCase.input === 'string' ? testCase.input : JSON.stringify(testCase.input))
  const refs = discoverReferences(testCase.input)
  const canonical = typeof testCase.input === 'string' ? canonicalizeReference(testCase.input) : null
  console.log(`${testCase.name}: seeds=${seed.length}, refs=${refs.length}, canonical=${canonical?.canonical || 'n/a'}`)
}
