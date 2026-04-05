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

// ✅ Increased limits for large NFT collections with many external references
// NFT root CIDs often contain 100+ items and use external CIDs (bafybeigXXX) 
// for items 2-9, 12-99, 112-181 which adds significant depth
const MAX_NODES = 2000
const MAX_DEPTH = 15

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
        // Skip self-references: a directory listing always contains a link back to itself
        if (ref.cid === rootCid && ref.path === '') continue
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

/**
 * ✅ Diagnostic analyzer for NFT collection structure.
 * Detects if the collection has external references (bafy… hashes) that point to
 * items stored outside the root directory (e.g. items 2-9, 12-99, 112-181).
 * 
 * Helps identify scanning issues where external references were missed.
 *
 * @param {ScanResult} result
 * @returns {object} Diagnostic report
 */
export function analyzeScanStructure(result) {
  const nodes = Object.values(result.nodes)
  
  // Count items by type
  const direct = nodes.filter(n => /^\d+$/.test(n.path?.split('/').filter(Boolean).pop() || ''))
  const external = nodes.filter(n => n.cid?.startsWith('bafy') && n.depth <= 2)
  const html = nodes.filter(n => n.kind === 'html')
  
  // Analyze missing ranges
  const directNumbers = new Set(direct.map(n => parseInt(n.path?.split('/').pop() || '', 10)))
  const missingNumbers = []
  const maxNum = Math.max(...directNumbers, 0)
  
  for (let i = 0; i <= maxNum; i++) {
    if (!directNumbers.has(i)) missingNumbers.push(i)
  }
  
  return {
    totalNodes: nodes.length,
    direct: { count: direct.length, examples: direct.slice(0, 3).map(n => n.name) },
    external: { count: external.length, examples: external.slice(0, 3).map(n => n.cid?.slice(0, 16)) },
    htmlPages: { count: html.length, totalSize: html.reduce((s, n) => s + n.size, 0) },
    missingDirectItems: missingNumbers.length > 0 ? missingNumbers.slice(0, 20) : [],
    likelyExternalRefs: external.length > 0 && html.length > 0,
    recommendation: missingNumbers.length > 0 
      ? `Missing items detected (${missingNumbers.length} gaps). Check if external references (bafy…) were properly followed.`
      : 'All direct items appear to be present.',
  }
}

