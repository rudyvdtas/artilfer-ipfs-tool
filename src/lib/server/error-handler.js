/**
 * error-handler.js — Unified error handling
 *
 * Provides:
 *   - Typed error class (AppError)
 *   - Consistent JSON error shape
 *   - Route handler wrapper
 *   - Simple logger
 */

import { json } from '@sveltejs/kit'

// ─── Error types ──────────────────────────────────────────────────────────────

export const ErrorTypes = {
  VALIDATION_ERROR: 'VALIDATION_ERROR',
  NOT_FOUND:        'NOT_FOUND',
  TIMEOUT:          'TIMEOUT',
  RATE_LIMITED:     'RATE_LIMITED',
  GATEWAY_ERROR:    'GATEWAY_ERROR',
  INTERNAL_ERROR:   'INTERNAL_ERROR',
}

const TYPE_TO_STATUS = {
  VALIDATION_ERROR: 400,
  NOT_FOUND:        404,
  TIMEOUT:          408,
  RATE_LIMITED:     429,
  GATEWAY_ERROR:    502,
  INTERNAL_ERROR:   500,
}

// ─── AppError class ───────────────────────────────────────────────────────────

export class AppError extends Error {
  /**
   * @param {string} message
   * @param {keyof typeof ErrorTypes} type
   */
  constructor(message, type = ErrorTypes.INTERNAL_ERROR) {
    super(message)
    this.name  = 'AppError'
    this.type  = type
    this.status = TYPE_TO_STATUS[type] ?? 500
  }
}

// ─── Format helpers ───────────────────────────────────────────────────────────

/**
 * Normalise any thrown value into a { type, status, message } object.
 * @param {unknown} error
 */
export function normaliseError(error) {
  if (error instanceof AppError) {
    return { type: error.type, status: error.status, message: error.message }
  }

  if (error instanceof Error) {
    const msg = error.message.toLowerCase()
    if (msg.includes('timeout') || msg.includes('timed out')) {
      return { type: ErrorTypes.TIMEOUT,   status: 408, message: error.message }
    }
    if (msg.includes('not found')) {
      return { type: ErrorTypes.NOT_FOUND, status: 404, message: error.message }
    }
    if (msg.includes('rate limit') || msg.includes('429')) {
      return { type: ErrorTypes.RATE_LIMITED, status: 429, message: error.message }
    }
    return { type: ErrorTypes.INTERNAL_ERROR, status: 500, message: error.message }
  }

  return {
    type:    ErrorTypes.INTERNAL_ERROR,
    status:  500,
    message: 'An unexpected error occurred',
  }
}

/**
 * Build a SvelteKit JSON error response from any thrown value.
 * @param {unknown} error
 */
export function errorResponse(error) {
  const { type, status, message } = normaliseError(error)

  return json(
    { error: { type, message, timestamp: new Date().toISOString() } },
    { status }
  )
}

// ─── Route wrapper ────────────────────────────────────────────────────────────

/**
 * Wrap a SvelteKit request handler so unhandled errors return a tidy JSON response.
 *
 * @example
 * export const GET = withErrorHandler(async ({ params }) => { ... })
 *
 * @param {Function} handler
 */
export function withErrorHandler(handler) {
  return async (...args) => {
    try {
      return await handler(...args)
    } catch (err) {
      logError(err, { handler: handler.name })
      return errorResponse(err)
    }
  }
}

// ─── Logger ───────────────────────────────────────────────────────────────────

/**
 * Log an error with optional context.
 * @param {unknown} error
 * @param {object} context
 */
export function logError(error, context = {}) {
  const timestamp = new Date().toISOString()
  const message   = error instanceof Error ? error.message : String(error)
  const stack     = error instanceof Error ? error.stack   : undefined

  console.error(`[${timestamp}] ERROR`, { message, context, stack })
}
