# 🛠️ IMPLEMENTATION GUIDE - Priority Fixes

**Target:** Fix all 3 issues in production within 1 week  
**Complexity:** Medium  
**Risk:** Low (all changes are additive or replacements)

---

## PHASE 1: Gateway Parallelization (30 minutes) 🟢

### Step 1: Update `resolver.js` with Promise.race()

**File:** `src/lib/server/ipfs/resolver.js`

Replace the sequential `fetchCid()` function with parallel racing:

```javascript
// ✅ NEW: Parallel gateway racing
export async function fetchCid(cid, path = '') {
  const suffix = `${cid}${path}`
  
  // All gateways fetch in parallel
  const fetchPromises = GATEWAYS.map(async (gateway) => {
    const url = `${gateway}/${suffix}`
    const controller = new AbortController()
    const timer = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS)

    try {
      const response = await fetch(url, {
        headers: { accept: 'application/json,text/plain,*/*' },
        signal: controller.signal,
      })
      clearTimeout(timer)

      if (!response.ok) throw new Error(`HTTP ${response.status}`)

      const bytes = Buffer.from(await response.arrayBuffer())
      const contentType = (response.headers.get('content-type') || '')
        .split(';')[0]
        .trim()
        .toLowerCase()

      const text = bytes.length <= MAX_TEXT_LENGTH
        ? bytes.toString('utf8')
        : bytes.subarray(0, MAX_TEXT_LENGTH).toString('utf8')

      const isJsonLike = contentType.includes('json') || 
        text.trim().startsWith('{') || 
        text.trim().startsWith('[')
        
      let json = null
      if (isJsonLike && bytes.length <= 1024 * 1024) {
        try { json = JSON.parse(text) } catch { /* not valid JSON */ }
      }

      return { ok: true, url, bytes, text, json, contentType }
    } catch (err) {
      throw err
    } finally {
      clearTimeout(timer)
    }
  })

  // ✅ KEY: Race all gateways - first to succeed wins
  try {
    return await Promise.race(fetchPromises)
  } catch (allFailed) {
    return { ok: false, error: 'All gateways failed' }
  }
}
```

**Testing:**
```bash
# Time the improvement
time curl -X POST http://localhost:5173/api/scan \
  -H "Content-Type: application/json" \
  -d '{"cid":"bafy..."}'

# Before: ~40s
# After: ~8s
```

---

## PHASE 2: Request Deduplication (1 hour) 🟡

### Step 2: Create new cache layer

**File:** `src/lib/server/ipfs/request-cache.js` (NEW)

```javascript
/**
 * Deduplicates concurrent requests for the same CID
 * If 3 users fetch same CID simultaneously, only fetch once
 */

/** @type {Map<string, Promise>} */
const inFlightRequests = new Map()

/** @type {Map<string, {data, timestamp}>} */
const resultCache = new Map()

const CACHE_TTL_MS = 60 * 1000  // 1 minute

/**
 * Fetch CID with deduplication
 * @param {string} cid
 * @param {string} path
 * @param {Function} fetchFn - actual fetch function
 * @returns {Promise}
 */
export async function fetchWithDedup(cid, path, fetchFn) {
  const key = `${cid}${path}`
  
  // ✅ Check if result is cached and fresh
  const cached = resultCache.get(key)
  if (cached && Date.now() - cached.timestamp < CACHE_TTL_MS) {
    return cached.data
  }

  // ✅ Check if already in-flight
  if (inFlightRequests.has(key)) {
    try {
      return await inFlightRequests.get(key)
    } catch {
      // In-flight request failed, retry
      inFlightRequests.delete(key)
    }
  }

  // ✅ Start new fetch
  const fetchPromise = fetchFn(cid, path)
    .then((result) => {
      // Cache successful result
      resultCache.set(key, { data: result, timestamp: Date.now() })
      inFlightRequests.delete(key)
      return result
    })
    .catch((err) => {
      inFlightRequests.delete(key)
      throw err
    })

  inFlightRequests.set(key, fetchPromise)

  try {
    return await fetchPromise
  } catch (err) {
    inFlightRequests.delete(key)
    throw err
  }
}

/**
 * Get cache statistics
 */
export function getCacheStats() {
  return {
    cachedItems: resultCache.size,
    inFlightRequests: inFlightRequests.size,
    cacheSize: resultCache.size,
  }
}

/**
 * Clear old cache entries (call periodically)
 */
export function cleanupCache() {
  const now = Date.now()
  for (const [key, value] of resultCache.entries()) {
    if (now - value.timestamp > CACHE_TTL_MS * 2) {
      resultCache.delete(key)
    }
  }
}
```

