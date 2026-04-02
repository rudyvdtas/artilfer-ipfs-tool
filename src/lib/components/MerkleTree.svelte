<!--
  MerkleTree.svelte — Collapsible tree visualization of parent→child CID relations
  Svelte 5 component using $props() runes and recursive {#snippet} rendering.
-->
<script>
  /** @type {{ tree: import('$lib/server/ipfs/scanner.js').TreeNode[], maxExpanded?: number }} */
  let { tree = [], maxExpanded = 50 } = $props()

  // Build lookup: id → node
  let nodeMap = $derived(new Map(tree.map(n => [n.id, n])))

  // Root nodes: those without a parent in the tree
  let roots = $derived(tree.filter(n => n.parentId === null))

  // Track expanded state
  let expanded = $state(new Set())
  let initialized = $state(false)

  $effect(() => {
    if (tree.length && !initialized) {
      const toExpand = tree.slice(0, maxExpanded).filter(n => n.children?.length > 0).map(n => n.id)
      expanded = new Set(toExpand)
      initialized = true
    }
  })

  function toggle(id) {
    if (expanded.has(id)) {
      expanded.delete(id)
    } else {
      expanded.add(id)
    }
    expanded = new Set(expanded)
  }

  function shortCid(cid) {
    if (!cid) return ''
    return cid.length > 16 ? `${cid.slice(0, 8)}...${cid.slice(-6)}` : cid
  }

  function prettySize(bytes) {
    if (bytes === null || bytes === undefined) return ''
    if (bytes < 1024) return `${bytes} B`
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
    return `${(bytes / 1024 / 1024).toFixed(1)} MB`
  }

  function kindIcon(kind) {
    if (kind === 'json') return '📄'
    if (kind === 'html') return '🌐'
    if (kind === 'text') return '📝'
    return '📦'
  }
</script>

{#snippet treeNode(node, depth)}
  <div class="tree-row">
    <div class="tree-indent" style="padding-left: {depth * 20}px">
      {#if node.children?.length > 0}
        <button class="tree-toggle" onclick={() => toggle(node.id)} aria-label="Toggle">
          {expanded.has(node.id) ? '▼' : '▶'}
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
      {#if node.status !== 'ok'}
        <span class="tree-error" title={node.notes}>⚠️</span>
      {/if}
    </div>
  </div>

  {#if expanded.has(node.id) && node.children?.length > 0}
    {#each node.children as childId (childId)}
      {@const child = nodeMap.get(childId)}
      {#if child}
        {@render treeNode(child, depth + 1)}
      {/if}
    {/each}
  {/if}
{/snippet}

<div class="merkle-tree">
  {#each roots as node (node.id)}
    {@render treeNode(node, 0)}
  {/each}
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
