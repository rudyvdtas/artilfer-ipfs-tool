<script>
  import BatchSelector from '$lib/components/BatchSelector.svelte'
  import {
    saveWalletSession,
    loadWalletSession,
    saveBatchResult,
    clearWalletSession,
    relativeTime,
  } from '$lib/walletCache.js'

  // ─── State ───────────────────────────────────────────

  /** @type {'idle' | 'resolving' | 'fetching' | 'done' | 'scanning' | 'complete' | 'error'} */
  let step = 'idle'

  let input = ''
  let errorMsg = ''

  /** Resolved address + chain */
  let resolved = null   // { address, chain, displayName? }

  /** All NFTs found (IPFS info is stored per NFT) */
  let nfts = []
  let fetchDebug = []
  let showDebug = true
  let showItemDebug = false
  let totalCount = 0

  /** Selection */
  let selected = new Set()

  /** Scan job */
  let jobId = ''
  let progress = { current: 0, total: 0 }
  let scanResult = null
  let batchJobs = []
  let batchSummary = null
  let scanMode = 'single' // 'single' | 'batch'
  let onlyIpfs = false
  let batchRunning = false
  let batchQueue = []
  let batchProgress = { done: 0, total: 0 }
  let batchResults = []
  let batchError = ''

  // ─── Batch-selector state ──────────────────────────────
  /**
   * batches[] — de centrale datastructuur voor de BatchSelector.
   * Elke entry: { index, nftCount, status, jobId?, summary?, nftResults?, completedAt? }
   */
  let batches = []

  // ─── Sessie (localStorage) ─────────────────────────────
  /** Gevonden sessie uit localStorage (vóór de gebruiker kiest wat te doen) */
  let cachedSession = null
  /** Toont de "Doorgaan?" prompt */
  let showSessionPrompt = false

  // ─── Helpers ──────────────────────────────────────────

  /**
   * Convert any IPFS URI / CID to a loadable HTTPS gateway URL.
   * Prefers w3s.link (fast, no CORS issues), falls back to cloudflare.
   * Returns null for non-IPFS values so the placeholder shows.
   * @param {string|null|undefined} uri
   * @returns {string|null}
   */
  function ipfsToHttp(uri) {
    if (!uri || typeof uri !== 'string') return null
    const v = uri.trim()

    // Already a valid https URL — use as-is
    if (v.startsWith('https://')) return v
    if (v.startsWith('http://'))  return v

    // ipfs://CID or ipfs://CID/path
    if (v.startsWith('ipfs://')) {
      const rest = v.slice('ipfs://'.length)
      return `https://w3s.link/ipfs/${rest}`
    }

    // /ipfs/CID
    if (v.startsWith('/ipfs/')) {
      return `https://w3s.link${v}`
    }

    // Bare CID (Qm… or bafy…)
    if (/^(Qm[1-9A-HJ-NP-Za-km-z]{44}|bafy[a-z2-7]{20,})/.test(v)) {
      return `https://w3s.link/ipfs/${v}`
    }

    return null
  }

  function toggleNFT(id) {
    const next = new Set(selected)
    next.has(id) ? next.delete(id) : next.add(id)
    selected = next
  }

  function selectAll() {
    onlyIpfs = false
    selected = new Set(nfts.map((n) => n.id))
  }

  function selectOnlyIpfs() {
    onlyIpfs = true
    selected = new Set(nfts.filter((n) => n.hasIPFS).map((n) => n.id))
  }

  function toggleOnlyIpfs() {
    if (onlyIpfs) {
      onlyIpfs = false
      selected = new Set(nfts.map((n) => n.id))
    } else {
      selectOnlyIpfs()
    }
  }

  function selectNone() {
    selected = new Set()
  }

  function getBatchCount(total) {
    return total > 0 ? Math.ceil(total / 50) : 0
  }

  function getCurrentBatchLabel() {
    if (!batchRunning) return ''
    const totalBatches = batchQueue.length
    const currentBatch = Math.min(batchJobs.length + 1, totalBatches || 1)
    return `Batch ${currentBatch}/${totalBatches}`
  }

  function reset() {
    step = 'idle'
    input = ''
    errorMsg = ''
    resolved = null
    nfts = []
    totalCount = 0
    selected = new Set()
    jobId = ''
    progress = { current: 0, total: 0 }
    scanResult = null
    batchJobs = []
    batchSummary = null
    scanMode = 'single'
    batchRunning = false
    batchQueue = []
    batchProgress = { done: 0, total: 0 }
    batchResults = []
    batchError = ''
    onlyIpfs = false
    batches = []
    cachedSession = null
    showSessionPrompt = false
  }

  function formatBytes(bytes) {
    if (!bytes) return '0 B'
    if (bytes < 1024) return `${bytes} B`
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
  }

  /**
   * Collect all scan results regardless of single-job or multi-batch mode.
   * Single mode: scanResult.nfts (from status endpoint)
   * Batch mode:  batchResults (accumulated in-memory across all batches)
   * @param {number[]|null} batchIndices — filter op batch-indices (null = alles)
   * @returns {Array}
   */
  function getAllResults(batchIndices = null) {
    if (scanMode === 'batch') {
      if (batchIndices === null) return batchResults
      // Elk batchResult heeft een batchIndex eigenschap (toegevoegd in runBatchQueue)
      return batchResults.filter((r) => batchIndices.includes(r._batchIndex ?? -1))
    }
    return scanResult?.nfts ?? []
  }

  /**
   * Bouw een resultatenlijst op uit de batches-array (gecached of in-memory).
   * Wordt gebruikt door exportfuncties wanneer batchIndices opgegeven zijn.
   * @param {number[]} batchIndices
   * @returns {Array}
   */
  function getResultsFromBatches(batchIndices) {
    const results = []
    for (const idx of batchIndices) {
      const batch = batches.find((b) => b.index === idx)
      if (!batch || batch.status !== 'done') continue

      // In-memory resultaten hebben _batchIndex; gecachede hebben nftResults
      const inMemory = batchResults.filter((r) => r._batchIndex === idx)
      if (inMemory.length > 0) {
        results.push(...inMemory)
      } else if (batch.nftResults) {
        // Gecachede resultaten: converteer naar het formaat dat downloadManifest verwacht
        results.push(...batch.nftResults.map((r) => ({
          ...r,
          scan: r.scanNodes ? { nodes: r.scanNodes, summary: r.scanSummary } : null,
        })))
      }
    }
    return results
  }

  /**
   * Build and trigger a download from a string blob in the browser.
   * @param {string} content
   * @param {string} filename
   * @param {string} mimeType
   */
  function triggerDownload(content, filename, mimeType) {
    const blob = new Blob([content], { type: mimeType })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = filename
    a.click()
    URL.revokeObjectURL(url)
  }

  /**
   * Download manifest.json.
   * @param {number[]|null} batchIndices — null = alles, array = specifieke batches
   */
  function downloadManifest(batchIndices = null) {
    const results = batchIndices !== null
      ? getResultsFromBatches(batchIndices)
      : getAllResults()

    const isPartial = batchIndices !== null && batchIndices.length < batches.filter((b) => b.status === 'done').length

    const manifest = {
      exported: new Date().toISOString(),
      version: '1.0',
      generator: 'NFT Archive Assistant — ARTfilter',
      partial: isPartial,
      batchIndices: batchIndices ?? null,
      summary: {
        successful: results.filter((r) => r.status === 'success').length,
        failed:     results.filter((r) => r.status === 'error').length,
        totalFiles: results.reduce((s, r) => s + (r.scanSummary?.totalFiles ?? r.scan?.summary?.totalFiles ?? 0), 0),
        totalBytes: results.reduce((s, r) => s + (r.scanSummary?.totalBytes ?? r.scan?.summary?.totalBytes ?? 0), 0),
      },
      nfts: results
        .filter((r) => r.status === 'success')
        .map((r) => ({
          nftId: r.nftId,
          name: r.name,
          chain: r.chain,
          contract: r.contract,
          tokenId: r.tokenId,
          metadataCID: r.metadataCID,
          totalFiles: r.scanSummary?.totalFiles ?? r.scan?.summary?.totalFiles ?? 0,
          totalBytes: r.scanSummary?.totalBytes ?? r.scan?.summary?.totalBytes ?? 0,
        })),
    }
    const suffix = isPartial ? `-batches-${batchIndices.map((i) => i + 1).join('-')}` : ''
    triggerDownload(JSON.stringify(manifest, null, 2), `nft-manifest${suffix}.json`, 'application/json')
  }

  /**
   * Download ready2pin.csv.
   * @param {number[]|null} batchIndices — null = alles, array = specifieke batches
   */
  function downloadCSV(batchIndices = null) {
    const results = batchIndices !== null
      ? getResultsFromBatches(batchIndices)
      : getAllResults()

    const isPartial = batchIndices !== null && batchIndices.length < batches.filter((b) => b.status === 'done').length

    const escape = (v) => {
      const s = String(v ?? '')
      return /[,"\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s
    }

    // Pinata-compatible format: hash,name
    const rows = ['hash,name']
    const seen = new Set()

    for (const r of results) {
      if (r.status !== 'success') continue

      // Metadata CID — label with the NFT name
      if (r.metadataCID && !seen.has(r.metadataCID)) {
        seen.add(r.metadataCID)
        rows.push(`${r.metadataCID},${escape(r.name ?? '')}`)
      }

      // All child CIDs found during the scan
      // Ondersteun zowel scan.nodes (in-memory) als scanNodes (gecached)
      const nodes = r.scan?.nodes ?? r.scanNodes ?? {}
      for (const node of Object.values(nodes)) {
        if (!node.cid || node.error) continue
        if (seen.has(node.cid)) continue
        seen.add(node.cid)

        const name = resolveNodeNameClient(node)
        rows.push(`${node.cid},${escape(name)}`)
      }
    }

    const suffix = isPartial ? `-batches-${batchIndices.map((i) => i + 1).join('-')}` : ''
    triggerDownload(rows.join('\n'), `ready2pin${suffix}.csv`, 'text/csv')
  }

  /**
   * Derive a clean filename for a scan node (client-side mirror of server resolveNodeName).
   * @param {{ cid: string, name?: string, contentType?: string, kind?: string }} node
   * @returns {string}
   */
  function resolveNodeNameClient(node) {
    const contentType = String(node.contentType || '').toLowerCase()
    const ext = extensionFromContentTypeClient(contentType, node.kind)
    const baseName = (node.name || node.cid.slice(0, 16))
      .replace(/\.(json|txt|bin|html|htm)$/i, '')
      .toLowerCase()
    return ext ? `${baseName}${ext}` : baseName
  }

  /**
   * Map a MIME content-type to a file extension (client-side mirror).
   * @param {string} contentType
   * @param {string} [kind]
   * @returns {string}
   */
  function extensionFromContentTypeClient(contentType, kind) {
    if (contentType.includes('json'))           return '.json'
    if (contentType === 'image/png')            return '.png'
    if (contentType === 'image/jpeg' ||
        contentType === 'image/jpg')            return '.jpg'
    if (contentType === 'image/gif')            return '.gif'
    if (contentType === 'image/webp')           return '.webp'
    if (contentType === 'image/svg+xml')        return '.svg'
    if (contentType === 'image/avif')           return '.avif'
    if (contentType === 'video/mp4')            return '.mp4'
    if (contentType === 'video/webm')           return '.webm'
    if (contentType === 'video/quicktime')      return '.mov'
    if (contentType === 'audio/mpeg')           return '.mp3'
    if (contentType === 'audio/wav')            return '.wav'
    if (contentType === 'audio/ogg')            return '.ogg'
    if (contentType === 'audio/flac')           return '.flac'
    if (contentType === 'model/gltf+json')      return '.gltf'
    if (contentType === 'model/gltf-binary')    return '.glb'
    if (contentType.startsWith('text/html'))    return '.html'
    if (contentType.startsWith('text/'))        return '.txt'
    if (kind === 'json')   return '.json'
    if (kind === 'html')   return '.html'
    if (kind === 'text')   return '.txt'
    return ''
  }

  // ─── Search ───────────────────────────────────────────

  /**
   * Verrijk de ruwe NFT-array met gateway-URLs voor images.
   * @param {Array} rawNfts
   * @returns {Array}
   */
  function enrichNFTs(rawNfts) {
    return rawNfts.map((nft) => {
      const rawImage =
        nft.metadata?.displayUri ||
        nft.metadata?.thumbnailUri ||
        nft.metadata?.artifactUri ||
        nft.metadata?.image ||
        nft.image ||
        null

      const rawThumb =
        nft.metadata?.thumbnailUri ||
        nft.thumbnail ||
        nft.metadata?.displayUri ||
        nft.metadata?.image ||
        nft.image ||
        null

      return {
        ...nft,
        image: ipfsToHttp(rawImage),
        thumb: ipfsToHttp(rawThumb),
      }
    })
  }

  async function handleSearch() {
    const val = input.trim()
    if (!val) return

    // ── 1. Resolve het adres eerst (goedkoop) ──────────────
    step = 'resolving'
    errorMsg = ''
    cachedSession = null
    showSessionPrompt = false

    let resolvedData
    try {
      const resolveRes = await fetch('/api/nft/resolve', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ input: val }),
      })
      resolvedData = await resolveRes.json()
      if (!resolveRes.ok) throw new Error(resolvedData.error || 'Address resolution failed')
    } catch (err) {
      errorMsg = err.message
      step = 'error'
      return
    }

    resolved = resolvedData

    // ── 2. Check of er een sessie in localStorage staat ────
    const existing = loadWalletSession(resolved.address, resolved.chain)
    if (existing && existing.nfts?.length > 0) {
      cachedSession = existing
      showSessionPrompt = true
      step = 'done' // grid tonen zodra prompt geaccepteerd wordt
      return
    }

    // ── 3. Geen cache → vers ophalen ───────────────────────
    await fetchNFTsFromChain()
  }

  /**
   * Haal de NFT-lijst op van de blockchain en sla op in localStorage.
   */
  async function fetchNFTsFromChain() {
    step = 'fetching'
    errorMsg = ''
    nfts = []
    fetchDebug = []
    showItemDebug = false
    selected = new Set()
    totalCount = 0
    scanResult = null
    jobId = ''
    progress = { current: 0, total: 0 }
    batchJobs = []
    batchSummary = null
    batchRunning = false
    batchQueue = []
    batchProgress = { done: 0, total: 0 }
    batchResults = []
    batchError = ''
    batches = []

    try {
      const fetchRes = await fetch(
        `/api/nft/fetch?address=${encodeURIComponent(resolved.address)}&chain=${resolved.chain}`
      )
      const fetchData = await fetchRes.json()
      if (!fetchRes.ok) throw new Error(fetchData.error || 'Failed to fetch NFTs')

      totalCount = fetchData.totalCount
      fetchDebug = fetchData.debugLog || []
      nfts = enrichNFTs(fetchData.nfts)

      if (onlyIpfs) nfts = nfts.filter((n) => n.hasIPFS)
      selected = onlyIpfs ? new Set(nfts.filter((n) => n.hasIPFS).map((n) => n.id)) : new Set()

      // Sla op in localStorage (zonder images)
      saveWalletSession(resolved.address, resolved.chain, resolved.displayName ?? null, nfts, totalCount)

      step = 'done'
    } catch (err) {
      errorMsg = err.message
      step = 'error'
    }
  }

  /**
   * Ga verder met de gecachede sessie.
   * NFTs uit localStorage gebruiken, batch-resultaten herstellen.
   */
  function continueFromCache() {
    if (!cachedSession) return
    showSessionPrompt = false

    totalCount = cachedSession.totalCount
    nfts = enrichNFTs(cachedSession.nfts)
    fetchDebug = []
    selected = new Set()

    // Herstel batchresultaten uit de cache
    const savedBatches = cachedSession.batches ?? []
    if (savedBatches.length > 0) {
      scanMode = 'batch'

      // Herbouw de batchQueue op basis van de gecachede NFT-volgorde
      const allNFTs = nfts
      batchQueue = chunkArray(allNFTs, 50)

      // Herstel batchResults in-memory vanuit gecachede nftResults
      batchResults = []
      batches = batchQueue.map((chunk, i) => {
        const cached = savedBatches.find((b) => b.batchIndex === i)
        if (cached) {
          // Voeg _batchIndex toe aan elk resultaat voor filtering
          const results = cached.nftResults.map((r) => ({ ...r, _batchIndex: i }))
          batchResults.push(...results)
          return {
            index: i,
            nftCount: chunk.length,
            status: 'done',
            jobId: cached.jobId,
            completedAt: cached.completedAt,
            summary: cached.summary,
            nftResults: cached.nftResults,
          }
        }
        return { index: i, nftCount: chunk.length, status: 'pending' }
      })

      // Bouw scanResult opnieuw op als alle batches voltooid zijn
      const allDone = batches.every((b) => b.status === 'done')
      if (allDone && batchResults.length > 0) {
        scanResult = buildCombinedScanResult(batchResults)
        step = 'complete'
      } else {
        step = 'done'
      }
    } else {
      step = 'done'
    }
  }

  /**
   * Verwijder de cache en haal alles vers op.
   */
  async function rescanFresh() {
    showSessionPrompt = false
    cachedSession = null
    clearWalletSession(resolved.address, resolved.chain)
    await fetchNFTsFromChain()
  }

  /**
   * Bouw een gecombineerd scanResult object vanuit een resultaten-array.
   */
  function buildCombinedScanResult(results) {
    return {
      summary: {
        successful: results.filter((r) => r.status === 'success').length,
        failed:     results.filter((r) => r.status === 'error').length,
        totalFiles: results.reduce((s, r) => s + (r.scanSummary?.totalFiles ?? r.scan?.summary?.totalFiles ?? 0), 0),
        totalBytes: results.reduce((s, r) => s + (r.scanSummary?.totalBytes ?? r.scan?.summary?.totalBytes ?? 0), 0),
      },
      nfts: results,
    }
  }

  // ─── Scan ─────────────────────────────────────────────

  async function startScan() {
    if (selected.size === 0) {
      errorMsg = 'Select at least one NFT'
      return
    }

    const selectedNFTs = nfts.filter((n) => selected.has(n.id))

    // 50+ => automatisch in batches verdelen
    if (selectedNFTs.length > 50) {
      step = 'scanning'
      errorMsg = ''
      scanMode = 'batch'
      batchRunning = true
      batchJobs = []
      batchSummary = null

      // Bouw batchQueue — maar bewaar indices van bestaande done-batches
      const newQueue = chunkArray(selectedNFTs, 50)
      batchQueue = newQueue

      // Initialiseer batches array: bestaande done-batches behouden
      batches = newQueue.map((chunk, i) => {
        const existing = batches.find((b) => b.index === i && b.status === 'done')
        if (existing) return existing
        return { index: i, nftCount: chunk.length, status: 'pending' }
      })

      // Verwijder in-memory resultaten die NIET gecached zijn (fresh scan)
      batchResults = batchResults.filter((r) => {
        const idx = r._batchIndex
        return batches.find((b) => b.index === idx && b.status === 'done')
      })

      batchError = ''
      batchProgress = {
        done: batchResults.length,
        total: selectedNFTs.length,
      }
      await runBatchQueue()
      return
    }

    step = 'scanning'
    errorMsg = ''
    scanMode = 'single'
    progress = { current: 0, total: selected.size }
    scanResult = null

    try {
      const res = await fetch('/api/nft/scan-batch', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ nfts: selectedNFTs }),
      })

      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Scan starten mislukt')

      jobId = data.jobId
      await pollScan(jobId)
    } catch (err) {
      errorMsg = err.message
      step = 'error'
    }
  }

  /**
   * Scan alleen de geselecteerde batch-indices (vanuit BatchSelector).
   * @param {number[]} indices
   */
  async function scanSelectedBatches(indices) {
    if (indices.length === 0) return
    if (batchRunning) return

    step = 'scanning'
    scanMode = 'batch'
    batchRunning = true
    errorMsg = ''

    // Markeer geselecteerde batches als 'pending' voor herinloop
    batches = batches.map((b) =>
      indices.includes(b.index) && b.status === 'pending'
        ? { ...b, status: 'pending' }
        : b
    )

    try {
      for (const idx of indices) {
        const batch = batches.find((b) => b.index === idx)
        if (!batch || batch.status === 'done') continue // skip al voltooide

        const chunk = batchQueue[idx]
        if (!chunk) continue

        // Markeer als 'running'
        batches = batches.map((b) => b.index === idx ? { ...b, status: 'running' } : b)

        const res = await fetch('/api/nft/scan-batch', {
          method: 'POST',
          headers: { 'content-type': 'application/json' },
          body: JSON.stringify({ nfts: chunk }),
        })
        const data = await res.json()
        if (!res.ok) throw new Error(data.error || 'Batch scan starten mislukt')

        const jobIdLocal = data.jobId
        batchJobs = [...batchJobs, jobIdLocal]

        const result = await pollScanForBatch(jobIdLocal, chunk.length)
        const newNfts = result.nfts.map((r) => ({ ...r, _batchIndex: idx }))
        batchResults = [...batchResults.filter((r) => r._batchIndex !== idx), ...newNfts]

        // Sla op in localStorage
        if (resolved) {
          saveBatchResult(resolved.address, resolved.chain, idx, jobIdLocal, result.nfts, result.summary)
        }

        // Update batch status → done
        batches = batches.map((b) =>
          b.index === idx
            ? { ...b, status: 'done', jobId: jobIdLocal, completedAt: Date.now(), summary: result.summary, nftResults: result.nfts }
            : b
        )

        batchProgress = { done: batchResults.length, total: batchQueue.flat().length }
      }

      // Als alle batches klaar zijn → complete
      const allDone = batches.every((b) => b.status === 'done')
      scanResult = buildCombinedScanResult(batchResults)
      step = allDone ? 'complete' : 'done'
    } catch (err) {
      batchError = err.message
      errorMsg = err.message
      // Zet running batches terug op pending
      batches = batches.map((b) => b.status === 'running' ? { ...b, status: 'pending' } : b)
      step = 'done'
    } finally {
      batchRunning = false
    }
  }

  function chunkArray(items, size) {
    const chunks = []
    for (let i = 0; i < items.length; i += size) chunks.push(items.slice(i, i + size))
    return chunks
  }

  async function runBatchQueue() {
    try {
      for (let i = 0; i < batchQueue.length; i++) {
        // Skip batches die al 'done' zijn (vanuit cache of eerder gescand)
        const currentBatch = batches.find((b) => b.index === i)
        if (currentBatch?.status === 'done') {
          batchProgress = { done: batchProgress.done + batchQueue[i].length, total: batchProgress.total }
          continue
        }

        const chunk = batchQueue[i]

        // Markeer als 'running' in de batches array
        batches = batches.map((b) => b.index === i ? { ...b, status: 'running' } : b)

        const res = await fetch('/api/nft/scan-batch', {
          method: 'POST',
          headers: { 'content-type': 'application/json' },
          body: JSON.stringify({ nfts: chunk }),
        })

        const data = await res.json()
        if (!res.ok) throw new Error(data.error || 'Batch scan starten mislukt')

        const jobIdLocal = data.jobId
        batchJobs = [...batchJobs, jobIdLocal]

        const result = await pollScanForBatch(jobIdLocal, chunk.length)

        // Tag elk resultaat met zijn batch-index voor filtering
        const taggedNfts = result.nfts.map((r) => ({ ...r, _batchIndex: i }))
        batchResults = [...batchResults, ...taggedNfts]
        batchSummary = result.summary
        batchProgress = { done: batchProgress.done + chunk.length, total: batchProgress.total }

        // Sla batch-resultaat direct op in localStorage → gebruiker kan al exporteren!
        if (resolved) {
          saveBatchResult(resolved.address, resolved.chain, i, jobIdLocal, result.nfts, result.summary)
        }

        // Update batch status naar 'done' → BatchSelector kleurt hem groen
        batches = batches.map((b) =>
          b.index === i
            ? { ...b, status: 'done', jobId: jobIdLocal, completedAt: Date.now(), summary: result.summary, nftResults: result.nfts }
            : b
        )
      }

      scanResult = buildCombinedScanResult(batchResults)
      step = 'complete'
    } catch (err) {
      batchError = err.message
      errorMsg = err.message
      // Zet actieve batch terug op pending
      batches = batches.map((b) => b.status === 'running' ? { ...b, status: 'pending' } : b)
      step = 'done'
    } finally {
      batchRunning = false
    }
  }

  async function pollScan(id) {
    const MAX = 360  // max 6 min
    for (let i = 0; i < MAX; i++) {
      await new Promise((r) => setTimeout(r, 1500))

      let data
      try {
        const res = await fetch(`/api/nft/scan-batch/${id}/status`)
        data = await res.json()
        if (!res.ok) throw new Error(data.error)
      } catch (err) {
        errorMsg = err.message
        step = 'error'
        return
      }

      if (data.progress) progress = data.progress

      if (data.status === 'ready') {
        scanResult = data.result
        step = 'complete'
        return
      }

      if (data.status === 'failed' || data.status === 'error') {
        throw new Error(data.error || 'Scan gefaald')
      }
    }

    errorMsg = 'Scan time-out — probeer minder NFTs te selecteren'
    step = 'error'
  }

  async function pollScanForBatch(id, totalSelected) {
    const MAX = 360
    for (let i = 0; i < MAX; i++) {
      await new Promise((r) => setTimeout(r, 1500))
      const res = await fetch(`/api/nft/scan-batch/${id}/status`)
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Batch status mislukt')

      progress = data.progress || { current: 0, total: totalSelected }
      if (data.status === 'ready') return data.result
      if (data.status === 'failed' || data.status === 'error') {
        throw new Error(data.error || 'Batch scan gefaald')
      }
    }
    throw new Error('Batch scan time-out')
  }

  // ─── startScan wrapper voor BatchSelector ─────────────

  /**
   * Aangeroepen door BatchSelector wanneer de gebruiker specifieke
   * pending batches wil scannen.
   * @param {number[]} indices
   */
  function handleScanSelectedBatches(indices) {
    scanSelectedBatches(indices)
  }

  /**
   * Aangeroepen door BatchSelector voor JSON export van specifieke batches.
   * @param {number[]} indices
   */
  function handleExportJSON(indices) {
    downloadManifest(indices)
  }

  /**
   * Aangeroepen door BatchSelector voor CSV export van specifieke batches.
   * @param {number[]} indices
   */
  function handleExportCSV(indices) {
    downloadCSV(indices)
  }

  /**
   * Ga terug naar 'done' state zodat de gebruiker meer keuzes kan maken
   * en exporteren. Dit behoud alle bestaande scan resultaten.
   */
  function scanMore() {
    step = 'done'
  }

  // ─── Keyboard ─────────────────────────────────────────

  function onKeydown(e) {
    if (e.key === 'Enter' && (step === 'idle' || step === 'done' || step === 'error')) {
      handleSearch()
    }
  }
