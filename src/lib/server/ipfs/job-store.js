/**
 * job-store.js — Filesystem-backed job persistence
 *
 * Uses the filesystem for all environments (local + Vercel via /tmp).
 * A real KV backend can be wired in here when needed by replacing
 * the fsStore calls with a kv implementation.
 */

import * as fsStore from './job-store-fs.js'

export async function createJob(jobId) {
  return fsStore.createJob(jobId)
}

export async function loadJob(jobId) {
  return fsStore.loadJob(jobId)
}

export async function updateJob(jobId, patch) {
  return fsStore.updateJob(jobId, patch)
}

export async function jobExists(jobId) {
  return fsStore.jobExists(jobId)
}

/**
 * Clean up jobs older than 24 hours.
 * Called on each new scan to prevent disk buildup.
 */
export async function cleanupOldJobs() {
  try {
    await fsStore.cleanupOldJobs()
  } catch (err) {
    console.error('cleanupOldJobs failed:', err)
  }
}
