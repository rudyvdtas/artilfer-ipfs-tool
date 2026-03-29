# Refactor Masterplan: Semantische Stevigheid Pipeline

## 📋 Inleiding

Dit plan houdt refactors **incrementeel**, **veilig** en **traceerbaar**. Het is afgestemd op de huidige codebase-werkelijkheid: een deel van de pipeline is al gemoderniseerd, maar contracten tussen scan, report, status en UI zijn nog niet volledig eenduidig.

### Huidige stand van zaken

**Al aanwezig / deels werkend:**
- `src/lib/server/archive/summarize.js` bestaat en wordt gebruikt
- `workflow.js` is deels opgesplitst en gebruikt summarize-logic
- `src/routes/api/scan/[jobId]/status/+server.js` retourneert report-data bij `ready`
- `src/routes/api/scan/+server.js` schrijft jobs en reports weg
- `src/routes/+page.svelte` toont scan-status en export-UI

**Nog niet volledig stabiel:**
- `rootCid` is nog pragmatisch en niet semantisch eenduidig vastgelegd
- discovery kan nog lege output opleveren op real-world input
- UI kan `ready` tonen terwijl de zichtbare output nog leeg is
- report / status / UI contracten zijn nog niet volledig geconsolideerd

### Richtinggevend principe

We refactoren nu eerst de **contractgrenzen** hard:
1. input / ingest
2. discovery + summarization
3. report storage
4. status endpoint
5. UI rendering
6. export readiness

### Volgende logische stap

Voordat we verder modulariseren, doen we eerst deze volgorde:
1. `rootCid` contract expliciet documenteren
2. `workflow.js` rootCid-resolutie en report payload auditen
3. discovery-contract documenteren
4. daarna pas workflow cleanup / modularisatie

Dit voorkomt dat we structureren op een semantiek die nog niet stabiel genoeg is.

---

## 🏗️ Fase 0: Diagnostiek & Contract-Audit (Niet Destructief)

### 0.1 Status Endpoint Contract Audit

**Wat:** `src/routes/api/scan/[jobId]/status/+server.js` controleren op de actuele response shape.

**Scope:**
- controleer welke velden bij `ready` worden teruggegeven
- vergelijk status response met wat de UI leest
- bepaal of `rootCid`, `summary`, `manifest`, `items`, `archiveFiles` en `exportReadiness` consistent zijn

**Output:**
```json
{
  "issues_found": [
    { "field": "...", "problem": "...", "impact": "..." }
  ],
  "consumer_matrix": {
    "+page.svelte": ["reportId", "summary", "manifest", "items", "archiveFiles"],
    "export/car": ["reportId", "rootCid", "archiveFiles"]
  }
}
```

**Validation:**
```bash
npm run build
# handmatige inspectie van de status response
```

**Impact-radius:**
- `src/routes/+page.svelte`
- `src/routes/api/export/car/+server.js`
- `src/lib/server/reports/report-store.js`

**Merk op:** Geen logic-changes hier, alleen contract-inventory.

---

### 0.2 Inventariseer Workflow Helpers

**Wat:** kaart helpers in `workflow.js` in op:
- actief gebruikt
- waar opgeroepen
- deprecated / historisch

**Output:**
```csv
function_name,active,called_from,status,deprecation_reason
```

**Validation:**
```bash
grep -n "function\|export function\|export async function" src/lib/server/archive/workflow.js
```

**Impact-radius:**
- Read-only audit
- Leidt tot P2 cleanup list

---

### 0.3 RootCid Usage Audit

**Wat:** volg elke plaats waar `rootCid` voorkomt en hoe het wordt gebruikt.

**Scope:**
- ingest / scan: waar komt rootCid vandaan?
- report storage: hoe wordt het opgeslagen en teruggeladen?
- status response: hoe wordt het aan UI doorgegeven?
- export: hoe wordt het gebruikt als root?
- UI: wat toont het?

**Output:**
```json
{
  "definition_points": ["workflow.js", "report-store.js"],
  "storage_points": ["report.json"],
  "ui_display": ["+page.svelte"],
  "semantic_risk": "rootCid may be present but not represent a complete DAG root"
}
```

