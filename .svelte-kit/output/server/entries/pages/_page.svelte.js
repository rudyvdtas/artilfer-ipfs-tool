import { b as escape_html, i as head, r as ensure_array_like, t as attr_class, y as attr } from "../../chunks/server.js";
//#region src/lib/i18n/en.js
var pageCopy = {
	appTitle: "NFT Archive Assistant",
	metaDescription: "Scan tokenURIs and root CIDs, export an IPFS inventory CSV, and build a CAR archive.",
	eyebrow: "ARTfilter Assistant",
	heroTitle: "This tool helps you archive your NFT collections.",
	heroDescription: "Paste tokenURIs or root CIDs, let the crawler collect nested IPFS links, and then export either a CSV for Pinata or a CAR bundle with manifest and assets.",
	workflowLabel: "Workflow",
	workflowValue: "Scan → CSV → CAR",
	inputLabel: "Input",
	inputValue: "1 line = 1 source",
	outputLabel: "Output",
	outputValue: "Inventory + archive",
	chatLabel: "Chat",
	chatTitle: "Tell the assistant what you want to archive.",
	step1Title: "Step 1: Scan collection",
	scanNow: "Scan now",
	scanning: "Scanning...",
	step2Title: "Step 2: Download",
	downloadCsv: "📥 Download Pinata CSV",
	creatingCsv: "Creating CSV...",
	downloadCar: "📦 Download CAR archive",
	creatingCar: "Creating CAR...",
	scannerLogTitle: "Scanner log",
	resultWindowTitleCompleted: "Result window",
	resultWindowTitleScanning: "Scanner log",
	resultTitlePrefix: "Result window",
	lines: "lines",
	empty: "empty",
	scannerLogEmptyBody: "Step by step, you will see what the scanner is doing here.",
	inputFieldLabel: "TokenURIs or root CIDs",
	inputPlaceholder: "Paste one tokenURI or root CID per line...",
	resultLabel: "Result",
	summaryTitle: "Scan summary.",
	resultTitlePrefix: "Result Window",
	exportInfoTitle: "Export info",
	exportInfoRoot: "Root",
	exportInfoFiles: "Files",
	exportInfoManifest: "Manifest",
	exportInfoManifestText: "is included in the CAR as `manifest.json`.",
	placeholderText: "After the first scan, you will see the counts, discovered refs, and a compact preview of the export here.",
	tableStatus: "Status",
	tableType: "Type",
	tablePath: "Path",
	tableSize: "Size",
	nA: "n/a",
	unknownError: "Unknown error",
	pleasePasteOne: "Please paste at least one tokenURI or root CID.",
	scanFailed: "Scan failed",
	scanEndedWithoutResult: "Scan ended without a result",
	scanTheCollectionBeforeExporting: "Scan the collection before exporting.",
	exportFailed: "Export failed",
	couldNotScan: "I could not scan",
	exportReady: "export ready",
	exportFailedPrefix: "Export failed",
	scanCompletePrefix: "Scan complete",
	itemsBasedOn: "items based on",
	uniqueIpfsRefs: "unique IPFS ref(s)",
	userScanSummaryPrefix: "Scan complete. I found",
	userCouldNotScanPrefix: "I could not scan:",
	csvReady: "CSV export ready.",
	carReadyPrefix: "CAR export ready. Archive root CID:",
	carReadyLogPrefix: "CAR ready with root CID:",
	csvReadyLogPrefix: "CSV ready:",
	scanningStarted: "Scan started",
	sendingStreamRequest: "Sending stream request to /api/scan/stream",
	inputLines: "Input lines",
	itemStarted: "Item started",
	fetchStarted: "Fetch started",
	fetchOk: "Fetch ok",
	fetchFailed: "Fetch failed",
	refsFound: "Refs found",
	itemDone: "Item done",
	scanCompletedLogPrefix: "Scan completed:",
	uniqueRefsFound: "Unique refs found:",
	exportStartedFromExistingReport: "Export started from existing report:",
	errorPrefix: "Error:",
	success: "Success",
	failures: "Failures",
	assistantWelcome: "Paste one tokenURI or root CID per line. I will scan the IPFS links, build an inventory CSV, and can then create a CAR export."
};
//#endregion
//#region src/routes/+page.svelte
function _page($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let logLineCount;
		const starterText = `ipfs://bafy.../metadata.json
https://example.com/token/123
Qm...`;
		function looksLikeRealLink(text) {
			return /^(ipfs:\/\/|https?:\/\/|Qm[1-9A-HJ-NP-Za-km-z]{44,})/m.test(text.trim());
		}
		let inputText = starterText;
		let messages = [{
			role: "assistant",
			text: pageCopy.assistantWelcome
		}];
		let busy = "";
		let scanLog = [];
		$: logLineCount = scanLog.length;
		head("1uha8ag", $$renderer, ($$renderer) => {
			$$renderer.title(($$renderer) => {
				$$renderer.push(`<title>${escape_html(pageCopy.appTitle)}</title>`);
			});
			$$renderer.push(`<meta name="description"${attr("content", pageCopy.metaDescription)}/>`);
		});
		$$renderer.push(`<div class="page svelte-1uha8ag"><div class="shell svelte-1uha8ag"><section class="hero card svelte-1uha8ag"><div class="hero-copy"><p class="eyebrow svelte-1uha8ag">ARTfilter Assistant</p> <h1 class="svelte-1uha8ag">This tool helps you archive your NFT collections.</h1></div> <div class="hero-stats svelte-1uha8ag"><div class="stat svelte-1uha8ag"><span class="svelte-1uha8ag">Workflow</span> <strong class="svelte-1uha8ag">Scan → CSV → CAR</strong></div> <div class="stat svelte-1uha8ag"><span class="svelte-1uha8ag">Input</span> <strong class="svelte-1uha8ag">1 line = 1 source</strong></div> <div class="stat svelte-1uha8ag"><span class="svelte-1uha8ag">Output</span> <strong class="svelte-1uha8ag">Inventory + archive</strong></div></div></section> <section class="panel card chat-panel svelte-1uha8ag"><div class="panel-header svelte-1uha8ag"><div><p class="panel-kicker svelte-1uha8ag">Chat</p> <h2 class="svelte-1uha8ag">Tell the assistant what you want to archive.</h2></div></div> <div class="chat-log svelte-1uha8ag" aria-live="polite"><!--[-->`);
		const each_array = ensure_array_like(messages);
		for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
			let message = each_array[$$index];
			$$renderer.push(`<div${attr_class(`bubble ${message.role}`, "svelte-1uha8ag")}>${escape_html(message.text)}</div>`);
		}
		$$renderer.push(`<!--]--></div> <div class="composer svelte-1uha8ag"><label for="inputText" class="svelte-1uha8ag">TokenURIs, IPFS links, CIDs, or JSON input</label> <textarea id="inputText" spellcheck="false"${attr("placeholder", looksLikeRealLink(inputText) ? "" : "Paste one tokenURI or root CID per line...")} class="svelte-1uha8ag">`);
		const $$body = escape_html(inputText);
		if ($$body) $$renderer.push(`${$$body}`);
		$$renderer.push(`</textarea> `);
		$$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--></div> <div class="input-actions svelte-1uha8ag"><div class="action-group svelte-1uha8ag"><h3 class="svelte-1uha8ag">Step 1</h3> <p class="action-help svelte-1uha8ag">Paste one tokenURI, IPFS link, CID, or JSON input. I will scan the references, build an inventory CSV, and can then create a CAR export once the result is export-ready.</p> <button class="primary svelte-1uha8ag"${attr("disabled", busy === "scan" || !inputText.trim(), true)}>${escape_html(busy === "scan" ? "Scanning..." : "Scan now")}</button></div> `);
		$$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--></div></section> <aside class="panel card svelte-1uha8ag"><div class="panel-header svelte-1uha8ag"><div><p class="panel-kicker svelte-1uha8ag">Result</p> <h2 class="svelte-1uha8ag">Scan summary and export readiness.</h2></div></div> <div class="scan-window svelte-1uha8ag"><div class="scan-window-header svelte-1uha8ag"><h3 class="svelte-1uha8ag">${escape_html(busy === "scan" ? pageCopy.resultWindowTitleScanning : pageCopy.resultWindowTitleCompleted)}</h3> <span class="svelte-1uha8ag">${escape_html(busy === "scan" ? pageCopy.scannerLogTitle : pageCopy.resultTitlePrefix)} `);
		if (logLineCount) {
			$$renderer.push("<!--[0-->");
			$$renderer.push(`· ${escape_html(logLineCount)} lines`);
		} else $$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--></span></div> <div class="scan-window-body svelte-1uha8ag">`);
		if (scanLog.length) {
			$$renderer.push("<!--[0-->");
			$$renderer.push(`<!--[-->`);
			const each_array_1 = ensure_array_like(scanLog);
			for (let $$index_1 = 0, $$length = each_array_1.length; $$index_1 < $$length; $$index_1++) {
				let line = each_array_1[$$index_1];
				$$renderer.push(`<div class="scan-line svelte-1uha8ag">${escape_html(line)}</div>`);
			}
			$$renderer.push(`<!--]-->`);
		} else {
			$$renderer.push("<!--[-1-->");
			$$renderer.push(`<p class="svelte-1uha8ag">${escape_html(pageCopy.scannerLogEmptyBody)}</p>`);
		}
		$$renderer.push(`<!--]--></div></div> `);
		$$renderer.push("<!--[-1-->");
		$$renderer.push(`<p class="placeholder svelte-1uha8ag">After the first scan, you will see the counts, discovered refs, and a compact preview of
        the export here. CAR export is only enabled once the report is export-ready.</p>`);
		$$renderer.push(`<!--]--></aside></div></div>`);
	});
}
//#endregion
export { _page as default };
