# PHASE 6: NFT CHECKER — DETAILED IMPLEMENTATION

> Senior Developer Guide: Ready-to-implement NFT Wallet Checker

---

## 📋 TABLE OF CONTENTS

1. [Architecture Overview](#architecture-overview)
2. [Core Libraries](#core-libraries)
3. [API Endpoints](#api-endpoints)
4. [UI Components](#ui-components)
5. [Batch Scanning](#batch-scanning)
6. [Export Builders](#export-builders)
7. [Testing](#testing)
8. [Deployment](#deployment)

---

## Architecture Overview

```
User Input (Address/ENS/TEZ)
        ↓
resolve/+server.js (ENS/TEZ resolution)
        ↓
fetch/+server.js (ERC-721 + FA2 fetching)
        ↓
IPFS Filter (detect IPFS metadata)
        ↓
Display NFT List (Svelte UI)
        ↓
User selects NFTs
        ↓
scan-batch/+server.js (background job)
        ↓
batch-coordinator.js (orchestration)
        ↓
Reuses Phase 1-5 infrastructure:
  - fetchWithDedup (request caching)
  - fetchSemaphore (concurrency limit)
  - Job storage (persistence)
        ↓
export/manifest/+server.js
export/ready2pin/+server.js
```

---

## CORE LIBRARIES

### File: `src/lib/server/nft/name-resolver.js` (NEW)

```javascript
/**
 * name-resolver.js — Resolve ENS/TEZ domains to addresses
 * 
 * Supports:
 * - Ethereum: vitalik.eth → 0x...
 * - Tezos: example.tez → tz1...
 * - Direct addresses: 0x... or tz1...
 */

import { ethers } from 'ethers'

/**
 * Configuration
 */
const ETH_RPC_URL = process.env.ETHEREUM_RPC_URL || 'https://eth.llamarpc.com'
const ETH_PROVIDER = new ethers.JsonRpcProvider(ETH_RPC_URL)
const TEZ_DOMAINS_API = 'https://api.tzdomain.com'
const TEZ_DOMAINS_TIMEOUT_MS = 5000

/**
 * ✅ Resolve input to address + chain
 * 
 * Input formats:
 * - 0x1234...5678 (Ethereum address)
 * - tz1abc...xyz (Tezos address)
 * - vitalik.eth (ENS domain)
 * - example.tez (TEZ domain)
 * 
 * @param {string} input - User input
 * @returns {Promise<{address: string, chain: 'ethereum'|'tezos', resolvedAt: string}>}
 */
export async function resolveName(input) {
  const trimmed = input.trim()

  // ✅ TEZ domain (.tez)
  if (trimmed.endsWith('.tez')) {
    return resolveTezDomain(trimmed)
  }

  // ✅ ENS domain (.eth)
  if (trimmed.endsWith('.eth')) {
    return resolveENS(trimmed)
  }

  // ✅ Direct address - detect chain
  if (trimmed.match(/^0x[a-fA-F0-9]{40}$/)) {
    return {
      address: trimmed.toLowerCase(),
      chain: 'ethereum',
      resolvedAt: new Date().toISOString(),
    }
  }

  if (trimmed.match(/^tz[1-3][a-zA-Z0-9]{33}$/)) {
    return {
      address: trimmed,
      chain: 'tezos',
      resolvedAt: new Date().toISOString(),
    }
  }

  throw new Error(
    'Invalid input. Use:\n' +
    '- 0x... (Ethereum address)\n' +
    '- tz1... (Tezos address)\n' +
    '- vitalik.eth (ENS domain)\n' +
    '- example.tez (TEZ domain)'
  )
}

/**
 * Resolve Tezos domain (.tez)
 */
async function resolveTezDomain(domain) {
  try {
    const controller = new AbortController()
    const timeout = setTimeout(
      () => controller.abort(),
      TEZ_DOMAINS_TIMEOUT_MS
    )

    const response = await fetch(`${TEZ_DOMAINS_API}/resolve/${domain}`, {
      signal: controller.signal,
      headers: {
        'accept': 'application/json',
      },
    })

    clearTimeout(timeout)

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`)
    }

    const data = await response.json()

    if (!data.address) {
      throw new Error('No address in response')
    }

    return {
      address: data.address,
      chain: 'tezos',
      resolvedAt: new Date().toISOString(),
    }
  } catch (err) {
    throw new Error(`Could not resolve TEZ domain: ${domain} — ${err.message}`)
  }
}

/**
 * Resolve ENS domain (.eth) to Ethereum address
 */
async function resolveENS(domain) {
  try {
    const address = await ETH_PROVIDER.resolveName(domain)

    if (!address) {
      throw new Error('ENS name not found')
    }

    return {
      address: address.toLowerCase(),
      chain: 'ethereum',
      resolvedAt: new Date().toISOString(),
    }
  } catch (err) {
    throw new Error(`Could not resolve ENS: ${domain} — ${err.message}`)
  }
}

/**
 * Batch resolve multiple inputs
 */
export async function resolveMultiple(inputs) {
  const results = await Promise.allSettled(
    inputs.map((input) => resolveName(input))
  )

  return {
    successful: results
      .filter((r) => r.status === 'fulfilled')
      .map((r) => r.value),
    failed: results
      .filter((r) => r.status === 'rejected')
      .map((r, i) => ({ input: inputs[i], error: r.reason.message })),
  }
}
```

### File: `src/lib/server/nft/ethereum-fetcher.js` (NEW)

```javascript
/**
 * ethereum-fetcher.js — Fetch ERC-721 NFTs from Ethereum
 * 
 * Sources:
 * 1. Alchemy API (primary, requires key)
 * 2. OpenSea API (fallback, free but rate-limited)
 * 
 * Returns: Normalized NFT objects with IPFS detection
 */

/**
 * Configuration
 */
const ALCHEMY_KEY = process.env.ALCHEMY_KEY
const ALCHEMY_URL = ALCHEMY_KEY
  ? `https://eth-mainnet.g.alchemy.com/nft/v3/${ALCHEMY_KEY}`
  : null

const OPENSEA_URL = 'https://api.opensea.io/api/v1'

/**
 * ✅ Fetch ERC-721 NFTs from user's address
 * 
 * Returns normalized NFT objects:
 * {
 *   id: "eth-{contract}-{tokenId}",
 *   chain: "ethereum",
 *   contract: "0x...",
 *   tokenId: "123",
 *   name: "My NFT",
 *   image: "ipfs://...",
 *   tokenURI: "ipfs://...",
 *   metadata: {...},
 * }
 * 
 * @param {string} address - Ethereum address
 * @returns {Promise<Array>}
 */
export async function fetchEthereumNFTs(address) {
  if (!address || !address.match(/^0x[a-fA-F0-9]{40}$/)) {
    throw new Error('Invalid Ethereum address')
  }

  // Try Alchemy first (better quality)
  if (ALCHEMY_KEY) {
    try {
      return await fetchFromAlchemy(address)
    } catch (err) {
      console.warn(`[Ethereum] Alchemy error: ${err.message}`)
      // Fall through to OpenSea
    }
  }

  // Fallback to OpenSea
  return fetchFromOpenSea(address)
}

/**
 * Fetch from Alchemy API (preferred)
 */
async function fetchFromAlchemy(address) {
  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), 10000)

  try {
    const response = await fetch(
      `${ALCHEMY_URL}/getNFTs?owner=${address}&withMetadata=true&pageSize=100`,
      {
        signal: controller.signal,
        headers: {
          'accept': 'application/json',
        },
      }
    )

    clearTimeout(timeout)

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`)
    }

    const data = await response.json()

    // Normalize to standard format
    return (data.ownedNfts || []).map((nft) => ({
      id: `eth-${nft.contract.address}-${nft.tokenId}`,
      chain: 'ethereum',
      contract: nft.contract.address,
      tokenId: nft.tokenId,
      name:
        nft.name ||
        nft.rawMetadata?.name ||
        `#${nft.tokenId}`,
      image:
        nft.image?.cachedUrl ||
        nft.image?.originalUrl ||
        nft.rawMetadata?.image ||
        null,
      tokenURI: nft.tokenUri?.raw || null,
      metadata: nft.rawMetadata || {},
    }))
  } catch (err) {
    clearTimeout(timeout)
    throw err
  }
}

