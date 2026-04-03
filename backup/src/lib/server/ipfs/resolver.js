/**
 * resolver.js — CID normalization + IPFS gateway fetching
 *
 * Consolidates: reference.js, discover.js, discovery.js, canonicalize.js, seeds.js
 * Two core functions: resolve() and fetchCid()
 */

import { CID } from 'multiformats/cid'
import { Buffer } from 'node:buffer'

// ── Gateways ──

const GATEWAYS = [
  'https://w3s.link/ipfs',
  'https://cloudflare-ipfs.com/ipfs',
  'https://gateway.pinata.cloud/ipfs',
  'https://ipfs.io/ipfs',
  'https://dweb.link/ipfs',
]

const FETCH_TIMEOUT_MS = 8_000  // ✅ Reduced for faster failover
const MAX_TEXT_LENGTH = 256 * 1024

// ── CID Parsing ──

export function parseCid(value) {
  try {
    return CID.parse(String(value).trim()).toString()
  } catch {
    return null
  }
}

function stripDecorations(value) {
  return String(value).trim().replace(/^[<"'`(\[]+/, '').replace(/[>"'`)]\.,;]+$/, '')
}

function repairTypos(value) {
  const text = String(value || '').trim()
  if (!text) return text
  if (/^ttps?:\/\//i.test(text)) return `h${text}`
  if (/^ipfs:\/[^/]/i.test(text)) return text.replace(/^ipfs:\//i, 'ipfs://')
  return text
}

/**
 * Resolve any IPFS input to a normalized { cid, path, canonical } object.
 * Accepts: ipfs://CID/path, https://gateway/ipfs/CID/path, bare CID, CID/path
 * @param {string} raw
 * @returns {{ cid: string, path: string, canonical: string } | null}
 */
export function resolve(raw) {
  const cleaned = repairTypos(stripDecorations(String(raw || '')))
  if (!cleaned) return null

  // ipfs://CID/path
  if (/^ipfs:\/\//i.test(cleaned)) {
    const rest = cleaned.slice('ipfs://'.length)
    const [cidPart, ...pathParts] = rest.split('/')
    const cid = parseCid(cidPart)
    if (!cid) return null
    const path = pathParts.length ? `/${pathParts.join('/')}` : ''
    return { cid, path, canonical: `ipfs://${cid}${path}` }
  }

  // URL with /ipfs/ in path
  if (cleaned.includes('/ipfs/')) {
    const after = cleaned.slice(cleaned.indexOf('/ipfs/') + '/ipfs/'.length)
    const [cidPart, ...pathParts] = after.split('/')
    const cid = parseCid(cidPart)
    if (!cid) return null
    const path = pathParts.length ? `/${pathParts.join('/')}` : ''
    return { cid, path, canonical: `ipfs://${cid}${path}` }
  }

  // Bare CID or CID/path
  const [cidPart, ...pathParts] = cleaned.split('/')
  const cid = parseCid(cidPart)
  if (!cid) return null
  const path = pathParts.length ? `/${pathParts.join('/')}` : ''
  return { cid, path, canonical: `ipfs://${cid}${path}` }
}

/**
 * Fetch content from IPFS gateways with parallel racing.
 * First successful gateway wins, others are cancelled.
 * @param {string} cid
 * @param {string} [path='']
 * @returns {Promise<{ ok: boolean, bytes?: Buffer, text?: string, json?: any, contentType?: string, url?: string, error?: string }>}
 */
export async function fetchCid(cid, path = '') {
  const suffix = `${cid}${path}`

  // ✅ TRUE RACE: first successful gateway wins and all others are cancelled immediately.
  // Using a shared AbortController per gateway + a manual "winner" flag avoids
  // waiting for slow gateways after the first success.
  const controllers = GATEWAYS.map(() => new AbortController())

  let resolved = false

  const fetchPromises = GATEWAYS.map(async (gateway, i) => {
    const url = `${gateway}/${suffix}`
    const controller = controllers[i]
    const timer = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS)

    try {
      const response = await fetch(url, {
        headers: { accept: 'application/json,text/plain,*/*' },
        signal: controller.signal,
      })
      clearTimeout(timer)

      if (!response.ok) throw new Error(`HTTP ${response.status}`)

      const bytes = Buffer.from(await response.arrayBuffer())
      clearTimeout(timer)

      // ✅ Cancel all other in-flight requests as soon as we have a result
      if (!resolved) {
        resolved = true
        for (let j = 0; j < controllers.length; j++) {
          if (j !== i) controllers[j].abort()
        }
      }

      const contentType = (response.headers.get('content-type') || '').split(';')[0].trim().toLowerCase()

      const text = bytes.length <= MAX_TEXT_LENGTH
        ? bytes.toString('utf8')
        : bytes.subarray(0, MAX_TEXT_LENGTH).toString('utf8')

      const isJsonLike = contentType.includes('json') || text.trim().startsWith('{') || text.trim().startsWith('[')
      let json = null
      if (isJsonLike && bytes.length <= 1024 * 1024) {
        try { json = JSON.parse(text) } catch { /* not valid JSON */ }
      }

      return { ok: true, url, bytes, text, json, contentType }
    } catch (err) {
      clearTimeout(timer)
      throw err
    }
  })

  // Use Promise.any to get the first successful result (true race semantics)
  try {
    return await Promise.any(fetchPromises)
  } catch {
    // All gateways failed (AggregateError)
    return { ok: false, error: 'All gateways failed' }
  }
}

// ── Reference Discovery ──

/** Regex patterns to find IPFS references in text */
const REF_PATTERNS = [
  /ipfs:\/\/[^\s"'<>`]+/gi,
  /https?:\/\/[^\s"'<>`]+\/ipfs\/[^\s"'<>`]+/gi,
  /(?:bafy[a-z0-9]{20,}|Qm[1-9A-HJ-NP-Za-km-z]{44})(?:\/[^\s"'<>`]+)?/g,
]

/** IPFS-related keys to check in JSON objects */
const REF_KEYS = new Set([
  'uri', 'cid', 'CID', 'link', 'href', 'tokenURI', 'tokenUri', 'url',
  'reference', 'image', 'animation_url', 'external_url', 'image_url',
  'preview_media_file', 'media',
  // ✅ Tezos / OBJKT / hic et nunc / fxhash fields
  'artifactUri', 'displayUri', 'thumbnailUri', 'assetUri',
])

/** Keys that contain nested objects to recurse into */
const RECURSE_KEYS = new Set([
  'async-attributes', 'async_attributes', 'states', 'options',
  'attributes', 'layout', 'layers', 'properties', 'metadata',
  // ✅ Tezos formats[] array (OBJKT standard)
  'formats',
])

/**
 * Discover IPFS references in any value (string, object, array).
 * Returns de-duplicated array of resolved references.
 * @param {any} input
 * @param {{ maxRefs?: number, maxDepth?: number }} [opts]
 * @returns {Array<{ cid: string, path: string, canonical: string }>}
 */
export function discoverRefs(input, opts = {}) {
  const { maxRefs = 100, maxDepth = 8 } = opts
  const found = new Map()
  const visited = new WeakSet()
  let nodeCount = 0

  function addRef(raw) {
    if (found.size >= maxRefs) return
    const ref = resolve(raw)
    if (ref && !found.has(ref.canonical)) {
      found.set(ref.canonical, ref)
    }
  }

  function extractFromText(text) {
    for (const pattern of REF_PATTERNS) {
      pattern.lastIndex = 0
      for (const match of text.matchAll(pattern)) {
        addRef(match[0])
        if (found.size >= maxRefs) return
      }
    }
  }

  function walk(node, depth) {
    if (found.size >= maxRefs || nodeCount > 3000 || depth > maxDepth) return

    if (typeof node === 'string') {
      extractFromText(node)
      return
    }

    if (Array.isArray(node)) {
      nodeCount++
      for (const child of node) walk(child, depth + 1)
      return
    }

    if (node && typeof node === 'object') {
      if (visited.has(node)) return
      visited.add(node)
      nodeCount++

      for (const [key, value] of Object.entries(node)) {
        if (typeof value === 'string') {
          if (REF_KEYS.has(key)) addRef(value)
          if (/(ipfs|Qm|bafy)/i.test(value)) extractFromText(value)
        } else if (Array.isArray(value) || (value && typeof value === 'object')) {
          walk(value, depth + 1)
        }
        if (found.size >= maxRefs || nodeCount > 3000) return
      }
    }
  }

  walk(input, 0)
  return [...found.values()]
}

/**
 * Specialized discovery for async NFT metadata (tokenType=master).
 * Scans layout.layers[].states.options[].uri and async-attributes.
 * @param {object} json
 * @returns {Array<{ cid: string, path: string, canonical: string }>}
 */
export function discoverAsyncNftRefs(json) {
  if (!json || typeof json !== 'object') return []

  const isAsync = json.tokenType === 'master' ||
    json['async-attributes'] || json.async_attributes ||
    Array.isArray(json?.layout?.layers)

  if (!isAsync) return []

  const found = new Map()

  function addRef(raw) {
    if (!raw) return
    const ref = resolve(raw)
    if (ref && !found.has(ref.canonical)) found.set(ref.canonical, ref)
  }

  // Scan layout layers
  const layers = json?.layout?.layers
  if (Array.isArray(layers)) {
    for (const layer of layers) {
      const options = layer?.states?.options
      if (!Array.isArray(options)) continue
      for (const option of options) {
        addRef(option?.uri)
        addRef(option?.cid)
        addRef(option?.link)
        addRef(option?.href)
      }
    }
  }

  // Scan async attributes and other nested structures
  const targets = [
    json['async-attributes'], json.async_attributes,
    json.attributes, json.states, json.options,
  ].filter(Boolean)

  for (const target of targets) {
    for (const ref of discoverRefs(target, { maxRefs: 500, maxDepth: 6 })) {
      if (!found.has(ref.canonical)) found.set(ref.canonical, ref)
    }
  }

  return [...found.values()]
}

/**
 * Extract all IPFS references from a fetched result (text or JSON).
 * Handles both standard and async NFT metadata.
 * @param {{ json?: any, text?: string }} fetched
 * @returns {Array<{ cid: string, path: string, canonical: string }>}
 */
export function discoverAllRefs(fetched) {
  if (!fetched) return []

  if (fetched.json) {
    // Standard key-based discovery
    const standard = discoverRefs(fetched.json, { maxRefs: 100, maxDepth: 8 })
    // Async NFT discovery
    const async_ = discoverAsyncNftRefs(fetched.json)
    // Merge and deduplicate
    const merged = new Map()
    for (const ref of [...standard, ...async_]) {
      if (!merged.has(ref.canonical)) merged.set(ref.canonical, ref)
    }
    return [...merged.values()]
  }

  if (fetched.text) {
    return discoverRefs(fetched.text.slice(0, 200_000), { maxRefs: 100, maxDepth: 1 })
  }

  return []
}

// ── Metadata Extraction ──

/**
 * Extract project metadata (title, artists, description) from JSON.
 * @param {object} json
 * @returns {{ title: string, artists: string, description: string, image: string | null }}
 */
export function extractMetadata(json) {
  if (!json || typeof json !== 'object') {
    return { title: '', artists: '', description: '', image: null }
  }

  const candidates = [json]
  for (const key of ['metadata', 'properties', 'collection', 'project', 'info']) {
    if (json[key] && typeof json[key] === 'object') candidates.push(json[key])
  }

  let title = ''
  let artists = ''
  let description = ''
  let image = null
  let thumbnail = null

  for (const obj of candidates) {
    if (!title) title = normalize(obj.name || obj.title || obj.project_name || obj.project || '')

    // ✅ Tezos: creators[] is an array of tz-addresses; also support standard fields
    if (!artists) {
      const raw = obj.artist || obj.artists || obj.creator || obj.creators ||
                  obj.author || obj.authors || null
      if (raw) artists = normalize(raw)
    }

    if (!description) description = normalize(obj.description || obj.about || obj.bio || obj.summary || '')

    if (!image) {
      // ✅ Tezos priority: displayUri > artifactUri > image > image_url
      const img = obj.displayUri || obj.artifactUri ||
                  obj.image || obj.image_url || obj.preview_media_file || obj.media || null
      if (typeof img === 'string' && img.trim()) image = img
    }

    // ✅ Tezos thumbnailUri
    if (!thumbnail) {
      const th = obj.thumbnailUri || obj.thumbnail || obj.thumbnailUrl || null
      if (typeof th === 'string' && th.trim()) thumbnail = th
    }
  }

  // ✅ Also pick best image from formats[] (OBJKT standard)
  if (!image && Array.isArray(json.formats)) {
    const display = json.formats.find((f) => f?.fileName?.includes('display') || f?.mimeType?.startsWith('image/'))
    if (display?.uri) image = display.uri
  }

  return { title, artists, description, image, thumbnail: thumbnail || null }
}

function normalize(value) {
  if (!value) return ''
  if (typeof value === 'string') return value.trim()
  if (Array.isArray(value)) return value.map(normalize).filter(Boolean).join(', ')
  if (typeof value === 'object') return value.name || value.title || value.label || ''
  return String(value)
}

// ── Helpers ──

export function safeFilename(value) {
  return String(value || 'archive')
    .normalize('NFKD')
    .replace(/[^\w.-]+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-+|-+$/g, '')
    .toLowerCase() || 'archive'
}

export function guessKind(contentType, text, json) {
  if (json) return 'json'
  const type = String(contentType || '').toLowerCase()
  if (type.includes('html')) return 'html'
  if (type.startsWith('text/') || type.includes('json')) return 'text'
  const trimmed = String(text || '').trim()
  if (trimmed.startsWith('{') || trimmed.startsWith('[')) return 'json'
  if (trimmed.length) return 'text'
  return 'binary'
}

export function guessExtension(contentType, kind, nameHint) {
  if (nameHint?.includes('.')) return ''  // already has extension
  const type = String(contentType || '').toLowerCase()
  if (kind === 'json') return '.json'
  if (kind === 'html') return '.html'
  if (kind === 'text') return '.txt'
  if (type === 'image/png') return '.png'
  if (type === 'image/jpeg' || type === 'image/jpg') return '.jpg'
  if (type === 'image/gif') return '.gif'
  if (type === 'image/webp') return '.webp'
  if (type === 'image/svg+xml') return '.svg'
  return '.bin'
}
