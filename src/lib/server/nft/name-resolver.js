/**
 * name-resolver.js — Resolve ENS/TEZ domains to addresses
 *
 * Supports:
 * - Ethereum: vitalik.eth → 0x...
 * - Tezos: example.tez → tz1...
 * - Direct addresses: 0x... or tz1...
 *
 * ENS resolution uses pure JSON-RPC (no ethers dependency):
 *   1. namehash(domain) → node
 *   2. ENS Registry.resolver(node) → resolver address
 *   3. PublicResolver.addr(node) → wallet address
 */

import pkg from 'js-sha3'
import { env } from '$env/dynamic/private'
import { tryRpc } from '$lib/server/nft/rpc-client.js'
const { keccak_256 } = pkg

// Note: RPC endpoints are tried in order by `tryRpc` (rpc-client).
const TEZ_DOMAINS_GRAPHQL = 'https://api.tezos.domains/graphql'
const TIMEOUT_MS = 8000

// ENS Registry contract on Ethereum mainnet (never changes)
const ENS_REGISTRY = '0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e'

// ── ENS namehash (EIP-137) ──────────────────────────────────────────────────

/**
 * Keccak-256 wrapper around js-sha3.
 * Returns a Buffer (32 bytes).
 * @param {Buffer|Uint8Array|string} data
 * @returns {Buffer}
 */
function keccak256(data) {
  return Buffer.from(keccak_256.arrayBuffer(data))
}

/**
 * Compute the ENS namehash for a domain (EIP-137).
 * namehash('')      = 0x000...000
 * namehash('eth')   = keccak256(namehash('') ++ keccak256('eth'))
 * namehash('x.eth') = keccak256(namehash('eth') ++ keccak256('x'))
 *
 * @param {string} name - e.g. "vitalik.eth"
 * @returns {string} - 32-byte hex string (no 0x prefix)
 */
function namehash(name) {
  let node = Buffer.alloc(32, 0)

  if (!name) return node.toString('hex')

  const labels = name.toLowerCase().split('.')
  for (let i = labels.length - 1; i >= 0; i--) {
    const labelHash = keccak256(labels[i])
    node = keccak256(Buffer.concat([node, labelHash]))
  }

  return node.toString('hex')
}

// ── JSON-RPC helpers ────────────────────────────────────────────────────────

/**
 * Make a single eth_call via JSON-RPC.
 *
 * @param {string} to - Contract address
 * @param {string} data - ABI-encoded calldata (hex, with 0x prefix)
 * @param {AbortSignal} signal
 * @returns {Promise<string>} - Raw result hex
 */
async function ethCall(to, data, signal) {
  const body = JSON.stringify({
    jsonrpc: '2.0',
    id: 1,
    method: 'eth_call',
    params: [{ to, data }, 'latest'],
  })
  const { url, json } = await tryRpc(body, signal)

  if (json.error) {
    const errMsg = json.error.message || JSON.stringify(json.error)
    throw new Error(`RPC error from ${url}: ${errMsg}`)
  }

  return json.result
}

/**
 * ABI-encode a single bytes32 argument (left-padded to 32 bytes).
 * @param {string} hex32 - 32-byte value as hex (no 0x)
 * @returns {string} - 0x + 4-byte selector + 32-byte padded value
 */
function encodeBytes32Call(selector4, hex32) {
  // Left-pad to 64 hex chars (32 bytes)
  const padded = hex32.padStart(64, '0')
  return `${selector4}${padded}`
}

/**
 * Decode a 20-byte address from a 32-byte ABI result.
 * ABI pads addresses to 32 bytes (12 zero bytes prefix + 20-byte address).
 * @param {string} hex - 0x + 64 hex chars
 * @returns {string} - 0x + 40 hex chars (checksummed-ish)
 */
function decodeAddress(hex) {
  if (!hex || hex === '0x' || hex.length < 42) return null
  // Last 40 chars = 20 bytes = address
  return '0x' + hex.slice(-40).toLowerCase()
}

/**
 * Check if an address is the zero address.
 * @param {string} addr
 * @returns {boolean}
 */
function isZeroAddress(addr) {
  return !addr || /^0x0+$/.test(addr)
}

// ── ENS resolution (3-step) ─────────────────────────────────────────────────

/**
 * Resolve an ENS domain to an Ethereum address.
 *
 * Steps:
 *   1. namehash(domain) → node
 *   2. ENS Registry: resolver(bytes32 node) → resolver address
 *   3. PublicResolver: addr(bytes32 node) → wallet address
 *
 * All calls go to the configured ETHEREUM_RPC_URL (Alchemy/Infura/etc).
 *
 * @param {string} domain - e.g. "vitalik.eth"
 * @returns {Promise<string>} - Ethereum address
 */
