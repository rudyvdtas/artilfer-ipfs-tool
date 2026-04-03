import { json } from '@sveltejs/kit'
import { randomUUID } from 'node:crypto'
import { resolve } from '$lib/server/ipfs/resolver.js'
import { scan, serializeForStorage } from '$lib/server/ipfs/scanner.js'
import { createJob, updateJob, cleanupOldJobs } from '$lib/server/ipfs/job-store.js'
import { cacheSet } from '$lib/server/ipfs/cache.js'

export async function POST({ request }) {
  const body = await request.json().catch(() => null)
  const rawCid = body?.cid ?? body?.inputText ?? body?.ipfsHash ?? ''
  const input = typeof rawCid === 'string' ? rawCid.trim() : String(rawCid || '').trim()

  if (!input) {
    return json({ message: 'Missing cid.' }, { status: 400 })
  }

  // Validate it looks like an IPFS reference
  const ref = resolve(input)
  if (!ref) {
    return json({ message: 'Invalid CID or IPFS link.' }, { status: 400 })
  }

  const jobId = `scan_${randomUUID()}`
  await createJob(jobId)

  // Cleanup old jobs (fire-and-forget)
  cleanupOldJobs().catch(() => {})

  // Background scan
  void (async () => {
    try {
      await updateJob(jobId, { status: 'scanning' })

      const result = await scan(input, async (progress) => {
        await updateJob(jobId, {
          progress: {
            current: progress.current,
            total: progress.total,
          },
        }).catch(() => {})
      })

      // Store result (bytes stripped for disk)
      await updateJob(jobId, {
        status: 'ready',
        result: serializeForStorage(result),
        progress: {
          current: result.summary.totalFiles,
          total: result.summary.totalFiles,
        },
      })

      // Keep full result with bytes in memory cache for export (24h TTL)
      cacheSet(jobId, result)
    } catch (err) {
      await updateJob(jobId, {
        status: 'failed',
        error: err?.message || 'Scan failed',
      }).catch(() => {})
    }
  })()

  return json({ jobId, status: 'queued' })
}

