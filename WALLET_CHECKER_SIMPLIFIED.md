# NFT Checker — Simplified Architecture (No Wallet Connection)

## 🎯 Simple Flow

```
User pastes address or ENS/TEZ name
        ↓
POST /api/nft/resolve
  → Resolve ENS/TEZ to address
  ↓
GET /api/nft/fetch?address=0x...&chain=ethereum|tezos
  → Fetch user's NFTs from chain
  ↓
Filter IPFS-based metadata
        ↓
Display NFT list with IPFS status
        ↓
User clicks "Scan Selected" (or "Scan All")
        ↓
POST /api/nft/scan-batch
  → Background job for each NFT
  ↓
Poll /api/nft/scan-batch/:jobId/status
        ↓
Export buttons:
  - manifest.json
  - ready2pin.csv
```

---

## 📦 Implementation — Much Simpler!

### Phase 1: Address Input + ENS/TEZ Resolution
**Files to create:**
- `src/lib/server/nft/name-resolver.js` — Resolve ENS + TEZ domains
- `src/routes/api/nft/resolve/+server.js` — Resolve endpoint

### Phase 2: Fetch NFTs
**Files to create:**
- `src/lib/server/nft/ethereum-fetcher.js` — Fetch ERC-721
- `src/lib/server/nft/tezos-fetcher.js` — Fetch FA2
- `src/routes/api/nft/fetch/+server.js` — Fetch endpoint

### Phase 3: Filter IPFS + Display
**Files to create:**
- `src/lib/server/nft/ipfs-filter.js` — Check if IPFS
- `src/lib/components/NFTList.svelte` — Show results

### Phase 4: Batch Scan + Export
**Files to create:**
- `src/routes/api/nft/scan-batch/+server.js` — Start scan
- `src/routes/api/nft/export/manifest/+server.js` — Export manifest
- `src/routes/api/nft/export/ready2pin/+server.js` — Export CSV

---

## 🔗 API Endpoints

### 1. Resolve ENS/TEZ Name
```
POST /api/nft/resolve
Body: { input: "vitalik.eth" or "example.tez" }

Response: {
  address: "0x...",
  chain: "ethereum|tezos",
  valid: true
}
```

### 2. Fetch NFTs
```
GET /api/nft/fetch?address=0x...&chain=ethereum

Response: {
  address: "0x...",
  chain: "ethereum",
  nfts: [
    {
      id: "nft-1",
      contract: "0x...",
      tokenId: "123",
      tokenURI: "ipfs://QmXxxx",
      name: "My NFT",
      image: "ipfs://...",
      hasIPFS: true,
      metadata: {...}
    }
  ],
  totalCount: 42,
  ipfsCount: 28
}
```

### 3. Start Batch Scan
```
POST /api/nft/scan-batch
Body: {
  address: "0x...",
  chain: "ethereum",
  nftIds: ["nft-1", "nft-2", ...] // selected NFTs
}

Response: {
  jobId: "scan_...",
  status: "queued"
}
```

### 4. Poll Status
```
GET /api/nft/scan-batch/:jobId/status

Response: {
  status: "scanning|complete",
  progress: { completed: 5, total: 10 },
  results: [...]
}
```

### 5. Export Manifest
```
GET /api/nft/export/manifest/:jobId

Response: Blob (manifest.json for all scanned NFTs)
```

### 6. Export Ready2Pin CSV
```
GET /api/nft/export/ready2pin/:jobId

Response: Blob (ready2pin.csv)
```

---

## 📋 File Structure

```
src/
├── lib/
│   ├── server/
│   │   └── nft/
│   │       ├── name-resolver.js       ← Resolve ENS/TEZ names
│   │       ├── ethereum-fetcher.js    ← Fetch ERC-721 NFTs
│   │       ├── tezos-fetcher.js       ← Fetch FA2 NFTs
│   │       ├── ipfs-filter.js         ← Check IPFS metadata
│   │       ├── batch-scanner.js       ← Scan NFTs in parallel
│   │       └── nft-store.js           ← Cache results
│   │
│   └── components/
│       ├── NFTAddressInput.svelte    ← Input field (address/ENS/TEZ)
│       ├── NFTList.svelte            ← Show fetched NFTs
│       └── ScanProgress.svelte       ← Progress during scan
│
└── routes/
    ├── +page.svelte                 ← Add NFT section
    └── api/
        └── nft/
            ├── resolve/+server.js
            ├── fetch/+server.js
            ├── scan-batch/+server.js
            ├── scan-batch/[jobId]/status/+server.js
            └── export/
                ├── manifest/+server.js
                └── ready2pin/+server.js
```

