import { CarWriter } from '@ipld/car'
import { Buffer } from 'node:buffer'
import { fetchCid } from '../ipfs/resolver.js'

export function normalizeCarFile(file) {
  if (!file?.cid) {
    throw new Error(`CAR file entry is missing cid for path: ${file?.path || 'unknown'}`)
  }

  // ✅ Bytes now optional - will fetch from IPFS if not available
  return {
    path: String(file.path || '').trim(),
    cid: file.cid,
    bytes: file.bytes instanceof Uint8Array 
      ? file.bytes 
      : (file.bytes ? Buffer.from(file.bytes) : null),
  }
}

/**
 * Create CAR stream from files
 * Files can have pre-loaded bytes OR will be fetched from IPFS
 */
export async function createCarStreamFromFiles(files, rootCid) {
  const normalizedFiles = files.map(normalizeCarFile)
  const rootEntry = normalizedFiles.find((file) => file.cid.toString() === rootCid.toString())
  if (!rootEntry) {
    throw new Error('CAR export failed: rootCid is not present in the normalized file set.')
  }

  const { writer, out } = CarWriter.create([rootCid])

  return new ReadableStream({
    async start(controller) {
      const pump = (async () => {
        for await (const chunk of out) {
          controller.enqueue(chunk)
        }
        controller.close()
      })().catch((error) => {
        controller.error(error)
      })

      try {
        for (const file of normalizedFiles) {
          // ✅ NEW: Fetch from IPFS if bytes not available
          let bytes = file.bytes
          if (!bytes) {
            try {
              const fetched = await fetchCid(file.cid.toString())
              if (fetched.ok && fetched.bytes) {
                bytes = fetched.bytes
              } else {
                throw new Error(`Failed to fetch ${file.cid.toString()} from IPFS`)
              }
            } catch (err) {
              throw new Error(`CAR export: Could not fetch ${file.cid.toString()} - ${err?.message || 'unknown error'}`)
            }
          }

          await writer.put({
            cid: file.cid,
            bytes,
          })
        }
        await writer.close()
        await pump
      } catch (error) {
        try {
          await writer.close()
        } catch {
          // ignore close errors during failure path
        }
        controller.error(error)
      }
    },
  })
}