/**
 * Fetch from OpenSea API (fallback)
 */
async function fetchFromOpenSea(address) {
  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), 10000)

  try {
    const response = await fetch(
      `${OPENSEA_URL}/assets?owner=${address}&limit=50`,
      {
        signal: controller.signal,
        headers: {
          'user-agent': 'mozilla/5.0',
          'accept': 'application/json',
        },
      }
    )

    clearTimeout(timeout)

    if (!response.ok) {
      if (response.status === 429) {
        throw new Error('Rate limited by OpenSea')
      }
      throw new Error(`HTTP ${response.status}`)
    }

    const data = await response.json()

    // Normalize to standard format
    return (data.assets || []).map((asset) => ({
      id: `eth-${asset.asset_contract.address}-${asset.token_id}`,
      chain: 'ethereum',
      contract: asset.asset_contract.address,
      tokenId: asset.token_id,
      name: asset.name || `#${asset.token_id}`,
      image: asset.image_url || asset.image_thumbnail_url || null,
      tokenURI: asset.token_metadata || null,
      metadata: asset.metadata || {},
    }))
  } catch (err) {
    clearTimeout(timeout)
    throw err
  }
}

/**
 * Fetch single NFT metadata
 */
export async function fetchSingleNFT(contract, tokenId) {
  if (!ALCHEMY_KEY) {
    throw new Error('Alchemy key required')
  }

  const response = await fetch(`${ALCHEMY_URL}/getNFTMetadata`, {
    method: 'GET',
    headers: {
      'accept': 'application/json',
    },
  })

  if (!response.ok) {
    throw new Error(`HTTP ${response.status}`)
  }

  const data = await response.json()

  if (!data.ownedNfts?.[0]) {
    throw new Error('NFT not found')
  }

  const nft = data.ownedNfts[0]

  return {
    id: `eth-${contract}-${tokenId}`,
    chain: 'ethereum',
    contract,
    tokenId,
    name: nft.name || `#${tokenId}`,
    image: nft.image?.cachedUrl || null,
    tokenURI: nft.tokenUri?.raw || null,
    metadata: nft.rawMetadata || {},
  }
}
```

### File: `src/lib/server/nft/tezos-fetcher.js` (NEW)

```javascript
/**
 * tezos-fetcher.js — Fetch FA2 NFTs from Tezos
 * 
 * Uses: TzKT API (free, no rate limit)
 * 
 * Returns: Normalized NFT objects with IPFS detection
 */

/**
 * Configuration
 */
const TZKT_API = 'https://api.tzkt.io/v1'
const TZKT_TIMEOUT_MS = 10000

/**
 * ✅ Fetch FA2 NFTs from user's address
 * 
 * Returns normalized NFT objects
 * 
 * @param {string} address - Tezos address (tz1...)
 * @returns {Promise<Array>}
 */