---

## 💻 Implementation Code

### 1. Name Resolver (src/lib/server/nft/name-resolver.js)

```javascript
import { ethers } from 'ethers'

const ETH_PROVIDER = new ethers.JsonRpcProvider(
  process.env.ETHEREUM_RPC_URL || 'https://eth.llamarpc.com'
)

const TEZ_DOMAINS_API = 'https://api.tzdomain.com'

/**
 * Resolve ENS/TEZ domain or validate address
 * @param {string} input - Address, vitalik.eth, or example.tez
 * @returns {Promise<{ address: string, chain: 'ethereum'|'tezos' }>}
 */
export async function resolveName(input) {
  const trimmed = input.trim()

  // TEZ domain (example.tez)
  if (trimmed.endsWith('.tez')) {
    try {
      const res = await fetch(`${TEZ_DOMAINS_API}/resolve/${trimmed}`)
      if (res.ok) {
        const data = await res.json()
        return { address: data.address, chain: 'tezos' }
      }
    } catch (err) {
      console.error('TEZ domain resolve error:', err)
    }
    throw new Error(`Could not resolve TEZ domain: ${trimmed}`)
  }

  // ETH ENS (vitalik.eth)
  if (trimmed.endsWith('.eth')) {
    try {
      const address = await ETH_PROVIDER.resolveName(trimmed)
      if (address) {
        return { address, chain: 'ethereum' }
      }
    } catch (err) {
      console.error('ENS resolve error:', err)
    }
    throw new Error(`Could not resolve ENS: ${trimmed}`)
  }

  // Direct address - need to detect chain
  // 0x... = Ethereum, tz1/tz2/tz3 = Tezos
  if (trimmed.match(/^0x[a-fA-F0-9]{40}$/)) {
    return { address: trimmed.toLowerCase(), chain: 'ethereum' }
  }

  if (trimmed.match(/^tz[1-3][a-zA-Z0-9]{33}$/)) {
    return { address: trimmed, chain: 'tezos' }
  }

  throw new Error('Invalid address or domain. Use: 0x..., vitalik.eth, or example.tez')
}
```

### 2. Ethereum NFT Fetcher (src/lib/server/nft/ethereum-fetcher.js)

```javascript
import { ethers } from 'ethers'

const ETH_PROVIDER = new ethers.JsonRpcProvider(
  process.env.ETHEREUM_RPC_URL || 'https://eth.llamarpc.com'
)

// Using Alchemy API for NFT metadata (free tier available)
const ALCHEMY_KEY = process.env.ALCHEMY_KEY
const ALCHEMY_URL = `https://eth-mainnet.g.alchemy.com/nft/v3/${ALCHEMY_KEY}`

/**
 * Fetch user's ERC-721 NFTs from Ethereum
 * @param {string} address
 * @returns {Promise<Array>}
 */
export async function fetchEthereumNFTs(address) {
  if (!ALCHEMY_KEY) {
    console.warn('No Alchemy key, using limited fallback')
    return fetchEthereumNFTsFallback(address)
  }

  try {
    const res = await fetch(`${ALCHEMY_URL}/getNFTs?owner=${address}`, {
      headers: { 'Accept': 'application/json' }
    })

    if (!res.ok) {
      throw new Error(`Alchemy error: ${res.status}`)
    }

    const data = await res.json()

    return (data.ownedNfts || []).map(nft => ({
      id: `eth-${nft.contract.address}-${nft.tokenId}`,
      chain: 'ethereum',
      contract: nft.contract.address,
      tokenId: nft.tokenId,
      name: nft.name || `#${nft.tokenId}`,
      image: nft.image?.cachedUrl || nft.image?.originalUrl || null,
      tokenURI: nft.tokenUri?.raw || null,
      metadata: nft.rawMetadata || {}
    }))
  } catch (err) {
    console.error('Alchemy fetch error:', err)
    return fetchEthereumNFTsFallback(address)
  }
}

