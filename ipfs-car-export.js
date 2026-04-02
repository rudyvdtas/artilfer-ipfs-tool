  // Write CAR
  console.log(`\nWriting CAR file: ${outputCar}`)

  try {
    const { writer, out } = CarWriter.create([rootDirCID])
    const outputStream = fs.createWriteStream(outputCar)

    ;(async () => {
      try {
        for await (const chunk of out) {
          outputStream.write(chunk)
        }
        outputStream.end()
      } catch (err) {
        console.error('Stream error:', err)
      }
    })()

    for (const [cidStr, block] of blockstore.map.entries()) {
      const cid = CID.parse(cidStr)
      await writer.put({ cid, bytes: block })
    }
    await writer.close()

    // Wait for stream to finish
    await new Promise((resolve, reject) => {
      outputStream.on('finish', resolve)
      outputStream.on('error', reject)
    })

    const carSize = fs.statSync(outputCar).size
    console.log(`✓ ${outputCar} (${(carSize / 1024 / 1024).toFixed(2)} MB)\n`)
  } catch (err) {
    console.error('CAR write error:', err.message)
    throw err
  }

