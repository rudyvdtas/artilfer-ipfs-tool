import { CID } from "multiformats/cid";
import path from "node:path";
import { Buffer } from "node:buffer";
import { randomUUID } from "node:crypto";
//#region src/lib/server/archive/canonicalize.js
function tryParseJson$2(text) {
	try {
		return JSON.parse(text);
	} catch {
		return null;
	}
}
function isJsonLike(input) {
	const text = String(input || "").trim();
	return text.startsWith("{") || text.startsWith("[");
}
function isUriLike(input) {
	return /^https?:\/\//i.test(String(input || "").trim()) || /^ipfs:\/\//i.test(String(input || "").trim());
}
function isPlainText(input) {
	return typeof input === "string" && input.trim().length > 0;
}
async function canonicalizeInput(input) {
	if (input === null || input === void 0) return null;
	if (typeof input === "object") return input;
	const text = String(input).trim();
	if (!text) return null;
	if (isJsonLike(text)) {
		const parsed = tryParseJson$2(text);
		if (parsed !== null) return parsed;
	}
	if (isUriLike(text)) return {
		type: "uri",
		value: text
	};
	if (isPlainText(text)) return {
		type: "text",
		value: text
	};
	return null;
}
//#endregion
//#region src/lib/server/archive/reference.js
var GATEWAYS = [
	"https://w3s.link/ipfs",
	"https://ipfs.io/ipfs",
	"https://dweb.link/ipfs",
	"https://cloudflare-ipfs.com/ipfs",
	"https://gateway.pinata.cloud/ipfs"
];
function stripDecorations$1(value) {
	return String(value).trim().replace(/^[<"'`(\[]+/, "").replace(/[>"'`)]\.,;]+$/, "");
}
function safeSegment(value) {
	return stripDecorations$1(value).normalize("NFKD").replace(/[^\w.-]+/g, "-").replace(/-+/g, "-").replace(/^-+|-+$/g, "").toLowerCase() || "item";
}
function parseCid$1(value) {
	try {
		return CID.parse(value).toString();
	} catch {
		return null;
	}
}
function canonicalizeReference$1(raw) {
	const cleaned = stripDecorations$1(raw);
	if (!cleaned) return null;
	if (/^ipfs:\/\/[a-z0-9]+/i.test(cleaned)) {
		const [cidPart, ...rest] = cleaned.slice(7).split("/");
		const cid = parseCid$1(cidPart);
		if (!cid) return null;
		const suffix = rest.length ? `/${rest.join("/")}` : "";
		return {
			raw: cleaned,
			canonical: `ipfs://${cid}${suffix}`,
			kind: "ipfs",
			cid,
			path: suffix
		};
	}
	if (cleaned.includes("/ipfs/")) {
		const ipfsIndex = cleaned.indexOf("/ipfs/");
		const [cidPart, ...rest] = cleaned.slice(ipfsIndex + 6).split("/");
		const cid = parseCid$1(cidPart);
		if (!cid) return null;
		const suffix = rest.length ? `/${rest.join("/")}` : "";
		return {
			raw: cleaned,
			canonical: `ipfs://${cid}${suffix}`,
			kind: "ipfs",
			cid,
			path: suffix
		};
	}
	if (/^https?:\/\//i.test(cleaned)) try {
		const url = new URL(cleaned);
		const ipfsIndex = url.pathname.indexOf("/ipfs/");
		if (ipfsIndex !== -1) {
			const [cidPart, ...rest] = url.pathname.slice(ipfsIndex + 6).split("/");
			const cid = parseCid$1(cidPart);
			if (!cid) return null;
			const suffix = rest.length ? `/${rest.join("/")}` : "";
			return {
				raw: cleaned,
				canonical: `ipfs://${cid}${suffix}`,
				kind: "ipfs",
				cid,
				path: suffix
			};
		}
		return {
			raw: cleaned,
			canonical: cleaned,
			kind: "url"
		};
	} catch {
		return null;
	}
	const [cidPart, ...rest] = cleaned.split("/");
	const cid = parseCid$1(cidPart);
	if (!cid) return null;
	const suffix = rest.length ? `/${rest.join("/")}` : "";
	return {
		raw: cleaned,
		canonical: `ipfs://${cid}${suffix}`,
		kind: "ipfs",
		cid,
		path: suffix
	};
}
function gatewayUrlsForRef(reference) {
	if (!reference?.canonical) return [];
	if (reference.kind === "url") return [reference.canonical];
	const remainder = reference.canonical.replace(/^ipfs:\/\//, "");
	return GATEWAYS.map((gateway) => `${gateway}/${remainder}`);
}
function extractRootCidFromReference(reference) {
	if (!reference?.canonical?.startsWith("ipfs://")) return null;
	return reference.canonical.replace(/^ipfs:\/\//, "").split("/")[0] || null;
}
function extractCidFromAnyRef(value) {
	if (!value) return null;
	const text = String(value).trim();
	if (!text) return null;
	if (text.startsWith("ipfs://")) return text.replace(/^ipfs:\/\//, "").split("/")[0] || null;
	if (text.includes("/ipfs/")) return text.split("/ipfs/")[1]?.split("/")[0] || null;
	if (text.startsWith("http://") || text.startsWith("https://")) try {
		const url = new URL(text);
		const idx = url.pathname.indexOf("/ipfs/");
		if (idx !== -1) return url.pathname.slice(idx + 6).split("/")[0] || null;
	} catch {
		return null;
	}
	return parseCid$1(text.split("/")[0]);
}
//#endregion
//#region src/lib/server/archive/discover.js
var DEFAULT_KEY_WHITELIST = [
	"uri",
	"cid",
	"CID",
	"link",
	"href",
	"tokenURI",
	"url",
	"reference"
];
var DEFAULT_MAX_REFS = 100;
var DEFAULT_MAX_DEPTH = 6;
function stripDecorations(value) {
	return String(value).trim().replace(/^[<"'`(\[]+/, "").replace(/[>"'`\)\].,;]+$/, "");
}
function parseCid(value) {
	try {
		return value ? String(value) : null;
	} catch {
		return null;
	}
}
function canonicalizeReference(raw) {
	const cleaned = stripDecorations(raw);
	if (!cleaned) return null;
	if (/^ipfs:\/\/[a-z0-9]+/i.test(cleaned)) {
		const [cidPart, ...rest] = cleaned.slice(7).split("/");
		const cid = parseCid(cidPart);
		if (!cid) return null;
		const suffix = rest.length ? `/${rest.join("/")}` : "";
		return {
			raw: cleaned,
			canonical: `ipfs://${cid}${suffix}`,
			kind: "ipfs",
			cid,
			path: suffix
		};
	}
	if (cleaned.includes("/ipfs/")) {
		const ipfsIndex = cleaned.indexOf("/ipfs/");
		const [cidPart, ...rest] = cleaned.slice(ipfsIndex + 6).split("/");
		const cid = parseCid(cidPart);
		if (!cid) return null;
		const suffix = rest.length ? `/${rest.join("/")}` : "";
		return {
			raw: cleaned,
			canonical: `ipfs://${cid}${suffix}`,
			kind: "ipfs",
			cid,
			path: suffix
		};
	}
	if (/^https?:\/\//i.test(cleaned)) try {
		const url = new URL(cleaned);
		const ipfsIndex = url.pathname.indexOf("/ipfs/");
		if (ipfsIndex !== -1) {
			const [cidPart, ...rest] = url.pathname.slice(ipfsIndex + 6).split("/");
			const cid = parseCid(cidPart);
			if (!cid) return null;
			const suffix = rest.length ? `/${rest.join("/")}` : "";
			return {
				raw: cleaned,
				canonical: `ipfs://${cid}${suffix}`,
				kind: "ipfs",
				cid,
				path: suffix
			};
		}
		return {
			raw: cleaned,
			canonical: cleaned,
			kind: "url"
		};
	} catch {
		return null;
	}
	const [cidPart, ...rest] = cleaned.split("/");
	const cid = parseCid(cidPart);
	if (!cid) return null;
	const suffix = rest.length ? `/${rest.join("/")}` : "";
	return {
		raw: cleaned,
		canonical: `ipfs://${cid}${suffix}`,
		kind: "ipfs",
		cid,
		path: suffix
	};
}
function extractRefsFromText(text) {
	const refs = /* @__PURE__ */ new Map();
	for (const pattern of [
		/ipfs:\/\/[^\s"'<>`]+/gi,
		/https?:\/\/[^\s"'<>`]+\/ipfs\/[^\s"'<>`]+/gi,
		/(?:bafy[a-z0-9]{20,}|Qm[1-9A-HJ-NP-Za-km-z]{44})(?:\/[^\s"'<>`]+)?/g
	]) for (const match of text.matchAll(pattern)) {
		const reference = canonicalizeReference(match[0]);
		if (reference) refs.set(reference.canonical, reference);
	}
	return [...refs.values()];
}
function discoverReferences(input, options = {}) {
	const { maxRefs = DEFAULT_MAX_REFS, maxDepth = DEFAULT_MAX_DEPTH, keyWhitelist = DEFAULT_KEY_WHITELIST } = options;
	const refs = /* @__PURE__ */ new Map();
	const visited = /* @__PURE__ */ new WeakSet();
	let nodeCount = 0;
	function addReference(raw) {
		if (refs.size >= maxRefs) return;
		const reference = canonicalizeReference(raw);
		if (reference) refs.set(reference.canonical, reference);
	}
	function walk(node, depth = 0) {
		if (refs.size >= maxRefs || nodeCount >= 1500 || depth > maxDepth) return;
		if (typeof node === "string") {
			for (const reference of extractRefsFromText(node)) {
				refs.set(reference.canonical, reference);
				if (refs.size >= maxRefs) break;
			}
			return;
		}
		if (Array.isArray(node)) {
			nodeCount += 1;
			for (const child of node) walk(child, depth + 1);
			return;
		}
		if (node && typeof node === "object") {
			if (visited.has(node)) return;
			visited.add(node);
			nodeCount += 1;
			for (const key of keyWhitelist) if (typeof node[key] === "string") addReference(node[key]);
			for (const [key, child] of Object.entries(node)) {
				if (keyWhitelist.includes(key)) continue;
				walk(child, depth + 1);
				if (refs.size >= maxRefs || nodeCount >= 1500) return;
			}
		}
	}
	walk(input, 0);
	return [...refs.values()];
}
//#endregion
//#region src/lib/server/archive/discovery.js
function decodeBytes(bytes) {
	return new TextDecoder("utf-8", { fatal: false }).decode(bytes);
}
function tryParseJson$1(text) {
	try {
		return JSON.parse(text);
	} catch {
		return null;
	}
}
function guessKind(contentType, text, json) {
	const type = String(contentType || "").toLowerCase();
	if (json) return "json";
	if (type.includes("json")) return "json";
	if (type.startsWith("image/")) return "binary";
	if (type.includes("html")) return "html";
	if (type.startsWith("text/")) return "text";
	if (text && text.trim().startsWith("{")) return "json";
	return "binary";
}
function guessExtension$1(item) {
	const name = item.nameHint || "";
	const existingExt = name.includes(".") ? `.${name.split(".").pop()}` : "";
	if (existingExt) return existingExt;
	const type = String(item.contentType || "").toLowerCase();
	if (item.kind === "json") return ".json";
	if (item.kind === "html") return ".html";
	if (item.kind === "text") return ".txt";
	if (type === "image/png") return ".png";
	if (type === "image/jpeg" || type === "image/jpg") return ".jpg";
	if (type === "image/gif") return ".gif";
	if (type === "image/webp") return ".webp";
	if (type === "image/svg+xml") return ".svg";
	if (type === "application/pdf") return ".pdf";
	if (type === "text/csv") return ".csv";
	return ".bin";
}
function deriveNameHint$1(resource, seed, index) {
	if (resource?.url) try {
		const base = new URL(resource.url).pathname.split("/").pop();
		if (base) return base;
	} catch {}
	if (seed?.canonical?.startsWith("ipfs://")) {
		const parts = seed.canonical.replace(/^ipfs:\/\//, "").split("/");
		if (parts.length > 1) return parts[parts.length - 1];
	}
	return `item-${String(index).padStart(4, "0")}`;
}
function createArchivePath$1(item, index) {
	const folder = item.kind === "json" ? "metadata" : item.kind === "html" ? "pages" : item.kind === "text" ? "notes" : "assets";
	const base = safeSegment(item.nameHint || `item-${String(index).padStart(4, "0")}`);
	return `${folder}/${String(index).padStart(4, "0")}-${base}${guessExtension$1(item)}`;
}
async function fetchReference(reference) {
	const candidates = gatewayUrlsForRef(reference);
	let lastError = null;
	for (const url of candidates) try {
		const response = await fetch(url, { headers: { accept: "application/json,text/plain,*/*" } });
		if (!response.ok) throw new Error(`HTTP ${response.status}`);
		const bytes = Buffer.from(await response.arrayBuffer());
		const contentType = (response.headers.get("content-type") || "").split(";")[0].trim().toLowerCase();
		const text = bytes.length ? decodeBytes(bytes) : "";
		return {
			ok: true,
			url,
			bytes,
			text,
			json: contentType.includes("json") || text.trim().startsWith("{") || text.trim().startsWith("[") ? tryParseJson$1(text) : null,
			contentType
		};
	} catch (error) {
		lastError = error;
	}
	return {
		ok: false,
		error: lastError?.message || "Unable to fetch reference"
	};
}
function discoverRefsFromValue(value) {
	return discoverReferences(value, {
		maxRefs: 100,
		maxDepth: 5,
		keyWhitelist: [
			"uri",
			"cid",
			"CID",
			"link",
			"href",
			"tokenURI",
			"url",
			"reference"
		]
	});
}
function createSummary(items, seeds) {
	const ok = items.filter((item) => item.status === "ok");
	const failed = items.filter((item) => item.status !== "ok");
	return {
		totalFiles: items.length,
		input_count: seeds.length,
		total_records: items.length,
		successful_records: ok.length,
		failed_records: failed.length,
		unique_references: new Set(items.map((item) => item.canonicalRef)).size,
		json_records: items.filter((item) => item.kind === "json").length,
		text_records: items.filter((item) => item.kind === "text").length,
		html_records: items.filter((item) => item.kind === "html").length,
		binary_records: items.filter((item) => item.kind === "binary").length
	};
}
function buildProgressState(items, seeds) {
	return {
		processed: items.length,
		total: seeds.length,
		completed: items.filter((item) => item.status === "ok").length,
		failed: items.filter((item) => item.status !== "ok").length
	};
}
async function discoverAndFetch(seed, parentId, depth, onProgress) {
	onProgress?.({
		type: "fetch_start",
		seed,
		parentId,
		depth
	});
	const fetched = await fetchReference(seed);
	if (!fetched.ok) return {
		status: "error",
		notes: fetched.error,
		kind: "binary",
		bytes: null,
		text: "",
		json: null,
		contentType: "",
		resolvedUrl: null,
		discoveredRefs: [],
		discoveredCount: 0
	};
	const kind = guessKind(fetched.contentType, fetched.text, fetched.json);
	const nameHint = deriveNameHint$1(fetched, seed, seed.id);
	const discoveredRefs = kind === "json" && fetched.json ? discoverRefsFromValue(fetched.json) : discoverRefsFromValue(fetched.text);
	return {
		status: "ok",
		notes: discoveredRefs.length ? `${discoveredRefs.length} IPFS reference(s) discovered` : "",
		kind,
		bytes: fetched.bytes,
		text: fetched.text,
		json: fetched.json,
		contentType: fetched.contentType,
		resolvedUrl: fetched.url,
		nameHint,
		discoveredRefs,
		discoveredCount: discoveredRefs.length,
		parentId,
		depth
	};
}
function makeArchiveFile(item, index) {
	return {
		path: createArchivePath$1(item, index),
		bytes: item.bytes
	};
}
//#endregion
//#region src/lib/server/archive/report.js
var REPORT_TTL_MS = 1440 * 60 * 1e3;
function serializeItem(item) {
	return {
		id: item.id,
		parent_id: item.parentId,
		depth: item.depth,
		source_ref: item.sourceRef,
		canonical_ref: item.canonicalRef,
		resolved_url: item.resolvedUrl,
		status: item.status,
		content_type: item.contentType,
		size_bytes: item.sizeBytes,
		kind: item.kind,
		archive_path: item.archivePath,
		name_hint: item.nameHint,
		notes: item.notes,
		discovered_count: item.discoveredCount
	};
}
function normalizeMetadataValue(value) {
	if (value === null || value === void 0) return "";
	if (typeof value === "string") return value.trim();
	if (Array.isArray(value)) return value.slice(0, 50).map(normalizeMetadataValue).filter(Boolean).join(", ");
	if (typeof value === "object") return value.name || value.title || value.label || value.value || "[object]";
	return String(value);
}
function collectMetadataCandidates(metadata) {
	const candidates = [];
	if (!metadata || typeof metadata !== "object") return candidates;
	candidates.push(metadata);
	for (const key of [
		"metadata",
		"properties",
		"collection",
		"project",
		"info",
		"details"
	]) {
		const nested = metadata[key];
		if (nested && typeof nested === "object") candidates.push(nested);
	}
	return candidates;
}
function extractProjectMetadata(metadata) {
	const candidates = collectMetadataCandidates(metadata);
	const merged = {
		project_name: null,
		artists: null,
		year_of_launch: null,
		about: null,
		platform: null,
		tag: null
	};
	for (const entry of candidates) {
		const section = {
			project_name: normalizeMetadataValue(entry.name || entry.project_name || entry.title || entry.project),
			artists: normalizeMetadataValue(entry.artist || entry.artists || entry.creator || entry.creators || entry.author || entry.authors),
			year_of_launch: normalizeMetadataValue(entry.year || entry.launch_year || entry.year_of_launch || entry.date || entry.released),
			about: normalizeMetadataValue(entry.description || entry.about || entry.bio || entry.summary),
			platform: normalizeMetadataValue(entry.platform || entry.platforms || entry.marketplace || entry.network),
			tag: normalizeMetadataValue(entry.tags || entry.tag || entry.attributes || entry.categories)
		};
		for (const [key, value] of Object.entries(section)) if (!merged[key] && value) merged[key] = value;
	}
	return Object.values(merged).some(Boolean) ? merged : null;
}
function buildManifest(report) {
	const sourceMetadata = report.items.find((item) => item.kind === "json" && item.status === "ok" && item.json)?.json;
	const discoveredRefs = [...new Set(report.items.flatMap((item) => item.discoveredRefs || []))].slice(0, 25);
	const sourceInputs = report.seeds.map((seed) => ({
		raw: seed.raw,
		canonical: seed.canonical,
		kind: seed.kind
	}));
	return {
		project: "NFT archive assistant",
		title: "NFT archive assistant — Powered by ARTfilter",
		generated_at: (/* @__PURE__ */ new Date()).toISOString(),
		source_inputs: sourceInputs,
		sourceRefs: sourceInputs.map((seed) => seed.canonical).filter(Boolean),
		project_info: extractProjectMetadata(sourceMetadata),
		source_metadata: sourceMetadata || null,
		summary: report.summary,
		files: report.items.slice(0, 250).map(serializeItem),
		discovered_refs: discoveredRefs.map((ref) => ref.canonical)
	};
}
function createReportPayload(report) {
	const reportId = `scan_${randomUUID()}`;
	const totalSize = report.items.reduce((sum, item) => sum + (item.sizeBytes || 0), 0);
	const rootCid = extractCidFromAnyRef(report?.manifest?.rootCid) || extractCidFromAnyRef(report?.rootCid) || extractCidFromAnyRef(report?.metadata?.rootCid) || extractCidFromAnyRef(report?.seeds?.[0]?.cid) || extractCidFromAnyRef(report?.seeds?.[0]?.canonical) || extractCidFromAnyRef(report?.seeds?.[0]?.raw) || extractCidFromAnyRef(report?.items?.[0]?.cid) || extractCidFromAnyRef(report?.items?.[0]?.canonicalRef) || extractCidFromAnyRef(report?.items?.[0]?.sourceRef) || null;
	return {
		reportId,
		itemCount: report.items.length,
		totalSize,
		size: totalSize,
		rootCid,
		summary: report.summary,
		manifest: {
			...report.manifest,
			rootCid
		},
		items: report.items.map((item) => ({
			...item,
			path: item.archivePath,
			size: item.sizeBytes ?? (item.bytes?.length || 0),
			cid: item.cid || extractRootCidFromReference(item.canonicalRef)
		})),
		archiveFiles: report.archiveFiles.map((file, index) => ({
			...file,
			path: file.path,
			size: file.size ?? (file.bytes?.length || 0),
			cid: file.cid || null,
			index
		})),
		createdAt: Date.now(),
		expiresAt: Date.now() + REPORT_TTL_MS
	};
}
function createReportData(report) {
	return createReportPayload(report);
}
function toClientReport(report) {
	return {
		summary: report.summary,
		manifest: report.manifest,
		pinataCsv: report.pinataCsv,
		archiveFiles: report.archiveFiles,
		items: report.items.map(serializeItem)
	};
}
//#endregion
//#region src/lib/server/archive/seeds.js
function tryParseJson(text) {
	try {
		return JSON.parse(text);
	} catch {
		return null;
	}
}
function safeSourceText(value) {
	const text = String(value || "");
	return text.length > 2e4 ? text.slice(0, 2e4) : text;
}
function normalizeSeedInput(input) {
	if (input && typeof input === "object") {
		if (typeof input.value === "string") return input.value;
		if (typeof input.inputText === "string") return input.inputText;
		if (typeof input.ipfsHash === "string") return input.ipfsHash;
		if (typeof input.url === "string") return input.url;
		if (typeof input.uri === "string") return input.uri;
		if (typeof input.rootCid === "string") return input.rootCid;
		return JSON.stringify(input);
	}
	return String(input || "");
}
async function canonicalizeScanInput(canonicalizeInput, inputText) {
	const canonical = await canonicalizeInput(inputText);
	return canonical === null || canonical === void 0 ? inputText : canonical;
}
async function parseSeedInput(canonicalizeInput, inputText) {
	const canonicalInput = await canonicalizeScanInput(canonicalizeInput, inputText);
	return canonicalInput && typeof canonicalInput === "object" && !Array.isArray(canonicalInput) ? canonicalInput : String(inputText || "");
}
function parseLooseSeedLines(inputText) {
	const text = safeSourceText(inputText);
	const urls = [...text.matchAll(/https?:\/\/[^\s"'<>`]+/gi)].map((m) => m[0]);
	const cidMatches = [...text.matchAll(/(?:bafy[a-z0-9]{20,}|Qm[1-9A-HJ-NP-Za-km-z]{44})/g)].map((m) => m[0]);
	return [...new Set([...urls, ...cidMatches])].slice(0, 10).map((raw, index) => {
		const parsed = canonicalizeReference$1(raw);
		return {
			id: index + 1,
			raw,
			canonical: parsed?.canonical || raw,
			kind: parsed?.kind || (raw.startsWith("http") ? "url" : "ipfs"),
			cid: parsed?.cid || null,
			path: parsed?.path || ""
		};
	});
}
function parseSeeds(inputText) {
	const trimmed = String(inputText || "").trim();
	if (!trimmed) return [];
	const maybeJson = tryParseJson(trimmed);
	if (maybeJson) {
		const rootRef = [
			maybeJson.ipfsHash,
			maybeJson.rootCid,
			maybeJson.cid,
			maybeJson.uri,
			maybeJson.url,
			maybeJson.link,
			maybeJson.tokenURI,
			maybeJson.tokenUri,
			maybeJson.source
		].map(canonicalizeReference$1).find(Boolean);
		if (rootRef) return [{
			id: 1,
			raw: rootRef.raw,
			canonical: rootRef.canonical,
			kind: rootRef.kind,
			cid: rootRef.cid || null,
			path: rootRef.path || ""
		}];
	}
	const lineSeeds = trimmed.split(/\r?\n/).map((line) => stripDecorations$1(line)).filter((line) => line && !line.startsWith("#")).map((raw, index) => {
		const parsed = canonicalizeReference$1(raw);
		if (!parsed) return null;
		return {
			id: index + 1,
			raw,
			canonical: parsed.canonical,
			kind: parsed.kind,
			cid: parsed.cid || null,
			path: parsed.path || ""
		};
	}).filter(Boolean);
	return lineSeeds.length ? lineSeeds : parseLooseSeedLines(trimmed);
}
//#endregion
//#region src/lib/server/archive/workflow.js
var MAX_RECORDS = 2e3;
function guessExtension(item) {
	const name = item.nameHint || "";
	const existingExt = path.extname(name);
	if (existingExt) return existingExt;
	const type = String(item.contentType || "").toLowerCase();
	if (item.kind === "json") return ".json";
	if (item.kind === "html") return ".html";
	if (item.kind === "text") return ".txt";
	if (type === "image/png") return ".png";
	if (type === "image/jpeg" || type === "image/jpg") return ".jpg";
	if (type === "image/gif") return ".gif";
	if (type === "image/webp") return ".webp";
	if (type === "image/svg+xml") return ".svg";
	if (type === "application/pdf") return ".pdf";
	if (type === "text/csv") return ".csv";
	return ".bin";
}
function deriveNameHint(resource, seed, index) {
	if (resource?.url) try {
		const url = new URL(resource.url);
		const base = path.basename(url.pathname);
		if (base) return base;
	} catch {}
	if (seed?.canonical?.startsWith("ipfs://")) {
		const parts = seed.canonical.replace(/^ipfs:\/\//, "").split("/");
		if (parts.length > 1) return parts[parts.length - 1];
	}
	return `item-${String(index).padStart(4, "0")}`;
}
function createArchivePath(item, index) {
	const folder = item.kind === "json" ? "metadata" : item.kind === "html" ? "pages" : item.kind === "text" ? "notes" : "assets";
	const base = safeSegment(item.nameHint || `item-${String(index).padStart(4, "0")}`);
	const ext = guessExtension(item);
	return `${folder}/${String(index).padStart(4, "0")}-${base}${ext}`;
}
async function scanArchive(inputText, onProgress) {
	const seeds = parseSeeds(await parseSeedInput(canonicalizeInput, normalizeSeedInput(inputText)));
	const queue = seeds.map((seed) => ({
		seed,
		parentId: null,
		depth: 0
	}));
	const seen = /* @__PURE__ */ new Set();
	const items = [];
	while (queue.length && items.length < MAX_RECORDS) {
		const next = queue.shift();
		if (seen.has(next.seed.canonical)) continue;
		seen.add(next.seed.canonical);
		const result = await discoverAndFetch(next.seed, next.parentId, next.depth, onProgress);
		const id = items.length + 1;
		const item = {
			id,
			parentId: next.parentId,
			depth: next.depth,
			sourceRef: next.seed.raw,
			canonicalRef: next.seed.canonical,
			resolvedUrl: result.resolvedUrl,
			status: result.status,
			contentType: result.contentType,
			sizeBytes: result.bytes ? result.bytes.length : null,
			kind: result.kind,
			archivePath: createArchivePath({
				kind: result.kind,
				contentType: result.contentType,
				nameHint: result.nameHint || deriveNameHint(null, next.seed, id)
			}, id),
			nameHint: result.nameHint || deriveNameHint(null, next.seed, id),
			notes: result.notes,
			discoveredCount: result.discoveredCount ?? result.discoveredRefs.length,
			discoveredRefs: result.discoveredRefs,
			bytes: result.bytes,
			text: result.text,
			json: result.json
		};
		items.push(item);
		if (result.status === "ok") {
			for (const reference of result.discoveredRefs) if (!seen.has(reference.canonical)) queue.push({
				seed: {
					raw: reference.raw,
					canonical: reference.canonical,
					kind: reference.kind,
					cid: reference.cid || null,
					path: reference.path || ""
				},
				parentId: id,
				depth: next.depth + 1
			});
		}
	}
	const summary = createSummary(items, seeds);
	const manifest = buildManifest({
		seeds,
		items: items.slice(0, 250),
		summary
	});
	const csv = "";
	const pinataCsv = "";
	const archiveFiles = [{
		path: "manifest.json",
		bytes: Buffer.from(JSON.stringify(manifest, null, 2))
	}, ...items.filter((item) => item.status === "ok" && item.bytes).map((item) => makeArchiveFile(item, item.id)).slice(0, 250)];
	const report = {
		seeds,
		sourceRefs: seeds.map((seed) => seed.canonical || seed.raw).filter(Boolean),
		items,
		summary,
		manifest,
		csv,
		pinataCsv,
		archiveFiles,
		progress: buildProgressState(items, seeds)
	};
	return {
		...report,
		...createReportPayload(report),
		progress: buildProgressState(items, seeds)
	};
}
//#endregion
export { createReportData as n, toClientReport as r, scanArchive as t };
