import { env } from '$env/dynamic/private'

function getRpcUrls() {
  const urls = []
  const envRpc = env.ETHEREUM_RPC_URL || process.env.ETHEREUM_RPC_URL
  if (envRpc) urls.push(envRpc)

  const alchemyKey = env.ALCHEMY_API_KEY || process.env.ALCHEMY_API_KEY
  if (alchemyKey) urls.push(`https://eth-mainnet.g.alchemy.com/v2/${alchemyKey}`)

  const infuraId = env.INFURA_PROJECT_ID || process.env.INFURA_PROJECT_ID
  if (infuraId) urls.push(`https://mainnet.infura.io/v3/${infuraId}`)

  // Public fallbacks
  urls.push('https://rpc.ankr.com/eth')
  urls.push('https://cloudflare-eth.com')
  urls.push('https://eth.llamarpc.com')

  // Deduplicate while preserving order
  return [...new Set(urls.filter(Boolean))]
}

/**
 * Try a list of RPC endpoints until one returns a valid JSON-RPC response.
 * Returns { url, json } on success or throws an aggregated error.
 */
export async function tryRpc(body, signal) {
  const urls = getRpcUrls()
  const errors = []

  for (const url of urls) {
    try {
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body,
        signal,
      })

      if (!res.ok) {
        const text = await res.text().catch(() => '')
        errors.push(`${url} HTTP ${res.status}: ${text}`)
        continue
      }

      const json = await res.json()
      // Treat JSON-RPC error payloads as provider failures so we try the next URL.
      if (json?.error) {
        const errMsg = json.error.message || JSON.stringify(json.error)
        errors.push(`${url} JSON-RPC error: ${errMsg}`)
        continue
      }

      return { url, json }
    } catch (err) {
      errors.push(`${url} error: ${err.message}`)
      // try next URL
    }
  }

  throw new Error(`All RPC providers failed: ${errors.join(' | ')}`)
}

export function listRpcUrls() {
  return getRpcUrls()
}