**Impact-radius:**
- P1-concern: dit bepaalt export-semantiek
- Raakt: workflow.js, report-store.js, export routes, +page.svelte

---

### 0.4 Discovery Scope & False-Positive Audit

**Wat:** welke reference-patterns kunnen false positives geven?

**Scope:**
- huidige whitelist-keys in discovery
- error / metadata objecten als noise-bronnen
- custom keys in real-world metadata

**Output:**
```json
{
  "false_positive_sources": [],
  "high_value_keys": [],
  "recommended_whitelist": []
}
```

**Impact-radius:**
- Read-only audit
- Leidt tot P2 discovery refinement

---

## 🎯 Fase 1: Contract Stabilisatie (P1 - Must Fix Before Further Refactor)

### 1.1 RootCid Contract Expliciet Documenteren

**Prioriteit:** P1 — dit bepaalt export- en UI-semantiek

**Doel:** vastleggen wat `rootCid` in deze codebase wél en níet betekent.

**Werkdefinitie in deze fase:**
- `rootCid` is de export-facing root die de pipeline gebruikt voor CAR-export en report-serialization
- `rootCid` hoeft in deze fase nog niet te pretenderen dat het al een bewezen DAG-root is
- de code mag daarom nog fallback-logica bevatten, zolang die expliciet en consistent is

**Te documenteren:**
- waar `rootCid` wordt afgeleid
- welke fallback-volgorde geldt
- welke consumer het als bron van waarheid gebruikt
- welke risico's bestaan als `rootCid` ontbreekt of ambigu is

**Belangrijk:**
Het plan moet hier expliciet vermijden om al een harde DAG-root-belofte te doen als de code die nog niet waarmaakt.

**Deliverable:**
- korte contractsectie in `REPORT_CONTRACTS.md` of `ARCHITECTURE.md`
- korte notitie in `workflow.js` en `report-store.js`
- eventuele UI-terminologie afstemmen op "root / root CID" waar dat semantisch klopt

**Validation:**
- handmatige contract-review van `workflow.js`, `report-store.js`, `api/export/car`, `+page.svelte`
- check dat dezelfde fallback-volgorde overal terugkomt

---

### 1.2 Workflow.js RootCid-ResoluTie en Report Payload Audit

**Prioriteit:** P1 — hier zit de echte pipeline-semantiek

**Wat:** exact volgen hoe `workflow.js` het report bouwt en waar `rootCid` vandaan komt.

**Scope:**
- input canonicalization
- discovery outputs
- seed / item root selection
- report payload assembly
- manifest rootCid sync
- sourceRefs / archiveFiles / items consistency

**Deliverable:**
- audit-notitie met:
  - `definition_points`
  - `storage_points`
  - `export_points`
  - `ui_points`
  - `risks`

**Doel:**
- zichtbaar maken of `rootCid` nu uit seeds, manifest, items of report wordt afgeleid
- zichtbaar maken of report payload lossless genoeg is voor export
- bepalen welke fields echt contractueel zijn en welke alleen derived zijn

**Validation:**
- `npm run build`
- inspectie van gegenereerde report shape via scan
- vergelijk `report.rootCid`, `report.manifest.rootCid`, `job.reportId`, `archiveFiles`

---

### 1.3 Repareer `src/routes/api/scan/[jobId]/status/+server.js` Structuur

**Prioriteit:** P1 — response shape moet eenduidig zijn

**Doel:** status-endpoint moet een stabiele en voorspelbare payload teruggeven.

**Acties:**
- één duidelijke response builder
- `exportReadiness` exact één keer
- ready/non-ready branches zoveel mogelijk compatibel
- progress en report snapshot consistent houden

**Validation:**
```bash
npm run build
npm run lint
```

**Tests toe te voegen:**
- response shape bevat geen dubbele velden
- `exportReadiness` is `null` als job niet ready is
- ready-response bevat `rootCid`, `summary`, `manifest`, `items`, `archiveFiles`

---

### 1.4 Update Export Readiness Contract

**Prioriteit:** P1 — UI en export route moeten hetzelfde begrip gebruiken

