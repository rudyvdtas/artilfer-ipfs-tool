# Auditrapport en plan van aanpak

## Executive summary

De huidige pipeline probeert van een input van IPFS link, tokenURI of CID een CSV- en CAR-export te maken, maar de implementatie is niet als een strakke content pipeline opgezet. In plaats daarvan worden parsing, discovery, reporting, persistence en export te veel vermengd in één flow.

Daardoor ontstaan drie fundamentele problemen:

1. **Identity is niet eenduidig**: rootCid wordt afgeleid uit meerdere bronnen en heuristieken.
2. **Archive graph is niet eenduidig**: de CAR-export schrijft blocks, maar bouwt of valideert geen volledige graph.
3. **Report is lossy**: het report wordt als cache én als bron gebruikt, terwijl het slechts een samenvatting en preview is.

Conclusie: de pipeline moet worden benaderd als een content pipeline met een strict schema, niet als een losse scan/export flow.

---

## Bevindingen per file

### `src/routes/+page.svelte`

**Rol**
- UI voor input, scan, status en export.

**Bevindingen**
- De UI belooft een simpele flow: Scan → CSV → CAR.
- De exportlogica gebruikt twee verschillende bronnen:
  - CSV direct uit `report.pinataCsv`
  - CAR via `reportId` en server-side cached report
- De pagina behandelt `report` als een volledige, export-klare state, terwijl die state in werkelijkheid afgeleid en deels ingekort is.

**Risico**
- Misleidende succeservaring: UI suggereert dat export coherent is, terwijl server-side data mogelijk incompleet of semantisch inconsistent is.

---

### `src/routes/api/scan/+server.js`

**Rol**
- Start scanjob, voert scan uit, slaat report op.

**Bevindingen**
- De input heet hier `ipfsHash`, maar accepteert in praktijk ook URLs, tokenURIs, JSON en vrije tekst.
- Na de scan wordt report opgeslagen met slicing:
  - `items.slice(0, 250)`
  - `archiveFiles.slice(0, 250)`
- Dit maakt de opgeslagen reportversie een preview in plaats van een volledige bron voor export.

**Risico**
- Export kan later falen of incompleet zijn omdat export-kritieke data al bij opslag is afgekapt.

---

### `src/lib/server/archive/workflow.js`

**Rol**
- Centrale scan-, parse-, fetch-, discovery- en reportlogica.

**Bevindingen**
- Te veel verantwoordelijkheden zitten in één bestand.
- Input parsing is multi-mode en heuristisch.
- Canonicalization is bruikbaar, maar niet sterk genoeg als identity-invariant.
- RootCid wordt afgeleid uit meerdere bronnen:
  - manifest.rootCid
  - report.rootCid
  - eerste succesvolle ipfs:// reference
- Discovery is crawl-achtig en kan breed uitbreiden zonder harde scope.
- Manifest en export-artifacts zijn gedeeltelijk beperkt met slices.

**Risico**
- Dit bestand is de kern van de instabiliteit: parsing, identity, discovery en reporting zijn niet strikt gescheiden.

---

### `src/lib/server/reports/report-store.js`

**Rol**
- Persist en laad report JSON.

**Bevindingen**
- Report wordt als JSON opgeslagen.
- `loadReport()` normaliseert enkele velden, maar reconstrueert niets inhoudelijks.
- Er is geen validatie dat de report export-klaar is.

**Risico**
- Report voelt als source of truth, maar is in feite een lossy cache.

---

### `src/routes/api/export/csv/+server.js`

**Rol**
- CSV export vanuit cached report.

**Bevindingen**
- CSV wordt direct teruggegeven uit `report.pinataCsv`.
- Er is geen recomputation vanuit de scan items.
- Als `pinataCsv` ontbreekt of verouderd is, faalt export of is deze incompleet.

**Risico**
- CSV-export is afhankelijk van een eerder geconstrueerd afgeleid artifact, niet van een canonieke bron.

---

### `src/routes/api/export/car/+server.js`

**Rol**
- CAR export vanuit cached report.

**Bevindingen**
- Vereist `reportId`.
- Verwacht `archiveFiles` met `path`, `cid` en `bytes`.
- Eist `rootCid`.
- Valideert geen graph-consistentie.
- Gebruikt `createCarStreamFromFiles()` met losse blocks.

**Risico**
- Export kan technisch slagen, maar inhoudelijk niet geldig zijn als CAR-graph.

---

### `src/lib/server/export/car-stream.js`

**Rol**
- Schrijft CAR stream op basis van files en rootCid.

**Bevindingen**
- Schrijft losse file blocks via `writer.put()`.
- Bouwt geen UnixFS directory DAG.
- Bewijst niet dat `rootCid` daadwerkelijk de root is van de geschreven graph.

**Risico**
- Dit is waarschijnlijk de hoofdoorzaak dat de CAR niet de gewenste resultaten geeft.

---

### `src/lib/server/storage/paths.js`

**Rol**
- Padbeheer voor jobs en reports.

**Bevindingen**
- Functioneel prima.
- Geen inhoudelijke mismatch, maar opslag wordt wel gebruikt als basis voor de report cache.

