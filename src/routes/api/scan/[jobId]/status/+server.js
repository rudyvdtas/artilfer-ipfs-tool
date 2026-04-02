import { json } from '@sveltejs/kit'
import { loadJob, jobExists } from '$lib/server/ipfs/job-store.js'

export async function GET({ params }) {
  const { jobId } = params
  if (!jobId) return json({ message: 'Missing jobId.' }, { status: 400 })

  if (!(await jobExists(jobId))) {
    return json({ message: 'Job not found.' }, { status: 404 })
  }

  let job
  try {
    job = await loadJob(jobId)
  } catch {
    return json({ message: 'Corrupt job data. Please scan again.' }, { status: 500 })
  }

  // Base response
  const response = {
    jobId: job.jobId,
    status: job.status,
    progress: job.progress,
    error: job.error || null,
  }

  // If ready, include the scan result (without bytes)
  if (job.status === 'ready' && job.result) {
    response.result = job.result
  }

  return json(response)
}
