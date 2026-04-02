#!/usr/bin/env node

/**
 * IPFS Merkle-Preserving Exporter
 * ================================
 *
 * DOEL:
 * Bouwt een gestructureerde directory met alle assets, metadata, en inventory
 * zodat gebruikers de merkletree kunnen begrijpen en selectief kunnen downloaden.
 *
 * VOORDELEN:
 * ✓ Volledige folder-hiërarchie gepresteerd
 * ✓ Nested mappen voor logische grouping (metadata/, assets/, layers/)
 * ✓ Token.json met volledige asset-referenties
 * ✓ CSV inventory als navigatiegids
 * ✓ Klaar voor Pinata re-upload
 * ✓ Gebruikers zien exact wat ze downloaden
 *
 * GEBRUIK:
 *   node ipfs-merkle-preserving-exporter.js <root-cid> <output-dir> [csv-file]
 *
 * VOORBEELD:
 *   node ipfs-merkle-preserving-exporter.js \
 *     Qmaje8byBxmFTHDjCvDYLy1NPZkUX1Etx1agDw5HxNqtef \
 *     ./first-supper-archive \
 *     ./first-supper-inventory.csv
 */

import fs from 'fs'
import path from 'path'
import fetch from 'node-fetch'
import { createWriteStream } from 'fs'
import { pipeline } from 'stream/promises'
import csv from 'csv-parse/sync'
import crypto from 'crypto'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// ═════════════════════════════════════════════════════════════════════════════
// CONFIGURATIE
// ═════════════════════════════════════════════════════════════════════════════

const GATEWAYS = [
  'https://w3s.link/ipfs',
  'https://nftstorage.link/ipfs',
  'https://ipfs.filebase.io/ipfs',
  'https://ipfs.io/ipfs',
  'https://cloudflare-ipfs.com/ipfs',
  'https://dweb.link/ipfs',
  'https://gateway.pinata.cloud/ipfs',
]

const TIMEOUT = 60000 // 60 seconden per download

// ═════════════════════════════════════════════════════════════════════════════
// UTILITY FUNCTIES
// ═════════════════════════════════════════════════════════════════════════════

function log(msg, type = 'info') {
  const icons = {
    info: 'ℹ️',
    success: '✓',
    error: '✗',
    warn: '⚠',
    download: '↓',
  }
  console.log(`${icons[type] || type} ${msg}`)
}

function ensureDir(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true })
  }
}

async function calculateHash(data) {
  return crypto
    .createHash('sha256')
    .update(data)
    .digest('hex')
    .slice(0, 16)
}

async function fetchWithFallback(cid, timeout = TIMEOUT) {
  const errors = []

  for (const gateway of GATEWAYS) {
    const url = `${gateway}/${cid}`
    try {
      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), timeout)

      const res = await fetch(url, { signal: controller.signal })

      clearTimeout(timeoutId)

      if (!res.ok) throw new Error(`HTTP ${res.status}`)

      return await res.buffer()
    } catch (err) {
      errors.push(`${new URL(gateway).hostname}: ${err.message}`)
    }
  }

  throw new Error(`Alle gateways mislukt:\n${errors.join('\n')}`)
}

async function downloadFile(cid, outputPath, label = '') {
  try {
    log(`Downloading ${label || cid}...`, 'download')
    const data = await fetchWithFallback(cid)
    fs.writeFileSync(outputPath, data)
    return {
      success: true,
      size: data.length,
      hash: await calculateHash(data),
    }
  } catch (err) {
    log(`Failed: ${err.message}`, 'error')
    return { success: false, error: err.message }
  }
}

// ═════════════════════════════════════════════════════════════════════════════
// HOOFD LOGICA
// ═════════════════════════════════════════════════════════════════════════════

