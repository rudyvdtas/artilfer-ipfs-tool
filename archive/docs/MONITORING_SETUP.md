# 📊 Monitoring Setup - Track Your Improvements

After implementing all 5 phases, use this guide to monitor the improvements in real-time.

---

## 1. Gateway Performance Metrics

### What to Measure

```javascript
// src/lib/server/ipfs/metrics.js - ADD THIS

export const metrics = {
  gateways: {
    'w3s.link': {
      requests: 0,
      successes: 0,
      failures: 0,
      latencies: [],  // keep last 100
      avgLatency: 0,
    },
    'ipfs.io': { /* same */ },
    'dweb.link': { /* same */ },
    'cloudflare': { /* same */ },
    'pinata': { /* same */ },
    'kubo-droplet': { /* same */ },
  },
  
  overall: {
    totalRequests: 0,
    totalSuccesses: 0,
    totalFailures: 0,
    avgGatewayLatency: 0,
    p95Latency: 0,
    p99Latency: 0,
  }
}

export function recordGatewayLatency(gateway, latencyMs, success) {
  const gw = metrics.gateways[gateway] || metrics.gateways['unknown']
  gw.requests++
  gw.latencies.push(latencyMs)
  
  // Keep only last 100
  if (gw.latencies.length > 100) gw.latencies.shift()
  
  if (success) {
    gw.successes++
    metrics.overall.totalSuccesses++
  } else {
    gw.failures++
    metrics.overall.totalFailures++
  }
  
  metrics.overall.totalRequests++
  
  // Update aggregates
  updateAggregates()
}

function updateAggregates() {
  const allLatencies = Object.values(metrics.gateways)
    .flatMap(g => g.latencies)
  
  if (allLatencies.length === 0) return
  
  metrics.overall.avgGatewayLatency = 
    Math.round(allLatencies.reduce((a,b) => a+b) / allLatencies.length)
  
  metrics.overall.p95Latency = percentile(allLatencies, 95)
  metrics.overall.p99Latency = percentile(allLatencies, 99)
}

function percentile(arr, p) {
  const sorted = [...arr].sort((a, b) => a - b)
  const index = Math.ceil(sorted.length * (p / 100)) - 1
  return sorted[Math.max(0, index)]
}

export function getMetricsSnapshot() {
  return JSON.parse(JSON.stringify(metrics))
}

export function resetMetrics() {
  Object.keys(metrics.gateways).forEach(key => {
    metrics.gateways[key] = {
      requests: 0,
      successes: 0,
      failures: 0,
      latencies: [],
      avgLatency: 0,
    }
  })
  metrics.overall = {
    totalRequests: 0,
    totalSuccesses: 0,
    totalFailures: 0,
    avgGatewayLatency: 0,
    p95Latency: 0,
    p99Latency: 0,
  }
}
```

### Where to See It

**Create API endpoint for metrics:**

```javascript
// src/routes/api/metrics/+server.js - NEW

import { json } from '@sveltejs/kit'
import { getMetricsSnapshot } from '$lib/server/ipfs/metrics.js'

export async function GET() {
  return json(getMetricsSnapshot())
}
```

**Monitor in browser:**

