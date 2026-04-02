/**
 * job-manager.js — Unified job management
 *
 * Wraps the low-level job-store with typed helpers for:
 *   - CID scans  (jobId prefix: scan_)
 *   - NFT checks (jobId prefix: nft_)
 */

import { createJob, loadJob, updateJob, jobExists, cleanupOldJobs } from './ipfs/job-store.js'

// ─── Job types ────────────────────────────────────────────────────────────────

export const JOB_TYPES = {
  SCAN: 'scan',
  NFT_CHECK: 'nft',
}

// ─── Create ───────────────────────────────────────────────────────────────────

/**
 * Create a managed job with a typed prefix and optional metadata.
 * @param {'scan'|'nft'} type
 * @param {object} metadata  arbitrary key/value stored alongside the job
 */
export async function createManagedJob(type, metadata = {}) {
  if (!Object.values(JOB_TYPES).includes(type)) {
    throw new Error(`Invalid job type: ${type}. Must be 'scan' or 'nft'.`)
  }

  const rand = Math.random().toString(36).slice(2, 11)
  const jobId = `${type}_${Date.now()}_${rand}`

  const job = await createJob(jobId)

  await updateJob(jobId, { type, metadata })

  return { ...job, jobId, type, metadata }
}

// ─── Read ─────────────────────────────────────────────────────────────────────

/**
 * Load a job and attach its type (inferred from prefix when not stored).
 * @param {string} jobId
 */
export async function getManagedJob(jobId) {
  const job = await loadJob(jobId)
  const type =
    job.type ||
    (jobId.startsWith('scan_') ? JOB_TYPES.SCAN : JOB_TYPES.NFT_CHECK)

  return { jobId, type, ...job }
}

// ─── Update ───────────────────────────────────────────────────────────────────

/**
 * Update progress counters.
 * @param {string} jobId
 * @param {number} current
 * @param {number|null} total
 */
export async function updateJobProgress(jobId, current, total = null) {
  return updateJob(jobId, {
    status: 'scanning',
    progress: { current, total },
  })
}

/**
 * Mark a job as successfully completed.
 * @param {string} jobId
 * @param {object} result
 */
export async function completeJob(jobId, result) {
  return updateJob(jobId, {
    status: 'complete',
    progress: { current: 1, total: 1 },
    result,
  })
}

/**
 * Mark a job as failed.
 * @param {string} jobId
 * @param {Error|string} error
 */
export async function failJob(jobId, error) {
  return updateJob(jobId, {
    status: 'error',
    error: error instanceof Error ? error.message : String(error),
  })
}

// ─── Export ───────────────────────────────────────────────────────────────────

/**
 * Export a completed job's result as JSON.
 * Throws if the job is not yet complete.
 * @param {string} jobId
 * @returns {{ content: string, contentType: string, filename: string }}
 */
export async function exportJobAsJson(jobId) {
  const job = await getManagedJob(jobId)

  if (job.status !== 'complete') {
    throw new Error(`Job ${jobId} is not complete (status: ${job.status})`)
  }

  return {
    content: JSON.stringify(job.result, null, 2),
    contentType: 'application/json',
    filename: `${jobId}-export.json`,
  }
}

// ─── Maintenance ──────────────────────────────────────────────────────────────

export { jobExists, cleanupOldJobs }
