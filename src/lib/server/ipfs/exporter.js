/**
 * exporter.js — CAR, CSV, and manifest.json export
 *
 * Consolidates: car-stream.js, report.js (export parts)
 * All export formats in one module.
 */

import { CarWriter } from '@ipld/car'
import { CID } from 'multiformats/cid'
import { Buffer } from 'node:buffer'
import { safeFilename } from './resolver.js'

/**
 * Generate a manifest.json from scan result.
 * @param {import('./scanner.js').ScanResult} result
 * @returns {string} JSON string
 */
export function exportManifest(result) {
  const nodes = Object.values(result.nodes || {})

  const manifest = {
    project: 'NFT Archive Assistant — Powered by ARTfilter',
    generated_at: new Date().toISOString(),
    root_cid: result.rootCid,
    metadata: result.metadata,
    summary: result.summary,
    files: nodes.map(node => ({
      cid: node.cid,
      path: node.path,
      canonical: node.canonical,
      depth: node.depth,
      name: node.name,
      kind: node.kind,
      content_type: node.contentType,
      size: node.size,
      children: node.children,
      error: node.error || null,
    })),
  }

  return JSON.stringify(manifest, null, 2)
}

/**
 * Generate a Pinata-compatible CSV for "Import from IPFS".
 * Format: hash,name (one row per unique CID).
 * Works for ALL scan types.
 *
 * The name column uses the real content-type to pick the correct
 * file extension (e.g. .png, .jpg, .mp4) instead of falling back
 * to the generic .txt that guessExtension() emits for unknown types.
 *
 * @param {import('./scanner.js').ScanResult} result
 * @returns {string} CSV string
 */
export function exportCsv(result) {
  const rows = ['hash,name']
  const seen = new Set()

  for (const node of Object.values(result.nodes || {})) {
    if (node.error) continue
    if (seen.has(node.cid)) continue
    seen.add(node.cid)

    const name = resolveNodeName(node)
    const safeName = /[,"]/.test(name) ? `"${name.replace(/"/g, '""')}"` : name
    rows.push(`${node.cid},${safeName}`)
  }

  return rows.join('\n')
}

/**
 * Derive a clean filename for a scan node.
 * Uses the actual content-type for the extension so images get .png/.jpg,
 * videos get .mp4, etc. — instead of the generic .txt fallback.
 *
 * @param {{ cid: string, name?: string, contentType?: string, kind?: string }} node
 * @returns {string}
 */
function resolveNodeName(node) {
  const contentType = String(node.contentType || '').toLowerCase()
  const ext = extensionFromContentType(contentType, node.kind)

  // Strip any previously guessed/wrong extension from the stored name
  const baseName = (node.name || node.cid.slice(0, 16))
    .replace(/\.(json|txt|bin|html|htm)$/i, '')
    .toLowerCase()

  return ext ? `${baseName}${ext}` : baseName
}

/**
 * Map a MIME content-type to a file extension.
 * Returns empty string for unknown types.
 *
 * @param {string} contentType
 * @param {string} [kind]
 * @returns {string}
 */
function extensionFromContentType(contentType, kind) {
  if (contentType.includes('json'))           return '.json'
  if (contentType === 'image/png')            return '.png'
  if (contentType === 'image/jpeg' ||
      contentType === 'image/jpg')            return '.jpg'
  if (contentType === 'image/gif')            return '.gif'
  if (contentType === 'image/webp')           return '.webp'
  if (contentType === 'image/svg+xml')        return '.svg'
  if (contentType === 'image/avif')           return '.avif'
  if (contentType === 'video/mp4')            return '.mp4'
  if (contentType === 'video/webm')           return '.webm'
  if (contentType === 'video/quicktime')      return '.mov'
  if (contentType === 'audio/mpeg')           return '.mp3'
  if (contentType === 'audio/wav')            return '.wav'
  if (contentType === 'audio/ogg')            return '.ogg'
  if (contentType === 'audio/flac')           return '.flac'
  if (contentType === 'model/gltf+json')      return '.gltf'
  if (contentType === 'model/gltf-binary')    return '.glb'
  if (contentType.startsWith('text/html'))    return '.html'
  if (contentType.startsWith('text/'))        return '.txt'
  // Fallback to kind when content-type is absent
  if (kind === 'json')   return '.json'
  if (kind === 'html')   return '.html'
  if (kind === 'text')   return '.txt'
  return ''
}

/**
 * Generate a streaming CAR file from scan result.
 * Uses @ipld/car CarWriter for block-by-block streaming.
 *
 * Reads bytes directly from result.nodes (the in-memory scan result).
 * Only nodes that have bytes fetched are included; nodes that failed
 * gateway fetches are skipped (their error is recorded in node.error).
 *
 * @param {import('./scanner.js').ScanResult} result
 * @returns {Promise<ReadableStream<Uint8Array>>}
 */
export async function exportCar(result) {
  const rootCid = CID.parse(result.rootCid)

  // Collect nodes that have bytes in memory (full in-memory scan result only)
  const files = Object.values(result.nodes || {}).filter(n => n.bytes && n.cid)

  if (files.length === 0) {
    throw new Error('No fetched file bytes available for CAR export. Re-scan may be needed.')
  }

  // Root node must be present
  const hasRoot = files.some(n => n.cid === result.rootCid)
  if (!hasRoot) {
    throw new Error(`Root CID ${result.rootCid} was not fetched. Re-scan may be needed.`)
  }

  const { writer, out } = CarWriter.create([rootCid])

  const stream = new ReadableStream({
    async start(controller) {
      const pump = (async () => {
        for await (const chunk of out) {
          controller.enqueue(chunk)
        }
        controller.close()
      })().catch(err => controller.error(err))

      try {
        for (const node of files) {
          const cid = CID.parse(node.cid)
          const bytes = node.bytes instanceof Uint8Array ? node.bytes : Buffer.from(node.bytes)
          await writer.put({ cid, bytes })
        }
        await writer.close()
        await pump
      } catch (err) {
        try { await writer.close() } catch { /* ignore */ }
        controller.error(err)
      }
    },
  })

  return stream
}

/**
 * Get a safe filename based on metadata title.
 * @param {import('./scanner.js').ScanResult} result
 * @param {string} extension
 * @returns {string}
 */
export function getExportFilename(result, extension) {
  const base = result.metadata?.title
    ? safeFilename(result.metadata.title)
    : 'archive'
  return `${base}.${extension}`
}
