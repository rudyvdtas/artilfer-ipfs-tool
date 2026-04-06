/**
 * tezos-fetcher.js — Fetch FA2 NFTs from Tezos
 *
 * Uses: TzKT API (free, no key needed)
 * Endpoint: GET /v1/tokens/balances?account={address}&balance.gt=0
 *
 * Returns normalized NFT objects ready for IPFS filtering.
 */

const TZKT_API = 'https://api.tzkt.io/v1'
const TIMEOUT_MS = 12000
const PAGE_SIZE = 500   // max per TzKT request
const MAX_PAGES = 10   // veiligheidsgrens: max 5000 tokens

/**
 * Normalize a TzKT token to the standard NFT shape.
 * @param {object} t - TzKT token entry
 * @returns {object}
 */
function normalizeTzKT(t) {
  const meta = t.token?.metadata || {}

  // TzKT decodes on-chain metadata internally and never exposes the metadata
  // JSON pointer (e.g. ipfs://QmXBQn...) — it only returns the decoded fields.
  // The canonical source for all archivable CIDs is meta.formats[], which
  // contains every IPFS URI for this token (artifact, display, thumbnail).
  //
  // Priority for scan target:
  //   1. meta.uri      — explicit metadata JSON pointer (fxhash / custom contracts)
  //   2. meta.artifactUri — the primary media file (OBJKT/hic et nunc standard)
  //   3. meta.displayUri  — last resort
  const metadataUri = meta.uri || null

  // Extract all unique IPFS URIs from formats[] so the batch-coordinator
  // can inject them as scan nodes even when the scanner only finds the binary.
  const formatUris = Array.isArray(meta.formats)
    ? meta.formats
        .map((f) => (typeof f?.uri === 'string' ? f.uri.trim() : null))
        .filter((uri) => uri && uri.startsWith('ipfs://'))
    : []

  return {
    id: `tez-${t.token?.contract?.address}-${t.token?.tokenId}`,
    chain: 'tezos',
    contract: t.token?.contract?.address || '',
    tokenId: t.token?.tokenId || '',
    name: meta.name || meta.symbol || `Token ${t.token?.tokenId}`,
    // Best display image: displayUri (web-sized) > thumbnailUri > artifactUri
    image:
      meta.displayUri ||
      meta.thumbnailUri ||
      meta.artifactUri ||
      meta.image ||
      null,
    thumbnail: meta.thumbnailUri || null,
    artifactUri: meta.artifactUri || null,
    // tokenURI = best scan entry point.
    // For OBJKT tokens: artifactUri (TzKT never gives us the metadata JSON CID).
    // For fxhash/custom: meta.uri points to the metadata JSON directly.
    tokenURI: metadataUri || meta.artifactUri || meta.displayUri || null,
    // formatUris = all IPFS media CIDs known from formats[]
    // Used by batch-coordinator as a guaranteed fallback for the export.
    formatUris,
    metadata: meta,
  }
}

/**
 * Returns true when a token-balance entry is a genuine NFT.
 *
 * Tezos has two fungible-token standards:
 *   • fa1.2  — always fungible (like ERC-20), never an NFT
 *   • fa2    — the NFT standard (like ERC-1155); balance > 1 means
 *              the wallet holds multiple editions of the same NFT
 *
 * We only discard:
 *   1. fa1.2 tokens  (currency / governance tokens)
 *   2. fa2 tokens with a totalSupply > 1 000 000  (clearly fungible
 *      meme-coins that happen to use the fa2 interface, e.g. JOELMA)
 *
 * Everything else — including limited-edition NFTs where balance > 1 —
 * is kept.
 *
 * @param {object} t - TzKT token-balance entry
 * @returns {boolean}
 */
function isNFT(t) {
  const tok = t.token || {}
  const standard = tok.standard || 'fa2'
  const supply = parseInt(tok.totalSupply || '0', 10)

  if (standard === 'fa1.2') return false          // always fungible
  if (supply > 1_000_000) return false             // de-facto fungible
  return true
}

/**
 * ✅ Fetch FA2 NFTs for a Tezos address.
 * Uses offset-based pagination so wallets with >500 tokens are
 * handled correctly (up to MAX_PAGES × PAGE_SIZE entries).
 *
 * @param {string} address - Tezos address (tz1...)
 * @returns {Promise<Array>}
 */
export async function fetchTezosNFTs(address) {
  if (!address || !/^tz[1-3][a-zA-Z0-9]{33}$/.test(address)) {
    throw new Error('Ongeldig Tezos adres')
  }

  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS)

  try {
    let allTokens = []
    let offset = 0

    for (let page = 0; page < MAX_PAGES; page++) {
      const params = new URLSearchParams({
        'balance.gt': '0',
        limit: String(PAGE_SIZE),
        offset: String(offset),
      })

      const response = await fetch(
        `${TZKT_API}/tokens/balances?account=${encodeURIComponent(address)}&${params}`,
        {
          headers: { accept: 'application/json' },
          signal: controller.signal,
        }
      )

    if (!response.ok) throw new Error(`TzKT HTTP ${response.status}`)

      const page_tokens = await response.json()
      allTokens = allTokens.concat(page_tokens)

      // Stop when TzKT returns fewer items than requested (last page)
      if (page_tokens.length < PAGE_SIZE) break

      offset += PAGE_SIZE
    }

    clearTimeout(timer)

    return allTokens
      .filter(isNFT)
      .map(normalizeTzKT)
  } catch (err) {
    clearTimeout(timer)
    if (err.name === 'AbortError') throw new Error('TzKT API time-out')
    throw new Error(`TzKT fetch fout: ${err.message}`)
  }
}
