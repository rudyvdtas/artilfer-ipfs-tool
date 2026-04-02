/**
 * scanner.js — Recursive IPFS CID scanner with Merkle tree building
 *
 * Consolidates: workflow.js, summarize.js
 * BFS queue approach, builds parent→child tree, extracts metadata.
 */

import { resolve, fetchCid, discoverAllRefs, extractMetadata, guessKind, guessExtension, safeFilename } from './resolver.js'

const MAX_ITEMS = 2000
const MAX_ITERATIONS = 500
const MAX_DISCOVERED_PER_ITEM = 25      // default cap per item
const MAX_DISCOVERED_ROOT = 1000        // no effective cap for root Async Art JSON
// const MAX_ARCHIVE_BYTES = 256 * 1024  // REMOVED: was blocking large files from CAR export

/**
 * @typedef {Object} TreeNode
 * @property {number} id
 * @property {number|null} parentId
 * @property {number} depth
 * @property {string} cid
 * @property {string} path
 * @property {string} canonical
 * @property {string} kind - json | text | html | binary
 * @property {string} contentType
 * @property {string} name
 * @property {number|null} size
 * @property {string} status - ok | error
 * @property {string} notes
 * @property {number[]} children - child node ids
 */

/**
 * @typedef {Object} ScanResult
 * @property {string} rootCid
 * @property {{ title: string, artists: string, description: string, image: string|null }} metadata
 * @property {TreeNode[]} tree
 * @property {{ path: string, cid: string, bytes: Uint8Array }[]} archiveFiles
 * @property {{ totalFiles: number, totalSize: number, successCount: number, failCount: number }} summary
 * @property {Record<string,string>} asyncLabelMap  CID → human-readable label for Async Art
 */

/**
 * Build CID → label map from an Async Art master JSON.
 * Returns {} for non-async NFTs.
 * @param {any} json
 * @param {string} projectName
 * @returns {Record<string, string>}
 */