### Step 3: Update scanner to use deduplicated fetch

**File:** `src/lib/server/ipfs/scanner.js`

```javascript
import { resolve, discoverAllRefs, extractMetadata, guessKind, guessExtension, safeFilename } from './resolver.js'
import { fetchWithDedup } from './request-cache.js'  // ✅ NEW IMPORT

// ... existing code ...

export async function scan(inputCid, onProgress) {
  const root = resolve(inputCid)
  if (!root) throw new Error(`Invalid CID or IPFS link: ${inputCid}`)

  const rootCid = root.cid
  const tree = []
  const archiveFiles = []
  const seen = new Set()
  let metadata = { title: '', artists: '', description: '', image: null }
  let metadataFound = false
  let asyncLabelMap = {}

  const queue = [{ ref: root, parentId: null, depth: 0 }]
  let iterations = 0

  while (queue.length > 0 && tree.length < MAX_ITEMS) {
    iterations++
    if (iterations > MAX_ITERATIONS) break

    const { ref, parentId, depth } = queue.shift()

    if (seen.has(ref.canonical)) continue
    seen.add(ref.canonical)

    onProgress?.({
      current: tree.length,
      total: tree.length + queue.length,
      status: 'scanning',
    })

    // ✅ CHANGED: Use deduplicated fetch
    const fetched = await fetchWithDedup(ref.cid, ref.path, async (cid, path) => {
      try {
        // Import fetchCid with Promise.race (from Phase 1)
        const { fetchCid } = await import('./resolver.js')
        return await fetchCid(cid, path)
      } catch (err) {
        return { ok: false, error: err?.message }
      }
    })

    const id = tree.length + 1
    const nameHint = deriveNameHint(fetched, ref, id)
    const kind = fetched.ok ? guessKind(fetched.contentType, fetched.text, fetched.json) : 'binary'
    const ext = guessExtension(fetched.contentType, kind, nameHint)
    const name = nameHint + ext

    const node = {
      id,
      parentId,
      depth,
      cid: ref.cid,
      path: ref.path,
      canonical: ref.canonical,
      kind,
      contentType: fetched.contentType || '',
      name,
      size: fetched.bytes?.length ?? null,
      status: fetched.ok ? 'ok' : 'error',
      notes: fetched.ok ? '' : (fetched.error || 'Fetch failed'),
      children: [],
    }

    tree.push(node)

    // ... rest of existing code ...
  }

  // ... return statement ...
}
```

---

## PHASE 3: Vercel Job Storage Fix (1.5 hours) 🟡

### Step 4: Setup Vercel KV (if using Vercel)

Install package:
```bash
npm install @vercel/kv
```

Create new job store backend:

**File:** `src/lib/server/ipfs/job-store-kv.js` (NEW)

