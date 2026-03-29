import { describe, it, expect } from 'vitest'
import { CID } from 'multiformats/cid'
import { createCarStreamFromFiles, normalizeCarFile } from './car-stream'

describe('normalizeCarFile', () => {
  it('throws when cid is missing', () => {
    expect(() => normalizeCarFile({ path: 'a.txt', bytes: new Uint8Array([1]) })).toThrow(/missing cid/i)
  })

  it('throws when bytes are missing', () => {
    const cid = CID.parse('bafkreigh2akiscaildc4h4v7f3yn7x3m2l5r7e5v3r4xw3n6x5j6z6i4xq')
    expect(() => normalizeCarFile({ path: 'a.txt', cid, bytes: null })).toThrow(/missing bytes/i)
  })
})

describe('createCarStreamFromFiles', () => {
  it('creates a readable stream', async () => {
    const root = CID.parse('bafkreigh2akiscaildc4h4v7f3yn7x3m2l5r7e5v3r4xw3n6x5j6z6i4xq')
    const fileCid = CID.parse('bafkreihdwdcefgh4dqkjv67uzcmw7ojee6xedzdetojuzjevtenxquvyku')

    const stream = await createCarStreamFromFiles([
      {
        path: 'hello.txt',
        cid: fileCid,
        bytes: new Uint8Array([104, 101, 108, 108, 111]),
      },
    ], root)

    expect(stream).toBeInstanceOf(ReadableStream)
  })
})
