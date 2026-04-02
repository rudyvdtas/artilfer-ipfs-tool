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
  const manifest = {
    project: 'NFT Archive Assistant — Powered by ARTfilter',
    generated_at: new Date().toISOString(),
    root_cid: result.rootCid,
    metadata: result.metadata,
    summary: result.summary,
    files: result.tree.map(node => ({
      id: node.id,
      parent_id: node.parentId,
      depth: node.depth,
      cid: node.cid,
      path: node.path,
      name: node.name,
      kind: node.kind,
      content_type: node.contentType,
      size: node.size,
      status: node.status,
      children: node.children,
    })),
  }

  return JSON.stringify(manifest, null, 2)
}

/**
 * Generate a Pinata-compatible CSV for "Import from IPFS".
 * Format: hash,name (one row per unique CID).
 * Works for ALL scan types (not just async).
 * @param {import('./scanner.js').ScanResult} result
 * @returns {string} CSV string
 */
export function exportCsv(result) {
  const rows = ['hash,name']
  const seen = new Set()
  const labelMap = result.asyncLabelMap || {}

  for (const node of result.tree) {
    if (node.status !== 'ok') continue
    if (seen.has(node.cid)) continue
    seen.add(node.cid)

    // Prefer async-art semantic label, fall back to tree node name
    const name = labelMap[node.cid] || node.name || `${node.cid.slice(0, 12)}...`
    // Escape CSV: wrap in quotes if contains comma or quote
    const safeName = /[,"]/.test(name) ? `"${name.replace(/"/g, '""')}"` : name
    rows.push(`${node.cid},${safeName}`)
  }

  return rows.join('\n')
}

/**
 * Generate a streaming CAR file from scan result.
 * Uses @ipld/car CarWriter for block-by-block streaming.
 * @param {import('./scanner.js').ScanResult} result
 * @returns {Promise<ReadableStream<Uint8Array>>}
 */
export async function exportCar(result) {
  const rootCid = CID.parse(result.rootCid)

  // Collect files that have bytes (from in-memory scan result)
  const files = result.archiveFiles.filter(f => f.bytes && f.cid)

  if (files.length === 0) {
    throw new Error('No files available for CAR export. Re-scan may be needed.')
  }

  // Ensure rootCid is in the file set
  const hasRoot = files.some(f => f.cid === result.rootCid)
  if (!hasRoot) {
    throw new Error(`Root CID ${result.rootCid} is not in the archive file set.`)
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
        for (const file of files) {
          const cid = CID.parse(file.cid)
          const bytes = file.bytes instanceof Uint8Array ? file.bytes : Buffer.from(file.bytes)
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
