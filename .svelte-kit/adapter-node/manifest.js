export const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "_app",
	assets: new Set([]),
	mimeTypes: {},
	_: {
		client: {start:"_app/immutable/entry/start.BFXeasWk.js",app:"_app/immutable/entry/app.unwQ5Jf9.js",imports:["_app/immutable/entry/start.BFXeasWk.js","_app/immutable/chunks/Cao936ag.js","_app/immutable/chunks/BvPEpxmM.js","_app/immutable/entry/app.unwQ5Jf9.js","_app/immutable/chunks/BvPEpxmM.js","_app/immutable/chunks/Dj6f-nJM.js","_app/immutable/chunks/DEDqjojZ.js"],stylesheets:[],fonts:[],uses_env_dynamic_public:false},
		nodes: [
			__memo(() => import('./nodes/0.js')),
			__memo(() => import('./nodes/1.js')),
			__memo(() => import('./nodes/2.js'))
		],
		remotes: {
			
		},
		routes: [
			{
				id: "/",
				pattern: /^\/$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 2 },
				endpoint: null
			},
			{
				id: "/api/export/car",
				pattern: /^\/api\/export\/car\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('./entries/endpoints/api/export/car/_server.js'))
			},
			{
				id: "/api/export/csv",
				pattern: /^\/api\/export\/csv\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('./entries/endpoints/api/export/csv/_server.js'))
			},
			{
				id: "/api/export/[jobId]/[format]",
				pattern: /^\/api\/export\/([^/]+?)\/([^/]+?)\/?$/,
				params: [{"name":"jobId","optional":false,"rest":false,"chained":false},{"name":"format","optional":false,"rest":false,"chained":false}],
				page: null,
				endpoint: __memo(() => import('./entries/endpoints/api/export/_jobId_/_format_/_server.js'))
			},
			{
				id: "/api/scan",
				pattern: /^\/api\/scan\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('./entries/endpoints/api/scan/_server.js'))
			},
			{
				id: "/api/scan/[jobId]/status",
				pattern: /^\/api\/scan\/([^/]+?)\/status\/?$/,
				params: [{"name":"jobId","optional":false,"rest":false,"chained":false}],
				page: null,
				endpoint: __memo(() => import('./entries/endpoints/api/scan/_jobId_/status/_server.js'))
			}
		],
		prerendered_routes: new Set([]),
		matchers: async () => {
			
			return {  };
		},
		server_assets: {}
	}
}
})();

export const prerendered = new Set([]);

export const base = "";