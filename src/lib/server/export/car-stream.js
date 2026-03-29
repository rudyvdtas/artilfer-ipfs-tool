import { CarWriter } from '@ipld/car'
import { Buffer } from 'node:buffer'

export function normalizeCarFile(file) {
  if (!file?.cid) {
    throw new Error(`CAR file entry is missing cid for path: ${file?.path || 'unknown'}`)
  }

  if (file.bytes === undefined || file.bytes === null) {
    throw new Error(`CAR file entry is missing bytes for path: ${file?.path || 'unknown'}`)
  }

  return {
    path: String(file.path || '').trim(),
    cid: file.cid,
    bytes: file.bytes instanceof Uint8Array ? file.bytes : Buffer.from(file.bytes),
  }
}

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
          await writer.put({
            cid: file.cid,
            bytes: file.bytes,
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
