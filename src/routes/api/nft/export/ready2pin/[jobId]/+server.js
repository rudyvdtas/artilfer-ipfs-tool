import { json } from '@sveltejs/kit'
import { loadJob, jobExists } from '$lib/server/ipfs/job-store.js'
import { buildReadyToPinCSV } from '$lib/server/nft/export-builder.js'

/**
 * GET /api/nft/export/ready2pin/{jobId}
 *
 * Downloads ready2pin.csv for a completed NFT batch scan.
 * CSV is formatted for direct import into Pinata (hash,name).
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

  const csv = buildReadyToPinCSV(job.result)

  return new Response(csv, {
    headers: {
      'content-type': 'text/csv; charset=utf-8',
      'content-disposition': 'attachment; filename="ready2pin.csv"',
    },
  })
}