```javascript
// src/routes/+page.svelte - ADD THIS SECTION

<script>
  let metrics = null
  
  onMount(async () => {
    setInterval(async () => {
      const response = await fetch('/api/metrics')
      metrics = await response.json()
    }, 5000)  // Update every 5 seconds
  })
</script>

<div class="metrics-panel">
  {#if metrics}
    <div class="gateway-stats">
      <h3>Gateway Performance</h3>
      <div class="stat">
        <span>Avg Latency:</span>
        <strong>{metrics.overall.avgGatewayLatency}ms</strong>
      </div>
      <div class="stat">
        <span>P95:</span>
        <strong>{metrics.overall.p95Latency}ms</strong>
      </div>
      <div class="stat">
        <span>Success Rate:</span>
        <strong>
          {(metrics.overall.totalSuccesses / metrics.overall.totalRequests * 100).toFixed(1)}%
        </strong>
      </div>
      
      <table>
        <thead>
          <tr>
            <th>Gateway</th>
            <th>Reqs</th>
            <th>Success</th>
            <th>Avg Latency</th>
          </tr>
        </thead>
        <tbody>
          {#each Object.entries(metrics.gateways) as [name, data]}
            <tr>
              <td>{name}</td>
              <td>{data.requests}</td>
              <td>{((data.successes / data.requests) * 100).toFixed(1)}%</td>
              <td>
                {Math.round(data.latencies.reduce((a,b) => a+b, 0) / data.latencies.length)}ms
              </td>
            </tr>
          {/each}
        </tbody>
      </table>
    </div>
  {/if}
</div>

<style>
  .metrics-panel {
    background: #f5f5f5;
    padding: 20px;
    border-radius: 8px;
    margin: 20px 0;
  }
  
  .stat {
    display: flex;
    justify-content: space-between;
    margin: 10px 0;
  }
  
  table {
    width: 100%;
    margin-top: 10px;
    border-collapse: collapse;
  }
  
  th, td {
    border: 1px solid #ddd;
    padding: 10px;
    text-align: left;
  }
  
  th {
    background: #eee;
  }
</style>
```

---

## 2. Scan Job Metrics

### Track Job Health

```javascript
// src/lib/server/ipfs/job-metrics.js - NEW

export const jobMetrics = {
  totalScans: 0,
  successfulScans: 0,
  failedScans: 0,
  avgScanDuration: 0,
  avgItemsPerScan: 0,
  
  // Histograms
  durations: [],        // in milliseconds
  itemCounts: [],       // items per scan
  cacheLookups: 0,
  cacheHits: 0,
  dedupLookups: 0,
  dedupHits: 0,
}

export function recordScanStart(jobId) {
  return {
    jobId,
    startTime: Date.now(),
    startItemCount: 0,
  }
}

export function recordScanEnd(scan, itemCount, error = null) {
  const duration = Date.now() - scan.startTime
  
  jobMetrics.totalScans++
  jobMetrics.durations.push(duration)
  jobMetrics.itemCounts.push(itemCount)
  
  if (error) {
    jobMetrics.failedScans++
  } else {
    jobMetrics.successfulScans++
  }
  
  // Keep only recent scans for averages
  if (jobMetrics.durations.length > 100) {
    jobMetrics.durations.shift()
    jobMetrics.itemCounts.shift()
  }
  
  // Update averages
  jobMetrics.avgScanDuration = 
    Math.round(jobMetrics.durations.reduce((a,b) => a+b, 0) / jobMetrics.durations.length)
  
  jobMetrics.avgItemsPerScan = 
    Math.round(jobMetrics.itemCounts.reduce((a,b) => a+b, 0) / jobMetrics.itemCounts.length)
}

export function recordCacheHit() {
  jobMetrics.cacheLookups++
  jobMetrics.cacheHits++
}

export function recordCacheMiss() {
  jobMetrics.cacheLookups++
}

export function recordDedupHit() {
  jobMetrics.dedupLookups++
  jobMetrics.dedupHits++
}

export function recordDedupMiss() {
  jobMetrics.dedupLookups++
}

export function getJobMetricsSnapshot() {
  return {
    ...jobMetrics,
    successRate: jobMetrics.totalScans > 0 
      ? (jobMetrics.successfulScans / jobMetrics.totalScans * 100).toFixed(1) + '%'
      : 'N/A',
    cacheHitRate: jobMetrics.cacheLookups > 0
      ? (jobMetrics.cacheHits / jobMetrics.cacheLookups * 100).toFixed(1) + '%'
      : 'N/A',
    dedupHitRate: jobMetrics.dedupLookups > 0
      ? (jobMetrics.dedupHits / jobMetrics.dedupLookups * 100).toFixed(1) + '%'
      : 'N/A',
  }
}
```

### Update Scanner to Record Metrics

```javascript
// src/lib/server/ipfs/scanner.js - ADD TRACKING

import { recordScanStart, recordScanEnd, recordCacheHit, recordCacheMiss } from './job-metrics.js'

export async function scan(inputCid, onProgress) {
  const scan = recordScanStart(inputCid)
  
  try {
    // ... existing scan code ...
    
    // When fetching from cache:
    if (cacheHit) {
      recordCacheHit()
    } else {
      recordCacheMiss()
    }
    
    // ... rest of code ...
    
    recordScanEnd(scan, tree.length)
    
    return result
  } catch (err) {
    recordScanEnd(scan, tree.length, err)
    throw err
  }
}
```

