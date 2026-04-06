/**
 * batch-coordinator.js — Orchestrate batch NFT scanning.
 *
 * For each selected NFT:
 *   1. Extract best IPFS CID (metadata CID)
 *   2. Run existing Phase 1-5 scanner (reuse infrastructure)
 *   3. Collect results + build summary
 *   4. Persist progress via job-store
 */

import { scan } from '../ipfs/scanner.js'
import { updateJob } from '../ipfs/job-store.js'
import { extractMetadataCID } from './ipfs-filter.js'

/**
 * Normalize a creators field to a readable string.
 * Tezos on-chain metadata stores creators as an array of tz-addresses.
 * When those are the only values, join them; otherwise use as-is.
 * @param {any} value
 * @returns {string}
 */
function normalizeCreators(value) {
  if (!value) return ''
  if (typeof value === 'string') return value.trim()
  if (Array.isArray(value)) return value.map((v) => String(v).trim()).filter(Boolean).join(', ')
  return String(value).trim()
}

/**
 * @typedef {{
 *   nftId: string,
 *   name: string,
 *   chain: string,
 *   contract: string,
 *   tokenId: string,
 *   metadataCID: string,
 *   scan: import('../ipfs/scanner.js').ScanResult,
 *   status: 'success',
 * } | {
 *   nftId: string,
 *   name: string,
 *   chain: string,
 *   status: 'error',
 *   error: string,
 * } | {
 *   nftId: string,
 *   status: 'skipped',
 *   reason: string,
 * }} NFTScanResult
 */

/**
 * ✅ Scan a batch of NFTs, tracking progress via the job store.
 *
 * @param {string} jobId
 * @param {Array} nfts - Enriched NFT objects (from ipfs-filter.js)
 * @returns {Promise<{results: NFTScanResult[], summary: object}>}
 */
