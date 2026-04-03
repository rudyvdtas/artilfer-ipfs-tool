<!--
  MerkleTree.svelte — Collapsible tree visualization of parent→child CID relations.

  Accepts the scanner's native output:
    nodes   → Record<canonical, ScanNode>  (keyed by "ipfs://CID/path")
    rootCid → string  (bare CID of the root)

  ScanNode.children is an array of canonical strings (keys into nodes).
-->
<script>
  /**
   * @type {{
   *   nodes: Record<string, import('$lib/server/ipfs/scanner.js').ScanNode>,
   *   rootCid: string,
   *   maxExpanded?: number
   * }}
   */
  let { nodes = {}, rootCid = '', maxExpanded = 50 } = $props()

  // Derive a flat list for initialization convenience
  let nodeList = $derived(Object.values(nodes))

  // Root node: the node whose canonical key starts with the rootCid and has depth 0
  let rootCanonical = $derived(
    nodeList.find(n => n.cid === rootCid && n.depth === 0)?.canonical ?? ''
  )

  // Track expanded state (keyed by canonical)
  let expanded = $state(new Set())
  let initialized = $state(false)

  $effect(() => {
    if (nodeList.length && !initialized) {
      const toExpand = nodeList
        .slice(0, maxExpanded)
        .filter(n => n.children?.length > 0)
        .map(n => n.canonical)
      expanded = new Set(toExpand)
      initialized = true
    }
  })

  function toggle(canonical) {
    const next = new Set(expanded)
    next.has(canonical) ? next.delete(canonical) : next.add(canonical)
    expanded = next
  }

  function shortCid(cid) {
    if (!cid) return ''
    return cid.length > 16 ? `${cid.slice(0, 8)}...${cid.slice(-6)}` : cid
  }

  function prettySize(bytes) {
    if (!bytes) return ''
    if (bytes < 1024) return `${bytes} B`
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
    return `${(bytes / 1024 / 1024).toFixed(1)} MB`
  }

  function kindIcon(kind) {
    if (kind === 'json')   return '📄'
    if (kind === 'html')   return '🌐'
    if (kind === 'text')   return '📝'
    if (kind === 'binary') return '🖼'
    return '📦'
  }
</script>

{#snippet treeNode(canonical, depth)}
  {@const node = nodes[canonical]}
  {#if node}
    <div class="tree-row">
      <div class="tree-indent" style="padding-left: {depth * 20}px">
        {#if node.children?.length > 0}
          <button class="tree-toggle" onclick={() => toggle(canonical)} aria-label="Toggle">
            {expanded.has(canonical) ? '▼' : '▶'}
          </button>
        {:else}
          <span class="tree-leaf">─</span>
        {/if}

        <span class="tree-icon">{kindIcon(node.kind)}</span>
        <span class="tree-name" title={node.canonical}>
          {node.name || node.cid}
        </span>
        <span class="tree-cid" title={node.cid}>{shortCid(node.cid)}</span>
        {#if node.size}
          <span class="tree-size">{prettySize(node.size)}</span>
        {/if}
        {#if node.error}
          <span class="tree-error" title={node.error}>⚠️</span>
        {/if}
      </div>
    </div>

    {#if expanded.has(canonical) && node.children?.length > 0}
      {#each node.children as childCanonical (childCanonical)}
        {@render treeNode(childCanonical, depth + 1)}
      {/each}
    {/if}
  {/if}
{/snippet}

<div class="merkle-tree">
  {#if rootCanonical}
    {@render treeNode(rootCanonical, 0)}
  {:else}
    {#each nodeList.filter(n => n.depth === 0) as node (node.canonical)}
      {@render treeNode(node.canonical, 0)}
    {/each}
  {/if}
</div>

<style>
  .merkle-tree {
    font-family: var(--font-mono, monospace);
    font-size: 0.82rem;
    line-height: 1.6;
    max-height: 400px;
    overflow-y: auto;
    border: 1px solid var(--color-border, #e2e8f0);
    border-radius: var(--radius-sm, 8px);
    padding: 0.5rem;
    background: var(--color-bg-soft, #f8fafc);
  }

  .tree-row {
    display: flex;
    align-items: center;
    gap: 0.25rem;
    white-space: nowrap;
  }

  .tree-row:hover {
    background: rgba(148, 163, 184, 0.08);
    border-radius: 4px;
  }

  .tree-indent {
    display: flex;
    align-items: center;
    gap: 0.35rem;
    width: 100%;
    overflow: hidden;
  }

  .tree-toggle {
    background: none;
    border: none;
    cursor: pointer;
    padding: 0 2px;
    font-size: 0.7rem;
    color: var(--color-fg-soft, #64748b);
    min-width: 1rem;
    text-align: center;
  }

  .tree-toggle:hover {
    color: var(--color-fg, #0f172a);
  }

  .tree-leaf {
    min-width: 1rem;
    text-align: center;
    color: var(--color-border-strong, #94a3b8);
    font-size: 0.7rem;
  }

  .tree-icon {
    flex-shrink: 0;
  }

  .tree-name {
    font-weight: 500;
    overflow: hidden;
    text-overflow: ellipsis;
    color: var(--color-fg, #0f172a);
  }

  .tree-cid {
    color: var(--color-fg-soft, #64748b);
    font-size: 0.75rem;
    flex-shrink: 0;
  }

  .tree-size {
    color: var(--color-fg-soft, #64748b);
    font-size: 0.75rem;
    margin-left: auto;
    flex-shrink: 0;
  }

  .tree-error {
    flex-shrink: 0;
  }
</style>
