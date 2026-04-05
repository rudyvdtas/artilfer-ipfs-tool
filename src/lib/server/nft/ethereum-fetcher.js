/**
 * ethereum-fetcher.js — Fetch ERC-721/1155 NFTs for an Ethereum address
 *
 * Uses the Alchemy NFT API when ALCHEMY_API_KEY is set,
 * otherwise falls back to a basic eth_getLogs approach.
 *
 * Returns normalized NFT objects ready for IPFS filtering.
 */

import { env } from '$env/dynamic/private'
import { fetchContractTokenUri } from './ethereum-token-uri.js'
import { tryRpc } from '$lib/server/nft/rpc-client.js'

const TIMEOUT_MS = 15_000
const PAGE_TIMEOUT_MS = 12_000   // timeout per pagina, niet voor de hele loop
const MAX_NFTS = 2000

function getAlchemyKey() {
  return (
    env.ALCHEMY_API_KEY || env.ALCHEMY_KEY || process.env.ALCHEMY_API_KEY || process.env.ALCHEMY_KEY || ''
  )
}

/**
 * Convert gateway URLs (https://gateway.pinata.cloud/ipfs/Qm.../path) to ipfs:// URIs
 * so IPFS detection works correctly.
 * ✅ Behoudt het sub-pad (bijv. /3.json) zodat bij collectie-URIs de juiste
 * token-file wordt gescand in plaats van de hele directory.
 * @param {string} uri
 * @returns {string|null}
 */
function normalizeGatewayToIPFS(uri) {
  if (!uri || typeof uri !== 'string') return null
  const v = uri.trim()

  // Already an IPFS URI
  if (v.startsWith('ipfs://')) return v

  // Extract CID + optional sub-path from gateway URL patterns
  // e.g. https://ipfs.io/ipfs/Qm.../3.json  →  ipfs://Qm.../3.json
  const gatewayPattern = /(?:gateway\.pinata\.cloud|cloudflare-ipfs\.com|ipfs\.io|w3s\.link|nft\.storage)\/ipfs\/(([a-zA-Z0-9]+)(\/.*)?)$/
  const match = v.match(gatewayPattern)
  if (match) return `ipfs://${match[1]}`

  return v
}

/**
 * Normalize an Alchemy NFT API v3 response item to the standard NFT shape.
 *
 * Alchemy NFT API v3 schema (replaces v2):
 *   - tokenUri          → string (raw URI from contract), not { raw, gateway }
 *   - image             → { originalUrl, cachedUrl, thumbnailUrl, pngUrl, contentType }
 *   - raw.metadata      → original on-chain metadata JSON
 *   - contract.address  → contract address
 *
 * @param {object} item - Alchemy v3 NFT item
 * @returns {object}
 */
function normalizeAlchemyNFT(item) {
  // v3: raw on-chain metadata lives under item.raw.metadata
  // Fallback to item.contract.openSeaMetadata for collection-level data
  const rawMeta = item.raw?.metadata || {}
  const contract = item.contract?.address || ''
  const tokenId = item.tokenId || ''

  // v3: tokenUri is a plain string (the URI returned by tokenURI() on-chain)
  let tokenURI = typeof item.tokenUri === 'string' ? item.tokenUri.trim() : null
  // Also check raw metadata fields as fallback
  if (!tokenURI) tokenURI = rawMeta.token_uri || rawMeta.tokenURI || null
  // Normalize any gateway URL to ipfs:// so IPFS detection works correctly
  if (tokenURI) tokenURI = normalizeGatewayToIPFS(tokenURI) || tokenURI

  // v3: image data lives under item.image (object with multiple resolutions)
  // originalUrl = the raw URI from metadata (may be ipfs://)
  // cachedUrl   = Alchemy-hosted CDN copy
  // thumbnailUrl = small Alchemy-hosted thumbnail
  const imageOriginal = item.image?.originalUrl || rawMeta.image || rawMeta.image_url || null
  const imageCached   = item.image?.cachedUrl   || null
  const thumbnailUrl  = item.image?.thumbnailUrl || item.image?.pngUrl || null

  // Prefer the original (may be ipfs://) so IPFS detection fires;
  // fall back to the Alchemy-cached HTTPS URL for actual display
  const image     = imageOriginal || imageCached || null
  const thumbnail = thumbnailUrl  || imageCached || imageOriginal || null

  return {
    id: `eth-${contract}-${tokenId}`,
    chain: 'ethereum',
    contract,
    tokenId,
    name: item.name || rawMeta.name || `Token ${tokenId}`,
    image,
    thumbnail,
    tokenURI,
    metadata: rawMeta,
  }
}

/**
 * Fetch NFTs via Alchemy NFT API
 * @param {string} address
 * @param {string} apiKey
 * @returns {Promise<Array>}
 */
