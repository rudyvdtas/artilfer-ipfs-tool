import { i as saveReport } from "../../../../chunks/report-store.js";
import { i as updateJob, t as createJob } from "../../../../chunks/job-store.js";
import { n as createReportData, t as scanArchive } from "../../../../chunks/workflow.js";
import { json } from "@sveltejs/kit";
import { randomUUID } from "node:crypto";
//#region src/routes/api/scan/+server.js
async function POST({ request }) {
	const body = await request.json().catch(() => null);
	const ipfsHash = body?.ipfsHash ?? body?.inputText ?? "";
	if (!String(ipfsHash).trim()) return json({ message: "Missing ipfsHash." }, { status: 400 });
	const jobId = `scan_${randomUUID()}`;
	const now = Date.now();
	await createJob({
		jobId,
		status: "queued",
		createdAt: now,
		updatedAt: now,
		startedAt: null,
		completedAt: null,
		progress: {
			current: 0,
			total: null
		},
		reportId: null,
		error: null
	});
	(async () => {
		try {
			await updateJob(jobId, {
				status: "scanning",
				startedAt: Date.now()
			});
			const persistedReport = createReportData(await scanArchive(String(ipfsHash), async (event) => {
				const current = typeof event?.item?.id === "number" ? event.item.id : typeof event?.count === "number" ? event.count : null;
				const total = typeof event?.total === "number" ? event.total : null;
				if (current !== null) await updateJob(jobId, { progress: {
					current,
					total: total ?? current
				} }).catch(() => {});
			}));
			await saveReport({
				...persistedReport,
				items: persistedReport.items.slice(0, 250),
				archiveFiles: persistedReport.archiveFiles.slice(0, 250)
			});
			await updateJob(jobId, {
				status: "ready",
				completedAt: Date.now(),
				reportId: persistedReport.reportId,
				progress: {
					current: persistedReport.itemCount,
					total: persistedReport.itemCount
				}
			});
		} catch (error) {
			await updateJob(jobId, {
				status: "failed",
				completedAt: Date.now(),
				error: error?.message || "Scan failed"
			}).catch(() => {});
		}
	})();
	return json({
		jobId,
		status: "queued"
	});
}
//#endregion
export { POST };
