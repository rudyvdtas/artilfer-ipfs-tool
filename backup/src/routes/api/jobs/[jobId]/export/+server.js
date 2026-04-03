/**
 * GET /api/jobs/[jobId]/export
 *
 * Downloads the result of a completed job as a JSON file.
 */

import { withErrorHandler, AppError, ErrorTypes } from '$lib/server/error-handler.js'
import { exportJobAsJson } from '$lib/server/job-manager.js'

export const GET = withErrorHandler(async ({ params }) => {
  const { jobId } = params

  if (!jobId) {
    throw new AppError('Missing jobId', ErrorTypes.VALIDATION_ERROR)
  }

  const { content, contentType, filename } = await exportJobAsJson(jobId)

  return new Response(content, {
    headers: {
      'content-type':        contentType,
      'content-disposition': `attachment; filename="${filename}"`,
    },
  })
})
