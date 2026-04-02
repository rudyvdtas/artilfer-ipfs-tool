import { j as jobExists, l as loadJob } from './job-store-b3StliT_.js';
import { c as cacheGet, s as scan, a as cacheSet, b as safeFilename } from './cache-CQWXIfDB.js';
import { json } from '@sveltejs/kit';
import { CID } from 'multiformats/cid';
import { CarWriter } from '@ipld/car';
import { Buffer } from 'node:buffer';
import 'node:fs/promises';
import 'node:path';

//#region src/lib/server/ipfs/exporter.js
/**
* exporter.js — CAR, CSV, and manifest.json export
*
* Consolidates: car-stream.js, report.js (export parts)
* All export formats in one module.
*/
/**
* Generate a manifest.json from scan result.
* @param {import('./scanner.js').ScanResult} result
* @returns {string} JSON string
*/
function exportManifest(result) {
	const manifest = {
		project: "NFT Archive Assistant — Powered by ARTfilter",
		generated_at: (/* @__PURE__ */ new Date()).toISOString(),
		root_cid: result.rootCid,
		metadata: result.metadata,
		summary: result.summary,
		files: result.tree.map((node) => ({
			id: node.id,
			parent_id: node.parentId,
			depth: node.depth,
			cid: node.cid,
			path: node.path,
			name: node.name,
			kind: node.kind,
			content_type: node.contentType,
			size: node.size,
			status: node.status,
			children: node.children
		}))
	};
	return JSON.stringify(manifest, null, 2);
}
/**
* Generate a Pinata-compatible CSV for "Import from IPFS".
* Format: hash,name (one row per unique CID).
* Works for ALL scan types (not just async).
* @param {import('./scanner.js').ScanResult} result
* @returns {string} CSV string
*/
function exportCsv(result) {
	const rows = ["hash,name"];
	const seen = /* @__PURE__ */ new Set();
	const labelMap = result.asyncLabelMap || {};
	for (const node of result.tree) {
		if (node.status !== "ok") continue;
		if (seen.has(node.cid)) continue;
		seen.add(node.cid);
		const name = labelMap[node.cid] || node.name || `${node.cid.slice(0, 12)}...`;
		const safeName = /[,"]/.test(name) ? `"${name.replace(/"/g, "\"\"")}"` : name;
		rows.push(`${node.cid},${safeName}`);
	}
	return rows.join("\n");
}
/**
* Generate a streaming CAR file from scan result.
* Uses @ipld/car CarWriter for block-by-block streaming.
* @param {import('./scanner.js').ScanResult} result
* @returns {Promise<ReadableStream<Uint8Array>>}
*/
async function exportCar(result) {
	const rootCid = CID.parse(result.rootCid);
	const files = result.archiveFiles.filter((f) => f.bytes && f.cid);
	if (files.length === 0) throw new Error("No files available for CAR export. Re-scan may be needed.");
	if (!files.some((f) => f.cid === result.rootCid)) throw new Error(`Root CID ${result.rootCid} is not in the archive file set.`);
	const { writer, out } = CarWriter.create([rootCid]);
	return new ReadableStream({ async start(controller) {
		const pump = (async () => {
			for await (const chunk of out) controller.enqueue(chunk);
			controller.close();
		})().catch((err) => controller.error(err));
		try {
			for (const file of files) {
				const cid = CID.parse(file.cid);
				const bytes = file.bytes instanceof Uint8Array ? file.bytes : Buffer.from(file.bytes);
				await writer.put({
					cid,
					bytes
				});
			}
			await writer.close();
			await pump;
		} catch (err) {
			try {
				await writer.close();
			} catch {}
			controller.error(err);
		}
	} });
}
/**
* Get a safe filename based on metadata title.
* @param {import('./scanner.js').ScanResult} result
* @param {string} extension
* @returns {string}
*/
function getExportFilename(result, extension) {
	return `${result.metadata?.title ? safeFilename(result.metadata.title) : "archive"}.${extension}`;
}
//#endregion
//#region src/routes/api/export/[jobId]/[format]/+server.js
async function GET({ params }) {
	const { jobId, format } = params;
	if (!jobId) return json({ message: "Missing jobId." }, { status: 400 });
	if (![
		"car",
		"csv",
		"manifest"
	].includes(format)) return json({ message: "Invalid format. Use: car, csv, or manifest." }, { status: 400 });
	if (!await jobExists(jobId)) return json({ message: "Job not found." }, { status: 404 });
	const job = await loadJob(jobId);
	if (job.status !== "ready" || !job.result) return json({ message: "Scan not ready yet. Please wait for completion." }, { status: 409 });
	if (format === "manifest") {
		const body = exportManifest(job.result);
		const filename = getExportFilename(job.result, "json");
		return new Response(body, { headers: {
			"content-type": "application/json; charset=utf-8",
			"content-disposition": `attachment; filename="${filename}"`
		} });
	}
	if (format === "csv") {
		const body = exportCsv(job.result);
		const filename = getExportFilename(job.result, "csv");
		return new Response(body, { headers: {
			"content-type": "text/csv; charset=utf-8",
			"content-disposition": `attachment; filename="${filename}"`
		} });
	}
	let fullResult = cacheGet(jobId);
	if (!fullResult) try {
		fullResult = await scan(job.result.rootCid);
		cacheSet(jobId, fullResult);
	} catch (err) {
		return json({ message: `Re-scan failed: ${err?.message}. Please start a new scan.` }, { status: 500 });
	}
	if (!fullResult.archiveFiles?.length) return json({ message: "No files available for CAR export." }, { status: 400 });
	try {
		const stream = await exportCar(fullResult);
		const filename = getExportFilename(fullResult, "car");
		return new Response(stream, { headers: {
			"content-type": "application/vnd.ipld.car",
			"content-disposition": `attachment; filename="${filename}"`,
			"x-archive-root-cid": fullResult.rootCid
		} });
	} catch (err) {
		return json({ message: err?.message || "CAR export failed." }, { status: 500 });
	}
}

export { GET };
//# sourceMappingURL=_server-CsHSBxaR.js.map
