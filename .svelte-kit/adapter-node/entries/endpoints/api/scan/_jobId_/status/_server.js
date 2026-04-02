import { i as loadJob, r as jobExists } from "../../../../../../chunks/job-store.js";
import { json } from "@sveltejs/kit";
//#region src/routes/api/scan/[jobId]/status/+server.js
async function GET({ params }) {
	const { jobId } = params;
	if (!jobId) return json({ message: "Missing jobId." }, { status: 400 });
	if (!await jobExists(jobId)) return json({ message: "Job not found." }, { status: 404 });
	let job;
	try {
		job = await loadJob(jobId);
	} catch {
		return json({ message: "Corrupt job data. Please scan again." }, { status: 500 });
	}
	const response = {
		jobId: job.jobId,
		status: job.status,
		progress: job.progress,
		error: job.error || null
	};
	if (job.status === "ready" && job.result) response.result = job.result;
	return json(response);
}
//#endregion
export { GET };