export async function scanNFTBatch(jobId, nfts) {
  await updateJob(jobId, {
    status: 'scanning',
    progress: { current: 0, total: nfts.length },
  })

  /** @type {NFTScanResult[]} */
  const results = []

  for (let i = 0; i < nfts.length; i++) {
    const nft = nfts[i]

    // ✅ Progress update (non-blocking)
    updateJob(jobId, {
      progress: { current: i, total: nfts.length },
    }).catch(() => {})

    try {
      // Get the CID to scan (pre-computed during enrichment, or compute now)
      const metadataCID = nft.metadataCID || extractMetadataCID(nft)

      // ✅ Tezos-aware fallback chain:
      // metadata.uri (JSON source) > tokenURI > displayUri > artifactUri > thumbnailUri > image
      const fallbackCandidate =
        nft.metadata?.uri ||
        nft.tokenURI ||
        nft.metadata?.token_uri ||
        nft.metadata?.tokenURI ||
        nft.metadata?.displayUri ||
        nft.metadata?.artifactUri ||
        nft.metadata?.thumbnailUri ||
        nft.image ||
        nft.metadata?.image ||
        null

      const scanTarget = metadataCID || fallbackCandidate

      if (!scanTarget) {
        results.push({
          nftId: nft.id,
          name: nft.name,
          chain: nft.chain,
          status: 'skipped',
          reason: 'Geen IPFS CID gevonden',
        })
        continue
      }

      // ✅ Reuse Phase 1-5 scanner infrastructure
      const scanResult = await scan(scanTarget)

      // ✅ Merge on-chain metadata as fallback when the scanner finds an empty result.
      // This happens when the scan target is a binary (e.g. a JPEG artifact) instead
      // of the metadata JSON, or when the gateway returns no parseable JSON.
      const scannedMeta = scanResult.metadata
      if (!scannedMeta.title && !scannedMeta.description && nft.metadata) {
        const onChain = nft.metadata
        if (!scannedMeta.title)       scannedMeta.title       = onChain.name        || onChain.title       || ''
        if (!scannedMeta.artists)     scannedMeta.artists     = normalizeCreators(onChain.creators || onChain.creator || onChain.artist || '')
        if (!scannedMeta.description) scannedMeta.description = onChain.description || ''
        if (!scannedMeta.image) {
          scannedMeta.image =
            onChain.displayUri   ||
            onChain.artifactUri  ||
            onChain.thumbnailUri ||
            onChain.image        ||
            null
        }
        if (!scannedMeta.thumbnail) {
          scannedMeta.thumbnail = onChain.thumbnailUri || onChain.thumbnail || null
        }
      }

      // Safety net: when the scanner found <=1 node (binary artifact scanned
      // directly — no child references), inject all known media CIDs so the
      // export always contains every archivable CID for this NFT.
      //
      // Source priority:
      //   1. nft.formatUris — populated from formats[] by tezos-fetcher (most complete)
      //   2. on-chain fields — artifactUri / displayUri / thumbnailUri / image
      if (Object.keys(scanResult.nodes).length <= 1) {
        const uriSources = [
          // Tezos formats[] — most complete source (injected by tezos-fetcher)
          ...(Array.isArray(nft.formatUris) ? nft.formatUris.map((uri) => ({ uri, name: 'format' })) : []),
          // Tezos on-chain fields
          { uri: nft.metadata?.artifactUri,   name: 'artifact'   },
          { uri: nft.metadata?.displayUri,    name: 'display'    },
          { uri: nft.metadata?.thumbnailUri,  name: 'thumbnail'  },
          // Ethereum / universal fields
          { uri: nft.metadata?.image,         name: 'image'      },
          { uri: nft.metadata?.image_url,     name: 'image'      },
          { uri: nft.metadata?.animation_url, name: 'animation'  },
        ]
        for (const { uri, name } of uriSources) {
          if (!uri || typeof uri !== 'string') continue
          const stripped = uri.startsWith('ipfs://') ? uri.slice('ipfs://'.length) : uri
          const cid = stripped.split('/')[0]
          if (!cid) continue
          const canonical = `ipfs://${cid}`
          if (scanResult.nodes[canonical]) continue
          scanResult.nodes[canonical] = {
            cid,
            path: '',
            canonical,
            name,
            kind: 'binary',
            contentType: '',
            size: 0,
            url: null,
            children: [],
            depth: 1,
            error: null,
          }
        }
      }

      results.push({
        nftId: nft.id,
        name: nft.name,
        chain: nft.chain,
        contract: nft.contract,
        tokenId: nft.tokenId,
        metadataCID: metadataCID || null,
        // ✅ Preserve raw on-chain metadata for mediaUris extraction in export-builder
        rawMetadata: nft.metadata || null,
        scan: scanResult,
        status: 'success',
      })
    } catch (err) {
      results.push({
        nftId: nft.id,
        name: nft.name || nft.id,
        chain: nft.chain,
        status: 'error',
        error: err?.message || 'Onbekende fout',
      })
    }
  }

  // ✅ Build summary
  const summary = {
    totalNFTs: nfts.length,
    successful: results.filter((r) => r.status === 'success').length,
    failed: results.filter((r) => r.status === 'error').length,
    skipped: results.filter((r) => r.status === 'skipped').length,
    totalFiles: results.reduce(
      (sum, r) => sum + (r.status === 'success' ? (r.scan?.summary?.totalFiles || 0) : 0),
      0
    ),
    totalBytes: results.reduce(
      (sum, r) => sum + (r.status === 'success' ? (r.scan?.summary?.totalBytes || 0) : 0),
      0
    ),
  }

  // ✅ Persist final result
  await updateJob(jobId, {
    status: 'ready',
    progress: { current: nfts.length, total: nfts.length },
    result: { results: serializeResults(results), summary },
  })

  return { results, summary }
}

/**
 * Strip bytes from scan results before storing to disk.
 * (Same pattern as scanner.js serializeForStorage)
 *
 * @param {NFTScanResult[]} results
 * @returns {NFTScanResult[]}
 */
function serializeResults(results) {
  return results.map((r) => {
    if (r.status !== 'success') return r

    const nodes = {}
    for (const [key, node] of Object.entries(r.scan?.nodes || {})) {
      nodes[key] = {
        cid: node.cid,
        path: node.path,
        canonical: node.canonical,
        name: node.name,
        kind: node.kind,
        contentType: node.contentType,
        size: node.size,
        url: node.url,
        children: node.children,
        depth: node.depth,
        error: node.error,
        // ⚠️ bytes/text/json intentionally omitted for storage
      }
    }

    return {
      ...r,
      // ✅ rawMetadata preserved for mediaUris in manifest export
      rawMetadata: r.rawMetadata || null,
      scan: {
        rootCid: r.scan.rootCid,
        nodes,
        metadata: r.scan.metadata,
        summary: r.scan.summary,
      },
    }
  })
}