---

## 3. Kubo Node Health Monitoring

### Monitor Kubo CPU and Connectivity

```javascript
// src/lib/server/ipfs/kubo-monitor.js - NEW

export const kuboMetrics = {
  isHealthy: false,
  lastCheck: 0,
  checkInterval: 30_000,  // 30 seconds
  
  uptime: 0,
  downtime: 0,
  consecutiveFailures: 0,
  
  recentHealthChecks: [],  // keep last 60
}

async function checkKuboHealth() {
  const startTime = Date.now()
  
  try {
    const controller = new AbortController()
    const timeout = setTimeout(() => controller.abort(), 5000)
    
    const response = await fetch(
      `http://localhost:8080/api/v0/id`,
      { signal: controller.signal }
    )
    
    clearTimeout(timeout)
    
    if (response.ok) {
      kuboMetrics.isHealthy = true
      kuboMetrics.uptime += Date.now() - startTime
      kuboMetrics.consecutiveFailures = 0
    } else {
      throw new Error(`HTTP ${response.status}`)
    }
  } catch (err) {
    kuboMetrics.isHealthy = false
    kuboMetrics.downtime += Date.now() - startTime
    kuboMetrics.consecutiveFailures++
  }
  
  kuboMetrics.recentHealthChecks.push({
    timestamp: Date.now(),
    isHealthy: kuboMetrics.isHealthy,
    consecutiveFailures: kuboMetrics.consecutiveFailures,
  })
  
  if (kuboMetrics.recentHealthChecks.length > 60) {
    kuboMetrics.recentHealthChecks.shift()
  }
  
  kuboMetrics.lastCheck = Date.now()
}

// Start monitoring
setInterval(checkKuboHealth, kuboMetrics.checkInterval)
// Also check immediately on startup
checkKuboHealth().catch(console.error)

export function getKuboStatus() {
  const checks = kuboMetrics.recentHealthChecks
  const upCount = checks.filter(c => c.isHealthy).length
  
  return {
    isHealthy: kuboMetrics.isHealthy,
    healthyPercentage: (upCount / checks.length * 100).toFixed(1) + '%',
    consecutiveFailures: kuboMetrics.consecutiveFailures,
    recentStatus: checks.slice(-10),  // last 10 checks
  }
}
```

---

## 4. Vercel-Specific Monitoring

### Monitor Job Storage Health

```javascript
// src/lib/server/ipfs/storage-monitor.js - NEW

export const storageMetrics = {
  kvOperations: 0,
  kvErrors: 0,
  kvLatencies: [],
  fsOperations: 0,
  fsErrors: 0,
  fsLatencies: [],
}

export async function recordKvOperation(operation, durationMs, success) {
  storageMetrics.kvOperations++
  storageMetrics.kvLatencies.push(durationMs)
  
  if (!success) {
    storageMetrics.kvErrors++
  }
  
  if (storageMetrics.kvLatencies.length > 100) {
    storageMetrics.kvLatencies.shift()
  }
}

export async function recordFsOperation(operation, durationMs, success) {
  storageMetrics.fsOperations++
  storageMetrics.fsLatencies.push(durationMs)
  
  if (!success) {
    storageMetrics.fsErrors++
  }
  
  if (storageMetrics.fsLatencies.length > 100) {
    storageMetrics.fsLatencies.shift()
  }
}

