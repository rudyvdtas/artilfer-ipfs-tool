/**
 * /api/ipfs/scan-debug — REMOVED
 *
 * This endpoint has been removed for GDPR compliance reasons.
 * It was a developer-only debug tool with no auth/rate-limiting that
 * exposed raw scan results including content snippets and metadata.
 *
 * Diagnostics are available via the manifest export endpoint:
 *   GET /api/nft/export/manifest/[jobId]?diagnostics=1
 */
import { json } from '@sveltejs/kit'

export async function GET() {
  return json({ error: 'Not found.' }, { status: 404 })
}

export async function POST() {
  return json({ error: 'Not found.' }, { status: 404 })
}
