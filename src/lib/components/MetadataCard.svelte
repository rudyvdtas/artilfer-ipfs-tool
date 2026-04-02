<!--
  MetadataCard.svelte — Display title, artist(s), description, totals, preview image
-->
<script>
  /** @type {{ title: string, artists: string, description: string, image: string | null }} */
  export let metadata = { title: '', artists: '', description: '', image: null }

  /** @type {{ totalFiles: number, totalSize: number, successCount: number, failCount: number }} */
  export let summary = { totalFiles: 0, totalSize: 0, successCount: 0, failCount: 0 }

  /** @type {string} */
  export let rootCid = ''

  function prettySize(bytes) {
    if (!bytes) return '0 B'
    if (bytes < 1024) return `${bytes} B`
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
    return `${(bytes / 1024 / 1024).toFixed(1)} MB`
  }

  function shortCid(cid) {
    if (!cid) return ''
    return cid.length > 20 ? `${cid.slice(0, 10)}...${cid.slice(-8)}` : cid
  }

  function resolveImageUrl(image) {
    if (!image) return null
    if (image.startsWith('http')) return image
    if (image.startsWith('ipfs://')) {
      const rest = image.slice('ipfs://'.length)
      return `https://w3s.link/ipfs/${rest}`
    }
    // Bare CID
    if (/^(bafy|Qm)/i.test(image)) {
      return `https://w3s.link/ipfs/${image}`
    }
    return null
  }

  $: imageUrl = resolveImageUrl(metadata?.image)
</script>

<div class="metadata-card">
  <div class="card-content">
    {#if imageUrl}
      <div class="card-image">
        <img src={imageUrl} alt={metadata.title || 'Preview'} loading="lazy" />
      </div>
    {/if}

    <div class="card-info">
      <h2 class="card-title">
        {metadata.title || 'Untitled Collection'}
      </h2>

      {#if metadata.artists}
        <p class="card-artists">by {metadata.artists}</p>
      {/if}

      {#if metadata.description}
        <p class="card-description">{metadata.description}</p>
      {/if}

      <div class="card-stats">
        <div class="stat">
          <span class="stat-value">{summary.totalFiles}</span>
          <span class="stat-label">files</span>
        </div>
        <div class="stat">
          <span class="stat-value">{prettySize(summary.totalSize)}</span>
          <span class="stat-label">total</span>
        </div>
        <div class="stat">
          <span class="stat-value">{summary.successCount}</span>
          <span class="stat-label">ok</span>
        </div>
        {#if summary.failCount > 0}
          <div class="stat stat-fail">
            <span class="stat-value">{summary.failCount}</span>
            <span class="stat-label">failed</span>
          </div>
        {/if}
      </div>

      <div class="card-cid" title={rootCid}>
        Root: <code>{shortCid(rootCid)}</code>
      </div>
    </div>
  </div>
</div>

<style>
  .metadata-card {
    border: 1px solid var(--color-border, #e2e8f0);
    border-radius: var(--radius-md, 16px);
    background: var(--color-bg-surface, rgba(255,255,255,0.8));
    overflow: hidden;
  }

  .card-content {
    display: flex;
    gap: 1.25rem;
    padding: 1.25rem;
  }

  .card-image {
    flex-shrink: 0;
    width: 120px;
    height: 120px;
    border-radius: var(--radius-sm, 8px);
    overflow: hidden;
    background: var(--color-bg-soft, #f1f5f9);
  }

  .card-image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .card-info {
    flex: 1;
    min-width: 0;
  }

  .card-title {
    font-size: 1.15rem;
    font-weight: 600;
    margin: 0 0 0.25rem 0;
    color: var(--color-fg, #0f172a);
  }

  .card-artists {
    font-size: 0.9rem;
    color: var(--color-fg-soft, #64748b);
    margin: 0 0 0.5rem 0;
  }

  .card-description {
    font-size: 0.85rem;
    color: var(--color-fg-soft, #64748b);
    margin: 0 0 0.75rem 0;
    line-height: 1.4;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  .card-stats {
    display: flex;
    gap: 1rem;
    margin-bottom: 0.5rem;
  }

  .stat {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .stat-value {
    font-size: 1rem;
    font-weight: 600;
    color: var(--color-fg, #0f172a);
  }

  .stat-label {
    font-size: 0.7rem;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: var(--color-fg-soft, #94a3b8);
  }

  .stat-fail .stat-value {
    color: #ef4444;
  }

  .card-cid {
    font-size: 0.78rem;
    color: var(--color-fg-soft, #64748b);
  }

  .card-cid code {
    font-family: var(--font-mono, monospace);
    background: var(--color-bg-soft, #f1f5f9);
    padding: 0.1em 0.4em;
    border-radius: 4px;
    font-size: 0.78rem;
  }

  @media (max-width: 640px) {
    .card-content {
      flex-direction: column;
    }
    .card-image {
      width: 100%;
      height: 180px;
    }
  }
</style>
