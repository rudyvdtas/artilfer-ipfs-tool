import { json } from '@sveltejs/kit'
import { loadJob, jobExists } from '$lib/server/ipfs/job-store.js'
import { exportManifest, exportCsv, exportCar, getExportFilename } from '$lib/server/ipfs/exporter.js'

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

  try {
    const stream = await exportCar(job.result.rootCid)
    const filename = getExportFilename(job.result, 'car')
    return new Response(stream, {
      headers: {
        'content-type': 'application/vnd.ipld.car',
        'content-disposition': `attachment; filename="${filename}"`,
        'x-archive-root-cid': job.result.rootCid,
      },
    })
  } catch (err) {
    return json({ message: err?.message || 'CAR export failed.' }, { status: 500 })
  }
}

