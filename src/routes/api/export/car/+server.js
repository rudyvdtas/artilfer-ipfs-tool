import { CID } from 'multiformats/cid'
import { json } from '@sveltejs/kit'
import { loadReport } from '$lib/server/reports/report-store'
import { createCarStreamFromFiles } from '$lib/server/export/car-stream'

function resolveRootCid(report) {
  return report?.manifest?.rootCid || report?.rootCid || report?.metadata?.rootCid || null
}

function normalizeArchiveFiles(archiveFiles) {
  return archiveFiles
    .map((file) => ({
      path: file?.path || file?.archivePath || file?.archive_path || null,
      cid: file?.cid || null,
      bytes: file?.bytes ?? null,
    }))
    .filter((file) => file.path)
}

function computeExportReadiness(report, normalizedFiles) {
  const rootCid = resolveRootCid(report)

  if (!rootCid) {
    return {
      canExportCar: false,
      canExportCsv: normalizedFiles.length > 0,
      reason: 'Missing rootCid',
    }
  }

  if (!normalizedFiles.length) {
    return {
      canExportCar: false,
      canExportCsv: false,
      reason: 'Missing archive files',
    }
  }

  if (normalizedFiles.some((file) => !file.cid)) {
    return {
      canExportCar: false,
      canExportCsv: true,
      reason: 'Archive files missing cid values',
    }
  }

  if (normalizedFiles.some((file) => file.bytes === undefined || file.bytes === null)) {
    return {
      canExportCar: false,
      canExportCsv: true,
      reason: 'Archive files missing bytes',
    }
  }

  if (!normalizedFiles.some((file) => file.cid === rootCid)) {
    return {
      canExportCar: false,
      canExportCsv: true,
      reason: 'rootCid is not present in the archive file set',
    }
  }

  return {
    canExportCar: true,
    canExportCsv: true,
    reason: null,
  }
}

export async function POST({ request }) {
  const body = await request.json().catch(() => null)
  const reportId = body?.reportId

  if (!reportId) {
    return json({ message: 'Missing reportId. Please scan first.' }, { status: 400 })
  }

  let report
  try {
    report = await loadReport(reportId)
  } catch {
    return json({ message: 'Cached report not found or expired. Please scan again.' }, { status: 404 })
  }

  const archiveFiles = Array.isArray(report.archiveFiles) ? report.archiveFiles : []
  const normalizedFiles = normalizeArchiveFiles(archiveFiles)
  const readiness = computeExportReadiness(report, normalizedFiles)

  if (!readiness.canExportCar) {
    return json({
      message: `Report is not export-ready. ${readiness.reason || 'Please scan again.'}`,
      exportReadiness: readiness,
    }, { status: 400 })
  }

  const rootCid = resolveRootCid(report)
  if (!normalizedFiles.some((file) => file.cid === rootCid)) {
    console.warn('CAR export rootCid is not present in archive files', { reportId, rootCid })
    return json({ message: 'Report rootCid does not match the exported archive graph.' }, { status: 400 })
  }

  try {
    const root = CID.parse(rootCid)
    const stream = await createCarStreamFromFiles(
      normalizedFiles.map((file) => ({
        ...file,
        cid: CID.parse(file.cid),
      })),
      root,
    )

    return new Response(stream, {
      headers: {
        'content-type': 'application/vnd.ipld.car',
        'content-disposition': 'attachment; filename="archive-bundle.car"',
        'x-archive-root-cid': rootCid,
      },
    })
  } catch (error) {
    console.error('CAR export failed', error)
    return json(
      { message: error instanceof Error ? error.message : 'Internal Error' },
      { status: 500 },
    )
  }
}