**Doel:** één shared readiness-semantiek tussen:
- status endpoint
- UI
- CAR export route

**Werkdefinitie:**
- `canExportCar`
- `canExportCsv`
- `reason`

**Belangrijk:**
Deze stap blijft voorlopig pragmatisch; graph-completeness kan later strenger worden gemaakt.

---

### 1.5 Formaliseer CAR Graph Validatie als Volgende Stap, Niet als Voorwaarde

**Prioriteit:** P1/P2 grens

**Wat:** CAR-validatie is zinvol, maar moet pas strenger worden zodra rootCid-contract en payload-samenhang stabiel zijn.

**Aanpak:**
- eerst aanwezigheid en consistentie
- later graph-traversal en orphan-checks

**Resultaat:**
- plan blijft uitvoerbaar zonder te vroeg strikte DAG-belofte te doen

---

### 1.2 Repareer `src/routes/api/scan/[jobId]/status/+server.js` Structuur

**Prioriteit:** P1 — response shape is broken

**Issue:** Duplicate/malformed `exportReadiness` properties

**Stap 1: Identificeer de huidige shape**

```javascript
// Huidig (FOUT):
{
  jobId,
  status,
  reportId: job.reportId,        // ← line A
  exportReadiness: null,          // ← line B (?)
  // ... meer fields ...
  exportReadiness: job.reportId ? { /* ... */ } : null  // ← line C (duplicate!)
}
```

**Stap 2: Definieer target shape**

```javascript
// Target (CORRECT):
export const JobStatusResponse = {
  jobId: string,
  status: 'queued' | 'scanning' | 'ready' | 'failed',
  reportId: string | null,
  error?: string,
  progress?: {
    processed: number,
    total: number
  },
  exportReadiness: {
    canExportCar: boolean,
    canExportCsv: boolean,
    reason?: string
  } | null
};
```

**Stap 3: Implementeer cleanly**

```javascript
// src/routes/api/scan/[jobId]/status/+server.js

export async function GET({ params }) {
  const job = await loadJob(params.jobId);
  
  if (!job) {
    return new Response(JSON.stringify({
      error: 'Job not found'
    }), { status: 404 });
  }
  
  const report = job.reportId ? await loadReport(job.reportId) : null;
  const exportReadiness = computeExportReadiness(job, report);
  
  return new Response(JSON.stringify({
    jobId: job.id,
    status: job.status,
    reportId: job.reportId,
    error: job.error,
    progress: job.progress,
    exportReadiness
  }));
}

function computeExportReadiness(job, report) {
  if (!report || job.status !== 'ready') {
    return null;
  }
  
  return {
    canExportCar: report.rootCid && report.files?.length > 0,
    canExportCsv: report.files?.length > 0,
    reason: report.rootCid ? undefined : 'Missing rootCid'
  };
}
```

**Validation:**
```bash
# TypeScript compile check
npm run build

# Response shape test
curl http://localhost:5173/api/scan/abc123/status | jq .
# Verify geen duplicate fields
```

**Impact-radius:**
- `src/routes/api/scan/stream/+server.js` (uses same shape via toClientReport)
- `src/routes/+page.svelte` (expects this shape)
- Frontend state store

**Tests toe te voegen:**
```javascript
// test/status-endpoint.test.js
describe('GET /api/scan/[jobId]/status', () => {
  test('response has no duplicate exportReadiness', () => { ... });
  test('exportReadiness is null when job not ready', () => { ... });
  test('exportReadiness has correct boolean flags', () => { ... });
});
```

---

### 1.3 Formaliseer CAR Graph Validatie

**Prioriteit:** P1 — export moet inhoudelijk correct zijn

**Wat:** CAR-export mag niet zonder DAG-check gebeuren

**Implementatie:**

**File:** `src/lib/server/export/car-validator.js` (NEW)

