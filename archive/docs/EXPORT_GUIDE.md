# IPFS Archive Exporter – Complete Guide

## 🎯 Overview

Dit systeem exporteert elke IPFS-collection met CSV inventory naar een **structureerde, re-pinnable directory** die gebruikers kunnen downloaden en opnieuw kunnen uploaden naar Pinata/IPFS.

### Key Features

✅ **Merkle Tree Preservation** – Originele IPFS-structuur blijft intact  
✅ **Selective Downloads** – Gebruikers kiezen welke assets ze willen  
✅ **Complete Metadata** – Token.json, export-manifest, inventory  
✅ **Multiple Re-pin Options** – Pinata UI, CLI, IPFS daemon, API  
✅ **Universal** – Werkt met elk IPFS-project met CSV inventory  
✅ **Reproducible** – Hetzelfde CID gegenereerd bij re-upload  

---

## 📋 Prerequisites

```bash
# Node.js 16+
node --version

# npm
npm --version
```

### Installation

```bash
# 1. Zorg dat beide scripts in je project root staan:
#    - ipfs-merkle-preserving-exporter.js
#    - export-ipfs-archive.sh

# 2. Maak het shell script executable
chmod +x export-ipfs-archive.sh

# 3. Installeer dependencies
npm install csv-parse node-fetch
```

---

## 🚀 Quick Start

### Scenario 1: Export "First Supper" Collection

```bash
./export-ipfs-archive.sh \
  Qmaje8byBxmFTHDjCvDYLy1NPZkUX1Etx1agDw5HxNqtef \
  "./files to examine/first-supper(1).csv" \
  ./first-supper-archive
```

### Scenario 2: Export Any Other Project

```bash
./export-ipfs-archive.sh \
  YOUR_ROOT_CID \
  ./your-inventory.csv \
  ./your-archive-name
```

### Scenario 3: Metadata Only (No Downloads)

```bash
./export-ipfs-archive.sh \
  YOUR_ROOT_CID \
  ./your-inventory.csv \
  ./your-archive-name \
  --no-download
```

---

## 📁 Output Structure

```
your-archive-name/
│
├── metadata/
│   ├── token.json                    ← Project manifest with all asset refs
│   ├── export-manifest.json          ← Download statistics & CIDs
│   ├── inventory.csv                 ← Original asset list (name,hash)
│   └── [project metadata if available]
│
├── assets/
│   ├── main/                         ← Primary images/composites
│   ├── layers/                       ← Layer-based assets
│   ├── collections/                  ← Grouped by category
│   └── other/                        ← Miscellaneous
│
├── _MERKLE_TREE.txt                  ← Directory visualization
├── _PINATA_README.md                 ← Step-by-step re-pinning guide
└── _EXPORT_INFO.txt                  ← Export metadata & statistics
```

---

## 🔄 How to Re-Pin This Archive

### Option 1: Pinata Web UI (Recommended for Users)

```
1. Go to https://app.pinata.cloud/pinmanager
2. Click "Upload" button
3. Select "Folder"
4. Choose: your-archive-name/
5. IMPORTANT: Enable "Keep directory structure" ✓
6. Click "Upload"
7. Wait for processing...
8. Your new root CID appears in the dashboard
```

### Option 2: IPFS Command Line

```bash
# Requires: local IPFS daemon running
ipfs daemon &

# Add directory recursively (preserves structure)
ipfs add -r your-archive-name/

# Output shows new root CID
# Added YOUR_NEW_CID your-archive-name

# Pin it to ensure persistence
ipfs pin add /ipfs/YOUR_NEW_CID
```

### Option 3: Pinata CLI

```bash
# Install Pinata CLI
npm install -g @pinata/cli

# Login
pinata login

# Pin the directory
pinata pin add -r your-archive-name/

# Shows new CID and confirmation
```

### Option 4: Pinata REST API

```bash
# Useful for automated/programmatic uploads

curl -X POST https://api.pinata.cloud/pinning/pinFileToIPFS \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -F "file=@your-archive-name/" \
  -F "pinataOptions={\"wrapWithDirectory\":true}"
```

---

## 📊 Understanding the Metadata Files

### `token.json`
Complete project manifest containing:
- Root CID reference
- Asset structure and organization
- Merkle tree preservation notes
- Instructions for re-pinning

### `export-manifest.json`
Download statistics:
- Total files downloaded
- Success/failure rates
- Original IPFS CIDs for each asset
- SHA256 hashes for verification
- File sizes and paths

Example:
```json
{
  "exportedAt": "2024-01-15T10:30:00.000Z",
  "totalAssets": 117,
  "totalSize": 110288281,
  "assets": [
    {
      "name": "First Supper — Token URI metadata",
      "cid": "Qmaje8byBxmFTHDjCvDYLy1NPZkUX1Etx1agDw5HxNqtef",
      "path": "metadata/token.json",
      "size": 39561,
      "hash": "a1b2c3d4e5f6g7h8"
    },
    ...
  ]
}
```

### `inventory.csv`
Human-readable asset list:
```csv
hash,name
Qmaje8byBxmFTHDjCvDYLy1NPZkUX1Etx1agDw5HxNqtef,First Supper — Token URI metadata
QmVVKDkMziAXLmSyfhFAF5ev9TNyXVe6dkMGA6YNbRcQSv,First Supper — Main image
QmRoCMEQgSd6QQo9iA2HdDzwSuqoJ3TLEEzNrRdXm7cKYo,First Supper — Layer 1 — Classic
...
```

---

## 🔐 Verifying Integrity

After re-pinning, verify the structure is preserved:

```bash
# 1. Check directory structure is identical
diff -r original/ re-pinned/

# 2. Verify CIDs haven't changed (check export-manifest.json)
cat metadata/export-manifest.json | grep '"cid"'

# 3. Compare file hashes
# Hashes in export-manifest.json should match original IPFS nodes
```

---

## 💡 Use Cases

### For Users
- Download complete NFT project with structure intact
- Understand what assets exist and their relationships
- Re-pin to Pinata for backup or redundancy
- Selective access to specific layers/assets

### For Developers
- Automate archival of IPFS collections
- Generate re-pinnable bundles programmatically
- Preserve project structure across different gateways
- Create migration/backup workflows

### For Artists/Creators
- Preserve your work structure on IPFS
- Create downloadable/re-distributable archives
- Maintain content accessibility across gateways
- Document your projects with metadata

### For Archives/Preservation
- Long-term storage of IPFS-based digital art
- Verify content integrity over time
- Support multiple pinning providers
- Create audit trails with export-manifest

---

## 🛠️ Advanced Usage

### Export Multiple Projects

```bash
# Create a batch export script
for project in projects/*.csv; do
  root_cid=$(head -1 "$project" | cut -d',' -f1)
  output=$(basename "$project" .csv)
  
  ./export-ipfs-archive.sh "$root_cid" "$project" "./$output-archive"
done
```

### Programmatic Access

```javascript
// Read export manifest
const manifest = require('./metadata/export-manifest.json');

// Access assets programmatically
manifest.assets.forEach(asset => {
  console.log(`${asset.name}: ${asset.cid}`);
  console.log(`  Location: ${asset.path}`);
  console.log(`  Size: ${asset.size} bytes`);
});
```

### Generate Custom Layer Organization

Modify `ipfs-merkle-preserving-exporter.js` to organize assets differently:

```javascript
// In the targetDir determination section:
let targetDir = 'assets/other'

if (name.includes('Layer')) {
  // Extract layer number
  const layerMatch = name.match(/Layer (\d+)/)
  if (layerMatch) {
    const layerNum = layerMatch[1].padStart(2, '0')
    targetDir = `assets/layers/layer-${layerNum}`
  }
}
```

---

## 🐛 Troubleshooting

### "Invalid CID format"
```
CID must start with 'Qm' and be approximately 46 characters
Check your root CID is correct
```

### "CSV file not found"
```
Verify the CSV path is correct and file exists
Use absolute paths if relative paths fail: $(pwd)/file.csv
```

### "Download timeouts"
```
Some gateways may be slow. The script retries across multiple gateways.
You can increase timeout in ipfs-merkle-preserving-exporter.js:
  const TIMEOUT = 120000  // 2 minutes instead of 1
```

### "Assets not downloading"
```
Possible causes:
1. IPFS content not available (check with: ipfs.io/ipfs/CID)
2. All gateways temporarily down (try again later)
3. Firewall/network blocking requests (use VPN)
4. Content addressed CID doesn't exist
```

### "Directory structure not preserved after re-pin"
```
Make sure to enable "Keep directory structure" in Pinata UI
If using CLI, the structure should preserve automatically
If not working, check that all files are in output-dir/
```

---

## 📝 CSV Format Requirements

Your CSV should have this format:

```csv
hash,name
QmXXXXXXXXXXX,Asset Name 1
QmYYYYYYYYYYY,Asset Name 2
QmZZZZZZZZZZZ,Asset Name 3
```

**Required columns:**
- `hash` - IPFS CID (v0 format: Qm...)
- `name` - Human-readable asset description

**Optional but helpful:**
- Additional columns are ignored but preserved in output CSV

---

## 🎓 Understanding Merkle Trees

This exporter preserves the **IPFS DAG (Directed Acyclic Graph)** structure:

```
Root CID
├── metadata/ (directory node)
│   ├── token.json (leaf node)
│   ├── export-manifest.json (leaf node)
│   └── inventory.csv (leaf node)
└── assets/ (directory node)
    ├── main/ (directory node)
    │   └── image.bin (leaf node)
    ├── layers/ (directory node)
    │   └── layer-01.bin (leaf node)
    └── other/ (directory node)
        └── file.bin (leaf node)
```

Each directory and file has a unique CID determined by its content.
When you re-pin with identical structure, you get the same CIDs!

---

## 📚 Related Files

- `ipfs-merkle-preserving-exporter.js` - Core Node.js export logic
- `export-ipfs-archive.sh` - Wrapper shell script with UX
- `EXPORT_GUIDE.md` - This file
- Generated `_PINATA_README.md` - In each archive

---

## 🤝 Support & Contributions

For issues or improvements:

1. Check the generated `_MERKLE_TREE.txt` for structure verification
2. Review `_EXPORT_INFO.txt` for export statistics
3. Check `metadata/export-manifest.json` for CID details
4. Review download logs for gateway issues

---

## 📄 License

This tool is provided as-is for archival and re-distribution of IPFS content.
Ensure you have rights to the content you're exporting.

---

## 🎯 Quick Reference

| Task | Command |
|------|---------|
| Export with full download | `./export-ipfs-archive.sh CID inventory.csv output/` |
| Metadata only | `./export-ipfs-archive.sh CID inventory.csv output/ --no-download` |
| See what would happen | `./export-ipfs-archive.sh CID inventory.csv output/ --dry-run` |
| Get help | `./export-ipfs-archive.sh --help` |
| Show detailed output | `./export-ipfs-archive.sh CID inventory.csv output/ --verbose` |

---

Last updated: 2024
