<script>
  import { pageCopy as t } from '$lib/i18n/en'

  const starterText = `ipfs://bafy.../metadata.json
https://example.com/token/123
Qm...`

  function looksLikeRealLink(text) {
    return /^(ipfs:\/\/|https?:\/\/|Qm[1-9A-HJ-NP-Za-km-z]{44,})/m.test(text.trim())
  }

  let inputText = starterText
  let messages = [
    {
      role: 'assistant',
      text: t.assistantWelcome,
    },
  ]
  let report = null
  let lastSuccessfulReport = null
  let error = ''
  let busy = ''
  let scanLog = []
  let abortController = null
  let currentJobId = null
  let pollingTimer = null

  function prettyBytes(bytes) {
    if (bytes === null || bytes === undefined || Number.isNaN(bytes)) return t.nA
    if (bytes < 1024) return `${bytes} B`
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
    return `${(bytes / 1024 / 1024).toFixed(1)} MB`
  }

  function compactItem(item) {
    if (!item || typeof item !== 'object') return item
    return {
      id: item.id,
      status: item.status,
      kind: item.kind,
      path: item.path || item.archive_path || item.archivePath || item.source_ref || item.sourceRef || null,
      archive_path: item.archive_path || item.archivePath || null,
      source_ref: item.source_ref || item.sourceRef || null,
      size: item.size ?? item.size_bytes ?? item.sizeBytes ?? null,
      size_bytes: item.size_bytes ?? item.sizeBytes ?? null,
      notes: typeof item.notes === 'string' ? item.notes.slice(0, 200) : '',
    }
  }

  function extractReadyReport(data) {
    const reportId = data?.reportId || data?.report?.reportId || null
    const items = Array.isArray(data?.items) ? data.items.map(compactItem) : Array.isArray(data?.report?.items) ? data.report.items.map(compactItem) : []
    const archiveFiles = Array.isArray(data?.archiveFiles)
      ? data.archiveFiles
      : Array.isArray(data?.report?.archiveFiles)
        ? data.report.archiveFiles
        : []
    const manifest = data?.manifest || data?.report?.manifest || null
    const rootCid = data?.rootCid || data?.report?.rootCid || manifest?.rootCid || null
    const summary = data?.summary || data?.report?.summary || {}
    const totalSize = data?.totalSize ?? data?.size ?? data?.report?.totalSize ?? data?.report?.size ?? null
    const exportReadiness = data?.exportReadiness ?? null

    return {
      reportId,
      rootCid,
      totalSize,
      size: totalSize,
      items,
      archiveFiles,
      exportReadiness,
      summary: {
        input_count: summary.input_count ?? data?.itemCount ?? items.length ?? 0,
        unique_references: summary.unique_references ?? data?.itemCount ?? items.length ?? 0,
        successful_records: summary.successful_records ?? items.length ?? archiveFiles.length ?? 0,
        failed_records: summary.failed_records ?? 0,
      },
      manifest,
    }
  }

  function isReportExportReady(value) {
    return Boolean(
      value?.reportId &&
      value?.rootCid &&
      Array.isArray(value?.archiveFiles) &&
      value.archiveFiles.length > 0 &&
      value?.exportReadiness?.canExportCar !== false,
    )
  }

  function pushAssistant(text) {
    messages = [...messages, { role: 'assistant', text }]
  }

  function pushLog(text) {
    scanLog = [...scanLog, `${new Date().toLocaleTimeString()} — ${text}`]
  }

  $: logLineCount = scanLog.length

  function validateInput() {
    const trimmed = inputText.trim()
    if (!trimmed) {
      error = t.pleasePasteOne
      return null
    }
    return trimmed
  }

  async function scanArchive() {
    const trimmed = validateInput()
    if (!trimmed) return

    error = ''
    busy = 'scan'
    scanLog = []
    report = null
    lastSuccessfulReport = null
    currentJobId = null
    messages = [...messages, { role: 'user', text: trimmed }]
    pushLog(t.scanningStarted)
    pushLog(`${t.inputLines}: ${trimmed.split(/\r?\n/).filter(Boolean).length}`)

    try {
      pushLog('Submitting scan job...')
      abortController?.abort()
      abortController = new AbortController()
      const response = await fetch('/api/scan', {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
        },
        signal: abortController.signal,
        body: JSON.stringify({ ipfsHash: trimmed }),
      })

      if (!response.ok) {
        const message = await response.text()
        throw new Error(message || t.scanFailed)
      }

      const data = await response.json()
      currentJobId = data.jobId
      pushLog(`Job created: ${currentJobId}`)
      pushAssistant(`Scan job started. Job ID: ${currentJobId}`)
      await pollJobStatus(currentJobId)
    } catch (err) {
      error = err instanceof Error ? err.message : t.unknownError
      pushAssistant(`${t.userCouldNotScanPrefix} ${error}`)
      pushLog(`${t.errorPrefix} ${error}`)
    } finally {
      busy = ''
    }
  }

  async function pollJobStatus(jobId) {
    clearInterval(pollingTimer)

    const check = async () => {
      const response = await fetch(`/api/scan/${jobId}/status`)
      if (!response.ok) {
        const message = await response.text()
        throw new Error(message || 'Failed to fetch job status')
      }

      const data = await response.json()
      pushLog(`Job status: ${data.status}`)

      if (data.status === 'failed') {
        throw new Error(data.error || 'Scan failed')
      }

      if (data.status === 'ready') {
        const readyReport = extractReadyReport(data)
        if (!readyReport.reportId) {
          throw new Error('Job is ready, but reportId is missing.')
        }

        report = readyReport
        lastSuccessfulReport = readyReport
        pushAssistant(`Scan completed. Report ID: ${readyReport.reportId}`)
        if (readyReport.rootCid) pushLog(`Root CID: ${readyReport.rootCid}`)
        if (readyReport.items?.length) {
          pushLog(`Found items: ${readyReport.items.length}`)
        }
        if (readyReport.archiveFiles?.length) {
          pushLog(`Archive files: ${readyReport.archiveFiles.length}`)
        }
        if (readyReport.exportReadiness) {
          pushLog(
            `Export readiness: CAR=${readyReport.exportReadiness.canExportCar ? 'yes' : 'no'}, CSV=${readyReport.exportReadiness.canExportCsv ? 'yes' : 'no'}`,
          )
        }
        return true
      }

      if (data.progress) {
        const current = data.progress.current ?? 0
        const total = data.progress.total ?? data.itemCount ?? 'n/a'
        pushLog(`Progress: ${current}/${total}`)
      }

      return false
    }

    while (true) {
      const done = await check()
      if (done) break
      await new Promise((resolve) => setTimeout(resolve, 1500))
    }
  }

  async function downloadExport(endpoint, filename) {
    const trimmed = validateInput()
    if (!trimmed) return

    error = ''
    busy = filename

    try {
      const exportReport = lastSuccessfulReport || report

      if (!exportReport) {
        throw new Error(t.scanTheCollectionBeforeExporting)
      }

      pushLog(`${t.exportStartedFromExistingReport} ${filename}`)

      let blob

      if (endpoint === '/api/export/csv') {
        const csv = exportReport.pinataCsv || ''
        blob = new Blob([csv], { type: 'text/csv;charset=utf-8' })
      } else if (endpoint === '/api/export/car') {
        if (!isReportExportReady(exportReport)) {
          throw new Error('Report is not export-ready yet. Please rerun the scan.')
        }

        const reportId = exportReport.reportId || lastSuccessfulReport?.reportId || currentJobId
        if (!reportId) {
          throw new Error('Missing reportId in cached report. Please scan again.')
        }

        const response = await fetch(endpoint, {
          method: 'POST',
          headers: {
            'content-type': 'application/json',
          },
          body: JSON.stringify({ reportId }),
        })

        if (!response.ok) {
          const raw = await response.text()
          let message = raw
          try {
            const parsed = JSON.parse(raw)
            message = parsed?.message || raw
          } catch {
            // keep raw text
          }
          throw new Error(message || t.exportFailed)
        }

        blob = await response.blob()
      } else {
        const response = await fetch(endpoint, {
          method: 'POST',
          headers: {
            'content-type': 'application/json',
          },
          body: JSON.stringify({ report: exportReport, inputText: trimmed }),
        })

        if (!response.ok) {
          const raw = await response.text()
          let message = raw
          try {
            const parsed = JSON.parse(raw)
            message = parsed?.message || raw
          } catch {
            // keep raw text
          }
          throw new Error(message || t.exportFailed)
        }

        blob = await response.blob()
      }

      const url = URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = filename
      link.click()
      URL.revokeObjectURL(url)

      if (endpoint === '/api/export/car') {
        const reportedRootCid = exportReport.rootCid || exportReport.manifest?.rootCid || null
        if (reportedRootCid) {
          pushAssistant(`${t.carReadyPrefix} ${reportedRootCid}`)
          pushLog(`${t.carReadyLogPrefix} ${reportedRootCid}`)
        }
      } else if (filename.endsWith('.csv')) {
        pushAssistant(t.csvReady)
        pushLog(`${t.csvReadyLogPrefix} ${filename}`)
      }
    } catch (err) {
      error = err instanceof Error ? err.message : t.unknownError
      pushAssistant(`${t.exportFailedPrefix}: ${error}`)
      pushLog(`${t.errorPrefix} ${error}`)
    } finally {
      busy = ''
    }
  }

  function shortText(value, limit = 70) {
    if (!value) return ''
    return value.length > limit ? `${value.slice(0, limit - 1)}…` : value
  }

  $: summaryCards = report
    ? [
        { label: t.inputLines, value: report.summary.input_count },
        { label: t.uniqueRefsFound, value: report.summary.unique_references },
        { label: t.success, value: report.summary.successful_records },
        { label: t.failures, value: report.summary.failed_records },
      ]
    : []

  $: visibleItems = report ? report.items.slice(0, 18).map(compactItem) : []
