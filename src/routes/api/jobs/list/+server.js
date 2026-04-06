/**
 * GET /api/jobs/list
 *
 * Returns a list of recent jobs.
 *
 * The filesystem store doesn't maintain an index, so we read the jobs
 * directory directly (dev) or return an empty list (Vercel KV — no
 * enumeration without a separate index).
 */

import { json } from '@sveltejs/kit'
import { withErrorHandler } from '$lib/server/error-handler.js'

async function listJobsFromFs() {
  const { default: fs }   = await import('node:fs/promises')
  const { default: path } = await import('node:path')

  const JOBS_DIR = path.join(
    process.env.JOB_STORAGE_DIR || '/tmp/nft-archive',
    'jobs'
  )

  try {
    const files = await fs.readdir(JOBS_DIR)
    const jobs  = []

    for (const file of files) {
      if (!file.endsWith('.json')) continue
      try {
        const raw = await fs.readFile(path.join(JOBS_DIR, file), 'utf8')
        const job = JSON.parse(raw)
        // Return a lightweight summary — no full result payload
        jobs.push({
          jobId:     job.jobId,
          type:      job.type,
          status:    job.status,
          createdAt: job.createdAt,
          updatedAt: job.updatedAt,
          progress:  job.progress,
          error:     job.error ?? null,
          // Include a condensed summary when complete
          summary:   job.result?.summary ?? null,
        })
      } catch {
        // Skip corrupt files
      }
    }

    // Newest first
    jobs.sort((a, b) => (b.createdAt ?? 0) - (a.createdAt ?? 0))
    return jobs.slice(0, 50)
  } catch {
    return []
  }
}

export const GET = withErrorHandler(async () => {
  // Job enumeration is disabled in production: it would allow any caller to
  // list all active scan jobs across all users (GDPR Art. 5(1)(b) + Art. 32).
  // In local development it remains available for debugging.
  if (process.env.NODE_ENV === 'production' || process.env.VERCEL === '1') {
    return json([])
  }

  const jobs = await listJobsFromFs()
  return json(jobs)
})
