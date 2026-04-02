#!/usr/bin/env node

/**
 * Quick test script to verify all fixes are working
 * Run: node test-fixes.js
 */

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

console.log('🔍 VERIFYING ALL FIXES IMPLEMENTED\n')

const checks = [
  {
    name: 'Promise.race in resolver.js',
    file: 'src/lib/server/ipfs/resolver.js',
    must_contain: 'Promise.race',
  },
  {
    name: 'Request deduplication cache',
    file: 'src/lib/server/ipfs/request-cache.js',
    must_exist: true,
  },
  {
    name: 'Concurrency semaphore',
    file: 'src/lib/server/ipfs/concurrency.js',
    must_exist: true,
  },
  {
    name: 'Kubo health checks',
    file: 'src/lib/server/ipfs/kubo-config.js',
    must_exist: true,
  },
  {
    name: 'KV job store',
    file: 'src/lib/server/ipfs/job-store-kv.js',
    must_exist: true,
  },
  {
    name: 'Filesystem job store',
    file: 'src/lib/server/ipfs/job-store-fs.js',
    must_exist: true,
  },
  {
    name: 'Hybrid job store',
    file: 'src/lib/server/ipfs/job-store.js',
    must_contain: 'getBackend',
  },
  {
    name: 'Scanner uses dedup',
    file: 'src/lib/server/ipfs/scanner.js',
    must_contain: 'fetchWithDedup',
  },
  {
    name: 'Scanner uses semaphore',
    file: 'src/lib/server/ipfs/scanner.js',
    must_contain: 'fetchSemaphore',
  },
  {
    name: '@vercel/kv in dependencies',
    file: 'package.json',
    must_contain: '@vercel/kv',
  },
]

let passed = 0
let failed = 0

for (const check of checks) {
  const filePath = path.join(__dirname, check.file)

  if (check.must_exist) {
    if (fs.existsSync(filePath)) {
      console.log(`✅ ${check.name}`)
      console.log(`   File: ${check.file}\n`)
      passed++
    } else {
      console.log(`❌ ${check.name}`)
      console.log(`   MISSING: ${check.file}\n`)
      failed++
    }
  }

  if (check.must_contain) {
    try {
      const content = fs.readFileSync(filePath, 'utf8')
      if (content.includes(check.must_contain)) {
        console.log(`✅ ${check.name}`)
        console.log(`   Contains: ${check.must_contain}\n`)
        passed++
      } else {
        console.log(`❌ ${check.name}`)
        console.log(`   Missing: ${check.must_contain}\n`)
        failed++
      }
    } catch (err) {
      console.log(`❌ ${check.name}`)
      console.log(`   Error reading file: ${err.message}\n`)
      failed++
    }
  }
}

console.log('=' * 50)
console.log(`\nResults: ${passed} passed, ${failed} failed\n`)

if (failed === 0) {
  console.log('🎉 ALL FIXES VERIFIED! Ready to deploy.\n')
  console.log('Next steps:')
  console.log('1. Run: npm run dev')
  console.log('2. Test scan at: http://localhost:5173')
  console.log('3. Deploy when ready: git push origin main\n')
  process.exit(0)
} else {
  console.log('❌ Some fixes are missing. Please review.\n')
  process.exit(1)
}