// Fallback: OpenSea API (rate limited but free)
async function fetchEthereumNFTsFallback(address) {
  try {
    const res = await fetch(
      `https://api.opensea.io/api/v1/assets?owner=${address}&limit=50`,
      { headers: { 'User-Agent': 'Mozilla/5.0' } }
    )

    if (!res.ok) return []

    const data = await res.json()

    return (data.assets || []).map(asset => ({
      id: `eth-${asset.asset_contract.address}-${asset.token_id}`,
      chain: 'ethereum',
      contract: asset.asset_contract.address,
      tokenId: asset.token_id,
      name: asset.name || `#${asset.token_id}`,
      image: asset.image_url || null,
      tokenURI: asset.token_metadata || null,
      metadata: {}
    }))
  } catch (err) {
    console.error('OpenSea fallback error:', err)
    return []
  }
}
```

### 3. Tezos NFT Fetcher (src/lib/server/nft/tezos-fetcher.js)

```javascript
// TzKT API is free and no key needed
const TZKT_API = 'https://api.tzkt.io/v1'

/**
 * Fetch user's FA2 NFTs from Tezos
 * @param {string} address
 * @returns {Promise<Array>}
 */
export async function fetchTezosNFTs(address) {
  try {
    // Get all tokens owned by address
    const res = await fetch(
      `${TZKT_API}/accounts/${address}/tokens?balance.gt=0&limit=10000`
    )

    if (!res.ok) {
      throw new Error(`TzKT error: ${res.status}`)
    }

    const tokens = await res.json()

    // Filter for likely NFTs (balance = 1 usually means NFT)
    const nfts = tokens
      .filter(t => t.balance === 1 || t.token.tokenId === '0')
      .map(t => ({
        id: `tez-${t.token.contract.address}-${t.token.tokenId}`,
        chain: 'tezos',
        contract: t.token.contract.address,
        tokenId: t.token.tokenId,
        name: t.token.metadata?.name || `Token ${t.token.tokenId}`,
        image: t.token.metadata?.artifactUri || t.token.metadata?.displayUri || null,
        tokenURI: t.token.metadata?.uri || null,
        metadata: t.token.metadata || {}
      }))

    return nfts
  } catch (err) {
    console.error('TzKT fetch error:', err)
    return []
  }
}
```

### 4. IPFS Filter (src/lib/server/nft/ipfs-filter.js)

```javascript
/**
 * Check if NFT metadata/image is on IPFS
 * @param {Object} nft
 * @returns {boolean}
 */
export function hasIPFS(nft) {
  const { tokenURI, image, metadata } = nft

  // Check if tokenURI is IPFS
  if (tokenURI?.startsWith('ipfs://') || tokenURI?.includes('ipfs')) {
    return true
  }

  // Check if image is IPFS
  if (image?.startsWith('ipfs://') || image?.includes('ipfs')) {
    return true
  }

  // Check metadata URIs
  if (metadata?.artifactUri?.includes('ipfs')) return true
  if (metadata?.displayUri?.includes('ipfs')) return true
  if (metadata?.uri?.includes('ipfs')) return true

  return false
}

/**
 * Extract all IPFS CIDs from NFT
 * @param {Object} nft
 * @returns {Array<string>}
 */
export function extractIPFSCIDs(nft) {
  const cids = []

  const extract = (value) => {
    if (typeof value === 'string') {
      const matches = value.match(/(?:ipfs:\/\/)?(Qm[a-zA-Z0-9]{44}|bafy[a-zA-Z0-9]+)/g)
      if (matches) cids.push(...matches)
    }
  }

  extract(nft.tokenURI)
  extract(nft.image)

  // Recursively extract from metadata
  const recurse = (obj) => {
    if (!obj || typeof obj !== 'object') return
    Object.values(obj).forEach(v => {
      extract(v)
      recurse(v)
    })
  }

  recurse(nft.metadata)

  return [...new Set(cids)] // Deduplicate
}
```

### 5. API Endpoint: Resolve (src/routes/api/nft/resolve/+server.js)

```javascript
import { json } from '@sveltejs/kit'
import { resolveName } from '$lib/server/nft/name-resolver.js'

