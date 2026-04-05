import { json } from '@sveltejs/kit'
import { loadJob, jobExists } from '$lib/server/ipfs/job-store.js'
import { buildManifest, manifestToJSON } from '$lib/server/nft/export-builder.js'
import { analyzeScanStructure } from '$lib/server/ipfs/scanner.js'

/**
 * GET /api/nft/export/manifest/{jobId}
 *
 * Downloads manifest.json for a completed NFT batch scan.
 * 
 * ✅ Query params:
 *   - ?diagnostics=1  : Include scan structure analysis (for debugging missing items)
 *   - ?format=json    : Return as JSON (default: raw manifest export)
 */
export async function GET({ params, url }) {
  const { jobId } = params
  const includeDiagnostics = url.searchParams.get('diagnostics') === '1'
  const formatJson = url.searchParams.get('format') === 'json'

  if (!jobId) return json({ error: 'Missing jobId' }, { status: 400 })

  if (!(await jobExists(jobId))) {
    return json({ error: 'Job niet gevonden' }, { status: 404 })
  }

  let job
  try {
    job = await loadJob(jobId)
  } catch {
    return json({ error: 'Job data corrupt' }, { status: 500 })
  }

  if (job.status !== 'ready') {
    return json({ error: `Job nog niet klaar (status: ${job.status})` }, { status: 409 })
  }

  if (!job.result) {
    return json({ error: 'Geen resultaat beschikbaar' }, { status: 400 })
  }

  const manifest = buildManifest(job.result)

  // ✅ Include scan diagnostics if requested (helpful for debugging missing items)
  if (includeDiagnostics) {
    manifest.diagnostics = {
      timestamp: new Date().toISOString(),
      // Analyze each NFT's scan structure
      nftScans: job.result.results
        .filter(r => r.status === 'success' && r.scan)
        .map(r => ({
          nftId: r.nftId,
          metadataCID: r.metadataCID,
          analysis: analyzeScanStructure(r.scan),
        })),
    }
  }

  // If JSON format requested, return as JSON response (better for debugging)
  if (formatJson || includeDiagnostics) {
    return json(manifest)
  }

  // Otherwise, return as downloadable manifest file
  const body = manifestToJSON(manifest)
  return new Response(body, {
    headers: {
      'content-type': 'application/json; charset=utf-8',
      'content-disposition': 'attachment; filename="nft-manifest.json"',
    },
  })
}
