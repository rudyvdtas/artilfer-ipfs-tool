import { randomUUID } from 'node:crypto'
import { extractCidFromAnyRef, extractRootCidFromReference } from './reference.js'

export const MAX_REPORT_ITEMS = 100
export const MAX_REPORT_ARCHIVE_FILES = 100
export const MAX_REPORT_ITEM_NOTES = 500
export const MAX_REPORT_DISCOVERED_REFS = 25
export const MAX_REPORT_TEXT_LENGTH = 0
export const MAX_REPORT_JSON_KEYS = 0

export const REPORT_TTL_MS = 24 * 60 * 60 * 1000

function sanitizeNotes(value) {
  return String(value || '').slice(0, MAX_REPORT_ITEM_NOTES)
}

function serializeItem(item) {
  return {
    id: item.id,
    parent_id: item.parentId,
    depth: item.depth,
    source_ref: item.sourceRef,
    canonical_ref: item.canonicalRef,
    resolved_url: item.resolvedUrl,
    status: item.status,
    content_type: item.contentType,
    size_bytes: item.sizeBytes,
    kind: item.kind,
    archive_path: item.archivePath,
    name_hint: item.nameHint,
    notes: sanitizeNotes(item?.notes),
    discovered_count: item.discoveredCount,
  }
}

export function compactReport(report) {
  return {
    ...report,
    items: Array.isArray(report?.items)
      ? report.items.slice(0, MAX_REPORT_ITEMS).map((item) => ({
          ...item,
          notes: sanitizeNotes(item?.notes),
          discoveredRefs: Array.isArray(item?.discoveredRefs) ? item.discoveredRefs.slice(0, MAX_REPORT_DISCOVERED_REFS) : [],
          text: '',
          json: null,
          bytes: null,
        }))
      : [],
    archiveFiles: Array.isArray(report?.archiveFiles)
      ? report.archiveFiles.slice(0, MAX_REPORT_ARCHIVE_FILES).map((file) => ({ ...file, bytes: null }))
      : [],
    manifest: report?.manifest ? { ...report.manifest, source_metadata: null } : report?.manifest,
  }
}

function isCompactJsonValue(value, depth = 0) {
  if (value === null || value === undefined) return true
  if (typeof value === 'string') return value.length <= 5000
  if (typeof value === 'number' || typeof value === 'boolean') return true
  if (depth > 4) return false
  if (Array.isArray(value)) return value.length <= 50 && value.every((entry) => isCompactJsonValue(entry, depth + 1))
  if (typeof value === 'object') return Object.keys(value).length <= 50 && Object.values(value).every((entry) => isCompactJsonValue(entry, depth + 1))
  return false
}

function normalizeMetadataValue(value) {
  if (value === null || value === undefined) return ''
  if (typeof value === 'string') return value.trim()
  if (Array.isArray(value)) return value.slice(0, 20).map(normalizeMetadataValue).filter(Boolean).join(', ')
  if (typeof value === 'object') return value.name || value.title || value.label || value.value || '[object]'
  return String(value)
}

function collectMetadataCandidates(metadata) {
  const candidates = []
  if (!metadata || typeof metadata !== 'object') return candidates
  candidates.push(metadata)
  for (const key of ['metadata', 'properties', 'collection', 'project', 'info', 'details']) {
    const nested = metadata[key]
    if (nested && typeof nested === 'object') candidates.push(nested)
  }
  return candidates
}