**Risico**
- Niet de oorzaak, maar de opslaglaag ondersteunt een lossy cache-model.

---

### `src/lib/server/jobs/job-store.js`

**Rol**
- Job lifecycle persistence.

**Bevindingen**
- Simpel en duidelijk.
- Progress wordt gefuseerd bij update.
- Geen directe inhoudelijke probleembron voor export.

**Risico**
- Laag risico; de job-store is niet de kern van de inhoudelijke fout.

---

## Dataverliesmatrix

| Stap | Data aanwezig | Data verloren / verzwakt | Impact |
|---|---|---|---|
| Input | tokenURI, CID, IPFS link, JSON, vrije tekst | exacte intentie van de user kan ambigu blijven | medium |
| Parse / seed normalisatie | canonicalRef, kind, cid, path | originele context en semantische bronidentiteit | medium |
| Fetch / discovery | bytes, text, json, refs, contentType | niet alle refs zijn relevant, maar worden wel opgevolgd | medium |
| Scan item build | parent-child, depth, notes, archivePath | graph-validatie ontbreekt | hoog |
| Report payload | summary, items, archiveFiles, manifest | bronvolledigheid wordt beperkt door slicing | hoog |
| Save report | JSON snapshot | binary fidelity en volledige exportcontext | hoog |
| Load report | genormaliseerde report | geen reconstructie van graph of artifacts | hoog |
| CSV export | pinataCsv | geen bronrecomputatie | medium |
| CAR export | archiveFiles + rootCid | geen graph-validatie, root mogelijk fout | hoog |

---

## RootCid-risicomatrix

| Risico | Oorzaak | Gevolg | Severity |
|---|---|---|---|
| RootCid is leeg | geen ipfs-ref / manifest.rootCid ontbreekt / fallback faalt | CAR export blokkeert | hoog |
| RootCid is fout | fallback naar eerste ipfs:// ref | CAR export heeft verkeerde root | hoog |
| RootCid is niet de archive root | rootCid komt uit broninput, niet uit graph | semantisch ongeldige CAR | hoog |
| RootCid is wel gevuld maar niet gevalideerd | geen graph check | successtatus ondanks fout | hoog |

### Kernobservatie
RootCid is momenteel een afgeleide guess. Het moet een expliciete invariant worden.

---

## CAR-validiteitsanalyse

### Huidige situatie
- CAR wordt opgebouwd uit losse file entries.
- Er is een declaratieve rootCid.
- Er is geen bewezen UnixFS directory-graph.
- Er is geen check dat de root werkelijk in de CAR past.

### Gevolg
De export kan als HTTP-actie slagen, maar de CAR kan inhoudelijk niet coherent zijn voor downstream consumers.

### Minimale eisen voor valide CAR
1. RootCid moet expliciet en bewezen zijn.
2. Alle blocks moeten samen een consistente graph vormen.
3. Directory/file-relaties moeten kloppen.
4. Export moet falen als de graph niet valide is.

---

## Aanbevolen implementatievolgorde

### Fase 1 — Schema en contracten vastleggen
Doel: één eenduidig model voor seed, item, archiveFile, report en export payload.

**Deliverables**
- schema-documentatie
- required/optional/derived velden
- canonical identifiers

---

### Fase 2 — Identity stabiliseren
Doel: rootCid en canonicalRef moeten voorspelbaar en invariant worden.

**Deliverables**
- expliciete root-source
- fallback-regels herzien
- identity-contracten documenteren

---

### Fase 3 — Report scheiden van export artifact
Doel: report is preview/samenvatting, niet de bron voor block-level export.

**Deliverables**
- duidelijk onderscheid tussen summary report en export-ready artifact
- geen truncation van export-kritieke data

---

### Fase 4 — CAR-generatie herontwerpen op graph-validatie
Doel: CAR mag alleen worden geschreven als de graph klopt.

**Deliverables**
- graph-building of graph-validation stap
- root-validatie
- fail-fast bij inconsistente nodes

---

### Fase 5 — CSV en manifest harmoniseren
Doel: CSV, manifest en CAR moeten uit dezelfde canonical bron vertrekken.

**Deliverables**
- dezelfde canonical source voor export artifacts
- consistente field mapping
- voorspelbare file naming

---

### Fase 6 — Regression matrix en controlepunten
Doel: voorkomen dat de pipeline opnieuw scheef groeit.

**Testcases**
- losse CID
- ipfs:// root
- IPFS gateway URL
- tokenURI JSON
- nested metadata met refs
- empty / malformed input

**Controlepunten**
- rootCid aanwezig en correct
- export-items volledig
- CSV correct en compleet
- CAR graph valide
- report en export lopen in sync

---

## Eindadvies

Behandel dit project als een content pipeline met een strict schema, niet als een scan/export script.

De kern is:

- één bron van waarheid voor identity
- één bron van waarheid voor archive graph
- report als samenvatting, niet als bron
- export alleen vanuit gevalideerde artifacten

Als dit consequent wordt doorgevoerd, dan kunnen de uitslagen van scan, CSV en CAR weer coherent met elkaar samenhangen.
