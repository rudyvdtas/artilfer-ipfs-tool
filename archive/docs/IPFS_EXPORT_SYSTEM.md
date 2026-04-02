# 🎯 IPFS Archive Export System

## The Problem & The Solution

### The Problem ❌

Your old `.car` files were **not useful** because:
- ❌ Flat structure - no folder organization
- ❌ Not re-pinnable to Pinata easily
- ❌ Users couldn't understand what they were downloading
- ❌ Lost the merkle tree structure
- ❌ Couldn't selectively download assets
- ❌ Not suitable for backup/preservation

### The Solution ✅

**A universal, merkle-preserving export system** that:
- ✅ Maintains complete IPFS directory structure
- ✅ Organizes assets logically (metadata/, assets/layers/, etc.)
- ✅ Provides complete metadata (token.json, export-manifest, CSV)
- ✅ Can be re-pinned to Pinata with same CID structure
- ✅ Allows selective asset access
- ✅ Works with ANY IPFS project with CSV inventory
- ✅ Includes clear instructions for re-pinning

---

## 📦 System Components

### 1. **ipfs-merkle-preserving-exporter.js** (Core Logic)
- Node.js script that does the actual export
- Downloads assets from IPFS gateways
- Organizes them into logical directory structure
- Generates metadata files
- Handles retries and error management

### 2. **export-ipfs-archive.sh** (Universal Wrapper)
- Bash shell script that wraps the Node.js exporter
- Provides consistent CLI experience
- Validates inputs
- Checks dependencies
- Pretty terminal output
- Works for ANY project

### 3. **example-export-first-supper.sh** (Practical Demo)
- Shows how to export First Supper specifically
- But demonstrates the universal process
- Can be adapted for any other project
- Includes helpful prompts and next steps

### 4. **EXPORT_GUIDE.md** (Complete Documentation)
- Detailed usage instructions
- Multiple re-pinning options
- Troubleshooting guide
- CSV format specifications
- Understanding merkle trees
- Advanced use cases

---

## 🚀 Quick Start

### 1. Setup (One-Time)

```bash
# Make scripts executable
chmod +x export-ipfs-archive.sh
chmod +x example-export-first-supper.sh

# Install dependencies
npm install csv-parse node-fetch
```

### 2. Export a Collection

#### Option A: Specific Project (First Supper)

```bash
./export-ipfs-archive.sh \
  Qmaje8byBxmFTHDjCvDYLy1NPZkUX1Etx1agDw5HxNqtef \
  "./files to examine/first-supper(1).csv" \
  ./first-supper-archive
```

#### Option B: Any Other Project

```bash
./export-ipfs-archive.sh \
  YOUR_PROJECT_CID \
  ./your-inventory.csv \
  ./your-archive-name
```

#### Option C: Use the Example Script

```bash
./example-export-first-supper.sh
```

### 3. Access the Generated Archive

```
your-archive-name/
├── metadata/
│   ├── token.json           ← Full manifest
│   ├── export-manifest.json ← Statistics & CIDs
│   └── inventory.csv        ← Asset list
├── assets/
│   ├── main/               ← Primary images
│   ├── layers/             ← Layer assets
│   └── other/              ← Miscellaneous
├── _MERKLE_TREE.txt        ← Directory visualization
└── _PINATA_README.md       ← Re-pinning instructions
```

### 4. Re-Pin to Pinata

See `_PINATA_README.md` in the archive for detailed options, or quick command:

```bash
# Option 1: IPFS CLI
ipfs add -r your-archive-name/

# Option 2: Pinata CLI
pinata pin add -r your-archive-name/

# Option 3: Pinata Web UI
# https://app.pinata.cloud/pinmanager → Upload → Folder
```

---

## 📊 How It Works

### Step-by-Step Process

```
1. VALIDATE
   ├─ Check CID format
   ├─ Verify CSV exists
   └─ Count assets

2. DOWNLOAD
   ├─ Read CSV inventory
   ├─ Download each asset from IPFS
   ├─ Retry across multiple gateways
   └─ Organize into directories

3. ORGANIZE
   ├─ assets/main/     ← Primary images
   ├─ assets/layers/   ← Layer-based assets
   ├─ assets/other/    ← Everything else
   └─ metadata/        ← Project information

4. GENERATE METADATA
   ├─ token.json           ← Project manifest
   ├─ export-manifest.json ← CIDs & statistics
   ├─ inventory.csv        ← Asset list
   ├─ _MERKLE_TREE.txt     ← Visual structure
   └─ _PINATA_README.md    ← Upload guide

5. VERIFY & REPORT
   ├─ Count downloaded files
   ├─ Calculate total size
   ├─ Generate statistics
   └─ Create help documentation
```

### Merkle Tree Preservation

```
Original IPFS:                  Exported Archive:
─────────────────              ──────────────────

Qmaje8... (root)               first-supper-archive/
    │                              │
    ├─ metadata                    ├─ metadata/
    │   ├─ token.json            │   ├─ token.json
    │   └─ inventory.csv         │   └─ inventory.csv
    │                             │
    └─ assets                     └─ assets/
        ├─ main                       ├─ main/
        │   └─ image.jpg              │   └─ image.jpg
        └─ layers                     └─ layers/
            └─ layer-01.png              └─ layer-01.png

When re-pinned with `ipfs add -r`, structure remains IDENTICAL
```

---

## 🎯 Use Cases

### For Users/Collectors
- Download complete projects with all assets
- Understand project structure
- Backup to personal storage
- Re-pin to alternative providers

### For Developers
- Automate archival workflows
- Create migration tools
- Build preservation systems
- Export for analysis

### For Artists/Creators
- Preserve your work structure
- Create downloadable archives
- Maintain control over distribution
- Document project organization

