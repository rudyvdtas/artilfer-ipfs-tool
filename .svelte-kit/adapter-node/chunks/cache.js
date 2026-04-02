import { CID } from "multiformats/cid";
import { Buffer } from "node:buffer";
//#region src/lib/server/ipfs/resolver.js
/**
* resolver.js — CID normalization + IPFS gateway fetching
*
* Consolidates: reference.js, discover.js, discovery.js, canonicalize.js, seeds.js
* Two core functions: resolve() and fetchCid()
*/
var GATEWAYS = [
	"https://w3s.link/ipfs",
	"https://ipfs.io/ipfs",
	"https://dweb.link/ipfs",
	"https://cloudflare-ipfs.com/ipfs",
	"https://gateway.pinata.cloud/ipfs"
];
var FETCH_TIMEOUT_MS = 15e3;
var MAX_TEXT_LENGTH = 256 * 1024;
function parseCid(value) {
	try {
		return CID.parse(String(value).trim()).toString();
	} catch {
		return null;
	}
}
function stripDecorations(value) {
	return String(value).trim().replace(/^[<"'`(\[]+/, "").replace(/[>"'`)]\.,;]+$/, "");
}
function repairTypos(value) {
	const text = String(value || "").trim();
	if (!text) return text;
	if (/^ttps?:\/\//i.test(text)) return `h${text}`;
	if (/^ipfs:\/[^/]/i.test(text)) return text.replace(/^ipfs:\//i, "ipfs://");
	return text;
}
/**
* Resolve any IPFS input to a normalized { cid, path, canonical } object.
* Accepts: ipfs://CID/path, https://gateway/ipfs/CID/path, bare CID, CID/path
* @param {string} raw
* @returns {{ cid: string, path: string, canonical: string } | null}
*/
function resolve(raw) {
	const cleaned = repairTypos(stripDecorations(String(raw || "")));
	if (!cleaned) return null;
	if (/^ipfs:\/\//i.test(cleaned)) {
		const [cidPart, ...pathParts] = cleaned.slice(7).split("/");
		const cid = parseCid(cidPart);
		if (!cid) return null;
		const path = pathParts.length ? `/${pathParts.join("/")}` : "";
		return {
			cid,
			path,
			canonical: `ipfs://${cid}${path}`
		};
	}
	if (cleaned.includes("/ipfs/")) {
		const [cidPart, ...pathParts] = cleaned.slice(cleaned.indexOf("/ipfs/") + 6).split("/");
		const cid = parseCid(cidPart);
		if (!cid) return null;
		const path = pathParts.length ? `/${pathParts.join("/")}` : "";
		return {
			cid,
			path,
			canonical: `ipfs://${cid}${path}`
		};
	}
	const [cidPart, ...pathParts] = cleaned.split("/");
	const cid = parseCid(cidPart);
	if (!cid) return null;
	const path = pathParts.length ? `/${pathParts.join("/")}` : "";
	return {
		cid,
		path,
		canonical: `ipfs://${cid}${path}`
	};
}
/**
* Fetch content from IPFS gateways with fallback + timeout.
* @param {string} cid
* @param {string} [path='']
* @returns {Promise<{ ok: boolean, bytes?: Buffer, text?: string, json?: any, contentType?: string, url?: string, error?: string }>}
*/
async function fetchCid(cid, path = "") {
	const suffix = `${cid}${path}`;
	let lastError = null;
	for (const gateway of GATEWAYS) {
		const url = `${gateway}/${suffix}`;
		try {
			const controller = new AbortController();
			const timer = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);
			const response = await fetch(url, {
				headers: { accept: "application/json,text/plain,*/*" },
				signal: controller.signal
			});
			clearTimeout(timer);
			if (!response.ok) throw new Error(`HTTP ${response.status}`);
			const bytes = Buffer.from(await response.arrayBuffer());
			const contentType = (response.headers.get("content-type") || "").split(";")[0].trim().toLowerCase();
			const text = bytes.length <= MAX_TEXT_LENGTH ? bytes.toString("utf8") : bytes.subarray(0, MAX_TEXT_LENGTH).toString("utf8");
			const isJsonLike = contentType.includes("json") || text.trim().startsWith("{") || text.trim().startsWith("[");
			let json = null;
			if (isJsonLike && bytes.length <= 1024 * 1024) try {
				json = JSON.parse(text);
			} catch {}
			return {
				ok: true,
				url,
				bytes,
				text,
				json,
				contentType
			};
		} catch (err) {
			lastError = err;
		}
	}
	return {
		ok: false,
		error: lastError?.message || "All gateways failed"
	};
}
/** Regex patterns to find IPFS references in text */
var REF_PATTERNS = [
	/ipfs:\/\/[^\s"'<>`]+/gi,
	/https?:\/\/[^\s"'<>`]+\/ipfs\/[^\s"'<>`]+/gi,
	/(?:bafy[a-z0-9]{20,}|Qm[1-9A-HJ-NP-Za-km-z]{44})(?:\/[^\s"'<>`]+)?/g
];
/** IPFS-related keys to check in JSON objects */
var REF_KEYS = new Set([
	"uri",
	"cid",
	"CID",
	"link",
	"href",
	"tokenURI",
	"tokenUri",
	"url",
	"reference",
	"image",
	"animation_url",
	"external_url",
	"image_url",
	"preview_media_file",
	"media"
]);
/**
* Discover IPFS references in any value (string, object, array).
* Returns de-duplicated array of resolved references.
* @param {any} input
* @param {{ maxRefs?: number, maxDepth?: number }} [opts]
* @returns {Array<{ cid: string, path: string, canonical: string }>}
*/
function discoverRefs(input, opts = {}) {
	const { maxRefs = 100, maxDepth = 8 } = opts;
	const found = /* @__PURE__ */ new Map();
	const visited = /* @__PURE__ */ new WeakSet();
	let nodeCount = 0;
	function addRef(raw) {
		if (found.size >= maxRefs) return;
		const ref = resolve(raw);
		if (ref && !found.has(ref.canonical)) found.set(ref.canonical, ref);
	}
	function extractFromText(text) {
		for (const pattern of REF_PATTERNS) {
			pattern.lastIndex = 0;
			for (const match of text.matchAll(pattern)) {
				addRef(match[0]);
				if (found.size >= maxRefs) return;
			}
		}
	}
	function walk(node, depth) {
		if (found.size >= maxRefs || nodeCount > 3e3 || depth > maxDepth) return;
		if (typeof node === "string") {
			extractFromText(node);
			return;
		}
		if (Array.isArray(node)) {
			nodeCount++;
			for (const child of node) walk(child, depth + 1);
			return;
		}
		if (node && typeof node === "object") {
			if (visited.has(node)) return;
			visited.add(node);
			nodeCount++;
			for (const [key, value] of Object.entries(node)) {
				if (typeof value === "string") {
					if (REF_KEYS.has(key)) addRef(value);
					if (/(ipfs|Qm|bafy)/i.test(value)) extractFromText(value);
				} else if (Array.isArray(value) || value && typeof value === "object") walk(value, depth + 1);
				if (found.size >= maxRefs || nodeCount > 3e3) return;
			}
		}
	}
	walk(input, 0);
	return [...found.values()];
}
/**
* Specialized discovery for async NFT metadata (tokenType=master).
* Scans layout.layers[].states.options[].uri and async-attributes.
* @param {object} json
* @returns {Array<{ cid: string, path: string, canonical: string }>}
*/
function discoverAsyncNftRefs(json) {
	if (!json || typeof json !== "object") return [];
	if (!(json.tokenType === "master" || json["async-attributes"] || json.async_attributes || Array.isArray(json?.layout?.layers))) return [];
	const found = /* @__PURE__ */ new Map();
	function addRef(raw) {
		if (!raw) return;
		const ref = resolve(raw);
		if (ref && !found.has(ref.canonical)) found.set(ref.canonical, ref);
	}
	const layers = json?.layout?.layers;
	if (Array.isArray(layers)) for (const layer of layers) {
		const options = layer?.states?.options;
		if (!Array.isArray(options)) continue;
		for (const option of options) {
			addRef(option?.uri);
			addRef(option?.cid);
			addRef(option?.link);
			addRef(option?.href);
		}
	}
	const targets = [
		json["async-attributes"],
		json.async_attributes,
		json.attributes,
		json.states,
		json.options
	].filter(Boolean);
	for (const target of targets) for (const ref of discoverRefs(target, {
		maxRefs: 500,
		maxDepth: 6
	})) if (!found.has(ref.canonical)) found.set(ref.canonical, ref);
	return [...found.values()];
}
/**
* Extract all IPFS references from a fetched result (text or JSON).
* Handles both standard and async NFT metadata.
* @param {{ json?: any, text?: string }} fetched
* @returns {Array<{ cid: string, path: string, canonical: string }>}
*/
function discoverAllRefs(fetched) {
	if (!fetched) return [];
	if (fetched.json) {
		const standard = discoverRefs(fetched.json, {
			maxRefs: 100,
			maxDepth: 8
		});
		const async_ = discoverAsyncNftRefs(fetched.json);
		const merged = /* @__PURE__ */ new Map();
		for (const ref of [...standard, ...async_]) if (!merged.has(ref.canonical)) merged.set(ref.canonical, ref);
		return [...merged.values()];
	}
	if (fetched.text) return discoverRefs(fetched.text.slice(0, 2e5), {
		maxRefs: 100,
		maxDepth: 1
	});
	return [];
}
/**
* Extract project metadata (title, artists, description) from JSON.
* @param {object} json
* @returns {{ title: string, artists: string, description: string, image: string | null }}
*/
function extractMetadata(json) {
	if (!json || typeof json !== "object") return {
		title: "",
		artists: "",
		description: "",
		image: null
	};
	const candidates = [json];
	for (const key of [
		"metadata",
		"properties",
		"collection",
		"project",
		"info"
	]) if (json[key] && typeof json[key] === "object") candidates.push(json[key]);
	let title = "";
	let artists = "";
	let description = "";
	let image = null;
	for (const obj of candidates) {
		if (!title) title = normalize(obj.name || obj.title || obj.project_name || obj.project || "");
		if (!artists) artists = normalize(obj.artist || obj.artists || obj.creator || obj.creators || obj.author || obj.authors || "");
		if (!description) description = normalize(obj.description || obj.about || obj.bio || obj.summary || "");
		if (!image) {
			const img = obj.image || obj.image_url || obj.preview_media_file || obj.media || null;
			if (typeof img === "string" && img.trim()) image = img;
		}
	}
	return {
		title,
		artists,
		description,
		image
	};
}
function normalize(value) {
	if (!value) return "";
	if (typeof value === "string") return value.trim();
	if (Array.isArray(value)) return value.map(normalize).filter(Boolean).join(", ");
	if (typeof value === "object") return value.name || value.title || value.label || "";
	return String(value);
}
function safeFilename(value) {
	return String(value || "archive").normalize("NFKD").replace(/[^\w.-]+/g, "-").replace(/-+/g, "-").replace(/^-+|-+$/g, "").toLowerCase() || "archive";
}
function guessKind(contentType, text, json) {
	if (json) return "json";
	const type = String(contentType || "").toLowerCase();
	if (type.includes("html")) return "html";
	if (type.startsWith("text/") || type.includes("json")) return "text";
	const trimmed = String(text || "").trim();
	if (trimmed.startsWith("{") || trimmed.startsWith("[")) return "json";
	if (trimmed.length) return "text";
	return "binary";
}
function guessExtension(contentType, kind, nameHint) {
	if (nameHint?.includes(".")) return "";
	const type = String(contentType || "").toLowerCase();
	if (kind === "json") return ".json";
	if (kind === "html") return ".html";
	if (kind === "text") return ".txt";
	if (type === "image/png") return ".png";
	if (type === "image/jpeg" || type === "image/jpg") return ".jpg";
	if (type === "image/gif") return ".gif";
	if (type === "image/webp") return ".webp";
	if (type === "image/svg+xml") return ".svg";
	return ".bin";
}
//#endregion
//#region src/lib/server/ipfs/scanner.js
/**
* scanner.js — Recursive IPFS CID scanner with Merkle tree building
*
* Consolidates: workflow.js, summarize.js
* BFS queue approach, builds parent→child tree, extracts metadata.
*/
var MAX_ITEMS = 2e3;
var MAX_ITERATIONS = 500;
var MAX_DISCOVERED_PER_ITEM = 25;
var MAX_DISCOVERED_ROOT = 1e3;
var MAX_ARCHIVE_BYTES = 256 * 1024;
/**
* @typedef {Object} TreeNode
* @property {number} id
* @property {number|null} parentId
* @property {number} depth
* @property {string} cid
* @property {string} path
* @property {string} canonical
* @property {string} kind - json | text | html | binary
* @property {string} contentType
* @property {string} name
* @property {number|null} size
* @property {string} status - ok | error
* @property {string} notes
* @property {number[]} children - child node ids
*/
/**
* @typedef {Object} ScanResult
* @property {string} rootCid
* @property {{ title: string, artists: string, description: string, image: string|null }} metadata
* @property {TreeNode[]} tree
* @property {{ path: string, cid: string, bytes: Uint8Array }[]} archiveFiles
* @property {{ totalFiles: number, totalSize: number, successCount: number, failCount: number }} summary
* @property {Record<string,string>} asyncLabelMap  CID → human-readable label for Async Art
*/
/**
* Build CID → label map from an Async Art master JSON.
* Returns {} for non-async NFTs.
* @param {any} json
* @param {string} projectName
* @returns {Record<string, string>}
*/
function buildAsyncLabelMap(json, projectName) {
	const map = {};
	if (!json || typeof json !== "object") return map;
	if (!(json.tokenType === "master" || json["async-attributes"] || json.async_attributes || Array.isArray(json?.layout?.layers))) return map;
	const imageCid = typeof json.image === "string" ? json.image.replace(/^ipfs:\/\//, "").split("/")[0] : null;
	if (imageCid) map[imageCid] = `${projectName} — Main image`;
	const layers = json?.layout?.layers;
	if (!Array.isArray(layers)) return map;
	layers.forEach((layer, li) => {
		const layerLabel = layer?.label || layer?.name || layer?.title || `Layer ${li + 1}`;
		const options = layer?.states?.options;
		if (!Array.isArray(options)) return;
		options.forEach((opt, vi) => {
			const raw = opt?.uri || opt?.cid || opt?.link || opt?.href;
			if (!raw) return;
			const cid = String(raw).replace(/^ipfs:\/\//, "").split("/")[0];
			if (!cid) return;
			map[cid] = `${projectName} — ${layerLabel} — ${opt?.label || opt?.name || opt?.title || `Variant ${vi + 1}`}`;
		});
	});
	return map;
}
/**
* Scan an IPFS CID recursively: fetch content, discover nested references,
* build a Merkle tree, extract metadata.
*
* @param {string} inputCid - Raw CID or IPFS URL from user
* @param {(progress: { current: number, total: number, status: string }) => void} [onProgress]
* @returns {Promise<ScanResult>}
*/
async function scan(inputCid, onProgress) {
	const root = resolve(inputCid);
	if (!root) throw new Error(`Invalid CID or IPFS link: ${inputCid}`);
	const rootCid = root.cid;
	/** @type {TreeNode[]} */
	const tree = [];
	/** @type {{ path: string, cid: string, bytes: Uint8Array }[]} */
	const archiveFiles = [];
	const seen = /* @__PURE__ */ new Set();
	let metadata = {
		title: "",
		artists: "",
		description: "",
		image: null
	};
	let metadataFound = false;
	/** @type {Record<string, string>} */
	let asyncLabelMap = {};
	const queue = [{
		ref: root,
		parentId: null,
		depth: 0
	}];
	let iterations = 0;
	while (queue.length > 0 && tree.length < MAX_ITEMS) {
		iterations++;
		if (iterations > MAX_ITERATIONS) break;
		const { ref, parentId, depth } = queue.shift();
		if (seen.has(ref.canonical)) continue;
		seen.add(ref.canonical);
		onProgress?.({
			current: tree.length,
			total: tree.length + queue.length,
			status: "scanning"
		});
		const fetched = await fetchCid(ref.cid, ref.path);
		const id = tree.length + 1;
		const nameHint = deriveNameHint(fetched, ref, id);
		const kind = fetched.ok ? guessKind(fetched.contentType, fetched.text, fetched.json) : "binary";
		const name = nameHint + guessExtension(fetched.contentType, kind, nameHint);
		/** @type {TreeNode} */
		const node = {
			id,
			parentId,
			depth,
			cid: ref.cid,
			path: ref.path,
			canonical: ref.canonical,
			kind,
			contentType: fetched.contentType || "",
			name,
			size: fetched.bytes?.length ?? null,
			status: fetched.ok ? "ok" : "error",
			notes: fetched.ok ? "" : fetched.error || "Fetch failed",
			children: []
		};
		tree.push(node);
		if (parentId !== null) {
			const parent = tree.find((n) => n.id === parentId);
			if (parent) parent.children.push(id);
		}
		if (!metadataFound && fetched.ok && fetched.json) {
			const m = extractMetadata(fetched.json);
			if (m.title || m.artists || m.description) {
				metadata = m;
				metadataFound = true;
			}
			const labelMap = buildAsyncLabelMap(fetched.json, metadata.title || rootCid.slice(0, 12));
			if (Object.keys(labelMap).length > 0) {
				asyncLabelMap = labelMap;
				asyncLabelMap[rootCid] = `${metadata.title || rootCid.slice(0, 12)} — Token URI metadata`;
			}
		}
		if (fetched.ok && fetched.bytes && fetched.bytes.length <= MAX_ARCHIVE_BYTES) archiveFiles.push({
			path: name,
			cid: ref.cid,
			bytes: fetched.bytes
		});
		if (fetched.ok) {
			const refs = discoverAllRefs(fetched);
			const cap = depth === 0 ? MAX_DISCOVERED_ROOT : MAX_DISCOVERED_PER_ITEM;
			const uniqueRefs = [];
			for (const discovered of refs.slice(0, cap)) if (!seen.has(discovered.canonical) && !uniqueRefs.some((r) => r.canonical === discovered.canonical)) uniqueRefs.push(discovered);
			if (uniqueRefs.length > 0) node.notes = `${uniqueRefs.length} nested reference(s)`;
			for (const discovered of uniqueRefs) queue.push({
				ref: discovered,
				parentId: id,
				depth: depth + 1
			});
		}
	}
	const successCount = tree.filter((n) => n.status === "ok").length;
	const failCount = tree.filter((n) => n.status !== "ok").length;
	const totalSize = tree.reduce((sum, n) => sum + (n.size || 0), 0);
	onProgress?.({
		current: tree.length,
		total: tree.length,
		status: "done"
	});
	return {
		rootCid,
		metadata,
		tree,
		archiveFiles,
		asyncLabelMap,
		summary: {
			totalFiles: tree.length,
			totalSize,
			successCount,
			failCount
		}
	};
}
function deriveNameHint(fetched, ref, index) {
	if (fetched?.url) try {
		const base = new URL(fetched.url).pathname.split("/").pop();
		if (base && base !== ref.cid) return base;
	} catch {}
	if (ref.path) {
		const parts = ref.path.split("/");
		const last = parts[parts.length - 1];
		if (last) return last;
	}
	return `item-${String(index).padStart(4, "0")}`;
}
/**
* Serialize scan result for disk storage (strip bytes).
* @param {ScanResult} result
* @returns {object}
*/
function serializeForStorage(result) {
	return {
		rootCid: result.rootCid,
		metadata: result.metadata,
		tree: result.tree,
		asyncLabelMap: result.asyncLabelMap || {},
		archiveFiles: result.archiveFiles.map((f) => ({
			path: f.path,
			cid: f.cid,
			size: f.bytes?.length || 0
		})),
		summary: result.summary
	};
}
//#endregion
//#region src/lib/server/ipfs/cache.js
/**
* Shared in-memory cache for scan results (includes raw bytes for CAR export).
* Stored separately from the job JSON on disk which strips bytes to save space.
*/
/** @type {Map<string, {result: import('./scanner.js').ScanResult, ts: number}>} */
var scanResultCache = /* @__PURE__ */ new Map();
var TTL_MS = 1440 * 60 * 1e3;
function cacheSet(jobId, result) {
	scanResultCache.set(jobId, {
		result,
		ts: Date.now()
	});
}
function cacheGet(jobId) {
	const entry = scanResultCache.get(jobId);
	if (!entry) return null;
	if (Date.now() - entry.ts > TTL_MS) {
		scanResultCache.delete(jobId);
		return null;
	}
	return entry.result;
}
//#endregion
export { resolve as a, serializeForStorage as i, cacheSet as n, safeFilename as o, scan as r, cacheGet as t };
