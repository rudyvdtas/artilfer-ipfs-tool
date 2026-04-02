import { json } from '@sveltejs/kit'
import { randomUUID } from 'node:crypto'
import { createJob, updateJob } from '$lib/server/ipfs/job-store.js'
import { scanNFTBatch } from '$lib/server/nft/batch-coordinator.js'

/**
 * POST /api/nft/scan-batch
 *
 * Body: { nfts: [{id, chain, contract, tokenId, name, tokenURI, metadata, metadataCID, ...}] }
 *
 * Response: { jobId, status: "queued" }
 *
 * Starts a background job and returns immediately.
 * Poll /api/nft/scan-batch/{jobId}/status for progress.
 */
export async function POST({ request }) {
  let body
  try {
    body = await request.json()
  } catch {
    return json({ error: 'Ongeldig JSON request body' }, { status: 400 })
  }

  const nfts = body?.nfts
  if (!Array.isArray(nfts) || nfts.length === 0) {
    return json({ error: 'Veld "nfts" is verplicht en mag niet leeg zijn' }, { status: 400 })
  }

  if (nfts.length > 50) {
    return json(
      { error: 'Maximaal 50 NFTs per scan-batch. Verdeel je selectie in kleinere batches.' },
      { status: 400 }
    )
  }

  const jobId = `nft_${randomUUID()}`
  await createJob(jobId)

  // Background scan (fire-and-forget)
  void (async () => {
    try {
      await scanNFTBatch(jobId, nfts)
    } catch (err) {
      console.error(`[Scan Batch] Job ${jobId} gefaald:`, err)
      await updateJob(jobId, {
        status: 'failed',
        error: err?.message || 'Scan gefaald',
      }).catch(() => {})
    }
  })()

  return json({ jobId, status: 'queued' })
}
