#!/bin/bash

################################################################################
# IPFS Archive Exporter – Universal Script
################################################################################
#
# DOEL:
# Exporteert elke IPFS collection met CSV inventory naar een structureerde
# directory die geschikt is voor re-pinning op Pinata/IPFS.
#
# GEBRUIK:
#   ./export-ipfs-archive.sh <root-cid> <csv-file> <output-dir>
#
# VOORBEELDEN:
#   # First Supper NFT collection
#   ./export-ipfs-archive.sh \
#     Qmaje8byBxmFTHDjCvDYLy1NPZkUX1Etx1agDw5HxNqtef \
#     ./files\ to\ examine/first-supper\(1\).csv \
#     ./first-supper-archive
#
#   # Day/Night collection
#   ./export-ipfs-archive.sh \
#     QmYourRootCID \
#     ./daynight-inventory.csv \
#     ./daynight-archive
#
#   # Any other IPFS project
#   ./export-ipfs-archive.sh \
#     QmAnotherProject \
#     ./project-inventory.csv \
#     ./project-archive
#
# REQUIREMENTS:
#   - node.js (v16+)
#   - npm
#   - csv-parse package (installed via npm)
#
# OUTPUT STRUCTURE:
#   <output-dir>/
#   ├── metadata/
#   │   ├── token.json                    (project manifest)
#   │   ├── export-manifest.json          (download statistics)
#   │   ├── inventory.csv                 (original asset list)
#   │   └── [other metadata files]
#   ├── assets/
#   │   ├── main/                         (primary images)
#   │   ├── layers/                       (layer-based assets)
#   │   ├── collections/                  (grouped by category)
#   │   └── other/                        (miscellaneous)
#   ├── _MERKLE_TREE.txt                  (directory visualization)
#   ├── _PINATA_README.md                 (re-pinning guide)
#   └── _EXPORT_INFO.txt                  (export metadata)
#
################################################################################

set -e

# ═════════════════════════════════════════════════════════════════════════════
# CONFIGURATIE
# ═════════════════════════════════════════════════════════════════════════════

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
NODE_SCRIPT="${SCRIPT_DIR}/ipfs-merkle-preserving-exporter.js"

# Kleuren voor output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# ═════════════════════════════════════════════════════════════════════════════
# UTILITY FUNCTIES
# ═════════════════════════════════════════════════════════════════════════════

log_info() {
  echo -e "${BLUE}ℹ️  ${1}${NC}"
}

log_success() {
  echo -e "${GREEN}✓ ${1}${NC}"
}

log_error() {
  echo -e "${RED}✗ ${1}${NC}"
}

log_warn() {
  echo -e "${YELLOW}⚠  ${1}${NC}"
}

log_section() {
  echo ""
  echo -e "${BLUE}═══════════════════════════════════════════════════════════${NC}"
  echo -e "${BLUE}  ${1}${NC}"
  echo -e "${BLUE}═══════════════════════════════════════════════════════════${NC}"
  echo ""
}

print_help() {
  cat << 'EOF'

📚 IPFS Archive Exporter – Universal Script
═════════════════════════════════════════════

USAGE:
  ./export-ipfs-archive.sh <root-cid> <csv-file> <output-dir> [options]

REQUIRED ARGUMENTS:
  root-cid      The IPFS root CID of the collection
  csv-file      CSV file with inventory (hash,name format)
  output-dir    Directory where to save the archive

OPTIONS:
  --help        Show this help message
  --no-download Skip downloading, only generate metadata
  --dry-run     Show what would be done without doing it
  --verbose     Show detailed output

EXAMPLES:

  # Export NFT collection with full download
  ./export-ipfs-archive.sh \
    Qmaje8byBxmFTHDjCvDYLy1NPZkUX1Etx1agDw5HxNqtef \
    ./first-supper-inventory.csv \
    ./first-supper-archive

  # Generate metadata only (no downloads)
  ./export-ipfs-archive.sh \
    QmRootCID \
    ./inventory.csv \
    ./archive \
    --no-download

  # Dry run to see what would happen
  ./export-ipfs-archive.sh \
    QmRootCID \
    ./inventory.csv \
    ./archive \
    --dry-run

  # Verbose output for debugging
  ./export-ipfs-archive.sh \
    QmRootCID \
    ./inventory.csv \
    ./archive \
    --verbose

SUPPORTED PROJECT TYPES:
  ✓ NFT Collections (Async Art, etc.)
  ✓ Generative Art Projects
  ✓ Media Archives
  ✓ Any IPFS directory with CSV inventory

CSV FORMAT EXPECTED:
  hash,name
  QmXXXXXXXXXXX,Layer 1 — Classic
  QmYYYYYYYYYYY,Layer 2 — Light Oscillations
  ...

OUTPUT STRUCTURE:
  archive/
  ├── metadata/
  │   ├── token.json
  │   ├── export-manifest.json
  │   └── inventory.csv
  ├── assets/
  │   ├── main/
  │   ├── layers/
  │   └── other/
  ├── _MERKLE_TREE.txt
  ├── _PINATA_README.md
  └── _EXPORT_INFO.txt

RE-PINNING OPTIONS:
  1. Pinata Web UI:
     - https://app.pinata.cloud/pinmanager
     - Upload → Folder → Select archive/

  2. IPFS CLI:
     ipfs add -r archive/

  3. Pinata CLI:
     pinata pin add -r archive/

For more information, see _PINATA_README.md in the exported archive.

EOF
  exit 0
}

