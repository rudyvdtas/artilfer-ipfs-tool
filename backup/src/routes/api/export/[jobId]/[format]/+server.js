import { json } from '@sveltejs/kit'
import { loadJob, jobExists } from '$lib/server/ipfs/job-store.js'
import { scan } from '$lib/server/ipfs/scanner.js'
import { exportManifest, exportCsv, exportCar, getExportFilename } from '$lib/server/ipfs/exporter.js'
import { cacheGet, cacheSet } from '$lib/server/ipfs/cache.js'

export async function GET({ params }) {
  const { jobId, format } = params

  if (!jobId) return json({ message: 'Missing jobId.' }, { status: 400 })
  if (!['car', 'csv', 'manifest'].includes(format)) {
    return json({ message: 'Invalid format. Use: car, csv, or manifest.' }, { status: 400 })
  }

  if (!(await jobExists(jobId))) {
    return json({ message: 'Job not found.' }, { status: 404 })
  }

  const job = await loadJob(jobId)
  if (job.status !== 'ready' || !job.result) {
    return json({ message: 'Scan not ready yet. Please wait for completion.' }, { status: 409 })
  }

  // For manifest and CSV we can use the stored result (no bytes needed)
  if (format === 'manifest') {
    const body = exportManifest(job.result)
    const filename = getExportFilename(job.result, 'json')
    return new Response(body, {
      headers: {
        'content-type': 'application/json; charset=utf-8',
        'content-disposition': `attachment; filename="${filename}"`,
      },
    })
  }

  if (format === 'csv') {
    const body = exportCsv(job.result)
    const filename = getExportFilename(job.result, 'csv')
    return new Response(body, {
      headers: {
        'content-type': 'text/csv; charset=utf-8',
        'content-disposition': `attachment; filename="${filename}"`,
      },
    })
  }

  // CAR export needs bytes — check memory cache first
  let fullResult = cacheGet(jobId)

  if (!fullResult) {
    // Bytes not in cache — need to re-scan (rare: only if server restarted)
    try {
      fullResult = await scan(job.result.rootCid)
      cacheSet(jobId, fullResult)
    } catch (err) {
      return json({ message: `Re-scan failed: ${err?.message}. Please start a new scan.` }, { status: 500 })
    }
  }

  if (!fullResult.archiveFiles?.length) {
    return json({ message: 'No files available for CAR export.' }, { status: 400 })
  }

  try {
    const stream = await exportCar(fullResult)
    const filename = getExportFilename(fullResult, 'car')
    return new Response(stream, {
      headers: {
        'content-type': 'application/vnd.ipld.car',
        'content-disposition': `attachment; filename="${filename}"`,
        'x-archive-root-cid': fullResult.rootCid,
      },
    })
  } catch (err) {
    return json({ message: err?.message || 'CAR export failed.' }, { status: 500 })
  }
}
