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

const TIMEOUT_MS = 15_000
const MAX_NFTS = 500

function getAlchemyKey() {
  return env.ALCHEMY_API_KEY || process.env.ALCHEMY_API_KEY || ''
}

function normalizeAlchemyNFT(item) {
  const meta = item.metadata || item.rawMetadata || {}
  const contract = item.contract?.address || item.contractAddress || ''
  const tokenId = item.tokenId || item.id?.tokenId || ''
  const tokenURI =
    item.tokenUri?.raw ||
    item.tokenUri?.gateway ||
    meta.token_uri ||
    null
  const image =
    item.media?.[0]?.raw ||
    item.media?.[0]?.gateway ||
    meta.image ||
    meta.image_url ||
    null
  return {
    id: `eth-${contract}-${tokenId}`,
    chain: 'ethereum',
    contract,
    tokenId,
    name: item.title || meta.name || `Token ${tokenId}`,
    image,
    thumbnail: item.media?.[0]?.thumbnail || null,
    tokenURI,
    metadata: meta,
  }
}

async function fetchWithAlchemy(address, apiKey) {
  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS)
  const allNFTs = []
  let pageKey = null
  try {
    do {
      const params = new URLSearchParams({
        owner: address,
        withMetadata: 'true',
        pageSize: '100',
      })
      if (pageKey) params.set('pageKey', pageKey)
      const url = `https://eth-mainnet.g.alchemy.com/nft/v3/${apiKey}/getNFTsForOwner?${params}`
      const response = await fetch(url, {
        headers: { accept: 'application/json' },
        signal: controller.signal,
      })
      if (!response.ok) throw new Error(`Alchemy HTTP ${response.status}`)
      const data = await response.json()
      allNFTs.push(...(data.ownedNfts || []).map(normalizeAlchemyNFT))
      pageKey = data.pageKey || null
      if (allNFTs.length >= MAX_NFTS) break
    } while (pageKey)
    clearTimeout(timer)
    return allNFTs
  } catch (err) {
    clearTimeout(timer)
    if (err.name === 'AbortError') throw new Error('Alchemy API time-out')
    throw err
  }
}

async function fetchWithRPCFallback(address) {
  const getRpcUrl = () =>
    env.ETHEREUM_RPC_URL || process.env.ETHEREUM_RPC_URL || 'https://eth.llamarpc.com'
  const TRANSFER_TOPIC = '0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef'
  const paddedAddress = `0x${address.replace('0x', '').padStart(64, '0')}`
  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS)
  try {
    const response = await fetch(getRpcUrl(), {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      signal: controller.signal,
      body: JSON.stringify({
        jsonrpc: '2.0',
        id: 1,
        method: 'eth_getLogs',
        params: [{
          fromBlock: 'earliest',
          toBlock: 'latest',
          topics: [TRANSFER_TOPIC, null, paddedAddress],
        }],
      }),
    })
    clearTimeout(timer)
    if (!response.ok) throw new Error(`RPC HTTP ${response.status}`)
    const data = await response.json()
    if (data.error) throw new Error(data.error.message || 'RPC error')
    const logs = Array.isArray(data.result) ? data.result : []
    const seen = new Set()
    const nfts = []
    for (const log of logs.slice(0, MAX_NFTS)) {
      const contract = log.address?.toLowerCase()
      const tokenId = log.topics?.[3] ? BigInt(log.topics[3]).toString() : null
      if (!contract || !tokenId) continue
      const key = `${contract}-${tokenId}`
      if (seen.has(key)) continue
      seen.add(key)
      let tokenURI = null
      try { tokenURI = await fetchContractTokenUri(contract, tokenId) } catch { /* ignore */ }
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

export async function fetchEthereumNFTs(address) {
  if (!address || !/^0x[a-fA-F0-9]{40}$/.test(address)) {
    throw new Error('Ongeldig Ethereum adres')
  }
  const apiKey = getAlchemyKey()
  if (apiKey) return fetchWithAlchemy(address, apiKey)
  return fetchWithRPCFallback(address)
}
