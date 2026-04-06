<!--
  IPFS Archive Wizard
  Step 1: Enter CID → scan
  Step 2: Show metadata, merkle tree, summary
  Step 3: Choose export format (manifest.json, .csv, .car)
-->
<script>
  import MetadataCard from '$lib/components/MetadataCard.svelte'
  import MerkleTree from '$lib/components/MerkleTree.svelte'
  import NFTChecker from '$lib/components/NFTChecker.svelte'
  import DirectCIDScan from '$lib/components/DirectCIDScan.svelte'
  import ThumbGallery from '$lib/components/ThumbGallery.svelte'
  let donateOpen = false
  let mobileMenuOpen = false

  const donateAddress = async (value) => {
    try {
      await navigator.clipboard.writeText(value)
    } catch {
      // ignore clipboard failures
    }
  }

  const closeMobileMenu = () => {
    mobileMenuOpen = false
  }

  const toggleDonate = () => {
    donateOpen = !donateOpen
  }

  const icons = {
    nft: '👤',
    scan: '🔍',
    about: '❓',
    pinned: '📌',
  }

  const navItems = [
    { key: 'index', label: 'Indexer', icon: '📚' },
    { key: 'pinned', label: 'Pinned', icon: icons.pinned },
    { key: 'nft-checker', label: 'NFT Wallet Checker', icon: icons.nft },
    { key: 'scanner', label: 'Direct CID Scan', icon: icons.scan },
    { key: 'about', label: 'About', icon: icons.about },
  ]

  const socialLinks = [
    {
      href: 'https://x.com/artfilterio',
      label: '@artfilterio',
      icon: '/icons/x-logo.svg',
    },
    {
      href: 'https://x.com/rutgervandertas',
      label: '@rutgervandertas',
      icon: '/icons/x-logo.svg',
    },
  ]

  const pinnedProjects = [
    {
      title: 'First Supper',
      thumb: '/thumbs/first-supper-small.jpg',
      ipfsUrl: 'https://ipfs.io/ipfs/bafybeigfi7lhhgtmwavftjr4wkz47pljq5xk5wsbxvjrlycjxbzdwgesxm/',
      links: [
        { href: 'https://ipfs.io/ipfs/bafybeigfi7lhhgtmwavftjr4wkz47pljq5xk5wsbxvjrlycjxbzdwgesxm/', label: 'IPFS' },
        { href: 'https://www.async.art/v2/0?referrer=masters', label: 'ASYNC V2' },
      ],
    },
    {
      title: 'The Cunégonde Dilemma',
      thumb: '/thumbs/the-cunegonde-dilemma-thumb.jpg',
      ipfsUrl: 'https://ipfs.io/ipfs/QmUVaaE39kcdnU5G91xFQEyfeMcW8qYSjLyXoiru14q6mH',
      links: [
        { href: 'https://ipfs.io/ipfs/QmUVaaE39kcdnU5G91xFQEyfeMcW8qYSjLyXoiru14q6mH', label: 'IPFS' },
        { href: 'https://www.async.art/v2/3?referrer=masters', label: 'ASYNC V2' },
      ],
    },
  ]

  const indexEntries = [
    {
      rootCid: 'Qmd4GTGvQw2HvfYactmEqw1rdiYeP2Ht3CitZeh1iXFnyw',
      project: 'Looking For Satoshi',
      artists: 'Rutger van der Tas',
      platform: 'ASYNC.ART',
      thumb: '/thumbs/looking-for-satoshi-thumb.jpg',
      ipfsUrl: 'https://ipfs.io/ipfs/Qmd4GTGvQw2HvfYactmEqw1rdiYeP2Ht3CitZeh1iXFnyw',
      openSeaUrl: 'https://opensea.io/collection/looking-for-satoshi',
    },
    {
      rootCid: 'QmQEQYguTJ4ApkCJ8J5wSMGFfgZLP5Xz4w7yGArFdHkVjr',
      project: 'GRIFTERS',
      artists: 'XCOPY',
      platform: 'ASYNC.ART',
      thumb: '/thumbs/grifters-thumb.jpg',
      ipfsUrl: 'https://ipfs.io/ipfs/QmQEQYguTJ4ApkCJ8J5wSMGFfgZLP5Xz4w7yGArFdHkVjr',
      openSeaUrl: 'https://opensea.io/collection/grifters-by-xcopy',
    },
    {
      rootCid: 'Qmaje8byBxmFTHDjCvDYLy1NPZkUX1Etx1agDw5HxNqtef',
      project: 'First Supper',
      artists: 'Shortcut, Josie Bellini, Sparrow (Digitial), Mlibty, Vans Design, Alotta Money, Twisted Vacancy, Coldie, Hackatao, XCOPY, Matt Kane, Rutger van der Tas, and DIGITAL.',
      platform: 'ASYNC.ART',
      thumb: '/thumbs/first-supper-small.jpg',
      ipfsUrl: 'https://ipfs.io/ipfs/Qmaje8byBxmFTHDjCvDYLy1NPZkUX1Etx1agDw5HxNqtef',
      asyncUrl: 'https://www.async.art/v2/0?referrer=masters',
      openSeaUrl: 'https://opensea.io/item/ethereum/0xb6dae651468e9593e4581705a09c10a76ac1e0c8/0',
    },
    {
      rootCid: 'QmUVaaE39kcdnU5G91xFQEyfeMcW8qYSjLyXoiru14q6mH',
      project: 'The Cunégonde Dilemma',
      artists: 'Alotta Money',
      platform: 'ASYNC.ART',
      thumb: '/thumbs/the-cunegonde-dilemma-thumb.jpg',
      ipfsUrl: 'https://ipfs.io/ipfs/QmUVaaE39kcdnU5G91xFQEyfeMcW8qYSjLyXoiru14q6mH',
      asyncUrl: 'https://www.async.art/v2/3?referrer=masters',
      openSeaUrl: 'https://opensea.io/item/ethereum/0xb6dae651468e9593e4581705a09c10a76ac1e0c8/23',
    },
  ]

  // ─── Tab state ────────────────────────────────────────

  /** @type {'index' | 'scanner' | 'nft-checker' | 'about' | 'pinned'} */
  let activeTab = 'pinned'
