/**
 * GET /api
 * API status + endpoint index
 */

import { json } from '@sveltejs/kit'

export async function GET() {
  return json({
    status: 'operational',
    version: '1.0.0',
    endpoints: {
      scanner:    '/api/scan',
      nftChecker: '/api/nft',
      jobs:       '/api/jobs',
      health:     '/api/health',
      metrics:    '/api/metrics',
    },
  })
}

/**
 * OPTIONS /api  — CORS pre-flight
 */
export async function OPTIONS() {
  return new Response(null, {
    status: 204,
    headers: {
      'access-control-allow-origin':  '*',
      'access-control-allow-methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'access-control-allow-headers': 'content-type, authorization',
    },
  })
}
