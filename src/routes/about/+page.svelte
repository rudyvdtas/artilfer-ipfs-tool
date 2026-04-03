<svelte:head>
  <title>About — ARTFILTER</title>
  <meta name="description" content="Artfilter.io helps collectors consolidate their NFT collection into a Cultural Preservation Manifest for archiving and preservation — independent of marketplaces." />
</svelte:head>

<div class="page">
  <div class="shell">
    <section class="card about-page">
      <div class="brand-row">
        <img src="/icons/favicon.svg" alt="" aria-hidden="true" class="brand-logo" />
        <p class="eyebrow">ARTFILTER</p>
      </div>

      <section class="content-block">
        <h1>Our approach</h1>
        <p>
          Artfilter doesn't claim ownership, judge value, or promise permanence. We're not optimizing for engagement — we're optimizing for continuity. Curation is human. Preservation is collaborative.
        </p>
        <p>
          By making curation explicit and references portable, collectors and curators can carry digital art forward — together.
        </p>
      </section>

      <section class="content-block">
        <h2>Why this matters</h2>
        <p>
          Blockchain ownership doesn't guarantee the files themselves are stored safely. Artfilter maps where and how your NFTs technically exist, so you can archive responsibly.
        </p>
        <p>
          Many NFTs have on-chain ownership but depend on external storage. Digital art only survives if we collectively preserve it.
        </p>
      </section>

      <section class="content-block">
        <h2>How to use</h2>
        <ul>
          <li>Enter your wallet address (0x…, tz…, KT1…, ENS or Tezos Domains)</li>
          <li>Browse your collection</li>
          <li>Select items and add them to your archive</li>
          <li>Export your selection as manifest.json for the metadata and ready2pin.csv which you can upload to Pinata: it imports the files from the original location and stores them again -> creating redundancy.</li>
        </ul>
      </section>
    </section>
  </div>
</div>

<div class="page-fallback">
  <p>About page loaded.</p>
</div>

<style>
  .page { min-height: 100vh; padding: 24px 20px 60px; }
  .shell { max-width: 820px; margin: 0 auto; }
  .card {
    background: rgba(255,255,255,0.85);
    border: 1px solid rgba(148,163,184,0.22);
    border-radius: 20px;
    padding: 28px;
    box-shadow: 0 8px 32px rgba(15,23,42,0.06);
    display: flex;
    flex-direction: column;
    gap: 18px;
  }
  .brand-row { display: inline-flex; align-items: center; gap: 10px; }
  .brand-logo { width: 24px; height: 24px; object-fit: contain; }
  .eyebrow { text-transform: uppercase; letter-spacing: 0.12em; color: #64748b; font-size: 0.72rem; font-weight: 700; margin: 0; }
  h1 { margin: 0; font-size: clamp(1.6rem, 4vw, 2.4rem); }
  .lead, p, li { color: #475569; line-height: 1.7; }
  h1 { margin: 0; font-size: clamp(1.5rem, 4vw, 2.2rem); }
  .network-line { font-weight: 600; color: #0f172a; margin: 0; }
  .content-block { display: flex; flex-direction: column; gap: 10px; }
  .content-block h2 { margin: 0; font-size: 1rem; color: #0f172a; }
  ul { margin: 0; padding-left: 20px; display: grid; gap: 8px; }
  .page-fallback { position: fixed; bottom: 8px; right: 8px; font-size: 12px; color: #ef4444; background: white; padding: 4px 8px; border: 1px solid #ef4444; }
</style>
