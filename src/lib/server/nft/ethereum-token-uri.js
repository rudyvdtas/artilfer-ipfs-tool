import { env } from '$env/dynamic/private'
import { resolve } from '$lib/server/ipfs/resolver.js'
import { tryRpc } from '$lib/server/nft/rpc-client.js'

const ERC721_ABI = ['function tokenURI(uint256 tokenId) view returns (string)']
const ERC1155_ABI = ['function uri(uint256 tokenId) view returns (string)']

// RPC requests will be attempted against multiple providers by `tryRpc`.

function normalizeUri(value) {
  if (!value || typeof value !== 'string') return null
  const ref = resolve(value)
  return ref?.canonical || value
}

function toHexTokenId(tokenId) {
  try {
    return `0x${BigInt(tokenId).toString(16)}`
  } catch {
    return null
  }
}

async function rpcCall(method, params, signal) {
  const body = JSON.stringify({ jsonrpc: '2.0', id: 1, method, params })
  const { url, json } = await tryRpc(body, signal)

  if (json.error) {
    throw new Error(json.error?.message || `RPC ${method} failed from ${url}: ${JSON.stringify(json.error)}`)
  }

  return json.result
}

async function tryContractCall(contractAddress, signature, tokenId) {
  const selector = signature.slice(0, 10)
  const encodedId = toHexTokenId(tokenId)
  if (!encodedId) return null

  const data = selector + encodedId.slice(2).padStart(64, '0')
  const result = await rpcCall('eth_call', [{ to: contractAddress, data }, 'latest'])
  if (!result || result === '0x') return null

  const hex = result.startsWith('0x') ? result.slice(2) : result
  if (!hex) return null

  const len = parseInt(hex.slice(64, 128), 16)
  if (!Number.isFinite(len) || len <= 0) return null

  const strHex = hex.slice(128, 128 + len * 2)
  const text = Buffer.from(strHex, 'hex').toString('utf8').replace(/\0/g, '').trim()
  return normalizeUri(text)
}

export async function fetchContractTokenUri(contractAddress, tokenId) {
  for (const signature of ['0xc87b56dd', '0x0e89341c']) {
    try {
      const uri = await tryContractCall(contractAddress, signature, tokenId)
      if (uri) return uri
    } catch {
      // try next signature / ABI
    }
  }

  return null
}
