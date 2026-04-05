/**
 * export-builder.js — Build manifest.json and ready2pin.csv exports
 * for NFT batch scan results.
 */

import { extensionFromContentType } from '$lib/server/ipfs/resolver.js'

/**
 * ✅ Build a manifest.json from a completed batch job result.
 *
 * Shape:
 * {
 *   exported: "ISO8601",
 *   version: "1.0",
 *   summary: { totalNFTs, successful, failed, skipped, totalFiles, totalBytes },
 *   nfts: [{ nftId, name, chain, contract, tokenId, metadataCID, scan: {...} }]
 * }
 *
 * @param {{ results: Array, summary: object }} jobResult
 * @returns {object}
 */
export function buildManifest(jobResult) {
  const { results = [], summary = {} } = jobResult

  return {
    exported: new Date().toISOString(),
    version: '1.0',
    generator: 'NFT Archive Assistant — ARTfilter',
    summary,
    nfts: results
      .filter((r) => r.status === 'success')
      .map((r) => ({
        nftId: r.nftId,
        name: r.name,
        chain: r.chain,
        contract: r.contract,
        tokenId: r.tokenId,
        metadataCID: r.metadataCID,
        scan: {
          rootCid: r.scan?.rootCid,
          metadata: r.scan?.metadata,
          summary: r.scan?.summary,
          nodeCount: Object.keys(r.scan?.nodes || {}).length,
          // ✅ Include resolved media URIs for quick access
          mediaUris: buildMediaUris(r),
        },
      })),
  }
}

/**
 * ✅ Build a Pinata-compatible ready2pin.csv from a completed batch job result.
 *
 * Format: hash,name  (Pinata "Import from IPFS" standard)
 * - One row per unique CID found across all successful NFT scans.
 * - Metadata CID and all child CIDs (images, media) are included.
 * - Duplicate CIDs across NFTs are deduplicated.
 *
 * @param {{ results: Array, summary: object }} jobResult
 * @returns {string} CSV string
 */
export function buildReadyToPinCSV(jobResult) {
  const { results = [] } = jobResult

  const escape = (v) => {
    const s = String(v ?? '')
    return /[,"\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s
  }

  const rows = ['hash,name']
  const seen = new Set()

  for (const r of results) {
    if (r.status !== 'success') continue

    // --- Metadata CID (root of the NFT scan) ---
    if (r.metadataCID && !seen.has(r.metadataCID)) {
      seen.add(r.metadataCID)
      // Use the NFT name as a human-readable label for the metadata CID
      const label = r.name ? escape(r.name) : ''
      rows.push(`${r.metadataCID},${label}`)
    }

    // --- All child CIDs discovered during the scan ---
    const nodes = r.scan?.nodes ?? {}
    for (const node of Object.values(nodes)) {
      if (!node.cid || node.error) continue
      if (seen.has(node.cid)) continue
      seen.add(node.cid)

      const name = resolveNodeName(node)
      rows.push(`${node.cid},${escape(name)}`)
    }
  }

  return rows.join('\n')
}

/**
 * Derive a clean filename for a scan node.
 * Uses the node's real content-type to pick the right extension,
 * and strips any wrongly guessed extension that was appended earlier.
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
 * ✅ Build a compact mediaUris object from a scan result.
 * Extracts artifact, display, thumbnail and animation URIs for quick access.
 *
 * @param {object} r - A successful NFT scan result
 * @returns {{ artifact: string|null, display: string|null, thumbnail: string|null, animation: string|null }}
 */
function buildMediaUris(r) {
  const meta = r.scan?.metadata || {}
  const rawMeta = r.rawMetadata || {}   // available if stored by batch-coordinator

  // ✅ From extracted metadata (resolver.js extractMetadata)
  const display    = rawMeta.displayUri   || rawMeta.display_uri    || meta.image      || null
  const artifact   = rawMeta.artifactUri  || rawMeta.artifact_uri   || null
  const thumbnail  = rawMeta.thumbnailUri || rawMeta.thumbnail_uri  || meta.thumbnail  || null
  const animation  = rawMeta.animation_url|| rawMeta.animationUrl   || null

  return {
    artifact:  artifact  || null,
    display:   display   || null,
    thumbnail: thumbnail || null,
    animation: animation || null,
  }
}

/**
 * Serialize manifest to JSON string.
 * @param {object} manifest
 * @returns {string}
 */
export function manifestToJSON(manifest) {
  return JSON.stringify(manifest, null, 2)
}