export function getStorageMetrics() {
  const kvAvg = storageMetrics.kvLatencies.length 
    ? Math.round(storageMetrics.kvLatencies.reduce((a,b) => a+b) / storageMetrics.kvLatencies.length)
    : 0
  
  const fsAvg = storageMetrics.fsLatencies.length 
    ? Math.round(storageMetrics.fsLatencies.reduce((a,b) => a+b) / storageMetrics.fsLatencies.length)
    : 0
  
  return {
    kv: {
      operations: storageMetrics.kvOperations,
      errors: storageMetrics.kvErrors,
      errorRate: storageMetrics.kvOperations > 0
        ? (storageMetrics.kvErrors / storageMetrics.kvOperations * 100).toFixed(2) + '%'
        : 'N/A',
      avgLatency: kvAvg + 'ms',
    },
    fs: {
      operations: storageMetrics.fsOperations,
      errors: storageMetrics.fsErrors,
      errorRate: storageMetrics.fsOperations > 0
        ? (storageMetrics.fsErrors / storageMetrics.fsOperations * 100).toFixed(2) + '%'
        : 'N/A',
      avgLatency: fsAvg + 'ms',
    }
  }
}
```

### Update Job Store to Track Operations

```javascript
// src/lib/server/ipfs/job-store-kv.js - ADD MONITORING

import { recordKvOperation } from './storage-monitor.js'

export async function updateJob(jobId, patch) {
  const startTime = Date.now()
  
  try {
    const current = await loadJob(jobId)
    const updated = { ...current, ...patch, updatedAt: Date.now() }
    
    await kv.setex(
      getJobKey(jobId),
      TTL_SECONDS,
      JSON.stringify(updated)
    )
    
    const duration = Date.now() - startTime
    recordKvOperation('updateJob', duration, true)
    
    return updated
  } catch (err) {
    const duration = Date.now() - startTime
    recordKvOperation('updateJob', duration, false)
    throw err
  }
}
```

---

## 5. Comprehensive Dashboard

### Create Metrics Dashboard

```javascript
// src/routes/api/dashboard/+server.js - NEW

import { json } from '@sveltejs/kit'
import { getMetricsSnapshot } from '$lib/server/ipfs/metrics.js'
import { getJobMetricsSnapshot } from '$lib/server/ipfs/job-metrics.js'
import { getKuboStatus } from '$lib/server/ipfs/kubo-monitor.js'
import { getStorageMetrics } from '$lib/server/ipfs/storage-monitor.js'

export async function GET() {
  return json({
    timestamp: new Date().toISOString(),
    gateway: getMetricsSnapshot(),
    jobs: getJobMetricsSnapshot(),
    kubo: getKuboStatus(),
    storage: getStorageMetrics(),
  })
}
```

### Display Dashboard in UI

```svelte
<!-- src/routes/dashboard/+page.svelte - NEW -->

<script>
  import { onMount } from 'svelte'
  
  let dashboard = null
  let autoRefresh = true
  
  onMount(async () => {
    async function refresh() {
      const response = await fetch('/api/dashboard')
      dashboard = await response.json()
    }
    
    refresh()
    
    if (autoRefresh) {
      setInterval(refresh, 5000)
    }
  })
</script>

