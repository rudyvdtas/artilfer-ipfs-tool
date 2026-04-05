import { json } from '@sveltejs/kit'
import { scan, analyzeScanStructure } from '$lib/server/ipfs/scanner.js'
import { resolve } from '$lib/server/ipfs/resolver.js'

/**
 * POST /api/ipfs/scan-debug
 *
 * ✅ Debug endpoint to scan a CID and analyze its structure.
 * Useful for identifying why items are missing from NFT collections.
 *
 * Request body:
 * {
 *   "cid": "Qmd4GTGvQw2HvfYactmEqw1rdiYeP2Ht3CitZeh1iXFnyw",
 *   "maxItems": 200  // Optional limit (default: full scan)
 * }
 *
 * Response:
 * {
 *   "scan": { nodes, metadata, summary },
 *   "analysis": { totalNodes, direct, external, htmlPages, missing, recommendation }
 * }
 */
export async function POST({ request }) {
  const contentType = request.headers.get('content-type') || ''
  
  if (!contentType.includes('application/json')) {
    return json({ error: 'Content-Type must be application/json' }, { status: 400 })
  }

  let body
  try {
    body = await request.json()
  } catch {
    return json({ error: 'Invalid JSON' }, { status: 400 })
  }

  const { cid: inputCid, maxItems = 2000 } = body

  if (!inputCid) {
    return json({ error: 'Missing required field: cid' }, { status: 400 })
  }

  // Validate CID format
  const resolved = resolve(inputCid)
  if (!resolved) {
    return json({ error: `Invalid CID format: ${inputCid}` }, { status: 400 })
  }

  try {
    // Perform scan with progress tracking
    const progressUpdates = []
    const scan_result = await scan(resolved.canonical, (progress) => {
      // Limit progress updates to avoid huge responses
      if (progressUpdates.length < 50) {
        progressUpdates.push(progress)
      }
    })

    // Analyze the structure for diagnostics
    const analysis = analyzeScanStructure(scan_result)

    // Extract detailed info about found items
    const nodes = Object.values(scan_result.nodes)
    const items = nodes
      .filter(n => {
        const pathSegments = n.path?.split('/').filter(Boolean) || []
        return pathSegments.length > 0 && /^\d+$/.test(pathSegments[0])
      })
      .map(n => ({
        itemId: parseInt(n.path?.split('/')[1] || '', 10),
        path: n.path,
        cid: n.cid,
        size: n.size,
        kind: n.kind,
        depth: n.depth,
      }))
      .sort((a, b) => a.itemId - b.itemId)

    const externalRefs = nodes
      .filter(n => n.cid?.startsWith('bafy') && n.path?.length < 10)
      .map(n => ({
        cid: n.cid.slice(0, 20) + '…',
        size: n.size,
        childrenCount: n.children.length,
      }))

    return json(
      {
        success: true,
        cid: resolved.cid,
        scan: {
          totalNodes: scan_result.nodes ? Object.keys(scan_result.nodes).length : 0,
          metadata: scan_result.metadata,
          summary: scan_result.summary,
          progressUpdates,
        },
        analysis,
        items: {
          count: items.length,
          found: items.slice(0, 20),
          missingRanges: analysis.missingDirectItems,
        },
        externalReferences: {
          count: externalRefs.length,
          examples: externalRefs.slice(0, 5),
        },
        recommendation:
          analysis.recommendation +
          (items.length > 0 ? ` Found ${items.length} direct items.` : ' No direct items found.'),
      },
      { status: 200 }
    )
  } catch (err) {
    return json(
      {
        success: false,
        error: err?.message || 'Scan failed',
        cid: resolved.cid,
      },
      { status: 500 }
    )
  }
}

/**
 * GET /api/ipfs/scan-debug?cid=Qm...
 * Quick endpoint for testing via browser/curl
 */
export async function GET({ url }) {
  const inputCid = url.searchParams.get('cid')

  if (!inputCid) {
    return json({
      error: 'Missing cid parameter',
      usage: '/api/ipfs/scan-debug?cid=Qmd4GTG...',
    }, { status: 400 })
  }

  // Delegate to POST handler
  const request = new Request('http://localhost/api/ipfs/scan-debug', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ cid: inputCid }),
  })

  return POST({ request, url })
}
