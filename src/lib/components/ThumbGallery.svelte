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
          <img 
            src={item.src} 
            alt={item.alt} 
            class="thumb-image"
            loading="lazy"
            decoding="async"
          />
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
    grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
    gap: 12px;
  }

  .thumb-card {
    background: #fff8eb;
    border: 2px solid var(--color-border);
    border-radius: 14px;
    padding: 8px;
    box-shadow: var(--color-card-shadow);
    transition: transform 0.2s ease, box-shadow 0.2s ease;
  }

  .thumb-card:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(15,23,42,0.12);
  }

  .thumb-image-wrap {
    aspect-ratio: 1 / 1;
    border-radius: 10px;
    overflow: hidden;
    background: rgba(148,163,184,0.12);
    width: 100%;
  }

  .thumb-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
    image-rendering: -webkit-optimize-contrast;
  }

  /* ─── Tablet (768px and above) ─── */
  @media (min-width: 768px) {
    .gallery-grid {
      grid-template-columns: repeat(3, minmax(0, 1fr));
    }
    .thumb-card {
      padding: 10px;
    }
  }

  /* ─── Mobile (500px and below) ─── */
  @media (max-width: 500px) {
    .gallery-grid {
      grid-template-columns: repeat(auto-fit, minmax(80px, 1fr));
      gap: 8px;
    }
    .thumb-card {
      padding: 6px;
    }
  }

  /* ─── Small Mobile (320px) ─── */
  @media (max-width: 360px) {
    .gallery-grid {
      grid-template-columns: repeat(2, 1fr);
      gap: 8px;
    }
  }
</style>