```javascript
/**
 * Valideert of een CAR echt een complete, valide UnixFS DAG is.
 * 
 * Checks:
 * 1. rootCid bestaat in het CAR
 * 2. rootCid is inderdaad een dir/merkle-tree
 * 3. Alle files/folders die geclaimd worden zijn bereikbaar van root
 * 4. Geen orphaned blocks
 */

export async function validateCarGraph(carBuffer, report) {
  const validator = new CarValidator(carBuffer);
  
  // Check 1: root presence
  const hasRoot = validator.hasBlock(report.rootCid);
  if (!hasRoot) {
    throw new Error(
      `CAR missing root block: ${report.rootCid}`
    );
  }
  
  // Check 2: root is directory-like
  const rootBlock = validator.getBlock(report.rootCid);
  const rootNode = dagJson.decode(rootBlock);
  const isDir = rootNode.Links && rootNode.Links.length > 0;
  if (!isDir) {
    throw new Error(
      `rootCid ${report.rootCid} is not a directory/collection`
    );
  }
  
  // Check 3: traverse from root, verify all claimed files
  const reachableRefs = await traverseFromRoot(validator, report.rootCid);
  const claimedRefs = report.files.map(f => f.cid);
  const missing = claimedRefs.filter(c => !reachableRefs.has(c));
  
  if (missing.length > 0) {
    throw new Error(
      `CAR has unreachable files: ${missing.join(', ')}`
    );
  }
  
  // Check 4: orphaned blocks
  const usedBlocks = new Set(reachableRefs);
  usedBlocks.add(report.rootCid);
  const allBlocks = validator.getAllBlockCids();
  const orphaned = allBlocks.filter(c => !usedBlocks.has(c));
  
  if (orphaned.length > 0) {
    console.warn(`CAR has ${orphaned.length} orphaned blocks`);
    // Optional: throw if you want strict cleaning
  }
  
  return {
    isValid: true,
    rootCid: report.rootCid,
    reachableCount: reachableRefs.size,
    orphanedCount: orphaned.length
  };
}

async function traverseFromRoot(validator, rootCid) {
  const visited = new Set();
  const queue = [rootCid];
  
  while (queue.length > 0) {
    const cid = queue.shift();
    if (visited.has(cid)) continue;
    visited.add(cid);
    
    const block = validator.getBlock(cid);
    const node = dagJson.decode(block);
    
    // Follow Links (directory structure)
    if (node.Links) {
      for (const link of node.Links) {
        queue.push(link.Hash || link.Cid);
      }
    }
  }
  
  return visited;
}
```

**Integratie in export route:**

```javascript
// src/routes/api/export/car/+server.js

import { validateCarGraph } from '$lib/server/export/car-validator.js';

export async function POST({ request }) {
  const { jobId } = await request.json();
  const job = await loadJob(jobId);
  const report = await loadReport(job.reportId);
  
  // ... fetch files, build CAR buffer ...
  
  // NEW: Validate graph before returning
  try {
    const validation = await validateCarGraph(carBuffer, report);
    console.log('CAR validation passed:', validation);
  } catch (err) {
    return new Response(JSON.stringify({
      error: 'CAR graph validation failed',
      reason: err.message
    }), { status: 400 });
  }
  
  return new Response(carBuffer, {
    headers: { 'Content-Type': 'application/vnd.ipld.car' }
  });
}
```

**Validation:**
```bash
# Unit test
npm run test -- car-validator.test.js

# Integration: create CAR, validate
curl -X POST http://localhost:5173/api/export/car -d '{"jobId":"..."}' | ipfs dag stat
```

**Impact-radius:**
- `src/routes/api/export/car/+server.js` (adds validation gate)
- `src/lib/server/reports/report-store.js` (report shape consistency)
- CAR generation must be graph-sound

**Tests toe te voegen:**
```javascript
// test/car-validator.test.js
describe('CAR graph validation', () => {
  test('valid CAR passes validation', () => { ... });
  test('CAR without root fails', () => { ... });
  test('CAR with unreachable files fails', () => { ... });
  test('all files in report are reachable', () => { ... });
});
```

---

### 1.4 Status Endpoint Syntax Fix (Uitvoering)

**File:** `src/routes/api/scan/[jobId]/status/+server.js`

**Current state:** Syntactisch vervuild (duplicate exportReadiness)

**Actie:**
1. Verwijder duplicate property
2. Consolideer naar clean shape (zie 1.2)
3. Test response contract

