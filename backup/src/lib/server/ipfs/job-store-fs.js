/**
 * Filesystem-backed job store (local development)
 * Used as fallback when Vercel KV not available
 * 
 * NOTE: Uses simple locking via temp files to prevent race conditions
 */

import fs from 'node:fs/promises'
import path from 'node:path'

const STORAGE_DIR = process.env.JOB_STORAGE_DIR || '/tmp/nft-archive'
const JOBS_DIR = path.join(STORAGE_DIR, 'jobs')
const TTL_MS = 24 * 60 * 60 * 1000

// ✅ Simple lock mechanism to prevent concurrent writes
const jobLocks = new Map()

async function acquireLock(jobId) {
  while (jobLocks.has(jobId)) {
    await new Promise(resolve => setTimeout(resolve, 10))
  }
  jobLocks.set(jobId, true)
}

function releaseLock(jobId) {
  jobLocks.delete(jobId)
}

async function ensureDir() {
  await fs.mkdir(JOBS_DIR, { recursive: true })
}

function jobPath(jobId) {
  const safe = String(jobId).replace(/[^a-zA-Z0-9_-]/g, '')
  if (!safe) throw new Error('Invalid jobId')
  return path.join(JOBS_DIR, `${safe}.json`)
}

export async function createJob(jobId) {
  await ensureDir()
  const job = {
    jobId,
    status: 'queued',
    createdAt: Date.now(),
    updatedAt: Date.now(),
    progress: { current: 0, total: null },
    error: null,
    result: null,
  }
  
  await acquireLock(jobId)
  try {
    await fs.writeFile(jobPath(jobId), JSON.stringify(job, null, 2), 'utf8')
  } finally {
    releaseLock(jobId)
  }
  
  return job
}

export async function loadJob(jobId) {
  const raw = await fs.readFile(jobPath(jobId), 'utf8')
  return JSON.parse(raw)
}

export async function updateJob(jobId, patch) {
  await acquireLock(jobId)
  try {
    const current = await loadJob(jobId)
    const updated = {
      ...current,
      ...patch,
      progress: { ...current.progress, ...(patch.progress || {}) },
      updatedAt: Date.now(),
    }
    await fs.writeFile(jobPath(jobId), JSON.stringify(updated, null, 2), 'utf8')
    return updated
  } finally {
    releaseLock(jobId)
  }
}

export async function jobExists(jobId) {
  try {
    await fs.access(jobPath(jobId))
    return true
  } catch {
    return false
  }
}

export async function cleanupOldJobs() {
  try {
    await ensureDir()
    const files = await fs.readdir(JOBS_DIR)
    const now = Date.now()

    for (const file of files) {
      if (!file.endsWith('.json')) continue
      const filePath = path.join(JOBS_DIR, file)
      try {
        const stat = await fs.stat(filePath)
        if (now - stat.mtimeMs > TTL_MS) {
          await fs.unlink(filePath)
        }
      } catch {}
    }
  } catch {}
}