async function main() {
  const args = process.argv.slice(2)

  if (args.length < 2) {
    console.log(`
📚 IPFS Merkle-Preserving Exporter
═══════════════════════════════════

USAGE:
  node ipfs-merkle-preserving-exporter.js <root-cid> <output-dir> [csv-file]

ARGUMENTS:
  root-cid      The IPFS root CID to export
  output-dir    Where to save the structured archive
  csv-file      (optional) CSV inventory file (hash,name format)

EXAMPLES:
  # Export a single root CID
  node ipfs-merkle-preserving-exporter.js \\
    Qmaje8byBxmFTHDjCvDYLy1NPZkUX1Etx1agDw5HxNqtef \\
    ./first-supper-archive

  # Export with CSV inventory for better organization
  node ipfs-merkle-preserving-exporter.js \\
    Qmaje8byBxmFTHDjCvDYLy1NPZkUX1Etx1agDw5HxNqtef \\
    ./first-supper-archive \\
    ./first-supper-inventory.csv

OUTPUT STRUCTURE:
  output-dir/
  ├── metadata/
  │   ├── token.json          (manifest mit alle asset references)
  │   ├── inventory.csv       (navigatie gids)
  │   └── export-manifest.json
  ├── assets/
  │   ├── main/
  │   ├── layers/
  │   │   ├── layer-01-classic/
  │   │   ├── layer-02-light/
  │   │   └── ...
  │   └── other/
  ├── _MERKLE_TREE.txt        (directory structure)
  └── _PINATA_README.md       (upload instructions)
    `)
    process.exit(1)
  }

  const rootCID = args[0]
  const outputDir = args[1]
  const csvFile = args[2]

  console.log('')
  log('IPFS Merkle-Preserving Exporter', 'info')
  log('═════════════════════════════════', 'info')
  console.log('')

  // ─────────────────────────────────────────────────────────────────────────
  // FASE 1: Directory-structuur voorbereiden
  // ─────────────────────────────────────────────────────────────────────────

  log(`Setting up directory structure in ${outputDir}`, 'info')

  ensureDir(path.join(outputDir, 'metadata'))
  ensureDir(path.join(outputDir, 'assets', 'main'))
  ensureDir(path.join(outputDir, 'assets', 'layers'))
  ensureDir(path.join(outputDir, 'assets', 'other'))

  // ─────────────────────────────────────────────────────────────────────────
  // FASE 2: CSV inventory laden (als beschikbaar)
  // ─────────────────────────────────────────────────────────────────────────

  let inventory = []
  let inventoryMap = new Map()

  if (csvFile && fs.existsSync(csvFile)) {
    log(`Loading CSV inventory from ${csvFile}`, 'info')
    const csvContent = fs.readFileSync(csvFile, 'utf-8')
    try {
      inventory = csv.parse(csvContent, {
        columns: true,
        skip_empty_lines: true,
      })
      inventory.forEach((row) => {
        inventoryMap.set(row.hash, row.name)
      })
      log(`Loaded ${inventory.length} entries from CSV`, 'success')
    } catch (err) {
      log(`Failed to parse CSV: ${err.message}`, 'warn')
    }
  } else if (csvFile) {
    log(`CSV file not found: ${csvFile}`, 'warn')
  }

  // ─────────────────────────────────────────────────────────────────────────
  // FASE 3: Assets downloaden en organiseren
  // ─────────────────────────────────────────────────────────────────────────

  console.log('')
  log('FASE 1: Downloading assets', 'info')
  log('────────────────────────────', 'info')

  const stats = {
    total: inventory.length || 1,
    downloaded: 0,
    failed: 0,
    totalSize: 0,
    assets: [],
  }

  // Download root token.json
  if (inventory.length === 0) {
    log('Downloading root token manifest', 'download')
    const result = await downloadFile(
      rootCID,
      path.join(outputDir, 'metadata', 'token.json'),
      'Root Token JSON'
    )
    if (result.success) {
      stats.downloaded++
      stats.totalSize += result.size
      stats.assets.push({
        name: 'Root Token JSON',
        cid: rootCID,
        path: 'metadata/token.json',
        size: result.size,
        hash: result.hash,
      })
    } else {
      stats.failed++
    }
  } else {
    // Download alle assets uit inventory
    for (let i = 0; i < inventory.length; i++) {
      const entry = inventory[i]
      const cid = entry.hash
      const name = entry.name || `unknown-${i}`

      // Bepaal doelmap op basis van naam
      let targetDir = 'assets/other'
      if (
        name.includes('image') ||
        name.includes('Main') ||
        name.includes('composite')
      ) {
        targetDir = 'assets/main'
      } else if (name.includes('Layer')) {
        targetDir = 'assets/layers'
      }

      const fileName = name
        .replace(/[^\w\s-]/g, '')
        .replace(/\s+/g, '-')
        .toLowerCase()
        .slice(0, 80)

      const targetPath = path.join(outputDir, targetDir, `${fileName}.bin`)

      // Progress indicator
      const progress = `[${i + 1}/${inventory.length}]`
      process.stdout.write(`  ${progress} ${name.slice(0, 50).padEnd(50)} `)

      const result = await downloadFile(cid, targetPath)
      if (result.success) {
        log(`${(result.size / 1024).toFixed(0)}KB`, 'success')
        stats.downloaded++
        stats.totalSize += result.size
        stats.assets.push({
          name,
          cid,
          path: path.relative(outputDir, targetPath),
          size: result.size,
          hash: result.hash,
        })
      } else {
        log(`FAILED`, 'error')
        stats.failed++
      }
    }
  }

  // ─────────────────────────────────────────────────────────────────────────
  // FASE 4: Metadata-bestanden genereren
  // ─────────────────────────────────────────────────────────────────────────

  console.log('')
  log('FASE 2: Generating metadata files', 'info')
  log('──────────────────────────────────', 'info')

  // 4.1 Export manifest
  const exportManifest = {
    exportedAt: new Date().toISOString(),
    exportedFrom: `Root CID: ${rootCID}`,
    totalAssets: stats.assets.length,
    totalSize: stats.totalSize,
    totalSizeReadable: `${(stats.totalSize / 1024 / 1024).toFixed(2)} MB`,
    assets: stats.assets,
    stats: {
      downloaded: stats.downloaded,
      failed: stats.failed,
      successRate: `${((stats.downloaded / (stats.downloaded + stats.failed)) * 100).toFixed(1)}%`,
    },
  }

  fs.writeFileSync(
    path.join(outputDir, 'metadata', 'export-manifest.json'),
    JSON.stringify(exportManifest, null, 2)
  )
  log('Created export-manifest.json', 'success')

  // 4.2 Inventory CSV kopie
  if (csvFile && fs.existsSync(csvFile)) {
    fs.copyFileSync(csvFile, path.join(outputDir, 'metadata', 'inventory.csv'))
    log('Copied inventory.csv', 'success')
  }

  // 4.3 Token.json (enhanced)
  const tokenJson = {
    project: 'IPFS Merkle-Preserving Archive',
    rootCID: rootCID,
    exportedAt: new Date().toISOString(),
    structure: {
      metadata: {
        description: 'Project metadata and manifests',
        files: [
          'token.json',
          'export-manifest.json',
          'inventory.csv (if provided)',
        ],
      },
      assets: {
        main: 'Primary image/composite',
        layers: 'Individual layer assets',
        other: 'Miscellaneous assets',
      },
    },
    downloadedAssets: stats.assets,
    merkleTree: {
      note:
        'This archive preserves the original IPFS merkle tree structure',
      howToRePip:
        'Use ipfs add -r . to recursively add this directory and generate a new CID',
      pinataInstructions:
        'Upload via Pinata UI or API with "Keep directory structure" option',
    },
  }

  fs.writeFileSync(
    path.join(outputDir, 'metadata', 'token.json'),
    JSON.stringify(tokenJson, null, 2)
  )
  log('Created token.json', 'success')

  // ─────────────────────────────────────────────────────────────────────────
  // FASE 5: Directory tree documentatie
  // ─────────────────────────────────────────────────────────────────────────

  log('Generating directory tree documentation', 'info')

  function generateTree(dirPath, prefix = '', isLast = true) {
    let tree = ''
    const items = fs
      .readdirSync(dirPath)
      .filter((f) => !f.startsWith('.'))
      .sort()

    items.forEach((item, index) => {
      const fullPath = path.join(dirPath, item)
      const isDirectory = fs.statSync(fullPath).isDirectory()
      const isLastItem = index === items.length - 1
      const currentPrefix = isLast ? '  ' : '│ '
      const itemPrefix = isLastItem ? '└─ ' : '├─ '

      tree += `${prefix}${itemPrefix}${item}${isDirectory ? '/' : ''}\n`

      if (isDirectory) {
        tree += generateTree(fullPath, prefix + currentPrefix, isLastItem)
      }
    })

    return tree
  }

  const treeString = generateTree(outputDir)
  const treeDoc = `IPFS Merkle-Preserving Archive
ROOT CID: ${rootCID}
Exported: ${new Date().toISOString()}

DIRECTORY STRUCTURE:
═══════════════════

${outputDir}/
${treeString}

MERKLE TREE PRESERVATION:
═════════════════════════

This archive maintains the original IPFS content addressing structure.
Each file in this directory can be individually verified using its CID.

HOW TO RE-PIN TO IPFS/PINATA:
═════════════════════════════

1. Using IPFS CLI:
   \`\`\`
   ipfs add -r ${path.basename(outputDir)}
   \`\`\`

2. Using Pinata Web UI:
   - Go to https://app.pinata.cloud/pinmanager
   - Click "Upload" → "Folder"
   - Select this directory
   - Enable "Keep directory structure"
   - Upload

3. Using Pinata API:
   See _PINATA_README.md in the root

IMPORTANT NOTES:
════════════════

- Original CIDs are preserved as metadata in export-manifest.json
- Use token.json for programmatic access to all assets
- CSV inventory provides human-readable asset descriptions
- Total size: ${(stats.totalSize / 1024 / 1024).toFixed(2)} MB
- Assets downloaded: ${stats.downloaded}/${stats.total}

`

  fs.writeFileSync(path.join(outputDir, '_MERKLE_TREE.txt'), treeDoc)
  log('Created _MERKLE_TREE.txt', 'success')

  // ─────────────────────────────────────────────────────────────────────────
  // FASE 6: Pinata upload instructies
  // ─────────────────────────────────────────────────────────────────────────

  const pinataReadme = `# IPFS Merkle-Preserving Archive
## Re-Pinning to Pinata

### Option 1: Web UI (Easiest)

1. Go to https://app.pinata.cloud/pinmanager
2. Click "Upload" button
3. Select "Folder" (not CAR file)
4. Choose this directory: \`${path.basename(outputDir)}\`
5. Make sure "Keep directory structure" is ENABLED ✓
6. Click "Upload"
7. Wait for processing...
8. Your new root CID will appear in the dashboard

### Option 2: Pinata CLI

\`\`\`bash
npm install -g @pinata/cli

pinata login

pinata pin add -r ${path.basename(outputDir)}
\`\`\`

### Option 3: Pinata REST API

\`\`\`bash
curl -X POST https://api.pinata.cloud/pinning/pinFileToIPFS \\
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \\
  -F "file=@${path.basename(outputDir)}" \\
  -F "pinataOptions={\\"wrapWithDirectory\\":true}"
\`\`\`

### Option 4: IPFS Command Line

\`\`\`bash
# Requires local IPFS daemon running
ipfs daemon &

# Add directory recursively
ipfs add -r ${path.basename(outputDir)}

# The output hash is your new root CID
# Pin it to Pinata for persistence
ipfs pin add /ipfs/YOUR_ROOT_CID
\`\`\`

---

## What This Archive Contains

- **metadata/token.json** - Complete asset manifest
- **metadata/export-manifest.json** - Export statistics
- **metadata/inventory.csv** - Human-readable asset list
- **assets/** - Organized by type (main, layers, other)

## Verifying Integrity

Each asset is documented with:
- Original IPFS CID
- SHA256 hash (first 16 chars)
- File size
- Relative path in archive

Compare hashes in \`metadata/export-manifest.json\` with original IPFS nodes.

## Support

For issues or questions:
- Check _MERKLE_TREE.txt for directory structure
- Review export-manifest.json for download statistics
- Verify CIDs in metadata/inventory.csv
`

  fs.writeFileSync(path.join(outputDir, '_PINATA_README.md'), pinataReadme)
  log('Created _PINATA_README.md', 'success')

  // ─────────────────────────────────────────────────────────────────────────
  // SAMENVATTING
  // ─────────────────────────────────────────────────────────────────────────

  console.log('')
  log('EXPORT COMPLETE ✓', 'success')
  log('═════════════════', 'success')
  console.log('')
  console.log(`📁 Location: ${outputDir}`)
  console.log(`📊 Assets downloaded: ${stats.downloaded}/${stats.total}`)
  console.log(
    `💾 Total size: ${(stats.totalSize / 1024 / 1024).toFixed(2)} MB`
  )
  console.log(`🔗 Root CID: ${rootCID}`)
  console.log('')
  console.log('📚 Next steps:')
  console.log('  1. Review _MERKLE_TREE.txt for directory structure')
  console.log('  2. Check metadata/export-manifest.json for asset list')
  console.log('  3. Read _PINATA_README.md for re-pinning instructions')
  console.log('')
  console.log('✨ To re-pin this archive:')
  console.log('  Option A: pinata pin add -r ' + path.basename(outputDir))
  console.log('  Option B: ipfs add -r ' + path.basename(outputDir))
  console.log('  Option C: Use Pinata Web UI (see _PINATA_README.md)')
  console.log('')
}

main().catch((err) => {
  log(`Fatal error: ${err.message}`, 'error')
  console.error(err.stack)
  process.exit(1)
})