```javascript
// BEFORE (broken)
{
  ...
  reportId: job.reportId,
  exportReadiness: null,   // ← duplicate line
  // andere fields
  exportReadiness: { ... }, // ← duplicate line
}

// AFTER (clean)
{
  jobId: job.id,
  status: job.status,
  reportId: job.reportId || null,
  progress: job.progress,
  exportReadiness: computeExportReadiness(job, report),
  error: job.error
}
```

**Validation:**
```bash
npm run lint
npm run type-check
npm run test
```

---

## 🔧 Fase 2: Verduidelijking & Beperkte Modularisatie (P2 - Refactor For Maintainability)

### 2.1 Discovery-contract documenteren

**Prioriteit:** P2 — eerst expliciet maken wat discovery wel/niet doet

**Doel:** de permissieve reference discovery vastleggen zonder gedrag direct te veranderen.

**Documenteer:**
---

### 2.2 Discovery Scope Expliciet Maken & Documenteren

**Prioriteit:** P2 — heuristiek is nog te breed

**Actie:**

**File:** `src/lib/server/archive/DISCOVERY_SPEC.md` (NEW)

```markdown
# Reference Discovery Specification

## Intent
Extract all IPFS/blockchain references from arbitrary JSON/text input.

## Supported Patterns

### Whitelist Keys (Strict)
```javascript
['uri', 'cid', 'CID', 'tokenURI', 'ipfs', 'gateway']
```

Only these keys are searched.

### Blacklist Objects (Exclusions)
```javascript
['error', 'warning', 'metadata', 'stack']
```

These object types are skipped (reduce false positives).

### Reference Formats
- IPFS CID: Qm... or bafy...
- HTTP URI: https://...ipfs.io/ipfs/Qm...
- Gateway: /ipfs/Qm...

## Limits
- Max 1000 references
- Max depth 5 (prevent infinite recursion)
- Max 10MB input (prevent OOM)

## Examples

### ✓ Supported
```json
{
  "uri": "https://gateway.pinata.cloud/ipfs/QmXxx",
  "cid": "QmXxx",
  "nested": { "tokenURI": "ipfs://QmYyy" }
}
```

### ✗ Unsupported
```json
{
  "error": "Failed to fetch from /ipfs/QmZzz",  // blacklist
  "href": "/docs/ipfs",                         // not whitelisted
  "customKey": "QmWww"                          // not whitelisted
}
```

## Future Enhancements
- Support custom key whitelists
- Support configurable depth limits
- Support reference type filtering
```

**Update discover.js:**

```javascript
export async function discoverReferences(input, options = {}) {
  const {
    maxRefs = 1000,
    maxDepth = 5,
    keyWhitelist = ['uri', 'cid', 'CID', 'tokenURI', 'ipfs', 'gateway'],
    keyBlacklist = ['error', 'warning', 'metadata', 'stack', 'comment']
  } = options;
  
  // ... implementation with explicit lists ...
}
```

**Validation:**
```bash
# Test discovery against known false-positive sources
npm run test -- discover.test.js

# Manual audit: run against real data, spot false positives
node scripts/audit-discovery.js < test-data.json
```

---

### 2.3 Report vs Export-Artifact: Duidelijke Grens

**Prioriteit:** P2 — semantische helderheid

**Huidige situatie:**
- Report wordt gebruikt voor preview ÉN als basis voor export
- Truncation/normalisatie kan report inconsistent maken

**Target:**

```
Report (stateful) → canonische vorm
  ↓
Export (derived) → CAR/CSV/JSON
```

**File:** `src/lib/server/reports/report-contracts.js` (NEW)

