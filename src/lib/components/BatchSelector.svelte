<script>
  /**
   * BatchSelector.svelte
   *
   * Toont de batch-queue met:
   *  - Status per batch (wacht / bezig / voltooid / gecached)
   *  - Checkboxes om batches te selecteren voor SCAN (pending) of EXPORT (done)
   *  - Directe export-knoppen per voltooide batch
   *  - Globale export van alle geselecteerde voltooide batches
   *
   * Props:
   *   batches          — array van batch-objecten (zie structuur hieronder)
   *   batchRunning     — boolean, is er een scan actief?
   *   activeBatchIndex — index van de batch die nu draait
   *   onScanSelected   — callback(indices: number[]) om geselecteerde pending batches te scannen
   *   onExportJSON     — callback(indices: number[]) om JSON te downloaden
   *   onExportCSV      — callback(indices: number[]) om CSV te downloaden
   *
   * Batch object structuur:
   * {
   *   index: number,
   *   nftCount: number,
   *   status: 'pending' | 'running' | 'done' | 'error',
   *   jobId?: string,
   *   completedAt?: number,
   *   summary?: { successful, failed, totalFiles, totalBytes },
   *   nftResults?: Array,   // alleen bij done
   * }
   */

  /** @type {Array} */
  let { batches = [], batchRunning = false, activeBatchIndex = -1, onScanSelected, onExportJSON, onExportCSV } = $props()

  // Selecties
  let scanSelected  = $state(new Set())   // pending batches die gescand worden
  let exportSelected = $state(new Set())  // done batches die geëxporteerd worden

  // Sync: als een batch van pending → done gaat, haal hem uit scanSelected, voeg toe aan exportSelected
  $effect(() => {
    batches.forEach((b) => {
      if (b.status === 'done') {
        if (scanSelected.has(b.index)) {
          const next = new Set(scanSelected)
          next.delete(b.index)
          scanSelected = next
        }
        if (!exportSelected.has(b.index)) {
          const next = new Set(exportSelected)
          next.add(b.index)
          exportSelected = next
        }
      }
    })
  })

  // Afgeleide waarden
  let pendingBatches = $derived(batches.filter((b) => b.status === 'pending'))
  let doneBatches    = $derived(batches.filter((b) => b.status === 'done'))
  let selectedDone   = $derived(batches.filter((b) => b.status === 'done' && exportSelected.has(b.index)))
  let selectedPending = $derived(batches.filter((b) => b.status === 'pending' && scanSelected.has(b.index)))

  function toggleScanSelect(index) {
    const next = new Set(scanSelected)
    next.has(index) ? next.delete(index) : next.add(index)
    scanSelected = next
  }

  function toggleExportSelect(index) {
    const next = new Set(exportSelected)
    next.has(index) ? next.delete(index) : next.add(index)
    exportSelected = next
  }

  function selectAllPending() {
    scanSelected = new Set(pendingBatches.map((b) => b.index))
  }

  function selectAllDone() {
    exportSelected = new Set(doneBatches.map((b) => b.index))
  }

  function deselectAllDone() {
    exportSelected = new Set()
  }

  function handleScanSelected() {
    const indices = [...scanSelected]
    if (indices.length > 0 && onScanSelected) onScanSelected(indices)
  }

  function handleExportJSON() {
    const indices = [...exportSelected]
    if (indices.length > 0 && onExportJSON) onExportJSON(indices)
  }

  function handleExportCSV() {
    const indices = [...exportSelected]
    if (indices.length > 0 && onExportCSV) onExportCSV(indices)
  }

  function formatBytes(bytes) {
    if (!bytes) return '0 B'
    if (bytes < 1024) return `${bytes} B`
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
  }

  function statusLabel(batch) {
    if (batch.status === 'running') return '⏳ Bezig…'
    if (batch.status === 'done')    return '✅ Klaar'
    if (batch.status === 'error')   return '❌ Fout'
    return '⏱ Wacht'
  }

  function nftRange(batch) {
    const start = batch.index * 50 + 1
    const end   = start + batch.nftCount - 1
    return `NFT ${start}–${end}`
  }
</script>

