import { json } from '@sveltejs/kit'
import { resolveName } from '$lib/server/nft/name-resolver.js'

/**
 * POST /api/nft/resolve
 *
 * Body:     { input: "vitalik.eth" | "0x..." | "example.tez" | "tz1..." }
 * Response: { address, chain, resolvedAt, displayName? }
 */
export async function POST({ request }) {
  let body
  try {
    body = await request.json()
  } catch {
    return json({ error: 'Ongeldig JSON request body' }, { status: 400 })
  }

  const input = typeof body?.input === 'string' ? body.input.trim() : ''
  if (!input) {
    return json({ error: 'Veld "input" is verplicht' }, { status: 400 })
  }

  try {
    const result = await resolveName(input)
    return json(result)
  } catch (err) {
    return json({ error: err.message }, { status: 400 })
  }
}
