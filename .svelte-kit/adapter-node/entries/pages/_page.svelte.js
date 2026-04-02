import { r as head, t as attr_class, v as attr, y as escape_html } from "../../chunks/server.js";
//#region src/routes/+page.svelte
function _page($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		/** @type {'input' | 'scanning' | 'result' | 'error'} */
		let step = "input";
		let cidInput = "";
		let progress = {
			current: 0,
			total: 0
		};
		head("1uha8ag", $$renderer, ($$renderer) => {
			$$renderer.title(($$renderer) => {
				$$renderer.push(`<title>NFT Archive — ARTfilter</title>`);
			});
			$$renderer.push(`<meta name="description" content="Archive your IPFS NFT collection: scan CIDs, build a Merkle tree, export as manifest.json, CSV for Pinata, or CAR bundle."/>`);
		});
		$$renderer.push(`<div class="page svelte-1uha8ag" role="main"><div class="shell svelte-1uha8ag"><header class="header svelte-1uha8ag"><div class="header-brand"><span class="eyebrow svelte-1uha8ag">ARTfilter</span> <h1 class="svelte-1uha8ag">IPFS Archive Assistant</h1></div> <p class="header-sub svelte-1uha8ag">Scan een CID, bekijk de Merkle tree, exporteer als manifest, CSV of CAR-bundel.</p></header> <div class="wizard svelte-1uha8ag"><div class="step step-active svelte-1uha8ag"><div class="step-label svelte-1uha8ag"><span class="step-number svelte-1uha8ag">1</span> <span>Welke CID wil je archiveren?</span> `);
		if (step === "result") {
			$$renderer.push("<!--[0-->");
			$$renderer.push(`<button class="btn btn-ghost btn-small svelte-1uha8ag">Nieuwe scan</button>`);
		} else $$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--></div> <div class="input-row svelte-1uha8ag"><input type="text"${attr("value", cidInput)} placeholder="bafybeieav35xe… of ipfs://…"${attr_class("cid-input svelte-1uha8ag", void 0, { "input-error": false })}${attr("disabled", step === "scanning", true)} aria-label="CID of IPFS-link"/> <button class="btn btn-primary svelte-1uha8ag"${attr("disabled", step === "scanning" || !cidInput.trim(), true)}>${escape_html(step === "scanning" ? "Bezig…" : "Scan")}</button></div> `);
		$$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--> `);
		if (step === "input" || step === "error") {
			$$renderer.push("<!--[0-->");
			$$renderer.push(`<p class="input-hint svelte-1uha8ag">Plak een CID (<code class="svelte-1uha8ag">bafy…</code> of <code class="svelte-1uha8ag">Qm…</code>), een IPFS-link (<code class="svelte-1uha8ag">ipfs://…</code>) of een IPFS gateway-URL. Druk Enter of klik Scan.</p>`);
		} else $$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--></div> `);
		if (step === "scanning") {
			$$renderer.push("<!--[0-->");
			$$renderer.push(`<div class="scanning-state svelte-1uha8ag"><div class="spinner svelte-1uha8ag" aria-label="Laden"></div> <div class="scanning-info"><p class="scanning-title svelte-1uha8ag">Bezig met scannen…</p> `);
			if (progress.current > 0) {
				$$renderer.push("<!--[0-->");
				$$renderer.push(`<p class="scanning-progress svelte-1uha8ag">${escape_html(progress.current)} bestanden gevonden `);
				if (progress.total > 0) {
					$$renderer.push("<!--[0-->");
					$$renderer.push(`van ~${escape_html(progress.total)}`);
				} else $$renderer.push("<!--[-1-->");
				$$renderer.push(`<!--]--></p>`);
			} else {
				$$renderer.push("<!--[-1-->");
				$$renderer.push(`<p class="scanning-progress svelte-1uha8ag">Ophalen van CID-structuur via IPFS gateways…</p>`);
			}
			$$renderer.push(`<!--]--></div></div>`);
		} else $$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--> `);
		$$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--></div></div></div>`);
	});
}
//#endregion
export { _page as default };
