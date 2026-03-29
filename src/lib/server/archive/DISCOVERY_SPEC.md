# Reference Discovery Specification

## Intent

Discovery is intentionally permissive. It is meant to extract likely IPFS and URL references from mixed JSON/text input without acting as a validator.

## Current contract

The current implementation searches:
- whitelisted object keys for direct string references
- all nested string values for CID-like or IPFS-like references
- text patterns inside free-form strings

This means discovery may find valid references outside the primary keys when they appear in prose or nested data.

## Current defaults

- `maxRefs`: 100
- `maxDepth`: 6 in `discover.js` default, 5 in `workflow.js` usage
- `keyWhitelist`: `['uri', 'cid', 'CID', 'link', 'href', 'tokenURI', 'url', 'reference']`

## What discovery does well

- finds direct IPFS references in common metadata fields
- resolves `ipfs://...` and gateway-style `/ipfs/...` references
- captures references embedded in plain text
- de-duplicates references by canonical form

## False-positive sources

Known noise sources:
- error messages containing IPFS-like strings
- metadata blobs with incidental URLs
- arbitrary prose with CID-like tokens
- unrelated nested objects that happen to contain reference-shaped strings

## Important limitations

- Discovery is not a proof of reachability
- Discovery is not a graph validator
- Discovery does not guarantee that a found CID is the correct archive root
- Discovery can return an empty set on sparse or non-standard input

## Recommended usage

- Use discovery to build a candidate reference set
- Use workflow-level rootCid resolution to select the export-facing root
- Use export readiness checks to decide whether CAR export is allowed
- Do not treat discovery output alone as a complete archive contract

## Operational notes

In `workflow.js` the current discovery depth is intentionally capped at 5 to reduce noise and runaway traversal.

## Future tightening options

Later we can make discovery stricter by:
- restricting text scanning to fewer keys
- adding a blacklist for common noise keys
- introducing configurable traversal depth per source type
- separating metadata discovery from prose scanning
