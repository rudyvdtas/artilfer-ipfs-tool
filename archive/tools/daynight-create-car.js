/**
 * Day / Night – Rutger van der Tas
 * CAR File Generator (geen IPFS daemon nodig)
 * ============================================
 *
 * WAT DOET DIT SCRIPT?
 * Downloadt alle 13 Day/Night lagen via een IPFS gateway,
 * bundelt ze samen met de manifest-documenten in één CAR file,
 * en slaat die op als daynight-bundle.car — klaar om te uploaden
 * via het Pinata dashboard.
 *
 * INSTALLATIE (eenmalig)
 * ----------------------
*   npm install @ipld/car @ipld/dag-pb multiformats
*               blockstore-core node-fetch
 *
 * GEBRUIK
 * -------
 *   node daynight-create-car.js
 *
 * Zet de vier manifest-bestanden in dezelfde map als dit script:
 *   daynight-preservation-manifest.md
 *   daynight-manifest.json
 *   daynight-cid-inventory.csv
 *   daynight-summary-report.txt
 *
 * OUTPUT
 * ------
 *   daynight-bundle.car     ← upload dit naar Pinata dashboard
 *   daynight-root-cid.txt   ← bewaar dit CID voor je administratie
 *
 * PINATA UPLOAD
 * -------------
 *   1. Ga naar https://app.pinata.cloud/pinmanager
 *   2. Klik "Upload" → "CAR File"
 *   3. Selecteer daynight-bundle.car
 *   4. Geef het de naam "daynight-merkle-dag-bundle"
 *   5. Klaar — het CID in Pinata moet overeenkomen met daynight-root-cid.txt
 */

import { CarWriter } from '@ipld/car'
import { CID } from 'multiformats/cid'
import * as raw from 'multiformats/codecs/raw'
import * as dagPB from '@ipld/dag-pb'
import { sha256 } from 'multiformats/hashes/sha2'
import { MemoryBlockstore } from 'blockstore-core'
import fetch from 'node-fetch'
import fs from 'fs'
import path from 'path'
import { Writable } from 'stream'

// =============================================================================
// CONFIG – alle 13 CIDs + manifest-bestanden
// =============================================================================

const LAYERS = [
  { cid: 'QmWz4KUunC9Qb6eSy82GiTeWdU9Egrpj2RQNHrf197EQC4', filename: 'master-composite.png',   label: 'Master Composite' },
  { cid: 'QmQV9TdBKphPFSNUmEXABVmqYvZUoRDp2L8esSKkt5hMGU', filename: 'base-day.png',           label: 'Base Day' },
  { cid: 'QmZh9ZddFGHqJs6obsk1W4j4oNVhswTNotCnotcN1iMqw3', filename: 'base-night.png',         label: 'Base Night' },
  { cid: 'QmeVc5cdAJMqgaQvuhK6qw3ygN7zSjA1rMSh6UZWG1TXMm', filename: 'skeleton-day.png',      label: 'Skeleton Day' },
  { cid: 'Qmdpd7DzLQU7CRLdpMvHcyQDVwPUyc2Yj2dnHHSR3Y1cdj', filename: 'skeleton-night.png',    label: 'Skeleton Night' },
  { cid: 'Qma2VUtypMjhXmLUagmweqLwZeLAZdcYtosVruJ6Wzymfw',  filename: 'portrait-day.png',      label: 'Portrait Day' },
  { cid: 'QmVNmchsUhZvc32jT8XgDZHGaAmcigwwkHHc5PAZvpcNiR',  filename: 'portrait-night.png',    label: 'Portrait Night' },
  { cid: 'QmPvKNJ63kJwAKP7gvwtzNacKtQTm1KKvuAFKYq2gDtTob',  filename: '3heads-day.png',        label: '3Heads Day' },
  { cid: 'QmaZjN89B3PXUk5ivSbbF5TNsxcPFW7zPfPofsYL6xreP4',  filename: '3heads-night.png',      label: '3Heads Night' },
  { cid: 'QmY2v4GKKbvHNnWHBPyn6SQBEw35WFUREHNbkY94UssHMS',  filename: 'floatinghead-day.png',  label: 'FloatingHead Day' },
  { cid: 'QmQ3h4vL1uuVa4wixgK6sGE7bRRfimvq4tA1Q25Uh71uu3',  filename: 'floatinghead-night.png',label: 'FloatingHead Night' },
  { cid: 'QmY1oVWXSdP6vrsV2shiNrhC3tgYdcUJ1K24KFbtAbMDQL',  filename: 'mary-day.png',          label: 'Mary Day' },
  { cid: 'QmYGaxorcEe3GadcMQHsQYfHeEArTUCQ9Ad1sb4PrRrb1M',  filename: 'mary-night.png',        label: 'Mary Night' },
]