### For Archives/Museums
- Long-term IPFS preservation
- Verify content integrity
- Support multiple pinning providers
- Create audit trails

---

## 📝 CSV Format

Your inventory CSV must be formatted as:

```csv
hash,name
Qmaje8byBxmFTHDjCvDYLy1NPZkUX1Etx1agDw5HxNqtef,First Supper — Token URI metadata
QmVVKDkMziAXLmSyfhFAF5ev9TNyXVe6dkMGA6YNbRcQSv,First Supper — Main image
QmRoCMEQgSd6QQo9iA2HdDzwSuqoJ3TLEEzNrRdXm7cKYo,First Supper — Layer 1 — Classic
```

**Required columns:**
- `hash` - IPFS CID (v0 format: Qm...)
- `name` - Asset description

---

## 🔧 Advanced Options

### Metadata Only (No Downloads)

```bash
./export-ipfs-archive.sh \
  YOUR_CID \
  ./inventory.csv \
  ./archive \
  --no-download
```

### Dry Run (See What Would Happen)

```bash
./export-ipfs-archive.sh \
  YOUR_CID \
  ./inventory.csv \
  ./archive \
  --dry-run
```

### Verbose Output (Debugging)

```bash
./export-ipfs-archive.sh \
  YOUR_CID \
  ./inventory.csv \
  ./archive \
  --verbose
```

### Get Help

```bash
./export-ipfs-archive.sh --help
```

---

## 🎓 Understanding the Output

### `token.json`
```json
{
  "project": "IPFS Merkle-Preserving Archive",
  "rootCID": "Qmaje8...",
  "exportedAt": "2024-01-15T10:30:00Z",
  "structure": {
    "metadata": { "description": "Project metadata" },
    "assets": { "main": "Primary images", "layers": "Layer assets" }
  },
  "downloadedAssets": [...]
}
```

### `export-manifest.json`
Contains detailed statistics:
- Total files downloaded
- Success rate
- Original CIDs
- File sizes
- SHA256 hashes

### `_MERKLE_TREE.txt`
Visual representation of directory structure:
```
first-supper-archive/
├─ metadata/
│  ├─ token.json
│  ├─ export-manifest.json
│  └─ inventory.csv
├─ assets/
│  ├─ main/
│  │  └─ first-supper-main-image.bin
│  ├─ layers/
│  │  ├─ layer-1-classic.bin
│  │  └─ ...
│  └─ other/
├─ _MERKLE_TREE.txt
└─ _PINATA_README.md
```

### `_PINATA_README.md`
Step-by-step instructions for uploading to Pinata via:
- Web UI
- CLI
- REST API
- IPFS daemon

---

## ✅ Verification Checklist

After exporting:

- [ ] Archive directory created
- [ ] `metadata/token.json` exists
- [ ] `metadata/export-manifest.json` exists
- [ ] `metadata/inventory.csv` exists
- [ ] `_MERKLE_TREE.txt` has directory structure
- [ ] `_PINATA_README.md` has upload instructions
- [ ] All assets organized in `assets/` subdirectories
- [ ] Export statistics look reasonable

After re-pinning:

- [ ] New root CID obtained
- [ ] Directory structure preserved
- [ ] All files accessible via new CID
- [ ] CIDs in export-manifest match original

---

## 🐛 Common Issues

### "Invalid CID format"
- Check CID starts with "Qm"
- Should be ~46 characters long

### "CSV file not found"
- Verify file path is correct
- Use absolute paths if in doubt

### "Download timeouts"
- Script retries across multiple gateways
- Increase timeout in exporter.js if needed
- Try again later if gateways are slow

### "Directory structure not preserved"
- Ensure "Keep directory structure" enabled in Pinata UI
- Check all files are in output directory
- Verify re-pinning command includes `-r` flag

---

## 📚 File Reference

| File | Purpose |
|------|---------|
| `ipfs-merkle-preserving-exporter.js` | Core Node.js export logic |
| `export-ipfs-archive.sh` | Universal CLI wrapper |
| `example-export-first-supper.sh` | First Supper example |
| `EXPORT_GUIDE.md` | Complete documentation |
| `IPFS_EXPORT_SYSTEM.md` | This file (overview) |

---

## 🎯 Key Differences: OLD vs NEW

| Feature | Old .CAR | New System |
|---------|----------|-----------|
| **Structure** | Flat | Organized hierarchies |
| **Metadata** | Minimal | Complete (token.json, manifest) |
| **Re-pinnable** | Difficult | Easy (Pinata, IPFS CLI) |
| **Reproducible** | No | Yes (same CID structure) |
| **Selective Access** | No | Yes (organized by type) |
| **Documentation** | None | Complete (guides included) |
| **User Friendly** | Poor | Excellent (clear UI) |
| **Universal** | Limited | Works with any CSV inventory |

---

## 🚀 Next Steps

1. **Try it**: `./export-ipfs-archive.sh --help`
2. **Test**: `./example-export-first-supper.sh`
3. **Adapt**: Use for other projects with CSV files
4. **Preserve**: Keep archives for backup
5. **Share**: Distribute archives to collectors/users

---

## 📞 Support

For issues:
1. Check `_MERKLE_TREE.txt` for structure issues
2. Review `_EXPORT_INFO.txt` for statistics
3. Check gateway status if downloads fail
4. See `EXPORT_GUIDE.md` for detailed troubleshooting

---

## 📄 Summary

This system provides a **complete, production-ready solution** for:
- ✅ Exporting IPFS collections
- ✅ Preserving merkle tree structure
- ✅ Creating re-pinnable archives
- ✅ Serving collectors and preservationists
- ✅ Working with ANY project (not just First Supper)

**One tool. One command. Infinite possibilities.**

---

Created: 2024  
Version: 1.0  
License: MIT
