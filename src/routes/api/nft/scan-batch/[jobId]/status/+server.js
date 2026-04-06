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
    response.result = {
      summary: job.result.summary,
      nfts: (job.result.results || []).map((r) => {
        if (r.status !== 'success') {
          return {
            nftId: r.nftId,
            name: r.name,
            chain: r.chain,
            status: r.status,
            metadataCID: null,
            scanSummary: null,
            error: r.error || r.reason || null,
          }
        }
        // Include scan nodes so client-side CSV export has all CIDs
        const nodes = {}
        for (const [key, node] of Object.entries(r.scan?.nodes || {})) {
          if (!node.cid || node.error) continue
          nodes[key] = {
            cid: node.cid,
            path: node.path,
            name: node.name,
            contentType: node.contentType,
            kind: node.kind,
          }
        }
        return {
          nftId: r.nftId,
          name: r.name,
          chain: r.chain,
          status: r.status,
          metadataCID: r.metadataCID || null,
          scanSummary: r.scan?.summary || null,
          scanNodes: nodes,
          error: null,
        }
      }),
    }
  }

  return json(response)
}
