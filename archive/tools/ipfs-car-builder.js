#!/usr/bin/env node

import { CarWriter } from '@ipld/car'
import { CID } from 'multiformats/cid'
import * as dagPB from '@ipld/dag-pb'
import { sha256 } from 'multiformats/hashes/sha2'
import fetch from 'node-fetch'
import fs from 'fs'
import { parse } from 'csv-parse/sync'

const GATEWAYS = ['https://w3s.link/ipfs', 'https://ipfs.io/ipfs', 'https://gateway.pinata.cloud/ipfs']

function makeDir(links) {
  return dagPB.encode(dagPB.prepare({ Links: links }))
}

const [rootCID, csvFile, outputCar] = process.argv.slice(2)

if (!rootCID || !csvFile || !outputCar) {
  console.log('Usage: node build-car-nested.js <cid> <csv> <output.car>')
  process.exit(1)
}

const main = async () => {
  console.log('\n📦 Building Nested CAR...\n')

  const records = parse(fs.readFileSync(csvFile), { columns: true, skip_empty_lines: true })
  const blocks = [] // Store {cid, bytes}
  const assetLinks = []

  console.log(`Downloading ${records.length} assets...`)
  for (let i = 0; i < records.length; i++) {
    const {hash: cid, name} = records[i]
    process.stdout.write(`[${i+1}/${records.length}] ${name.slice(0,40).padEnd(40)} `)

    let data
    for (const gw of GATEWAYS) {
      try {
        const res = await fetch(`${gw}/${cid}`, {timeout: 20000})
        if (res.ok) {
          data = Buffer.from(await res.arrayBuffer())
          break
        }
      } catch(e) {}
    }

    if (data) {
      const h = await sha256.digest(data)
      const id = CID.create(1, 0x55, h)
      blocks.push({cid: id, bytes: data})
      assetLinks.push({Hash: id, Name: name.replace(/[^\w-]/g,'-').toLowerCase().slice(0,60), Tsize: data.length})
      console.log(`✓`)
    } else {
      console.log(`✗`)
    }
  }

  console.log('\nCreating metadata...')
  const token = Buffer.from(JSON.stringify({project: 'IPFS Export', rootCID, exportedAt: new Date().toISOString()}, null, 2))
  const th = await sha256.digest(token)
  const tid = CID.create(1, 0x55, th)
  blocks.push({cid: tid, bytes: token})
  console.log('  ✓ token.json')

  const csv = fs.readFileSync(csvFile)
  const ch = await sha256.digest(csv)
  const cid = CID.create(1, 0x55, ch)
  blocks.push({cid, bytes: csv})
  console.log('  ✓ inventory.csv')

  console.log('\nBuilding tree...')
  const metaBytes = makeDir([{Hash: tid, Name: 'token.json', Tsize: token.length}, {Hash: cid, Name: 'inventory.csv', Tsize: csv.length}])
  const mh = await sha256.digest(metaBytes)
  const mid = CID.create(1, dagPB.code, mh)
  blocks.push({cid: mid, bytes: metaBytes})
  console.log('  ✓ metadata/')

  const aBytes = makeDir(assetLinks)
  const ah = await sha256.digest(aBytes)
  const aid = CID.create(1, dagPB.code, ah)
  blocks.push({cid: aid, bytes: aBytes})
  console.log('  ✓ assets/')

  const rBytes = makeDir([{Hash: mid, Name: 'metadata'}, {Hash: aid, Name: 'assets'}])
  const rh = await sha256.digest(rBytes)
  const rid = CID.create(1, dagPB.code, rh)
  blocks.push({cid: rid, bytes: rBytes})
  console.log('  ✓ root/')

  console.log('\nWriting CAR...')
  const {writer, out} = CarWriter.create([rid])

  const writeStream = fs.createWriteStream(outputCar)
  
  ;(async () => {
    for await (const chunk of out) {
      writeStream.write(chunk)
    }
  })()

  for (const block of blocks) {
    await writer.put(block)
  }

  await writer.close()
  writeStream.end()

  await new Promise(r => writeStream.on('finish', r))
  const sz = fs.statSync(outputCar).size
  console.log(`✓ ${outputCar} (${(sz/1024/1024).toFixed(2)}MB)\n`)
  console.log(`Root CID: ${rid}\n`)
}

main().catch(e => {console.error(e); process.exit(1)})
