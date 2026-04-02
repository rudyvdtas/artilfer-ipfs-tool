/**
 * Request deduplication cache
 * If multiple users fetch the same CID simultaneously, only fetch once
 */

/** @type {Map<string, Promise>} */
const inFlightRequests = new Map()

/** @type {Map<string, {data: any, timestamp: number}>} */
const resultCache = new Map()

const CACHE_TTL_MS = 60 * 1000  // 1 minute

/**
 * Fetch CID with automatic deduplication
 * @param {string} cid
 * @param {string} path
 * @param {Function} fetchFn - actual fetch implementation
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
      // In-flight request failed, let it retry below
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
