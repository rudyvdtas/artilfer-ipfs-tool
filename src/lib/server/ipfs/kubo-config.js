/**
 * Kubo RPC client — health monitoring and CAR export via dag/export.
 *
 * Kubo exposes two ports:
 *   - :5001  RPC API  — /api/v0/...  (used here for dag/export and health)
 *   - :8080  Gateway  — /ipfs/<CID>  (used by resolver.js for content fetching)
 *
 * KUBO_API_URL must point to the RPC API (port 5001).
 */

const KUBO_API_URL = process.env.KUBO_API_URL || 'http://127.0.0.1:5001'
const KUBO_CHECK_INTERVAL_MS = 30_000
const KUBO_HEALTH_TIMEOUT_MS = 2_000
const KUBO_EXPORT_TIMEOUT_MS = parseInt(process.env.CAR_EXPORT_TIMEOUT_MS || '300000')

let kuboStatus = {
  isHealthy: false,
  lastCheck: 0,
}

/**
 * Check if the Kubo RPC API is reachable and responsive.
 * Result is cached for KUBO_CHECK_INTERVAL_MS to avoid repeated probes.
 *
 * @returns {Promise<boolean>}
 */
export async function isKuboHealthy() {
  const now = Date.now()

  if (now - kuboStatus.lastCheck < KUBO_CHECK_INTERVAL_MS) {
    return kuboStatus.isHealthy
  }

  try {
    const controller = new AbortController()
    const timeout = setTimeout(() => controller.abort(), KUBO_HEALTH_TIMEOUT_MS)

    const response = await fetch(`${KUBO_API_URL}/api/v0/id`, {
      method: 'POST',
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
 * Return current Kubo status (without performing a new probe).
 *
 * @returns {Promise<{ isHealthy: boolean, lastCheck: string, apiUrl: string }>}
 */
export async function getKuboStatus() {
  return {
    isHealthy: kuboStatus.isHealthy,
    lastCheck: new Date(kuboStatus.lastCheck).toISOString(),
    apiUrl: KUBO_API_URL,
  }
}

/**
 * Stream a full CARv1 export for the given root CID from Kubo via dag/export.
 *
 * Kubo fetches all DAG blocks recursively from the IPFS network, preserving
 * the original block CIDs and UnixFS structure. The stream is piped directly
 * to the caller without buffering.
 *
 * @param {string} rootCid
 * @returns {Promise<ReadableStream<Uint8Array>>}
 * @throws {Error} when Kubo is unreachable, times out, or returns an error status
 */
export async function exportCarFromKubo(rootCid) {
  const url = `${KUBO_API_URL}/api/v0/dag/export?arg=${encodeURIComponent(rootCid)}&progress=false`

  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), KUBO_EXPORT_TIMEOUT_MS)

  let response
  try {
    response = await fetch(url, {
      method: 'POST',
      signal: controller.signal,
    })
  } catch (err) {
    clearTimeout(timeout)
    if (err?.name === 'AbortError') {
      throw new Error(`Kubo dag/export timed out after ${KUBO_EXPORT_TIMEOUT_MS / 1000}s for CID: ${rootCid}`)
    }
    throw new Error(`Kubo RPC unreachable at ${KUBO_API_URL}: ${err?.message || 'connection failed'}`)
  }

  clearTimeout(timeout)

  if (!response.ok) {
    const body = await response.text().catch(() => '')
    if (response.status === 500 && body.includes('not found')) {
      throw new Error(`CID not found on the IPFS network: ${rootCid}`)
    }
    throw new Error(`Kubo dag/export returned HTTP ${response.status} for CID: ${rootCid}`)
  }

  return response.body
}
