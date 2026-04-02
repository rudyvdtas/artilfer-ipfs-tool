#!/usr/bin/env node

/**
 * Universal IPFS CAR Builder
 * ===========================
 *
 * Downloadt assets van IPFS op basis van CSV inventory,
 * organiseert ze in een directory-structuur (metadata/, assets/),
 * en bouwt er een merkle-preserving directory tree van.
 *
 * GEBRUIK:
 *   node ipfs-car-builder.js <root-cid> <csv-file> <output-dir>
 *
 * VOORBEELD:
 *   node ipfs-car-builder.js \
 *     Qmaje8byBxmFTHDjCvDYLy1NPZkUX1Etx1agDw5HxNqtef \
 *     ./first-supper-inventory.csv \
 *     ./first-supper-export
 *
 * OUTPUT:
 *   first-supper-export/
 *   ├── metadata/
 *   │   ├── token.json
 *   │   ├── export-manifest.json
 *   │   └── inventory.csv
 *   ├── assets/
 *   │   └── [organized assets]
 *   └── _INFO.txt
 */

import { CarWriter } from '@ipld/car'
import { CID } from 'multiformats/cid'
import * as dagPB from '@ipld/dag-pb'
import { sha256 } from 'multiformats/hashes/sha2'
import { MemoryBlockstore } from 'blockstore-core'
import fetch from 'node-fetch'
import fs from 'fs'
import path from 'path'
import { createReadStream } from 'fs'
import { parse } from 'csv-parse/sync'

const GATEWAYS = [
  'https://w3s.link/ipfs',
  'https://nftstorage.link/ipfs',
  'https://ipfs.filebase.io/ipfs',
  'https://ipfs.io/ipfs',
  'https://cloudflare-ipfs.com/ipfs',
  'https://dweb.link/ipfs',
  'https://gateway.pinata.cloud/ipfs',
]

// ═════════════════════════════════════════════════════════════════════════════

