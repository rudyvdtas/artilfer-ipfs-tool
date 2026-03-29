import { json } from '@sveltejs/kit'
import fs from 'node:fs/promises'
import { getJobPath } from '$lib/server/storage/paths'
import { jobExists, loadJob } from '$lib/server/jobs/job-store'
import { deleteReport, loadReport, reportExists } from '$lib/server/reports/report-store'

function computeExportReadiness(job, report) {
  if (!job || job.status !== 'ready' || !report) {
    return null
  }

  const archiveFiles = Array.isArray(report.archiveFiles) ? report.archiveFiles : []
  const rootCid = report.rootCid ?? report?.manifest?.rootCid ?? null

  if (!rootCid) {
    return {
      canExportCar: false,
      canExportCsv: archiveFiles.length > 0,
      reason: 'Missing rootCid',
    }
  }

  if (!archiveFiles.length) {
    return {
      canExportCar: false,
      canExportCsv: false,
      reason: 'Missing archive files',
    }
  }

  return {
    canExportCar: true,
    canExportCsv: true,
    reason: null,
  }
}

function sanitizeItem(item) {
  if (!item || typeof item !== 'object') return item
  return {
    ...item,
    text: '',
    json: null,
    bytes: null,
    notes: String(item?.notes || '').slice(0, 500),
    discoveredRefs: Array.isArray(item?.discoveredRefs) ? item.discoveredRefs.slice(0, 25) : [],
  }
}

function sanitizeFile(file) {
  if (!file || typeof file !== 'object') return file
  return { ...file, bytes: null }
}

function buildStatusPayload(job, report = null) {
  const archiveFiles = Array.isArray(report?.archiveFiles) ? report.archiveFiles.slice(0, 100).map(sanitizeFile) : []
  const items = Array.isArray(report?.items) ? report.items.slice(0, 100).map(sanitizeItem) : []
  const rootCid = report?.rootCid ?? report?.manifest?.rootCid ?? null
  const summary = report?.summary ?? null
  const manifest = report?.manifest ?? null
  const itemCount = report?.itemCount ?? items.length ?? null
  const totalSize = report?.totalSize ?? report?.size ?? null
  const progress = report?.itemCount
    ? {
        current: report.itemCount,
        total: report.itemCount,
      }
    : job.progress && (job.progress.current !== null || job.progress.total !== null)
      ? job.progress
      : null

  return {
    jobId: job.id,
    status: job.status,
    reportId: job.reportId ?? null,
    error: job.error ?? null,
    progress,
    itemCount,
    totalSize,
    rootCid,
    summary,
    manifest,
    items,
    archiveFiles,
    exportReadiness: computeExportReadiness(job, report),
  }
}

export async function GET({ params }) {
  try {
    const { jobId } = params

    if (!jobId) {
      return json({ message: 'Missing jobId.' }, { status: 400 })
    }

    if (!(await jobExists(jobId))) {
      return json({ message: 'Job not found.' }, { status: 404 })
    }

    let job
    try {
      job = await loadJob(jobId)
    } catch (error) {
      console.warn(`Removing corrupt job ${jobId}`, error)
      await fs.unlink(getJobPath(jobId)).catch(() => {})
      return json({
        jobId,
        status: 'failed',
        error: 'Corrupt job data was removed. Please rerun the scan.',
        reportId: null,
        progress: null,
        exportReadiness: null,
      })
    }

    if (job.status === 'ready' && job.reportId && (await reportExists(job.reportId))) {
      let report
      try {
        report = await loadReport(job.reportId)
      } catch (error) {
        console.warn(`Removing corrupt report ${job.reportId}`, error)
        await deleteReport(job.reportId)
        return json(buildStatusPayload({
          ...job,
          reportId: null,
          error: 'Corrupt report data was removed. Please rerun the scan.',
        }))
      }

      return json(buildStatusPayload(job, report))
    }

    return json(buildStatusPayload(job))
  } catch (error) {
    console.error('Scan status failed', error)
    return json(
      { message: error instanceof Error ? error.message : 'Internal Error' },
      { status: 500 },
    )
  }
}