function buildAsyncLabelMap(json, projectName) {
  const map = {}
  if (!json || typeof json !== 'object') return map

  const isAsync = json.tokenType === 'master' ||
    json['async-attributes'] || json.async_attributes ||
    Array.isArray(json?.layout?.layers)
  if (!isAsync) return map

  // Root metadata CID is set by caller
  const imageCid = typeof json.image === 'string' ? json.image.replace(/^ipfs:\/\//, '').split('/')[0] : null
  if (imageCid) map[imageCid] = `${projectName} — Main image`

  const layers = json?.layout?.layers
  if (!Array.isArray(layers)) return map

  layers.forEach((layer, li) => {
    const layerLabel = layer?.label || layer?.name || layer?.title || `Layer ${li + 1}`
    const options = layer?.states?.options
    if (!Array.isArray(options)) return
    options.forEach((opt, vi) => {
      const raw = opt?.uri || opt?.cid || opt?.link || opt?.href
      if (!raw) return
      const cid = String(raw).replace(/^ipfs:\/\//, '').split('/')[0]
      if (!cid) return
      const variantLabel = opt?.label || opt?.name || opt?.title || `Variant ${vi + 1}`
      map[cid] = `${projectName} — ${layerLabel} — ${variantLabel}`
    })
  })

  return map
}

/**
 * Scan an IPFS CID recursively: fetch content, discover nested references,
 * build a Merkle tree, extract metadata.
 *
 * @param {string} inputCid - Raw CID or IPFS URL from user
 * @param {(progress: { current: number, total: number, status: string }) => void} [onProgress]
 * @returns {Promise<ScanResult>}
 */
export async function scan(inputCid, onProgress) {
  const root = resolve(inputCid)
  if (!root) throw new Error(`Invalid CID or IPFS link: ${inputCid}`)

  const rootCid = root.cid
  /** @type {TreeNode[]} */
  const tree = []
  /** @type {{ path: string, cid: string, bytes: Uint8Array }[]} */
  const archiveFiles = []
  const seen = new Set()
  let metadata = { title: '', artists: '', description: '', image: null }
  let metadataFound = false
  /** @type {Record<string, string>} */
  let asyncLabelMap = {}

  // BFS queue: { ref, parentId, depth }
  const queue = [{ ref: root, parentId: null, depth: 0 }]
  let iterations = 0

  while (queue.length > 0 && tree.length < MAX_ITEMS) {
    iterations++
    if (iterations > MAX_ITERATIONS) {
      break
    }

    const { ref, parentId, depth } = queue.shift()

    if (seen.has(ref.canonical)) continue
    seen.add(ref.canonical)

    onProgress?.({
      current: tree.length,
      total: tree.length + queue.length,
      status: 'scanning',
    })

    // Fetch this CID
    const fetched = await fetchCid(ref.cid, ref.path)

    const id = tree.length + 1
    const nameHint = deriveNameHint(fetched, ref, id)
    const kind = fetched.ok ? guessKind(fetched.contentType, fetched.text, fetched.json) : 'binary'
    const ext = guessExtension(fetched.contentType, kind, nameHint)
    const name = nameHint + ext

    /** @type {TreeNode} */
    const node = {
      id,
      parentId,
      depth,
      cid: ref.cid,
      path: ref.path,
      canonical: ref.canonical,
      kind,
      contentType: fetched.contentType || '',
      name,
      size: fetched.bytes?.length ?? null,
      status: fetched.ok ? 'ok' : 'error',
      notes: fetched.ok ? '' : (fetched.error || 'Fetch failed'),
      children: [],
    }

    tree.push(node)

    // Update parent's children list
    if (parentId !== null) {
      const parent = tree.find(n => n.id === parentId)
      if (parent) parent.children.push(id)
    }

    // Extract metadata from first successful JSON
    if (!metadataFound && fetched.ok && fetched.json) {
      const m = extractMetadata(fetched.json)
      if (m.title || m.artists || m.description) {
        metadata = m
        metadataFound = true
      }
      // Build async-art label map from root JSON and annotate root CID
      const labelMap = buildAsyncLabelMap(fetched.json, metadata.title || rootCid.slice(0, 12))
      if (Object.keys(labelMap).length > 0) {
        asyncLabelMap = labelMap
        asyncLabelMap[rootCid] = `${metadata.title || rootCid.slice(0, 12)} — Token URI metadata`
      }
    }

    // Store ALL files for archive (no size limit — let exporter handle streaming)
    if (fetched.ok && fetched.bytes) {
      archiveFiles.push({
        path: name,
        cid: ref.cid,
        bytes: fetched.bytes,
      })
    }

    // Discover nested references
    if (fetched.ok) {
      const refs = discoverAllRefs(fetched)
      // Root-level Async Art JSON can have 100+ layer refs — don't cap it
      const cap = depth === 0 ? MAX_DISCOVERED_ROOT : MAX_DISCOVERED_PER_ITEM
      const uniqueRefs = []

      for (const discovered of refs.slice(0, cap)) {
        if (!seen.has(discovered.canonical) && !uniqueRefs.some(r => r.canonical === discovered.canonical)) {
          uniqueRefs.push(discovered)
        }
      }

      if (uniqueRefs.length > 0) {
        node.notes = `${uniqueRefs.length} nested reference(s)`
      }

      for (const discovered of uniqueRefs) {
        queue.push({ ref: discovered, parentId: id, depth: depth + 1 })
      }
    }
  }

  const successCount = tree.filter(n => n.status === 'ok').length
  const failCount = tree.filter(n => n.status !== 'ok').length
  const totalSize = tree.reduce((sum, n) => sum + (n.size || 0), 0)

  onProgress?.({
    current: tree.length,
    total: tree.length,
    status: 'done',
  })

  return {
    rootCid,
    metadata,
    tree,
    archiveFiles,
    asyncLabelMap,
    summary: {
      totalFiles: tree.length,
      totalSize,
      successCount,
      failCount,
    },
  }
}

function deriveNameHint(fetched, ref, index) {
  // Try to get name from URL path
  if (fetched?.url) {
    try {
      const base = new URL(fetched.url).pathname.split('/').pop()
      if (base && base !== ref.cid) return base
    } catch { /* ignore */ }
  }

  // Try to get name from IPFS path
  if (ref.path) {
    const parts = ref.path.split('/')
    const last = parts[parts.length - 1]
    if (last) return last
  }

  return `item-${String(index).padStart(4, '0')}`
}

/**
 * Serialize scan result for disk storage (preserve bytes as base64).
 * @param {ScanResult} result
 * @returns {object}
 */
export function serializeForStorage(result) {
  return {
    rootCid: result.rootCid,
    metadata: result.metadata,
    tree: result.tree,
    asyncLabelMap: result.asyncLabelMap || {},
    archiveFiles: result.archiveFiles.map(f => ({
      path: f.path,
      cid: f.cid,
      size: f.bytes?.length || 0,
      // ✅ NEW: Store bytes as base64 for later retrieval
      bytes: f.bytes 
        ? Buffer.from(f.bytes).toString('base64')
        : null,
    })),
    summary: result.summary,
  }
}