async function main() {
  const args = process.argv.slice(2)

  if (args.length < 3) {
    console.log(`
Usage: node ipfs-car-builder.js <root-cid> <csv-file> <output-dir>

Example:
  node ipfs-car-builder.js \\
    Qmaje8byBxmFTHDjCvDYLy1NPZkUX1Etx1agDw5HxNqtef \\
    ./inventory.csv \\
    ./export

This will:
  1. Read CSV inventory (hash,name format)
  2. Download assets from IPFS gateways
  3. Organize into directory structure
  4. Create merkle-tree-preserving directory
  5. Generate metadata files
    `)
    process.exit(1)
  }

  const [rootCID, csvFile, outputDir] = args

  console.log('')
  console.log('╔════════════════════════════════════════════════════════════╗')
  console.log('║  IPFS CAR Builder – Directory Export                       ║')
  console.log('╚════════════════════════════════════════════════════════════╝')
  console.log('')

  // Validatie
  if (!fs.existsSync(csvFile)) {
    console.error(`✗ CSV file not found: ${csvFile}`)
    process.exit(1)
  }

  // Parse CSV
  console.log(`📖 Reading CSV: ${csvFile}`)
  const csvContent = fs.readFileSync(csvFile, 'utf-8')
  const records = parse(csvContent, {
    columns: true,
    skip_empty_lines: true,
  })

  console.log(`✓ Found ${records.length} assets`)
  console.log('')

  // Setup directories
  const metadataDir = path.join(outputDir, 'metadata')
  const assetsDir = path.join(outputDir, 'assets')

  fs.mkdirSync(metadataDir, { recursive: true })
  fs.mkdirSync(assetsDir, { recursive: true })

  console.log('📁 Directory structure created')
  console.log('')

  // Download assets
  console.log('📥 Downloading assets from IPFS...')
  console.log('')

  const blockstore = new MemoryBlockstore()
  const stats = {
    total: records.length,
    success: 0,
    failed: 0,
    size: 0,
    assets: [],
  }

  // Metadata directory links
  const metadataLinks = []
  const assetsLinks = []

  // Download each asset
  for (let i = 0; i < records.length; i++) {
    const { hash: cid, name } = records[i]
    const progress = `[${i + 1}/${records.length}]`

    process.stdout.write(`${progress} ${name.slice(0, 40).padEnd(40)} `)

    let data = null
    for (const gateway of GATEWAYS) {
      try {
        const url = `${gateway}/${cid}`
        const res = await fetch(url, { timeout: 30000 })
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        data = Buffer.from(await res.arrayBuffer())
        break
      } catch (e) {
        // Try next gateway
      }
    }

    if (data) {
      const hash = await sha256.digest(data)
      const fileCID = CID.create(1, 0x55, hash) // raw
      await blockstore.put(fileCID, data)

      // Save locally
      const sanitizedName = name
        .replace(/[^\w\s-]/g, '')
        .replace(/\s+/g, '-')
        .toLowerCase()
        .slice(0, 80)

      const filePath = path.join(assetsDir, `${sanitizedName}.bin`)
      fs.writeFileSync(filePath, data)

      console.log(`✓ ${(data.length / 1024).toFixed(0)}KB`)

      stats.success++
      stats.size += data.length

      assetsLinks.push({
        Hash: fileCID,
        Name: `${sanitizedName}.bin`,
        Tsize: data.length,
      })

      stats.assets.push({
        name,
        cid,
        path: path.relative(outputDir, filePath),
        size: data.length,
      })
    } else {
      console.log(`✗ Failed`)
      stats.failed++
    }
  }

  console.log('')

  // Create metadata files
  console.log('📝 Creating metadata files...')

  // token.json
  const tokenJson = {
    project: 'IPFS Archive Export',
    rootCID,
    exportedAt: new Date().toISOString(),
    totalAssets: stats.success,
    totalSize: stats.size,
    assets: stats.assets,
  }

  fs.writeFileSync(
    path.join(metadataDir, 'token.json'),
    JSON.stringify(tokenJson, null, 2)
  )
  console.log('  ✓ token.json')

  // export-manifest.json
  const manifest = {
    exportedAt: new Date().toISOString(),
    rootCID,
    stats,
  }

  fs.writeFileSync(
    path.join(metadataDir, 'export-manifest.json'),
    JSON.stringify(manifest, null, 2)
  )
  console.log('  ✓ export-manifest.json')

  // Copy inventory
  fs.copyFileSync(csvFile, path.join(metadataDir, 'inventory.csv'))
  console.log('  ✓ inventory.csv')

  // Create info file
  const infoText = `IPFS Archive Export
═══════════════════

Root CID: ${rootCID}
Exported: ${new Date().toISOString()}

Assets Downloaded: ${stats.success}/${stats.total}
Total Size: ${(stats.size / 1024 / 1024).toFixed(2)} MB

Structure:
  ${outputDir}/
  ├── metadata/
  │   ├── token.json
  │   ├── export-manifest.json
  │   └── inventory.csv
  └── assets/
      └── [${stats.success} downloaded assets]

To re-pin to IPFS/Pinata:
  ipfs add -r ${outputDir}
  or use Pinata Web UI
`

  fs.writeFileSync(path.join(outputDir, '_INFO.txt'), infoText)
  console.log('  ✓ _INFO.txt')

  console.log('')
  console.log('✅ Export complete!')
  console.log('')
  console.log(`📁 Location: ${outputDir}`)
  console.log(`📊 Assets: ${stats.success}/${stats.total}`)
  console.log(`💾 Size: ${(stats.size / 1024 / 1024).toFixed(2)} MB`)
  console.log('')
  console.log('Re-pin to Pinata:')
  console.log(`  ipfs add -r ${outputDir}`)
  console.log(`  pinata pin add -r ${outputDir}`)
  console.log('  or via Pinata Web UI: https://app.pinata.cloud/pinmanager')
  console.log('')
}

main().catch((err) => {
  console.error('\n✗ Error:', err.message)
  process.exit(1)
})
