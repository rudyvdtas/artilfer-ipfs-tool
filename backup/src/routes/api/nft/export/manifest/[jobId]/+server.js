import { json } from '@sveltejs/kit'
import { loadJob, jobExists } from '$lib/server/ipfs/job-store.js'
import { buildManifest, manifestToJSON } from '$lib/server/nft/export-builder.js'

/**
 * GET /api/nft/export/manifest/{jobId}
 *
 * Downloads manifest.json for a completed NFT batch scan.
 */
export async function GET({ params }) {
  const { jobId } = params

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
  const body = manifestToJSON(manifest)

  return new Response(body, {
    headers: {
      'content-type': 'application/json; charset=utf-8',
      'content-disposition': 'attachment; filename="nft-manifest.json"',
    },
  })
}
