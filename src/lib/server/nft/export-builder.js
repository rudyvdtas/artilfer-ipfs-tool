/**
 * export-builder.js — Build manifest.json and ready2pin.csv exports
 * for NFT batch scan results.
 */

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
 * Columns: NFT ID, Name, Chain, Contract, Token ID, Metadata CID,
 *          Total Files, Total Bytes, Status
 *
 * @param {{ results: Array, summary: object }} jobResult
 * @returns {string} CSV string
 */
export function buildReadyToPinCSV(jobResult) {
  const { results = [] } = jobResult

  const headers = [
    'NFT ID',
    'Name',
    'Chain',
    'Contract',
    'Token ID',
    'Metadata CID',
    'Total Files',
    'Total Bytes',
    'Status',
  ]

  const rows = results.map((r) => {
    if (r.status === 'error') {
      return [r.nftId, r.name || '', r.chain || '', '', '', '', '0', '0', `Error: ${r.error}`]
    }
    if (r.status === 'skipped') {
      return [r.nftId, '', r.chain || '', '', '', '', '0', '0', `Skipped: ${r.reason}`]
    }
    return [
      r.nftId,
      r.name,
      r.chain,
      r.contract,
      r.tokenId,
      r.metadataCID,
      r.scan?.summary?.totalFiles ?? 0,
      r.scan?.summary?.totalBytes ?? 0,
      'Success',
    ]
  })

  const escape = (v) => {
    const s = String(v ?? '')
    return /[,"\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s
  }

  const lines = [
    headers.map(escape).join(','),
    ...rows.map((row) => row.map(escape).join(',')),
  ]

  return lines.join('\n')
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