<div class="dashboard">
  <h1>📊 System Metrics Dashboard</h1>
  
  {#if dashboard}
    <div class="timestamp">
      Last updated: {new Date(dashboard.timestamp).toLocaleTimeString()}
    </div>
    
    <!-- Gateway Performance -->
    <section class="card">
      <h2>🌐 Gateway Performance</h2>
      <div class="metrics-grid">
        <div class="metric">
          <label>Avg Latency</label>
          <value>{dashboard.gateway.overall.avgGatewayLatency}ms</value>
        </div>
        <div class="metric">
          <label>P95 Latency</label>
          <value>{dashboard.gateway.overall.p95Latency}ms</value>
        </div>
        <div class="metric">
          <label>Success Rate</label>
          <value>
            {(dashboard.gateway.overall.totalSuccesses / dashboard.gateway.overall.totalRequests * 100).toFixed(1)}%
          </value>
        </div>
        <div class="metric">
          <label>Total Requests</label>
          <value>{dashboard.gateway.overall.totalRequests}</value>
        </div>
      </div>
      
      <table class="gateway-table">
        <thead>
          <tr>
            <th>Gateway</th>
            <th>Requests</th>
            <th>Success Rate</th>
            <th>Avg Latency</th>
          </tr>
        </thead>
        <tbody>
          {#each Object.entries(dashboard.gateway.gateways) as [name, stats]}
            <tr>
              <td>{name}</td>
              <td>{stats.requests}</td>
              <td>
                {stats.requests > 0
                  ? (stats.successes / stats.requests * 100).toFixed(1) + '%'
                  : 'N/A'}
              </td>
              <td>
                {stats.latencies.length > 0
                  ? Math.round(stats.latencies.reduce((a,b) => a+b) / stats.latencies.length) + 'ms'
                  : 'N/A'}
              </td>
            </tr>
          {/each}
        </tbody>
      </table>
    </section>
    
    <!-- Scan Jobs -->
    <section class="card">
      <h2>📋 Scan Jobs</h2>
      <div class="metrics-grid">
        <div class="metric">
          <label>Total Scans</label>
          <value>{dashboard.jobs.totalScans}</value>
        </div>
        <div class="metric">
          <label>Success Rate</label>
          <value>{dashboard.jobs.successRate}</value>
        </div>
        <div class="metric">
          <label>Avg Duration</label>
          <value>{dashboard.jobs.avgScanDuration}ms</value>
        </div>
        <div class="metric">
          <label>Avg Items</label>
          <value>{dashboard.jobs.avgItemsPerScan}</value>
        </div>
        <div class="metric">
          <label>Cache Hit Rate</label>
          <value>{dashboard.jobs.cacheHitRate}</value>
        </div>
        <div class="metric">
          <label>Dedup Hit Rate</label>
          <value>{dashboard.jobs.dedupHitRate}</value>
        </div>
      </div>
    </section>
    
    <!-- Kubo Node -->
    <section class="card">
      <h2>🤖 Kubo Node</h2>
      <div class="metrics-grid">
        <div class="metric">
          <label>Status</label>
          <value class:healthy={dashboard.kubo.isHealthy}>
            {dashboard.kubo.isHealthy ? '✓ Healthy' : '✗ Down'}
          </value>
        </div>
        <div class="metric">
          <label>Uptime %</label>
          <value>{dashboard.kubo.healthyPercentage}</value>
        </div>
        <div class="metric">
          <label>Consecutive Failures</label>
          <value>{dashboard.kubo.consecutiveFailures}</value>
        </div>
      </div>
    </section>
    
    <!-- Storage -->
    <section class="card">
      <h2>💾 Storage</h2>
      <div class="metrics-grid">
        <div class="metric">
          <label>KV Operations</label>
          <value>{dashboard.storage.kv.operations}</value>
        </div>
        <div class="metric">
          <label>KV Error Rate</label>
          <value>{dashboard.storage.kv.errorRate}</value>
        </div>
        <div class="metric">
          <label>KV Avg Latency</label>
          <value>{dashboard.storage.kv.avgLatency}</value>
        </div>
        <div class="metric">
          <label>FS Operations</label>
          <value>{dashboard.storage.fs.operations}</value>
        </div>
        <div class="metric">
          <label>FS Error Rate</label>
          <value>{dashboard.storage.fs.errorRate}</value>
        </div>
        <div class="metric">
          <label>FS Avg Latency</label>
          <value>{dashboard.storage.fs.avgLatency}</value>
        </div>
      </div>
    </section>
  {/if}
</div>

<style>
  .dashboard {
    padding: 20px;
  }
  
  .timestamp {
    color: #666;
    font-size: 0.9rem;
    margin-bottom: 20px;
  }
  
  .card {
    background: white;
    border: 1px solid #ddd;
    border-radius: 8px;
    padding: 20px;
    margin-bottom: 20px;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  }
  
  .card h2 {
    margin-top: 0;
    margin-bottom: 15px;
    font-size: 1.3rem;
  }
  
  .metrics-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 15px;
    margin-bottom: 20px;
  }
  
  .metric {
    background: #f5f5f5;
    padding: 15px;
    border-radius: 4px;
  }
  
  .metric label {
    display: block;
    font-size: 0.85rem;
    color: #666;
    margin-bottom: 5px;
  }
  
  .metric value {
    display: block;
    font-size: 1.5rem;
    font-weight: bold;
    color: #333;
  }
  
  .metric value.healthy {
    color: #4caf50;
  }
  
  .gateway-table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 15px;
  }
  
  .gateway-table th,
  .gateway-table td {
    padding: 10px;
    text-align: left;
    border-bottom: 1px solid #ddd;
  }
  
  .gateway-table th {
    background: #f5f5f5;
    font-weight: bold;
  }
  
  .gateway-table tr:hover {
    background: #fafafa;
  }
