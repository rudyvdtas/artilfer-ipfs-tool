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

  const icons = {
    nft: '👤',
    scan: '🔍',
    about: '❓',
    pinned: '📌',
  }

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
      image: '/first-supper.jpg',
      asyncUrl: 'https://www.async.art/v2/0?referrer=masters',
      ipfsUrl: 'https://ipfs.io/ipfs/bafybeigfi7lhhgtmwavftjr4wkz47pljq5xk5wsbxvjrlycjxbzdwgesxm/',
    },
    {
      title: 'The Cunégonde Dilemma',
      image: '/thumbs/the-cunegonde-dilemma.jpg',
      asyncUrl: 'https://www.async.art/v2/0?referrer=masters',
      ipfsUrl: 'https://ipfs.io/ipfs/QmUVaaE39kcdnU5G91xFQEyfeMcW8qYSjLyXoiru14q6mH',
    },
  ]

  const indexEntries = [
    {
      rootCid: 'Qmd4GTGvQw2HvfYactmEqw1rdiYeP2Ht3CitZeh1iXFnyw',
      project: 'Looking For Satoshi',
      artists: 'Rutger van der Tas',
      platform: 'ASYNC.ART',
    },
    {
      rootCid: 'QmQEQYguTJ4ApkCJ8J5wSMGFfgZLP5Xz4w7yGArFdHkVjr',
      project: 'GRIFTERS',
      artists: 'XCOPY',
      platform: 'ASYNC.ART',
    },
    {
      rootCid: 'Qmaje8byBxmFTHDjCvDYLy1NPZkUX1Etx1agDw5HxNqtef',
      project: 'First Supper',
      artists: 'Shortcut, Josie Bellini, Sparrow (Digitial), Mlibty, Vans Design, Alotta Money, Twisted Vacancy, Coldie, Hackatao, XCOPY, Matt Kane, Rutger van der Tas, and DIGITAL.',
      platform: 'ASYNC.ART',
    },
    {
      rootCid: 'QmUVaaE39kcdnU5G91xFQEyfeMcW8qYSjLyXoiru14q6mH',
      project: 'The Cunégonde Dilemma',
      artists: 'Alotta Money',
      platform: 'ASYNC.ART',
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
        <div class="brand-row brand-mark">
          <img src="/icons/favicon.svg" alt="" aria-hidden="true" class="brand-logo brand-logo-glow" />
          <span class="brand-title">ARTfilter</span>
        </div>
        <h1>Preservation starts with taking responsibility.</h1>
      </div>

      <div class="donate-header-wrap">
        <button class="donate-circle" onclick={() => (donateOpen = !donateOpen)} aria-expanded={donateOpen} aria-label="Donate information tonen">
          <span class="donate-circle-icon">❤️</span>
        </button>
        <span class="donate-label">donate</span>

        {#if donateOpen}
          <div class="donate-popover">
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
        {/if}
      </div>
    </header>

    <!-- ── Tabs ───────────────────────────────────── -->
    <nav class="tabs" aria-label="Navigatie">
      <!-- Desktop Tabs -->
      <div class="tabs-desktop">
        <button
          class="tab"
          class:active={activeTab === 'index'}
          onclick={() => (activeTab = 'index')}
        >
          <span class="tab-icon">📚</span>
          Index
        </button>
        <button
          class="tab"
          class:active={activeTab === 'pinned'}
          onclick={() => (activeTab = 'pinned')}
        >
          <span class="tab-icon">{icons.pinned}</span>
          Pinned
        </button>
        <button
          class="tab"
          class:active={activeTab === 'nft-checker'}
          onclick={() => (activeTab = 'nft-checker')}
        >
          <span class="tab-icon">{icons.nft}</span>
          NFT Wallet Checker
        </button>
        <button
          class="tab"
          class:active={activeTab === 'scanner'}
          onclick={() => (activeTab = 'scanner')}
        >
          <span class="tab-icon">{icons.scan}</span>
          Direct CID Scan
        </button>
        <button
          class="tab"
          class:active={activeTab === 'about'}
          onclick={() => (activeTab = 'about')}
        >
          <span class="tab-icon">{icons.about}</span>
          About
        </button>
      </div>

      <!-- Mobile Hamburger Menu -->
      <button 
        class="mobile-menu-btn" 
        aria-label="Menu" 
        aria-expanded={mobileMenuOpen}
        onclick={() => (mobileMenuOpen = !mobileMenuOpen)}
      >
        <span class="hamburger-icon"></span>
        <span class="hamburger-icon"></span>
        <span class="hamburger-icon"></span>
      </button>

      {#if mobileMenuOpen}
        <div class="mobile-menu">
          <button
            class="tab tab-mobile"
            class:active={activeTab === 'index'}
            onclick={() => { activeTab = 'index'; closeMobileMenu(); }}
          >
            <span class="tab-icon">📚</span>
            Index
          </button>
          <button
            class="tab tab-mobile"
            class:active={activeTab === 'pinned'}
            onclick={() => { activeTab = 'pinned'; closeMobileMenu(); }}
          >
            <span class="tab-icon">{icons.pinned}</span>
            Pinned
          </button>
          <button
            class="tab tab-mobile"
            class:active={activeTab === 'nft-checker'}
            onclick={() => { activeTab = 'nft-checker'; closeMobileMenu(); }}
          >
            <span class="tab-icon">{icons.nft}</span>
            NFT Wallet Checker
          </button>
          <button
            class="tab tab-mobile"
            class:active={activeTab === 'scanner'}
            onclick={() => { activeTab = 'scanner'; closeMobileMenu(); }}
          >
            <span class="tab-icon">{icons.scan}</span>
            Direct CID Scan
          </button>
          <button
            class="tab tab-mobile"
            class:active={activeTab === 'about'}
            onclick={() => { activeTab = 'about'; closeMobileMenu(); }}
          >
            <span class="tab-icon">{icons.about}</span>
            About
          </button>
        </div>
      {/if}
    </nav>

    <!-- ── Tab: Index ───────────────────────── -->
    {#if activeTab === 'index'}
      <div class="step index-page">
        <div class="index-hero">
          <h2>Index</h2>
          <p>
            Overview of root CIDs and project names from the archive.
          </p>
        </div>

        <section class="index-list">
          {#each indexEntries as entry}
            <article class="index-item">
              <div class="index-item-main">
                <h3>{entry.project}</h3>
                <p>{entry.artists}</p>
              </div>
              <div class="index-item-meta">
                <a href={`https://ipfs.io/ipfs/${entry.rootCid}`} target="_blank" rel="noopener noreferrer" class="index-cid-link">
                  <code>{entry.rootCid}</code>
                </a>
                <span>{entry.platform}</span>
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
          <div>
            <h2>Pinned gallery</h2>
            <p>
              Curated archive entries selected for stable reference and preservation.
            </p>
          </div>
        </div>

        <section class="pinned-gallery">
          {#each pinnedProjects as project}
            <article class="pinned-card">
              <p class="eyebrow">Pinned archive</p>
              <h3>{project.title}</h3>
              <img src={project.image} alt={project.title + ' pinned archive preview'} class="project-image" />
              <div class="button-group">
                <a href={project.asyncUrl} target="_blank" rel="noopener noreferrer" class="btn btn-primary">AsyncV2</a>
                <a href={project.ipfsUrl} target="_blank" rel="noopener noreferrer" class="btn btn-secondary">IPFS</a>
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
            Artfilter doesn't claim ownership, judge value, or promise permanence. We're not optimizing for engagement — we're optimizing for continuity. Curation is human. Preservation is collaborative.
          </p>
          <p>
            By making curation explicit and references portable, collectors and curators can carry digital art forward — together.
          </p>
        </section>

        <section class="about-section">
          <h3>Why this matters</h3>
          <p>
            Blockchain ownership doesn't guarantee the files themselves are stored safely. Many NFTs point to IPFS — which is unreliable without active redundancy. Artfilter maps where and how your NFTs technically exist, so you can archive responsibly.
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
            <li>Export your selection as manifest.json for the metadata and ready2pin.csv which you can upload to Pinata: it imports the files from the original location and stores them again -> creating redundancy.</li>
          </ul>
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

  .page {
    min-height: 100vh;
    padding: 24px 20px 60px;
  }

  .shell {
    max-width: 760px;
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
    color: var(--text);
  }

  .header,
  .step,
  .tabs {
    border-radius: var(--radius-md);
  }

  /* ─── Header ─────────────────────────────────────── */

  .header {
    padding-top: 24px;
    padding: 22px 22px 18px;
    display: flex;
    justify-content: space-between;
    gap: 12px;
    align-items: flex-start;
    position: relative;
    isolation: isolate;
  }

  @media (max-width: 600px) {
    .header {
      padding: 16px 14px 12px;
      gap: 8px;
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
      width: 56px;
      height: 56px;
    }

    .donate-label {
      font-size: 0.7rem;
    }
  }

  .donate-circle-icon {
    font-size: 1.2rem;
    line-height: 1;
  }

  .donate-label {
    font-size: 0.78rem;
    font-weight: 700;
    text-transform: lowercase;
    color: #6a5747;
  }

  .donate-popover {
    position: absolute;
    top: 78px;
    right: 0;
    width: min(320px, calc(100vw - 40px));
    padding: 18px 14px 14px;
    border-radius: 14px;
    border: 1px solid var(--border);
    background: #ffffff;
    box-shadow: 0 18px 40px rgba(15,23,42,0.18);
    z-index: 10000;
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

  .header .brand-logo {
    width: 28px;
    height: 28px;
    margin-top: 4px;
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
    font-weight: 300;
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
    color: #8a4f14;
    margin-bottom: 6px;
  }

  .header .brand-title,
  .about-hero .brand-title {
    font-size: clamp(1.4rem, 4vw, 2rem);
    line-height: 1.05;
    font-weight: 500;
    letter-spacing: 0.04em;
    color: #1b140e;
    text-transform: none;
  }

  h1 {
    font-size: clamp(1.4rem, 4vw, 2rem);
    font-weight: 300;
    margin: 0 0 8px;
    line-height: 1.1;
    color: #1b140e;
  }

  @media (max-width: 500px) {
    h1 {
      font-size: 1.3rem;
      font-weight: 300;
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
    padding: 24px;
    display: flex;
    flex-direction: column;
    gap: 16px;
    box-shadow: var(--card-shadow);
  }

  @media (max-width: 500px) {
    .step {
      padding: 16px;
      gap: 12px;
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

  .index-list {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  .index-item {
    display: flex;
    justify-content: space-between;
    gap: 16px;
    padding: 16px 18px;
    border-radius: 16px;
    background: rgba(255, 255, 255, 0.75);
    border: 1px solid rgba(148, 163, 184, 0.18);
  }

  .index-item-main {
    min-width: 0;
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  .index-item-main h3 {
    margin: 0;
    font-size: 1rem;
    color: #1b140e;
  }

  .index-item-main p {
    margin: 0;
    color: #4f463f;
    line-height: 1.5;
  }

  .index-item-meta {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 6px;
    text-align: right;
    flex-shrink: 0;
  }

  .index-cid-link {
    color: inherit;
    text-decoration: none;
  }

  .index-cid-link:hover {
    text-decoration: underline;
  }

  .index-item-meta code {
    font-family: var(--mono);
    font-size: 0.76rem;
    color: #475569;
    word-break: break-all;
  }

  .index-item-meta span {
    font-size: 0.72rem;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: #94a3b8;
  }

  .nft-checker-page {
    padding: 22px;
  }

  .scanner-page {
    padding: 22px;
  }

  .checker-shell {
    max-width: 760px;
    width: 100%;
    margin: 0 auto;
  }

  .index-page,
  .pinned-page {
    gap: 18px;
  }

  .pinned-gallery {
    display: grid;
    grid-template-columns: 1fr;
    gap: 14px;
  }

  .index-hero,
  .pinned-hero {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .pinned-hero p {
    margin: 0;
    color: #4f463f;
    line-height: 1.7;
  }

  .pinned-hero h2 {
    margin: 0;
    font-size: clamp(1.4rem, 3.6vw, 2rem);
  }

  .pinned-gallery .pinned-card {
    padding: 20px;
  }

  .pinned-gallery .project-image {
    margin: 12px 0;
    max-height: 340px;
  }

  .pinned-card {
    background: rgba(255,255,255,0.85);
    border: 1px solid rgba(148,163,184,0.22);
    border-radius: 20px;
    padding: 24px;
    box-shadow: 0 8px 32px rgba(15,23,42,0.06);
  }

  .pinned-card h3 {
    margin: 0 0 10px;
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
    .project-image {
      max-height: 280px;
    }
  }

  .button-group {
    display: flex;
    gap: 12px;
    margin-top: 12px;
  }

  .index-hero h2,
  .pinned-intro h2 {
    margin: 0;
    font-size: clamp(1.4rem, 3.6vw, 2rem);
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

    .index-item {
      flex-direction: column;
    }

    .index-item-meta {
      align-items: flex-start;
      text-align: left;
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
    color: #1b140e;
    text-transform: uppercase;
    letter-spacing: 0.08em;
  }

  .about-section ul {
    margin: 0;
    padding-left: 20px;
    display: grid;
    gap: 8px;
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

  .tabs-desktop > .tab,
  .mobile-menu > .tab {
    border: 1px solid var(--border-strong);
    background: var(--surface-muted);
  }

  .mobile-menu-btn {
    display: none;
    flex-direction: column;
    gap: 5px;
    background: transparent;
    border: none;
    cursor: pointer;
    padding: 6px;
    margin-left: auto;
  }

  .hamburger-icon {
    width: 24px;
    height: 2px;
    background: #6a5747;
    border-radius: 2px;
    transition: all 0.3s ease;
  }

  .mobile-menu {
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background: var(--surface);
    border: 1px solid var(--border);
    border-top: none;
    border-radius: 0 0 var(--radius-md) var(--radius-md);
    display: flex;
    flex-direction: column;
    gap: 4px;
    padding: 8px;
    box-shadow: 0 8px 16px rgba(15,23,42,0.1);
    z-index: 1000;
  }

  .tab-mobile {
    width: 100%;
    text-align: left;
    justify-content: flex-start;
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

  @media (max-width: 768px) {
    .tabs-desktop {
      display: none;
    }

    .mobile-menu-btn {
      display: flex;
    }

    .mobile-menu {
      width: calc(100vw - 40px);
      max-width: none;
      left: -2px;
      right: -2px;
    }
  }

  @media (max-width: 500px) {
    .tabs {
      overflow-x: auto;
      margin-top: -6px;
    }
    .tab {
      font-size: 0.8rem;
      padding: 8px 12px;
    }
    .footer {
      flex-direction: column;
      align-items: flex-start;
    }
    .header {
      padding: 16px 16px 14px;
    }
    .page {
      padding: 16px 16px 60px;
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
