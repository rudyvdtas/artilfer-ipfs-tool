import fs from 'node:fs/promises'
import { constants as fsConstants } from 'node:fs'
import { getJobPath, getJobsDir } from '$lib/server/storage/paths'

function safeJsonParse(raw) {
  try {
    return JSON.parse(raw)
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Invalid JSON'
    const wrapped = new Error(`Corrupt job JSON: ${message}`)
    wrapped.cause = error
    throw wrapped
  }
}

async function ensureJobsDir() {
  await fs.mkdir(getJobsDir(), { recursive: true })
}

async function fileExists(filepath) {
  try {
    await fs.access(filepath, fsConstants.F_OK)
    return true
  } catch {
    return false
  }
}

function sanitizeJob(job) {
  return {
    ...job,
    error: typeof job.error === 'string' ? job.error.slice(0, 500) : job.error,
    progress: {
      current: Number.isFinite(job?.progress?.current) ? job.progress.current : null,
      total: Number.isFinite(job?.progress?.total) ? job.progress.total : null,
    },
  }
}

export async function createJob(job) {
  await ensureJobsDir()
  const safeJob = sanitizeJob(job)
  await fs.writeFile(getJobPath(job.jobId), JSON.stringify(safeJob, null, 2), 'utf8')
  return job
}

export async function loadJob(jobId) {
  const raw = await fs.readFile(getJobPath(jobId), 'utf8')
  return safeJsonParse(raw)
}

export async function updateJob(jobId, patch) {
  const current = await loadJob(jobId)
  const updated = {
    ...current,
    ...patch,
    progress: {
      ...current.progress,
      ...(patch.progress || {}),
    },
    updatedAt: Date.now(),
  }

  const safeUpdated = sanitizeJob(updated)
  await fs.writeFile(getJobPath(jobId), JSON.stringify(safeUpdated, null, 2), 'utf8')
  return updated
}

export async function jobExists(jobId) {
  return fileExists(getJobPath(jobId))
}