# ═════════════════════════════════════════════════════════════════════════════
# VALIDATIE
# ═════════════════════════════════════════════════════════════════════════════

validate_inputs() {
  local root_cid="$1"
  local csv_file="$2"
  local output_dir="$3"

  # Check CID format (basic validation)
  if [[ ! "$root_cid" =~ ^Qm[a-zA-Z0-9]{44}$ ]]; then
    log_error "Invalid CID format: $root_cid"
    log_info "CID should start with 'Qm' and be ~46 characters"
    return 1
  fi

  # Check CSV file exists
  if [[ ! -f "$csv_file" ]]; then
    log_error "CSV file not found: $csv_file"
    return 1
  fi

  # Check CSV has at least one row
  local line_count=$(wc -l < "$csv_file")
  if [[ $line_count -lt 2 ]]; then
    log_error "CSV file appears empty or has no headers: $line_count lines"
    return 1
  fi

  # Verify CSV format (basic)
  if ! head -1 "$csv_file" | grep -q "hash"; then
    log_warn "CSV header doesn't contain 'hash' column - might not be in expected format"
    log_info "Expected format: hash,name"
  fi

  return 0
}

# ═════════════════════════════════════════════════════════════════════════════
# CHECK DEPENDENCIES
# ═════════════════════════════════════════════════════════════════════════════

check_dependencies() {
  log_info "Checking dependencies..."

  # Check Node.js
  if ! command -v node &> /dev/null; then
    log_error "node.js is not installed"
    log_info "Visit https://nodejs.org/"
    return 1
  fi
  log_success "node.js found ($(node --version))"

  # Check npm
  if ! command -v npm &> /dev/null; then
    log_error "npm is not installed"
    return 1
  fi
  log_success "npm found ($(npm --version))"

  # Check Node script exists
  if [[ ! -f "$NODE_SCRIPT" ]]; then
    log_error "Node.js export script not found: $NODE_SCRIPT"
    log_info "Make sure ipfs-merkle-preserving-exporter.js is in the same directory"
    return 1
  fi
  log_success "Export script found"

  # Check if csv-parse is installed globally or needs to be installed
  if ! npm list csv-parse &> /dev/null; then
    log_warn "csv-parse package not found globally"
    log_info "Installing csv-parse..."
    npm install csv-parse 2>&1 | grep -E "(added|up to date)" || true
  fi

  return 0
}

# ═════════════════════════════════════════════════════════════════════════════
# MAIN EXECUTION
# ═════════════════════════════════════════════════════════════════════════════

main() {
  # Parse arguments
  local root_cid=""
  local csv_file=""
  local output_dir=""
  local no_download=false
  local dry_run=false
  local verbose=false

  while [[ $# -gt 0 ]]; do
    case $1 in
      --help)
        print_help
        ;;
      --no-download)
        no_download=true
        shift
        ;;
      --dry-run)
        dry_run=true
        shift
        ;;
      --verbose)
        verbose=true
        shift
        ;;
      *)
        if [[ -z "$root_cid" ]]; then
          root_cid="$1"
        elif [[ -z "$csv_file" ]]; then
          csv_file="$1"
        elif [[ -z "$output_dir" ]]; then
          output_dir="$1"
        else
          log_error "Unknown argument: $1"
          print_help
        fi
        shift
        ;;
    esac
  done

  # Validate arguments provided
  if [[ -z "$root_cid" ]] || [[ -z "$csv_file" ]] || [[ -z "$output_dir" ]]; then
    log_error "Missing required arguments"
    print_help
  fi

  # ─────────────────────────────────────────────────────────────────────────
  # HEADER
  # ─────────────────────────────────────────────────────────────────────────

  clear
  echo ""
  echo -e "${BLUE}"
  cat << 'EOF'