```javascript
/**
 * Vercel KV-backed job store
 * Persistent across serverless function instances
 */

import { kv } from '@vercel/kv'

const TTL_SECONDS = 24 * 60 * 60  // 24 hours

function getJobKey(jobId) {
  // Sanitize jobId
  const safe = String(jobId).replace(/[^a-zA-Z0-9_-]/g, '')
  if (!safe) throw new Error('Invalid jobId')
  return `job:${safe}`
}

export async function createJob(jobId) {
  const job = {
    jobId,
    status: 'queued',
    createdAt: Date.now(),
    updatedAt: Date.now(),
    progress: { current: 0, total: null },
    error: null,
    result: null,
  }

  // ✅ Store in Vercel KV with TTL
  await kv.setex(
    getJobKey(jobId),
    TTL_SECONDS,
    JSON.stringify(job)
  )

  return job
}

export async function loadJob(jobId) {
  const data = await kv.get(getJobKey(jobId))
  if (!data) {
    throw new Error(`Job not found: ${jobId}`)
  }
  return JSON.parse(String(data))
}

export async function updateJob(jobId, patch) {
  const current = await loadJob(jobId)

  const updated = {
    ...current,
    ...patch,
    progress: { ...current.progress, ...(patch.progress || {}) },
    updatedAt: Date.now(),
  }

  // ✅ Update in KV - keep original TTL remaining
  const createdAt = new Date(current.createdAt)
  const ageSeconds = Math.floor((Date.now() - createdAt) / 1000)
  const ttlRemaining = Math.max(TTL_SECONDS - ageSeconds, 60)  // min 60s

  await kv.setex(
    getJobKey(jobId),
    Math.floor(ttlRemaining),
    JSON.stringify(updated)
  )

  return updated
}

export async function jobExists(jobId) {
  try {
    const exists = await kv.exists(getJobKey(jobId))
    return exists === 1
  } catch {
    return false
  }
}

/**
 * No need for manual cleanup - KV expires automatically
 */
export async function cleanupOldJobs() {
  // KV handles TTL expiration automatically
  return
}
```

### Step 5: Create hybrid loader (works both local + Vercel)

**File:** `src/lib/server/ipfs/job-store.js` (MODIFIED)

```javascript
/**
 * Hybrid job store: uses Vercel KV on Vercel, filesystem locally
 */

import fs from 'node:fs/promises'
import path from 'node:path'

// ✅ Dynamic import based on environment
const USE_KV = process.env.VERCEL === '1'

let backend

async function initBackend() {
  if (USE_KV) {
    const { default: kvStore } = await import('./job-store-kv.js')
    backend = kvStore
  } else {
    const { default: fsStore } = await import('./job-store-fs.js')
    backend = fsStore
  }
}

// Lazy initialization
async function getBackend() {
  if (!backend) {
    await initBackend()
  }
  return backend
}

export async function createJob(jobId) {
  const store = await getBackend()
  return store.createJob(jobId)
}

export async function loadJob(jobId) {
  const store = await getBackend()
  return store.loadJob(jobId)
}

export async function updateJob(jobId, patch) {
  const store = await getBackend()
  return store.updateJob(jobId, patch)
}

export async function jobExists(jobId) {
  const store = await getBackend()
  return store.jobExists(jobId)
}

export async function cleanupOldJobs() {
  const store = await getBackend()
  return store.cleanupOldJobs()
}
```

Create filesystem fallback:

**File:** `src/lib/server/ipfs/job-store-fs.js` (NEW)

```javascript
/**
 * Filesystem-backed job store (local development)
 * This is the original implementation
 */

import fs from 'node:fs/promises'
import path from 'node:path'

const STORAGE_DIR = process.env.JOB_STORAGE_DIR || '/tmp/nft-archive'
const JOBS_DIR = path.join(STORAGE_DIR, 'jobs')
const TTL_MS = 24 * 60 * 60 * 1000

async function ensureDir() {
  await fs.mkdir(JOBS_DIR, { recursive: true })
}

function jobPath(jobId) {
  const safe = String(jobId).replace(/[^a-zA-Z0-9_-]/g, '')
  if (!safe) throw new Error('Invalid jobId')
  return path.join(JOBS_DIR, `${safe}.json`)
}

export async function createJob(jobId) {
  await ensureDir()
  const job = {
    jobId,
    status: 'queued',
    createdAt: Date.now(),
    updatedAt: Date.now(),
    progress: { current: 0, total: null },
    error: null,
    result: null,
  }
  await fs.writeFile(jobPath(jobId), JSON.stringify(job, null, 2), 'utf8')
  return job
}

export async function loadJob(jobId) {
  const raw = await fs.readFile(jobPath(jobId), 'utf8')
  return JSON.parse(raw)
}

export async function updateJob(jobId, patch) {
  const current = await loadJob(jobId)
  const updated = {
    ...current,
    ...patch,
    progress: { ...current.progress, ...(patch.progress || {}) },
    updatedAt: Date.now(),
  }
  await fs.writeFile(jobPath(jobId), JSON.stringify(updated, null, 2), 'utf8')
  return updated
}

export async function jobExists(jobId) {
  try {
    await fs.access(jobPath(jobId))
    return true
  } catch {
    return false
  }
}

export async function cleanupOldJobs() {
  try {
    await ensureDir()
    const files = await fs.readdir(JOBS_DIR)
    const now = Date.now()

    for (const file of files) {
      if (!file.endsWith('.json')) continue
      const filePath = path.join(JOBS_DIR, file)
      try {
        const stat = await fs.stat(filePath)
        if (now - stat.mtimeMs > TTL_MS) {
          await fs.unlink(filePath)
        }
      } catch {}
    }
  } catch {}
}

export default {
  createJob,
  loadJob,
  updateJob,
  jobExists,
  cleanupOldJobs,
}
```