</script>

<svelte:head>
  <title>ARTFILTER</title>
  <meta name="description" content="Artfilter.io helps collectors consolidate their NFT collection into a Cultural Preservation Manifest for archiving and preservation — independent of marketplaces." />
</svelte:head>

<div class="page" role="main">
  <div class="shell">

    <!-- ── Header ─────────────────────────────────── -->
    <header class="header">
      <div class="header-brand">
        <div class="brand-row brand-mark header-brand-row">
          <img src="/icons/favicon.svg" alt="" aria-hidden="true" class="brand-logo brand-logo-glow" />
          <div class="header-brand-copy">
            <span class="brand-title">ARTfilter</span>
            <h1 class="header-tagline">Preservation starts with taking responsibility.</h1>
          </div>
        </div>
      </div>

      <div class="donate-header-wrap">
        <button class="donate-circle" type="button" onclick={toggleDonate} aria-expanded={donateOpen} aria-label="Donate information tonen">
          <span class="donate-circle-icon">❤️</span>
        </button>
        <span class="donate-label">donate</span>

        {#if donateOpen}
          <div class="donate-overlay" role="presentation" onclick={() => (donateOpen = false)}>
            <div class="donate-popover" role="dialog" aria-modal="true" aria-label="Donate information">
            <button class="donate-close" type="button" onclick={() => (donateOpen = false)} aria-label="Close donate popup">×</button>
            <p>Support the project via ETH or Tezos.</p>
            <div class="support-row">
              <div>
                <strong>ETH</strong>
                <code>0x04820b814361926b1d29c159c0755adb96bb2713</code>
              </div>
              <button type="button" class="copy-btn" onclick={() => donateAddress('0x04820b814361926b1d29c159c0755adb96bb2713')}>Copy</button>
            </div>
            <div class="support-row">
              <div>
                <strong>TEZ</strong>
                <code>tz2DyCi5fFjzwPePL1WE4TYENuPHH7nAuu43</code>
              </div>
              <button type="button" class="copy-btn" onclick={() => donateAddress('tz2DyCi5fFjzwPePL1WE4TYENuPHH7nAuu43')}>Copy</button>
            </div>
            </div>
          </div>
        {/if}
      </div>
    </header>

    <!-- ── Tabs ───────────────────────────────────── -->
    <nav class="tabs" aria-label="Navigatie">
      {#each navItems as item}
        <button class="tab" class:active={activeTab === item.key} onclick={() => { activeTab = item.key; closeMobileMenu(); }}>
          <span class="tab-icon">{item.icon}</span>
          <span>{item.label}</span>
        </button>
      {/each}
    </nav>

    <nav class="mobile-tabbar" aria-label="Mobiele navigatie">
      {#each navItems as item}
        <button class="mobile-tabbar-item" class:active={activeTab === item.key} onclick={() => { activeTab = item.key; }}>
          <span class="tab-icon">{item.icon}</span>
          <span>{item.label}</span>
        </button>
      {/each}
    </nav>

    <!-- ── Tab: Index ───────────────────────── -->
    {#if activeTab === 'index'}
      <div class="step index-page">
        <div class="index-hero">
          <h2>Index</h2>
          <p>
            Browse ROOTCIDS to archive pieces independently.
          </p>
          <div class="hero-cta-row">
            <span class="hero-cta-circle" aria-hidden="true"></span>
            <span class="hero-cta-subtext">Need help? Reach out.</span>
          </div>
        </div>

        <section class="index-grid">
          {#each indexEntries as entry}
            <article class="index-tile">
              <a href={`https://ipfs.io/ipfs/${entry.rootCid}`} target="_blank" rel="noopener noreferrer" class="index-thumb-link" aria-label={entry.project + ' IPFS'}>
                <img src={entry.thumb} alt={entry.project + ' index thumb'} class="index-thumb" />
              </a>
              <div class="index-tile-meta">
                <h3>{entry.project}</h3>
                <span>{entry.platform}</span>
              </div>
              <div class="index-links">
                <a href={entry.ipfsUrl} target="_blank" rel="noopener noreferrer">IPFS</a>
                {#if entry.asyncUrl}
                  <a href={entry.asyncUrl} target="_blank" rel="noopener noreferrer">ASYNC V2</a>
                {/if}
                <a href={entry.openSeaUrl} target="_blank" rel="noopener noreferrer">OpenSea</a>
              </div>
            </article>
          {/each}
        </section>
      </div>
    {/if}

    <!-- ── Tab: Pinned ───────────────────────── -->
    {#if activeTab === 'pinned'}
      <div class="step pinned-page">
        <div class="pinned-hero">
          <div class="pinned-hero-copy">
            <h2>Pinned by ARTfilter</h2>
            <p>
              Curated archive entries preserved for stable reference.
            </p>
            <div class="hero-cta-row">
              <span class="hero-cta-circle" aria-hidden="true"></span>
              <span class="hero-cta-subtext">For requests or questions</span>
            </div>
          </div>
        </div>

        <section class="pinned-gallery">
          {#each pinnedProjects as project}
            <article class="index-tile pinned-tile">
              <a href={project.ipfsUrl} target="_blank" rel="noopener noreferrer" class="index-thumb-link" aria-label={project.title + ' IPFS'}>
                <img src={project.thumb} alt={project.title + ' pinned archive thumb'} class="index-thumb" />
              </a>
              <div class="index-tile-meta">
                <h3>{project.title}</h3>
                <span>PINNED</span>
              </div>
              <div class="index-links">
                {#each project.links as link}
                  <a href={link.href} target="_blank" rel="noopener noreferrer">{link.label}</a>
                {/each}
              </div>
            </article>
          {/each}
        </section>
      </div>
    {/if}

    <!-- ── Tab: About ───────────────────────── -->
    {#if activeTab === 'about'}
      <div class="step about-page">
        <div class="about-hero">
          <div class="brand-row brand-mark">
            <img src="/icons/favicon.svg" alt="" aria-hidden="true" class="brand-logo brand-logo-glow" />
            <h2 class="brand-title">ARTfilter</h2>
          </div>

        </div>

        <section class="about-section">
          <h3>Our approach</h3>
          <p>
            Artfilter doesn't claim ownership, judge value, or promise permanence. We're optimizing for continuity, not engagement. Curation is human. Preservation is collaborative.
          </p>
          <p>
            By making curation explicit and references portable, collectors and curators can carry digital art forward together.
          </p>
        </section>

        <section class="about-section">
          <h3>Why this matters</h3>
          <p>
            Blockchain ownership doesn't guarantee files are stored safely. Many NFTs point to IPFS—which is unreliable without active redundancy. Artfilter maps where and how your NFTs technically exist, so you can archive responsibly.
          </p>
          <p>
            Digital art only survives if we collectively preserve it.
          </p>
        </section>

        <section class="about-section">
          <h3>How to use</h3>
          <ul>
            <li>Enter your wallet address (0x…, tz…, KT1…, ENS or Tezos Domains)</li>
            <li>Browse your collection</li>
            <li>Select items and add them to your archive</li>
            <li>Export as manifest.json and ready2pin.csv. Upload to Pinata to create redundancy.</li>
          </ul>
        </section>

        <section class="about-section">
          <h3>Pinned collections</h3>
          <p>
            Artfilter has curated and pinned key collections for preservation. Browse the gallery or explore ROOTCIDS in the Indexer to archive them yourself or contribute to redundancy.
          </p>
          <div class="about-actions">
            <button class="about-link" type="button" onclick={() => (activeTab = 'pinned')}>View gallery</button>
            <button class="about-link" type="button" onclick={() => (activeTab = 'index')}>Indexer</button>
            <button class="about-link donate-link" type="button" onclick={toggleDonate}>Donate</button>
          </div>
        </section>

        <section class="about-section">
          <h3>Questions or requests?</h3>
          <p>
            Reach out on Twitter or send a DM. I'm here to help.
          </p>
        </section>
      </div>
    {/if}

    <!-- ── Tab: NFT Checker ───────────────────────── -->
    {#if activeTab === 'nft-checker'}
      <div class="step nft-checker-page">
        <div class="checker-shell">
          <NFTChecker />
        </div>
      </div>
    {/if}

    <!-- ── Tab: CID Scanner ───────────────────────── -->
    {#if activeTab === 'scanner'}
      <div class="step scanner-page">
        <div class="checker-shell">
          <DirectCIDScan />
        </div>
      </div>
    {/if}

    <footer class="footer">
      <div class="footer-main">© 2026 ARTFILTER by RutgervanderTas · <a href="mailto:info@artfilter.io">info@artfilter.io</a></div>
      <div class="footer-socials">
        {#each socialLinks as social}
          <a href={social.href} target="_blank" rel="noopener noreferrer" class="social-link" aria-label={social.label}>
            <img src={social.icon} alt="" aria-hidden="true" class="social-icon" />
            <span>{social.label}</span>
          </a>
        {/each}
      </div>
    </footer>

  </div>
</div>

<style>
  /* ─── Layout ─────────────────────────────────────── */

  :global(:root) {
    --space-card-mobile: 14px;
    --space-card-tablet: 20px;
    --space-card-desktop: 28px;
  }

  .page {
    min-height: 100vh;
    padding: 24px 20px 88px;
  }

  .shell {
    max-width: 100%;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    gap: 28px;
  }

  .header,
  .step,
  .tabs {
    border: 1px solid var(--border);
    box-shadow: var(--card-shadow);
  }

  .header,
  .step {
    background: var(--surface);
    color: color-mix(in srgb, var(--text) 80%, transparent);
  }

  .header,
  .step,
  .tabs {
    border-radius: var(--radius-md);
  }

  /* ─── Header ─────────────────────────────────────── */

  .header {
    padding: 18px 20px 14px;
    display: flex;
    justify-content: space-between;
    gap: 12px;
    align-items: flex-start;
    position: relative;
    isolation: isolate;
  }

  @media (max-width: 768px) {
    .header {
      flex-direction: row;
      align-items: flex-start;
      padding: 14px 12px 10px;
      gap: 8px;
    }

    .header-brand {
      min-width: 0;
      flex: 1;
    }

    .donate-header-wrap {
      align-self: flex-start;
      margin-top: 0;
      margin-right: 2px;
    }

    h1 {
      font-size: 1.15rem;
    }
  }

  .donate-header-wrap {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 6px;
    flex-shrink: 0;
    z-index: 9990;
    align-self: flex-start;
    margin-top: 0;
  }

  .donate-circle {
    width: 64px;
    height: 64px;
    border-radius: 50%;
    border: 2px solid rgba(240,161,74,0.35);
    background: #fff3df;
    cursor: pointer;
    display: grid;
    place-items: center;
  }

  @media (max-width: 500px) {
    .donate-circle {
      width: 38px;
      height: 38px;
    }

    .donate-label {
      display: none;
    }
  }

  .donate-circle-icon {
    font-size: 1rem;
    line-height: 1;
  }


  .donate-label {
    font-size: 0.78rem;
    font-weight: 700;
    text-transform: lowercase;
    color: #6a5747;
  }

  .donate-overlay {
    position: fixed;
    inset: 0;
    z-index: 10000;
    display: grid;
    place-items: center;
    background: rgba(15, 23, 42, 0.22);
    padding: 24px;
  }

  .donate-popover {
    position: relative;
    width: min(320px, calc(100vw - 40px));
    padding: 18px 14px 14px;
    border-radius: 14px;
    border: 1px solid var(--border);
    background: #ffffff;
    box-shadow: 0 18px 40px rgba(15,23,42,0.18);
    z-index: 10001;
    display: flex;
    flex-direction: column;
    gap: 10px;
    overflow: hidden;
  }

  .donate-close {
    position: absolute;
    top: 8px;
    right: 8px;
    border: 0;
    background: transparent;
    color: #64748b;
    font-size: 1.2rem;
    line-height: 1;
    cursor: pointer;
  }

  .donate-popover p {
    margin: 0;
    padding-right: 24px;
    color: #4f463f;
    line-height: 1.5;
  }

  .donate-popover .support-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    padding: 12px 0 0;
    border-top: 1px solid rgba(217,122,31,0.2);
    min-width: 0;
  }

  .donate-popover .support-row > div {
    min-width: 0;
    flex: 1;
  }

  .donate-popover .support-row code {
    display: block;
    word-break: break-all;
    overflow-wrap: anywhere;
    font-size: 0.74rem;
    line-height: 1.3;
  }

  .copy-btn {
    font-weight: 700;
    color: #0f172a;
    background: rgba(226,232,240,0.95);
    border: 0;
    border-radius: 999px;
    padding: 8px 12px;
    white-space: nowrap;
    cursor: pointer;
    flex-shrink: 0;
  }

  .brand-row {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 6px;
  }

  .header .brand-row {
    align-items: flex-start;
    gap: 12px;
  }

  .header-brand-row {
    justify-content: center;
    width: 100%;
    transform: translateY(8px);
    text-align: center;
  }

  .header-brand-copy {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    flex: 1;
  }

  .header .brand-logo {
    width: 32px;
    height: 32px;
    margin-top: 2px;
  }

  @media (max-width: 500px) {
    .header .brand-logo {
      width: 24px;
      height: 24px;
      margin-top: 0;
    }
  }

  .brand-logo {
    width: 24px;
    height: 24px;
    object-fit: contain;
  }

  .brand-logo-glow {
    filter: drop-shadow(0 0 10px rgba(255, 196, 140, 0.65))
      drop-shadow(0 0 24px rgba(255, 170, 92, 0.35));
  }

  .brand-mark {
    align-items: center;
  }

  .brand-title {
    font-size: 0.33em;
    text-transform: none;
    font-weight: 250;
    letter-spacing: 0.02em;
    line-height: 0.95;
    color: #1b140e;
  }

  .eyebrow {
    display: block;
    font-size: 0.72rem;
    font-weight: 700;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: color-mix(in srgb, #8a4f14 80%, transparent);
    margin-bottom: 6px;
  }

  .header .brand-title,
  .about-hero .brand-title {
    font-size: clamp(1.4rem, 4vw, 2rem);
    line-height: 1.05;
    font-weight: 450;
    letter-spacing: 0.04em;
    color: color-mix(in srgb, #1b140e 80%, transparent);
    text-transform: none;
  }

  .header-tagline {
    font-family: "Cormorant Garamond", "Iowan Old Style", "Palatino Linotype", Palatino, serif;
    font-style: italic;
    font-weight: 500;
    letter-spacing: 0.02em;
    color: color-mix(in srgb, #1b140e 80%, transparent);
    margin: 0;
  }

  h1 {
    font-size: clamp(1.4rem, 4vw, 2rem);
    font-weight: 300;
    margin: 0 0 8px;
    line-height: 1.1;
    color: color-mix(in srgb, #1b140e 80%, transparent);
  }

  @media (max-width: 500px) {
    h1 {
      font-size: 1.3rem;
      font-weight: 300;
    }

    .header-brand-copy {
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
      flex: 1;
    }

    .header-brand-row {
      gap: 18px;
      justify-content: center;
    }

    .header-tagline {
      display: none;
    }
  }


  /* ─── Wizard ─────────────────────────────────────── */

  .wizard {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  .step {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: var(--radius-md);
    padding: var(--space-card-mobile);
    display: flex;
    flex-direction: column;
    gap: 16px;
    box-shadow: var(--card-shadow);
  }

  @media (min-width: 480px) {
    .step {
      padding: var(--space-card-tablet);
    }
  }

  @media (min-width: 1024px) {
    .step {
      padding: var(--space-card-desktop);
    }
  }

  .step-label {
    display: flex;
    align-items: center;
    gap: 10px;
    font-weight: 600;
    font-size: 0.95rem;
    color: #0f172a;
  }

  .step-number {
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

  .about-page {
    gap: 20px;
  }

  .index-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 14px;
  }

  .index-tile {
    display: flex;
    flex-direction: column;
    gap: 10px;
    color: inherit;
    background: rgba(255,255,255,0.85);
    border: 1px solid rgba(148,163,184,0.22);
    border-radius: 20px;
    padding: 14px;
    box-shadow: 0 8px 32px rgba(15,23,42,0.06);
  }

  .index-thumb-link {
    display: block;
    text-decoration: none;
    color: inherit;
  }

  .index-thumb {
    width: 200px;
    height: 200px;
    max-width: 100%;
    border-radius: 12px;
    object-fit: cover;
    display: block;
    background: rgba(148,163,184,0.12);
  }

  .index-tile-meta {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  .index-tile-meta h3 {
    margin: 0;
    font-size: 1rem;
    color: #1b140e;
  }

  .index-tile-meta span {
    font-size: 0.72rem;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: #94a3b8;
  }

  .index-links {
    display: flex;
    gap: 6px;
    flex-wrap: wrap;
  }

  .index-links a {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    font-size: 0.68rem;
    font-weight: 700;
    color: #0f172a;
    text-decoration: none;
    background: rgba(226,232,240,0.9);
    border-radius: 999px;
    padding: 5px 8px;
    line-height: 1;
    letter-spacing: 0.01em;
    transition: background 0.15s ease, transform 0.12s ease;
  }

  .index-links a:hover {
    background: rgba(203,213,225,0.95);
    transform: translateY(-1px);
  }

  .nft-checker-page {
    padding: 22px;
  }

  .scanner-page {
    padding: 22px;
  }

  .checker-shell {
    width: 100%;
    margin: 0 auto;
  }

  .index-page,
  .pinned-page {
    gap: 18px;
  }

  .pinned-gallery {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 14px;
  }

  .pinned-tile {
    align-items: stretch;
  }

  .index-hero,
  .pinned-hero {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  .hero-cta-row {
    display: inline-flex;
    align-items: center;
    gap: 10px;
  }

  .hero-cta-circle {
    width: 18px;
    height: 18px;
    border-radius: 999px;
    background: #0F6E56;
    box-shadow:
      0 0 0 1px rgba(15, 110, 86, 0.22),
      0 6px 14px rgba(15, 110, 86, 0.28),
      0 0 18px rgba(15, 110, 86, 0.24);
    flex-shrink: 0;
    transition: background 0.15s ease, transform 0.15s ease, box-shadow 0.15s ease;
  }

  .hero-cta-row:hover .hero-cta-circle {
    background: #085041;
    transform: translateY(-1px);
    box-shadow:
      0 0 0 1px rgba(8, 80, 65, 0.26),
      0 8px 18px rgba(8, 80, 65, 0.34),
      0 0 22px rgba(8, 80, 65, 0.28);
  }

  .hero-cta-subtext {
    font-size: 0.8125rem;
    color: #6b7280;
  }

  .pinned-hero {
    align-items: center;
    text-align: center;
  }

  .pinned-hero-copy {
    max-width: 760px;
  }

  .pinned-hero p,
  .index-hero p {
    margin: 0;
    color: #6b7280;
    line-height: 1.5;
    font-size: 0.8125rem;
    max-width: 42rem;
  }

  .pinned-hero h2 {
    margin: 0;
    font-size: clamp(1.4rem, 3.6vw, 2rem);
  }

  .pinned-gallery .pinned-card {
    padding: 20px;
  }

  .pinned-gallery .project-thumb {
    width: 200px;
    height: 200px;
    border-radius: 12px;
    object-fit: cover;
    display: block;
    background: rgba(148,163,184,0.12);
  }

  .project-image {
    width: 100%;
    height: auto;
    max-height: 400px;
    border-radius: 12px;
    margin: 16px 0;
    object-fit: cover;
    image-rendering: -webkit-optimize-contrast;
  }

  @media (max-width: 500px) {
    .pinned-gallery {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }

    .pinned-gallery .project-thumb {
      width: 100%;
      height: auto;
      aspect-ratio: 1 / 1;
    }

    .pinned-title {
      font-size: 0.78rem;
    }
  }

  .button-group {
    display: flex;
    gap: 12px;
    margin-top: 12px;
  }

  .index-hero h2,
  .pinned-hero h2,
  .pinned-intro h2 {
    margin: 0;
    font-size: 18px;
    font-weight: 500;
    line-height: 1.15;
  }

  .index-hero p,
  .pinned-intro p {
    margin: 0;
    color: #4f463f;
    line-height: 1.7;
  }

  @media (max-width: 500px) {
    .button-group {
      flex-direction: column;
    }

    .index-grid {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }

    .index-tile {
      padding: 10px;
    }

    .index-thumb {
      width: 100%;
      height: auto;
      aspect-ratio: 1 / 1;
    }

    .index-tile-meta h3 {
      font-size: 0.82rem;
    }

    .index-links {
      gap: 5px;
    }

    .index-links a {
      font-size: 0.62rem;
      padding: 4px 7px;
    }
  }

  .badge-pill {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    width: fit-content;
    padding: 8px 12px;
    border-radius: 999px;
    border: 2px solid rgba(240,161,74,0.35);
    background: #fff3df;
    color: #1b140e;
    font-size: 0.82rem;
    font-weight: 700;
  }

  .badge-emoji {
    font-size: 1rem;
    line-height: 1;
  }

  .about-hero {
    padding-bottom: 4px;
    border-bottom: 1px solid rgba(217,122,31,0.35);
  }

  .pinned-page {
    gap: 16px;
  }

  .about-hero,
  .about-section {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .about-hero h2 {
    margin: 0;
    font-size: clamp(1.5rem, 4vw, 2.2rem);
  }

  .about-section p,
  .about-section li {
    color: #4f463f;
    line-height: 1.7;
    margin: 0;
  }

  .about-section h3 {
    margin: 0;
    font-size: 1rem;
    color: color-mix(in srgb, #1b140e 80%, transparent);
    text-transform: uppercase;
    letter-spacing: 0.08em;
  }

  .about-section ul {
    margin: 0;
    padding-left: 20px;
    display: grid;
    gap: 8px;
  }

  .about-actions {
    display: flex;
    gap: 10px;
    flex-wrap: wrap;
  }

  .about-link {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border: 1px solid rgba(15, 110, 86, 0.28);
    background: rgba(15, 110, 86, 0.08);
    color: #0F6E56;
    border-radius: 999px;
    padding: 8px 12px;
    font-size: 0.82rem;
    font-weight: 700;
    text-decoration: none;
    cursor: pointer;
    transition: background 0.15s ease, transform 0.15s ease, border-color 0.15s ease;
  }

  .about-link:hover {
    background: rgba(15, 110, 86, 0.14);
    border-color: rgba(8, 80, 65, 0.36);
    transform: translateY(-1px);
  }

  .donate-link {
    background: rgba(15, 110, 86, 0.12);
  }

  .step-description {
    font-size: 0.9rem;
    color: #64748b;
    line-height: 1.5;
    margin: 0 0 8px;
  }





  .tab-icon {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    font-size: 1.1rem;
    line-height: 1;
    flex-shrink: 0;
  }

  /* ─── Buttons ────────────────────────────────────── */

  .btn {
    border: none;
    border-radius: 999px;
    padding: 10px 18px;
    font-weight: 600;
    font-size: 0.88rem;
    cursor: pointer;
    transition: transform 0.12s, opacity 0.12s;
    white-space: nowrap;
    flex-shrink: 0;
  }

  .btn:hover:not(:disabled) {
    transform: translateY(-1px);
  }

  .btn:disabled {
    opacity: 0.45;
    cursor: not-allowed;
    transform: none;
  }

  .btn-primary {
    background: #0f172a;
    color: white;
    box-shadow: 0 8px 24px rgba(15,23,42,0.18);
  }

  .btn-secondary {
    background: rgba(226,232,240,0.9);
    color: #0f172a;
  }

  .btn-ghost {
    background: transparent;
    color: #64748b;
    padding: 6px 12px;
    font-size: 0.8rem;
    margin-left: auto;
  }

  .btn-ghost:hover:not(:disabled) {
    color: #0f172a;
    transform: none;
  }

  .btn-small {
    font-size: 0.78rem;
    padding: 6px 14px;
  }

  /* ─── Tabs ───────────────────────────────────────── */

  .tabs {
    display: flex;
    gap: 4px;
    border: 1px solid var(--border);
    padding: 8px;
    background: var(--surface);
    box-shadow: var(--card-shadow);
    position: relative;
    align-items: center;
    border-radius: var(--radius-md);
    overflow: hidden;
    margin-top: -10px;
  }

  .tabs-desktop {
    display: flex;
    gap: 4px;
    width: 100%;
  }

  .mobile-tabbar {
    display: none;
  }

  .tabs-desktop > .tab {
    border: 1px solid var(--border-strong);
    background: var(--surface-muted);
  }

  .mobile-tabbar-item {
    border: none;
    background: transparent;
    cursor: pointer;
    color: var(--text-muted);
    display: inline-flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 4px;
    font-size: 0.72rem;
    padding: 8px 6px;
    flex: 1;
    min-width: 0;
  }

  .mobile-tabbar-item.active {
    color: var(--text);
    font-weight: 700;
  }

  .footer {
    display: flex;
    justify-content: space-between;
    gap: 16px;
    align-items: center;
    flex-wrap: wrap;
    padding: 8px 4px 0;
    color: #6a5747;
    font-size: 0.9rem;
  }

  .footer a {
    color: inherit;
    text-decoration: none;
    font-weight: 700;
  }

  .footer a:hover {
    text-decoration: underline;
  }

  .footer-socials {
    display: inline-flex;
    gap: 12px;
    align-items: center;
  }

  .social-link {
    display: inline-flex;
    align-items: center;
    gap: 8px;
  }

  .social-icon {
    width: 18px;
    height: 18px;
    display: block;
  }

  .tab {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 10px 16px;
    border: 1px solid var(--border-strong);
    background: var(--surface-muted);
    cursor: pointer;
    font-size: 0.88rem;
    font-weight: 500;
    color: var(--text-muted);
    border-radius: 12px;
    transition: transform 0.12s, border-color 0.15s, background 0.15s, color 0.15s;
    white-space: nowrap;
    box-sizing: border-box;
  }

  .donate-tab {
    background: #fff3df;
    border-color: rgba(240,161,74,0.35);
  }

  .donate-tab-icon {
    line-height: 1;
  }

  .tab:hover {
    color: var(--text);
    transform: translateY(-1px);
    background: var(--surface-strong);
    border-color: var(--border-strong);
  }

  .tab.active {
    color: var(--text);
    border-color: var(--accent);
    background: var(--surface-strong);
    font-weight: 700;
  }

  @media (max-width: 1024px) {
    .tab {
      font-size: 0.8rem;
      padding: 8px 12px;
    }
  }

  @media (max-width: 768px) {
    .tabs {
      display: none;
    }

    .mobile-tabbar {
      display: flex;
      position: fixed;
      left: 12px;
      right: 12px;
      bottom: 12px;
      z-index: 50;
      gap: 4px;
      padding: 8px;
      padding-bottom: calc(8px + env(safe-area-inset-bottom));
      border: 1px solid var(--border);
      border-radius: 18px;
      background: var(--surface);
      box-shadow: var(--card-shadow);
    }

    .page {
      padding-bottom: 116px;
    }
  }

  @media (max-width: 640px) {
    .tabs {
      display: none;
    }

    .mobile-tabbar {
      display: flex;
    }
  }

  @media (max-width: 500px) {
    .footer {
      flex-direction: column;
      align-items: flex-start;
    }
    .page {
      padding-left: 14px;
      padding-right: 14px;
    }
  }

  /* ─── Responsive ─────────────────────────────────── */

  @media (max-width: 500px) {
    .input-row {
      flex-direction: column;
    }
    .btn-primary {
      width: 100%;
    }
    .export-card {
      flex-wrap: wrap;
    }
    .export-card .btn {
      width: 100%;
    }
    .nft-checker-page {
      padding: 16px;
    }
    .scanner-page {
      padding: 16px;
    }
  }
</style>



