/**
 * ipfs-filter.js — Detect and extract IPFS references from NFT objects.
 *
 * Provides:
 * - hasIPFS(nft)            → boolean
 * - extractIPFSCIDs(nft)   → string[]
 * - filterIPFSNFTs(nfts)   → NFT[]
 * - enrichWithIPFSInfo(nfts) → enriched NFT[]
 */

import { resolve } from '../ipfs/resolver.js'

/**
 * Check whether a single string value is an IPFS reference.
 * @param {any} value
 * @returns {boolean}
 */
function isIPFSString(value) {
  if (!value || typeof value !== 'string') return false
  const v = value.trim()
  return (
    v.startsWith('ipfs://') ||
    v.startsWith('ipns://') ||
    v.startsWith('/ipfs/') ||
    v.includes('/ipfs/') ||
    v.includes('ipfs.io/ipfs/') ||
    v.includes('gateway.pinata.cloud/ipfs/') ||
    v.includes('cloudflare-ipfs.com/ipfs/') ||
    /Qm[1-9A-HJ-NP-Za-km-z]{44}/.test(v) ||
    /bafy[a-z2-7]{20,}/.test(v)
  )
}

/**
 * Recursively collect all string values from an object/array (max depth).
 * @param {any} obj
 * @param {number} depth
 * @returns {string[]}
 */
function collectStrings(obj, depth = 0) {
  if (depth > 8) return []
  if (typeof obj === 'string') return [obj]
  if (Array.isArray(obj)) return obj.flatMap((v) => collectStrings(v, depth + 1))
  if (obj && typeof obj === 'object') {
    return Object.values(obj).flatMap((v) => collectStrings(v, depth + 1))
  }
  return []
}

/**
 * ✅ Check if an NFT has any IPFS-based content.
 *
 * Checks: tokenURI, image, and all metadata fields.
 *
 * @param {object} nft
 * @returns {boolean}
 */
export function hasIPFS(nft) {
  if (!nft) return false

  if (isIPFSString(nft.tokenURI)) return true
  if (isIPFSString(nft.contractTokenURI)) return true
  if (isIPFSString(nft.image)) return true
  if (isIPFSString(nft.thumbnail)) return true
  if (isIPFSString(nft.artifactUri)) return true
  if (isIPFSString(nft.metadata?.token_uri)) return true
  if (isIPFSString(nft.metadata?.tokenURI)) return true
  if (isIPFSString(nft.metadata?.image)) return true
  if (isIPFSString(nft.metadata?.artifactUri)) return true
  if (isIPFSString(nft.metadata?.displayUri)) return true
  if (isIPFSString(nft.metadata?.thumbnailUri)) return true
  if (isIPFSString(nft.metadata?.uri)) return true

  if (nft.metadata) {
    const strings = collectStrings(nft.metadata)
    if (strings.some(isIPFSString)) return true
  }

  return false
}

/**
 * ✅ Extract unique IPFS CIDs from an NFT.
 *
 * Searches: tokenURI, image, all metadata fields (recursively).
 * Uses the existing resolver.js for CID normalization.
 *
 * @param {object} nft
 * @returns {string[]} - Unique CID strings
 */
export function extractIPFSCIDs(nft) {
  if (!nft) return []

  const seen = new Set()

  // Collect all candidate strings
  const candidates = [
    nft.tokenURI,
    nft.contractTokenURI,
    nft.image,
    nft.thumbnail,
    nft.artifactUri,
    nft.metadata?.uri,
    nft.metadata?.token_uri,
    nft.metadata?.tokenURI,
    nft.metadata?.image,
    nft.metadata?.artifactUri,
    nft.metadata?.displayUri,
    nft.metadata?.thumbnailUri,
    ...collectStrings(nft.metadata || {}),
  ].filter(Boolean)

  for (const candidate of candidates) {
    if (!isIPFSString(candidate)) continue

    // Use the existing resolver to normalize
    const ref = resolve(candidate)
    if (ref?.cid && !seen.has(ref.cid)) {
      seen.add(ref.cid)
    }
  }

  return [...seen]
}

