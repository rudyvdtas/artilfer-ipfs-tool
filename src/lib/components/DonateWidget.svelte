<script>
  const ethAddress = '0x04820b814361926b1d29c159c0755adb96bb2713'
  const tezAddress = 'tz2DyCi5fFjzwPePL1WE4TYENuPHH7nAuu43'

  const ethUri = `ethereum:${ethAddress}`
  const tezUri = `tezos:${tezAddress}`

  let copied = ''

  async function copy(value, label) {
    try {
      await navigator.clipboard.writeText(value)
      copied = label
      setTimeout(() => {
        if (copied === label) copied = ''
      }, 1800)
    } catch {
      copied = 'Kon niet kopiëren'
    }
  }
</script>

<div class="donate-widget">
  <div>
    <p class="eyebrow">Support Artfilter</p>
    <h3>Donate :)</h3>
    <p class="text">Support the project via ETH or Tezos.</p>
  </div>

  <div class="wallets">
    <div class="wallet-card">
      <div>
        <span class="chain">ETH</span>
        <code>{ethAddress}</code>
      </div>
      <div class="actions">
        <a href={`https://etherscan.io/address/${ethAddress}`} target="_blank" rel="noreferrer">Open</a>
        <button type="button" on:click={() => copy(ethAddress, 'ETH address')}>Copy</button>
      </div>
    </div>

    <div class="wallet-card">
      <div>
        <span class="chain">TEZ</span>
        <code>{tezAddress}</code>
      </div>
      <div class="actions">
        <a href={`https://tzkt.io/${tezAddress}`} target="_blank" rel="noreferrer">Open</a>
        <button type="button" on:click={() => copy(tezAddress, 'TEZ address')}>Copy</button>
      </div>
    </div>
  </div>

  <p class="status">{copied || ' '}</p>
</div>

<style>
  .donate-widget {
    display: flex;
    flex-direction: column;
    gap: 14px;
  }
  .eyebrow {
    margin: 0 0 6px;
    text-transform: uppercase;
    letter-spacing: 0.12em;
    font-size: 0.72rem;
    color: #64748b;
    font-weight: 700;
  }
  h3 { margin: 0; font-size: 1.1rem; }
  .text, .status { margin: 0; color: #64748b; font-size: 0.9rem; }
  .wallets { display: grid; gap: 10px; }
  .wallet-card {
    display: flex;
    justify-content: space-between;
    gap: 12px;
    padding: 14px 16px;
    border: 1px solid rgba(148,163,184,0.22);
    border-radius: 14px;
    background: #ffffff;
  }
  .chain { display: block; font-size: 0.72rem; font-weight: 700; margin-bottom: 4px; }
  code {
    display: block;
    word-break: break-all;
    font-size: 0.82rem;
    color: #0f172a;
  }
  .actions { display: flex; align-items: center; gap: 8px; flex-shrink: 0; }
  .actions a, .actions button {
    border: 0;
    border-radius: 999px;
    padding: 8px 12px;
    font-weight: 600;
    font-size: 0.8rem;
    background: #0f172a;
    color: white;
    text-decoration: none;
    cursor: pointer;
  }
  .actions a { background: rgba(226,232,240,0.95); color: #0f172a; }
</style>
