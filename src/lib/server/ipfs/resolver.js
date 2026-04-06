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

// ✅ Increased timeout for large directory listings (100+ items can be 500KB+ each)
// Gateway response time varies; use 12s to allow for slow networks
const FETCH_TIMEOUT_MS = 12_000
const MAX_TEXT_LENGTH = 2 * 1024 * 1024  // 2MB (was 256KB) to handle large directory HTML

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
    // Strip trailing empty segment caused by a trailing slash (e.g. ipfs://Qm…/)
    const meaningful = pathParts.filter((p, i) => i < pathParts.length - 1 || p !== '')
    const path = meaningful.length ? `/${meaningful.join('/')}` : ''
    return { cid, path, canonical: `ipfs://${cid}${path}` }
  }

  // URL with /ipfs/ in path (e.g. https://ipfs.io/ipfs/Qm…/)
  if (cleaned.includes('/ipfs/')) {
    // Strip query string before parsing (e.g. ?filename=0)
    const withoutQuery = cleaned.split('?')[0]
    const after = withoutQuery.slice(withoutQuery.indexOf('/ipfs/') + '/ipfs/'.length)
    const [cidPart, ...pathParts] = after.split('/')
    const cid = parseCid(cidPart)
    if (!cid) return null
    // Strip trailing empty segment caused by a trailing slash
    const meaningful = pathParts.filter((p, i) => i < pathParts.length - 1 || p !== '')
    const path = meaningful.length ? `/${meaningful.join('/')}` : ''
    return { cid, path, canonical: `ipfs://${cid}${path}` }
  }

  // Bare CID or CID/path
  const [cidPart, ...pathParts] = cleaned.split('/')
  const cid = parseCid(cidPart)
  if (!cid) return null
  // Strip trailing empty segment caused by a trailing slash
  const meaningful = pathParts.filter((p, i) => i < pathParts.length - 1 || p !== '')
  const path = meaningful.length ? `/${meaningful.join('/')}` : ''
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

// ── HTML Directory Listing Parser ──

/**
 * Extract IPFS CIDs from an HTML IPFS gateway directory listing.
 * Handles both `/ipfs/Qm…` href links and raw CID patterns in the page.
 * ✅ Enhanced to catch nested structures like /name/bafy… links in directory pages.
 * @param {string} html
 * @returns {Array<{ cid: string, path: string, canonical: string }>}
 */
