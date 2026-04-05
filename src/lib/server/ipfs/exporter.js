/**
 * exporter.js — CAR, CSV, and manifest.json export
 *
 * Consolidates: car-stream.js, report.js (export parts)
 * All export formats in one module.
 */

import { CID } from 'multiformats/cid'
import { safeFilename, extensionFromContentType } from './resolver.js'
import { exportCarFromKubo } from './kubo-config.js'

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
  const ext = extensionFromContentType(node.contentType, node.kind)
  const baseName = (node.name || node.cid.slice(0, 16))
    .replace(/\.(json|txt|bin|html|htm)$/i, '')
    .toLowerCase()
  return ext ? `${baseName}${ext}` : baseName
}

/**
 * Generate a streaming CARv1 file for the given root CID via Kubo dag/export.
 *
 * Kubo fetches all DAG blocks recursively from the IPFS p2p network,
 * preserving the original block CIDs and UnixFS structure. The stream
 * is piped directly from Kubo to the caller without buffering in memory.
 *
 * @param {string} rootCid
 * @returns {Promise<ReadableStream<Uint8Array>>}
 */
export async function exportCar(rootCid) {
  // Validate the CID is parseable before sending it to Kubo
  CID.parse(rootCid)

  return exportCarFromKubo(rootCid)
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
