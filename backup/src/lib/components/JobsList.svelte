<script>
  import { onMount } from 'svelte'

  // ─── State ────────────────────────────────────────────────────────────────

  let jobs    = []
  let loading = false
  let error   = ''

  /** @type {'all'|'scanning'|'complete'|'error'} */
  let filter = 'all'

  const FILTERS = ['all', 'scanning', 'complete', 'error']

  // ─── Lifecycle ────────────────────────────────────────────────────────────

  onMount(() => {
    loadJobs()
  })

  // ─── Data fetching ────────────────────────────────────────────────────────

  async function loadJobs() {
    loading = true
    error   = ''
    try {
      const res = await fetch('/api/jobs/list')
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      jobs = await res.json()
    } catch (err) {
      error = `Kon jobs niet laden: ${err.message}`
    } finally {
      loading = false
    }
  }

  // ─── Derived ──────────────────────────────────────────────────────────────

  $: filtered = filter === 'all' ? jobs : jobs.filter(j => j.status === filter)

  // ─── Helpers ──────────────────────────────────────────────────────────────

  function formatDate(ts) {
    if (!ts) return '—'
    return new Date(ts).toLocaleString('nl-NL', {
      day: '2-digit', month: '2-digit', year: 'numeric',
      hour: '2-digit', minute: '2-digit',
    })
  }

  function formatBytes(bytes) {
    if (!bytes) return '0 B'
    if (bytes < 1024)        return `${bytes} B`
    if (bytes < 1024 ** 2)   return `${(bytes / 1024).toFixed(1)} KB`
    return `${(bytes / 1024 ** 2).toFixed(1)} MB`
  }

  function statusIcon(status) {
    return { complete: '✅', scanning: '⏳', error: '❌', queued: '⏱️' }[status] ?? '❓'
  }

  function jobLabel(jobId) {
    if (!jobId) return 'Job'
    if (jobId.startsWith('scan_')) return 'CID Scan'
    if (jobId.startsWith('nft_'))  return 'NFT Check'
    return 'Job'
  }

  function progressPct(progress) {
    if (!progress?.total || progress.total === 0) return 0
    return Math.min(100, Math.round((progress.current / progress.total) * 100))
  }
</script>

<!-- ── Header ──────────────────────────────────────────────────────────────── -->
<div class="jobs-header">
  <h2>Recente jobs</h2>
  <button class="btn-refresh" onclick={loadJobs} disabled={loading}>
    {loading ? 'Laden…' : '↻ Verversen'}
  </button>
</div>

