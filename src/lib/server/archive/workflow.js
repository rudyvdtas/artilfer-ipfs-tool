import { Buffer } from 'node:buffer'
import { canonicalizeInput } from './canonicalize.js'
import { buildProgressState, createSummary, discoverAndFetch, makeArchiveFile } from './discovery.js'
import { buildManifest, compactReport, createReportData, createReportPayload, toClientReport } from './report.js'
import { safeSegment } from './reference.js'
import { normalizeSeedInput, parseSeedInput, parseSeeds } from './seeds.js'

const MAX_RECORDS = 2000
const MAX_ITEM_TEXT_BYTES = 32 * 1024
const MAX_ITEM_JSON_BYTES = 256 * 1024
const MAX_ARCHIVE_BYTES = 256 * 1024
const MAX_MANIFEST_ITEMS = 100
const MAX_REPORT_ITEMS = 100
const MAX_REPORT_ARCHIVE_FILES = 100
const MAX_NOTES_LENGTH = 500
const MAX_DISCOVERED_REFS = 25

function shouldKeepItemText(item) {
  return Boolean(item?.text) && !item?.textTruncated && (item?.sizeBytes ?? 0) <= MAX_ITEM_TEXT_BYTES
}

function shouldKeepItemJson(item) {
  return Boolean(item?.json) && (item?.sizeBytes ?? 0) <= MAX_ITEM_JSON_BYTES
}

function sanitizeItemForReport(item) {
  return {
    ...item,
    notes: String(item?.notes || '').slice(0, MAX_NOTES_LENGTH),
    discoveredRefs: Array.isArray(item?.discoveredRefs) ? item.discoveredRefs.slice(0, MAX_DISCOVERED_REFS) : [],
    text: shouldKeepItemText(item) ? item.text : '',
    json: shouldKeepItemJson(item) ? item.json : null,
    bytes: null,
  }
}

function sanitizeReport(report) {
  return {
    ...report,
    items: report.items.map(sanitizeItemForReport),
    archiveFiles: report.archiveFiles.slice(0, MAX_REPORT_ARCHIVE_FILES).map((file) => ({ ...file, bytes: null })),
  }
}

