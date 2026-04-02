# Day / Night Preservation Manifest

Project: **Day/Night Token 83**  
Prepared for: **CAR export + individual IPFS pinning**  
Source root CID: `bafybeieav35xeqj7rzablnncczdixzmwfu2pocoqnvnkzshwihzpfaokoy`

## What is included

- `README.md`
- `cids.txt`
- `index.json`
- `images/` directory
- 13 image files inside `images/`

## Goal

This package is prepared so the collection can be:

1. exported as a CAR file,
2. pinned as a snapshot,
3. and pinned per file for redundancy.

## Recommended Pinata workflow

1. Upload the CAR file after generation.
2. Import or pin the individual files/CIDs from `daynight-cid-inventory.csv`.
3. Keep `daynight-manifest.json` and `daynight-summary-report.txt` with the project records.

## Verification notes

- `daynight-manifest.json` contains the machine-readable file list.
- `daynight-cid-inventory.csv` contains the CID inventory for each file and DAG node.
- The current download set lives in `daynight_downloaded/`.

## Files ready for CAR

- Top-level metadata files: `README.md`, `cids.txt`, `index.json`
- Image DAG root: `images/`
- All 13 image assets listed in the inventory

