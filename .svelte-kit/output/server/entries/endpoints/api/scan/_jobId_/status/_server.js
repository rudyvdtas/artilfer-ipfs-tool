import { a as getJobPath, n as loadReport, r as reportExists, t as deleteReport } from "../../../../../../chunks/report-store.js";
import { n as jobExists, r as loadJob } from "../../../../../../chunks/job-store.js";
import { json } from "@sveltejs/kit";
import fs from "node:fs/promises";
//#region src/routes/api/scan/[jobId]/status/+server.js
function computeExportReadiness(job, report) {
	if (!job || job.status !== "ready" || !report) return null;
	const archiveFiles = Array.isArray(report.archiveFiles) ? report.archiveFiles : [];
	if (!(report.rootCid ?? report?.manifest?.rootCid ?? null)) return {
		canExportCar: false,
		canExportCsv: archiveFiles.length > 0,
		reason: "Missing rootCid"
	};
	if (!archiveFiles.length) return {
		canExportCar: false,
		canExportCsv: false,
		reason: "Missing archive files"
	};
	return {
		canExportCar: true,
		canExportCsv: true,
		reason: null
	};
}
function buildStatusPayload(job, report = null) {
	const archiveFiles = Array.isArray(report?.archiveFiles) ? report.archiveFiles : [];
	const items = Array.isArray(report?.items) ? report.items : [];
	const rootCid = report?.rootCid ?? report?.manifest?.rootCid ?? null;
	const summary = report?.summary ?? null;
	const manifest = report?.manifest ?? null;
	const itemCount = report?.itemCount ?? items.length ?? null;
	const totalSize = report?.totalSize ?? report?.size ?? null;
	const progress = report?.itemCount ? {
		current: report.itemCount,
		total: report.itemCount
	} : job.progress && (job.progress.current !== null || job.progress.total !== null) ? job.progress : null;
	return {
		jobId: job.id,
		status: job.status,
		reportId: job.reportId ?? null,
		error: job.error ?? null,
		progress,
		itemCount,
		totalSize,
		rootCid,
		summary,
		manifest,
		items,
		archiveFiles,
		exportReadiness: computeExportReadiness(job, report)
	};
}
async function GET({ params }) {
	try {
		const { jobId } = params;
		if (!jobId) return json({ message: "Missing jobId." }, { status: 400 });
		if (!await jobExists(jobId)) return json({ message: "Job not found." }, { status: 404 });
		let job;
		try {
			job = await loadJob(jobId);
		} catch (error) {
			console.warn(`Removing corrupt job ${jobId}`, error);
			await fs.unlink(getJobPath(jobId)).catch(() => {});
			return json({
				jobId,
				status: "failed",
				error: "Corrupt job data was removed. Please rerun the scan.",
				reportId: null,
				progress: null,
				exportReadiness: null
			});
		}
		if (job.status === "ready" && job.reportId && await reportExists(job.reportId)) {
			let report;
			try {
				report = await loadReport(job.reportId);
			} catch (error) {
				console.warn(`Removing corrupt report ${job.reportId}`, error);
				await deleteReport(job.reportId);
				return json(buildStatusPayload({
					...job,
					reportId: null,
					error: "Corrupt report data was removed. Please rerun the scan."
				}));
			}
			return json(buildStatusPayload(job, report));
		}
		return json(buildStatusPayload(job));
	} catch (error) {
		console.error("Scan status failed", error);
		return json({ message: error instanceof Error ? error.message : "Internal Error" }, { status: 500 });
	}
}
//#endregion
export { GET };
