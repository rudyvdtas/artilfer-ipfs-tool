<script>
  const items = [
    { src: '/images/pinned-placeholder-1.jpg', alt: 'Gearchiveerd project 1' },
    { src: '/images/pinned-placeholder-2.jpg', alt: 'Gearchiveerd project 2' },
    { src: '/images/pinned-placeholder-3.jpg', alt: 'Gearchiveerd project 3' },
  ]
</script>

<div class="gallery-shell">
  <div class="gallery-grid" aria-label="Gearchiveerde en gepinde projecten">
    {#each items as item}
      <div class="thumb-card">
        <div class="thumb-image-wrap">
          <img src={item.src} alt={item.alt} class="thumb-image" />
        </div>
      </div>
    {/each}
  </div>
</div>

<style>
  .gallery-shell {
    display: flex;
    flex-direction: column;
    gap: 14px;
  }

  .gallery-grid {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 12px;
  }

  .thumb-card {
    background: #fff8eb;
    border: 2px solid var(--color-border);
    border-radius: 14px;
    padding: 10px;
    box-shadow: var(--color-card-shadow);
  }

  .thumb-image-wrap {
    aspect-ratio: 1 / 1;
    border-radius: 10px;
    overflow: hidden;
    background: rgba(148,163,184,0.12);
  }

  .thumb-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }

  @media (max-width: 700px) {
    .gallery-grid {
      grid-template-columns: 1fr;
    }
  }
</style>