const MANIFEST_FILES = [
  'daynight-preservation-manifest.md',
  'daynight-manifest.json',
  'daynight-cid-inventory.csv',
  'daynight-summary-report.txt',
]

// Probeer meerdere gateways als één traag of offline is
// w3s.link werkt hier als primaire fallback.
const GATEWAYS = [
  'https://w3s.link/ipfs',
  'https://nftstorage.link/ipfs',
  'https://ipfs.filebase.io/ipfs',
  'https://ipfs.io/ipfs',
  'https://cloudflare-ipfs.com/ipfs',
  'https://dweb.link/ipfs',
  'https://gateway.pinata.cloud/ipfs',
]

const OUTPUT_CAR  = 'daynight-bundle.car'
const OUTPUT_CID  = 'daynight-root-cid.txt'

// =============================================================================
// HULPFUNCTIES
// =============================================================================

async function fetchWithFallback(cid, label) {
  for (const gateway of GATEWAYS) {
    const url = `${gateway}/${cid}`
    try {
      process.stdout.write(`  ↓ ${label} via ${new URL(gateway).hostname}... `)
      const res = await fetch(url, { timeout: 30000 })
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      const buffer = Buffer.from(await res.arrayBuffer())
      console.log(`✓ (${(buffer.length / 1024).toFixed(0)} KB)`)
      return buffer
    } catch (err) {
      console.log(`✗ (${err.message})`)
    }
  }
  throw new Error(`Alle gateways mislukt voor ${label} (${cid})`)
}

async function bufferToCID(data) {
  const hash = await sha256.digest(data)
  return CID.create(1, raw.code, hash)
}

// Bouw een UnixFS directory node met dag-pb
function makeDirectoryNode(links) {
  const node = dagPB.prepare({ Links: links })
  return dagPB.encode(node)
}

// =============================================================================
// HOOFDLOGICA
// =============================================================================