async function resolveENS(domain) {
  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS)

  try {
    const node = namehash(domain.toLowerCase())

    // Step 1: Get resolver address from ENS Registry
    // resolver(bytes32) selector = 0x0178b8bf
    const resolverHex = await ethCall(
      ENS_REGISTRY,
      encodeBytes32Call('0x0178b8bf', node),
      controller.signal
    )

    const resolverAddr = decodeAddress(resolverHex)
    if (!resolverAddr || isZeroAddress(resolverAddr)) {
      throw new Error('ENS naam heeft geen resolver — naam bestaat mogelijk niet')
    }

    // Step 2: Get address from resolver
    // addr(bytes32) selector = 0x3b3b57de
    const addrHex = await ethCall(
      resolverAddr,
      encodeBytes32Call('0x3b3b57de', node),
      controller.signal
    )

    const address = decodeAddress(addrHex)
    if (!address || isZeroAddress(address)) {
      throw new Error('ENS naam heeft geen Ethereum adres ingesteld')
    }

    clearTimeout(timer)
    return address
  } catch (err) {
    clearTimeout(timer)
    if (err.name === 'AbortError') throw new Error(`ENS lookup timed out voor: ${domain}`)
    // Rethrow with clean message (already formatted above)
    throw new Error(`Could not resolve ENS: ${domain} — ${err.message}`)
  }
}

/**
 * Resolve TEZ domain (.tez) via Tezos Domains GraphQL API
 *
 * @param {string} domain
 * @returns {Promise<string>} - Tezos address
 */
async function resolveTezDomain(domain) {
  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS)

  try {
    const response = await fetch(TEZ_DOMAINS_GRAPHQL, {
      method: 'POST',
      signal: controller.signal,
      headers: { 'content-type': 'application/json', accept: 'application/json' },
      body: JSON.stringify({
        query: `{ domain(name: "${domain}") { owner address } }`,
      }),
    })

    clearTimeout(timer)

    if (!response.ok) throw new Error(`HTTP ${response.status}`)

    const json = await response.json()

    if (json.errors?.length) {
      throw new Error(json.errors[0].message)
    }

    const address = json?.data?.domain?.address || json?.data?.domain?.owner

    if (!address) throw new Error('Domain not found or has no address set')

    return address
  } catch (err) {
    clearTimeout(timer)
    if (err.name === 'AbortError') throw new Error(`TEZ domain lookup timed out for: ${domain}`)
    throw new Error(`Could not resolve TEZ domain: ${domain} — ${err.message}`)
  }
}

/**
 * ✅ Resolve any input to { address, chain }
 *
 * Accepts:
 * - 0x1234...5678          → ethereum
 * - tz1abc...xyz           → tezos
 * - vitalik.eth            → ENS → ethereum
 * - example.tez            → TEZ domains → tezos
 *
 * @param {string} input
 * @returns {Promise<{address: string, chain: 'ethereum'|'tezos', resolvedAt: string, displayName?: string}>}
 */
export async function resolveName(input) {
  const trimmed = (input || '').trim()

  if (!trimmed) throw new Error('Input is empty')

  // ✅ Direct Ethereum address
  if (/^0x[a-fA-F0-9]{40}$/.test(trimmed)) {
    return {
      address: trimmed.toLowerCase(),
      chain: 'ethereum',
      resolvedAt: new Date().toISOString(),
    }
  }

  // ✅ Direct Tezos address
  if (/^tz[1-3][a-zA-Z0-9]{33}$/.test(trimmed)) {
    return {
      address: trimmed,
      chain: 'tezos',
      resolvedAt: new Date().toISOString(),
    }
  }

  // ✅ ENS domain (.eth)
  if (trimmed.toLowerCase().endsWith('.eth')) {
    const address = await resolveENS(trimmed.toLowerCase())
    return {
      address,
      chain: 'ethereum',
      displayName: trimmed,
      resolvedAt: new Date().toISOString(),
    }
  }

  // ✅ TEZ domain (.tez)
  if (trimmed.toLowerCase().endsWith('.tez')) {
    const address = await resolveTezDomain(trimmed.toLowerCase())
    return {
      address,
      chain: 'tezos',
      displayName: trimmed,
      resolvedAt: new Date().toISOString(),
    }
  }

  throw new Error(
    'Ongeldig adres. Gebruik:\n' +
    '• 0x... (Ethereum adres)\n' +
    '• tz1... (Tezos adres)\n' +
    '• naam.eth (ENS domein)\n' +
    '• naam.tez (TEZ domein)'
  )
}
