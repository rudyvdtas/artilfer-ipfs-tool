#!/bin/bash

################################################################################
# Example: Export First Supper NFT Collection
################################################################################
#
# Dit script toont hoe je het universele export-systeem gebruikt voor
# een specifiek project (First Supper), maar dezelfde aanpak werkt
# voor elk IPFS-project met CSV inventory.
#
# USAGE:
#   ./example-export-first-supper.sh
#
# Dit script zal:
#   1. First Supper root CID gebruiken
#   2. De CSV inventory uit "files to examine/" laden
#   3. Een gestructureerde archive genereren
#   4. Metadata bestanden aanmaken
#   5. Re-pinning instructies geven
#
################################################################################

set -e

# Kleuren
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m'

# Configuratie voor First Supper
PROJECT_NAME="First Supper"
ROOT_CID="Qmaje8byBxmFTHDjCvDYLy1NPZkUX1Etx1agDw5HxNqtef"
CSV_FILE="./files to examine/first-supper(1).csv"
OUTPUT_DIR="./first-supper-archive"

echo ""
echo -e "${BLUE}╔════════════════════════════════════════════════════════════════╗${NC}"
echo -e "${BLUE}║  Export Example: ${PROJECT_NAME}${NC}"
echo -e "${BLUE}║                                                                ║${NC}"
echo -e "${BLUE}║  This demonstrates how to use the universal IPFS exporter     ║${NC}"
echo -e "${BLUE}║  for a specific project. The same process works for any       ║${NC}"
echo -e "${BLUE}║  IPFS collection with a CSV inventory file.${NC}"
echo -e "${BLUE}╚════════════════════════════════════════════════════════════════╝${NC}"
echo ""

# Check if CSV exists
if [[ ! -f "$CSV_FILE" ]]; then
  echo -e "${YELLOW}⚠  CSV file not found: $CSV_FILE${NC}"
  echo -e "${YELLOW}   Make sure you have exported the IPFS data to 'files to examine/'${NC}"
  exit 1
fi

echo -e "${GREEN}✓${NC} Configuration:"
echo "   Project: $PROJECT_NAME"
echo "   Root CID: $ROOT_CID"
echo "   CSV File: $CSV_FILE"
echo "   Output Dir: $OUTPUT_DIR"
echo ""

# Count assets
ASSET_COUNT=$(($(wc -l < "$CSV_FILE") - 1))
echo -e "${GREEN}✓${NC} Found $ASSET_COUNT assets in inventory"
echo ""

# Show some example assets
echo -e "${GREEN}✓${NC} First 5 assets:"
head -6 "$CSV_FILE" | tail -5 | awk -F',' '{printf "   • %s\n", $2}'
echo ""

# Check if exporter script exists
if [[ ! -f "./export-ipfs-archive.sh" ]]; then
  echo -e "${YELLOW}⚠  export-ipfs-archive.sh not found${NC}"
  echo -e "${YELLOW}   Make sure it's in the current directory${NC}"
  exit 1
fi

# Ask user if they want to proceed
echo -e "${BLUE}═════════════════════════════════════════════════════════════════${NC}"
echo ""
echo "Ready to export. This will:"
echo ""
echo "1. Download metadata and asset information"
echo "2. Create structured directory: $OUTPUT_DIR/"
echo "3. Generate token.json and export-manifest.json"
echo "4. Provide re-pinning instructions"
echo ""
echo "Proceed? (y/n)"
read -r response

if [[ "$response" != "y" && "$response" != "Y" ]]; then
  echo "Cancelled."
  exit 0
fi

echo ""
echo -e "${BLUE}Starting export...${NC}"
echo ""

# Run the exporter
./export-ipfs-archive.sh "$ROOT_CID" "$CSV_FILE" "$OUTPUT_DIR"

# Show results
if [[ -d "$OUTPUT_DIR" ]]; then
  echo ""
  echo -e "${BLUE}═════════════════════════════════════════════════════════════════${NC}"
  echo -e "${GREEN}✓ Export successful!${NC}"
  echo ""
  
  # Show archive size
  ARCHIVE_SIZE=$(du -sh "$OUTPUT_DIR" 2>/dev/null | cut -f1)
  FILE_COUNT=$(find "$OUTPUT_DIR" -type f | wc -l)
  
  echo -e "${GREEN}✓${NC} Archive Statistics:"
  echo "   Location: $OUTPUT_DIR"
  echo "   Total Size: $ARCHIVE_SIZE"
  echo "   Total Files: $FILE_COUNT"
  echo ""
  
  # Show what was generated
  echo -e "${GREEN}✓${NC} Generated Files:"
  [[ -f "$OUTPUT_DIR/metadata/token.json" ]] && echo "   • metadata/token.json"
  [[ -f "$OUTPUT_DIR/metadata/export-manifest.json" ]] && echo "   • metadata/export-manifest.json"
  [[ -f "$OUTPUT_DIR/metadata/inventory.csv" ]] && echo "   • metadata/inventory.csv"
  [[ -f "$OUTPUT_DIR/_MERKLE_TREE.txt" ]] && echo "   • _MERKLE_TREE.txt (directory structure)"
  [[ -f "$OUTPUT_DIR/_PINATA_README.md" ]] && echo "   • _PINATA_README.md (upload guide)"
  [[ -f "$OUTPUT_DIR/_EXPORT_INFO.txt" ]] && echo "   • _EXPORT_INFO.txt (export info)"
  echo ""
  
  # Show next steps
  echo -e "${BLUE}═════════════════════════════════════════════════════════════════${NC}"
  echo -e "${GREEN}Next Steps:${NC}"
  echo ""
  echo "1️⃣  Review the archive structure:"
  echo "   cat $OUTPUT_DIR/_MERKLE_TREE.txt"
  echo ""
  echo "2️⃣  Check export statistics:"
  echo "   cat $OUTPUT_DIR/metadata/export-manifest.json | jq '.stats'"
  echo ""
  echo "3️⃣  Re-pin to Pinata (see guide):"
  echo "   cat $OUTPUT_DIR/_PINATA_README.md"
  echo ""
  echo "4️⃣  Quick re-pin command:"
  echo "   # Option A: Using IPFS (if daemon running)"
  echo "   ipfs add -r $OUTPUT_DIR"
  echo ""
  echo "   # Option B: Using Pinata CLI"
  echo "   pinata pin add -r $OUTPUT_DIR"
  echo ""
  echo "   # Option C: Using Pinata Web UI"
  echo "   https://app.pinata.cloud/pinmanager → Upload → Folder"
  echo ""
  
  # Show how to adapt for other projects
  echo -e "${BLUE}═════════════════════════════════════════════════════════════════${NC}"
  echo -e "${YELLOW}💡 To export OTHER IPFS projects:${NC}"
  echo ""
  echo "Simply use the same command with different parameters:"
  echo ""
  echo "   ./export-ipfs-archive.sh \\\\${NC}"
  echo "     YOUR_PROJECT_ROOT_CID \\\\${NC}"
  echo "     ./your-inventory.csv \\\\${NC}"
  echo "     ./your-project-archive${NC}"
  echo ""
  echo "The tool works with ANY IPFS project that has a CSV inventory file!"
  echo ""
else
  echo -e "${YELLOW}⚠  Export directory not created - export may have failed${NC}"
  exit 1
fi
