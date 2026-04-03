/**
 * GET /api/metrics
 *
 * Prometheus-compatible plain-text metrics.
 * Exposes cache and concurrency stats.
 */

import { getCacheStats } from '$lib/server/ipfs/request-cache.js'

export async function GET() {
  try {
    const cache = getCacheStats()

    const lines = [
      '# HELP cache_items_total Items currently held in the result cache',
      '# TYPE cache_items_total gauge',
      `cache_items_total ${cache.cachedItems}`,
      '',
      '# HELP inflight_requests_total Requests currently in-flight (deduplication)',
      '# TYPE inflight_requests_total gauge',
      `inflight_requests_total ${cache.inFlightRequests}`,
    ]

    return new Response(lines.join('\n') + '\n', {
      headers: { 'content-type': 'text/plain; version=0.0.4; charset=utf-8' },
    })
  } catch (err) {
    return new Response(`# ERROR: ${err.message}\n`, { status: 500 })
  }
}
