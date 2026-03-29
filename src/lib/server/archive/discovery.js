import { Buffer } from 'node:buffer'
import { canonicalizeReference, gatewayUrlsForRef, safeSegment } from './reference.js'
import { discoverReferences } from './discover.js'
import { tryParseJson } from './canonicalize.js'

const MAX_TEXT_LENGTH = 256 * 1024
const MAX_PARSE_SIZE = 1024 * 1024

function decodePreviewText(bytes, maxLength = MAX_TEXT_LENGTH) {
  if (!bytes?.length) return ''
  const previewBytes = bytes.length > maxLength ? bytes.subarray(0, maxLength) : bytes
  return previewBytes.toString('utf8')
}

async function fetchReference(reference) {
  const candidates = gatewayUrlsForRef(reference)
  let lastError = null
  for (const url of candidates) {
    try {
      if (process.env.DISCOVERY_DEBUG === '1') console.log('[discovery] fetch-start', { url })
      const response = await fetch(url, { headers: { accept: 'application/json,text/plain,*/*' } })
      if (!response.ok) throw new Error(`HTTP ${response.status}`)
      const bytes = Buffer.from(await response.arrayBuffer())
      const contentType = (response.headers.get('content-type') || '').split(';')[0].trim().toLowerCase()
      const isJsonLike = contentType.includes('json')
      const oversizedForParse = bytes.length > MAX_PARSE_SIZE
      const text = bytes.length ? decodePreviewText(bytes, MAX_TEXT_LENGTH) : ''
      const canParseText = !oversizedForParse && (isJsonLike || text.trim().startsWith('{') || text.trim().startsWith('['))
      const json = canParseText ? tryParseJson(text) : null
      const textTruncated = bytes.length > MAX_TEXT_LENGTH
      if (process.env.DISCOVERY_DEBUG === '1') console.log('[discovery] fetch-ok', { url, bytes: bytes.length, contentType, isJson: Boolean(json), textTruncated, oversizedForParse })
      return { ok: true, url, bytes, text, json, contentType, textTruncated, oversizedForParse }
    } catch (error) {
      lastError = error
      if (process.env.DISCOVERY_DEBUG === '1') console.log('[discovery] fetch-failed', { url, error: error?.message || String(error) })
    }
  }
  return { ok: false, error: lastError?.message || 'Unable to fetch reference' }
}

function discoverRefsFromValue(value) {
  const refs = discoverReferences(value, {
    maxRefs: 100,
    maxDepth: 8,
    keyWhitelist: [
      'uri',
      'cid',
      'CID',
      'link',
      'href',
      'tokenURI',
      'url',
      'reference',
      'image',
      'animation_url',
      'async-attributes',
      'async_attributes',
      'external_url',
      'states',
      'options',
      'attributes',
      'layout',
      'layers',
    ],
  })
  if (process.env.DISCOVERY_DEBUG === '1') {
    console.log('[discovery] discovered-refs', {
      kind: Array.isArray(value) ? 'array' : typeof value,
      count: refs.length,
      refs: refs.slice(0, 10).map((ref) => ref.canonical),
    })
  }
  return refs
}

function scanJsonForRefs(json) {
  const refs = []
  const seen = new Set()
  const pushRef = (value) => {
    const ref = canonicalizeReference(value)
    if (ref && !seen.has(ref.canonical)) {
      seen.add(ref.canonical)
      refs.push(ref)
    }
  }

  if (!json || typeof json !== 'object') return refs

  const isAsync = Boolean(json?.tokenType === 'master' || json?.['async-attributes'] || json?.async_attributes || Array.isArray(json?.layout?.layers))

  pushRef(json.ipfsHash)
  pushRef(json.rootCid)
  pushRef(json.cid)
  pushRef(json.uri)
  pushRef(json.url)
  pushRef(json.link)
  pushRef(json.tokenURI)
  pushRef(json.tokenUri)
  pushRef(json.image)
  pushRef(json.animation_url)
  pushRef(json.external_url)

  if (isAsync) {
    const layers = json?.layout?.layers
    if (Array.isArray(layers)) {
      for (const layer of layers) {
        const options = layer?.states?.options
        if (!Array.isArray(options)) continue
        for (const option of options) {
          pushRef(option?.uri)
          pushRef(option?.cid)
          pushRef(option?.link)
          pushRef(option?.href)
        }
      }
    }

    const asyncAttrs = json['async-attributes'] || json.async_attributes
    const extraScans = [asyncAttrs, json.attributes, json.states, json.options]
    for (const value of extraScans) {
      const scanned = discoverReferences(value, {
        maxRefs: 500,
        maxDepth: 6,
        keyWhitelist: ['uri', 'cid', 'link', 'href', 'tokenURI', 'tokenUri', 'image', 'external_url', 'states', 'options'],
      })
      for (const ref of scanned) {
        if (!seen.has(ref.canonical)) {
          seen.add(ref.canonical)
          refs.push(ref)
        }
      }
    }
  }

  return refs
}

function guessKind(contentType, text, json) {
  if (json) return 'json'
  const type = String(contentType || '').toLowerCase()
  const trimmed = String(text || '').trim()
  if (type.includes('html')) return 'html'
  if (type.startsWith('text/') || type.includes('json')) return 'text'
  if (trimmed.startsWith('{') || trimmed.startsWith('[')) return 'json'
  if (trimmed.length) return 'text'
  return 'binary'
}