```javascript
/**
 * Definieer wat een Report moet bevatten
 * versus wat alleen in Export zit
 */

export const REPORT_SCHEMA = {
  id: { type: 'string', required: true },
  jobId: { type: 'string', required: true },
  rootCid: { type: 'string', required: true, desc: 'Actual DAG root' },
  files: {
    type: 'array',
    items: {
      path: 'string',
      cid: 'string',
      bytes: 'number',
      kind: 'string'
    },
    required: true
  },
  summary: {
    totalFiles: 'number',
    totalBytes: 'number',
    fileTypes: 'object',
    kindBreakdown: 'object'
  },
  manifest: {
    type: 'object',
    required: true
  },
  createdAt: { type: 'date', required: true },
  
  // Niet voor truncation:
  // - normalisatie moet lossless zijn
  // - alle files moeten present zijn
};

export const EXPORT_CAR_CONTRACT = {
  buffer: 'bytes',
  contentType: 'application/vnd.ipld.car',
  rootCid: 'string',
  validated: 'boolean'
};

export const EXPORT_CSV_CONTRACT = {
  rows: 'array',
  filename: 'string',
  contentType: 'text/csv'
};

/**
 * Valideer report tegen schema
 */
export function validateReportSchema(report) {
  const errors = [];
  
  if (!report.rootCid) errors.push('Missing rootCid');
  if (!report.files || report.files.length === 0) errors.push('Empty files');
  if (!report.manifest) errors.push('Missing manifest');
  
  for (const file of report.files) {
    if (!file.cid || !file.path || !file.bytes) {
      errors.push(`Invalid file: ${JSON.stringify(file)}`);
    }
  }
  
  if (errors.length > 0) {
    throw new Error(`Report validation failed:\n${errors.join('\n')}`);
  }
  
  return true;
}
```

**Update report-store.js:**

```javascript
import { validateReportSchema } from './report-contracts.js';

export async function saveReport(report) {
  // Validate before save
  validateReportSchema(report);
  
  // Save losslessly (no normalisatie/truncation)
  const stored = await db.reports.insert({
    ...report,
    savedAt: new Date()
  });
  
  return stored;
}

export async function loadReport(reportId) {
  const report = await db.reports.findOne({ id: reportId });
  
  // Validate after load
  validateReportSchema(report);
  
  return report;
}
```

**Validation:**
```bash
npm run test -- report-contracts.test.js

# Verify no report is loaded/saved without validation
npm run coverage src/lib/server/reports/
```

**Impact-radius:**
- `src/lib/server/reports/report-store.js`
- `src/lib/server/archive/workflow.js`
- `src/routes/api/export/car/+server.js`
- `src/routes/api/export/csv/+server.js`

---

### 2.4 Opruimen Ongebruikte Helpers in workflow.js

**Prioriteit:** P2 — code quality

**Stap 1: Identificeer (uit Fase 0.2 audit)**

```javascript
// Unused/deprecated:
- buildTreeNode
- insertFile
- normalizeArchiveFiles
- buildArchiveCar (marked deprecated)
- toNodeBuffer, makeUnixfsFileNode, makeUnixfsDirNode, cidForBytes
```

**Stap 2: Verwijder**

```javascript
// src/lib/server/archive/workflow.js

// DELETE these functions and their tests
- export function buildTreeNode(...) { ... }
- export function insertFile(...) { ... }
// etc.
```

**Stap 3: Update imports**

```bash
grep -r "buildTreeNode\|insertFile" src/ --include="*.js"
# Verify nothing external imports these
```

**Validation:**
```bash
npm run build  # Ensure no dangling imports
npm run lint
```

---

## 📋 Fase 3: Polish & Consistency (P3 - UX/Terminology)

### 3.1 UI Copy & Terminologie Harmoniseren

**Prioriteit:** P3 — UX clarity

**Glossary oprichten:**

**File:** `docs/TERMINOLOGY.md` (NEW)

```markdown
# Terminology Glossary

## Core Concepts

### Root CID
The actual DAG root of the scanned archive. This is the CID that all files and folders are nested under.
**Usage:** "Root CID: Qm..."
**Not:** "Root", "Source CID", "Entry point"

### Source References
The initial CIDs/URIs provided as input.
**Usage:** "Found 3 source references"
**Not:** "Refs", "Links", "Addresses"

### Archive
The complete collection of files under a root CID.
**Usage:** "Archive contains 42 files"

### Manifest
Machine-readable description of the archive structure.
**Usage:** "Manifest available for export"

### Export
Process of generating a downloadable artifact (CAR, CSV).
**Not:** "Download", "Publish", "Sync"

## UI Labels Reference

| Component | Label | Description |
|-----------|-------|-------------|
| Input field | "IPFS Root or tokenURI" | Accept CID, HTTP URI, or tokenURI |
| Status | "Scanning..." | In progress |
| Export button | "Export Archive (CAR)" | Generate CAR file |
| Report | "Archive Report" | Summary of scanned content |

```

