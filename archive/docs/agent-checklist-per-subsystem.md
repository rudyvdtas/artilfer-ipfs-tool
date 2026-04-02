# Agent checklist per subsystem

## Doel
Dit document is bedoeld als technisch startpunt voor een nieuwe LLM-agent of developer in een nieuw contextvenster.

De pipeline moet worden behandeld als een **content pipeline met strict schema**, niet als een losse scan/export flow.

## Kernprincipes

- Eén bron van waarheid voor identity.
- Eén bron van waarheid voor archive graph.
- Report is een samenvatting / preview, geen bron voor block-level export.
- Export gebeurt alleen vanuit gevalideerde artefacten.
- CSV, manifest en CAR moeten uit dezelfde canonieke bron komen.

---

## 1. Input en UI

### Relevante files
- `src/routes/+page.svelte`

### Doel
- Gebruiker kan tokenURI, IPFS link, CID of JSON-input plakken.
- UI moet helder tonen wat er wordt gescand en geëxporteerd.

### Checklist
- [ ] Controleer of de UI correct communiceert welke inputvormen worden ondersteund.
- [ ] Controleer of de tekstuele belofte overeenkomt met backend-gedrag.
- [ ] Controleer of exportknoppen alleen beschikbaar zijn wanneer de benodigde data echt aanwezig is.
- [ ] Controleer of `report`, `lastSuccessfulReport` en `currentJobId` geen tegenstrijdige states veroorzaken.
- [ ] Controleer of de UI niet suggereert dat een report al export-klaar is terwijl dat technisch niet zo is.

### Bekende risico’s
- UI noemt de flow simpel, terwijl de backend heuristisch en multi-source werkt.
- CSV en CAR gebruiken verschillende afhankelijkheden.

### Acceptatiecriteria
- Input intentie is duidelijk.
- Exportstatus is niet misleidend.
- De UI weerspiegelt de echte pipeline-state.

---

## 2. Scan entrypoint en job lifecycle

### Relevante files
- `src/routes/api/scan/+server.js`
- `src/lib/server/jobs/job-store.js`
- `src/routes/api/scan/[jobId]/status/+server.js`
- `src/routes/api/scan/stream/+server.js`

### Doel
- Scanjob wordt correct aangemaakt, uitgevoerd en gerapporteerd.

### Checklist
- [ ] Controleer of inputnamen (`ipfsHash`, `inputText`) semantisch correct zijn.
- [ ] Controleer of jobstatussen logisch verlopen: queued → scanning → ready/failed.
- [ ] Controleer of progress-updates geen foutieve total/current-waarden geven.
- [ ] Controleer of job persistence niet leidt tot verouderde of inconsistente status.
- [ ] Controleer of stream- en pollingpad hetzelfde resultaat representeren.

### Bekende risico’s
- Jobstatus kan “ready” zijn terwijl de exportdata nog niet coherent is.
- `scanArchive` kan validatieproblemen maskeren.

### Acceptatiecriteria
- Job lifecycle is voorspelbaar.
- Status en error reporting zijn eenduidig.

---

## 3. Input parsing en canonicalisatie

### Relevante files
- `src/lib/server/archive/workflow.js`

### Doel
- Zet input om naar canonieke referenties zonder identiteit te verliezen.

### Checklist
- [ ] Controleer `parseSeeds()` voor JSON, line-based input en loose input parsing.
- [ ] Controleer `canonicalizeReference()` op ipfs://, gateway-URL, losse CID en path-suffix.
- [ ] Controleer of `kind: url` niet onbedoeld wordt gebruikt als pseudo-IPFS input.
- [ ] Controleer of raw, canonical, cid en path consistent worden afgeleid.
- [ ] Controleer of canonicalization dezelfde resource altijd gelijk representeert.

### Bekende risico’s
- Meerdere representaties van dezelfde bron kunnen als verschillende bronnen worden behandeld.
- Loose parsing kan onverwachte refs oppikken.

### Acceptatiecriteria
- Dezelfde bron geeft dezelfde canonieke identiteit.
- Parsing is expliciet en voorspelbaar.

---

## 4. Fetch en content type detectie

### Relevante files
- `src/lib/server/archive/workflow.js`

### Doel
- Fetch de juiste content en classificeer die betrouwbaar.

