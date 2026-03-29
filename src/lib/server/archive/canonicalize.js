export function tryParseJson(text) {
  try {
    return JSON.parse(text)
  } catch {
    return null
  }
}

function isJsonLike(input) {
  const text = String(input || '').trim()
  return text.startsWith('{') || text.startsWith('[')
}

function isUriLike(input) {
  return /^https?:\/\//i.test(String(input || '').trim()) || /^ipfs:\/\//i.test(String(input || '').trim())
}

function isPlainText(input) {
  return typeof input === 'string' && input.trim().length > 0
}

export async function canonicalizeInput(input) {
  if (input === null || input === undefined) {
    return null
  }

  if (typeof input === 'object') {
    return input
  }

  const text = String(input).trim()
  if (!text) return null

  if (isJsonLike(text)) {
    const parsed = tryParseJson(text)
    if (parsed !== null) return parsed
  }

  if (isUriLike(text)) {
    return {
      type: 'uri',
      value: text,
    }
  }

  if (isPlainText(text)) {
    return {
      type: 'text',
      value: text,
    }
  }

  return null
}
