import { CID } from 'multiformats/cid'

const GATEWAYS = [
  'https://w3s.link/ipfs',
  'https://ipfs.io/ipfs',
  'https://dweb.link/ipfs',
  'https://cloudflare-ipfs.com/ipfs',
  'https://gateway.pinata.cloud/ipfs',
]

export function stripDecorations(value) {
  return String(value).trim().replace(/^[<"'`(\[]+/, '').replace(/[>"'`)]\.,;]+$/, '')
}

export function repairCommonReferenceTypos(value) {
  const text = String(value || '').trim()
  if (!text) return text
  if (/^ttps?:\/\//i.test(text)) return `h${text}`
  if (/^ipfs:\/[^/]/i.test(text)) return text.replace(/^ipfs:\//i, 'ipfs://')
  return text
}

export function safeSegment(value) {
  return stripDecorations(value)
    .normalize('NFKD')
    .replace(/[^\w.-]+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-+|-+$/g, '')
    .toLowerCase() || 'item'
}

export function parseCid(value) {
  try {
    return CID.parse(value).toString()
  } catch {
    return null
  }
}

export function toCidV1(value) {
  try {
    return CID.parse(value).toV1().toString()
  } catch {
    return value
  }
}

export function canonicalizeReference(raw) {
  const cleaned = repairCommonReferenceTypos(stripDecorations(raw))
  if (!cleaned) return null

  if (/^ipfs:\/\//i.test(cleaned)) {
    const withoutScheme = cleaned.slice('ipfs://'.length)
    const [cidPart, ...rest] = withoutScheme.split('/')
    const cid = parseCid(cidPart)
    if (!cid) return null
    const suffix = rest.length ? `/${rest.join('/')}` : ''
    return { raw: cleaned, canonical: `ipfs://${cid}${suffix}`, kind: 'ipfs', cid, path: suffix }
  }

  if (cleaned.includes('/ipfs/')) {
    const ipfsIndex = cleaned.indexOf('/ipfs/')
    const after = cleaned.slice(ipfsIndex + '/ipfs/'.length)
    const [cidPart, ...rest] = after.split('/')
    const cid = parseCid(cidPart)
    if (!cid) return null
    const suffix = rest.length ? `/${rest.join('/')}` : ''
    return { raw: cleaned, canonical: `ipfs://${cid}${suffix}`, kind: 'ipfs', cid, path: suffix }
  }

  if (/^https?:\/\//i.test(cleaned)) {
    try {
      const url = new URL(cleaned)
      const ipfsIndex = url.pathname.indexOf('/ipfs/')
      if (ipfsIndex !== -1) {
        const after = url.pathname.slice(ipfsIndex + '/ipfs/'.length)
        const [cidPart, ...rest] = after.split('/')
        const cid = parseCid(cidPart)
        if (!cid) return null
        const suffix = rest.length ? `/${rest.join('/')}` : ''
        return { raw: cleaned, canonical: `ipfs://${cid}${suffix}`, kind: 'ipfs', cid, path: suffix }
      }

      return { raw: cleaned, canonical: cleaned, kind: 'url' }
    } catch {
      return null
    }
  }

  const [cidPart, ...rest] = cleaned.split('/')
  const cid = parseCid(cidPart)
  if (!cid) return null
  const suffix = rest.length ? `/${rest.join('/')}` : ''
  return { raw: cleaned, canonical: `ipfs://${cid}${suffix}`, kind: 'ipfs', cid, path: suffix }
}

export function gatewayUrlsForRef(reference) {
  if (!reference?.canonical) return []
  if (reference.kind === 'url') return [reference.canonical]
  const remainder = reference.canonical.replace(/^ipfs:\/\//, '')
  const urls = GATEWAYS.map((gateway) => `${gateway}/${remainder}`)
  try {
    const parsed = new URL(`ipfs://${remainder}`)
    if (parsed.protocol === 'ipfs:') urls.unshift(`https://ipfs.io/ipfs/${remainder}`)
  } catch {}
  return [...new Set(urls)]
}

export function extractRootCidFromReference(reference) {
  if (!reference?.canonical?.startsWith('ipfs://')) return null
  return reference.canonical.replace(/^ipfs:\/\//, '').split('/')[0] || null
}

export function extractCidFromAnyRef(value) {
  if (!value) return null
  const text = String(value).trim()
  if (!text) return null
  if (text.startsWith('ipfs://')) return parseCid(text.replace(/^ipfs:\/\//, '').split('/')[0])
  if (text.includes('/ipfs/')) return parseCid(text.split('/ipfs/')[1]?.split('/')[0] || null)
  if (text.startsWith('http://') || text.startsWith('https://')) {
    try {
      const url = new URL(text)
      const idx = url.pathname.indexOf('/ipfs/')
      if (idx !== -1) return parseCid(url.pathname.slice(idx + '/ipfs/'.length).split('/')[0])
    } catch {
      return null
    }
  }
  return parseCid(text.split('/')[0])
}