export async function fetchTezosNFTs(address) {
  if (!address || !address.match(/^tz[1-3][a-zA-Z0-9]{33}$/)) {
    throw new Error('Invalid Tezos address')
  }

  try {
    const controller = new AbortController()
    const timeout = setTimeout(() => controller.abort(), TZKT_TIMEOUT_MS)

    // Get all tokens owned by address (balance > 0)
    const response = await fetch(
      `${TZKT_API}/accounts/${address}/tokens?balance.gt=0&limit=10000`,
      {
        signal: controller.signal,
        headers: {
          'accept': 'application/json',
        },
      }
    )

    clearTimeout(timeout)

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`)
    }

    const tokens = await response.json()

    // Filter for likely NFTs (balance = 1 or tokenId = 0)
    // and normalize to standard format
    const nfts = tokens
      .filter((t) => {
        // NFTs typically have balance = 1
        // Some collections use tokenId = 0 as metadata pointer
        return t.balance === 1 || t.token.tokenId === '0'
      })
      .map((t) => ({
        id: `tez-${t.token.contract.address}-${t.token.tokenId}`,
        chain: 'tezos',
        contract: t.token.contract.address,
        tokenId: t.token.tokenId,
        name:
          t.token.metadata?.name ||
          t.token.metadata?.symbol ||
          `Token ${t.token.tokenId}`,
        image:
          t.token.metadata?.artifactUri ||
          t.token.metadata?.displayUri ||
          null,
        tokenURI: t.token.metadata?.uri || null,
        metadata: t.token.metadata || {},
      }))

    return nfts
  } catch (err) {
    if (err.name === 'AbortError') {
      throw new Error('TzKT timeout')
    }
    throw new Error(`TzKT fetch error: ${err.message}`)
  }
}

/**
 * Get contract info from Tezos
 */
export async function getTezosContractInfo(address) {
  try {
    const response = await fetch(`${TZKT_API}/contracts/${address}`, {
      headers: { 'accept': 'application/json' },
    })

    if (!response.ok) {
      return null
    }

    return await response.json()
  } catch {
    return null
  }
}
```

### File: `src/lib/server/nft/ipfs-filter.js` (NEW)

```javascript
/**
 * ipfs-filter.js — Detect IPFS-based NFTs
 * 
 * Extracts all IPFS CIDs from NFT metadata
 * Filters NFTs to only IPFS-based ones
 */

/**
 * CID extraction patterns
 */
const CID_PATTERNS = {
  v0: /Qm[a-zA-Z0-9]{44}/g,  // QmXxxx...
  v1: /bafy[a-zA-Z0-9]+/g,   // bafyXxxx...
}

/**
 * ✅ Check if NFT has IPFS metadata
 * 
 * Returns true if:
 * - tokenURI is on IPFS
 * - image is on IPFS
 * - any metadata field references IPFS
 * 
 * @param {Object} nft - NFT object
 * @returns {boolean}
 */
export function hasIPFS(nft) {
  const { tokenURI, image, metadata } = nft || {}

  // Check tokenURI
  if (isIPFS(tokenURI)) return true

  // Check image
  if (isIPFS(image)) return true

  // Check metadata fields
  if (metadata) {
    for (const value of Object.values(metadata)) {
      if (isIPFS(value)) return true
    }
  }

  return false
}

/**
 * Check if value is IPFS reference
 */
function isIPFS(value) {
  if (!value || typeof value !== 'string') return false

  return (
    value.startsWith('ipfs://') ||
    value.startsWith('/ipfs/') ||
    value.includes('ipfs') ||
    /Qm[a-zA-Z0-9]{44}/.test(value) ||
    /bafy[a-zA-Z0-9]+/.test(value)
  )
}

/**
 * ✅ Extract all IPFS CIDs from NFT
 * 
 * Recursively searches:
 * - tokenURI
 * - image
 * - all metadata fields
 * 
 * Returns deduplicated CID list
 * 
 * @param {Object} nft - NFT object
 * @returns {Array<string>} - List of unique CIDs
 */
export function extractIPFSCIDs(nft) {
  const cids = new Set()

  /**
   * Extract CIDs from string
   */
  const extractFromString = (str) => {
    if (!str || typeof str !== 'string') return

    // Try both CID v0 and v1 patterns
    for (const pattern of Object.values(CID_PATTERNS)) {
      const matches = str.match(pattern)
      if (matches) {
        matches.forEach((cid) => cids.add(cid))
      }
    }
  }

  /**
   * Recursively extract from object
   */
  const recurse = (obj, depth = 0) => {
    if (depth > 10) return  // Prevent infinite recursion
    if (!obj || typeof obj !== 'object') return

    if (Array.isArray(obj)) {
      obj.forEach((item) => recurse(item, depth + 1))
    } else {
      Object.values(obj).forEach((value) => {
        if (typeof value === 'string') {
          extractFromString(value)
        } else {
          recurse(value, depth + 1)
        }
      })
    }
  }

  // Extract from all fields
  extractFromString(nft?.tokenURI)
  extractFromString(nft?.image)
  recurse(nft?.metadata)

  return Array.from(cids)
}

/**
 * ✅ Normalize IPFS URI to gateway URL
 * 
 * Converts:
 * - ipfs://Qm... → https://w3s.link/ipfs/Qm...
 * - /ipfs/Qm... → https://w3s.link/ipfs/Qm...
 * - Qm... → https://w3s.link/ipfs/Qm...
 * 
 * @param {string} ipfsUri - IPFS reference
 * @param {string} gateway - Gateway URL (default: w3s.link)
 * @returns {string} - HTTPS URL
 */
export function ipfsUriToGatewayUrl(ipfsUri, gateway = 'https://w3s.link') {
  if (!ipfsUri) return null

  let cid = ipfsUri
    .replace(/^ipfs:\/\//, '')
    .replace(/^\/ipfs\//, '')
    .split('/')[0]

  if (!cid || (!cid.startsWith('Qm') && !cid.startsWith('bafy'))) {
    return null
  }

  return `${gateway}/ipfs/${cid}`
}

/**
 * Extract metadata CID from tokenURI
 */
export function extractMetadataCID(tokenURI) {
  if (!tokenURI) return null

  const cids = extractIPFSCIDs({ tokenURI })
  return cids.length > 0 ? cids[0] : null
}

/**
 * Filter NFTs to only IPFS-based ones
 */
export function filterIPFSNFTs(nfts) {
  return nfts.filter((nft) => hasIPFS(nft))
}

/**
 * Enrich NFTs with IPFS info
 */
export function enrichWithIPFSInfo(nfts) {
  return nfts.map((nft) => ({
    ...nft,
    hasIPFS: hasIPFS(nft),
    ipfsCIDs: extractIPFSCIDs(nft),
    metadataCID: extractMetadataCID(nft.tokenURI),
  }))
}
```

### File: `src/lib/server/nft/batch-coordinator.js` (NEW)

```javascript
/**
 * batch-coordinator.js — Coordinate batch NFT scanning
 * 
 * Orchestrates:
 * 1. Load job metadata
 * 2. Extract IPFS CIDs from selected NFTs
 * 3. Use existing scanner for CID scanning
 * 4. Collect results
 * 5. Build export formats
 */

import { scan } from '../ipfs/scanner.js'
import { updateJob, loadJob } from '../ipfs/job-store.js'
import { extractIPFSCIDs } from './ipfs-filter.js'

/**
 * ✅ Scan selected NFTs for IPFS metadata
 * 
 * @param {string} jobId - Job ID for tracking
 * @param {Array} selectedNFTs - NFT objects to scan
 * @param {Object} options - Configuration
 * @returns {Promise<{results: Array, summary: Object}>}
 */
export async function scanNFTBatch(jobId, selectedNFTs, options = {}) {
  const { onProgress } = options

  try {
    // ✅ Update job: started scanning
    await updateJob(jobId, {
      status: 'scanning',
      progress: { current: 0, total: selectedNFTs.length },
    })

    const results = []

    // ✅ Process each NFT
    for (let i = 0; i < selectedNFTs.length; i++) {
      const nft = selectedNFTs[i]

      try {
        // Extract metadata CID
        const metadataCID = extractIPFSCIDs(nft)[0]

        if (!metadataCID) {
          results.push({
            nft: nft.id,
            chain: nft.chain,
            status: 'skipped',
            reason: 'No IPFS CID found',
          })
          continue
        }

        // ✅ Scan this CID using existing scanner
        const scanResult = await scan(metadataCID, (progress) => {
          // Report sub-progress
          onProgress?.({
            nftIndex: i,
            totalNFTs: selectedNFTs.length,
            currentNFT: nft.name,
            cid: metadataCID,
            cidProgress: progress,
          })
        })

        // ✅ Store result
        results.push({
          nft: nft.id,
          name: nft.name,
          chain: nft.chain,
          contract: nft.contract,
          tokenId: nft.tokenId,
          metadataCID,
          scan: scanResult,
          status: 'success',
        })
      } catch (err) {
        results.push({
          nft: nft.id,
          name: nft.name,
          chain: nft.chain,
          status: 'error',
          error: err.message,
        })
      }

      // ✅ Update progress
      await updateJob(jobId, {
        progress: { current: i + 1, total: selectedNFTs.length },
      })

      onProgress?.({
        nftIndex: i + 1,
        totalNFTs: selectedNFTs.length,
      })
    }

    // ✅ Calculate summary
    const summary = {
      totalNFTs: selectedNFTs.length,
      successful: results.filter((r) => r.status === 'success').length,
      failed: results.filter((r) => r.status === 'error').length,
      skipped: results.filter((r) => r.status === 'skipped').length,
      totalFiles: results.reduce(
        (sum, r) => sum + (r.scan?.summary?.totalFiles || 0),
        0
      ),
      totalSize: results.reduce(
        (sum, r) => sum + (r.scan?.summary?.totalSize || 0),
        0
      ),
    }

    // ✅ Update job: complete
    await updateJob(jobId, {
      status: 'complete',
      progress: { current: selectedNFTs.length, total: selectedNFTs.length },
      result: { results, summary },
    })

    return { results, summary }
  } catch (err) {
    // ✅ Update job: error
    await updateJob(jobId, {
      status: 'error',
      error: err.message,
    })

    throw err
  }
}

/**
 * Get job result (for polling)
 */
export async function getJobResult(jobId) {
  const job = await loadJob(jobId)

  return {
    jobId,
    status: job.status,
    progress: job.progress,
    result: job.result,
    error: job.error,
  }
}
```

### File: `src/lib/server/nft/export-builder.js` (NEW)

```javascript
/**
 * export-builder.js — Build export formats (manifest.json + CSV)
 */

/**
 * ✅ Build manifest.json export
 * 
 * Format:
 * {
 *   exported: "2024-01-01T...",
 *   nfts: [
 *     {
 *       id: "eth-0x...-123",
 *       name: "My NFT",
 *       metadataCID: "bafy...",
 *       scan: { tree: [...], archiveFiles: [...], ... }
 *     }
 *   ],
 *   summary: {...}
 * }
 * 
 * @param {Object} jobResult - Job result from batch-coordinator
 * @returns {Object}
 */
export function buildManifest(jobResult) {
  const { results, summary } = jobResult

  return {
    exported: new Date().toISOString(),
    version: '1.0',
    summary,
    nfts: results
      .filter((r) => r.status === 'success')
      .map((r) => ({
        id: r.nft,
        name: r.name,
        chain: r.chain,
        contract: r.contract,
        tokenId: r.tokenId,
        metadataCID: r.metadataCID,
        scan: {
          rootCid: r.scan.rootCid,
          metadata: r.scan.metadata,
          tree: r.scan.tree,
          summary: r.scan.summary,
          asyncLabelMap: r.scan.asyncLabelMap,
        },
      })),
  }
}

/**
 * ✅ Build ready2pin.csv export
 * 
 * CSV columns:
 * - NFT ID
 * - Name
 * - Chain
 * - Contract
 * - Token ID
 * - Metadata CID
 * - Total Files
 * - Total Size
 * - Success Files
 * - Status
 * 
 * @param {Object} jobResult - Job result from batch-coordinator
 * @returns {string} - CSV content
 */
export function buildReadyToPinCSV(jobResult) {
  const { results } = jobResult

  // CSV header
  const headers = [
    'NFT ID',
    'Name',
    'Chain',
    'Contract',
    'Token ID',
    'Metadata CID',
    'Total Files',
    'Total Size (bytes)',
    'Success Files',
    'Status',
  ]

  // CSV rows
  const rows = results.map((r) => {
    if (r.status === 'error') {
      return [
        r.nft,
        r.name || 'N/A',
        r.chain,
        r.contract || 'N/A',
        r.tokenId || 'N/A',
        'N/A',
        '0',
        '0',
        '0',
        `Error: ${r.error}`,
      ]
    }

    if (r.status === 'skipped') {
      return [
        r.nft,
        'N/A',
        r.chain,
        'N/A',
        'N/A',
        'N/A',
        '0',
        '0',
        '0',
        `Skipped: ${r.reason}`,
      ]
    }

    // Success
    return [
      r.nft,
      r.name,
      r.chain,
      r.contract,
      r.tokenId,
      r.metadataCID,
      r.scan.summary.totalFiles,
      r.scan.summary.totalSize,
      r.scan.summary.successCount,
      'Success',
    ]
  })

  // Escape CSV values
  const escapeCsvValue = (value) => {
    if (!value) return ''
    const str = String(value)
    if (str.includes(',') || str.includes('"') || str.includes('\n')) {
      return `"${str.replace(/"/g, '""')}"`
    }
    return str
  }

  // Build CSV
  const csvLines = [
    headers.map(escapeCsvValue).join(','),
    ...rows.map((row) => row.map(escapeCsvValue).join(',')),
  ]

  return csvLines.join('\n')
}

