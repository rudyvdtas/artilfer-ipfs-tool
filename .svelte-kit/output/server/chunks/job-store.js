import { a as getJobPath, o as getJobsDir } from "./report-store.js";
import fs from "node:fs/promises";
import { constants } from "node:fs";
//#region src/lib/server/jobs/job-store.js
function safeJsonParse(raw) {
	try {
		return JSON.parse(raw);
	} catch (error) {
		const message = error instanceof Error ? error.message : "Invalid JSON";
		const wrapped = /* @__PURE__ */ new Error(`Corrupt job JSON: ${message}`);
		wrapped.cause = error;
		throw wrapped;
	}
}
async function ensureJobsDir() {
	await fs.mkdir(getJobsDir(), { recursive: true });
}
async function fileExists(filepath) {
	try {
		await fs.access(filepath, constants.F_OK);
		return true;
	} catch {
		return false;
	}
}
async function createJob(job) {
	await ensureJobsDir();
	await fs.writeFile(getJobPath(job.jobId), JSON.stringify(job, null, 2), "utf8");
	return job;
}
async function loadJob(jobId) {
	return safeJsonParse(await fs.readFile(getJobPath(jobId), "utf8"));
}
async function updateJob(jobId, patch) {
	const current = await loadJob(jobId);
	const updated = {
		...current,
		...patch,
		progress: {
			...current.progress,
			...patch.progress || {}
		},
		updatedAt: Date.now()
	};
	await fs.writeFile(getJobPath(jobId), JSON.stringify(updated, null, 2), "utf8");
	return updated;
}
async function jobExists(jobId) {
	return fileExists(getJobPath(jobId));
}
//#endregion
export { updateJob as i, jobExists as n, loadJob as r, createJob as t };
