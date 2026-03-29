import path from 'node:path'

const DEFAULT_STORAGE_DIR = process.env.JOB_STORAGE_DIR || '/tmp/nft-archive'

export function getStorageRoot() {
  return DEFAULT_STORAGE_DIR
}

export function getJobsDir() {
  return path.join(getStorageRoot(), 'jobs')
}

export function getReportsDir() {
  return path.join(getStorageRoot(), 'reports')
}

export function getJobPath(jobId) {
  return path.join(getJobsDir(), `${jobId}.json`)
}

export function getReportPath(reportId) {
  return path.join(getReportsDir(), `${reportId}.json`)
}

export function getTempPath(name) {
  return path.join(getStorageRoot(), 'tmp', name)
}