/**
 * ✅ Build DAG export (for Pinning)
 * 
 * Collects all IPFS files from all scanned NFTs
 * Ready for CAR export or pinning
 * 
 * @param {Object} jobResult
 * @returns {Array<{path: string, cid: string, bytes: Uint8Array}>}
 */
export function buildDAGExport(jobResult) {
  const { results } = jobResult
  const files = []
  const seenCIDs = new Set()

  results.forEach((result) => {
    if (result.status !== 'success') return

    const { nft, name, scan } = result

    // Add all archive files from this NFT's scan
    scan.archiveFiles.forEach((file) => {
      const uniqueKey = `${nft}/${file.path}`

      if (!seenCIDs.has(uniqueKey)) {
        files.push({
          path: `${nft}/${name || 'unknown'}/${file.path}`,
          cid: file.cid,
          bytes: file.bytes,
        })
        seenCIDs.add(uniqueKey)
      }
    })
  })

  return files
}

/**
 * Convert manifest to JSON string
 */
export function manifestToJSON(manifest) {
  return JSON.stringify(manifest, null, 2)
}

/**
 * Convert manifest to Buffer
 */
export function manifestToBuffer(manifest) {
  const json = manifestToJSON(manifest)
  return Buffer.from(json, 'utf8')
}

/**
 * Convert CSV to Buffer
 */