</script>


<svelte:head>
  <title>{t.appTitle}</title>
  <meta name="description" content={t.metaDescription} />
</svelte:head>

<div class="page">
  <div class="shell">
    <section class="hero card">
      <div class="hero-copy">
        <p class="eyebrow">ARTfilter Assistant</p>
        <h1>This tool helps you archive your NFT collections.</h1>
      
      </div>
      <div class="hero-stats">
        <div class="stat">
          <span>Workflow</span>
          <strong>Scan → CSV → CAR</strong>
        </div>
        <div class="stat">
          <span>Input</span>
          <strong>1 line = 1 source</strong>
        </div>
        <div class="stat">
          <span>Output</span>
          <strong>Inventory + archive</strong>
        </div>
      </div>
    </section>

    <section class="panel card chat-panel">
      <div class="panel-header">
        <div>
          <p class="panel-kicker">Chat</p>
          <h2>Tell the assistant what you want to archive.</h2>
        </div>
      </div>

      <div class="chat-log" aria-live="polite">
        {#each messages as message}
          <div class={`bubble ${message.role}`}>
            {message.text}
          </div>
        {/each}
      </div>

      <div class="composer">
        <label for="inputText">TokenURIs, IPFS links, CIDs, or JSON input</label>
        <textarea
          id="inputText"
          bind:value={inputText}
          spellcheck="false"
          placeholder={looksLikeRealLink(inputText) ? '' : 'Paste one tokenURI or root CID per line...'}
          onkeydown={(event) => event.key === 'Enter' && !event.shiftKey && (event.preventDefault(), scanArchive())}
        ></textarea>
        {#if error}
          <p class="error">{error}</p>
        {/if}
      </div>

      <div class="input-actions">
        <div class="action-group">
          <h3>Step 1</h3>
          <p class="action-help">Paste one tokenURI, IPFS link, CID, or JSON input. I will scan the references, build an inventory CSV, and can then create a CAR export once the result is export-ready.</p>
          <button class="primary" onclick={scanArchive} disabled={busy === 'scan' || !inputText.trim()}>
            {busy === 'scan' ? 'Scanning...' : 'Scan now'}
          </button>
        </div>

        {#if report}
          <div class="action-group">
            <h3>Step 2: Download</h3>
            <button
              class="secondary"
              onclick={() => downloadExport('/api/export/csv', 'importfromipfs.csv')}
              disabled={busy || !isReportExportReady(report)}
            >
              {busy === 'importfromipfs.csv' ? 'Creating CSV...' : '📥 Download Pinata CSV'}
            </button>
            <button
              class="secondary"
              onclick={() => downloadExport('/api/export/car', 'archive-bundle.car')}
              disabled={busy || !isReportExportReady(report)}
            >
              {busy === 'archive-bundle.car' ? 'Creating CAR...' : '📦 Download CAR archive'}
            </button>
          </div>
        {/if}
      </div>
    </section>

    <aside class="panel card">
      <div class="panel-header">
        <div>
          <p class="panel-kicker">Result</p>
          <h2>Scan summary and export readiness.</h2>
        </div>
      </div>

      <div class="scan-window">
        <div class="scan-window-header">
          <h3>{busy === 'scan' ? t.resultWindowTitleScanning : t.resultWindowTitleCompleted}</h3>
          <span>
            {busy === 'scan' ? t.scannerLogTitle : t.resultTitlePrefix}
            {#if logLineCount} · {logLineCount} lines{/if}
          </span>
        </div>
        <div class="scan-window-body">
          {#if scanLog.length}
            {#each scanLog as line}
              <div class="scan-line">{line}</div>
            {/each}
          {:else if report}
            <div class="result-window-content">
              <p class="result-window-intro">{t.summaryTitle}</p>
              <ul class="result-window-list">
                <li><strong>{t.success}:</strong> {report.summary.successful_records}</li>
                <li><strong>{t.failures}:</strong> {report.summary.failed_records}</li>
                <li><strong>{t.uniqueRefsFound}:</strong> {report.summary.unique_references}</li>
              </ul>
            </div>
          {:else}
            <p>{t.scannerLogEmptyBody}</p>
          {/if}
        </div>
      </div>

      {#if report}
        <div class="summary-grid">
          {#each summaryCards as card}
            <div class="summary-card">
              <span>{card.label}</span>
              <strong>{card.value}</strong>
            </div>
          {/each}
        </div>

        <div class="manifest">
          <h3>Export info</h3>
          <p><strong>Report ID</strong> {report.reportId || currentJobId || 'n/a'}</p>
          <p><strong>Root</strong> {shortText(report.manifest?.rootCid || report.rootCid || report.manifest?.source_inputs?.[0]?.canonical || 'n/a')}</p>
          <p><strong>Files</strong> {report.items?.length || report.summary?.successful_records || 0}</p>
          <p><strong>Total size</strong> {prettyBytes(report.totalSize ?? report.size ?? null)}</p>
          <p><strong>Manifest</strong> is included in the CAR as `manifest.json`.</p>
        </div>

        <div class="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Status</th>
                <th>Type</th>
                <th>Path</th>
                <th>Size</th>
              </tr>
            </thead>
            <tbody>
              {#each visibleItems as item}
                <tr>
                  <td>
                    <span class:item-ok={item.status === 'ok'} class:item-fail={item.status !== 'ok'}>
                      {item.status}
                    </span>
                  </td>
                  <td>{item.kind || 'n/a'}</td>
                  <td title={item.path || item.archive_path}>{shortText(item.path || item.archive_path || item.source_ref, 42)}</td>
                  <td>{prettyBytes(item.size ?? item.size_bytes ?? null)}</td>
                </tr>
              {/each}
            </tbody>
          </table>
        </div>
      {:else}
        <p class="placeholder">
        After the first scan, you will see the counts, discovered refs, and a compact preview of
        the export here. CAR export is only enabled once the report is export-ready.
        </p>

      {/if}
    </aside>
  </div>
</div>

<style>
  .page {
    min-height: 100vh;
    padding: var(--page-padding, 24px);
    background: var(--page-bg, transparent);
    color: var(--page-fg, inherit);
  }

  .shell {
    max-width: var(--page-max-width, 1360px);
    margin: 0 auto;
    display: grid;
    gap: var(--page-gap, 20px);
    grid-template-columns: minmax(0, 1.2fr) minmax(340px, 0.8fr);
  }

  .card {
    background: var(--surface, var(--color-bg-surface));
    border: 1px solid var(--border, var(--color-border-strong));
    border-radius: var(--radius-lg);
    box-shadow: var(--shadow-card, 0 24px 80px rgba(15, 23, 42, 0.08));
    backdrop-filter: blur(14px);
  }

  .hero {
    grid-column: 1 / -1;
    padding: 28px;
    display: grid;
    grid-template-columns: minmax(0, 1.6fr) minmax(280px, 0.9fr);
    gap: 20px;
    align-items: end;
  }

  .eyebrow,
  .panel-kicker {
    margin: 0 0 6px;
    text-transform: uppercase;
    letter-spacing: 0.12em;
    font-size: 0.74rem;
    color: var(--muted-fg, #64748b);
  }

  h1,
  h2,
  h3,
  p {
    margin: 0;
  }

  h1 {
    font-size: clamp(2rem, 4vw, 3.8rem);
    line-height: 0.98;
    max-width: 12ch;
  }

  .lede {
    margin-top: 14px;
    max-width: 66ch;
    color: var(--text-secondary, #475569);
    line-height: 1.6;
  }

  .hero-stats {
    display: grid;
    gap: 12px;
  }

  .stat,
  .summary-card,
  .manifest,
  .placeholder {
    border: 1px solid var(--border-subtle, var(--color-border));
    border-radius: var(--radius-md);
    background: var(--surface-subtle, rgba(248, 250, 252, 0.8));
  }

  .stat {
    padding: 14px 16px;
  }

  .stat span,
  .summary-card span {
    display: block;
    font-size: 0.78rem;
    color: var(--muted-fg, #64748b);
    margin-bottom: 4px;
  }

  .stat strong,
  .summary-card strong {
    font-size: 1.05rem;
  }

  .panel {
    padding: var(--panel-padding, 22px);
  }

  .panel-header {
    display: flex;
    justify-content: space-between;
    align-items: start;
    gap: 12px;
    margin-bottom: 18px;
  }

  .panel-header h2 {
    font-size: 1.15rem;
    color: var(--heading-fg, inherit);
  }

  .ghost,
  .primary,
  .secondary {
    border: none;
    border-radius: var(--radius-full);
    padding: 12px 16px;
    font-weight: 600;
    cursor: pointer;
    transition:
      transform 0.15s ease,
      opacity 0.15s ease,
      box-shadow 0.15s ease;
  }

  .ghost,
  .secondary {
    background: var(--button-secondary-bg, rgba(226, 232, 240, 0.95));
    color: var(--button-secondary-fg, #0f172a);
  }

  .primary {
    background: var(--button-primary-bg, #0f172a);
    color: var(--button-primary-fg, white);
    box-shadow: var(--button-primary-shadow, 0 16px 30px rgba(15, 23, 42, 0.18));
  }

  .ghost:hover,
  .primary:hover,
  .secondary:hover {
    transform: translateY(-1px);
  }

  .ghost:disabled,
  .primary:disabled,
  .secondary:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
  }

  .chat-panel {
    display: flex;
    flex-direction: column;
    min-height: 720px;
  }

  .input-actions {
    display: grid;
    gap: 14px;
    margin: 14px 0 18px;
  }

  .chat-log {
    display: flex;
    flex-direction: column;
    gap: 12px;
    padding: 4px 0 18px;
  }

  .bubble {
    max-width: min(92%, 720px);
    padding: 14px 16px;
    border-radius: 18px;
    line-height: 1.55;
    white-space: pre-wrap;
  }

  .bubble.user {
    align-self: flex-end;
    background: var(--bubble-user-bg, #0f172a);
    color: var(--bubble-user-fg, white);
  }

  .bubble.assistant {
    align-self: flex-start;
    background: var(--bubble-assistant-bg, var(--color-accent-soft));
    color: var(--bubble-assistant-fg, #1e293b);
  }

  .scan-window {
    margin-top: 6px;
    border: 1px solid var(--border-subtle, var(--color-border));
    border-radius: var(--radius-md);
    background: var(--scan-window-bg, rgba(15, 23, 42, 0.96));
    color: var(--scan-window-fg, #e2e8f0);
    overflow: hidden;
  }

  .scan-window-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 12px 14px;
    border-bottom: 1px solid var(--border-subtle, var(--color-border));
    background: var(--scan-window-header-bg, rgba(15, 23, 42, 1));
  }

  .scan-window-header h3 {
    font-size: 0.95rem;
  }

  .scan-window-header span {
    font-size: 0.8rem;
    color: var(--scan-window-muted, #94a3b8);
  }

  .scan-window-body {
    max-height: 180px;
    overflow: auto;
    padding: 12px 14px;
    font-family: var(--font-mono);
    font-size: 0.82rem;
    line-height: 1.55;
  }

  .result-window-content {
    display: grid;
    gap: 10px;
  }

  .result-window-intro {
    font-weight: 600;
  }

  .result-window-list {
    margin: 0;
    padding-left: 18px;
    display: grid;
    gap: 6px;
  }

  .scan-line {
    padding: 2px 0;
    border-bottom: 1px dashed var(--border-subtle, var(--color-border));
  }

  .scan-line:last-child {
    border-bottom: none;
  }

  .composer {
    margin-top: auto;
    display: grid;
    gap: 10px;
  }

  .composer label {
    font-weight: 600;
  }

  .action-group {
    padding: 14px;
    border-left: 3px solid var(--accent, var(--color-accent));
    background: var(--surface-subtle, rgba(248, 250, 252, 0.5));
    border-radius: var(--radius-md);
    display: grid;
    gap: 10px;
    margin-bottom: 14px;
  }

  .action-group h3 {
    margin: 0;
    font-size: 0.9rem;
    text-transform: uppercase;
    color: var(--muted-fg, var(--color-fg-soft));
    letter-spacing: 0.05em;
  }

  .action-help {
    line-height: 1.5;
    color: var(--text-secondary, #475569);
  }

  .action-group .secondary {
    width: fit-content;
  }

  textarea {
    width: 100%;
    min-height: 180px;
    resize: vertical;
    border: 1px solid var(--input-border, rgba(148, 163, 184, 0.4));
    border-radius: 18px;
    padding: 14px 16px;
    font: inherit;
    line-height: 1.5;
    color: inherit;
    background: var(--input-bg, rgba(255, 255, 255, 0.92));
    box-sizing: border-box;
  }

  textarea:focus {
    outline: 2px solid var(--focus-ring, rgba(99, 102, 241, 0.25));
    border-color: var(--focus-border, rgba(99, 102, 241, 0.45));
  }

  .controls {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
  }

  .error {
    color: var(--error-fg, #b91c1c);
    font-weight: 600;
  }

  .summary-grid {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 12px;
    margin-bottom: 14px;
  }

  .summary-card {
    padding: 14px;
  }

  .manifest {
    padding: 14px;
    margin-bottom: 14px;
  }

  .manifest p + p {
    margin-top: 8px;
  }

  .placeholder {
    padding: 16px;
    line-height: 1.6;
    color: var(--text-secondary, #475569);
  }

  .table-wrap {
    overflow: auto;
    border: 1px solid var(--border-subtle, rgba(148, 163, 184, 0.18));
    border-radius: 18px;
  }

  table {
    width: 100%;
    border-collapse: collapse;
    font-size: 0.92rem;
  }

  th,
  td {
    text-align: left;
    padding: 12px 14px;
    border-bottom: 1px solid rgba(148, 163, 184, 0.15);
  }

  th {
    position: sticky;
    top: 0;
    background: var(--table-head-bg, rgba(248, 250, 252, 0.96));
    backdrop-filter: blur(8px);
    font-size: 0.78rem;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: var(--muted-fg, #64748b);
  }

  td span {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 5px 9px;
    border-radius: 999px;
    font-size: 0.78rem;
    font-weight: 700;
  }

  .item-ok {
    background: var(--success-bg, rgba(220, 252, 231, 1));
    color: var(--success-fg, #166534);
  }

  .item-fail {
    background: var(--danger-bg, rgba(254, 226, 226, 1));
    color: var(--error-fg, #b91c1c);
  }

  @media (max-width: 1100px) {
    .shell {
      grid-template-columns: 1fr;
    }

    .hero {
      grid-template-columns: 1fr;
    }

    .chat-panel {
      min-height: auto;
    }
  }

  @media (max-width: 640px) {
    .page {
      padding: 14px;
    }

    .panel,
    .hero {
      padding: 18px;
    }

    .summary-grid {
      grid-template-columns: 1fr;
    }
  }
</style>
