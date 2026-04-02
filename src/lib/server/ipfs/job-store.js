/**
 * job-store.js — Simplified job persistence
 *
 * Stores jobs AND scan results in one file per job.
 * Replaces both old job-store.js and report-store.js.
 */

import fs from 'node:fs/promises'
import path from 'node:path'

const STORAGE_DIR = process.env.JOB_STORAGE_DIR || '/tmp/nft-archive'
const JOBS_DIR = path.join(STORAGE_DIR, 'jobs')
const TTL_MS = 24 * 60 * 60 * 1000 // 24 hours

async function ensureDir() {
  await fs.mkdir(JOBS_DIR, { recursive: true })
}

function jobPath(jobId) {
  // Sanitize jobId to prevent path traversal
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
    result: null,  // ScanResult stored here when done
  }
  await fs.writeFile(jobPath(jobId), JSON.stringify(job, null, 2), 'utf8')
  return job
}

export async function loadJob(jobId) {
  const raw = await fs.readFile(jobPath(jobId), 'utf8')
  return JSON.parse(raw)
}

export async function updateJob(jobId, patch) {
  const current = await loadJob(jobId)
  const updated = {
    ...current,
    ...patch,
    progress: { ...current.progress, ...(patch.progress || {}) },
    updatedAt: Date.now(),
  }
  await fs.writeFile(jobPath(jobId), JSON.stringify(updated, null, 2), 'utf8')
  return updated
}

export async function jobExists(jobId) {
  try {
    await fs.access(jobPath(jobId))
    return true
  } catch {
    return false
  }
}

/**
 * Clean up jobs older than 24 hours.
 * Called on each new scan to prevent disk buildup.
 */
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
      } catch { /* ignore individual file errors */ }
    }
  } catch { /* ignore cleanup errors */ }
}