function extractProjectMetadata(metadata) {
  const candidates = collectMetadataCandidates(metadata)
  const merged = { project_name: null, artists: null, year_of_launch: null, about: null, platform: null, tag: null }
  for (const entry of candidates) {
    const section = {
      project_name: normalizeMetadataValue(entry.name || entry.project_name || entry.title || entry.project),
      artists: normalizeMetadataValue(entry.artist || entry.artists || entry.creator || entry.creators || entry.author || entry.authors),
      year_of_launch: normalizeMetadataValue(entry.year || entry.launch_year || entry.year_of_launch || entry.date || entry.released),
      about: normalizeMetadataValue(entry.description || entry.about || entry.bio || entry.summary),
      platform: normalizeMetadataValue(entry.platform || entry.platforms || entry.marketplace || entry.network),
      tag: normalizeMetadataValue(entry.tags || entry.tag || entry.attributes || entry.categories),
    }
    for (const [key, value] of Object.entries(section)) {
      if (!merged[key] && value) merged[key] = value
    }
  }
  return Object.values(merged).some(Boolean) ? merged : null
}

export function buildManifest(report) {
  const sourceMetadata = report.items.find((item) => item.kind === 'json' && item.status === 'ok' && item.json && isCompactJsonValue(item.json))?.json || null
  const discoveredRefs = [...new Set(report.items.flatMap((item) => item.discoveredRefs || []))].slice(0, MAX_REPORT_DISCOVERED_REFS)
  const sourceInputs = report.seeds.map((seed) => ({ raw: seed.raw, canonical: seed.canonical, kind: seed.kind }))
  return {
    project: 'NFT archive assistant',
    title: 'NFT archive assistant — Powered by ARTfilter',
    generated_at: new Date().toISOString(),
    source_inputs: sourceInputs,
    sourceRefs: sourceInputs.map((seed) => seed.canonical).filter(Boolean),
    project_info: extractProjectMetadata(sourceMetadata),
    source_metadata: sourceMetadata,
    summary: report.summary,
    files: report.items.slice(0, MAX_REPORT_ITEMS).map(serializeItem),
    discovered_refs: discoveredRefs.map((ref) => ref.canonical),
  }
}

export function createReportPayload(report) {
  const reportId = `scan_${randomUUID()}`
  const totalSize = report.items.reduce((sum, item) => sum + (item.sizeBytes || 0), 0)
  const rootCid = extractCidFromAnyRef(report?.manifest?.rootCid) || extractCidFromAnyRef(report?.rootCid) || extractCidFromAnyRef(report?.metadata?.rootCid) || extractCidFromAnyRef(report?.seeds?.[0]?.cid) || extractCidFromAnyRef(report?.seeds?.[0]?.canonical) || extractCidFromAnyRef(report?.seeds?.[0]?.raw) || extractCidFromAnyRef(report?.items?.[0]?.cid) || extractCidFromAnyRef(report?.items?.[0]?.canonicalRef) || extractCidFromAnyRef(report?.items?.[0]?.sourceRef) || null
  return {
    reportId,
    itemCount: report.items.length,
    totalSize,
    size: totalSize,
    rootCid,
    summary: report.summary,
    manifest: { ...report.manifest, rootCid },
    items: report.items.slice(0, MAX_REPORT_ITEMS).map((item) => ({ ...item, path: item.archivePath, size: item.sizeBytes ?? (item.bytes?.length || 0), cid: item.cid || extractRootCidFromReference(item.canonicalRef), notes: sanitizeNotes(item?.notes), discoveredRefs: Array.isArray(item?.discoveredRefs) ? item.discoveredRefs.slice(0, MAX_REPORT_DISCOVERED_REFS) : [], text: '', json: null, bytes: null })),
    archiveFiles: report.archiveFiles.slice(0, MAX_REPORT_ARCHIVE_FILES).map((file, index) => ({ ...file, path: file.path, size: file.size ?? (file.bytes?.length || 0), cid: file.cid || null, index })),
    createdAt: Date.now(),
    expiresAt: Date.now() + REPORT_TTL_MS,
  }
}

export function createReportData(report) {
  return createReportPayload(report)
}

export function toClientReport(report) {
  const compacted = compactReport(report)
  return {
    summary: compacted.summary,
    manifest: compacted.manifest,
    pinataCsv: compacted.pinataCsv,
    archiveFiles: compacted.archiveFiles,
    items: compacted.items.map(serializeItem),
  }
}