export function extractLinksFromHtml(html) {
  if (!html || typeof html !== 'string') return []

  const found = new Map()

  function addRef(raw) {
    const ref = resolve(raw)
    if (ref && !found.has(ref.canonical)) found.set(ref.canonical, ref)
  }

  // 1. Extract href="/ipfs/CID" or href="/ipfs/CID/path" attributes
  //    Skip ?filename=… query-string-only variants (they point to the same CID via a different URL)
  const hrefPattern = /href=["']([^"']*\/ipfs\/[^"']+)["']/gi
  for (const match of html.matchAll(hrefPattern)) {
    const href = match[1].split('?')[0]  // strip ?filename=… query params
    addRef(href)
  }

  // 2. Extract bare /ipfs/CID occurrences (e.g. in <a href=…> without quotes)
  const slashIpfsPattern = /\/ipfs\/(Qm[1-9A-HJ-NP-Za-km-z]{44}|bafy[a-z0-9]{20,})[^\s"'<>`]*/gi
  for (const match of html.matchAll(slashIpfsPattern)) {
    addRef(match[0])
  }

  // 3. ✅ Extract nested paths with CIDs: /name/bafy… (e.g. /181/bafy…)
  //    This handles NFT collections where items are stored under numeric paths
  //    that reference external IPFS v1 hashes
  const nestedPathPattern = /\/([0-9a-zA-Z_-]+)\/(bafy[a-z0-9]{20,}|Qm[1-9A-HJ-NP-Za-km-z]{44})[^\s"'<>`]*/gi
  for (const match of html.matchAll(nestedPathPattern)) {
    addRef(`/ipfs/${match[2]}/${match[1]}`)
  }

  // 4. Extract ipfs:// URIs embedded in the page source
  const ipfsUriPattern = /ipfs:\/\/[^\s"'<>`]+/gi
  for (const match of html.matchAll(ipfsUriPattern)) {
    addRef(match[0])
  }

  // 5. ✅ Extract standalone CIDs (Qm… and bafy…) from directory listing pages
  //    Some directory pages may list CIDs directly in links or data attributes
  const standalonePattern = /(Qm[1-9A-HJ-NP-Za-km-z]{44}|bafy[a-z0-9]{20,})(?![a-zA-Z0-9])/g
  for (const match of html.matchAll(standalonePattern)) {
    const cid = match[1]
    // Only add if it looks like it's in a link context (not in random text)
    const idx = match.index
    const before = html.substring(Math.max(0, idx - 50), idx).toLowerCase()
    const after = html.substring(idx, Math.min(html.length, idx + 100)).toLowerCase()
    
    if (/(href|ipfs|link|cid|hash|url|src)/.test(before) || 
        /[\/\s"'>]/.test(after) ||
        /<a[^>]*href/.test(before + after)) {
      addRef(cid)
    }
  }

  return [...found.values()]
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
 * ✅ Enhanced for NFT collections with many external references.
 * @param {any} input
 * @param {{ maxRefs?: number, maxDepth?: number }} [opts]
 * @returns {Array<{ cid: string, path: string, canonical: string }>}
 */
export function discoverRefs(input, opts = {}) {
  const { maxRefs = 500, maxDepth = 8 } = opts
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
 * ✅ Enhanced for NFT collections with many nested references.
 * @param {object} json
 * @returns {Array<{ cid: string, path: string, canonical: string }>}
 */
export function discoverAsyncNftRefs(json) {
  if (!json || typeof json !== 'object') return []

  // ✅ Check if this is an array/list structure (common in NFT roots with many items)
  const isArray = Array.isArray(json)
  const isAsync = isArray ||
    json.tokenType === 'master' ||
    json['async-attributes'] || json.async_attributes ||
    Array.isArray(json?.layout?.layers) ||
    // ✅ Also detect when JSON has numeric keys (directory listing pattern)
    /^\d+$/.test(Object.keys(json || {})[0] || '')

  if (!isAsync) return []

  const found = new Map()

  function addRef(raw) {
    if (!raw) return
    const ref = resolve(raw)
    if (ref && !found.has(ref.canonical)) found.set(ref.canonical, ref)
  }

  // ✅ If this is an array or numeric-keyed object, scan all items
  if (isArray || /^\d+$/.test(Object.keys(json || {})[0] || '')) {
    const items = isArray ? json : Object.values(json)
    for (const item of items) {
      if (typeof item === 'string') {
        addRef(item)
      } else if (item && typeof item === 'object') {
        // Scan item for any IPFS references
        for (const ref of discoverRefs(item, { maxRefs: 500, maxDepth: 6 })) {
          if (!found.has(ref.canonical)) found.set(ref.canonical, ref)
        }
      }
    }
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
 * Extract all IPFS references from a fetched result (text, JSON, or HTML directory listing).
 * Handles standard metadata, async NFT metadata, and IPFS gateway HTML directory pages.
 * ✅ Enhanced for large NFT collections with many external references (100+ items).
 * @param {{ json?: any, text?: string, contentType?: string }} fetched
 * @returns {Array<{ cid: string, path: string, canonical: string }>}
 */
export function discoverAllRefs(fetched) {
  if (!fetched) return []

  const merged = new Map()

  function addAll(refs) {
    for (const ref of refs) {
      if (!merged.has(ref.canonical)) merged.set(ref.canonical, ref)
    }
  }

  if (fetched.json) {
    // Standard key-based discovery (increased limits for NFT collections)
    addAll(discoverRefs(fetched.json, { maxRefs: 500, maxDepth: 8 }))
    // Async NFT-specific discovery
    addAll(discoverAsyncNftRefs(fetched.json))
    return [...merged.values()]
  }

  if (fetched.text) {
    const contentType = String(fetched.contentType || '').toLowerCase()
    const isHtml = contentType.includes('html') || fetched.text.trimStart().startsWith('<')

    if (isHtml) {
      // HTML directory listing: parse <a href="/ipfs/…"> links first
      // Increased slice to catch more links in large directory pages (500KB)
      addAll(extractLinksFromHtml(fetched.text.slice(0, 1_000_000)))
    }

    // Also run generic regex scan on the raw text regardless (catches edge cases)
    // Increased maxRefs for NFT collections with many items
    addAll(discoverRefs(fetched.text.slice(0, 500_000), { maxRefs: 500, maxDepth: 1 }))

    return [...merged.values()]
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

/**
 * Map a MIME content-type to a file extension.
 * Shared by exporter.js, export-builder.js, and the Svelte components.
 * Returns empty string for unknown types.
 *
 * @param {string} contentType
 * @param {string} [kind]
 * @returns {string}
 */
export function extensionFromContentType(contentType, kind) {
  const ct = String(contentType || '').toLowerCase()
  if (ct.includes('json'))            return '.json'
  if (ct === 'image/png')             return '.png'
  if (ct === 'image/jpeg' ||
      ct === 'image/jpg')             return '.jpg'
  if (ct === 'image/gif')             return '.gif'
  if (ct === 'image/webp')            return '.webp'
  if (ct === 'image/svg+xml')         return '.svg'
  if (ct === 'image/avif')            return '.avif'
  if (ct === 'video/mp4')             return '.mp4'
  if (ct === 'video/webm')            return '.webm'
  if (ct === 'video/quicktime')       return '.mov'
  if (ct === 'audio/mpeg')            return '.mp3'
  if (ct === 'audio/wav')             return '.wav'
  if (ct === 'audio/ogg')             return '.ogg'
  if (ct === 'audio/flac')            return '.flac'
  if (ct === 'model/gltf+json')       return '.gltf'
  if (ct === 'model/gltf-binary')     return '.glb'
  if (ct.startsWith('text/html'))     return '.html'
  if (ct.startsWith('text/'))         return '.txt'
  if (kind === 'json')   return '.json'
  if (kind === 'html')   return '.html'
  if (kind === 'text')   return '.txt'
  return ''
}

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
  const trimmed = String(text || '').trim()

  if (type.includes('html') || trimmed.startsWith('<')) return 'html'
  if (type.startsWith('image/') || type.startsWith('video/') || type.startsWith('audio/') || type.startsWith('model/')) return 'binary'
  if (type.includes('json') || trimmed.startsWith('{') || trimmed.startsWith('[')) return 'json'
  if (type.startsWith('text/')) return 'text'
  if (trimmed.length) return 'text'
  return 'binary'
}

export function guessExtension(contentType, kind, nameHint) {
  if (nameHint?.includes('.')) return ''  // already has extension
  const type = String(contentType || '').toLowerCase()
  if (kind === 'json') return '.json'
  if (kind === 'html') return '.html'
  if (type === 'image/png') return '.png'
  if (type === 'image/jpeg' || type === 'image/jpg') return '.jpg'
  if (type === 'image/gif') return '.gif'
  if (type === 'image/webp') return '.webp'
  if (type === 'image/svg+xml') return '.svg'
  if (type === 'video/mp4') return '.mp4'
  if (type === 'video/webm') return '.webm'
  if (type === 'video/quicktime') return '.mov'
  if (type === 'audio/mpeg') return '.mp3'
  if (type === 'audio/wav') return '.wav'
  if (type === 'audio/ogg') return '.ogg'
  if (type === 'audio/flac') return '.flac'
  if (type === 'model/gltf+json') return '.gltf'
  if (type === 'model/gltf-binary') return '.glb'
  if (kind === 'text') return '.txt'
  return '.bin'
}
