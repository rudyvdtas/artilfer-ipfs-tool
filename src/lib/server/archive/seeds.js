import { canonicalizeReference, repairCommonReferenceTypos, stripDecorations } from './reference.js'
import { tryParseJson } from './canonicalize.js'

function parseLooseSeedLines(text) {
  const rawText = String(text || '')
  const candidates = [rawText, ...rawText.split(/\r?\n|,|\s+/)]
  const seen = new Set()
  const results = []

  for (const part of candidates) {
    const raw = repairCommonReferenceTypos(stripDecorations(part))
    if (!raw || seen.has(raw)) continue
    seen.add(raw)

    const parsed = canonicalizeReference(raw)
    if (parsed) {
      results.push({ id: results.length + 1, raw, canonical: parsed.canonical, kind: parsed.kind, cid: parsed.cid || null, path: parsed.path || '' })
      continue
    }

    const cleaned = raw.replace(/^https?:\/\//i, '')
    const maybeGateway = cleaned.match(/(?:ipfs\.io|w3s\.link|dweb\.link|cloudflare-ipfs\.com|gateway\.pinata\.cloud|ipfsgateway\.makersplace\.com)\/ipfs\/([^\s"'<>`]+)/i)
    if (maybeGateway?.[1]) {
      const gatewayRef = canonicalizeReference(`ipfs://${maybeGateway[1]}`)
      if (gatewayRef) {
        results.push({ id: results.length + 1, raw, canonical: gatewayRef.canonical, kind: gatewayRef.kind, cid: gatewayRef.cid || null, path: gatewayRef.path || '' })
      }
    }
  }

  return results
}

export function normalizeSeedInput(input) {
  if (input && typeof input === 'object') {
    if (typeof input.value === 'string') return input.value
    if (typeof input.inputText === 'string') return input.inputText
    if (typeof input.ipfsHash === 'string') return input.ipfsHash
    if (typeof input.url === 'string') return input.url
    if (typeof input.uri === 'string') return input.uri
    if (typeof input.rootCid === 'string') return input.rootCid
    return ''
  }
  return String(input || '')
}

export async function canonicalizeScanInput(canonicalizeInput, inputText) {
  const canonical = await canonicalizeInput(inputText)
  return canonical === null || canonical === undefined ? inputText : canonical
}

export async function parseSeedInput(canonicalizeInput, inputText) {
  const canonicalInput = await canonicalizeScanInput(canonicalizeInput, inputText)
  return canonicalInput && typeof canonicalInput === 'object' && !Array.isArray(canonicalInput) ? canonicalInput : String(inputText || '')
}

export function parseSeeds(inputText) {
  const trimmed = String(inputText || '').trim()
  if (!trimmed) return []

  const maybeJson = tryParseJson(trimmed)
  if (maybeJson) {
    const candidates = [
      maybeJson.ipfsHash,
      maybeJson.rootCid,
      maybeJson.cid,
      maybeJson.uri,
      maybeJson.url,
      maybeJson.link,
      maybeJson.image,
      maybeJson.imageUrl,
      maybeJson.image_url,
      maybeJson.preview_media_file,
      maybeJson.preview_media,
      maybeJson.media,
      maybeJson.tokenURI,
      maybeJson.tokenUri,
      maybeJson.source,
      maybeJson.value,
      maybeJson.inputText,
    ]
    const rootRef = candidates.map(canonicalizeReference).find(Boolean)
    if (rootRef) {
      return [{ id: 1, raw: rootRef.raw, canonical: rootRef.canonical, kind: rootRef.kind, cid: rootRef.cid || null, path: rootRef.path || '' }]
    }
  }

  const lineSeeds = trimmed
    .split(/\r?\n/)
    .map((line) => repairCommonReferenceTypos(stripDecorations(line)))
    .filter((line) => line && !line.startsWith('#'))
    .map((raw, index) => {
      const parsed = canonicalizeReference(raw)
      if (!parsed) return null
      return { id: index + 1, raw, canonical: parsed.canonical, kind: parsed.kind, cid: parsed.cid || null, path: parsed.path || '' }
    })
    .filter(Boolean)

  return lineSeeds.length ? lineSeeds : parseLooseSeedLines(trimmed)
}
