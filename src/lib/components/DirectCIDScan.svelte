<script>
  import MetadataCard from './MetadataCard.svelte'
  import MerkleTree from './MerkleTree.svelte'

  // ─── State ────────────────────────────────────────

  /** @type {'input' | 'scanning' | 'result' | 'error'} */
  let step = 'input'

  let cidInput = ''
  let errorMsg = ''
  let jobId = ''
  let progress = { current: 0, total: 0 }
  let exporting = ''
  const showCarExport = false

  /** @type {object | null} */
  let result = null

  // ─── Helpers ──────────────────────────────────────

  function isValidCidInput(value) {
    const v = value.trim()
    return /^(ipfs:\/\/|https?:\/\/|bafy[a-z0-9]{20,}|Qm[1-9A-HJ-NP-Za-km-z]{44})/i.test(v)
  }

  // ─── Scan ─────────────────────────────────────────

  async function startScan() {
    const cid = cidInput.trim()
    if (!cid) { errorMsg = 'Enter a CID or IPFS link'; return }
    if (!isValidCidInput(cid)) { errorMsg = 'Invalid input. Use a CID (bafy…, Qm…) or IPFS link'; return }

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
        throw new Error(err.message || 'Scan failed')
      }

      const data = await res.json()
      jobId = data.jobId
      await pollStatus(jobId)
    } catch (err) {
      errorMsg = err.message || 'Unknown error'
      step = 'error'
    }
  }

  async function pollStatus(id) {
    while (true) {
      let res
      try {
        res = await fetch(`/api/scan/${id}/status`)
      } catch (err) {
        throw new Error(`Network error: ${err?.message || 'connection failed'}`)
      }

      if (!res.ok) {
        let msg = `Status query failed (HTTP ${res.status})`
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
        throw new Error(data.error || 'Scan failed')
      }

      if (data.status === 'ready') {
        result = data.result
        step = 'result'
        return
      }

      await new Promise(r => setTimeout(r, 1500))
    }
  }

  // ─── Export ───────────────────────────────────────

  async function download(format) {
    if (!jobId) return
    exporting = format

    try {
      const res = await fetch(`/api/export/${jobId}/${format}`)
      if (!res.ok) {
        const err = await res.json().catch(() => ({}))
        throw new Error(err.message || 'Export failed')
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
      errorMsg = err.message || 'Export failed'
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

  // ─── Keyboard ─────────────────────────────────────

  function onKeydown(e) {
    if (e.key === 'Enter' && (step === 'input' || step === 'error')) {
      startScan()
    }
  }
</script>

<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
<section class="checker" onkeydown={onKeydown} aria-label="Direct CID Scanner">

  <!-- ── Header ──────────────────────────────────── -->
  <div class="checker-header">
    <div class="header-row">
      <h2>Direct CID Scanner</h2>
      <span class="header-pill">IPFS archive view</span>
    </div>
    <p class="sub">Enter a CID or IPFS link to scan the archive and export manifest files.</p>
  </div>

  <!-- ── Step 1: Input ───────────────────────────── -->
  <div class="card">
    <div class="card-label">
      <span class="step-num">1</span>
      <span>CID / IPFS link</span>
      {#if step === 'result'}
        <button class="btn btn-ghost" onclick={reset}>Reset</button>
      {/if}
    </div>

    <div class="input-row">
      <input
        type="text"
        bind:value={cidInput}
        placeholder="bafybeieav35xe…  |  ipfs://…  |  Qm…"
        class="text-input"
        class:is-error={!!errorMsg && step !== 'scanning'}
        disabled={step === 'scanning'}
        aria-label="CID or IPFS link"
      />
      <button
        class="btn btn-primary"
        onclick={startScan}
        disabled={step === 'scanning' || !cidInput.trim()}
      >
        {step === 'scanning' ? 'Scanning…' : 'Scan'}
      </button>
    </div>

    {#if errorMsg && step !== 'scanning'}
      <p class="error-msg">{errorMsg}</p>
    {/if}

    {#if step === 'input' || step === 'error'}
      <p class="hint">
        Paste a CID (<code>bafy…</code> or <code>Qm…</code>), an IPFS link (<code>ipfs://…</code>), or an IPFS gateway URL. Press Enter or click Scan.
      </p>
    {/if}
  </div>

  <!-- ── Step 2: Scanning ────────────────────────── -->
  {#if step === 'scanning'}
    <div class="card">
      <div class="card-label">
        <span class="step-num">2</span>
        <span>Scanning…</span>
      </div>

      <div class="progress-block">
        <div class="progress-bar-track">
          <div
            class="progress-bar-fill"
            style:width="{progress.total > 0 ? (progress.current / progress.total) * 100 : 0}%"
          ></div>
        </div>
        <p class="progress-label">
          {progress.current} / {progress.total} files scanned
        </p>
      </div>
    </div>
  {/if}

  <!-- ── Step 3: Result + Export ────────────────── -->
  {#if step === 'result' && result}
    <div class="card">
      <div class="card-label">
        <span class="step-num">2</span>
        <span>Scan complete</span>
      </div>

      <MetadataCard
        metadata={result.metadata ?? { title: '', artists: '', description: '', image: null }}
        summary={result.summary ?? { totalFiles: 0, totalBytes: 0, errors: 0 }}
        rootCid={result.rootCid ?? ''}
      />

      {#if result.nodes && Object.keys(result.nodes).length > 0}
        {@const nodeList = Object.values(result.nodes)}
        <div class="tree-section">
          <p class="section-label">Merkle tree — {nodeList.length} files</p>
          <MerkleTree nodes={result.nodes} rootCid={result.rootCid} />
        </div>
      {/if}

      <div class="export-row">
        <button class="btn btn-secondary" onclick={() => download('manifest')} disabled={!!exporting}>
          {exporting === 'manifest' ? 'Exporting…' : '📄 manifest'}
        </button>
        <button class="btn btn-secondary" onclick={() => download('csv')} disabled={!!exporting}>
          {exporting === 'csv' ? 'Exporting…' : '📋 ready2pin'}
        </button>
        {#if showCarExport}
          <button class="btn btn-primary" onclick={() => download('car')} disabled={!!exporting}>
            {exporting === 'car' ? 'Exporting…' : '🗂️ CAR'}
          </button>
        {/if}
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

  /* ── Tree section ───────────────────────────── */

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

  /* ── Export ────────────────────────────────── */

  .export-row {
    display: flex;
    gap: 10px;
  }

  .export-row .btn {
    flex: 1;
    text-align: center;
    text-decoration: none;
  }

  /* ── Buttons ───────────────────────────────── */

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
    margin-left: auto;
  }

  .btn-ghost:hover:not(:disabled) { color: #1b140e; transform: none; }

  /* ── Responsive ──────────────────────────────– */

  @media (max-width: 480px) {
    .input-row { flex-direction: column; }
    .btn-primary { width: 100%; }
    .export-row { flex-direction: column; }
  }
</style>
