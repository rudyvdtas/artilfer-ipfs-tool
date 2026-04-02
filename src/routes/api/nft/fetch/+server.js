import { json } from '@sveltejs/kit'
import { fetchEthereumNFTs } from '$lib/server/nft/ethereum-fetcher.js'
import { fetchTezosNFTs } from '$lib/server/nft/tezos-fetcher.js'
import { enrichWithIPFSInfo, filterIPFSNFTs } from '$lib/server/nft/ipfs-filter.js'

/**
 * GET /api/nft/fetch?address=0x...&chain=ethereum
 *
 * Query params:
 *   address  - blockchain address
 *   chain    - "ethereum" | "tezos"
 *
 * Response:
 * {
 *   address, chain,
 *   totalCount,    // all NFTs found
 *   ipfsCount,     // NFTs with IPFS content
 *   nfts: [...]    // only IPFS-filtered NFTs, enriched
 * }
 */
export async function GET({ url }) {
  const address = url.searchParams.get('address')?.trim() || ''
  const chain = url.searchParams.get('chain')?.trim() || ''

  if (!address) return json({ error: 'Query param "address" is verplicht' }, { status: 400 })
  if (!chain) return json({ error: 'Query param "chain" is verplicht' }, { status: 400 })
  if (!['ethereum', 'tezos'].includes(chain)) {
    return json({ error: 'Ongeldige chain. Gebruik "ethereum" of "tezos"' }, { status: 400 })
  }

  try {
    let rawNFTs = []

    if (chain === 'ethereum') {
      rawNFTs = await fetchEthereumNFTs(address)
    } else {
      rawNFTs = await fetchTezosNFTs(address)
    }

    const enriched = enrichWithIPFSInfo(rawNFTs)
    const ipfsNFTs = filterIPFSNFTs(enriched)

    // Zorg dat alle NFTs zichtbaar blijven in de UI.
    // De frontend toont nu het totaal en markeert per NFT of er IPFS-data is.
    return json({
      address,
      chain,
      totalCount: rawNFTs.length,
      ipfsCount: ipfsNFTs.length,
      nfts: enriched,
      debugLog: rawNFTs.debugLog || [],
    })
  } catch (err) {
    console.error('[NFT Fetch]', err)
    return json({ error: err.message }, { status: 500 })
  }
}
