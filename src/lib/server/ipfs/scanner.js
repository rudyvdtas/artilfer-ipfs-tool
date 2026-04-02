/**
 * scanner.js — Recursive IPFS CID scanner with Merkle tree building
 *
 * Consolidates: workflow.js, summarize.js
 * BFS queue approach, builds parent→child tree, extracts metadata.
 *
 * ✅ PHASE 1-5 OPTIMIZATIONS:
 * - Phase 1: Gateway parallelization in fetchCid() (Promise.race)
 * - Phase 2: Request deduplication with fetchWithDedup()
 * - Phase 4: Concurrency limiting with fetchSemaphore (max 5 concurrent)
 * - Phase 5: Kubo health checks (conditional gateway inclusion)
 */

import { resolve, fetchCid, discoverAllRefs, extractMetadata, guessKind, guessExtension, safeFilename } from './resolver.js'
import { fetchWithDedup } from './request-cache.js'
import { fetchSemaphore } from './concurrency.js'

/**
 * @typedef {{
 *   cid: string,
 *   path: string,
 *   canonical: string,
 *   name: string,
 *   kind: string,
 *   contentType: string,
 *   size: number,
 *   bytes?: Buffer,
 *   text?: string,
 *   json?: any,
 *   url?: string,
 *   children: string[],
 *   depth: number,
 *   error?: string,
 * }} ScanNode
 */

/**
 * @typedef {{
 *   rootCid: string,
 *   nodes: Record<string, ScanNode>,
 *   metadata: { title: string, artists: string, description: string, image: string|null },
 *   summary: {
 *     totalFiles: number,
 *     totalBytes: number,
 *     filesByKind: Record<string, number>,
 *     errors: number,
 *   },
 * }} ScanResult
 */

const MAX_NODES = 500
const MAX_DEPTH = 10

/**
 * Scan an IPFS CID recursively (BFS), building a Merkle tree.
 *
 * @param {string} input - CID, IPFS URI, or gateway URL
 * @param {(progress: {current: number, total: number}) => void} [onProgress]
 * @returns {Promise<ScanResult>}
 */
export async function scan(input, onProgress) {
  const rootRef = resolve(input)
  if (!rootRef) throw new Error(`Cannot resolve input: ${input}`)

  const { cid: rootCid } = rootRef

  /** @type {Record<string, ScanNode>} */
  const nodes = {}

  // BFS queue: each entry is { cid, path, parentCid, depth }
  const queue = [{ cid: rootRef.cid, path: rootRef.path, parentCid: null, depth: 0 }]
  const seen = new Set()
  seen.add(rootRef.canonical)

  let processed = 0

  while (queue.length > 0 && processed < MAX_NODES) {
    const { cid, path, parentCid, depth } = queue.shift()

    processed++
    onProgress?.({ current: processed, total: Math.max(processed, queue.length + processed) })

    // ✅ Phase 2 + 4: Dedup + concurrency-limited fetch
    const fetched = await fetchSemaphore.run(() =>
      fetchWithDedup(cid, path, fetchCid)
    )

    const canonical = `ipfs://${cid}${path}`
    const name = path ? path.split('/').filter(Boolean).pop() || cid : cid
    const kind = guessKind(fetched.contentType, fetched.text, fetched.json)
    const ext = guessExtension(fetched.contentType, kind, name)
    const safeName = safeFilename(`${name}${ext}`)

    /** @type {ScanNode} */
    const node = {
      cid,
      path,
      canonical,
      name: safeName,
      kind,
      contentType: fetched.contentType || '',
      size: fetched.bytes?.length ?? 0,
      bytes: fetched.bytes,
      text: fetched.text,
      json: fetched.json,
      url: fetched.url,
      children: [],
      depth,
      error: fetched.ok ? undefined : (fetched.error || 'fetch failed'),
    }

    nodes[canonical] = node

    // Register as child of parent
    if (parentCid) {
      const parentNode = nodes[parentCid]
      if (parentNode && !parentNode.children.includes(canonical)) {
        parentNode.children.push(canonical)
      }
    }

    // Discover children if fetch succeeded and not too deep
    if (fetched.ok && depth < MAX_DEPTH) {
      const refs = discoverAllRefs(fetched)
      for (const ref of refs) {
        if (!seen.has(ref.canonical)) {
          seen.add(ref.canonical)
          queue.push({
            cid: ref.cid,
            path: ref.path,
            parentCid: canonical,
            depth: depth + 1,
          })
        }
      }
    }
  }

  // Extract metadata from root node
  const rootNode = nodes[`ipfs://${rootCid}${rootRef.path}`]
  const metadata = extractMetadata(rootNode?.json ?? null)

  // Build summary
  const allNodes = Object.values(nodes)
  const filesByKind = {}
  let totalBytes = 0
  let errors = 0

  for (const node of allNodes) {
    filesByKind[node.kind] = (filesByKind[node.kind] || 0) + 1
    totalBytes += node.size
    if (node.error) errors++
  }

  return {
    rootCid,
    nodes,
    metadata,
    summary: {
      totalFiles: allNodes.length,
      totalBytes,
      filesByKind,
      errors,
    },
  }
}

/**
 * Serialize scan result for disk storage (strip raw bytes to save space).
 * The full result (with bytes) stays in memory cache for export.
 *
 * @param {ScanResult} result
 * @returns {object}
 */
export function serializeForStorage(result) {
  const nodes = {}
  for (const [key, node] of Object.entries(result.nodes)) {
    nodes[key] = {
      cid: node.cid,
      path: node.path,
      canonical: node.canonical,
      name: node.name,
      kind: node.kind,
      contentType: node.contentType,
      size: node.size,
      url: node.url,
      children: node.children,
      depth: node.depth,
      error: node.error,
      // ⚠️ bytes, text, json intentionally omitted
    }
  }

  return {
    rootCid: result.rootCid,
    nodes,
    metadata: result.metadata,
    summary: result.summary,
  }
}