**Update +page.svelte:**

```svelte
<!-- src/routes/+page.svelte -->

<script>
  const labels = {
    rootInput: 'Enter IPFS Root CID or tokenURI',
    scanning: 'Scanning archive...',
    scanComplete: 'Scan complete',
    exportCar: 'Export Archive (CAR)',
    exportCsv: 'Export Summary (CSV)',
    rootCid: 'Root CID',
    sourceRefs: 'Source References',
    helpText: `
      Paste the root CID of an IPFS directory or NFT collection.
      We'll discover all contents and prepare for export.
    `
  };
</script>

<label for="root">
  {labels.rootInput}
  <input 
    id="root"
    type="text"
    placeholder="Qm... or https://..."
    bind:value={input}
  />
</label>

{#if report}
  <h2>{labels.rootCid}: {report.rootCid}</h2>
  <p>Source References: {report.sourceRefs.length}</p>
{/if}
```

**Validation:**
```bash
# Check consistency across all UI strings
grep -r "Root\|root\|Root CID\|RootCid" src/routes/ --include="*.svelte"
# Verify all match TERMINOLOGY.md
```

---

### 3.2 Logging & Event Language Harmonisatie

**Prioriteit:** P3 — debugging clarity

**File:** `src/lib/server/logging.js` (NEW)

```javascript
/**
 * Gestandaardiseerde event logging
 */

const EVENTS = {
  SCAN_STARTED: 'scan:started',
  SCAN_COMPLETED: 'scan:completed',
  SCAN_FAILED: 'scan:failed',
  REF_DISCOVERED: 'ref:discovered',
  FILE_FETCHED: 'file:fetched',
  FILE_SKIPPED: 'file:skipped',
  EXPORT_REQUESTED: 'export:requested',
  EXPORT_COMPLETED: 'export:completed',
  EXPORT_FAILED: 'export:failed',
  VALIDATION_FAILED: 'validation:failed'
};

export function logEvent(eventType, data) {
  const timestamp = new Date().toISOString();
  console.log(JSON.stringify({
    timestamp,
    event: eventType,
    ...data
  }));
}

export function logScanned(jobId, fileCount) {
  logEvent(EVENTS.SCAN_COMPLETED, { jobId, fileCount });
}

export function logExportFailed(jobId, reason) {
  logEvent(EVENTS.EXPORT_FAILED, { jobId, reason });
}
```

**Gebruik in code:**

```javascript
import { logEvent } from '$lib/server/logging.js';

export async function scanArchive(input) {
  try {
    const report = { /* ... */ };
    logEvent('scan:completed', { files: report.files.length });
  } catch (err) {
    logEvent('scan:failed', { error: err.message });
  }
}
```

---

## 🚀 Executie Plan: Week-by-Week

### Week 1: Fase 0 (Diagnostiek) + Fase 1.1-1.2 (Foundation)

| Day | Task | Ownership | Validation |
|-----|------|-----------|-----------|
| Mon | Status endpoint audit (0.1) | QA | npm lint + manual inspection |
| Tue | Implement rootCid semantics (1.1) | Dev | tests pass + DAG validation works |
| Wed | Implement CAR graph validator (1.3) | Dev | unit tests + integration test |
| Thu | Fix status endpoint (1.2, 1.4) | Dev | npm build + response contract test |
| Fri | Integration test all P1 changes | QA | Full pipeline test with real IPFS data |

### Week 2: Fase 1.3 (Continued) + Fase 2.1-2.2 (Refactor)

| Day | Task | Ownership | Validation |
|-----|------|-----------|-----------|
| Mon | Implement CAR validator production (1.3 continued) | Dev | All CAR tests pass |
| Tue | Extract canonicalize.js (2.1.1) | Dev | Unit tests + integration |
| Wed | Extract discovery.js (2.1.2) | Dev | Unit tests + discovery audit script |
| Thu | Extract summarize.js (2.1.3) | Dev | Unit tests |
| Fri | Update workflow.js orchestrator (2.1.4) | Dev | Full test suite passes |