╔═══════════════════════════════════════════════════════════════╗
║     📚 IPFS Archive Exporter – Universal Script              ║
║                                                               ║
║     Export IPFS collections to re-pinnable structure         ║
╚═══════════════════════════════════════════════════════════════╝
EOF
  echo -e "${NC}"
  echo ""

  # ─────────────────────────────────────────────────────────────────────────
  # VALIDASI & SETUP
  # ─────────────────────────────────────────────────────────────────────────

  log_section "Step 1: Validation & Setup"

  if ! validate_inputs "$root_cid" "$csv_file" "$output_dir"; then
    exit 1
  fi

  log_success "Arguments validated"

  if ! check_dependencies; then
    exit 1
  fi

  # Resolve paths
  csv_file="$(cd "$(dirname "$csv_file")" && pwd)/$(basename "$csv_file")"
  output_dir="$(cd "$(dirname "$output_dir")" && pwd)/$(basename "$output_dir")"

  log_success "CSV file: $csv_file"
  log_success "Output directory: $output_dir"
  log_success "Root CID: $root_cid"

  if [[ "$dry_run" == true ]]; then
    log_warn "DRY RUN MODE – No files will be created"
  fi
  if [[ "$no_download" == true ]]; then
    log_warn "METADATA ONLY – Assets will not be downloaded"
  fi

  # Count assets in CSV
  local asset_count=$(($(wc -l < "$csv_file") - 1))
  log_info "Found $asset_count assets in CSV inventory"

  # ─────────────────────────────────────────────────────────────────────────
  # EXECUTE EXPORT
  # ─────────────────────────────────────────────────────────────────────────

  log_section "Step 2: Starting Export"

  if [[ "$dry_run" != true ]]; then
    if [[ "$no_download" == true ]]; then
      log_info "Running in metadata-only mode..."
      log_warn "Assets will not be downloaded - CSV and manifest files only"
    fi

    # Create output directory
    mkdir -p "$output_dir"
    log_success "Output directory created"

    # Run Node.js export script
    if [[ "$verbose" == true ]]; then
      node "$NODE_SCRIPT" "$root_cid" "$output_dir" "$csv_file"
    else
      node "$NODE_SCRIPT" "$root_cid" "$output_dir" "$csv_file" 2>&1 | tee export.log
    fi

    if [[ $? -eq 0 ]]; then
      log_success "Export completed successfully"
    else
      log_error "Export failed - check export.log for details"
      exit 1
    fi
  else
    log_info "Would create directory: $output_dir"
    log_info "Would download $asset_count assets"
    log_info "Would generate metadata files"
  fi

  # ─────────────────────────────────────────────────────────────────────────
  # SUMMARY
  # ─────────────────────────────────────────────────────────────────────────

  log_section "Step 3: Export Summary"

  if [[ "$dry_run" != true ]] && [[ -d "$output_dir" ]]; then
    local total_size=$(du -sh "$output_dir" 2>/dev/null | cut -f1)
    local file_count=$(find "$output_dir" -type f | wc -l)

    echo ""
    echo "  📁 Archive location: $output_dir"
    echo "  📊 Total files: $file_count"
    echo "  💾 Total size: $total_size"
    echo "  🔗 Root CID: $root_cid"
    echo ""

    echo "📚 Generated files:"
    [[ -f "$output_dir/metadata/token.json" ]] && echo "  ✓ metadata/token.json"
    [[ -f "$output_dir/metadata/export-manifest.json" ]] && echo "  ✓ metadata/export-manifest.json"
    [[ -f "$output_dir/metadata/inventory.csv" ]] && echo "  ✓ metadata/inventory.csv"
    [[ -f "$output_dir/_MERKLE_TREE.txt" ]] && echo "  ✓ _MERKLE_TREE.txt"
    [[ -f "$output_dir/_PINATA_README.md" ]] && echo "  ✓ _PINATA_README.md"

    echo ""
    echo "🚀 Next steps:"
    echo "  1. Review: cat $_MERKLE_TREE.txt"
    echo "  2. Upload to Pinata (see _PINATA_README.md)"
    echo "  3. Verify CID matches: cat metadata/export-manifest.json"
    echo ""
  fi

  log_success "Export script completed"
  echo ""
}

# ═════════════════════════════════════════════════════════════════════════════
# RUN
# ═════════════════════════════════════════════════════════════════════════════

main "$@"