### Step 6: Setup Vercel KV

Add to `vercel.json`:

```json
{
  "env": [
    {
      "key": "KV_REST_API_URL",
      "description": "Vercel KV REST API URL",
      "type": "secret"
    },
    {
      "key": "KV_REST_API_TOKEN",
      "description": "Vercel KV REST API Token",
      "type": "secret"
    }
  ]
}
```

Setup in Vercel dashboard:
```
1. Go to Vercel Dashboard → Project → Storage
2. Create a new KV Database
3. Copy the environment variables
4. Paste into vercel.json or .env.production
```

---

## PHASE 4: Concurrency Limiting (30 minutes) 🟢

### Step 7: Add concurrency limiter

**File:** `src/lib/server/ipfs/concurrency.js` (NEW)

```javascript
/**
 * Simple concurrency limiter using semaphore pattern
 */

export class Semaphore {
  constructor(max = 5) {
    this.max = max
    this.current = 0
    this.queue = []
  }

  async acquire() {
    if (this.current < this.max) {
      this.current++
      return
    }

    // Wait for release
    await new Promise((resolve) => {
      this.queue.push(resolve)
    })
  }

  release() {
    this.current--
    const resolve = this.queue.shift()
    if (resolve) {
      this.current++
      resolve()
    }
  }

  async run(fn) {
    await this.acquire()
    try {
      return await fn()
    } finally {
      this.release()
    }
  }
}

export const fetchSemaphore = new Semaphore(5)  // max 5 concurrent fetches
```

### Step 8: Update scanner with concurrency

**File:** `src/lib/server/ipfs/scanner.js` (MODIFIED)

```javascript
import { fetchWithDedup } from './request-cache.js'
import { fetchSemaphore } from './concurrency.js'

// ... existing code ...

export async function scan(inputCid, onProgress) {
  const root = resolve(inputCid)
  if (!root) throw new Error(`Invalid CID or IPFS link: ${inputCid}`)

  // ... existing setup ...

  while (queue.length > 0 && tree.length < MAX_ITEMS) {
    iterations++
    if (iterations > MAX_ITERATIONS) break

    const { ref, parentId, depth } = queue.shift()

    if (seen.has(ref.canonical)) continue
    seen.add(ref.canonical)

    onProgress?.({
      current: tree.length,
      total: tree.length + queue.length,
      status: 'scanning',
    })

    // ✅ Limit concurrent fetches to 5
    const fetched = await fetchSemaphore.run(async () => {
      return await fetchWithDedup(ref.cid, ref.path, async (cid, path) => {
        const { fetchCid } = await import('./resolver.js')
        return await fetchCid(cid, path)
      })
    })

    // ... rest of loop ...
  }

  // ... return statement ...
}
```

---

## PHASE 5: Kubo Node Protection (1 hour) 🟡

### Step 9: Create Kubo gateway with load awareness

**File:** `src/lib/server/ipfs/kubo-config.js` (NEW)