### Checklist
- [ ] Controleer gateway fallback-gedrag.
- [ ] Controleer of HTTP-errors en HTML error pages niet als inhoudelijke success worden geïnterpreteerd.
- [ ] Controleer of `guessKind()` content-type en body-inhoud consistent interpreteert.
- [ ] Controleer of JSON-detectie niet te snel of te laat triggert.
- [ ] Controleer of text/binary/html/json classificatie downstream stabiel blijft.

### Bekende risico’s
- Gateway-responseverschillen kunnen inhoudelijke variatie veroorzaken.
- Content type heuristiek kan verkeerd classificeren.

### Acceptatiecriteria
- Fetch-resultaten zijn reproduceerbaar genoeg voor export.
- Misclassificatie wordt minimaal gehouden.

---

## 5. Discovery en ref-expansion

### Relevante files
- `src/lib/server/archive/workflow.js`

### Doel
- Ontdek gerelateerde refs zonder onbedoelde crawl-explosie.

### Checklist
- [ ] Controleer `extractRefsFromText()` op false positives.
- [ ] Controleer `discoverRefsFromValue()` op depth, node count, max refs en cycle-detectie.
- [ ] Controleer of discovery scope overeenkomt met de productintentie.
- [ ] Controleer of refs uit objectvelden (`uri`, `cid`, `link`, `href`) bewust en relevant zijn.
- [ ] Controleer of dedupe op canonical string voldoende is.

### Bekende risico’s
- Scanner kan crawler-achtig uitbreiden.
- Te brede discovery geeft irrelevante of cyclische resultaten.

### Acceptatiecriteria
- Discovery blijft binnen de beoogde scope.
- Refs zijn relevant en reproduceerbaar.

---

## 6. Item modeling en summary

### Relevante files
- `src/lib/server/archive/workflow.js`

### Doel
- Bouw scanitems en samenvatting op consistente wijze.

### Checklist
- [ ] Controleer itemvelden: `id`, `parentId`, `depth`, `sourceRef`, `canonicalRef`, `resolvedUrl`, `status`, `contentType`, `sizeBytes`, `kind`, `archivePath`, `nameHint`, `notes`, `discoveredCount`, `discoveredRefs`.
- [ ] Controleer dat failed items en ok items duidelijk onderscheiden zijn.
- [ ] Controleer of summary-statistieken overeenkomen met itemdata.
- [ ] Controleer of success/failure tellingen niet door slicing of caching worden vervormd.

### Bekende risico’s
- Summary kan een vollediger beeld suggereren dan de gepersistete exportdata.

### Acceptatiecriteria
- Summary en items zijn intern consistent.

---

## 7. Report construction en persistence

### Relevante files
- `src/lib/server/archive/workflow.js`
- `src/lib/server/reports/report-store.js`
- `src/routes/api/scan/+server.js`

### Doel
- Report moet een betrouwbare preview/snapshot zijn, maar geen onnauwkeurige bron voor export.

### Checklist
- [ ] Controleer welke velden in het report worden opgeslagen en welke verloren gaan.
- [ ] Controleer slicing op `items`, `archiveFiles` en manifest-files.
- [ ] Controleer of reportId, rootCid, summary en manifest onderling kloppen.
- [ ] Controleer `loadReport()` op normalisatie zonder inhoudsverlies te maskeren.
- [ ] Controleer of report-versies expliciet preview vs export-ready zijn.

### Bekende risico’s
- Report wordt als source of truth gebruikt terwijl het lossy is.
- Export kan daardoor afhankelijk zijn van afgekorte data.

### Acceptatiecriteria
- Report-rol is expliciet gedefinieerd.
- Export-kritieke data wordt niet stilletjes verwijderd.

---

## 8. RootCid governance

### Relevante files
- `src/lib/server/archive/workflow.js`
- `src/routes/api/export/car/+server.js`
- `src/routes/+page.svelte`

### Doel
- RootCid moet een expliciete invariant zijn.

### Checklist
- [ ] Controleer waar rootCid ontstaat.
- [ ] Controleer of rootCid uit manifest, report of fallback komt.
- [ ] Controleer of fallback naar eerste ipfs:// reference acceptabel is.
- [ ] Controleer of rootCid de echte archive root vertegenwoordigt en niet alleen een bron-CID.
- [ ] Controleer of UI, report en export exact dezelfde rootCid tonen.

### Bekende risico’s
- RootCid is momenteel een guess in plaats van een invariant.
- Een verkeerde rootCid maakt CAR semantisch onbruikbaar.

