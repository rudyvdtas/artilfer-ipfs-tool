import { json } from '@sveltejs/kit';
import { CID } from 'multiformats/cid';
import fs from 'node:fs/promises';
import path from 'node:path';
import { CarWriter } from '@ipld/car';
import { Buffer } from 'node:buffer';

//#region src/lib/server/storage/paths.js
var DEFAULT_STORAGE_DIR = process.env.JOB_STORAGE_DIR || "/tmp/nft-archive";
function getStorageRoot() {
	return DEFAULT_STORAGE_DIR;
}
function getReportsDir() {
	return path.join(getStorageRoot(), "reports");
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
function resolveReportRootCid(report) {
	return report?.manifest?.rootCid || report?.rootCid || report?.metadata?.rootCid || null;
}
function normalizeManifest(report) {
	const metadata = report?.metadata && typeof report.metadata === "object" ? report.metadata : {};
	const manifest = report?.manifest && typeof report.manifest === "object" ? report.manifest : null;
	if (manifest && !manifest.name && metadata.title) manifest.name = metadata.title;
	if (manifest && !manifest.description && metadata.description) manifest.description = metadata.description;
	if (manifest && !manifest.artistName && metadata.artists) manifest.artistName = metadata.artists;
	if (manifest && manifest.image == null && metadata.image) manifest.image = metadata.image;
	return manifest;
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
	if (report.manifest) report.manifest = {
		...normalizeManifest(report),
		...reportRootCid ? { rootCid: reportRootCid } : {}
	};
	return report;
}
//#endregion
//#region src/lib/server/export/car-stream.js
function normalizeCarFile(file) {
	if (!file?.cid) throw new Error(`CAR file entry is missing cid for path: ${file?.path || "unknown"}`);
	if (file.bytes === void 0 || file.bytes === null) throw new Error(`CAR file entry is missing bytes for path: ${file?.path || "unknown"}`);
	return {
		path: String(file.path || "").trim(),
		cid: file.cid,
		bytes: file.bytes instanceof Uint8Array ? file.bytes : Buffer.from(file.bytes)
	};
}
async function createCarStreamFromFiles(files, rootCid) {
	const normalizedFiles = files.map(normalizeCarFile);
	if (!normalizedFiles.find((file) => file.cid.toString() === rootCid.toString())) throw new Error("CAR export failed: rootCid is not present in the normalized file set.");
	const { writer, out } = CarWriter.create([rootCid]);
	return new ReadableStream({ async start(controller) {
		const pump = (async () => {
			for await (const chunk of out) controller.enqueue(chunk);
			controller.close();
		})().catch((error) => {
			controller.error(error);
		});
		try {
			for (const file of normalizedFiles) await writer.put({
				cid: file.cid,
				bytes: file.bytes
			});
			await writer.close();
			await pump;
		} catch (error) {
			try {
				await writer.close();
			} catch {}
			controller.error(error);
		}
	} });
}
//#endregion
//#region src/routes/api/export/car/+server.js
function resolveRootCid(report) {
	return report?.manifest?.rootCid || report?.rootCid || report?.metadata?.rootCid || null;
}
function normalizeArchiveFiles(archiveFiles) {
	return archiveFiles.map((file) => ({
		path: file?.path || file?.archivePath || file?.archive_path || null,
		cid: file?.cid || null,
		bytes: file?.bytes ?? null
	})).filter((file) => file.path);
}
function computeExportReadiness(report, normalizedFiles) {
	const rootCid = resolveRootCid(report);
	if (!rootCid) return {
		canExportCar: false,
		canExportCsv: normalizedFiles.length > 0,
		reason: "Missing rootCid"
	};
	if (!normalizedFiles.length) return {
		canExportCar: false,
		canExportCsv: false,
		reason: "Missing archive files"
	};
	if (normalizedFiles.some((file) => !file.cid)) return {
		canExportCar: false,
		canExportCsv: true,
		reason: "Archive files missing cid values"
	};
	if (normalizedFiles.some((file) => file.bytes === void 0 || file.bytes === null)) return {
		canExportCar: false,
		canExportCsv: true,
		reason: "Archive files missing bytes"
	};
	if (!normalizedFiles.some((file) => file.cid === rootCid)) return {
		canExportCar: false,
		canExportCsv: true,
		reason: "rootCid is not present in the archive file set"
	};
	return {
		canExportCar: true,
		canExportCsv: true,
		reason: null
	};
}
async function POST({ request }) {
	const reportId = (await request.json().catch(() => null))?.reportId;
	if (!reportId) return json({ message: "Missing reportId. Please scan first." }, { status: 400 });
	let report;
	try {
		report = await loadReport(reportId);
	} catch {
		return json({ message: "Cached report not found or expired. Please scan again." }, { status: 404 });
	}
	const normalizedFiles = normalizeArchiveFiles(Array.isArray(report.archiveFiles) ? report.archiveFiles : []);
	const readiness = computeExportReadiness(report, normalizedFiles);
	if (!readiness.canExportCar) return json({
		message: `Report is not export-ready. ${readiness.reason || "Please scan again."}`,
		exportReadiness: readiness
	}, { status: 400 });
	const rootCid = resolveRootCid(report);
	if (!normalizedFiles.some((file) => file.cid === rootCid)) {
		console.warn("CAR export rootCid is not present in archive files", {
			reportId,
			rootCid
		});
		return json({ message: "Report rootCid does not match the exported archive graph." }, { status: 400 });
	}
	try {
		const root = CID.parse(rootCid);
		const stream = await createCarStreamFromFiles(normalizedFiles.map((file) => ({
			...file,
			cid: CID.parse(file.cid)
		})), root);
		return new Response(stream, { headers: {
			"content-type": "application/vnd.ipld.car",
			"content-disposition": "attachment; filename=\"archive-bundle.car\"",
			"x-archive-root-cid": rootCid
		} });
	} catch (error) {
		console.error("CAR export failed", error);
		return json({ message: error instanceof Error ? error.message : "Internal Error" }, { status: 500 });
	}
}

export { POST };
//# sourceMappingURL=_server-ERb29dsN.js.map
