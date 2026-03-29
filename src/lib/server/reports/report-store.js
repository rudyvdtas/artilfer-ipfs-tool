import fs from 'node:fs/promises'
import { constants as fsConstants } from 'node:fs'
import { getReportPath, getReportsDir } from '$lib/server/storage/paths'

function safeJsonParse(raw) {
  try {
    return JSON.parse(raw)
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Invalid JSON'
    const wrapped = new Error(`Corrupt report JSON: ${message}`)
    wrapped.cause = error
    throw wrapped
  }
}

async function ensureReportsDir() {
  await fs.mkdir(getReportsDir(), { recursive: true })
}

async function fileExists(filepath) {
  try {
    await fs.access(filepath, fsConstants.F_OK)
    return true
  } catch {
    return false
  }
}

function resolveReportRootCid(report) {
  return report?.manifest?.rootCid || report?.rootCid || report?.metadata?.rootCid || null
}

export async function saveReport(report) {
  await ensureReportsDir()

  const reportRootCid = resolveReportRootCid(report)
  const manifestRootCid = report?.manifest?.rootCid || null

  if (reportRootCid && manifestRootCid && reportRootCid !== manifestRootCid) {
    throw new Error('Corrupt report JSON: rootCid does not match manifest.rootCid')
  }

  if (report?.manifest && reportRootCid && !report.manifest.rootCid) {
    report = {
      ...report,
      manifest: {
        ...report.manifest,
        rootCid: reportRootCid,
      },
    }
  }

  if (reportRootCid && !report.rootCid) {
    report = {
      ...report,
      rootCid: reportRootCid,
    }
  }

  const safeReport = {
    ...report,
    items: Array.isArray(report.items) ? report.items.slice(0, 100) : [],
    archiveFiles: Array.isArray(report.archiveFiles) ? report.archiveFiles.slice(0, 100) : [],
  }
  await fs.writeFile(getReportPath(report.reportId), JSON.stringify(safeReport, null, 2), 'utf8')
  return report
}

export async function loadReport(reportId) {
  const raw = await fs.readFile(getReportPath(reportId), 'utf8')
  const report = safeJsonParse(raw)

  if (Array.isArray(report.items)) {
    report.items = report.items.map((item) => ({
      ...item,
      path: item.path || item.archivePath || item.archive_path || null,
      size: item.size ?? item.sizeBytes ?? item.size_bytes ?? null,
      cid: item.cid || item.canonicalRef?.replace(/^ipfs:\/\//, '').split('/')[0] || null,
    }))
  }

  if (Array.isArray(report.archiveFiles)) {
    report.archiveFiles = report.archiveFiles.map((file) => ({
      ...file,
      path: file.path || file.archivePath || file.archive_path || null,
      size: file.size ?? file.sizeBytes ?? file.size_bytes ?? (file.bytes?.length || 0),
      cid: file.cid || null,
    }))
  }

  const reportRootCid = resolveReportRootCid(report)

  if (report.rootCid && report.manifest?.rootCid && report.rootCid !== report.manifest.rootCid) {
    throw new Error('Corrupt report JSON: rootCid does not match manifest.rootCid')
  }

  if (!report.rootCid && reportRootCid) {
    report.rootCid = reportRootCid
  }

  if (report.manifest && reportRootCid && !report.manifest.rootCid) {
    report.manifest.rootCid = reportRootCid
  }

  return report
}

export async function deleteReport(reportId) {
  try {
    await fs.unlink(getReportPath(reportId))
  } catch {
    // ignore missing or unreadable files
  }
}

export async function reportExists(reportId) {
  return fileExists(getReportPath(reportId))
}