async function fetchWithAlchemy(address, apiKey) {
  const allNFTs = []
  let pageKey = null
  const alchemyDebug = {}

  try {
    do {
      // ✅ Aparte AbortController per pagina — voorkomt dat één trage pagina
      // de hele paginering-loop afbreekt via een gedeelde timeout.
      const controller = new AbortController()
      const timer = setTimeout(() => controller.abort(), PAGE_TIMEOUT_MS)

      const params = new URLSearchParams({
        owner: address,
        withMetadata: 'true',
        pageSize: '100',
      })
      if (pageKey) params.set('pageKey', pageKey)

      const url = `https://eth-mainnet.g.alchemy.com/nft/v3/${apiKey}/getNFTsForOwner?${params}`
      let response
      try {
        response = await fetch(url, {
          headers: { accept: 'application/json' },
          signal: controller.signal,
        })
      } finally {
        clearTimeout(timer)
      }

      if (!response.ok) throw new Error(`Alchemy HTTP ${response.status}`)

      const data = await response.json()
      const items = data.ownedNfts || []
      
      // Debug: capture first item (v3 schema fields)
      if (items.length > 0 && Object.keys(alchemyDebug).length === 0) {
        const first = items[0]
        alchemyDebug.apiVersion        = 'v3'
        alchemyDebug.tokenUri          = typeof first.tokenUri === 'string' ? first.tokenUri.slice(0, 200) : first.tokenUri
        alchemyDebug.image_originalUrl = first.image?.originalUrl || null
        alchemyDebug.image_cachedUrl   = first.image?.cachedUrl   || null
        alchemyDebug.image_thumbnailUrl= first.image?.thumbnailUrl|| null
        alchemyDebug.raw_metadataKeys  = first.raw?.metadata ? Object.keys(first.raw.metadata) : null
        alchemyDebug.name              = first.name || null
      }
      
      allNFTs.push(...items.map(normalizeAlchemyNFT))

      pageKey = data.pageKey || null
      if (allNFTs.length >= MAX_NFTS) break
    } while (pageKey)

    return { nfts: allNFTs, alchemyDebug, method: 'alchemy' }
  } catch (err) {
    if (err.name === 'AbortError') throw new Error('Alchemy API time-out (pagina te traag)')
    throw err
  }
}

/**
 * Minimal fallback: fetch NFT transfer events for an address using eth_getLogs,
 * then retrieve tokenURIs via on-chain calls.
 *
 * This is limited to ERC-721 (Transfer event) and does not paginate deeply.
 * It is only used when no Alchemy key is configured.
 *
 * @param {string} address
 * @returns {Promise<Array>}
 */
async function fetchWithRPCFallback(address) {
  // Use tryRpc to attempt multiple providers (env, Alchemy, Infura, public fallbacks)

  // ERC-721 Transfer(address,address,uint256) topic
  const TRANSFER_TOPIC = '0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef'
  const paddedAddress = `0x${address.replace('0x', '').padStart(64, '0')}`

  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS)

  try {
    const body = JSON.stringify({ jsonrpc: '2.0', id: 1, method: 'eth_getLogs', params: [{
      fromBlock: 'earliest',
      toBlock: 'latest',
      topics: [TRANSFER_TOPIC, null, paddedAddress],
    }] })

    const { url, json: data } = await tryRpc(body, controller.signal)
    if (data.error) throw new Error(data.error.message || `RPC error from ${url}: ${JSON.stringify(data.error)}`)

    const logs = Array.isArray(data.result) ? data.result : []

    // Deduplicate by contract + tokenId
    const seen = new Set()
    const nfts = []

    for (const log of logs.slice(0, MAX_NFTS)) {
      const contract = log.address?.toLowerCase()
      const tokenId = log.topics?.[3] ? BigInt(log.topics[3]).toString() : null
      if (!contract || !tokenId) continue

      const key = `${contract}-${tokenId}`
      if (seen.has(key)) continue
      seen.add(key)

      // Fetch tokenURI on-chain
      let tokenURI = null
      try {
        tokenURI = await fetchContractTokenUri(contract, tokenId)
        // Convert gateway URLs to ipfs:// so IPFS detection works
        if (tokenURI) {
          tokenURI = normalizeGatewayToIPFS(tokenURI) || tokenURI
        }
      } catch {
        // ignore — leave tokenURI null
      }

      nfts.push({
        id: `eth-${contract}-${tokenId}`,
        chain: 'ethereum',
        contract,
        tokenId,
        name: `Token ${tokenId}`,
        image: null,
        thumbnail: null,
        tokenURI,
        metadata: {},
      })
    }

    return nfts
  } catch (err) {
    clearTimeout(timer)
    if (err.name === 'AbortError') throw new Error('Ethereum RPC time-out')
    throw new Error(`Ethereum RPC fout: ${err.message}`)
  }
}

/**
 * Fetch ERC-721/1155 NFTs for an Ethereum address.
 * Uses Alchemy when ALCHEMY_API_KEY is set, falls back to RPC.
 *
 * @param {string} address - Ethereum address (0x...)
 * @returns {Promise<Array>}
 */
export async function fetchEthereumNFTs(address) {
  if (!address || !/^0x[a-fA-F0-9]{40}$/.test(address)) {
    throw new Error('Ongeldig Ethereum adres')
  }

  const apiKey = getAlchemyKey()
  const isUsingAlchemy = !!apiKey
  
  if (isUsingAlchemy) {
    const result = await fetchWithAlchemy(address, apiKey)
    // Flatten: return nfts array but preserve debug info in array properties
    const nfts = result.nfts
    nfts.debugMethod = 'alchemy'
    nfts.alchemyDebug = result.alchemyDebug
    return nfts
  }

  const result = await fetchWithRPCFallback(address)
  result.debugMethod = 'rpc'
  return result
}




