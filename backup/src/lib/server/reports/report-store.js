/**
 * report-store.js — Legacy report store (compatibility shim)
 *
 * The new system uses job-store.js + cache.js.
 * This module bridges the old car/+server.js which still imports loadReport.
 *
 * loadReport now loads from the job cache (in-memory) or job store (disk/KV).
 */

import { loadJob } from '$lib/server/ipfs/job-store.js'
import { cacheGet } from '$lib/server/ipfs/cache.js'
import { Buffer } from 'node:buffer'

/**
 * Load a report by ID.
 * Checks in-memory cache first (has bytes), then falls back to job store (no bytes).
 *
 * @param {string} reportId - job ID (e.g. scan_xxxx)
 * @returns {Promise<object>} report object
 */
export async function loadReport(reportId) {
  // ✅ Try in-memory cache first (has bytes for CAR export)
  const cached = cacheGet(reportId)
  if (cached) {
    return normalizeReport(cached)
  }

  // ✅ Fall back to job store (no bytes, but has metadata)
  const job = await loadJob(reportId)
  if (!job || job.status !== 'ready' || !job.result) {
    throw new Error(`Report not ready or not found: ${reportId}`)
  }

  return normalizeReport(job.result)
}

/**
 * Normalize a scan result into the report shape expected by car/+server.js.
 * Decodes base64-encoded bytes back to Buffer if needed.
 *
 * @param {object} result
 * @returns {object}
 */
function normalizeReport(result) {
  const report = { ...result }

  if (Array.isArray(report.archiveFiles)) {
    report.archiveFiles = report.archiveFiles.map((file) => ({
      ...file,
      path: file.path || file.archivePath || file.archive_path || null,
      size: file.size ?? file.sizeBytes ?? file.size_bytes ?? (file.bytes?.length || 0),
      cid: file.cid || null,
      // Decode bytes from base64 back to Buffer (if serialized to disk)
      bytes: file.bytes && typeof file.bytes === 'string'
        ? Buffer.from(file.bytes, 'base64')
        : (file.bytes instanceof Uint8Array ? file.bytes : null),
    }))
  }

  return report
}