async function main() {
  console.log('========================================================')
  console.log('  Day / Night – CAR File Generator')
  console.log('  Artist: Rutger van der Tas | Platform: Async Art')
  console.log('========================================================')
  console.log('')

  const blockstore = new MemoryBlockstore()
  const links = []

  // ── STAP 1: Laag-bestanden downloaden en als raw blocks opslaan ──────────
  console.log('STAP 1: Afbeeldingslagen downloaden...')
  console.log('')

  for (const layer of LAYERS) {
    const data  = await fetchWithFallback(layer.cid, layer.label)
    const cid   = await bufferToCID(data)
    await blockstore.put(cid, data)
    links.push({ Hash: cid, Name: layer.filename, Tsize: data.length })
  }

  console.log('')

  // ── STAP 2: Manifest-documenten lezen (als aanwezig) ────────────────────
  console.log('STAP 2: Manifest-documenten toevoegen...')
  console.log('')

  for (const filename of MANIFEST_FILES) {
    if (fs.existsSync(filename)) {
      const data = fs.readFileSync(filename)
      const cid  = await bufferToCID(data)
      await blockstore.put(cid, data)
      links.push({ Hash: cid, Name: filename, Tsize: data.length })
      console.log(`  ✓ ${filename}`)
    } else {
      console.log(`  - Niet gevonden (overgeslagen): ${filename}`)
    }
  }

  console.log('')

  // ── STAP 3: Directory (root) node aanmaken ───────────────────────────────
  console.log('STAP 3: Merkle DAG root aanmaken...')

  const dirBytes = makeDirectoryNode(links)
  const dirHash  = await sha256.digest(dirBytes)
  const rootCID  = CID.create(1, dagPB.code, dirHash)
  await blockstore.put(rootCID, dirBytes)

  console.log(`  ✓ Root CID: ${rootCID}`)
  console.log(`  ✓ Bevat ${links.length} bestanden`)
  console.log('')

  // ── STAP 4: CAR file schrijven ───────────────────────────────────────────
  console.log(`STAP 4: CAR file schrijven naar ${OUTPUT_CAR}...`)

  const { writer, out } = CarWriter.create([rootCID])
  const outputStream = fs.createWriteStream(OUTPUT_CAR)

  const pipe = async () => {
    for await (const chunk of out) {
      outputStream.write(chunk)
    }
    outputStream.end()
  }
  const pipePromise = pipe()

  // Alle blocks schrijven inclusief root
  for await (const [cid, block] of blockstore.getAll()) {
    await writer.put({ cid, bytes: block })
  }
  await writer.close()
  await pipePromise

  const carSize = fs.statSync(OUTPUT_CAR).size
  console.log(`  ✓ ${OUTPUT_CAR} (${(carSize / 1024 / 1024).toFixed(2)} MB)`)
  console.log('')

  // ── STAP 5: Root CID opslaan ─────────────────────────────────────────────
  const now = new Date().toISOString().replace('T', ' ').slice(0, 19) + ' UTC'
  const cidDoc = [
    'Day / Night – Merkle DAG Bundle Root CID',
    '==========================================',
    `Aangemaakt : ${now}`,
    `Artist     : Rutger van der Tas`,
    `Platform   : Async Art`,
    '',
    `ROOT CID (CIDv1):`,
    `${rootCID}`,
    '',
    'Gateway URLs (beschikbaar nadat Pinata de CAR verwerkt heeft):',
    `  https://ipfs.io/ipfs/${rootCID}`,
    `  https://gateway.pinata.cloud/ipfs/${rootCID}`,
    `  https://cloudflare-ipfs.com/ipfs/${rootCID}`,
    `  https://dweb.link/ipfs/${rootCID}`,
    '',
    'Bevat:',
    ...links.map(l => `  ${l.Name}  (${(l.Tsize / 1024).toFixed(0)} KB)`),
  ].join('\n')

  fs.writeFileSync(OUTPUT_CID, cidDoc)
  console.log(`  ✓ Root CID opgeslagen in: ${OUTPUT_CID}`)
  console.log('')

  // ── SAMENVATTING ─────────────────────────────────────────────────────────
  console.log('========================================================')
  console.log('  KLAAR')
  console.log('========================================================')
  console.log('')
  console.log(`  CAR file : ${OUTPUT_CAR}  (${(carSize / 1024 / 1024).toFixed(2)} MB)`)
  console.log(`  Root CID : ${rootCID}`)
  console.log('')
  console.log('  Volgende stap – upload naar Pinata:')
  console.log('  1. Ga naar https://app.pinata.cloud/pinmanager')
  console.log('  2. Klik "Upload" → "CAR File"')
  console.log('  3. Selecteer daynight-bundle.car')
  console.log('  4. Geef het de naam "daynight-merkle-dag-bundle"')
  console.log('  5. Controleer of het CID overeenkomt met daynight-root-cid.txt')
  console.log('')
  console.log('  Bewaar daynight-root-cid.txt in je GitHub repository!')
  console.log('')
}

main().catch(err => {
  console.error('\n✗ Fout:', err.message)
  process.exit(1)
})
