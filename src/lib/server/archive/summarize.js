function countFileTypes(files) {
  const map = {}
  for (const file of files) {
    const path = String(file?.path || '')
    const ext = path.includes('.') ? path.split('.').pop() : 'no-extension'
    map[ext] = (map[ext] || 0) + 1
  }
  return map
}

function countKinds(files) {
  const map = {}
  for (const file of files) {
    const kind = String(file?.kind || 'unknown')
    map[kind] = (map[kind] || 0) + 1
  }
  return map
}

export function summarizeArchive(files, refs) {
  const safeFiles = Array.isArray(files) ? files : []
  const safeRefs = Array.isArray(refs) ? refs : []

  return {
    totalFiles: safeFiles.length,
    totalBytes: safeFiles.reduce((sum, file) => sum + (Number(file?.bytes) || Number(file?.sizeBytes) || 0), 0),
    fileTypes: countFileTypes(safeFiles),
    kindBreakdown: countKinds(safeFiles),
    refs: {
      count: safeRefs.length,
      rootCid: safeRefs[0]?.cid || null,
    },
  }
}
