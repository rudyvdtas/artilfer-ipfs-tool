import { r as toClientReport, t as scanArchive } from "../../../../../chunks/workflow.js";
//#region src/routes/api/scan/stream/+server.js
async function POST({ request }) {
	const inputText = (await request.json().catch(() => null))?.inputText ?? "";
	if (!String(inputText).trim()) return new Response("Please paste at least one tokenURI or root CID.", { status: 400 });
	const stream = new ReadableStream({ start(controller) {
		const encoder = new TextEncoder();
		const send = (event, data) => {
			controller.enqueue(encoder.encode(`event: ${event}\n`));
			controller.enqueue(encoder.encode(`data: ${JSON.stringify(data)}\n\n`));
		};
		(async () => {
			try {
				send("log", { message: "Scan gestart" });
				send("done", toClientReport(await scanArchive(String(inputText), (progress) => send("progress", progress))));
			} catch (error) {
				send("error", { message: error instanceof Error ? error.message : "Onbekende fout" });
			} finally {
				controller.close();
			}
		})();
	} });
	return new Response(stream, { headers: {
		"content-type": "text/event-stream; charset=utf-8",
		"cache-control": "no-cache, no-transform",
		connection: "keep-alive"
	} });
}
//#endregion
export { POST };