<div class="batch-selector">

  <!-- ── Header ──────────────────────────────────────── -->
  <div class="bs-header">
    <span class="bs-title">Batch overzicht</span>
    <span class="bs-meta">{batches.length} batch{batches.length === 1 ? '' : 'es'} · {doneBatches.length} voltooid</span>
  </div>

  <!-- ── Batch lijst ─────────────────────────────────── -->
  <div class="batch-list">
    {#each batches as batch (batch.index)}
      {@const isDone    = batch.status === 'done'}
      {@const isPending = batch.status === 'pending'}
      {@const isRunning = batch.status === 'running'}
      {@const isError   = batch.status === 'error'}
      {@const exportSel = exportSelected.has(batch.index)}
      {@const scanSel   = scanSelected.has(batch.index)}

      <div
        class="batch-row"
        class:batch-done={isDone}
        class:batch-running={isRunning}
        class:batch-error={isError}
        class:batch-export-selected={isDone && exportSel}
      >
        <!-- Linker kolom: checkbox + label -->
        <div class="batch-left">
          {#if isDone}
            <!-- Export checkbox -->
            <!-- svelte-ignore a11y_click_events_have_key_events -->
            <!-- svelte-ignore a11y_no_static_element_interactions -->
            <div
              class="batch-checkbox"
              class:checked={exportSel}
              role="checkbox"
              aria-checked={exportSel}
              tabindex="0"
              onclick={() => toggleExportSelect(batch.index)}
              onkeydown={(e) => e.key === ' ' && toggleExportSelect(batch.index)}
              title="Selecteer voor export"
            ></div>
          {:else if isPending}
            <!-- Scan checkbox -->
            <!-- svelte-ignore a11y_click_events_have_key_events -->
            <!-- svelte-ignore a11y_no_static_element_interactions -->
            <div
              class="batch-checkbox batch-checkbox-scan"
              class:checked={scanSel}
              role="checkbox"
              aria-checked={scanSel}
              tabindex="0"
              onclick={() => toggleScanSelect(batch.index)}
              onkeydown={(e) => e.key === ' ' && toggleScanSelect(batch.index)}
              title="Selecteer voor scan"
            ></div>
          {:else}
            <!-- Running of error: geen checkbox -->
            <div class="batch-checkbox-placeholder"></div>
          {/if}

          <div class="batch-info">
            <span class="batch-name">Batch {batch.index + 1}</span>
            <span class="batch-range">{nftRange(batch)} · {batch.nftCount} NFTs</span>
          </div>
        </div>

        <!-- Midden: status + samenvatting -->
        <div class="batch-middle">
          <span class="batch-status-label" class:status-done={isDone} class:status-running={isRunning} class:status-error={isError}>
            {statusLabel(batch)}
          </span>
          {#if isDone && batch.summary}
            <span class="batch-summary">
              {batch.summary.successful ?? 0} ok · {formatBytes(batch.summary.totalBytes)}
            </span>
          {/if}
        </div>

        <div class="batch-mobile-meta">
          <span class="batch-mobile-line">{nftRange(batch)} · {statusLabel(batch)}{#if isDone && batch.summary} · {batch.summary.successful ?? 0} ok{/if}</span>
        </div>

        <!-- Rechter kolom: directe export-knoppen per voltooide batch -->
        {#if isDone}
          <div class="batch-actions">
            <button
              class="btn-icon"
              title="Download manifest.json voor deze batch"
              onclick={() => onExportJSON?.([batch.index])}
            >
              📄
            </button>
            <button
              class="btn-icon"
              title="Download ready2pin.csv voor deze batch"
              onclick={() => onExportCSV?.([batch.index])}
            >
              📋
            </button>
          </div>
        {/if}
      </div>
    {/each}
  </div>

  <!-- ── Bulk-acties voor pending batches ─────────────── -->
  {#if pendingBatches.length > 0 && !batchRunning}
    <div class="bulk-section bulk-scan">
      <div class="bulk-header">
        <span class="bulk-label">Scannen</span>
        <div class="bulk-controls">
          <button class="btn-link" onclick={selectAllPending}>Alle pending</button>
        </div>
      </div>
      <button
        class="btn btn-primary btn-full"
        disabled={scanSelected.size === 0}
        onclick={handleScanSelected}
      >
        ▶ Scan {scanSelected.size} geselecteerde batch{scanSelected.size === 1 ? '' : 'es'}
      </button>
    </div>
  {/if}

  <!-- ── Bulk-acties voor voltooide batches ────────────── -->
  {#if doneBatches.length > 0}
    <div class="bulk-section bulk-export">
      <div class="bulk-header">
        <span class="bulk-label">Exporteren</span>
        <div class="bulk-controls">
          <button class="btn-link" onclick={selectAllDone}>Alle</button>
          <button class="btn-link" onclick={deselectAllDone}>Geen</button>
          <span class="bulk-count">{selectedDone.length} geselecteerd</span>
        </div>
      </div>
      <div class="export-row">
        <button
          class="btn btn-secondary"
          disabled={selectedDone.length === 0}
          onclick={handleExportJSON}
        >
          📄 manifest.json
        </button>
        <button
          class="btn btn-secondary"
          disabled={selectedDone.length === 0}
          onclick={handleExportCSV}
        >
          📋 ready2pin.csv
        </button>
      </div>
      {#if selectedDone.length > 0}
        <p class="export-hint">
          Export bevat {selectedDone.reduce((s, b) => s + (b.summary?.successful ?? 0), 0)} NFTs
          uit {selectedDone.length} batch{selectedDone.length === 1 ? '' : 'es'}.
          {#if selectedDone.length < doneBatches.length}
            <span class="partial-badge">Partieel</span>
          {/if}
        </p>
      {/if}
    </div>
  {/if}

</div>

<style>
  .batch-selector {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  /* ── Header ─────────────────────────────────────── */

  .bs-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 8px;
  }

  .bs-title {
    font-size: 0.82rem;
    font-weight: 700;
    color: #0f172a;
    text-transform: uppercase;
    letter-spacing: 0.06em;
  }

  .bs-meta {
    font-size: 0.76rem;
    color: #64748b;
  }

  /* ── Batch rijen ─────────────────────────────────── */

  .batch-list {
    display: flex;
    flex-direction: column;
    gap: 6px;
  }

  .batch-row {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 10px 12px;
    border-radius: 12px;
    background: rgba(248, 250, 252, 0.9);
    border: 1.5px solid rgba(148, 163, 184, 0.18);
    transition: border-color 0.15s, background 0.15s;
    min-height: 52px;
  }

  .batch-done {
    border-color: rgba(34, 197, 94, 0.3);
    background: rgba(34, 197, 94, 0.04);
  }

  .batch-done.batch-export-selected {
    border-color: rgba(34, 197, 94, 0.65);
    background: rgba(34, 197, 94, 0.1);
  }

  .batch-running {
    border-color: rgba(59, 130, 246, 0.35);
    background: rgba(59, 130, 246, 0.04);
    animation: pulse-border 1.6s ease-in-out infinite;
  }

  .batch-error {
    border-color: rgba(239, 68, 68, 0.3);
    background: rgba(239, 68, 68, 0.04);
  }

  @keyframes pulse-border {
    0%, 100% { border-color: rgba(59, 130, 246, 0.35); }
    50%       { border-color: rgba(59, 130, 246, 0.65); }
  }

  /* ── Linker kolom ────────────────────────────────── */

  .batch-left {
    display: flex;
    align-items: center;
    gap: 10px;
    flex: 1;
    min-width: 0;
  }

  .batch-checkbox {
    width: 18px;
    height: 18px;
    border: 1.5px solid rgba(34, 197, 94, 0.5);
    border-radius: 5px;
    background: white;
    cursor: pointer;
    flex-shrink: 0;
    transition: background 0.15s, border-color 0.15s;
  }

  .batch-checkbox:hover {
    border-color: rgba(34, 197, 94, 0.9);
  }

  .batch-checkbox.checked {
    background: #16a34a;
    border-color: #16a34a;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 10 8' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 4l3 3 5-6' stroke='white' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-position: center;
    background-size: 10px;
  }

  .batch-checkbox-scan {
    border-color: rgba(99, 102, 241, 0.5);
  }

  .batch-checkbox-scan:hover {
    border-color: rgba(99, 102, 241, 0.9);
  }

  .batch-checkbox-scan.checked {
    background: #6366f1;
    border-color: #6366f1;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 10 8' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 4l3 3 5-6' stroke='white' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-position: center;
    background-size: 10px;
  }

  .batch-checkbox-placeholder {
    width: 18px;
    height: 18px;
    flex-shrink: 0;
  }

  .batch-info {
    display: flex;
    flex-direction: column;
    gap: 2px;
    min-width: 0;
  }

  .batch-name {
    font-size: 0.82rem;
    font-weight: 700;
    color: #0f172a;
  }

  .batch-range {
    font-size: 0.72rem;
    color: #64748b;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  /* ── Midden kolom ────────────────────────────────── */

  .batch-middle {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 2px;
    flex-shrink: 0;
  }

  .batch-mobile-meta {
    display: none;
  }

  .batch-mobile-line {
    font-size: 0.72rem;
    color: #64748b;
    line-height: 1.35;
  }

  .batch-status-label {
    font-size: 0.76rem;
    font-weight: 600;
    color: #94a3b8;
    white-space: nowrap;
  }

  .status-done    { color: #16a34a; }
  .status-running { color: #3b82f6; }
  .status-error   { color: #ef4444; }

  .batch-summary {
    font-size: 0.7rem;
    color: #94a3b8;
    white-space: nowrap;
  }

  /* ── Rechter kolom: export-knoppen ──────────────── */

  .batch-actions {
    display: flex;
    gap: 4px;
    flex-shrink: 0;
  }

  .btn-icon {
    width: 30px;
    height: 30px;
    border: 1.5px solid rgba(148, 163, 184, 0.25);
    border-radius: 8px;
    background: rgba(255, 255, 255, 0.9);
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.9rem;
    transition: background 0.12s, border-color 0.12s, transform 0.1s;
  }

  .btn-icon:hover {
    background: #fff3df;
    border-color: rgba(240, 161, 74, 0.5);
    transform: translateY(-1px);
  }

  /* ── Bulk-secties ────────────────────────────────── */

  .bulk-section {
    display: flex;
    flex-direction: column;
    gap: 8px;
    padding: 12px;
    border-radius: 12px;
  }

  .bulk-scan {
    background: rgba(99, 102, 241, 0.04);
    border: 1.5px solid rgba(99, 102, 241, 0.18);
  }

  .bulk-export {
    background: rgba(34, 197, 94, 0.04);
    border: 1.5px solid rgba(34, 197, 94, 0.2);
  }

  .bulk-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 8px;
  }

  .bulk-label {
    font-size: 0.76rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.06em;
    color: #475569;
  }

  .bulk-controls {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .bulk-count {
    font-size: 0.72rem;
    color: #64748b;
  }

  .btn-link {
    background: none;
    border: none;
    color: #6366f1;
    font-size: 0.72rem;
    font-weight: 600;
    cursor: pointer;
    padding: 0;
    text-decoration: underline;
    text-underline-offset: 2px;
  }

  .btn-link:hover { color: #4338ca; }

  /* ── Export-rij ──────────────────────────────────── */

  .export-row {
    display: flex;
    gap: 8px;
  }

  .export-hint {
    font-size: 0.74rem;
    color: #64748b;
    margin: 0;
  }

  .partial-badge {
    display: inline-block;
    font-size: 0.66rem;
    font-weight: 700;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    color: #92400e;
    background: #fef3c7;
    border: 1px solid rgba(245, 158, 11, 0.3);
    border-radius: 999px;
    padding: 1px 6px;
    margin-left: 4px;
  }

  /* ── Knoppen ─────────────────────────────────────── */

  .btn {
    border: none;
    border-radius: 999px;
    padding: 9px 16px;
    font-weight: 600;
    font-size: 0.82rem;
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
    box-shadow: 0 6px 18px rgba(15, 23, 42, 0.15);
  }

  .btn-secondary {
    background: rgba(226, 232, 240, 0.9);
    color: #0f172a;
    flex: 1;
    text-align: center;
  }

  .btn-full { width: 100%; }

  /* ── Responsive ──────────────────────────────────── */

  @media (max-width: 480px) {
    .batch-middle { display: none; }
    .batch-mobile-meta { display: block; }
    .batch-row { align-items: flex-start; }
    .batch-left { align-items: flex-start; }
    .batch-actions { margin-left: auto; }
    .export-row { flex-direction: column; }
  }
</style>