<!-- ── Filter pills ────────────────────────────────────────────────────────── -->
<div class="filters">
  {#each FILTERS as f}
    <button
      class="pill"
      class:active={filter === f}
      onclick={() => (filter = f)}
    >
      {f.charAt(0).toUpperCase() + f.slice(1)}
    </button>
  {/each}
</div>

<!-- ── Error ───────────────────────────────────────────────────────────────── -->
{#if error}
  <p class="load-error">{error}</p>
{/if}

<!-- ── Empty state ─────────────────────────────────────────────────────────── -->
{#if !loading && !error && filtered.length === 0}
  <div class="empty">
    <span class="empty-icon">📭</span>
    <p>
      {filter === 'all'
        ? 'Nog geen jobs. Start een scan of NFT-check!'
        : `Geen jobs met status "${filter}".`}
    </p>
  </div>
{/if}

<!-- ── Job cards ───────────────────────────────────────────────────────────── -->
{#if filtered.length > 0}
  <ul class="job-list">
    {#each filtered as job (job.jobId)}
      <li class="job-card" class:is-error={job.status === 'error'}>

        <!-- Top row -->
        <div class="job-top">
          <span class="job-icon">{statusIcon(job.status)}</span>
          <div class="job-meta">
            <span class="job-type">{jobLabel(job.jobId)}</span>
            <code class="job-id">{job.jobId}</code>
            <span class="job-date">{formatDate(job.createdAt)}</span>
          </div>
          <span class="job-badge" data-status={job.status}>
            {job.status.toUpperCase()}
          </span>
        </div>

        <!-- Progress bar (scanning only) -->
        {#if job.status === 'scanning' && job.progress}
          <div class="progress-wrap">
            <div class="progress-track">
              <div class="progress-fill" style="width: {progressPct(job.progress)}%"></div>
            </div>
            <span class="progress-label">
              {job.progress.current}
              {#if job.progress.total} / {job.progress.total}{/if}
            </span>
          </div>
        {/if}

        <!-- Summary (complete) -->
        {#if job.status === 'complete' && job.summary}
          <div class="summary-row">
            <span>📁 {job.summary.totalFiles ?? '—'} bestanden</span>
            <span>💾 {formatBytes(job.summary.totalSize)}</span>
            {#if job.summary.successCount != null}
              <span>✓ {job.summary.successCount}</span>
            {/if}
          </div>
        {/if}

        <!-- Error message -->
        {#if job.status === 'error' && job.error}
          <p class="job-error">{job.error}</p>
        {/if}

        <!-- Export button -->
        {#if job.status === 'complete'}
          <div class="job-actions">
            <a
              href="/api/jobs/{job.jobId}/export"
              download="{job.jobId}-export.json"
              class="btn-export"
            >
              📥 Exporteer JSON
            </a>
          </div>
        {/if}

      </li>
    {/each}
  </ul>
{/if}

<style>
  /* ── Header ──────────────────────────────────────────── */

  .jobs-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 1rem;
  }

  h2 {
    margin: 0;
    font-size: 1rem;
    font-weight: 700;
    color: #0f172a;
  }

  .btn-refresh {
    padding: 6px 14px;
    border: 1.5px solid rgba(148,163,184,0.3);
    border-radius: 999px;
    background: white;
    font-size: 0.82rem;
    font-weight: 600;
    color: #64748b;
    cursor: pointer;
    transition: color 0.15s, border-color 0.15s;
  }

  .btn-refresh:hover:not(:disabled) {
    color: #0f172a;
    border-color: #0f172a;
  }

  .btn-refresh:disabled {
    opacity: 0.45;
    cursor: not-allowed;
  }

  /* ── Filters ─────────────────────────────────────────── */

  .filters {
    display: flex;
    gap: 6px;
    flex-wrap: wrap;
    margin-bottom: 1rem;
  }

  .pill {
    padding: 4px 12px;
    border: 1.5px solid rgba(148,163,184,0.25);
    border-radius: 999px;
    background: white;
    font-size: 0.78rem;
    font-weight: 600;
    color: #64748b;
    cursor: pointer;
    transition: all 0.15s;
  }

  .pill:hover {
    border-color: #0f172a;
    color: #0f172a;
  }

  .pill.active {
    background: #0f172a;
    border-color: #0f172a;
    color: white;
  }

  /* ── Empty / error ───────────────────────────────────── */

  .load-error {
    color: #ef4444;
    font-size: 0.85rem;
    margin: 0.5rem 0;
  }

  .empty {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;
    padding: 2.5rem 1rem;
    color: #94a3b8;
    font-size: 0.9rem;
    text-align: center;
  }

  .empty-icon {
    font-size: 2rem;
  }

  .empty p {
    margin: 0;
  }

  /* ── List ────────────────────────────────────────────── */

  .job-list {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  /* ── Card ────────────────────────────────────────────── */

  .job-card {
    background: rgba(255,255,255,0.85);
    border: 1px solid rgba(148,163,184,0.22);
    border-radius: 16px;
    padding: 16px 18px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    backdrop-filter: blur(8px);
  }

  .job-card.is-error {
    border-color: rgba(239,68,68,0.25);
  }

  /* ── Top row ─────────────────────────────────────────── */

  .job-top {
    display: flex;
    align-items: flex-start;
    gap: 10px;
  }

  .job-icon {
    font-size: 1.25rem;
    flex-shrink: 0;
    margin-top: 2px;
  }

  .job-meta {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 2px;
    min-width: 0;
  }

  .job-type {
    font-weight: 700;
    font-size: 0.88rem;
    color: #0f172a;
  }

  .job-id {
    font-family: var(--font-mono, monospace);
    font-size: 0.72rem;
    color: #94a3b8;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .job-date {
    font-size: 0.75rem;
    color: #94a3b8;
  }

  /* ── Badge ───────────────────────────────────────────── */

  .job-badge {
    padding: 3px 10px;
    border-radius: 999px;
    font-size: 0.68rem;
    font-weight: 700;
    letter-spacing: 0.05em;
    flex-shrink: 0;
    background: #e2e8f0;
    color: #475569;
  }

  .job-badge[data-status="complete"] { background: #dcfce7; color: #15803d; }
  .job-badge[data-status="scanning"] { background: #fef9c3; color: #a16207; }
  .job-badge[data-status="queued"]   { background: #e0f2fe; color: #0369a1; }
  .job-badge[data-status="error"]    { background: #fee2e2; color: #b91c1c; }

  /* ── Progress ────────────────────────────────────────── */

  .progress-wrap {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .progress-track {
    flex: 1;
    height: 6px;
    background: rgba(148,163,184,0.18);
    border-radius: 999px;
    overflow: hidden;
  }

  .progress-fill {
    height: 100%;
    background: #0f172a;
    border-radius: 999px;
    transition: width 0.4s ease;
  }

  .progress-label {
    font-size: 0.72rem;
    font-family: var(--font-mono, monospace);
    color: #64748b;
    white-space: nowrap;
  }

  /* ── Summary ─────────────────────────────────────────── */

  .summary-row {
    display: flex;
    gap: 14px;
    flex-wrap: wrap;
    font-size: 0.8rem;
    color: #64748b;
  }

  /* ── Error text ──────────────────────────────────────── */

  .job-error {
    margin: 0;
    font-size: 0.82rem;
    color: #ef4444;
  }

  /* ── Actions ─────────────────────────────────────────── */

  .job-actions {
    display: flex;
    gap: 8px;
  }

  .btn-export {
    padding: 6px 14px;
    background: #0f172a;
    color: white;
    text-decoration: none;
    border-radius: 999px;
    font-size: 0.8rem;
    font-weight: 600;
    transition: opacity 0.15s;
  }

  .btn-export:hover {
    opacity: 0.8;
  }
</style>
