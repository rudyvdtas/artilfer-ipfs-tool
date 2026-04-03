/**
 * GET /api/health
 *
 * Returns system health status.
 * Used by monitoring tools and the Vercel deployment checks.
 */

import { json } from '@sveltejs/kit'
import { getCacheStats } from '$lib/server/ipfs/request-cache.js'
import { getKuboStatus } from '$lib/server/ipfs/kubo-config.js'

export async function GET() {
  try {
    const [cacheStats, kuboStatus] = await Promise.allSettled([
      Promise.resolve(getCacheStats()),
      getKuboStatus(),
    ])

    return json({
      status:    'healthy',
      timestamp: new Date().toISOString(),
      cache: cacheStats.status === 'fulfilled'
        ? cacheStats.value
        : { error: cacheStats.reason?.message },
      kubo: kuboStatus.status === 'fulfilled'
        ? kuboStatus.value
        : { error: kuboStatus.reason?.message },
    })
  } catch (err) {
    return json(
      { status: 'degraded', timestamp: new Date().toISOString(), error: err.message },
      { status: 503 }
    )
  }
}
