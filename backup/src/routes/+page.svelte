<!--
  IPFS Archive Wizard
  Step 1: Enter CID → scan
  Step 2: Show metadata, merkle tree, summary
  Step 3: Choose export format (manifest.json, .csv, .car)
-->
<script>
  import MetadataCard from '$lib/components/MetadataCard.svelte'
  import MerkleTree from '$lib/components/MerkleTree.svelte'
  import NFTChecker from '$lib/components/NFTChecker.svelte'
  import JobsList from '$lib/components/JobsList.svelte'

  // ─── Tab state ────────────────────────────────────────

  /** @type {'scanner' | 'nft-checker' | 'jobs'} */
  let activeTab = 'nft-checker'

  // ─── Scanner state ────────────────────────────────────

  /** @type {'input' | 'scanning' | 'result' | 'error'} */
  let step = 'input'

  let cidInput = ''
  let errorMsg = ''
  let jobId = ''
  let progress = { current: 0, total: 0 }
  let exporting = ''

  /** @type {object | null} */
  let result = null

  // ─── Helpers ─────────────────────────────────────────

  function isValidCidInput(value) {
    const v = value.trim()
    return /^(ipfs:\/\/|https?:\/\/|bafy[a-z0-9]{20,}|Qm[1-9A-HJ-NP-Za-km-z]{44})/i.test(v)
  }

  // ─── Scan ─────────────────────────────────────────────

  async function startScan() {
    const cid = cidInput.trim()
    if (!cid) { errorMsg = 'Voer een CID of IPFS-link in.'; return }
    if (!isValidCidInput(cid)) { errorMsg = 'Ongeldige invoer. Gebruik een CID (bafy…, Qm…) of IPFS-link.'; return }

    errorMsg = ''
    result = null
    step = 'scanning'
    progress = { current: 0, total: 0 }

    try {
      const res = await fetch('/api/scan', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ cid }),
      })

      if (!res.ok) {
        const err = await res.json().catch(() => ({}))
        throw new Error(err.message || 'Scan mislukt')
      }

      const data = await res.json()
      jobId = data.jobId
      await pollStatus(jobId)
    } catch (err) {
      errorMsg = err.message || 'Onbekende fout'
      step = 'error'
    }
  }

  async function pollStatus(id) {
    while (true) {
      let res
      try {
        res = await fetch(`/api/scan/${id}/status`)
      } catch (err) {
        throw new Error(`Netwerkfout bij statusopvraag: ${err?.message || 'verbinding mislukt'}`)
      }

      if (!res.ok) {
        let msg = `Status opvragen mislukt (HTTP ${res.status})`
        try {
          const body = await res.json()
          if (body?.message) msg = body.message
        } catch { /* ignore parse error */ }
        throw new Error(msg)
      }

      const data = await res.json()

      if (data.progress) {
        progress = data.progress
      }

      if (data.status === 'failed') {
        throw new Error(data.error || 'Scan mislukt')
      }

      if (data.status === 'ready') {
        result = data.result
        step = 'result'
        return
      }

      await new Promise(r => setTimeout(r, 1500))
    }
  }

  // ─── Export ───────────────────────────────────────────

  async function download(format) {
    if (!jobId) return
    exporting = format

    try {
      const res = await fetch(`/api/export/${jobId}/${format}`)
      if (!res.ok) {
        const err = await res.json().catch(() => ({}))
        throw new Error(err.message || 'Export mislukt')
      }

      const blob = await res.blob()
      const title = result?.metadata?.title
        ? result.metadata.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '')
        : 'archive'

      const ext = { manifest: 'json', csv: 'csv', car: 'car' }[format]
      const filename = `${title}.${ext}`

      const url = URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = filename
      link.click()
      URL.revokeObjectURL(url)
    } catch (err) {
      errorMsg = err.message || 'Export mislukt'
    } finally {
      exporting = ''
    }
  }

  function reset() {
    step = 'input'
    result = null
    errorMsg = ''
    jobId = ''
    progress = { current: 0, total: 0 }
  }

  function onKeydown(event) {
    if (activeTab === 'scanner' && event.key === 'Enter' && (step === 'input' || step === 'error')) startScan()
  }
</script>

<svelte:head>
  <title>NFT Archive — ARTfilter</title>
  <meta name="description" content="Archive your IPFS NFT collection: scan CIDs, build a Merkle tree, export as manifest.json, CSV for Pinata, or CAR bundle." />
</svelte:head>

