# NFT Checker Implementation Checklist

## ✅ Phase 1: Setup (Week 1)

### 1.1 Install Dependencies
```bash
npm install ethers
```

### 1.2 Create Server Utilities

**File: `src/lib/server/nft/name-resolver.js`**
- [ ] Copy code from WALLET_CHECKER_SIMPLIFIED.md
- [ ] Test: `resolveName('vitalik.eth')` → should return address
- [ ] Test: `resolveName('0x...')` → should work

**File: `src/lib/server/nft/ethereum-fetcher.js`**
- [ ] Copy code from WALLET_CHECKER_SIMPLIFIED.md
- [ ] Optional: Set up Alchemy API key (free tier)
- [ ] Test: `fetchEthereumNFTs('0xvitalik')` → should return array

**File: `src/lib/server/nft/tezos-fetcher.js`**
- [ ] Copy code from WALLET_CHECKER_SIMPLIFIED.md
- [ ] Test: `fetchTezosNFTs('tz1...')` → should return array

**File: `src/lib/server/nft/ipfs-filter.js`**
- [ ] Copy code from WALLET_CHECKER_SIMPLIFIED.md
- [ ] Test: `hasIPFS(nft)` → should detect IPFS URIs
- [ ] Test: `extractIPFSCIDs(nft)` → should find all CIDs

### 1.3 Create API Endpoints

**File: `src/routes/api/nft/resolve/+server.js`**
- [ ] Copy code from WALLET_CHECKER_SIMPLIFIED.md
- [ ] Test: POST `/api/nft/resolve` with `{ input: 'vitalik.eth' }`

**File: `src/routes/api/nft/fetch/+server.js`**
- [ ] Copy code from WALLET_CHECKER_SIMPLIFIED.md
- [ ] Test: GET `/api/nft/fetch?address=0x...&chain=ethereum`
- [ ] Verify IPFS filtering works

### 1.4 Create Frontend Component

**File: `src/lib/components/NFTAddressInput.svelte`**
- [ ] Copy code from WALLET_CHECKER_SIMPLIFIED.md
- [ ] Place in your existing `+page.svelte`
- [ ] Test: Type address, click search

---

## ✅ Phase 2: Batch Scanning (Week 2)

### 2.1 Create Batch Scanner

**File: `src/lib/server/nft/batch-scanner.js`**
```javascript
// Basic structure:
export async function scanNFTBatch(nfts, onProgress) {
  const results = []
  
  for (let i = 0; i < nfts.length; i++) {
    const nft = nfts[i]
    
    // Use existing scan() from scanner.js
    try {
      const result = await scan(nft.ipfsCIDs[0]) // Scan first CID
      results.push({
        nftId: nft.id,
        scanResult: result,
        status: 'ok'
      })
    } catch (err) {
      results.push({
        nftId: nft.id,
        error: err.message,
        status: 'error'
      })
    }
    
    onProgress?.({
      completed: i + 1,
      total: nfts.length
    })
  }
  
  return results
}
```

### 2.2 Create Batch Endpoint

**File: `src/routes/api/nft/scan-batch/+server.js`**
- [ ] Copy pattern from existing `/api/scan/+server.js`
- [ ] Create jobId, start background scan
- [ ] Return jobId to frontend

**File: `src/routes/api/nft/scan-batch/[jobId]/status/+server.js`**
- [ ] Copy pattern from `/api/scan/[jobId]/status/+server.js`
- [ ] Poll job status, return progress

### 2.3 Test Batch Scanning
- [ ] Frontend: Select 3 NFTs
- [ ] Click "Scan Selected"
- [ ] Progress bar should update
- [ ] Poll should work

---

## ✅ Phase 3: Export Aggregation (Week 3)

### 3.1 Create Combined Manifest Builder

**File: `src/lib/server/nft/nft-manifest-builder.js`**
```javascript
export function buildCombinedManifest(nftResults) {
  const manifest = {
    project: 'NFT Archive — ARTfilter',
    generated_at: new Date().toISOString(),
    nfts: nftResults.map(result => ({
      nftId: result.nftId,
      rootCid: result.scanResult.rootCid,
      metadata: result.scanResult.metadata,
      summary: result.scanResult.summary,
      // ... other fields
    }))
  }
  
  return JSON.stringify(manifest, null, 2)
}
```

### 3.2 Create Export Endpoints

**File: `src/routes/api/nft/export/manifest/+server.js`**
- [ ] Load scan results from cache/store
- [ ] Build combined manifest
- [ ] Return as JSON download

**File: `src/routes/api/nft/export/ready2pin/+server.js`**
- [ ] Load scan results
- [ ] Build CSV with all NFTs + their CIDs
- [ ] Return as CSV download

### 3.3 Test Exports
- [ ] Download manifest.json → check structure
- [ ] Download ready2pin.csv → check format for Pinata

---

## ✅ Phase 4: Integration (Week 4)

### 4.1 Wire Frontend to Backend
- [ ] NFTAddressInput calls `/api/nft/resolve`
- [ ] Then calls `/api/nft/fetch`
- [ ] Shows results, allows selection
- [ ] Scan button calls `/api/nft/scan-batch`
- [ ] Progress polling works
- [ ] Export buttons appear

