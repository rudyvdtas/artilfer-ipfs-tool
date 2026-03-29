import { canonicalizeReference } from './reference.js'

const DEFAULT_KEY_WHITELIST = ['uri', 'cid', 'CID', 'link', 'href', 'tokenURI', 'tokenUri', 'url', 'reference', 'image', 'imageUrl', 'animation_url', 'async-attributes', 'async_attributes', 'external_url', 'preview_media_file', 'preview_media_file_type', 'properties', 'states', 'options', 'attributes', 'layout', 'layers', 'description', 'name', 'title', 'type', 'image_url', 'media', 'image_data']
const DEFAULT_MAX_REFS = 100
const DEBUG_DISCOVERY = process.env.DISCOVERY_DEBUG === '1'
const debugLog = (...args) => {
  if (DEBUG_DISCOVERY) console.log('[discovery]', ...args)
}
const DEFAULT_MAX_DEPTH = 8

function extractRefsFromText(text) {
  const refs = new Map()
  const patterns = [
    /ipfs:\/\/[^\s"'<>`]+/gi,
    /https?:\/\/[^\s"'<>`]+\/ipfs\/[^\s"'<>`]+/gi,
    /(?:bafy[a-z0-9]{20,}|Qm[1-9A-HJ-NP-Za-km-z]{44})(?:\/[^\s"'<>`]+)?/g,
  ]

  for (const pattern of patterns) {
    for (const match of text.matchAll(pattern)) {
      const reference = canonicalizeReference(match[0])
      if (reference) refs.set(reference.canonical, reference)
    }
  }

  return [...refs.values()]
}

export function discoverReferences(input, options = {}) {
  const {
    maxRefs = DEFAULT_MAX_REFS,
    maxDepth = DEFAULT_MAX_DEPTH,
    keyWhitelist = DEFAULT_KEY_WHITELIST,
  } = options

  const refs = new Map()
  const visited = new WeakSet()
  const keyHits = new Map()
  let nodeCount = 0
  let objectCount = 0
  let arrayCount = 0

  function addReference(raw, source = 'unknown') {
    if (refs.size >= maxRefs) return
    const reference = canonicalizeReference(raw)
    if (reference) {
      refs.set(reference.canonical, reference)
      const current = keyHits.get(source) || 0
      keyHits.set(source, current + 1)
    }
  }

  function walk(node, depth = 0) {
    if (refs.size >= maxRefs || nodeCount >= 3000 || depth > maxDepth) return

    if (typeof node === 'string') {
      for (const reference of extractRefsFromText(node)) {
        refs.set(reference.canonical, reference)
        if (refs.size >= maxRefs) break
      }
      return
    }

    if (Array.isArray(node)) {
      nodeCount += 1
      arrayCount += 1
      for (const child of node) walk(child, depth + 1)
      return
    }

    if (node && typeof node === 'object') {
      if (visited.has(node)) return
      visited.add(node)
      nodeCount += 1
      objectCount += 1

      for (const [key, child] of Object.entries(node)) {
        const lowerKey = key.toLowerCase()
        const isReferenceLikeKey = keyWhitelist.includes(key) || keyWhitelist.includes(lowerKey)
        if (DEBUG_DISCOVERY) debugLog('visit-key', { depth, key, lowerKey, type: Array.isArray(child) ? 'array' : typeof child, referenceLike: isReferenceLikeKey })

        if (typeof child === 'string') {
          if (isReferenceLikeKey) {
            debugLog('reference-like-string', { depth, key, value: child })
            addReference(child, key)
          }
          if (/(ipfs|Qm|bafy)/i.test(child)) {
            debugLog('text-candidate', { depth, key, value: child })
          }
          const extracted = extractRefsFromText(child)
          if (extracted.length > 0) debugLog('text-refs-found', { depth, key, count: extracted.length })
          for (const reference of extracted) {
            refs.set(reference.canonical, reference)
            if (refs.size >= maxRefs) break
          }
          continue
        }

        if (Array.isArray(child) || (child && typeof child === 'object')) {
          if (key === 'states' || key === 'options' || key === 'layout' || key === 'layers') {
            debugLog('enter-branch', { depth, key, type: Array.isArray(child) ? 'array' : 'object' })
          }
          walk(child, depth + 1)
        }

        if (refs.size >= maxRefs || nodeCount >= 3000) return
      }
    }
  }

  walk(input, 0)
  debugLog('summary', {
    refsFound: refs.size,
    nodeCount,
    objectCount,
    arrayCount,
    keyHits: Object.fromEntries(keyHits.entries()),
  })
  return [...refs.values()]
}
