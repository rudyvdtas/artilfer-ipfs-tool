import { json } from '@sveltejs/kit'
import { randomUUID } from 'node:crypto'
import { createJob, updateJob } from '$lib/server/jobs/job-store'
import { scanArchive, createReportData } from '$lib/server/archive/workflow'
import { compactReport } from '$lib/server/archive/report'
import { saveReport } from '$lib/server/reports/report-store'

const MAX_REPORT_ITEMS = 100
const MAX_REPORT_ARCHIVE_FILES = 100
const MAX_REPORT_ITEM_NOTES = 500
const MAX_REPORT_DISCOVERED_REFS = 25

function sanitizeReportForStorage(report) {
  return {
    ...report,
    items: Array.isArray(report.items)
      ? report.items.slice(0, MAX_REPORT_ITEMS).map((item) => ({
          ...item,
          notes: String(item?.notes || '').slice(0, MAX_REPORT_ITEM_NOTES),
          discoveredRefs: Array.isArray(item?.discoveredRefs) ? item.discoveredRefs.slice(0, MAX_REPORT_DISCOVERED_REFS) : [],
          text: '',
          json: null,
          bytes: null,
        }))
      : [],
    archiveFiles: Array.isArray(report.archiveFiles)
      ? report.archiveFiles.slice(0, MAX_REPORT_ARCHIVE_FILES).map((file) => ({
          ...file,
          bytes: null,
        }))
      : [],
  }
}

export async function POST({ request }) {
  const body = await request.json().catch(() => null)
  const rawInput = body?.inputText ?? body?.ipfsHash ?? body?.value ?? ''
  const inputText = typeof rawInput === 'string' ? rawInput.trim() : String(rawInput || '').trim()

  if (!inputText) {
    return json({ message: 'Missing inputText.' }, { status: 400 })
  }

  const isAsyncPayload = /"tokenType"\s*:\s*"master"|"async-attributes"|"layout"\s*:\s*\{/.test(inputText)
  if (!isAsyncPayload && inputText.length > 5000) {
    return json({ message: 'Input too large. Please provide a root CID, tokenURI, or a shorter JSON payload.' }, { status: 413 })
  }

  const jobId = `scan_${randomUUID()}`
  const now = Date.now()

  await createJob({
    jobId,
    status: 'queued',
    createdAt: now,
    updatedAt: now,
    startedAt: null,
    completedAt: null,
    progress: {
      current: 0,
      total: null,
    },
    reportId: null,
    error: null,
  })

  void (async () => {
    try {
      await updateJob(jobId, { status: 'scanning', startedAt: Date.now() })
      const report = await scanArchive(inputText, async (event) => {
        const current = typeof event?.item?.id === 'number'
          ? event.item.id
          : typeof event?.count === 'number'
            ? event.count
            : null

        const total = typeof event?.total === 'number'
          ? event.total
          : null

        if (current !== null) {
          await updateJob(jobId, {
            progress: {
              current,
              total: total ?? current,
            },
          }).catch(() => {})
        }
      })
      const persistedReport = createReportData(report)
      const sanitizedReport = compactReport(sanitizeReportForStorage(persistedReport))
      await saveReport(sanitizedReport)
      await updateJob(jobId, {
        status: 'ready',
        completedAt: Date.now(),
        reportId: persistedReport.reportId,
        progress: {
          current: persistedReport.itemCount,
          total: persistedReport.itemCount,
        },
      })
    } catch (error) {
      await updateJob(jobId, {
        status: 'failed',
        completedAt: Date.now(),
        error: error?.message || 'Scan failed',
      }).catch(() => {})
    }
  })()

  return json({
    jobId,
    status: 'queued',
  })
}