</script>

<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
<section class="checker" onkeydown={onKeydown} aria-label="NFT IPFS Checker">

  <!-- ── Header ──────────────────────────────────── -->
  <div class="checker-header">
    <div class="header-row">
      <h2>NFT Wallet Checker</h2>
      <span class="header-pill">IPFS archive view</span>
    </div>
    <p class="sub">Enter a wallet address, ENS, or Tezos domain to find and archive IPFS NFTs.</p>
  </div>

  <!-- ── Step 1: Zoeken ──────────────────────────── -->
  <div class="card">
    <div class="card-label">
      <span class="step-num">1</span>
      <span>Wallet address or domain</span>
      {#if step === 'done' || step === 'complete'}
        <button class="btn btn-ghost" onclick={reset}>Reset</button>
      {/if}
    </div>

    <div class="input-row">
      <input
        type="text"
        placeholder="0x…  |  name.eth  |  tz1…  |  name.tez"
        bind:value={input}
        class="text-input"
        class:is-error={!!errorMsg}
        disabled={step === 'resolving' || step === 'fetching' || step === 'scanning'}
        aria-label="Wallet address or domain"
      />
      <button
        class="btn btn-primary"
        onclick={handleSearch}
        disabled={!input.trim() || step === 'resolving' || step === 'fetching' || step === 'scanning'}
      >
        {#if step === 'resolving'}Resolving…
        {:else if step === 'fetching'}Loading…
        {:else}Search NFTs{/if}
      </button>
    </div>

    {#if errorMsg}
      <p class="error-msg">{errorMsg}</p>
    {/if}

    {#if step === 'idle'}
      <p class="hint">
        Supported formats: <code>0x…</code> (Ethereum), <code>tz1…</code> (Tezos),
        <code>name.eth</code> (ENS), <code>name.tez</code> (Tezos domain)
      </p>
    {/if}

    {#if resolved && (step === 'done' || step === 'scanning' || step === 'complete')}
      <div class="resolved-badge">
        <span class="chain-tag">{resolved.chain.toUpperCase()}</span>
        <code class="address">{resolved.address}</code>
        {#if resolved.displayName}
          <span class="display-name">← {resolved.displayName}</span>
        {/if}
      </div>
    {/if}
  </div>

  <!-- ── Sessie-prompt (localStorage cache gevonden) ── -->
  {#if showSessionPrompt && cachedSession}
    {@const doneBatchCount = (cachedSession.batches ?? []).length}
    {@const totalBatchCount = Math.ceil((cachedSession.nfts?.length ?? 0) / 50)}
    <div class="card session-prompt">
      <div class="session-prompt-header">
        <span class="session-icon">🗓</span>
        <div class="session-prompt-info">
          <strong>Sessie gevonden</strong>
          <span class="session-age">{relativeTime(cachedSession.savedAt)}</span>
        </div>
      </div>
      <p class="session-desc">
        {cachedSession.nfts?.length ?? 0} NFTs geladen
        {#if doneBatchCount > 0}
          · <span class="session-done">{doneBatchCount} van {totalBatchCount} batch{totalBatchCount === 1 ? '' : 'es'} al gescand</span>
        {:else}
          · nog geen scans uitgevoerd
        {/if}
      </p>
      <div class="session-actions">
        <button class="btn btn-primary" onclick={continueFromCache}>
          ▶ Doorgaan
        </button>
        <button class="btn btn-secondary" onclick={rescanFresh}>
          🔄 Opnieuw laden van blockchain
        </button>
      </div>
    </div>
  {/if}

  <!-- ── Step 2: NFT lijst ───────────────────────── -->
  {#if !showSessionPrompt && (step === 'done' || step === 'scanning' || step === 'complete')}
    <div class="card">
      <div class="card-label">
        <span class="step-num">2</span>
        <span>NFTs found</span>
        <span class="count-badge">{nfts.length} of {totalCount} total · {nfts.filter((n) => n.hasIPFS).length} with IPFS</span>
        <button class="btn btn-ghost btn-small" onclick={() => (showDebug = !showDebug)}>
        {showDebug ? 'Hide debug' : 'Show debug'}
        </button>
      </div>

      {#if nfts.length === 0}
        <p class="empty-msg">No NFTs found for this address.</p>
      {:else}

        <div class="selection-bar">
          <button class="btn btn-ghost btn-small" onclick={selectAll} class:active-filter={!onlyIpfs}>All</button>
          <button class="btn btn-ghost btn-small" onclick={selectNone}>None</button>
          <button class="btn btn-ghost btn-small" onclick={selectOnlyIpfs} class:active-filter={onlyIpfs}>
            Only IPFS
          </button>
          <span class="selection-count">{selected.size} selected</span>
        </div>

        {#if selected.size > 50}
          <div class="batch-label-row">
            <span class="batch-label">Batch scanning</span>
            <span class="batch-count">{getBatchCount(selected.size)} batches · max 50 per batch</span>
          </div>
        {/if}

        <div class="nft-grid">
          {#each nfts as nft (nft.id)}
            {@const isSelected = selected.has(nft.id)}
            {@const thumbSrc = nft.thumb || nft.image}
            <!-- svelte-ignore a11y_click_events_have_key_events -->
            <div
              class="nft-card"
              class:is-selected={isSelected}
              onclick={() => toggleNFT(nft.id)}
              role="checkbox"
              aria-checked={isSelected}
              tabindex="0"
              onkeydown={(e) => e.key === ' ' && toggleNFT(nft.id)}
            >
              <div class="nft-card-check">
                <div class="checkbox" class:checked={isSelected}></div>
              </div>

              {#if thumbSrc}
                <img
                  src={thumbSrc}
                  alt={nft.name}
                  class="nft-thumb"
                  loading="lazy"
                  onerror={(e) => {
                    const el = e.currentTarget
                    const src = el.src || ''
                    if (src.includes('w3s.link')) {
                      el.src = src.replace('https://w3s.link/ipfs/', 'https://cloudflare-ipfs.com/ipfs/')
                    } else if (src.includes('cloudflare-ipfs.com')) {
                      el.src = src.replace('https://cloudflare-ipfs.com/ipfs/', 'https://ipfs.io/ipfs/')
                    } else {
                      el.style.display = 'none'
                    }
                  }}
                />
              {:else}
                <div class="nft-thumb nft-thumb-placeholder">
                  <span>📄</span>
                </div>
              {/if}

              <div class="nft-info">
                <p class="nft-name">{nft.name}</p>
                <span class="chain-tag chain-tag-sm">{nft.chain}</span>
                <p class="nft-cids">
                  {#if nft.hasIPFS}
                    {nft.ipfsCIDs?.length ?? 0} CID{nft.ipfsCIDs?.length === 1 ? '' : 's'}
                  {:else}
                    No IPFS
                  {/if}
                </p>
              </div>
            </div>
          {/each}
        </div>

        {#if step === 'done' && batches.length === 0}
          <!-- Eerste scan: nog geen batches aangemaakt -->
          <button
            class="btn btn-primary btn-full"
            onclick={startScan}
            disabled={selected.size === 0}
          >
            📊 Scan {selected.size} NFT{selected.size === 1 ? '' : 's'}
          </button>
          {#if selected.size > 50}
            <p class="hint batch-hint">
              This selection is automatically split into batches of 50 and processed sequentially.
              Je kunt voltooide batches al downloaden terwijl de rest nog bezig is.
            </p>
          {/if}
        {:else if step === 'done' && batches.length > 0 && batches.some((b) => b.status === 'pending')}
          <!-- Herstart-modus: er zijn nog pending batches -->
          <button
            class="btn btn-primary btn-full"
            onclick={startScan}
            disabled={batchRunning || selected.size === 0}
          >
            ▶ Scan resterende {batches.filter((b) => b.status === 'pending').length} batch{batches.filter((b) => b.status === 'pending').length === 1 ? '' : 'es'}
          </button>
        {/if}
      {/if}

      {#if showDebug}
        <div class="debug-box">
          <div class="debug-title">Fetch debug</div>
          <div class="debug-actions">
            <button class="btn btn-ghost btn-small" onclick={() => (showItemDebug = !showItemDebug)}>
              {showItemDebug ? 'Hide item debug' : 'Show item debug'}
            </button>
          </div>
          {#if fetchDebug?.length}
            {#each fetchDebug as item}
              <pre class="debug-line">{JSON.stringify(item, null, 2)}</pre>
            {/each}
          {/if}
          {#if showItemDebug}
            <pre class="debug-line">{JSON.stringify(nfts.slice(0, 5).map((n) => ({ id: n.id, tokenURI: n.tokenURI, contractTokenURI: n.contractTokenURI, metadataCID: n.metadataCID, ipfsSource: n.ipfsSource, hasIPFS: n.hasIPFS, debug: n.debug })), null, 2)}</pre>
          {/if}
        </div>
      {/if}
    </div>
  {/if}

  <!-- ── Step 3: Scan voortgang ─────────────────── -->
  {#if step === 'scanning'}
    <div class="card">
      <div class="card-label">
        <span class="step-num">3</span>
        <span>Scanning…</span>
        {#if scanMode === 'batch'}
          <span class="count-badge">
            {batches.filter((b) => b.status === 'done').length} / {batches.length} batches klaar
          </span>
        {/if}
      </div>

      <div class="progress-block">
        <div class="progress-bar-track">
          <div
            class="progress-bar-fill"
            style:width="{scanMode === 'batch'
              ? (batchProgress.total > 0 ? Math.min(100, (batchProgress.done / batchProgress.total) * 100) : 0)
              : (progress.total > 0 ? (progress.current / progress.total) * 100 : 0)}%"
          ></div>
        </div>
        <p class="progress-label">
          {#if scanMode === 'batch'}
            {batchProgress.done} / {batchProgress.total} NFTs verwerkt
            {#if batches.filter((b) => b.status === 'done').length > 0}
              · Voltooide batches zijn al downloadbaar ↓
            {/if}
          {:else}
            {progress.current} / {progress.total} NFTs gescand
          {/if}
        </p>
      </div>
    </div>
  {/if}

  <!-- ── Batch selector (zichtbaar zodra er ≥1 batch bestaat) ── -->
  {#if !showSessionPrompt && scanMode === 'batch' && batches.length > 0}
    <div class="card">
      <div class="card-label">
        <span class="step-num">3</span>
        <span>Batches</span>
        {#if batchRunning}
          <span class="scanning-indicator">bezig…</span>
        {/if}
      </div>
      <p class="hint">
        Voltooide batches (groen) zijn direct downloadbaar. Selecteer batches om te exporteren of opnieuw te scannen.
      </p>
      <BatchSelector
        {batches}
        {batchRunning}
        activeBatchIndex={batches.findIndex((b) => b.status === 'running')}
        onScanSelected={handleScanSelectedBatches}
        onExportJSON={handleExportJSON}
        onExportCSV={handleExportCSV}
      />
    </div>
  {/if}

  <!-- ── Step 4: Resultaat + Export (enkelvoudige scan of alles klaar) ── -->
  {#if step === 'complete' && scanResult && scanMode === 'single'}
    <div class="card">
      <div class="card-label">
        <span class="step-num">4</span>
        <span>Scan complete</span>
      </div>

      <!-- Summary stats -->
      <div class="stats-row">
        <div class="stat">
          <strong>{scanResult.summary?.successful ?? 0}</strong>
          <span>Successful</span>
        </div>
        <div class="stat">
          <strong>{scanResult.summary?.failed ?? 0}</strong>
          <span>Failed</span>
        </div>
        <div class="stat">
          <strong>{scanResult.summary?.totalFiles ?? 0}</strong>
          <span>Files</span>
        </div>
        <div class="stat">
          <strong>{formatBytes(scanResult.summary?.totalBytes)}</strong>
          <span>Total</span>
        </div>
      </div>

      <!-- Per-NFT results -->
      {#if scanResult.nfts?.length > 0}
        <div class="result-list">
          {#each scanResult.nfts as r}
            <div class="result-row" class:result-ok={r.status === 'success'} class:result-err={r.status === 'error'} class:result-skip={r.status === 'skipped'}>
              <span class="result-icon">
                {r.status === 'success' ? '✅' : r.status === 'error' ? '❌' : '⏭'}
              </span>
              <span class="result-name">{r.name || r.nftId}</span>
              {#if r.scanSummary}
                <span class="result-meta">{r.scanSummary.totalFiles} bestanden</span>
              {/if}
              {#if r.error}
                <span class="result-error">{r.error}</span>
              {/if}
              {#if r.status === 'success' && r.metadataCID}
                <span class="result-meta">CID: {r.metadataCID}</span>
              {/if}
            </div>
          {/each}
        </div>
      {/if}

      <!-- Export buttons -->
      <div class="export-row">
        <button class="btn btn-secondary" onclick={() => downloadManifest(null)}>
          📄 manifest.json
        </button>
        <button class="btn btn-secondary" onclick={() => downloadCSV(null)}>
          📋 ready2pin.csv
        </button>
      </div>

      <!-- Scan More button -->
      <button class="btn btn-ghost btn-scan-more" onclick={scanMore}>
        🔄 Scan More
      </button>
    </div>
  {/if}

</section>

<style>
  /* ── Layout ─────────────────────────────────── */

  .checker {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  .checker-header {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  .header-row {
    display: flex;
    align-items: center;
    gap: 10px;
    flex-wrap: wrap;
  }

  .checker-header h2 {
    font-size: 1.1rem;
    font-weight: 700;
    margin: 0;
    color: #0f172a;
  }

  .header-pill {
    font-size: 0.68rem;
    font-weight: 700;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: #8a4f14;
    background: #fff3df;
    border: 1px solid rgba(240, 161, 74, 0.35);
    border-radius: 999px;
    padding: 3px 8px;
  }

  .sub {
    font-size: 0.85rem;
    color: #64748b;
    margin: 0;
    line-height: 1.5;
  }

  /* ── Card ────────────────────────────────────── */

  .card {
    background: rgba(255, 255, 255, 0.85);
    border: 2px solid var(--border);
    border-radius: var(--radius-md);
    padding: 24px;
    backdrop-filter: blur(12px);
    box-shadow: var(--card-shadow);
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  .card-label {
    display: flex;
    align-items: center;
    gap: 10px;
    font-weight: 600;
    font-size: 0.95rem;
    color: #0f172a;
  }

  .step-num {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 26px;
    height: 26px;
    border-radius: 50%;
    background: #1b140e;
    color: #fff4e6;
    font-size: 0.75rem;
    font-weight: 700;
    flex-shrink: 0;
  }

  .count-badge {
    margin-left: auto;
    font-size: 0.78rem;
    color: #64748b;
    font-weight: 400;
  }

  /* ── Input ───────────────────────────────────── */

  .input-row {
    display: flex;
    gap: 10px;
  }

  .text-input {
    flex: 1;
    padding: 12px 16px;
    border: 2px solid var(--border);
    border-radius: 12px;
    font-family: var(--mono, monospace);
    font-size: 0.88rem;
    background: #fff8eb;
    color: #1b140e;
    transition: border-color 0.15s, transform 0.12s;
    min-width: 0;
  }

  .text-input:focus {
    outline: none;
    border-color: var(--border-accent);
  }

  .text-input.is-error {
    border-color: #ef4444;
  }

  .text-input:disabled {
    opacity: 0.5;
  }

  .hint {
    font-size: 0.78rem;
    color: #94a3b8;
    margin: 0;
    line-height: 1.5;
  }

  .hint code {
    font-family: var(--mono, monospace);
    background: rgba(148, 163, 184, 0.12);
    padding: 0.1em 0.35em;
    border-radius: 4px;
    font-size: 0.85em;
  }

  .error-msg {
    color: #ef4444;
    font-size: 0.85rem;
    margin: 0;
    white-space: pre-line;
  }

  /* ── Resolved badge ──────────────────────────── */

  .resolved-badge {
    display: flex;
    align-items: center;
    gap: 8px;
    flex-wrap: wrap;
    padding: 8px 12px;
    background: rgba(15, 23, 42, 0.04);
    border-radius: 10px;
  }

  .chain-tag {
    font-size: 0.7rem;
    font-weight: 700;
    letter-spacing: 0.06em;
    padding: 3px 8px;
    border-radius: 6px;
    background: #0f172a;
    color: white;
    flex-shrink: 0;
  }

  .chain-tag-sm {
    font-size: 0.65rem;
    padding: 2px 6px;
  }

  .address {
    font-family: var(--font-mono, monospace);
    font-size: 0.78rem;
    color: #475569;
    word-break: break-all;
  }

  .display-name {
    font-size: 0.78rem;
    color: #94a3b8;
  }

  /* ── Selection bar ───────────────────────────── */

  .selection-bar {
    display: flex;
    align-items: center;
    gap: 6px;
  }

  .selection-count {
    margin-left: auto;
    font-size: 0.8rem;
    color: #64748b;
  }

  .batch-label-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 10px;
    padding: 8px 12px;
    background: rgba(15, 23, 42, 0.04);
    border-radius: 10px;
  }

  .batch-label {
    font-size: 0.78rem;
    font-weight: 700;
    color: #0f172a;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  .batch-count {
    font-size: 0.76rem;
    color: #64748b;
  }

  .batch-overview {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .batch-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 10px;
    padding: 10px 12px;
    border-radius: 12px;
    background: rgba(248, 250, 252, 0.8);
    border: 1px solid rgba(148, 163, 184, 0.16);
    font-size: 0.8rem;
  }

  .batch-item.done {
    border-color: rgba(34, 197, 94, 0.25);
    background: rgba(34, 197, 94, 0.05);
  }

  .batch-item.active {
    border-color: rgba(15, 23, 42, 0.25);
    background: rgba(15, 23, 42, 0.05);
  }

  .batch-item-title {
    font-weight: 700;
    color: #0f172a;
  }

  .batch-item-count,
  .batch-item-status {
    color: #64748b;
    white-space: nowrap;
  }

  /* ── NFT grid ────────────────────────────────── */

  .nft-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
    gap: 10px;
    max-height: 420px;
    overflow-y: auto;
    padding-right: 4px;
  }

  .nft-card {
    position: relative;
    border: 2px solid rgba(148, 163, 184, 0.16);
    border-radius: 14px;
    padding: 10px;
    cursor: pointer;
    transition: border-color 0.15s, background 0.15s, transform 0.1s;
    background: rgba(248, 250, 252, 0.8);
    display: flex;
    flex-direction: column;
    gap: 8px;
    user-select: none;
  }

  .nft-card:hover {
    border-color: rgba(15, 23, 42, 0.25);
    transform: translateY(-1px);
  }

  .nft-card.is-selected {
    border-color: #1b140e;
    background: rgba(15, 23, 42, 0.04);
  }

  .nft-card-check {
    position: absolute;
    top: 8px;
    right: 8px;
  }

  .checkbox {
    width: 18px;
    height: 18px;
    border: 1.5px solid rgba(148, 163, 184, 0.5);
    border-radius: 5px;
    background: white;
    transition: background 0.15s, border-color 0.15s;
  }

  .checkbox.checked {
    background: #1b140e;
    border-color: #1b140e;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 10 8' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 4l3 3 5-6' stroke='white' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-position: center;
    background-size: 10px;
  }

  .nft-thumb {
    width: 100%;
    aspect-ratio: 1;
    object-fit: cover;
    border-radius: 8px;
    background: #f1f5f9;
  }

  .nft-thumb-placeholder {
    display: flex;
    align-items: center;
    justify-content: center;
    background: #f1f5f9;
    border-radius: 8px;
    font-size: 1.5rem;
  }

  .nft-info {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  .nft-name {
    font-size: 0.8rem;
    font-weight: 600;
    color: #0f172a;
    margin: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .nft-cids {
    font-size: 0.7rem;
    color: #94a3b8;
    margin: 0;
  }

  .empty-msg {
    font-size: 0.88rem;
    color: #64748b;
    margin: 0;
  }

  .debug-box {
    padding: 10px 12px;
    border-radius: 12px;
    background: rgba(15, 23, 42, 0.04);
    border: 1px solid rgba(148, 163, 184, 0.14);
  }

  .debug-title {
    font-size: 0.78rem;
    font-weight: 700;
    margin-bottom: 8px;
    color: #0f172a;
  }

  .debug-actions {
    display: flex;
    gap: 8px;
    margin-bottom: 8px;
  }

  .debug-line {
    margin: 0 0 8px;
    font-size: 0.72rem;
    white-space: pre-wrap;
    color: #475569;
  }

  /* ── Progress ────────────────────────────────── */

  .progress-block {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .progress-bar-track {
    height: 6px;
    background: rgba(148, 163, 184, 0.2);
    border-radius: 999px;
    overflow: hidden;
  }

  .progress-bar-fill {
    height: 100%;
    background: #1b140e;
    border-radius: 999px;
    transition: width 0.4s ease;
  }

  .progress-label {
    font-size: 0.82rem;
    color: #64748b;
    margin: 0;
    font-family: var(--font-mono, monospace);
  }

  /* ── Stats ───────────────────────────────────── */

  .stats-row {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 10px;
  }

  .stat {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 10px;
    background: rgba(248, 250, 252, 0.9);
    border-radius: 10px;
    border: 1px solid rgba(148, 163, 184, 0.15);
    gap: 2px;
  }

  .stat strong {
    font-size: 1.1rem;
    font-weight: 700;
    color: #0f172a;
  }

  .stat span {
    font-size: 0.7rem;
    color: #94a3b8;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  /* ── Result list ─────────────────────────────── */

  .result-list {
    display: flex;
    flex-direction: column;
    gap: 6px;
    max-height: 240px;
    overflow-y: auto;
  }

  .result-row {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 8px 12px;
    border-radius: 10px;
    font-size: 0.82rem;
    background: rgba(248, 250, 252, 0.7);
    border: 1px solid transparent;
  }

  .result-ok { border-color: rgba(34, 197, 94, 0.2); }
  .result-err { border-color: rgba(239, 68, 68, 0.2); }
  .result-skip { border-color: rgba(148, 163, 184, 0.2); opacity: 0.6; }

  .result-icon { flex-shrink: 0; }

  .result-name {
    flex: 1;
    font-weight: 500;
    color: #0f172a;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .result-meta {
    font-size: 0.75rem;
    color: #94a3b8;
    white-space: nowrap;
  }

  .result-error {
    font-size: 0.75rem;
    color: #ef4444;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  /* ── Sessie-prompt ──────────────────────────── */

  .session-prompt {
    border-color: rgba(59, 130, 246, 0.3) !important;
    background: rgba(239, 246, 255, 0.9) !important;
  }

  .session-prompt-header {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .session-icon {
    font-size: 1.4rem;
    flex-shrink: 0;
  }

  .session-prompt-info {
    display: flex;
    flex-direction: column;
    gap: 2px;
  }

  .session-prompt-info strong {
    font-size: 0.9rem;
    color: #0f172a;
  }

  .session-age {
    font-size: 0.76rem;
    color: #64748b;
  }

  .session-desc {
    font-size: 0.84rem;
    color: #475569;
    margin: 0;
    line-height: 1.5;
  }

  .session-done {
    color: #16a34a;
    font-weight: 600;
  }

  .session-actions {
    display: flex;
    gap: 10px;
    flex-wrap: wrap;
  }

  /* ── Scanning indicator ──────────────────────── */

  .scanning-indicator {
    font-size: 0.72rem;
    font-weight: 600;
    color: #3b82f6;
    background: rgba(59, 130, 246, 0.08);
    border: 1px solid rgba(59, 130, 246, 0.25);
    border-radius: 999px;
    padding: 2px 8px;
    margin-left: auto;
    animation: blink 1.2s ease-in-out infinite;
  }

  @keyframes blink {
    0%, 100% { opacity: 1; }
    50%       { opacity: 0.45; }
  }

  /* ── Export ──────────────────────────────────── */

  .export-row {
    display: flex;
    gap: 10px;
  }

  .export-row .btn {
    flex: 1;
    text-align: center;
    text-decoration: none;
  }

  /* ── Buttons ─────────────────────────────────── */

  .btn {
    border: none;
    border-radius: 999px;
    padding: 10px 18px;
    font-weight: 600;
    font-size: 0.85rem;
    cursor: pointer;
    transition: transform 0.1s, opacity 0.1s;
    white-space: nowrap;
    flex-shrink: 0;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 6px;
  }

  .btn:hover:not(:disabled) { transform: translateY(-1px); }
  .btn:disabled { opacity: 0.45; cursor: not-allowed; transform: none; }

  .btn-primary {
    background: #1b140e;
    color: white;
    box-shadow: 0 8px 24px rgba(15, 23, 42, 0.18);
  }

  .btn-secondary {
    background: rgba(226, 232, 240, 0.9);
    color: #0f172a;
  }

  .btn-ghost {
    background: transparent;
    color: #64748b;
    padding: 6px 12px;
    font-size: 0.78rem;
  }

  .btn-ghost:hover:not(:disabled) { color: #1b140e; transform: none; }

  .btn-ghost.active-filter {
    color: #1b140e;
    background: #fff3df;
    border: 1px solid rgba(240, 161, 74, 0.35);
  }

  .btn-small { font-size: 0.75rem; padding: 5px 12px; }

  .btn-full { width: 100%; }

  .btn-scan-more {
    width: 100%;
    margin-top: 8px;
    background: rgba(34, 197, 94, 0.08);
    color: #16a34a;
    border: 1px solid rgba(34, 197, 94, 0.25);
    font-size: 0.82rem;
  }

  .btn-scan-more:hover:not(:disabled) {
    background: rgba(34, 197, 94, 0.15);
    color: #15803d;
  }

  /* ── Responsive ──────────────────────────────── */

  @media (max-width: 480px) {
    .input-row { flex-direction: column; }
    .btn-primary { width: 100%; }
    .stats-row { grid-template-columns: repeat(2, 1fr); }
    .nft-grid {
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 8px;
    }
    .nft-card {
      padding: 6px;
      border-radius: 12px;
      gap: 6px;
    }
    .nft-card-check {
      top: 6px;
      right: 6px;
    }
    .checkbox {
      width: 15px;
      height: 15px;
      border-radius: 4px;
    }
    .nft-thumb {
      aspect-ratio: 1;
      border-radius: 7px;
    }
    .nft-thumb-placeholder {
      font-size: 1.15rem;
    }
    .nft-info {
      gap: 2px;
    }
    .nft-name {
      font-size: 0.7rem;
    }
    .nft-cids {
      font-size: 0.62rem;
      line-height: 1.2;
    }
    .chain-tag-sm {
      font-size: 0.58rem;
      padding: 1px 5px;
    }
    .export-row { flex-direction: column; }
  }
</style>
