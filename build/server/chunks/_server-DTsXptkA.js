import { c as createJob, a as cleanupOldJobs, u as updateJob } from './job-store-b3StliT_.js';
import { r as resolve, s as scan, d as serializeForStorage, a as cacheSet } from './cache-CQWXIfDB.js';
import { json } from '@sveltejs/kit';
import { randomUUID } from 'node:crypto';
import 'node:fs/promises';
import 'node:path';
import 'multiformats/cid';
import 'node:buffer';

//#region src/routes/api/scan/+server.js
async function POST({ request }) {
	const body = await request.json().catch(() => null);
	const rawCid = body?.cid ?? body?.inputText ?? body?.ipfsHash ?? "";
	const input = typeof rawCid === "string" ? rawCid.trim() : String(rawCid || "").trim();
	if (!input) return json({ message: "Missing cid." }, { status: 400 });
	if (!resolve(input)) return json({ message: "Invalid CID or IPFS link." }, { status: 400 });
	const jobId = `scan_${randomUUID()}`;
	await createJob(jobId);
	cleanupOldJobs().catch(() => {});
	(async () => {
		try {
			await updateJob(jobId, { status: "scanning" });
			const result = await scan(input, async (progress) => {
				await updateJob(jobId, { progress: {
					current: progress.current,
					total: progress.total
				} }).catch(() => {});
			});
			await updateJob(jobId, {
				status: "ready",
				result: serializeForStorage(result),
				progress: {
					current: result.summary.totalFiles,
					total: result.summary.totalFiles
				}
			});
			cacheSet(jobId, result);
		} catch (err) {
			await updateJob(jobId, {
				status: "failed",
				error: err?.message || "Scan failed"
			}).catch(() => {});
		}
	})();
	return json({
		jobId,
		status: "queued"
	});
}

export { POST };
//# sourceMappingURL=_server-DTsXptkA.js.map