export function csvToBuffer(csv) {
  return Buffer.from(csv, 'utf8')
}
```

---

## API ENDPOINTS

### File: `src/routes/api/nft/resolve/+server.js` (NEW)

```javascript
import { json } from '@sveltejs/kit'
import { resolveName } from '$lib/server/nft/name-resolver.js'

/**
 * POST /api/nft/resolve
 * 
 * Body: { input: "vitalik.eth" or "0x..." or "example.tez" }
 * 
 * Response: { address, chain, resolvedAt }
 */
export async function POST({ request }) {
  try {
    const body = await request.json()
    const input = body?.input?.trim()

    if (!input) {
      return json(
        { error: 'Missing input' },
        { status: 400 }
      )
    }

    const result = await resolveName(input)

    return json(result)
  } catch (err) {
    return json(
      { error: err.message },
      { status: 400 }
    )
  }
}
```

### File: `src/routes/api/nft/fetch/+server.js` (NEW)

```javascript
import { json } from '@sveltejs/kit'
import { fetchEthereumNFTs } from '$lib/server/nft/ethereum-fetcher.js'
import { fetchTezosNFTs } from '$lib/server/nft/tezos-fetcher.js'
import { enrichWithIPFSInfo, filterIPFSNFTs } from '$lib/server/nft/ipfs-filter.js'

/**
 * GET /api/nft/fetch?address=0x...&chain=ethereum
 * 
 * Query params:
 * - address: User's blockchain address
 * - chain: "ethereum" or "tezos"
 * 
 * Response: { address, chain, nfts, totalCount, ipfsCount }
 */
export async function GET({ url }) {
  try {
    const address = url.searchParams.get('address')
    const chain = url.searchParams.get('chain')

    if (!address || !chain) {
      return json(
        { error: 'Missing address or chain' },
        { status: 400 }
      )
    }

    if (!['ethereum', 'tezos'].includes(chain)) {
      return json(
        { error: 'Invalid chain' },
        { status: 400 }
      )
    }

    let nfts = []

    // Fetch NFTs based on chain
    if (chain === 'ethereum') {
      nfts = await fetchEthereumNFTs(address)
    } else if (chain === 'tezos') {
      nfts = await fetchTezosNFTs(address)
    }

    // Enrich with IPFS info + filter
    const enriched = enrichWithIPFSInfo(nfts)
    const ipfsNFTs = filterIPFSNFTs(enriched)

    return json({
      address,
      chain,
      totalCount: nfts.length,
      ipfsCount: ipfsNFTs.length,
      nfts: ipfsNFTs,
    })
  } catch (err) {
    console.error('[NFT Fetch]', err)
    return json(
      { error: err.message },
      { status: 500 }
    )
  }
}
```

### File: `src/routes/api/nft/scan-batch/+server.js` (NEW)

```javascript
import { json } from '@sveltejs/kit'
import { createJob, updateJob } from '$lib/server/ipfs/job-store.js'
import { scanNFTBatch } from '$lib/server/nft/batch-coordinator.js'