</style>
```

---

## 6. Alert Thresholds

Define when to alert:

```javascript
// src/lib/server/ipfs/alerts.js - NEW

export const alertThresholds = {
  gateway: {
    avgLatency: 15000,      // alert if > 15s
    p95Latency: 30000,      // alert if > 30s
    errorRate: 20,          // alert if > 20% errors
  },
  
  jobs: {
    failureRate: 5,         // alert if > 5% failures
    avgDuration: 60000,     // alert if avg > 60s
  },
  
  kubo: {
    healthScore: 80,        // alert if < 80% uptime
    consecutiveFailures: 5, // alert if > 5 failures in a row
  },
  
  storage: {
    kvErrorRate: 5,         // alert if > 5% KV errors
    kvLatency: 500,         // alert if avg > 500ms
  },
}

export function checkAlerts(dashboard) {
  const alerts = []
  
  // Check gateway thresholds
  if (dashboard.gateway.overall.avgGatewayLatency > alertThresholds.gateway.avgLatency) {
    alerts.push({
      severity: 'warning',
      service: 'gateway',
      message: `High gateway latency: ${dashboard.gateway.overall.avgGatewayLatency}ms`,
    })
  }
  
  // Check job thresholds
  const failRate = dashboard.jobs.totalScans > 0
    ? (dashboard.jobs.failedScans / dashboard.jobs.totalScans * 100)
    : 0
  
  if (failRate > alertThresholds.jobs.failureRate) {
    alerts.push({
      severity: 'critical',
      service: 'jobs',
      message: `High job failure rate: ${failRate.toFixed(1)}%`,
    })
  }
  
  // Check Kubo thresholds
  const healthScore = parseFloat(dashboard.kubo.healthyPercentage)
  if (healthScore < alertThresholds.kubo.healthScore) {
    alerts.push({
      severity: 'critical',
      service: 'kubo',
      message: `Low Kubo uptime: ${healthScore}%`,
    })
  }
  
  return alerts
}
```

---

## 7. What to Monitor After Deploy

### Hour 1 (Immediate)
- [ ] Gateway latency drops from 40s to 8s
- [ ] Scan success rate increases
- [ ] No KV errors on Vercel
- [ ] Kubo CPU drops

### Day 1
- [ ] Error rate stabilizes below 0.5%
- [ ] Job loss rate at 0% (new tracking)
- [ ] Cache hit rate > 70%
- [ ] Dedup hit rate > 60%

### Week 1
- [ ] Sustained improvements
- [ ] No memory leaks
- [ ] Kubo CPU stays < 50%
- [ ] All alerts clear

### Ongoing
- [ ] Daily alert reviews
- [ ] Weekly metric reports
- [ ] Monthly performance trending

---

## 8. Integration with External Monitoring

### Datadog Integration

```javascript
// If using Datadog
import { StatsD } from 'node-statsd'

const dogstatsd = new StatsD()

export function recordMetric(metric, value) {
  dogstatsd.gauge('nft-archive.' + metric, value)
}

// Usage:
recordMetric('gateway.latency', dashboard.gateway.overall.avgGatewayLatency)
recordMetric('kubo.cpu', kuboMetrics.cpuPercent)
recordMetric('job.failure_rate', failRate)
```

### Sentry Integration

```javascript
import * as Sentry from "@sentry/node"

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  tracesSampleRate: 0.1,
})

// Capture metric errors
if (alerts.some(a => a.severity === 'critical')) {
  Sentry.captureMessage(
    `Critical alerts: ${alerts.map(a => a.message).join('; ')}`,
    'error'
  )
}
```

---

## 🎯 Expected Results

After all fixes, you should see:

```
BEFORE                          AFTER
─────────────────────          ─────────────────────
Gateway Latency: 40s    →      Gateway Latency: 8s
Success Rate: 85%       →      Success Rate: 98%
Kubo CPU: 100%          →      Kubo CPU: 25%
Job Loss: 15%           →      Job Loss: 0%
Concurrent Users: 2     →      Concurrent Users: 10+
```

Monitor these metrics and you'll see the improvements in real-time! 🚀