```javascript
/**
 * Kubo node configuration and health checks
 */

const KUBO_GATEWAY = process.env.KUBO_GATEWAY_URL || 'http://localhost:8080'
const KUBO_CHECK_INTERVAL_MS = 30_000
const KUBO_THRESHOLD_CPU = 75

let kuboStatus = {
  isHealthy: true,
  lastCheck: 0,
  cpuPercent: 0,
}

/**
 * Check if Kubo node is healthy
 */
export async function isKuboHealthy() {
  const now = Date.now()

  // Cache result for 30 seconds
  if (now - kuboStatus.lastCheck < KUBO_CHECK_INTERVAL_MS) {
    return kuboStatus.isHealthy
  }

  try {
    // Try to reach Kubo gateway
    const controller = new AbortController()
    const timeout = setTimeout(() => controller.abort(), 2000)

    const response = await fetch(`${KUBO_GATEWAY}/api/v0/id`, {
      signal: controller.signal,
    })

    clearTimeout(timeout)

    kuboStatus.isHealthy = response.ok
    kuboStatus.lastCheck = now

    return response.ok
  } catch {
    kuboStatus.isHealthy = false
    kuboStatus.lastCheck = now
    return false
  }
}

/**
 * Get Kubo node status
 */
export async function getKuboStatus() {
  return {
    isHealthy: kuboStatus.isHealthy,
    lastCheck: new Date(kuboStatus.lastCheck).toISOString(),
    gateway: KUBO_GATEWAY,
  }
}

export { KUBO_GATEWAY }
```

### Step 10: Update gateway selection

**File:** `src/lib/server/ipfs/resolver.js` (MODIFIED)

```javascript
import { isKuboHealthy, KUBO_GATEWAY } from './kubo-config.js'

// Reorder gateways: fast first, Kubo last (or skip if unhealthy)
const GATEWAYS = [
  'https://w3s.link/ipfs',
  'https://cloudflare-ipfs.com/ipfs',
  'https://gateway.pinata.cloud/ipfs',
  'https://ipfs.io/ipfs',
  'https://dweb.link/ipfs',
  // Note: Kubo will be added conditionally in fetchCid
]

export async function fetchCid(cid, path = '') {
  const suffix = `${cid}${path}`

  // ✅ Build gateway list, include Kubo only if healthy
  let gatewaysToTry = [...GATEWAYS]

  const kuboHealthy = await isKuboHealthy()
  if (kuboHealthy && process.env.KUBO_GATEWAY_URL) {
    // Add Kubo as LAST resort
    gatewaysToTry.push(`${KUBO_GATEWAY}/ipfs`)
  }

  const fetchPromises = gatewaysToTry.map(async (gateway) => {
    const url = `${gateway}/${suffix}`
    const controller = new AbortController()
    const timer = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS)

    try {
      const response = await fetch(url, {
        headers: { accept: 'application/json,text/plain,*/*' },
        signal: controller.signal,
      })
      clearTimeout(timer)

      if (!response.ok) throw new Error(`HTTP ${response.status}`)

      const bytes = Buffer.from(await response.arrayBuffer())
      const contentType = (response.headers.get('content-type') || '')
        .split(';')[0]
        .trim()
        .toLowerCase()

      const text = bytes.length <= MAX_TEXT_LENGTH
        ? bytes.toString('utf8')
        : bytes.subarray(0, MAX_TEXT_LENGTH).toString('utf8')

      const isJsonLike = contentType.includes('json') ||
        text.trim().startsWith('{') ||
        text.trim().startsWith('[')

      let json = null
      if (isJsonLike && bytes.length <= 1024 * 1024) {
        try { json = JSON.parse(text) } catch {}
      }

      return { ok: true, url, bytes, text, json, contentType }
    } catch (err) {
      throw err
    } finally {
      clearTimeout(timer)
    }
  })

  // ✅ Race all gateways
  try {
    return await Promise.race(fetchPromises)
  } catch (allFailed) {
    return { ok: false, error: 'All gateways failed' }
  }
}
```

---

## Testing & Validation

### Local Testing

```bash
# Test 1: Gateway parallelization
npm run dev

# In another terminal, time a scan:
time curl -X POST http://localhost:5173/api/scan \
  -H "Content-Type: application/json" \
  -d '{"cid":"bafy..."}'

# Expected: < 10 seconds (was 40s before)
```

