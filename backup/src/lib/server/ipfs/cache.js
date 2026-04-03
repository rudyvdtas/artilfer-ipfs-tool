/**
 * Shared in-memory cache for scan results (includes raw bytes for CAR export).
 * Stored separately from the job JSON on disk which strips bytes to save space.
 */

/** @type {Map<string, {result: import('./scanner.js').ScanResult, ts: number}>} */
export const scanResultCache = new Map()

const TTL_MS = 24 * 60 * 60 * 1000 // 24h

export function cacheSet(jobId, result) {
  scanResultCache.set(jobId, { result, ts: Date.now() })
}

export function cacheGet(jobId) {
  const entry = scanResultCache.get(jobId)
  if (!entry) return null
  if (Date.now() - entry.ts > TTL_MS) {
    scanResultCache.delete(jobId)
    return null
  }
  return entry.result
}

export function cacheDelete(jobId) {
  scanResultCache.delete(jobId)
}

export function cleanupCache() {
  const now = Date.now()
  for (const [jobId, entry] of scanResultCache) {
    if (now - entry.ts > TTL_MS) scanResultCache.delete(jobId)
  }
}