/**
 * POST /api/nft/scan-batch
 * 
 * Body: {
 *   nfts: [{id, name, chain, contract, tokenId, tokenURI, metadata}, ...],
 *   options: { ... }
 * }
 * 
 * Response: { jobId, status }
 * 
 * Creates background job, returns immediately
 */
export async function POST({ request }) {
  try {
    const body = await request.json()
    const { nfts } = body

    if (!nfts || !Array.isArray(nfts) || nfts.length === 0) {
      return json(
        { error: 'Missing or empty nfts array' },
        { status: 400 }
      )
    }

    // Generate unique job ID
    const jobId = `nft_${Date.now()}_${Math.random().toString(36).slice(2, 11)}`

    // Create job
    const job = await createJob(jobId)

    // Start scanning in background (don't await)
    scanNFTBatch(jobId, nfts).catch((err) => {
      console.error(`[Scan Batch] Job ${jobId} failed:`, err)
      updateJob(jobId, { status: 'error', error: err.message }).catch(
        console.error
      )
    })

    // Return job ID immediately
    return json({
      jobId,
      status: 'queued',
    })
  } catch (err) {
    return json(
      { error: err.message },
      { status: 500 }
    )
  }
}
```

### File: `src/routes/api/nft/scan-batch/[jobId]/status/+server.js` (NEW)

```javascript
import { json } from '@sveltejs/kit'
import { loadJob, jobExists } from '$lib/server/ipfs/job-store.js'

/**
 * GET /api/nft/scan-batch/{jobId}/status
 * 
 * Response: { status, progress, result, error }
 */
export async function GET({ params }) {
  try {
    const { jobId } = params

    const exists = await jobExists(jobId)
    if (!exists) {
      return json(
        { error: 'Job not found' },
        { status: 404 }
      )
    }

    const job = await loadJob(jobId)

    return json({
      jobId,
      status: job.status,
      progress: job.progress,
      result: job.result,
      error: job.error,
      updatedAt: new Date(job.updatedAt).toISOString(),
    })
  } catch (err) {
    return json(
      { error: err.message },
      { status: 500 }
    )
  }
}
```

### File: `src/routes/api/nft/export/manifest/[jobId]/+server.js` (NEW)

```javascript
import { loadJob } from '$lib/server/ipfs/job-store.js'
import { buildManifest, manifestToBuffer } from '$lib/server/nft/export-builder.js'

/**
 * GET /api/nft/export/manifest/{jobId}
 * 
 * Downloads: manifest.json
 */
export async function GET({ params }) {
  try {
    const { jobId } = params

    const job = await loadJob(jobId)

    if (job.status !== 'complete') {
      return new Response(
        JSON.stringify({ error: 'Job not complete' }),
        { status: 400, headers: { 'content-type': 'application/json' } }
      )
    }

    if (!job.result) {
      return new Response(
        JSON.stringify({ error: 'No result' }),
        { status: 400, headers: { 'content-type': 'application/json' } }
      )
    }

    // Build manifest
    const manifest = buildManifest(job.result)
    const buffer = manifestToBuffer(manifest)

    return new Response(buffer, {
      headers: {
        'content-type': 'application/json',
        'content-disposition': 'attachment; filename="manifest.json"',
      },
    })
  } catch (err) {
    return new Response(
      JSON.stringify({ error: err.message }),
      { status: 500, headers: { 'content-type': 'application/json' } }
    )
  }
}
```

### File: `src/routes/api/nft/export/ready2pin/[jobId]/+server.js` (NEW)

```javascript
import { loadJob } from '$lib/server/ipfs/job-store.js'
import { buildReadyToPinCSV, csvToBuffer } from '$lib/server/nft/export-builder.js'

/**
 * GET /api/nft/export/ready2pin/{jobId}
 * 
 * Downloads: ready2pin.csv
 */