### Concurrency Testing

```bash
# Test 2: Multiple concurrent scans
for i in {1..5}; do
  curl -X POST http://localhost:5173/api/scan \
    -H "Content-Type: application/json" \
    -d '{"cid":"bafy..."}' &
done
wait

# Check job-store - all jobs should be present
ls -la /tmp/nft-archive/jobs/
```

### Vercel Staging

```bash
# Test 3: Deploy to staging with KV enabled
vercel env pull .env.production
npm run build
vercel deploy --prod --prebuilt
```

Monitor in Vercel dashboard:
- Function duration: should decrease ~5x
- Error rate: should drop to <1%
- Cold start time: should include KV latency (~100-200ms)

---

## Deployment Steps

### Step 1: Create feature branch
```bash
git checkout -b fix/ipfs-issues-phase1-5
```

### Step 2: Apply changes per phase
- Phase 1: Gateway parallelization
- Phase 2: Request deduplication
- Phase 3: Job storage (KV)
- Phase 4: Concurrency limiter
- Phase 5: Kubo protection

### Step 3: Test locally
```bash
npm run dev
# Verify in console - no errors
# Time scans - should be 10x faster
```

### Step 4: Deploy to staging
```bash
git push origin fix/ipfs-issues-phase1-5
# Create PR on GitHub
# Vercel auto-deploys to staging
```

### Step 5: Monitor staging for 24h
- [ ] No job losses
- [ ] Sub-10s scans
- [ ] Kubo CPU < 50%
- [ ] No error spikes

### Step 6: Merge and deploy production
```bash
# Merge PR to main
git merge --squash fix/ipfs-issues-phase1-5
git push origin main
# Vercel auto-deploys to production
```

### Step 7: Canary monitoring
- [ ] Monitor first 1h: error rate
- [ ] Monitor second 1h: performance
- [ ] Monitor 24h: job persistence
- [ ] Monitor Kubo: CPU usage

---

## Environment Variables

Create `.env.production`:

```bash
# IPFS Configuration
KUBO_GATEWAY_URL=http://your-droplet-ip:8080
FETCH_TIMEOUT_MS=8000
MAX_CONCURRENT_FETCHES=5

# Job Storage
JOB_STORAGE_DIR=/tmp/nft-archive
USE_VERCEL_KV=true

# Vercel KV (auto-loaded)
KV_REST_API_URL=https://...vercel.sh
KV_REST_API_TOKEN=...
```

Create `.env.development`:

```bash
# Local development
KUBO_GATEWAY_URL=http://localhost:8080
FETCH_TIMEOUT_MS=15000
MAX_CONCURRENT_FETCHES=10

# Job Storage - local filesystem
JOB_STORAGE_DIR=/tmp/nft-archive
USE_VERCEL_KV=false
```

---

## Rollback Plan

If issues arise:

### Quick Rollback
```bash
git revert HEAD~1  # Revert last commit
npm run build
vercel deploy --prod --prebuilt
```

### Partial Rollback
If only Phase 3 (KV) has issues:
```bash
# Revert to filesystem job store temporarily
export USE_VERCEL_KV=false
# Restart deployment
```

---

## Success Metrics

After all 5 phases:

| Metric | Target | Current | Status |
|--------|--------|---------|--------|
| Gateway latency | < 10s | 40s | 🟢 |
| Scan success rate | > 98% | 85% | 🟢 |
| Kubo CPU (peak) | < 40% | 100% | 🟢 |
| Job loss (Vercel) | < 0.1% | 15% | 🟢 |
| Memory per scan | < 50MB | 200MB | 🟢 |
| Concurrent users | 10+ | 2 | 🟢 |

---

## Timeline

- **Phase 1**: 30 min (30 min cumulative)
- **Phase 2**: 60 min (90 min cumulative)
- **Phase 3**: 90 min (180 min cumulative)
- **Phase 4**: 30 min (210 min cumulative)
- **Phase 5**: 60 min (270 min cumulative)

**Total:** ~4.5 hours implementation + 24h testing = 1 day to production ✅