export async function POST({ request }) {
  const body = await request.json().catch(() => null)
  const input = body?.input?.trim()

  if (!input) {
    return json({ message: 'Missing input' }, { status: 400 })
  }

  try {
    const result = await resolveName(input)
    return json(result)
  } catch (err) {
    return json({ message: err.message }, { status: 400 })
  }
}
```

### 6. API Endpoint: Fetch NFTs (src/routes/api/nft/fetch/+server.js)

```javascript
import { json } from '@sveltejs/kit'
import { fetchEthereumNFTs } from '$lib/server/nft/ethereum-fetcher.js'
import { fetchTezosNFTs } from '$lib/server/nft/tezos-fetcher.js'
import { hasIPFS, extractIPFSCIDs } from '$lib/server/nft/ipfs-filter.js'

export async function GET({ url }) {
  const address = url.searchParams.get('address')
  const chain = url.searchParams.get('chain')

  if (!address || !chain) {
    return json({ message: 'Missing address or chain' }, { status: 400 })
  }

  try {
    let nfts = []

    if (chain === 'ethereum') {
      nfts = await fetchEthereumNFTs(address)
    } else if (chain === 'tezos') {
      nfts = await fetchTezosNFTs(address)
    } else {
      throw new Error('Invalid chain')
    }

    // Filter + annotate with IPFS info
    const withIPFS = nfts.map(nft => ({
      ...nft,
      hasIPFS: hasIPFS(nft),
      ipfsCIDs: extractIPFSCIDs(nft)
    }))

    const ipfsNFTs = withIPFS.filter(n => n.hasIPFS)

    return json({
      address,
      chain,
      totalCount: nfts.length,
      ipfsCount: ipfsNFTs.length,
      nfts: ipfsNFTs
    })
  } catch (err) {
    console.error('NFT fetch error:', err)
    return json({ message: err.message }, { status: 500 })
  }
}
```

---

## 🎨 UI Component: Address Input (src/lib/components/NFTAddressInput.svelte)

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
        throw new Error(err.message)
      }

      const { address, chain } = await resolveRes.json()

      // Fetch NFTs
      const fetchRes = await fetch(
        `/api/nft/fetch?address=${address}&chain=${chain}`
      )

      if (!fetchRes.ok) {
        const err = await fetchRes.json()
        throw new Error(err.message)
      }

      const data = await fetchRes.json()
      nfts = data.nfts
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
      const res = await fetch('/api/nft/scan-batch', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          nftIds: [...selectedNFTs]
        })
      })

      if (!res.ok) throw new Error('Scan failed')

      const { jobId } = await res.json()
      await pollScanStatus(jobId)
    } catch (err) {
      error = err.message
    } finally {
      scanning = false
    }
  }

  async function pollScanStatus(jobId) {
    while (scanning) {
      const res = await fetch(`/api/nft/scan-batch/${jobId}/status`)
      const { status, progress } = await res.json()

      scanProgress = progress

      if (status === 'complete') {
        scanning = false
        break
      }

      await new Promise(r => setTimeout(r, 1000))
    }
  }
</script>

<div class="nft-section">
  <h2>NFT IPFS Checker</h2>

  <!-- Input -->
  <div class="input-group">
    <input
      type="text"
      placeholder="Paste address (0x... or tz...), ENS (vitalik.eth), or TEZ domain (example.tez)"
      bind:value={input}
      on:keydown={e => e.key === 'Enter' && handleSearch()}
      disabled={loading || scanning}
    />
    <button on:click={handleSearch} disabled={loading || scanning}>
      {loading ? 'Searching...' : 'Search'}
    </button>
  </div>

  {#if error}
    <p class="error">{error}</p>
  {/if}

  <!-- NFT List -->
  {#if nfts.length > 0}
    <div class="nft-list">
      <p class="info">Found {nfts.length} IPFS-based NFTs</p>

      {#each nfts as nft (nft.id)}
        <label class="nft-item">
          <input
            type="checkbox"
            bind:group={selectedNFTs}
            value={nft.id}
            disabled={scanning}
          />
          <div class="nft-info">
            <p class="name">{nft.name}</p>
            <p class="contract">{nft.contract.slice(0, 10)}...{nft.contract.slice(-8)}</p>
            {#if nft.image}
              <img src={nft.image} alt={nft.name} />
            {/if}
          </div>
        </label>
      {/each}

      <!-- Scan Button -->
      <button class="scan-btn" on:click={startScan} disabled={selectedNFTs.size === 0 || scanning}>
        {scanning ? `Scanning: ${scanProgress.completed}/${scanProgress.total}` : `Scan ${selectedNFTs.size} Selected`}
      </button>

      <!-- Export Buttons (shown after scan) -->
      {#if !scanning && scanProgress.completed === scanProgress.total && scanProgress.total > 0}
        <div class="export-buttons">
          <a href="/api/nft/export/manifest/{jobId}" download="manifest.json">
            Download manifest.json
          </a>
          <a href="/api/nft/export/ready2pin/{jobId}" download="ready2pin.csv">
            Download ready2pin.csv
          </a>
        </div>
      {/if}
    </div>
  {/if}
</div>

<style>
  .nft-section {
    padding: 2rem;
  }

  .input-group {
    display: flex;
    gap: 0.5rem;
    margin-bottom: 1rem;
  }

  input[type="text"] {
    flex: 1;
    padding: 0.75rem;
    border: 1px solid #ccc;
    border-radius: 0.5rem;
    font-family: monospace;
    font-size: 0.9rem;
  }

  button {
    padding: 0.75rem 1.5rem;
    background: #ff6b35;
    color: white;
    border: none;
    border-radius: 0.5rem;
    cursor: pointer;
    font-weight: 500;
  }

  button:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .error {
    color: #d32f2f;
    margin: 1rem 0;
  }

  .nft-list {
    margin-top: 2rem;
  }

  .info {
    margin-bottom: 1rem;
    color: #666;
  }

  .nft-item {
    display: flex;
    gap: 1rem;
    padding: 1rem;
    border: 1px solid #eee;
    border-radius: 0.5rem;
    margin-bottom: 0.5rem;
    cursor: pointer;
  }

  .nft-info {
    flex: 1;
  }

  .name {
    font-weight: 500;
    margin: 0;
  }

  .contract {
    font-size: 0.75rem;
    color: #999;
    margin: 0.25rem 0 0;
  }

  .nft-item img {
    width: 80px;
    height: 80px;
    object-fit: cover;
    border-radius: 0.25rem;
  }

  .scan-btn {
    width: 100%;
    margin-top: 1rem;
  }

  .export-buttons {
    display: flex;
    gap: 1rem;
    margin-top: 1.5rem;
  }

  .export-buttons a {
    flex: 1;
    padding: 0.75rem;
    background: #4CAF50;
    color: white;
    text-align: center;
    text-decoration: none;
    border-radius: 0.5rem;
    font-weight: 500;
  }
</style>
```

---

## 🚀 Dependencies to Install

```bash
npm install ethers
# Tezos domain resolve is via free API (no package needed)
# TzKT is free API (no package needed)
# Alchemy is optional (can use fallback)
```

---

## 📋 Implementation Checklist

- [ ] Create `name-resolver.js`
- [ ] Create `ethereum-fetcher.js`
- [ ] Create `tezos-fetcher.js`
- [ ] Create `ipfs-filter.js`
- [ ] Create `/api/nft/resolve` endpoint
- [ ] Create `/api/nft/fetch` endpoint
- [ ] Create `/api/nft/scan-batch` endpoint
- [ ] Create `NFTAddressInput.svelte` component
- [ ] Create export endpoints
- [ ] Test with real addresses

---

## 🎯 This is Much Simpler!

✅ No wallet connection needed  
✅ Just address/ENS/TEZ input  
✅ Uses free APIs (TzKT, Alchemy free tier, OpenSea)  
✅ Reuses your existing CAR scanning logic  
✅ Same export format (manifest.json + CSV)
