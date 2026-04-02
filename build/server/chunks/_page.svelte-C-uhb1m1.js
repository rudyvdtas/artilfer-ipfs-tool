import { a3 as head, a4 as attr, a5 as attr_class, e as escape_html } from './server-DbIwGpGG.js';

//#region src/routes/+page.svelte
function _page($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		/** @type {'input' | 'scanning' | 'result' | 'error'} */
		let step = "input";
		let cidInput = "";
		head("1uha8ag", $$renderer, ($$renderer) => {
			$$renderer.title(($$renderer) => {
				$$renderer.push(`<title>NFT Archive — ARTfilter</title>`);
			});
			$$renderer.push(`<meta name="description" content="Archive your IPFS NFT collection: scan CIDs, build a Merkle tree, export as manifest.json, CSV for Pinata, or CAR bundle."/>`);
		});
		$$renderer.push(`<div class="page svelte-1uha8ag" role="main"><div class="shell svelte-1uha8ag"><header class="header svelte-1uha8ag"><div class="header-brand"><span class="eyebrow svelte-1uha8ag">ARTfilter</span> <h1 class="svelte-1uha8ag">IPFS Archive Assistant</h1></div> <p class="header-sub svelte-1uha8ag">Scan een CID, bekijk de Merkle tree, exporteer als manifest, CSV of CAR-bundel.</p></header> <div class="wizard svelte-1uha8ag"><div class="step step-active svelte-1uha8ag"><div class="step-label svelte-1uha8ag"><span class="step-number svelte-1uha8ag">1</span> <span>Welke CID wil je archiveren?</span> `);
		$$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--></div> <div class="input-row svelte-1uha8ag"><input type="text"${attr("value", cidInput)} placeholder="bafybeieav35xe… of ipfs://…"${attr_class("cid-input svelte-1uha8ag", void 0, { "input-error": false })}${attr("disabled", step === "scanning", true)} aria-label="CID of IPFS-link"/> <button class="btn btn-primary svelte-1uha8ag"${attr("disabled", !cidInput.trim(), true)}>${escape_html("Scan")}</button></div> `);
		$$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--> `);
		{
			$$renderer.push("<!--[0-->");
			$$renderer.push(`<p class="input-hint svelte-1uha8ag">Plak een CID (<code class="svelte-1uha8ag">bafy…</code> of <code class="svelte-1uha8ag">Qm…</code>), een IPFS-link (<code class="svelte-1uha8ag">ipfs://…</code>) of een IPFS gateway-URL. Druk Enter of klik Scan.</p>`);
		}
		$$renderer.push(`<!--]--></div> `);
		$$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--> `);
		$$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--></div></div></div>`);
	});
}

export { _page as default };
//# sourceMappingURL=_page.svelte-C-uhb1m1.js.map