<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
<div class="page" onkeydown={onKeydown} role="main">
  <div class="shell">

    <!-- ── Header ─────────────────────────────────── -->
    <header class="header">
      <div class="header-brand">
        <span class="eyebrow">ARTfilter</span>
        <h1>IPFS Archive Assistant</h1>
      </div>
      <p class="header-sub">Scan een CID, bekijk de Merkle tree, exporteer als manifest, CSV of CAR-bundel.</p>
    </header>

    <!-- ── Tabs ───────────────────────────────────── -->
    <nav class="tabs" aria-label="Navigatie">
      <button
        class="tab"
        class:active={activeTab === 'nft-checker'}
        onclick={() => (activeTab = 'nft-checker')}
      >
        🌍 NFT Wallet Checker
      </button>
      <button
        class="tab"
        class:active={activeTab === 'scanner'}
        onclick={() => (activeTab = 'scanner')}
      >
        🔗 Direct CID Scan
      </button>
      <button
        class="tab"
        class:active={activeTab === 'jobs'}
        onclick={() => (activeTab = 'jobs')}
      >
        📊 Job History
      </button>
    </nav>

    <!-- ── Tab: NFT Checker ───────────────────────── -->
    {#if activeTab === 'nft-checker'}
      <NFTChecker />
    {/if}

    <!-- ── Tab: CID Scanner ───────────────────────── -->
    {#if activeTab === 'scanner'}
    <!-- ── Wizard ─────────────────────────────────── -->
    <div class="wizard">

      <!-- Step 1: Input -->
      <div class="step step-active">
        <div class="step-label">
          <span class="step-number">1</span>
          <span>Welke CID wil je archiveren?</span>
          {#if step === 'result'}
            <button class="btn btn-ghost btn-small" onclick={reset}>Nieuwe scan</button>
          {/if}
        </div>

        <div class="input-row">
          <input
            type="text"
            bind:value={cidInput}
            placeholder="bafybeieav35xe… of ipfs://…"
            class="cid-input"
            class:input-error={!!errorMsg && step !== 'scanning'}
            disabled={step === 'scanning'}
            aria-label="CID of IPFS-link"
          />
          <button
            class="btn btn-primary"
            onclick={startScan}
            disabled={step === 'scanning' || !cidInput.trim()}
          >
            {step === 'scanning' ? 'Bezig…' : 'Scan'}
          </button>
        </div>

        {#if errorMsg && step !== 'scanning'}
          <p class="error-message">{errorMsg}</p>
        {/if}

        {#if step === 'input' || step === 'error'}
          <p class="input-hint">
            Plak een CID (<code>bafy…</code> of <code>Qm…</code>), een IPFS-link (<code>ipfs://…</code>) of een IPFS gateway-URL. Druk Enter of klik Scan.
          </p>
        {/if}
      </div>

      <!-- Scanning progress -->
      {#if step === 'scanning'}
        <div class="scanning-state">
          <div class="spinner" aria-label="Laden"></div>
          <div class="scanning-info">
            <p class="scanning-title">Bezig met scannen…</p>
            {#if progress.current > 0}
              <p class="scanning-progress">
                {progress.current} bestanden gevonden
                {#if progress.total > 0} van ~{progress.total}{/if}
              </p>
            {:else}
              <p class="scanning-progress">Ophalen van CID-structuur via IPFS gateways…</p>
            {/if}
          </div>
        </div>
      {/if}

      <!-- Step 2: Results -->
      {#if step === 'result' && result}
        <div class="step step-active">
          <div class="step-label">
            <span class="step-number">2</span>
            <span>Gevonden collectie</span>
          </div>

          <MetadataCard
            metadata={result.metadata ?? { title: '', artists: '', description: '', image: null }}
            summary={result.summary ?? { totalFiles: 0, totalSize: 0, successCount: 0, failCount: 0 }}
            rootCid={result.rootCid ?? ''}
          />

          {#if result.tree?.length > 0}
            <div class="tree-section">
              <p class="section-label">Merkle tree — {result.tree.length} bestanden</p>
              <MerkleTree tree={result.tree} />
            </div>
          {/if}
        </div>

        <!-- Step 3: Export (manifest + CSV first) -->
        <div class="step step-active">
          <div class="step-label">
            <span class="step-number">3</span>
            <span>Download je manifest</span>
          </div>

          <p class="step-description">
            Download eerst je manifest en CSV. Controleer alles goed is gescand, dan kun je de CAR genereren voor pinning.
          </p>

          <div class="export-options">
            <div class="export-card">
              <div class="export-card-icon">📄</div>
              <div class="export-card-info">
                <strong>manifest.json</strong>
                <p>Alle metadata en CID-structuur als JSON.</p>
              </div>
              <button
                class="btn btn-secondary"
                onclick={() => download('manifest')}
                disabled={!!exporting}
              >
                {exporting === 'manifest' ? 'Bezig…' : 'Download'}
              </button>
            </div>

            <div class="export-card">
              <div class="export-card-icon">📊</div>
              <div class="export-card-info">
                <strong>ready2pin.csv</strong>
                <p>CID-lijst klaar voor import in Pinata.</p>
              </div>
              <button
                class="btn btn-secondary"
                onclick={() => download('csv')}
                disabled={!!exporting}
              >
                {exporting === 'csv' ? 'Bezig…' : 'Download'}
              </button>
            </div>
          </div>
        </div>

        <!-- Step 4: CAR Export (on demand) -->
        <div class="step step-active">
          <div class="step-label">
            <span class="step-number">4</span>
            <span>Klaar om te pinnen?</span>
          </div>

          <p class="step-description">
            Nadat je manifest en CSV hebt gevalideerd, klik hier om de complete Merkle tree als CAR-bestand te genereren.
          </p>

          <div class="export-options">
            <div class="export-card export-card-featured">
              <div class="export-card-icon">📦</div>
              <div class="export-card-info">
                <strong>{result.metadata?.title || 'collectie'}.car</strong>
                <p>Volledige DAG met alle assets — klaar voor Pinata of je eigen IPFS node.</p>
              </div>
              <button
                class="btn btn-primary"
                onclick={() => download('car')}
                disabled={!!exporting}
              >
                {exporting === 'car' ? 'Bezig…' : 'Genereer CAR'}
              </button>
            </div>
          </div>
        </div>
      {/if}

    </div>
    {/if}

    <!-- ── Tab: Job History ───────────────────────── -->
    {#if activeTab === 'jobs'}
      <div class="step">
        <JobsList />
      </div>
    {/if}

  </div>
</div>

<style>
  /* ─── Layout ─────────────────────────────────────── */

  .page {
    min-height: 100vh;
    padding: 24px 20px 60px;
  }

  .shell {
    max-width: 720px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    gap: 28px;
  }

  /* ─── Header ─────────────────────────────────────── */

  .header {
    padding-top: 32px;
  }

  .eyebrow {
    display: block;
    font-size: 0.72rem;
    font-weight: 600;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: #64748b;
    margin-bottom: 6px;
  }

  h1 {
    font-size: clamp(1.6rem, 4vw, 2.4rem);
    font-weight: 700;
    margin: 0 0 8px;
    line-height: 1.1;
    color: #0f172a;
  }

  .header-sub {
    color: #64748b;
    font-size: 0.95rem;
    line-height: 1.5;
    margin: 0;
  }

  /* ─── Wizard ─────────────────────────────────────── */

  .wizard {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  .step {
    background: rgba(255,255,255,0.85);
    border: 1px solid rgba(148,163,184,0.22);
    border-radius: 20px;
    padding: 24px;
    backdrop-filter: blur(12px);
    box-shadow: 0 8px 32px rgba(15,23,42,0.06);
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  .step-label {
    display: flex;
    align-items: center;
    gap: 10px;
    font-weight: 600;
    font-size: 0.95rem;
    color: #0f172a;
  }

  .step-number {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 26px;
    height: 26px;
    border-radius: 50%;
    background: #0f172a;
    color: white;
    font-size: 0.75rem;
    font-weight: 700;
    flex-shrink: 0;
  }

  .step-description {
    font-size: 0.9rem;
    color: #64748b;
    line-height: 1.5;
    margin: 0 0 8px;
  }

  /* ─── Input ──────────────────────────────────────── */

  .input-row {
    display: flex;
    gap: 10px;
  }

  .cid-input {
    flex: 1;
    padding: 12px 16px;
    border: 1.5px solid rgba(148,163,184,0.3);
    border-radius: 12px;
    font-family: var(--font-mono, monospace);
    font-size: 0.88rem;
    background: rgba(248,250,252,0.9);
    color: #0f172a;
    transition: border-color 0.15s;
    min-width: 0;
  }

  .cid-input:focus {
    outline: none;
    border-color: #0f172a;
  }

  .cid-input.input-error {
    border-color: #ef4444;
  }

  .cid-input:disabled {
    opacity: 0.5;
  }

  .input-hint {
    font-size: 0.8rem;
    color: #94a3b8;
    margin: 0;
    line-height: 1.4;
  }

  .input-hint code {
    font-family: var(--font-mono, monospace);
    background: rgba(148,163,184,0.12);
    padding: 0.1em 0.35em;
    border-radius: 4px;
    font-size: 0.85em;
  }

  .error-message {
    color: #ef4444;
    font-size: 0.85rem;
    margin: 0;
  }

  /* ─── Scanning ───────────────────────────────────── */

  .scanning-state {
    display: flex;
    align-items: center;
    gap: 14px;
    padding: 20px 24px;
    background: rgba(255,255,255,0.7);
    border: 1px solid rgba(148,163,184,0.18);
    border-radius: 16px;
    backdrop-filter: blur(8px);
  }

  .spinner {
    width: 28px;
    height: 28px;
    border: 2.5px solid rgba(15,23,42,0.12);
    border-top-color: #0f172a;
    border-radius: 50%;
    animation: spin 0.8s linear infinite;
    flex-shrink: 0;
  }

  @keyframes spin {
    to { transform: rotate(360deg); }
  }

  .scanning-title {
    font-weight: 600;
    font-size: 0.95rem;
    margin: 0 0 2px;
    color: #0f172a;
  }

  .scanning-progress {
    font-size: 0.82rem;
    color: #64748b;
    margin: 0;
    font-family: var(--font-mono, monospace);
  }

  /* ─── Tree section ───────────────────────────────── */

  .tree-section {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .section-label {
    font-size: 0.8rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.07em;
    color: #94a3b8;
    margin: 0;
  }

  /* ─── Export cards ───────────────────────────────── */

  .export-options {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .export-card {
    display: flex;
    align-items: center;
    gap: 14px;
    padding: 16px 18px;
    border: 1.5px solid rgba(148,163,184,0.2);
    border-radius: 14px;
    background: rgba(248,250,252,0.8);
    transition: border-color 0.15s;
  }

  .export-card:hover {
    border-color: rgba(148,163,184,0.4);
  }

  .export-card-featured {
    border-color: rgba(15,23,42,0.18);
    background: rgba(255,255,255,0.95);
  }

  .export-card-icon {
    font-size: 1.5rem;
    flex-shrink: 0;
    width: 36px;
    text-align: center;
  }

  .export-card-info {
    flex: 1;
    min-width: 0;
  }

  .export-card-info strong {
    display: block;
    font-size: 0.9rem;
    color: #0f172a;
    margin-bottom: 3px;
    font-family: var(--font-mono, monospace);
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .export-card-info p {
    font-size: 0.8rem;
    color: #64748b;
    margin: 0;
    line-height: 1.4;
  }

  /* ─── Buttons ────────────────────────────────────── */

  .btn {
    border: none;
    border-radius: 999px;
    padding: 10px 18px;
    font-weight: 600;
    font-size: 0.88rem;
    cursor: pointer;
    transition: transform 0.12s, opacity 0.12s;
    white-space: nowrap;
    flex-shrink: 0;
  }

  .btn:hover:not(:disabled) {
    transform: translateY(-1px);
  }

  .btn:disabled {
    opacity: 0.45;
    cursor: not-allowed;
    transform: none;
  }

  .btn-primary {
    background: #0f172a;
    color: white;
    box-shadow: 0 8px 24px rgba(15,23,42,0.18);
  }

  .btn-secondary {
    background: rgba(226,232,240,0.9);
    color: #0f172a;
  }

  .btn-ghost {
    background: transparent;
    color: #64748b;
    padding: 6px 12px;
    font-size: 0.8rem;
    margin-left: auto;
  }

  .btn-ghost:hover:not(:disabled) {
    color: #0f172a;
    transform: none;
  }

  .btn-small {
    font-size: 0.78rem;
    padding: 6px 14px;
  }

  /* ─── Tabs ───────────────────────────────────────── */

  .tabs {
    display: flex;
    gap: 4px;
    border-bottom: 1.5px solid rgba(148,163,184,0.18);
    padding-bottom: 0;
  }

  .tab {
    padding: 10px 16px;
    border: none;
    background: none;
    cursor: pointer;
    font-size: 0.88rem;
    font-weight: 600;
    color: #94a3b8;
    border-bottom: 2.5px solid transparent;
    margin-bottom: -1.5px;
    transition: color 0.15s, border-color 0.15s;
    white-space: nowrap;
  }

  .tab:hover {
    color: #0f172a;
  }

  .tab.active {
    color: #0f172a;
    border-bottom-color: #0f172a;
  }

  @media (max-width: 500px) {
    .tabs {
      overflow-x: auto;
    }
    .tab {
      font-size: 0.8rem;
      padding: 8px 12px;
    }
  }

  /* ─── Responsive ─────────────────────────────────── */

  @media (max-width: 500px) {
    .input-row {
      flex-direction: column;
    }
    .btn-primary {
      width: 100%;
    }
    .export-card {
      flex-wrap: wrap;
    }
    .export-card .btn {
      width: 100%;
    }
  }
</style>