function deriveNameHint(fetched, seed, index) {
  if (fetched?.url) {
    try {
      const url = new URL(fetched.url)
      const base = url.pathname.split('/').pop()
      if (base) return base
    } catch {}
  }
  if (seed?.canonical?.startsWith('ipfs://')) {
    const parts = seed.canonical.replace(/^ipfs:\/\//, '').split('/')
    if (parts.length > 1) return parts[parts.length - 1]
  }
  return `item-${String(index).padStart(4, '0')}`
}

function guessExtension(item) {
  const name = item.nameHint || ''
  const existingExt = name.includes('.') ? `.${name.split('.').pop()}` : ''
  if (existingExt) return existingExt
  const type = String(item.contentType || '').toLowerCase()
  if (item.kind === 'json') return '.json'
  if (item.kind === 'html') return '.html'
  if (item.kind === 'text') return '.txt'
  if (type === 'image/png') return '.png'
  if (type === 'image/jpeg' || type === 'image/jpg') return '.jpg'
  if (type === 'image/gif') return '.gif'
  if (type === 'image/webp') return '.webp'
  if (type === 'image/svg+xml') return '.svg'
  if (type === 'application/pdf') return '.pdf'
  if (type === 'text/csv') return '.csv'
  return '.bin'
}

function createArchivePath(item, index) {
  const folder = item.kind === 'json' ? 'metadata' : item.kind === 'html' ? 'pages' : item.kind === 'text' ? 'notes' : 'assets'
  const base = safeSegment(item.nameHint || `item-${String(index).padStart(4, '0')}`)
  return `${folder}/${String(index).padStart(4, '0')}-${base}${guessExtension(item)}`
}

export function createSummary(items, seeds) {
  const ok = items.filter((item) => item.status === 'ok')
  const failed = items.filter((item) => item.status !== 'ok')
  return {
    totalFiles: items.length,
    input_count: seeds.length,
    total_records: items.length,
    successful_records: ok.length,
    failed_records: failed.length,
    unique_references: new Set(items.map((item) => item.canonicalRef)).size,
    json_records: items.filter((item) => item.kind === 'json').length,
    text_records: items.filter((item) => item.kind === 'text').length,
    html_records: items.filter((item) => item.kind === 'html').length,
    binary_records: items.filter((item) => item.kind === 'binary').length,
  }
}

export function buildProgressState(items, seeds) {
  return { processed: items.length, total: seeds.length, completed: items.filter((item) => item.status === 'ok').length, failed: items.filter((item) => item.status !== 'ok').length }
}

export async function discoverAndFetch(seed, parentId, depth, onProgress) {
  onProgress?.({ type: 'fetch_start', seed, parentId, depth })

  const canonicalRef = canonicalizeReference(seed?.canonical || seed?.raw || '') || seed
  const fetched = await fetchReference(canonicalRef)
  if (process.env.DISCOVERY_DEBUG === '1') {
    console.log('[discovery] fetch-result', {
      seed: canonicalRef?.canonical || String(canonicalRef || ''),
      ok: fetched.ok,
      url: fetched.url || null,
      contentType: fetched.contentType || null,
      bytes: fetched.bytes ? fetched.bytes.length : 0,
      hasJson: Boolean(fetched.json),
    })
  }

  if (!fetched.ok) {
    const isValidReference = Boolean(canonicalRef?.canonical)
    return {
      status: isValidReference ? 'ok' : 'error',
      notes: fetched.error,
      kind: 'binary',
      bytes: null,
      text: '',
      json: null,
      contentType: '',
      resolvedUrl: null,
      discoveredRefs: [],
      discoveredCount: 0,
      nameHint: deriveNameHint(null, canonicalRef, seed?.id),
    }
  }

  const kind = guessKind(fetched.contentType, fetched.text, fetched.json)
  const previewText = fetched.textTruncated ? fetched.text.slice(0, MAX_TEXT_LENGTH) : fetched.text
  const nameHint = deriveNameHint(fetched, canonicalRef, seed?.id)
  if (process.env.DISCOVERY_DEBUG === '1' && fetched.json) {
    console.log('[discovery] fetched-json-summary', {
      url: fetched.url,
      keys: Object.keys(fetched.json || {}).slice(0, 30),
      hasLayout: Boolean(fetched.json?.layout),
      layerCount: Array.isArray(fetched.json?.layout?.layers) ? fetched.json.layout.layers.length : 0,
      hasAsyncAttributes: Boolean(fetched.json?.async-attributes),
    })
  }
  const discoveredRefs = kind === 'json' && fetched.json ? scanJsonForRefs(fetched.json) : discoverRefsFromValue(previewText.slice(0, 200000))
  const status = 'ok'
  return { status, notes: discoveredRefs.length ? `${discoveredRefs.length} IPFS reference(s) discovered` : '', kind, bytes: fetched.bytes, text: fetched.textTruncated ? '' : fetched.text, json: fetched.json, contentType: fetched.contentType, resolvedUrl: fetched.url, nameHint, discoveredRefs, discoveredCount: discoveredRefs.length, parentId, depth, textTruncated: fetched.textTruncated, oversizedForParse: fetched.oversizedForParse }
}

export function makeArchiveFile(item, index) {
  return { path: createArchivePath(item, index), bytes: item.bytes }
}
