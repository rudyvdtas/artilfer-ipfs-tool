/**
 * DEPRECATED — This route is no longer used.
 *
 * CSV exports are now served by:
 *   GET /api/export/[jobId]/csv         (CID scan)
 *   GET /api/nft/export/ready2pin/[jobId]  (NFT batch scan)
 */
import { json } from '@sveltejs/kit'

export async function POST() {
  return json(
    { message: 'This endpoint is deprecated. Use GET /api/export/[jobId]/csv or GET /api/nft/export/ready2pin/[jobId] instead.' },
    { status: 410 }
  )
}
