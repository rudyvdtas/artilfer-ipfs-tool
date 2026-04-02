/**
 * job-store.js — Hybrid job persistence
 *
 * ✅ Primary: Uses Vercel KV on Vercel (persistent across instances)
 * ✅ Fallback: Uses filesystem locally (for development)
 */

import * as kvStore from './job-store-kv.js'
import * as fsStore from './job-store-fs.js'

const USE_KV = process.env.VERCEL === '1'

export async function createJob(jobId) {
  try {
    // Try KV first on Vercel
    if (USE_KV) {
      const result = await kvStore.createJob(jobId)
      if (result) return result
    }

    // Fall back to filesystem
    return await fsStore.createJob(jobId)
  } catch (err) {
    console.error('createJob failed:', err)
    // Last resort: filesystem
    return await fsStore.createJob(jobId)
  }
}

export async function loadJob(jobId) {
  try {
    // Try KV first on Vercel
    if (USE_KV) {
      const result = await kvStore.loadJob(jobId)
      if (result) return result
    }

    // Fall back to filesystem
    return await fsStore.loadJob(jobId)
  } catch (err) {
    console.error('loadJob failed:', err)
    // Last resort: filesystem
    return await fsStore.loadJob(jobId)
  }
}

export async function updateJob(jobId, patch) {
  try {
    // Try KV first on Vercel
    if (USE_KV) {
      const result = await kvStore.updateJob(jobId, patch)
      if (result) return result
    }

    // Fall back to filesystem
    return await fsStore.updateJob(jobId, patch)
  } catch (err) {
    console.error('updateJob failed:', err)
    // Last resort: filesystem
    return await fsStore.updateJob(jobId, patch)
  }
}

export async function jobExists(jobId) {
  try {
    // Try KV first on Vercel
    if (USE_KV) {
      const exists = await kvStore.jobExists(jobId)
      if (exists) return true
    }

    // Fall back to filesystem
    return await fsStore.jobExists(jobId)
  } catch (err) {
    console.error('jobExists failed:', err)
    // Last resort: filesystem
    return await fsStore.jobExists(jobId)
  }
}

/**
 * Clean up jobs older than 24 hours.
 * Called on each new scan to prevent disk buildup.
 */
export async function cleanupOldJobs() {
  try {
    // Always cleanup filesystem
    await fsStore.cleanupOldJobs()
  } catch (err) {
    console.error('cleanupOldJobs failed:', err)
  }
}
