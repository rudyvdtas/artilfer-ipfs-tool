/**
 * DEPRECATED — This route is no longer used.
 *
 * CAR exports are now served by:
 *   GET /api/export/[jobId]/car   (uses Kubo dag/export via exporter.js)
 */
import { json } from '@sveltejs/kit'

export async function POST() {
  return json(
    { message: 'This endpoint is deprecated. Use GET /api/export/[jobId]/car instead.' },
    { status: 410 }
  )
}