### Week 3: Fase 2.3-2.4 + Fase 3

| Day | Task | Ownership | Validation |
|-----|------|-----------|-----------|
| Mon | Implement report contracts (2.3) | Dev | Schema validation tests |
| Tue | Remove unused helpers (2.4) | Dev | npm build + all imports verified |
| Wed | Harmonize UI terminology (3.1) | Design/Dev | Terminology.md + all labels match |
| Thu | Standardize logging (3.2) | Dev | All events logged consistently |
| Fri | Full regression test + documentation | QA | All tests pass, docs complete |

---

## ✅ Acceptance Criteria Per Fase

### Fase 1: Foundation
- [ ] rootCid is expliciet DAG-root
- [ ] Status endpoint heeft geen duplicate fields
- [ ] CAR export valideert graph completeness
- [ ] Alle P1 tests groen
- [ ] No regression in existing functionality

### Fase 2: Refactoring
- [ ] workflow.js < 300 lines (was >500)
- [ ] Canonicalize/Discover/Summarize zijn aparte modules
- [ ] Report vs Export contracts defined
- [ ] Unused helpers removed
- [ ] Code coverage > 80%

### Fase 3: Polish
- [ ] TERMINOLOGY.md complete en consistent
- [ ] UI labels matched to terminology
- [ ] Logging structured en consistent
- [ ] Documentation updated

---

## 🔍 Risk Mitigation

### Major Risks

#### Risk: rootCid change breaks existing reports
**Mitigation:**
- Run migration script op bestaande reports
- Validate all reports after migration
- Keep old rootCid as sourceRef for backwards compatibility

#### Risk: workflow.js refactor introduces regressions
**Mitigation:**
- Each module tested independently
- Integration tests before final merge
- Staged rollout (10% → 50% → 100%)

#### Risk: CAR validator is too strict, blocks valid exports
**Mitigation:**
- Validator has `--permissive` mode for debugging
- Log detailed validation failures
- Gather real-world export samples to test

### Testing Strategy

```bash
# Unit tests per module
npm run test -- canonicalize.test.js
npm run test -- discover.test.js
npm run test -- car-validator.test.js

# Integration tests
npm run test -- workflow.integration.test.js
npm run test -- export.integration.test.js

# End-to-end
npm run test:e2e -- scan-export-flow.test.js

# Regression suite
npm run test:regression -- before-refactor-data.json
```

---

## 📚 Documentation Requirements

### To Create
- [ ] `DISCOVERY_SPEC.md` — Reference discovery rules & limits
- [ ] `TERMINOLOGY.md` — UI/code terminology glossary
- [ ] `REPORT_CONTRACTS.md` — Report schema spec
- [ ] `CAR_VALIDATION.md` — Graph validation rules
- [ ] `ARCHITECTURE.md` — High-level module organization

### To Update
- [ ] `README.md` — Add links to new docs
- [ ] `src/lib/server/archive/workflow.js` — Add module comments
- [ ] `src/routes/api/scan/+server.js` — Document status codes
- [ ] `src/routes/api/export/car/+server.js` — Document validation

---

## 🎯 Success Metrics

After all phases complete:

| Metric | Before | Target | Measurement |
|--------|--------|--------|-------------|
| workflow.js LOC | ~500 | ~200 | wc -l |
| Code test coverage | ~60% | >85% | npm run coverage |
| CAR export validity | Syntactic only | Graph-validated | validator tests |
| UI terminology consistency | ~70% | 100% | terminology audit script |
| Response shape duplicates | Yes | Zero | npm run lint |
| Unused code | ~8 helpers | Zero | unused-exports check |
| Documentation completeness | ~40% | 100% | doc audit checklist |

---

## 📞 Support & Questions

If any step is unclear or you find blockers:
1. Check the validation criteria first
2. Review risk mitigation section
3. Escalate with: phase number, specific step, blockers

Good luck! 🚀
