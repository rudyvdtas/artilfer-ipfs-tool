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
 * Format: cid,name  (Pinata "Import from IPFS" standard)
 * - One row per unique CID found across all successful NFT scans.
 * - Metadata CID and all child CIDs (images, media) are included.
 * - Duplicate CIDs across NFTs are deduplicated.
 * - Collection NFTs (e.g. Async/SATS) keep their full ipfs://CID/path so
 *   each token gets its own row instead of collapsing to the shared root CID.
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

  const rows = ['cid,name']
  const seen = new Set()

  for (const r of results) {
    if (r.status !== 'success') continue

    // --- Metadata CID (root of the NFT scan) ---
    // Use the full canonical URI as the dedup key so collection tokens with
    // different sub-paths (e.g. /7/token.json vs /8/token.json) each get
    // their own row.  Strip only the ipfs:// scheme prefix for the CSV value;
    // keep the sub-path intact so Pinata can resolve the exact token file.
    const rawMeta = String(r.metadataCID ?? '').trim()
    if (rawMeta && !seen.has(rawMeta)) {
      seen.add(rawMeta)
      const cidValue = rawMeta.startsWith('ipfs://') ? rawMeta.slice('ipfs://'.length) : rawMeta
      if (cidValue) {
        const label = r.name ? escape(r.name) : ''
        rows.push(`${cidValue},${label}`)
      }
    }

    // --- All child CIDs discovered during the scan ---
    const nodes = r.scan?.nodes ?? {}
    for (const node of Object.values(nodes)) {
      if (!node.cid || node.error) continue
      const normalizedCid = normalizeCid(node.cid)
      if (!normalizedCid || seen.has(normalizedCid)) continue
      seen.add(normalizedCid)

      const name = resolveNodeName(node)
      rows.push(`${normalizedCid},${escape(name)}`)
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

/**
 * Normalize a CID string - remove ipfs:// prefix and any paths
 * Similar to the normalizeCid function in exporter.js
 * @param {string} value
 * @returns {string}
 */
function normalizeCid(value) {
  const s = String(value ?? '').trim()
  if (!s) return ''
  
  // Remove ipfs:// prefix
  let cidPart = s.startsWith('ipfs://') ? s.slice('ipfs://'.length) : s
  
  // Remove everything after the first / (paths like /metadata.json, /3.json, etc.)
  const slashIndex = cidPart.indexOf('/')
  if (slashIndex !== -1) {
    cidPart = cidPart.slice(0, slashIndex)
  }
  
  return cidPart
}