export async function scanArchive(inputText, onProgress) {
  const rawInput = normalizeSeedInput(inputText)
  const normalizedInput = await parseSeedInput(canonicalizeInput, rawInput)
  const seeds = parseSeeds(rawInput)
  const finalSeeds = seeds.length ? seeds : parseSeeds(normalizedInput)
  const queue = finalSeeds.map((seed) => ({ seed, parentId: null, depth: 0 }))
  const seen = new Set()
  const items = []
  let iterations = 0
  while (queue.length && items.length < MAX_RECORDS) {
    iterations += 1
    if (iterations > 200) {
      throw new Error('Scan stopped after 200 iterations to prevent a hang.')
    }
    const next = queue.shift()
    if (seen.has(next.seed.canonical)) continue
    seen.add(next.seed.canonical)
    if (process.env.DISCOVERY_DEBUG === '1') {
      console.log('[workflow] processing-seed', {
        seed: next.seed.canonical,
        parentId: next.parentId,
        depth: next.depth,
        queueLength: queue.length,
        seenCount: seen.size,
        itemsCount: items.length,
      })
    }
    let result
    try {
      result = await discoverAndFetch(next.seed, next.parentId, next.depth, onProgress)
    } catch (error) {
      items.push({
        id: items.length + 1,
        parentId: next.parentId,
        depth: next.depth,
        sourceRef: next.seed.raw,
        canonicalRef: next.seed.canonical,
        resolvedUrl: null,
        status: 'error',
        contentType: '',
        sizeBytes: null,
        kind: 'binary',
        archivePath: createArchivePath({ kind: 'binary', contentType: '', nameHint: deriveNameHint(null, next.seed, items.length + 1) }, items.length + 1),
        nameHint: deriveNameHint(null, next.seed, items.length + 1),
        notes: error?.message || 'Scan failed',
        discoveredCount: 0,
        discoveredRefs: [],
        bytes: null,
        text: '',
        json: null,
      })
      continue
    }
    const id = items.length + 1
    const nameHint = result.nameHint || deriveNameHint(null, next.seed, id)
    const item = {
      id,
      parentId: next.parentId,
      depth: next.depth,
      sourceRef: next.seed.raw,
      canonicalRef: next.seed.canonical,
      resolvedUrl: result.resolvedUrl,
      status: result.status,
      contentType: result.contentType,
      sizeBytes: result.bytes ? result.bytes.length : null,
      kind: result.kind,
      archivePath: createArchivePath({ kind: result.kind, contentType: result.contentType, nameHint }, id),
      nameHint,
      notes: result.notes,
      discoveredCount: result.discoveredCount ?? result.discoveredRefs.length,
      discoveredRefs: result.discoveredRefs,
      bytes: result.bytes,
      text: result.text,
      json: result.json,
    }
    items.push(item)
    if (result.status === 'ok') {
      const uniqueDiscovered = []
      const seenLocal = new Set()
      for (const reference of result.discoveredRefs.slice(0, 25)) {
        if (!reference?.canonical || seen.has(reference.canonical) || seenLocal.has(reference.canonical)) continue
        seenLocal.add(reference.canonical)
        uniqueDiscovered.push(reference)
      }
      if (process.env.DISCOVERY_DEBUG === '1') {
        console.log('[workflow] discovered-refs', {
          seed: next.seed.canonical,
          discovered: uniqueDiscovered.length,
          sample: uniqueDiscovered.slice(0, 8).map((ref) => ref.canonical),
        })
      }
      for (const reference of uniqueDiscovered) {
        queue.push({ seed: { raw: reference.raw, canonical: reference.canonical, kind: reference.kind, cid: reference.cid || null, path: reference.path || '' }, parentId: id, depth: next.depth + 1 })
      }
    }
  }

  if (process.env.DISCOVERY_DEBUG === '1') {
    console.log('[workflow] scan-finished', { itemsCount: items.length, seedsCount: finalSeeds.length, seenCount: seen.size })
  }
  const summary = createSummary(items, finalSeeds)
  const manifest = buildManifest({ seeds: finalSeeds, items: items.slice(0, MAX_MANIFEST_ITEMS), summary })
  const csv = ''
  const pinataCsv = ''
  const archiveFiles = [{ path: 'manifest.json', bytes: Buffer.from(JSON.stringify(manifest, null, 2)) }, ...items.filter((item) => item.status === 'ok' && item.bytes && item.bytes.length <= MAX_ARCHIVE_BYTES).map((item) => makeArchiveFile(item, item.id)).slice(0, MAX_REPORT_ARCHIVE_FILES)]
  const report = { seeds: finalSeeds, sourceRefs: finalSeeds.map((seed) => seed.canonical || seed.raw).filter(Boolean), items, summary, manifest, csv, pinataCsv, archiveFiles, progress: buildProgressState(items, finalSeeds) }
  const sanitizedReport = compactReport(sanitizeReport(report))
  return { ...sanitizedReport, ...createReportPayload(sanitizedReport), progress: buildProgressState(items, finalSeeds) }
}

function deriveNameHint(resource, seed, index) {
  if (resource?.url) {
    try {
      const url = new URL(resource.url)
      const base = url.pathname.split('/').pop()
      if (base) return base
    } catch {}
  }
  if (seed?.canonical?.startsWith('ipfs://')) {
    const parts = seed.canonical.replace(/^ipfs:\/\//, '').split('/')
    if (parts.length > 1) return parts[parts.length - 1]
  }
  return `item-${String(index).padStart(4, '0')}`
}

function guessExtension(item) {
  const name = item.nameHint || ''
  const existingExt = name.includes('.') ? `.${name.split('.').pop()}` : ''
  if (existingExt) return existingExt
  const type = String(item.contentType || '').toLowerCase()
  if (item.kind === 'json') return '.json'
  if (item.kind === 'html') return '.html'
  if (item.kind === 'text') return '.txt'
  if (type === 'image/png') return '.png'
  if (type === 'image/jpeg' || type === 'image/jpg') return '.jpg'
  if (type === 'image/gif') return '.gif'
  if (type === 'image/webp') return '.webp'
  if (type === 'image/svg+xml') return '.svg'
  if (type === 'application/pdf') return '.pdf'
  if (type === 'text/csv') return '.csv'
  return '.bin'
}

function createArchivePath(item, index) {
  const folder = item.kind === 'json' ? 'metadata' : item.kind === 'html' ? 'pages' : item.kind === 'text' ? 'notes' : 'assets'
  const base = safeSegment(item.nameHint || `item-${String(index).padStart(4, '0')}`)
  return `${folder}/${String(index).padStart(4, '0')}-${base}${guessExtension(item)}`
}

export { createReportData, toClientReport, buildManifest } from './report.js'

export function makeDownloadHeaders(filename, contentType) {
  return { 'content-type': `${contentType}; charset=utf-8`, 'content-disposition': `attachment; filename="${filename}"` }
}
