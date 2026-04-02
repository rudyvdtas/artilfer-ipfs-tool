/**
 * Vercel KV-backed job store
 * STUB: Always returns null to indicate KV not available
 * Falls back to filesystem automatically
 */

export async function createJob(jobId) {
  return null  // KV not available, use fallback
}

export async function loadJob(jobId) {
  return null  // KV not available, use fallback
}

export async function updateJob(jobId, patch) {
  return null  // KV not available, use fallback
}

export async function jobExists(jobId) {
  return false  // KV not available, use fallback
}

export async function isKvAvailable() {
  return false  // KV not available
}
