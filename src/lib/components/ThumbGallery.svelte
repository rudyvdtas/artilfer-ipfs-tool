<script>
  const items = [
    { src: '/thumbs/first-supper-small.jpg', alt: 'First Supper' },
    { src: '/thumbs/the-cunegonde-dilemma-thumb.jpg', alt: 'The Cunégonde Dilemma' },
    { src: '/thumbs/grifters-thumb.jpg', alt: 'Grifters' },
    { src: '/thumbs/looking-for-satoshi-thumb.jpg', alt: 'Looking For Satoshi' },
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
    grid-template-columns: repeat(auto-fit, minmax(120px, 120px));
    gap: 12px;
    justify-content: start;
  }

  .gallery-grid > * {
    width: 120px;
  }

  .thumb-card {
    background: #fff8eb;
    border: 2px solid var(--color-border);
    border-radius: 14px;
    padding: 8px;
    box-shadow: var(--color-card-shadow);
    transition: transform 0.2s ease, box-shadow 0.2s ease;
    width: 100%;
    box-sizing: border-box;
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

  @media (min-width: 768px) {
    .gallery-grid {
      grid-template-columns: repeat(3, minmax(0, 1fr));
    }
    .thumb-card {
      padding: 10px;
    }
  }

  @media (max-width: 480px) {
    .gallery-grid {
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 8px;
    }
    .thumb-card {
      padding: 6px;
    }
  }
</style>