### 4.2 Styling Refinement
- [ ] Fine-tune colors/spacing
- [ ] Mobile responsive
- [ ] Dark mode testing
- [ ] Hover states

### 4.3 Error Handling
- [ ] Invalid address → error message
- [ ] No NFTs found → friendly message
- [ ] Scan timeout → retry logic
- [ ] Network errors → fallback

### 4.4 Testing Checklist
- [ ] Test with `vitalik.eth` (Ethereum)
- [ ] Test with a real Tezos address
- [ ] Test selecting/deselecting NFTs
- [ ] Test export files are valid
- [ ] Test on mobile (responsive)

---

## 📁 File Structure (After Complete Implementation)

```
src/
├── lib/
│   ├── server/
│   │   └── nft/
│   │       ├── name-resolver.js           ✓ Phase 1
│   │       ├── ethereum-fetcher.js        ✓ Phase 1
│   │       ├── tezos-fetcher.js           ✓ Phase 1
│   │       ├── ipfs-filter.js             ✓ Phase 1
│   │       ├── batch-scanner.js           ✓ Phase 2
│   │       └── nft-manifest-builder.js    ✓ Phase 3
│   │
│   └── components/
│       └── NFTAddressInput.svelte         ✓ Phase 1
│
└── routes/
    ├── +page.svelte                      ✓ Phase 4 (add component)
    └── api/
        └── nft/
            ├── resolve/+server.js                    ✓ Phase 1
            ├── fetch/+server.js                     ✓ Phase 1
            ├── scan-batch/+server.js                ✓ Phase 2
            ├── scan-batch/[jobId]/status/+server.js ✓ Phase 2
            └── export/
                ├── manifest/+server.js              ✓ Phase 3
                └── ready2pin/+server.js             ✓ Phase 3
```

---

## 🧪 Testing Commands

```bash
# Phase 1: Test resolve
curl -X POST http://localhost:5173/api/nft/resolve \
  -H "Content-Type: application/json" \
  -d '{"input":"vitalik.eth"}'

# Phase 1: Test fetch
curl "http://localhost:5173/api/nft/fetch?address=0x...&chain=ethereum"

# Phase 2: Test scan batch
curl -X POST http://localhost:5173/api/nft/scan-batch \
  -H "Content-Type: application/json" \
  -d '{"nftIds":["nft-1","nft-2"]}'

# Phase 2: Poll status
curl "http://localhost:5173/api/nft/scan-batch/scan_xxx/status"

# Phase 3: Export manifest
curl "http://localhost:5173/api/nft/export/manifest/scan_xxx" > manifest.json

# Phase 3: Export CSV
curl "http://localhost:5173/api/nft/export/ready2pin/scan_xxx" > ready2pin.csv
```

---

## 📚 Quick Reference

### Key Imports
```javascript
import { resolveName } from '$lib/server/nft/name-resolver.js'
import { fetchEthereumNFTs } from '$lib/server/nft/ethereum-fetcher.js'
import { fetchTezosNFTs } from '$lib/server/nft/tezos-fetcher.js'
import { hasIPFS, extractIPFSCIDs } from '$lib/server/nft/ipfs-filter.js'
import { scan } from '$lib/server/ipfs/scanner.js' // Reuse existing!
```

### Reuse Existing Code
- `scan()` function from `scanner.js` — use for DAG traversal
- Job store from `/api/scan` — same pattern for batch jobs
- Export functions from `exporter.js` — can extend for combined manifest

---

## 🎯 Success Criteria

✅ User can paste address/ENS/TEZ  
✅ NFTs with IPFS metadata are shown  
✅ User can select subset of NFTs  
✅ Batch scanning works with progress  
✅ Export files are valid (can upload to Pinata)  
✅ Mobile responsive  
✅ Dark mode works  

---

## 💡 Pro Tips

1. **Reuse existing job system** — Don't reinvent, use same pattern as `/api/scan`
2. **Test with real data first** — Use `vitalik.eth` or known IPFS NFTs
3. **Cache aggressively** — NFT lists don't change often, cache for hours
4. **Progressive enhancement** — Start with Phase 1 (fetch), add scanning later
5. **Handle edge cases** — Some NFTs might not have tokenURI, some might have multiple CIDs
6. **Monitor gas/API limits** — If using Alchemy, monitor your quota

---

## ❓ Common Issues & Fixes

### "No NFTs found for valid address"
- Check if address has NFTs on that chain (use Etherscan/TzKT)
- Verify chain parameter is correct
- Check API limits (OpenSea rate limits)

### "Scan timeout"
- Large DAGs take time, increase timeout to 30s
- Add retry logic with exponential backoff
- Consider caching intermediate results

### "CSV has wrong format"
- Ensure CSV escaping is correct
- Quote fields with commas
- Use standard CSV library if needed

### "Export files empty"
- Verify scan actually completed
- Check cache is storing results
- Log intermediate results for debugging

---

## 📞 Next Steps

1. **Pick one phase** and complete it fully
2. **Test with real data** before moving to next phase
3. **Ask questions** when stuck
4. **Iterate on styling** after core functionality works

Ready to start? Pick Phase 1 and let me know if you hit blockers! 🚀