### Acceptatiecriteria
- RootCid is expliciet herleidbaar.
- RootCid is consistent over alle lagen.

---

## 9. CSV export

### Relevante files
- `src/routes/api/export/csv/+server.js`
- `src/lib/server/archive/workflow.js`

### Doel
- CSV moet deterministisch en volledig genoeg zijn voor het bedoelde importdoel.

### Checklist
- [ ] Controleer dat `pinataCsv` aanwezig is voor export.
- [ ] Controleer of CSV uit brondata kan worden gereconstrueerd indien nodig.
- [ ] Controleer of CSV dezelfde canonieke CID-lijst gebruikt als de rest van de pipeline.
- [ ] Controleer bestandsnaam en semantiek van `importfromipfs.csv`.

### Bekende risico’s
- CSV is afhankelijk van een afgeleid cached artifact.
- Incompleetheid wordt niet altijd zichtbaar.

### Acceptatiecriteria
- CSV-export is reproduceerbaar en coherent met report en scan.

---

## 10. CAR export en block graph

### Relevante files
- `src/routes/api/export/car/+server.js`
- `src/lib/server/export/car-stream.js`
- `src/lib/server/archive/workflow.js`

### Doel
- Exporteer een semantisch valide CAR met een correcte graph en root.

### Checklist
- [ ] Controleer of alle file entries een geldige `cid` en `bytes` hebben.
- [ ] Controleer of de root echt de graph-root is.
- [ ] Controleer of CAR-export een geldige DAG/UnixFS-structuur vertegenwoordigt.
- [ ] Controleer of losse blocks niet ten onrechte als complete graph worden behandeld.
- [ ] Controleer of export faalt bij graph-inconsistentie in plaats van een misleidende success te geven.

### Bekende risico’s
- CAR kan technisch geschreven zijn maar inhoudelijk ongeldig.
- RootCid kan niet matchen met de blockset.

### Acceptatiecriteria
- CAR-export is graph-consistent en verifieerbaar.

---

## 11. Export contracten en coherentie tussen lagen

### Relevante files
- `src/routes/+page.svelte`
- `src/routes/api/scan/+server.js`
- `src/routes/api/export/csv/+server.js`
- `src/routes/api/export/car/+server.js`
- `src/lib/server/archive/workflow.js`
- `src/lib/server/reports/report-store.js`

### Doel
- Alle lagen moeten dezelfde canonieke data begrijpen.

### Checklist
- [ ] Controleer dat scan, report, CSV en CAR dezelfde identity-definities gebruiken.
- [ ] Controleer dat report een preview blijft en export een gevalideerd artifact gebruikt.
- [ ] Controleer dat truncation geen export-essentiële data weggooit.
- [ ] Controleer dat error states tussen frontend en backend gelijk worden geïnterpreteerd.
- [ ] Controleer dat output van CSV, manifest en CAR logisch samenhangt.

### Bekende risico’s
- Verschillende lagen leven nu gedeeltelijk in verschillende datasemantiek.

### Acceptatiecriteria
- De pipeline is coherent end-to-end.

---

## 12. Prioriteitsvolgorde voor uitvoering

### P1 — Hoogste prioriteit
- RootCid governance
- CAR graph-validatie
- Report truncation en export-contracten

### P2 — Middelhoge prioriteit
- Input canonicalisatie
- Discovery-scope
- CSV/recompute contract

### P3 — Lagere prioriteit
- Naming en UI polishing
- Logging consistentie
- Terminologie harmonisatie

---

## 13. Open vragen voor verdere implementatie

- Is report bedoeld als preview of als export-artefact?
- Wat is de exacte definitie van rootCid in deze applicatie?
- Moet CAR de volledige content-graph representeren of alleen een file bundle?
- Welke inputvormen zijn officieel supported?
- Hoeveel discovery is functioneel gewenst zonder crawler-gedrag?

---

## 14. Eindadvies

Behandel dit systeem als een content pipeline met een strict schema.

De kern is:

- één bron van waarheid voor identity
- één bron van waarheid voor archive graph
- report als samenvatting, niet als bron
- export alleen vanuit gevalideerde artefacten

Als deze principes niet expliciet worden afgedwongen, blijven CSV en CAR semantisch kwetsbaar en kan de pipeline blijven vastlopen of verkeerde resultaten geven.
