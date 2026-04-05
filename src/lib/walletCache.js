/**
 * walletCache.js — localStorage-based wallet session manager.
 *
 * Slaat per wallet op:
 *   - De NFT-lijst (zonder images, voor compacte opslag)
 *   - Per-batch scan resultaten (zodra een batch klaar is)
 *   - Metadata: timestamp, chain, displayName
 *
 * Key schema: artfilter_wallet_{chain}_{address_lowercase}
 * Aparte index-key: artfilter_wallet_index  →  [ { key, address, chain, displayName, lastSeen } ]
 */

const INDEX_KEY = 'artfilter_wallet_index'
const MAX_NFTS_STORED = 2000   // veiligheidsgrens voor localStorage
const SESSION_VERSION = 2      // verhoog bij breaking changes in schema

// ─── Helpers ──────────────────────────────────────────────────────────────────

/**
 * Bouw de localStorage-key voor een wallet.
 * @param {string} chain
 * @param {string} address
 * @returns {string}
 */
function walletKey(chain, address) {
  return `artfilter_wallet_${chain}_${address.toLowerCase()}`
}

/**
 * Lees JSON veilig uit localStorage.
 * @param {string} key
 * @returns {any|null}
 */
function readLS(key) {
  try {
    const raw = localStorage.getItem(key)
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}

/**
 * Schrijf JSON veilig naar localStorage.
 * Bij QuotaExceededError wordt false teruggegeven.
 * @param {string} key
 * @param {any} value
 * @returns {boolean}
 */
function writeLS(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value))
    return true
  } catch (e) {
    if (e?.name === 'QuotaExceededError' || e?.code === 22) {
      console.warn('[walletCache] localStorage vol — sessie niet opgeslagen')
    }
    return false
  }
}

/**
 * Strip grote velden uit NFT-objecten voor compacte opslag.
 * We bewaren alleen wat nodig is om de grid te tonen en scans te starten.
 * @param {Array} nfts
 * @returns {Array}
 */
function stripNFTsForStorage(nfts) {
  return nfts.slice(0, MAX_NFTS_STORED).map((n) => ({
    id: n.id,
    name: n.name,
    chain: n.chain,
    contract: n.contract,
    tokenId: n.tokenId,
    hasIPFS: n.hasIPFS,
    metadataCID: n.metadataCID ?? null,
    ipfsCIDs: n.ipfsCIDs ?? [],
    tokenURI: n.tokenURI ?? null,
    // Metadata bewaren voor scan-fallback (kleine velden)
    metadata: n.metadata
      ? {
          name: n.metadata.name,
          description: n.metadata.description,
          image: n.metadata.image,
          artifactUri: n.metadata.artifactUri,
          displayUri: n.metadata.displayUri,
          thumbnailUri: n.metadata.thumbnailUri,
          uri: n.metadata.uri,
          creators: n.metadata.creators,
        }
      : null,
    // image/thumb worden client-side opnieuw berekend via ipfsToHttp()
    image: null,
    thumb: null,
  }))
}

// ─── Index (lijst van bekende wallets) ────────────────────────────────────────

/**
 * Lees de wallet-index.
 * @returns {Array<{key: string, address: string, chain: string, displayName: string, lastSeen: number}>}
 */
function readIndex() {
  return readLS(INDEX_KEY) ?? []
}

/**
 * Schrijf een wallet-entry in de index (upsert op key).
 * @param {string} key
 * @param {string} address
 * @param {string} chain
 * @param {string|null} displayName
 */
function upsertIndex(key, address, chain, displayName) {
  const index = readIndex().filter((e) => e.key !== key)
  index.unshift({ key, address, chain, displayName: displayName ?? null, lastSeen: Date.now() })
  writeLS(INDEX_KEY, index.slice(0, 50)) // max 50 wallets in index
}

/**
 * Verwijder een wallet uit de index.
 * @param {string} key
 */
function removeFromIndex(key) {
  writeLS(INDEX_KEY, readIndex().filter((e) => e.key !== key))
}

// ─── Publieke API ──────────────────────────────────────────────────────────────

/**
 * Sla een nieuwe walletssessie op (na het ophalen van de NFT-lijst).
 * Bestaande batch-resultaten worden NIET overschreven als ze al bestaan.
 *
 * @param {string} address
 * @param {string} chain
 * @param {string|null} displayName
 * @param {Array} nfts       — volledige NFT array (wordt gestript voor opslag)
 * @param {number} totalCount
 */
