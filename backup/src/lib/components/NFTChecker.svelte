<script>
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

  function toggleOnlyIpfs() {
    onlyIpfs = !onlyIpfs
    selected = onlyIpfs ? new Set(nfts.filter((n) => n.hasIPFS).map((n) => n.id)) : new Set(nfts.map((n) => n.id))
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
  }

  function formatBytes(bytes) {
    if (!bytes) return '0 B'
    if (bytes < 1024) return `${bytes} B`
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
  }

  // ─── Search ───────────────────────────────────────────

  async function handleSearch() {
    const val = input.trim()
    if (!val) return

    step = 'resolving'
    errorMsg = ''
    resolved = null
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

    try {
      // 1. Resolve address/ENS/TEZ
      const resolveRes = await fetch('/api/nft/resolve', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ input: val }),
      })

      const resolveData = await resolveRes.json()
      if (!resolveRes.ok) throw new Error(resolveData.error || 'Adres-resolutie mislukt')

      resolved = resolveData
      step = 'fetching'

      // 2. Fetch NFTs
      const fetchRes = await fetch(
        `/api/nft/fetch?address=${encodeURIComponent(resolved.address)}&chain=${resolved.chain}`
      )
      const fetchData = await fetchRes.json()
      if (!fetchRes.ok) throw new Error(fetchData.error || 'NFT ophalen mislukt')

      totalCount = fetchData.totalCount
      nfts = fetchData.nfts
      fetchDebug = fetchData.debugLog || []
      if (onlyIpfs) nfts = nfts.filter((n) => n.hasIPFS)
      selected = onlyIpfs ? new Set(nfts.filter((n) => n.hasIPFS).map((n) => n.id)) : new Set()


      nfts = nfts.map((nft) => {
        // Best display image (web-sized): prefer displayUri > thumbnailUri > artifactUri > image
        const rawImage =
          nft.metadata?.displayUri ||
          nft.metadata?.thumbnailUri ||
          nft.metadata?.artifactUri ||
          nft.metadata?.image ||
          nft.image ||
          null

        // Best thumbnail (smallest): prefer thumbnailUri > displayUri > image
        const rawThumb =
          nft.metadata?.thumbnailUri ||
          nft.thumbnail ||
          nft.metadata?.displayUri ||
          nft.metadata?.image ||
          nft.image ||
          null

        return {
          ...nft,
          image:    ipfsToHttp(rawImage),
          thumb:    ipfsToHttp(rawThumb),
        }
      })

      step = 'done'
    } catch (err) {
      errorMsg = err.message
      step = 'error'
    }
  }

  // ─── Scan ─────────────────────────────────────────────

  async function startScan() {
    if (selected.size === 0) {
      errorMsg = 'Selecteer minimaal één NFT'
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
      batchQueue = chunkArray(selectedNFTs, 50)
      batchResults = []
      batchError = ''
      batchProgress = { done: 0, total: selectedNFTs.length }
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

  function chunkArray(items, size) {
    const chunks = []
    for (let i = 0; i < items.length; i += size) chunks.push(items.slice(i, i + size))
    return chunks
  }

  async function runBatchQueue() {
    try {
      for (let i = 0; i < batchQueue.length; i++) {
        const chunk = batchQueue[i]
        const res = await fetch('/api/nft/scan-batch', {
          method: 'POST',
          headers: { 'content-type': 'application/json' },
          body: JSON.stringify({ nfts: chunk }),
        })

        const data = await res.json()
        if (!res.ok) throw new Error(data.error || 'Batch scan starten mislukt')

        batchJobs = [...batchJobs, data.jobId]
        const result = await pollScanForBatch(data.jobId, chunk.length)
        batchResults = [...batchResults, ...result.results]
        batchSummary = result.summary
        batchProgress = { done: Math.min(selected.size, batchProgress.done + chunk.length), total: selected.size }
      }

      // Create a combined result view for the UI.
      scanResult = {
        summary: {
          successful: batchResults.filter((r) => r.status === 'success').length,
          failed: batchResults.filter((r) => r.status === 'error').length,
          totalFiles: batchResults.reduce((sum, r) => sum + (r.scan?.summary?.totalFiles || 0), 0),
          totalBytes: batchResults.reduce((sum, r) => sum + (r.scan?.summary?.totalBytes || 0), 0),
        },
        nfts: batchResults,
      }
      step = 'complete'
    } catch (err) {
      batchError = err.message
      errorMsg = err.message
      step = 'error'
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
    <h2>NFT Wallet Checker</h2>
    <p class="sub">Voer een wallet-adres, ENS- of TEZ-domein in om IPFS NFTs te vinden en te archiveren.</p>
  </div>

  <!-- ── Step 1: Zoeken ──────────────────────────── -->
  <div class="card">
    <div class="card-label">
      <span class="step-num">1</span>
      <span>Wallet adres of domein</span>
      {#if step === 'done' || step === 'complete'}
        <button class="btn btn-ghost" onclick={reset}>Opnieuw</button>
      {/if}
    </div>

    <div class="input-row">
      <input
        type="text"
        placeholder="0x…  |  naam.eth  |  tz1…  |  naam.tez"
        bind:value={input}
        class="text-input"
        class:is-error={!!errorMsg}
        disabled={step === 'resolving' || step === 'fetching' || step === 'scanning'}
        aria-label="Wallet adres of domein"
      />
      <button
        class="btn btn-primary"
        onclick={handleSearch}
        disabled={!input.trim() || step === 'resolving' || step === 'fetching' || step === 'scanning'}
      >
        {#if step === 'resolving'}Opzoeken…
        {:else if step === 'fetching'}Laden…
        {:else}Zoek NFTs{/if}
      </button>
    </div>

    {#if errorMsg}
      <p class="error-msg">{errorMsg}</p>
    {/if}

    {#if step === 'idle'}
      <p class="hint">
        Ondersteunde formaten: <code>0x…</code> (Ethereum), <code>tz1…</code> (Tezos),
        <code>naam.eth</code> (ENS), <code>naam.tez</code> (TEZ domein)
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

  <!-- ── Step 2: NFT lijst ───────────────────────── -->
  {#if step === 'done' || step === 'scanning' || step === 'complete'}
    <div class="card">
      <div class="card-label">
        <span class="step-num">2</span>
        <span>NFTs gevonden</span>
        <span class="count-badge">{nfts.length} van {totalCount} totaal · {nfts.filter((n) => n.hasIPFS).length} met IPFS</span>
        <button class="btn btn-ghost btn-small" onclick={() => (showDebug = !showDebug)}>
          {showDebug ? 'Debug verbergen' : 'Debug tonen'}
        </button>
      </div>

      {#if nfts.length === 0}
      <p class="empty-msg">
        Geen NFTs gevonden voor dit adres.
      </p>
      {:else}

        <div class="selection-bar">
          <button class="btn btn-ghost btn-small" onclick={selectAll} class:active-filter={!onlyIpfs}>Alles</button>
          <button class="btn btn-ghost btn-small" onclick={selectNone}>Geen</button>
          <button class="btn btn-ghost btn-small" onclick={toggleOnlyIpfs} class:active-filter={onlyIpfs}>
            {onlyIpfs ? 'Alle NFTs' : 'Only IPFS'}
          </button>
          <span class="selection-count">{selected.size} geselecteerd</span>
        </div>

        {#if selected.size > 50}
          <div class="batch-label-row">
            <span class="batch-label">Scan in batches</span>
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
                    // Gateway fallback chain: w3s.link → cloudflare → ipfs.io → hide
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
                    Geen IPFS
                  {/if}
                </p>
              </div>
            </div>
          {/each}
        </div>

        {#if step === 'done'}
          <button
            class="btn btn-primary btn-full"
            onclick={startScan}
            disabled={selected.size === 0}
          >
            📊 Scan {selected.size} NFT{selected.size === 1 ? '' : 's'}
          </button>
          {#if selected.size > 50}
            <p class="hint batch-hint">
              Deze selectie wordt automatisch opgesplitst in batches van 50 en achter elkaar verwerkt.
            </p>
          {/if}
        {/if}
      {/if}

      {#if showDebug}
        <div class="debug-box">
          <div class="debug-title">Fetch debug</div>
          <div class="debug-actions">
            <button class="btn btn-ghost btn-small" onclick={() => (showItemDebug = !showItemDebug)}>
              {showItemDebug ? 'Item debug verbergen' : 'Item debug tonen'}
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
        <span>Scannen…</span>
      </div>

      <div class="progress-block">
        <div class="progress-bar-track">
          <div
            class="progress-bar-fill"
            style:width="{scanMode === 'batch' ? (batchProgress.total > 0 ? (batchProgress.done / batchProgress.total) * 100 : 0) : (progress.total > 0 ? (progress.current / progress.total) * 100 : 0)}%"
          ></div>
        </div>
        <p class="progress-label">
          {#if scanMode === 'batch'}
            {batchProgress.done} / {batchProgress.total} NFTs verwerkt
          {:else}
            {progress.current} / {progress.total} NFTs gescand
          {/if}
        </p>
      </div>
    </div>
  {/if}

  <!-- ── Step 4: Resultaat + Export ────────────── -->
  {#if step === 'complete' && scanResult}
    <div class="card">
      <div class="card-label">
        <span class="step-num">3</span>
        <span>Scan voltooid</span>
      </div>

      <!-- Summary stats -->
      <div class="stats-row">
        <div class="stat">
          <strong>{scanResult.summary?.successful ?? 0}</strong>
          <span>Geslaagd</span>
        </div>
        <div class="stat">
          <strong>{scanResult.summary?.failed ?? 0}</strong>
          <span>Gefaald</span>
        </div>
        <div class="stat">
          <strong>{scanResult.summary?.totalFiles ?? 0}</strong>
          <span>Bestanden</span>
        </div>
        <div class="stat">
          <strong>{formatBytes(scanResult.summary?.totalBytes)}</strong>
          <span>Totaal</span>
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
        <a
          href="/api/nft/export/manifest/{jobId}"
          download="nft-manifest.json"
          class="btn btn-secondary"
        >
          📄 manifest.json
        </a>
        <a
          href="/api/nft/export/ready2pin/{jobId}"
          download="ready2pin.csv"
          class="btn btn-secondary"
        >
          📋 ready2pin.csv
        </a>
      </div>
    </div>
  {/if}

  {#if scanMode === 'batch' && (batchRunning || batchJobs.length > 0)}
    <div class="card">
      <div class="card-label">
        <span class="step-num">3</span>
        <span>Batch-queue</span>
        <span class="count-badge">{batchJobs.length + (batchRunning ? 1 : 0)} / {batchQueue.length} actief</span>
      </div>
      <p class="hint">NFTs worden automatisch verdeeld in batches van 50 en achter elkaar gescand.</p>

      <div class="batch-overview">
        {#each batchQueue as chunk, i}
          <div class="batch-item" class:done={i < batchJobs.length} class:active={batchRunning && i === batchJobs.length}>
            <span class="batch-item-title">Batch {i + 1}/{batchQueue.length}</span>
            <span class="batch-item-count">{chunk.length} NFTs</span>
            <span class="batch-item-status">
              {#if i < batchJobs.length}
                ✅ klaar
              {:else if batchRunning && i === batchJobs.length}
                ⏳ bezig
              {:else}
                ⏱️ wacht
              {/if}
            </span>
          </div>
        {/each}
      </div>
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

  .checker-header h2 {
    font-size: 1.1rem;
    font-weight: 700;
    margin: 0 0 4px;
    color: #0f172a;
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
    border: 1px solid rgba(148, 163, 184, 0.22);
    border-radius: 20px;
    padding: 22px;
    backdrop-filter: blur(12px);
    box-shadow: 0 8px 32px rgba(15, 23, 42, 0.06);
    display: flex;
    flex-direction: column;
    gap: 14px;
  }

  .card-label {
    display: flex;
    align-items: center;
    gap: 10px;
    font-weight: 600;
    font-size: 0.9rem;
    color: #0f172a;
  }

  .step-num {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 24px;
    height: 24px;
    border-radius: 50%;
    background: #0f172a;
    color: white;
    font-size: 0.7rem;
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
    padding: 11px 14px;
    border: 1.5px solid rgba(148, 163, 184, 0.3);
    border-radius: 12px;
    font-family: var(--font-mono, monospace);
    font-size: 0.85rem;
    background: rgba(248, 250, 252, 0.9);
    color: #0f172a;
    transition: border-color 0.15s;
    min-width: 0;
  }

  .text-input:focus {
    outline: none;
    border-color: #0f172a;
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
    font-family: var(--font-mono, monospace);
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
    border: 1.5px solid rgba(148, 163, 184, 0.2);
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
    border-color: #0f172a;
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
    background: #0f172a;
    border-color: #0f172a;
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
    background: #0f172a;
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
    background: #0f172a;
    color: white;
    box-shadow: 0 6px 20px rgba(15, 23, 42, 0.18);
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

  .btn-ghost:hover:not(:disabled) { color: #0f172a; transform: none; }

  .btn-ghost.active-filter {
    color: #0f172a;
    background: rgba(15, 23, 42, 0.06);
    border: 1px solid rgba(15, 23, 42, 0.12);
  }

  .btn-small { font-size: 0.75rem; padding: 5px 12px; }

  .btn-full { width: 100%; }

  /* ── Responsive ──────────────────────────────── */

  @media (max-width: 480px) {
    .input-row { flex-direction: column; }
    .btn-primary { width: 100%; }
    .stats-row { grid-template-columns: repeat(2, 1fr); }
    .nft-grid { grid-template-columns: repeat(2, 1fr); }
    .export-row { flex-direction: column; }
  }
</style>