/**
 * Determine the best metadata scan target for an NFT.
 * Returns the full canonical IPFS URI (ipfs://CID/path) to preserve
 * any sub-path, e.g. ipfs://Qm.../3.json instead of just Qm...
 * Scanning a bare directory CID would return the entire collection
 * instead of the specific token metadata file.
 *
 * Priority: metadata.uri (Tezos) → tokenURI → contractTokenURI → first CID
 *
 * @param {object} nft
 * @returns {string | null} canonical ipfs:// URI or bare CID as fallback
 */
export function extractMetadataCID(nft) {
  if (!nft) return null

  // ✅ Priority 1: explicit metadata JSON URI (Tezos: metadata.uri)
  if (isIPFSString(nft.metadata?.uri)) {
    const ref = resolve(nft.metadata.uri)
    // Return canonical (ipfs://CID/path) to keep the sub-path intact
    if (ref?.cid) return ref.canonical
  }

  // ✅ Priority 2: tokenURI (should point to metadata JSON, not artifact)
  // e.g. ipfs://Qmd4GTG.../3.json — path /3.json must not be stripped
  if (isIPFSString(nft.tokenURI)) {
    const ref = resolve(nft.tokenURI)
    if (ref?.cid) return ref.canonical
  }

  // ✅ Priority 3: contractTokenURI
  if (isIPFSString(nft.contractTokenURI)) {
    const ref = resolve(nft.contractTokenURI)
    if (ref?.cid) return ref.canonical
  }

  // Fallback: any CID from the NFT (may be artifact, but better than nothing)
  const cids = extractIPFSCIDs(nft)
  return cids[0] || null
}

/**
 * ✅ Filter an array of NFTs to only those with IPFS content.
 *
 * @param {Array} nfts
 * @returns {Array}
 */
export function filterIPFSNFTs(nfts) {
  return (nfts || []).filter(hasIPFS)
}

/**
 * ✅ Enrich NFTs with IPFS metadata (hasIPFS, ipfsCIDs, metadataCID).
 * Only keeps NFTs that have IPFS content.
 *
 * @param {Array} nfts
 * @returns {Array}
 */
export function enrichWithIPFSInfo(nfts) {
  return (nfts || []).map((nft) => {
    const metadataCID = extractMetadataCID(nft)
    const fallbackCandidates = [
      nft.tokenURI, nft.contractTokenURI,
      nft.image, nft.thumbnail, nft.artifactUri,
      nft.metadata?.uri, nft.metadata?.tokenURI, nft.metadata?.image,
      nft.metadata?.artifactUri, nft.metadata?.displayUri,
    ].filter(Boolean)

    // ✅ Determine the IPFS source label for debugging
    let ipfsSource = nft.ipfsSource || null
    if (!ipfsSource) {
      if (isIPFSString(nft.metadata?.uri)) ipfsSource = 'metadata.uri'
      else if (metadataCID && isIPFSString(nft.tokenURI)) ipfsSource = 'tokenURI'
      else if (metadataCID) ipfsSource = 'metadataCID'
      else if (fallbackCandidates.length) ipfsSource = 'fallback'
    }

    return {
      ...nft,
      hasIPFS: hasIPFS(nft),
      ipfsCIDs: extractIPFSCIDs(nft),
      metadataCID,
      ipfsSource,
      debug: {
        tokenURI: nft.tokenURI || null,
        contractTokenURI: nft.contractTokenURI || null,
        artifactUri: nft.metadata?.artifactUri || nft.artifactUri || null,
        displayUri: nft.metadata?.displayUri || null,
        thumbnailUri: nft.metadata?.thumbnailUri || nft.thumbnail || null,
        metadataUri: nft.metadata?.uri || null,
        metadataKeys: nft.metadata ? Object.keys(nft.metadata).slice(0, 20) : [],
      },
    }
  })
}