export function saveWalletSession(address, chain, displayName, nfts, totalCount) {
  const key = walletKey(chain, address)
  const existing = readLS(key)

  const session = {
    version: SESSION_VERSION,
    address,
    chain,
    displayName: displayName ?? null,
    totalCount,
    savedAt: Date.now(),
    nfts: stripNFTsForStorage(nfts),
    // Bewaar bestaande batch-resultaten als die er al waren
    batches: existing?.version === SESSION_VERSION ? (existing.batches ?? []) : [],
  }

  const ok = writeLS(key, session)
  if (ok) upsertIndex(key, address, chain, displayName)
  return ok
}

/**
 * Laad een opgeslagen walletssessie.
 *
 * @param {string} address
 * @param {string} chain
 * @returns {{ address, chain, displayName, totalCount, savedAt, nfts, batches }|null}
 */
export function loadWalletSession(address, chain) {
  const key = walletKey(chain, address)
  const session = readLS(key)
  if (!session || session.version !== SESSION_VERSION) return null
  return session
}

/**
 * Sla het resultaat van één voltooide batch op.
 * Wordt aangeroepen zodra een batch klaar is, nog terwijl andere batches lopen.
 *
 * @param {string} address
 * @param {string} chain
 * @param {number} batchIndex   — 0-based index in de batchQueue
 * @param {string} jobId
 * @param {Array}  nftResults   — de result-array van deze batch (geserialiseerd, geen bytes)
 * @param {object} summary      — { successful, failed, totalFiles, totalBytes }
 */
export function saveBatchResult(address, chain, batchIndex, jobId, nftResults, summary) {
  const key = walletKey(chain, address)
  const session = readLS(key)
  if (!session) return false

  const batches = session.batches ?? []

  // Upsert op batchIndex
  const existingIdx = batches.findIndex((b) => b.batchIndex === batchIndex)
  const entry = {
    batchIndex,
    jobId,
    status: 'done',
    completedAt: Date.now(),
    summary,
    // Comprimeer: bewaar alleen wat nodig is voor de export
    nftResults: nftResults.map((r) => {
      if (r.status !== 'success') return { nftId: r.nftId, name: r.name, chain: r.chain, status: r.status, error: r.error ?? null }
      return {
        nftId: r.nftId,
        name: r.name,
        chain: r.chain,
        contract: r.contract,
        tokenId: r.tokenId,
        metadataCID: r.metadataCID,
        status: r.status,
        scanSummary: r.scan?.summary ?? null,
        // scan.nodes bewaren voor CSV-export (CIDs)
        scanNodes: r.scan?.nodes
          ? Object.fromEntries(
              Object.entries(r.scan.nodes)
                .filter(([, n]) => n.cid && !n.error)
                .map(([k, n]) => [k, { cid: n.cid, name: n.name, contentType: n.contentType, kind: n.kind }])
            )
          : {},
      }
    }),
  }

  if (existingIdx >= 0) {
    batches[existingIdx] = entry
  } else {
    batches.push(entry)
  }

  session.batches = batches
  return writeLS(key, session)
}

/**
 * Verwijder de volledige sessie voor een wallet (inclusief batch-resultaten).
 *
 * @param {string} address
 * @param {string} chain
 */
export function clearWalletSession(address, chain) {
  const key = walletKey(chain, address)
  try { localStorage.removeItem(key) } catch { /* ignore */ }
  removeFromIndex(key)
}

/**
 * Geef een lijst van alle bekende wallets (voor een eventuele toekomstige history-UI).
 *
 * @returns {Array<{key, address, chain, displayName, lastSeen}>}
 */
export function listKnownWallets() {
  return readIndex()
}

/**
 * Relatieve tijdsaanduiding (bijv. "3 uur geleden", "2 dagen geleden").
 * @param {number} timestamp  — ms since epoch
 * @returns {string}
 */
export function relativeTime(timestamp) {
  const diff = Date.now() - timestamp
  const min  = Math.floor(diff / 60_000)
  const hr   = Math.floor(diff / 3_600_000)
  const day  = Math.floor(diff / 86_400_000)

  if (min < 2)   return 'zojuist'
  if (min < 60)  return `${min} minuten geleden`
  if (hr  < 24)  return `${hr} uur geleden`
  if (day < 30)  return `${day} dag${day === 1 ? '' : 'en'} geleden`
  return `${Math.floor(day / 30)} maand${Math.floor(day / 30) === 1 ? '' : 'en'} geleden`
}
