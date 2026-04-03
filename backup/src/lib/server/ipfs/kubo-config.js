/**
 * Kubo node configuration and health monitoring
 * Only use Kubo as last-resort gateway when healthy
 */

const KUBO_GATEWAY = process.env.KUBO_GATEWAY_URL || 'http://localhost:8080'
const KUBO_CHECK_INTERVAL_MS = 30_000
const KUBO_TIMEOUT_MS = 2_000

let kuboStatus = {
  isHealthy: false,
  lastCheck: 0,
}

/**
 * Check if Kubo node is healthy and responsive
 */
export async function isKuboHealthy() {
  const now = Date.now()

  // Cache result for 30 seconds to avoid hammering health checks
  if (now - kuboStatus.lastCheck < KUBO_CHECK_INTERVAL_MS) {
    return kuboStatus.isHealthy
  }

  try {
    const controller = new AbortController()
    const timeout = setTimeout(() => controller.abort(), KUBO_TIMEOUT_MS)

    const response = await fetch(`${KUBO_GATEWAY}/api/v0/id`, {
      signal: controller.signal,
    })

    clearTimeout(timeout)

    kuboStatus.isHealthy = response.ok
    kuboStatus.lastCheck = now

    return response.ok
  } catch (err) {
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
