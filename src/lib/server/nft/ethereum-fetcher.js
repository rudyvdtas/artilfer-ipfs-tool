
/**
 * ethereum-fetcher.js — Fetch ERC-721/ERC-1155 NFTs from Ethereum
 *
 * Primary:  Alchemy NFT API v3 (requires ALCHEMY_KEY env var)
 * Fallback: OpenSea API v1 (free, rate-limited)
 *
 * Returns normalized NFT objects ready for IPFS filtering.
 */

import { env } from '$env/dynamic/private'
import { discoverAllRefs, resolve } from '$lib/server/ipfs/resolver.js'
import { fetchContractTokenUri } from './ethereum-token-uri.js'

const TIMEOUT_MS = 12000
const MAX_DISCOVERY_DEPTH = 3
let debugLog = []

function isLikelyIpfsUri(value) {
  if (!value || typeof value !== 'string') return false
  const v = value.trim()
  return v.startsWith('ipfs://') || v.includes('/ipfs/') || /bafy[a-z2-7]{20,}/i.test(v) || /Qm[1-9A-HJ-NP-Za-km-z]{44}/.test(v)
}

function getFirstIpfsCandidateFromObject(obj) {
  const refs = discoverAllRefs({ json: obj })
  return refs[0]?.canonical || null
}

function logDebug(entry) {
  debugLog.push(entry)
}

function normalizeTokenUri(tokenUri) {
  if (!tokenUri) return null
  const ref = resolve(tokenUri)
  if (ref?.canonical) return ref.canonical
  if (typeof tokenUri === 'string' && tokenUri.includes('/ipfs/')) {
    const after = tokenUri.slice(tokenUri.indexOf('/ipfs/') + '/ipfs/'.length)
    return `ipfs://${after}`
  }
  return tokenUri
}

function pickMetadata(nft) {
  const metadata = nft.rawMetadata || {}
  const tokenURI = normalizeTokenUri(nft.tokenUri?.raw || nft.tokenUri?.gateway || null)
  const image =
    normalizeTokenUri(nft.image?.cachedUrl || nft.image?.originalUrl || metadata.image || metadata.image_url || null)

  return {
    ...metadata,
    tokenURI,
    image,
    animation_url: metadata.animation_url || metadata.animationUrl || null,
  }
}

/**
 * Get the Ethereum RPC URL at call-time (env loaded by then).
 */
function getRpcUrl() {
  return env.ETHEREUM_RPC_URL || process.env.ETHEREUM_RPC_URL || 'https://eth.llamarpc.com'
}

/**
 * Extract the Alchemy API key from the RPC URL.
 * Alchemy RPC URLs look like: https://eth-mainnet.g.alchemy.com/v2/{KEY}
 */
function getAlchemyKey() {
  const key = env.ALCHEMY_KEY || process.env.ALCHEMY_KEY
  if (key) return key
  const rpc = getRpcUrl()
  const match = rpc.match(/alchemy\.com\/v\d+\/([^/?\s]+)/)
  return match ? match[1] : null
}

/**
 * Normalize a raw Alchemy NFT to the standard shape.
 * @param {object} nft
 * @returns {object}
 */
function normalizeAlchemy(nft) {
  const metadata = pickMetadata(nft)
  const discoveredIpfs = getFirstIpfsCandidateFromObject(nft) || getFirstIpfsCandidateFromObject(metadata)

  return {
    id: `eth-${nft.contract?.address}-${nft.tokenId}`,
    chain: 'ethereum',
    contract: nft.contract?.address || '',
    tokenId: nft.tokenId || '',
    name: nft.name || nft.rawMetadata?.name || `#${nft.tokenId}`,
    image:
      metadata.image ||
      nft.image?.cachedUrl ||
      nft.image?.originalUrl ||
      null,
    tokenURI: discoveredIpfs || metadata.tokenURI || nft.tokenUri?.raw || null,
    metadata,
    ipfsSource: discoveredIpfs ? 'discovered' : (metadata.tokenURI ? 'tokenURI' : null),
  }
}

/**
 * Normalize a raw OpenSea asset to the standard shape.
 * @param {object} asset
 * @returns {object}
 */
function normalizeOpenSea(asset) {
  const tokenURI = normalizeTokenUri(asset.token_metadata || asset.token_uri || asset.token_uri_raw || null)
  const discoveredIpfs = getFirstIpfsCandidateFromObject(asset)

  return {
    id: `eth-${asset.asset_contract?.address}-${asset.token_id}`,
    chain: 'ethereum',
    contract: asset.asset_contract?.address || '',
    tokenId: asset.token_id || '',
    name: asset.name || `#${asset.token_id}`,
    image: normalizeTokenUri(asset.image_url || asset.image_thumbnail_url || null),
    tokenURI: discoveredIpfs || tokenURI,
    metadata: asset.metadata || {},
    ipfsSource: discoveredIpfs ? 'discovered' : (tokenURI ? 'tokenURI' : null),
  }
}

/**
 * Fetch NFTs via Alchemy NFT API REST (v3).
 * Requires an unrestricted Alchemy API key (no domain allowlist).
 * @param {string} address
 * @param {string} apiKey
 * @returns {Promise<Array>}
 */
async function hydrateWithContractTokenUris(nfts) {
  return Promise.all(
    (nfts || []).map(async (nft) => {
      if (nft.tokenURI && isLikelyIpfsUri(nft.tokenURI)) {
        logDebug({

        logDebug({
