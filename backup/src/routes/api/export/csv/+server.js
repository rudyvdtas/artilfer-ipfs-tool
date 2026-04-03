
export async function POST({ request }) {
  const body = await request.json().catch(() => null)
  const report = body?.report
  const pinataCsv = report?.pinataCsv || report?.csv || ''

  if (!pinataCsv) {
    return new Response('No cached report found. Please scan first.', { status: 400 })
  }

  try {
    return new Response(pinataCsv, {
      headers: {
        'content-type': 'text/csv; charset=utf-8',
        'content-disposition': 'attachment; filename="importfromipfs.csv"',
      },
    })
  } catch (error) {
    console.error('CSV export failed', error)
    return new Response(
      JSON.stringify({ message: error instanceof Error ? error.message : 'Internal Error' }),
      {
        status: 500,
        headers: { 'content-type': 'application/json; charset=utf-8' },
      },
    )
  }
}
