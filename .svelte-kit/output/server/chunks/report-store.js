import fs from "node:fs/promises";
import { constants } from "node:fs";
import path from "node:path";
//#region src/lib/server/storage/paths.js
var DEFAULT_STORAGE_DIR = process.env.JOB_STORAGE_DIR || "/tmp/nft-archive";
function getStorageRoot() {
	return DEFAULT_STORAGE_DIR;
}
function getJobsDir() {
	return path.join(getStorageRoot(), "jobs");
}
function getReportsDir() {
	return path.join(getStorageRoot(), "reports");
}
function getJobPath(jobId) {
	return path.join(getJobsDir(), `${jobId}.json`);
}
function getReportPath(reportId) {
	return path.join(getReportsDir(), `${reportId}.json`);
}
//#endregion
//#region src/lib/server/reports/report-store.js
function safeJsonParse(raw) {
	try {
		return JSON.parse(raw);
	} catch (error) {
		const message = error instanceof Error ? error.message : "Invalid JSON";
		const wrapped = /* @__PURE__ */ new Error(`Corrupt report JSON: ${message}`);
		wrapped.cause = error;
		throw wrapped;
	}
}
async function ensureReportsDir() {
	await fs.mkdir(getReportsDir(), { recursive: true });
}
async function fileExists(filepath) {
	try {
		await fs.access(filepath, constants.F_OK);
		return true;
	} catch {
		return false;
	}
}
function resolveReportRootCid(report) {
	return report?.manifest?.rootCid || report?.rootCid || report?.metadata?.rootCid || null;
}
async function saveReport(report) {
	await ensureReportsDir();
	const reportRootCid = resolveReportRootCid(report);
	const manifestRootCid = report?.manifest?.rootCid || null;
	if (reportRootCid && manifestRootCid && reportRootCid !== manifestRootCid) throw new Error("Corrupt report JSON: rootCid does not match manifest.rootCid");
	if (report?.manifest && reportRootCid && !report.manifest.rootCid) report = {
		...report,
		manifest: {
			...report.manifest,
			rootCid: reportRootCid
		}
	};
	if (reportRootCid && !report.rootCid) report = {
		...report,
		rootCid: reportRootCid
	};
	await fs.writeFile(getReportPath(report.reportId), JSON.stringify(report, null, 2), "utf8");
	return report;
}
async function loadReport(reportId) {
	const report = safeJsonParse(await fs.readFile(getReportPath(reportId), "utf8"));
	if (Array.isArray(report.items)) report.items = report.items.map((item) => ({
		...item,
		path: item.path || item.archivePath || item.archive_path || null,
		size: item.size ?? item.sizeBytes ?? item.size_bytes ?? null,
		cid: item.cid || item.canonicalRef?.replace(/^ipfs:\/\//, "").split("/")[0] || null
	}));
	if (Array.isArray(report.archiveFiles)) report.archiveFiles = report.archiveFiles.map((file) => ({
		...file,
		path: file.path || file.archivePath || file.archive_path || null,
		size: file.size ?? file.sizeBytes ?? file.size_bytes ?? (file.bytes?.length || 0),
		cid: file.cid || null
	}));
	const reportRootCid = resolveReportRootCid(report);
	if (report.rootCid && report.manifest?.rootCid && report.rootCid !== report.manifest.rootCid) throw new Error("Corrupt report JSON: rootCid does not match manifest.rootCid");
	if (!report.rootCid && reportRootCid) report.rootCid = reportRootCid;
	if (report.manifest && reportRootCid && !report.manifest.rootCid) report.manifest.rootCid = reportRootCid;
	return report;
}
async function deleteReport(reportId) {
	try {
		await fs.unlink(getReportPath(reportId));
	} catch {}
}
async function reportExists(reportId) {
	return fileExists(getReportPath(reportId));
}
//#endregion
export { getJobPath as a, saveReport as i, loadReport as n, getJobsDir as o, reportExists as r, deleteReport as t };