export async function GET({ params }) {
  try {
    const { jobId } = params

    const job = await loadJob(jobId)

    if (job.status !== 'complete') {
      return new Response(
        JSON.stringify({ error: 'Job not complete' }),
        { status: 400, headers: { 'content-type': 'application/json' } }
      )
    }

    if (!job.result) {
      return new Response(
        JSON.stringify({ error: 'No result' }),
        { status: 400, headers: { 'content-type': 'application/json' } }
      )
    }

    // Build CSV
    const csv = buildReadyToPinCSV(job.result)
    const buffer = csvToBuffer(csv)

    return new Response(buffer, {
      headers: {
        'content-type': 'text/csv; charset=utf-8',
        'content-disposition': 'attachment; filename="ready2pin.csv"',
      },
    })
  } catch (err) {
    return new Response(
      JSON.stringify({ error: err.message }),
      { status: 500, headers: { 'content-type': 'application/json' } }
    )
  }
}
```

---

## UI COMPONENTS

### File: `src/lib/components/NFTAddressInput.svelte` (NEW)

```svelte
<script>
  import { onMount } from 'svelte'

  let input = ''
  let loading = false
  let error = ''
  let nfts = []
  let selectedNFTs = new Set()
  let scanning = false
  let scanProgress = {}
  let jobId = ''

  async function handleSearch() {
    if (!input.trim()) return

    loading = true
    error = ''
    nfts = []

    try {
      // Resolve name/address
      const resolveRes = await fetch('/api/nft/resolve', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ input: input.trim() })
      })

      if (!resolveRes.ok) {
        const err = await resolveRes.json()
        throw new Error(err.error || 'Resolution failed')
      }

      const { address, chain } = await resolveRes.json()

      // Fetch NFTs
      const fetchRes = await fetch(
        `/api/nft/fetch?address=${encodeURIComponent(address)}&chain=${chain}`
      )

      if (!fetchRes.ok) {
        const err = await fetchRes.json()
        throw new Error(err.error || 'Fetch failed')
      }

      const data = await fetchRes.json()
      nfts = data.nfts

      if (nfts.length === 0) {
        error = 'No IPFS-based NFTs found for this address'
      }
    } catch (err) {
      error = err.message
    } finally {
      loading = false
    }
  }

  async function startScan() {
    if (selectedNFTs.size === 0) {
      error = 'Select at least one NFT'
      return
    }

    scanning = true
    error = ''

    try {
      const selectedArray = nfts.filter((n) => selectedNFTs.has(n.id))

      const res = await fetch('/api/nft/scan-batch', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ nfts: selectedArray })
      })

      if (!res.ok) {
        const err = await res.json()
        throw new Error(err.error || 'Scan failed')
      }

      const { jobId: newJobId } = await res.json()
      jobId = newJobId
      await pollScanStatus(jobId)
    } catch (err) {
      error = err.message
      scanning = false
    }
  }

  async function pollScanStatus(id) {
    let attempts = 0
    const maxAttempts = 300  // 5 minutes with 1s interval

    while (scanning && attempts < maxAttempts) {
      try {
        const res = await fetch(`/api/nft/scan-batch/${id}/status`)

        if (!res.ok) {
          throw new Error('Status check failed')
        }

        const { status, progress, error: jobError } = await res.json()

        scanProgress = progress

        if (status === 'complete') {
          scanning = false
          break
        }

        if (status === 'error') {
          throw new Error(jobError || 'Scan error')
        }

        attempts++
        await new Promise((r) => setTimeout(r, 1000))
      } catch (err) {
        error = err.message
        scanning = false
        break
      }
    }

    if (attempts >= maxAttempts) {
      error = 'Scan timeout'
      scanning = false
    }
  }

  function toggleNFT(nftId) {
    const newSet = new Set(selectedNFTs)
    if (newSet.has(nftId)) {
      newSet.delete(nftId)
    } else {
      newSet.add(nftId)
    }
    selectedNFTs = newSet
  }
</script>

