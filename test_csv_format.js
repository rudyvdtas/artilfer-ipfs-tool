// Test script om CSV-formaat te controleren
import { buildReadyToPinCSV } from './src/lib/server/nft/export-builder.js';
import { exportCsv } from './src/lib/server/ipfs/exporter.js';

// Test data voor NFT batch scan (simuleert metadataCID met ipfs:// prefix en paths)
const testJobResult = {
  results: [
    {
      status: 'success',
      name: 'Test NFT #1',
      metadataCID: 'ipfs://QmP4mxvUMtzDcKTK6WEVGF2HZ7fXuW3zyJpGoSBNhsfY7v',
      scan: {
        nodes: {
          'node1': {
            cid: 'bafkreibpu7rrhbwwtwvfr7lwqgnt6qsujweldnnw6ukspr7i7vmqznggp4',
            name: 'image.png',
            contentType: 'image/png',
            kind: 'binary',
            error: null
          }
        }
      }
    },
    {
      status: 'success',
      name: 'Test NFT #2',
      metadataCID: 'ipfs://Qmd4GTGvQw2HvfYactmEqw1rdiYeP2Ht3CitZeh1iXFnyw/3.json',
      scan: {
        nodes: {
          'node1': {
            cid: 'bafkreidl4g5cncbgsap4me6ug3xaza4s4s4ibymf6tnvgu4rl6n45f7fkq',
            name: 'artifact.png',
            contentType: 'image/png',
            kind: 'binary',
            error: null
          }
        }
      }
    },
    {
      status: 'success',
      name: 'Test NFT #3',
      metadataCID: 'QmYUPvLFS7xYPLXQsif2xzZs1ZP9n9EzmqyNtpkoKdBqRG', // Geen ipfs:// prefix
      scan: {
        nodes: {
          'node1': {
            cid: 'ipfs://bafkreiejtp334w6pyf2vnamwtbls2wavadifg3kbb3spiblefhyyaafqle/image.png',
            name: 'thumbnail.jpg',
            contentType: 'image/jpeg',
            kind: 'binary',
            error: null
          }
        }
      }
    }
  ],
  summary: {}
};

// Test data voor gewone CID scan (exporter.js)
const testScanResult = {
  rootCid: 'bafkreidl4g5cncbgsap4me6ug3xaza4s4s4ibymf6tnvgu4rl6n45f7fkq',
  nodes: {
    'node1': {
      cid: 'ipfs://bafkreidl4g5cncbgsap4me6ug3xaza4s4s4ibymf6tnvgu4rl6n45f7fkq',
      name: 'pinnie.png',
      contentType: 'image/png',
      kind: 'binary',
      error: null
    },
    'node2': {
      cid: 'ipfs://bafkreiejtp334w6pyf2vnamwtbls2wavadifg3kbb3spiblefhyyaafqle',
      name: '',
      contentType: 'image/jpeg',
      kind: 'binary',
      error: null
    },
    'node3': {
      cid: 'ipfs://bafkreibonf5akohdn7237jvjcmwxbl4rxr7nojq765g2gwng4ctlzjl6nm/steve.png',
      name: 'steve.png',
      contentType: 'image/png',
      kind: 'binary',
      error: null
    }
  }
};

console.log('=== Test 1: NFT Batch Scan CSV ===');
const csv1 = buildReadyToPinCSV(testJobResult);
console.log(csv1);

console.log('\n=== Test 2: Gewone CID Scan CSV ===');
const csv2 = exportCsv(testScanResult);
console.log(csv2);

console.log('\n=== Analyse ===');
console.log('Verwacht header: cid,name');
console.log('NFT CSV header:', csv1.split('\n')[0]);
console.log('CID CSV header:', csv2.split('\n')[0]);

console.log('\n=== Controleren op ipfs:// prefix ===');
const lines1 = csv1.split('\n');
console.log('NFT CSV eerste regel:', lines1[1]);
console.log('Bevat ipfs://?', lines1[1].includes('ipfs://'));

const lines2 = csv2.split('\n');
console.log('CID CSV eerste regel:', lines2[1]);
console.log('Bevat ipfs://?', lines2[1].includes('ipfs://'));

console.log('\n=== Controleren op paths (/metadata.json, etc.) ===');
console.log('NFT CSV tweede regel:', lines1[2] || 'N/A');
console.log('Bevat /?', (lines1[2] || '').includes('/'));

console.log('\n=== Voorbeeld output zou moeten zijn: ===');
console.log('cid,name');
console.log('QmP4mxvUMtzDcKTK6WEVGF2HvfYactmEqw1rdiYeP2Ht3CitZeh1iXFnyw,Test NFT #1');
console.log('Qmd4GTGvQw2HvfYactmEqw1rdiYeP2Ht3CitZeh1iXFnyw,Test NFT #2');
console.log('QmYUPvLFS7xYPLXQsif2xzZs1ZP9n9EzmqyNtpkoKdBqRG,Test NFT #3');
console.log('bafkreibpu7rrhbwwtwvnamwtbls2wavadifg3kbb3spiblefhyyaafqle,image.png');
// etc.