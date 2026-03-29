# Workflow RootCid / Report Audit

## Contract summary

The pipeline now treats `rootCid` as export-facing metadata, not as a hard DAG proof.

## Observed resolution order

Across the codebase the effective priority is:
1. `manifest.rootCid`
2. `rootCid`
3. `metadata.rootCid`
4. seed / item fallbacks for pragmatic recovery

## Workflow observations

### Input canonicalization
- scan input is normalized before seed parsing
- JSON inputs may contribute direct root-like fields

### Discovery
- discovery is permissive and reference-oriented
- it can collect multiple candidate references per input
- it does not determine export readiness by itself

### Report assembly
- report payload contains `seeds`, `items`, `summary`, `manifest`, `csv`, `pinataCsv`, `archiveFiles`
- `manifest.rootCid` is synchronized from resolved root data when possible
- `report.rootCid` is materialized into the persisted payload for downstream consumers

### Export-facing consistency
- export and UI should rely on the same resolved rootCid contract
- report storage should not silently contradict `manifest.rootCid`
- archive files must contain the root CID if CAR export is to be allowed

## Risks

- seed/item fallback may recover a root when the manifest is incomplete, but that is still pragmatic rather than guaranteed
- discovery can return candidates that are valid references but not the intended archive root
- report serialization must remain lossless enough for export consumers

## Follow-up

After this audit, the remaining cleanup is:
- keep workflow orchestration readable
- remove deprecated helpers only after confirming no external callers
- separate the remaining helper logic once contracts stay stable
