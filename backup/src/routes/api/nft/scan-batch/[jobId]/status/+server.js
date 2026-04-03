import { json } from '@sveltejs/kit'
import { loadJob, jobExists } from '$lib/server/ipfs/job-store.js'

/**
 * GET /api/nft/scan-batch/{jobId}/status
 *
 * Response: { jobId, status, progress, result?, error? }
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
    return json({ error: 'Job data corrupt. Herstart de scan.' }, { status: 500 })
  }

  const response = {
    jobId: job.jobId,
    status: job.status,
    progress: job.progress,
    error: job.error || null,
  }

  if (job.status === 'ready' && job.result) {
    // Include summary + NFT list (without full scan trees to keep response small)
    response.result = {
      summary: job.result.summary,
      nfts: (job.result.results || []).map((r) => ({
        nftId: r.nftId,
        name: r.name,
        chain: r.chain,
        status: r.status,
        metadataCID: r.metadataCID || null,
        scanSummary: r.scan?.summary || null,
        error: r.error || r.reason || null,
      })),
    }
  }

  return json(response)
}