<div class="nft-section">
  <h2>🌍 NFT IPFS Checker</h2>
  <p class="subtitle">Enter your address, ENS, or TEZ domain to find IPFS-based NFTs</p>

  <!-- Input -->
  <div class="input-group">
    <input
      type="text"
      placeholder="0x... | vitalik.eth | example.tez"
      bind:value={input}
      on:keydown={(e) => e.key === 'Enter' && handleSearch()}
      disabled={loading || scanning}
      class="address-input"
    />
    <button on:click={handleSearch} disabled={loading || scanning} class="btn-primary">
      {loading ? '🔄 Searching...' : '🔍 Search'}
    </button>
  </div>

  {#if error}
    <p class="error">❌ {error}</p>
  {/if}

  <!-- Stats -->
  {#if nfts.length > 0}
    <div class="stats">
      <div class="stat-item">
        <strong>{nfts.length}</strong> IPFS NFTs found
      </div>
      <div class="stat-item">
        <strong>{selectedNFTs.size}</strong> selected
      </div>
    </div>
  {/if}

  <!-- NFT List -->
  {#if nfts.length > 0}
    <div class="nft-list">
      {#each nfts as nft (nft.id)}
        <div class="nft-item" class:selected={selectedNFTs.has(nft.id)}>
          <input
            type="checkbox"
            checked={selectedNFTs.has(nft.id)}
            on:change={() => toggleNFT(nft.id)}
            disabled={scanning}
          />
          <div class="nft-info">
            <h3>{nft.name}</h3>
            <p class="chain-badge">{nft.chain.toUpperCase()}</p>
            <p class="contract">
              {nft.contract.slice(0, 10)}...{nft.contract.slice(-8)}
            </p>
            {#if nft.image}
              <img src={nft.image} alt={nft.name} class="nft-image" />
            {/if}
            {#if nft.ipfsCIDs?.length}
              <p class="cids-info">{nft.ipfsCIDs.length} IPFS CID(s)</p>
            {/if}
          </div>
        </div>
      {/each}

      <!-- Scan Button -->
      <button
        class="btn-scan"
        on:click={startScan}
        disabled={selectedNFTs.size === 0 || scanning}
      >
        {scanning
          ? `⏳ Scanning: ${scanProgress.current || 0}/${scanProgress.total || 0}`
          : `📊 Scan ${selectedNFTs.size} Selected NFT${selectedNFTs.size === 1 ? '' : 's'}`}
      </button>

      <!-- Export Buttons -->
      {#if !scanning && scanProgress.current === scanProgress.total && scanProgress.total > 0}
        <div class="export-buttons">
          <a
            href="/api/nft/export/manifest/{jobId}"
            download="manifest.json"
            class="btn-export"
          >
            📄 Manifest
          </a>
          <a
            href="/api/nft/export/ready2pin/{jobId}"
            download="ready2pin.csv"
            class="btn-export"
          >
            📋 Ready2Pin CSV
          </a>
        </div>
      {/if}
    </div>
  {/if}
</div>

<style>
  .nft-section {
    padding: 2rem;
    max-width: 800px;
    margin: 0 auto;
  }

  h2 {
    font-size: 1.5rem;
    margin-bottom: 0.5rem;
  }

  .subtitle {
    color: #666;
    margin-bottom: 1.5rem;
  }

  .input-group {
    display: flex;
    gap: 0.5rem;
    margin-bottom: 1rem;
  }

  .address-input {
    flex: 1;
    padding: 0.75rem;
    border: 2px solid #ddd;
    border-radius: 0.5rem;
    font-family: monospace;
    font-size: 0.9rem;
    transition: border-color 0.2s;
  }

  .address-input:focus {
    outline: none;
    border-color: #ff6b35;
  }

  .btn-primary {
    padding: 0.75rem 1.5rem;
    background: #ff6b35;
    color: white;
    border: none;
    border-radius: 0.5rem;
    cursor: pointer;
    font-weight: 500;
    transition: background 0.2s;
  }

  .btn-primary:hover:not(:disabled) {
    background: #e55a24;
  }

  .btn-primary:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .error {
    background: #fee;
    border-left: 4px solid #d32f2f;
    padding: 1rem;
    border-radius: 0.25rem;
    margin-bottom: 1rem;
    color: #d32f2f;
  }

  .stats {
    display: flex;
    gap: 1rem;
    margin-bottom: 1rem;
    padding: 1rem;
    background: #f5f5f5;
    border-radius: 0.5rem;
  }

  .stat-item {
    flex: 1;
    text-align: center;
  }

  .stat-item strong {
    color: #ff6b35;
    font-size: 1.2rem;
  }

  .nft-list {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .nft-item {
    display: flex;
    gap: 1rem;
    padding: 1rem;
    border: 2px solid #eee;
    border-radius: 0.5rem;
    cursor: pointer;
    transition: all 0.2s;
  }

  .nft-item:hover {
    border-color: #ff6b35;
    background: #fafafa;
  }

  .nft-item.selected {
    border-color: #ff6b35;
    background: #fff9f6;
  }

  .nft-item input[type="checkbox"] {
    width: 20px;
    height: 20px;
    cursor: pointer;
  }

  .nft-info {
    flex: 1;
  }

  .nft-info h3 {
    margin: 0 0 0.25rem 0;
    font-size: 1rem;
  }

  .chain-badge {
    display: inline-block;
    font-size: 0.75rem;
    padding: 0.25rem 0.5rem;
    background: #ff6b35;
    color: white;
    border-radius: 0.25rem;
    margin: 0.25rem 0;
  }

  .contract {
    font-size: 0.75rem;
    color: #999;
    margin: 0.25rem 0;
    font-family: monospace;
  }

  .nft-image {
    width: 60px;
    height: 60px;
    object-fit: cover;
    border-radius: 0.25rem;
    margin-top: 0.5rem;
  }

  .cids-info {
    font-size: 0.75rem;
    color: #666;
    margin-top: 0.5rem;
  }

  .btn-scan {
    width: 100%;
    padding: 1rem;
    margin-top: 1rem;
    background: #ff6b35;
    color: white;
    border: none;
    border-radius: 0.5rem;
    font-size: 1rem;
    font-weight: 500;
    cursor: pointer;
    transition: background 0.2s;
  }

  .btn-scan:hover:not(:disabled) {
    background: #e55a24;
  }

  .btn-scan:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .export-buttons {
    display: flex;
    gap: 1rem;
    margin-top: 1.5rem;
  }

  .btn-export {
    flex: 1;
    padding: 0.75rem;
    background: #4CAF50;
    color: white;
    text-align: center;
    text-decoration: none;
    border-radius: 0.5rem;
    font-weight: 500;
    transition: background 0.2s;
  }

  .btn-export:hover {
    background: #45a049;
  }
</style>
```

---

## TESTING

### File: `test/phase-6.test.js`

```javascript
import { test, describe, beforeEach } from 'vitest'
import { resolveName } from '../src/lib/server/nft/name-resolver.js'
import { hasIPFS, extractIPFSCIDs } from '../src/lib/server/nft/ipfs-filter.js'

describe('Phase 6: NFT Checker', () => {
  test('resolveName handles direct Ethereum address', async () => {
    const result = await resolveName('0x1234567890123456789012345678901234567890')
    expect(result.chain).toBe('ethereum')
  })

  test('hasIPFS detects IPFS metadata', () => {
    const nft = {
      tokenURI: 'ipfs://bafy...',
      image: 'https://example.com/image.png',
      metadata: {}
    }
    expect(hasIPFS(nft)).toBe(true)
  })

  test('extractIPFSCIDs finds all CIDs', () => {
    const nft = {
      tokenURI: 'ipfs://bafy123...',
      image: 'ipfs://QmABC...',
      metadata: {
        nested: {
          cid: 'bafyXYZ...'
        }
      }
    }
    const cids = extractIPFSCIDs(nft)
    expect(cids.length).toBeGreaterThanOrEqual(3)
  })
})
```

---

## DEPLOYMENT

### Environment Variables

Add to `.env.production`:

```bash
# Alchemy (optional but recommended)
ALCHEMY_KEY=...

# Ethereum RPC
ETHEREUM_RPC_URL=https://eth.llamarpc.com

# TEZ Domains
# (uses public API, no key needed)
```

### Deploy Steps

```bash
# 1. Create feature branch
git checkout -b feat/nft-checker-phase6

# 2. Add all Phase 6 files
git add src/lib/server/nft/
git add src/lib/components/NFTAddressInput.svelte
git add src/routes/api/nft/

# 3. Commit
git commit -m "feat: NFT wallet checker (Phase 6)

- NFT fetching (Ethereum + Tezos)
- IPFS detection + filtering
- Batch scanning integration
- Export (manifest + CSV)
- Unified UI"

# 4. Test locally
npm run test

# 5. Deploy to staging
git push origin feat/nft-checker-phase6
```

**End of Phase 6 Implementation**

Next: Phase 7 (Integration Plan)
