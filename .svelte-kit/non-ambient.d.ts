
// this file is generated — do not edit it


declare module "svelte/elements" {
	export interface HTMLAttributes<T> {
		'data-sveltekit-keepfocus'?: true | '' | 'off' | undefined | null;
		'data-sveltekit-noscroll'?: true | '' | 'off' | undefined | null;
		'data-sveltekit-preload-code'?:
			| true
			| ''
			| 'eager'
			| 'viewport'
			| 'hover'
			| 'tap'
			| 'off'
			| undefined
			| null;
		'data-sveltekit-preload-data'?: true | '' | 'hover' | 'tap' | 'off' | undefined | null;
		'data-sveltekit-reload'?: true | '' | 'off' | undefined | null;
		'data-sveltekit-replacestate'?: true | '' | 'off' | undefined | null;
	}
}

export {};


declare module "$app/types" {
	type MatcherParam<M> = M extends (param : string) => param is (infer U extends string) ? U : string;

	export interface AppTypes {
		RouteId(): "/" | "/api" | "/api/export" | "/api/export/car" | "/api/export/csv" | "/api/export/[jobId]" | "/api/export/[jobId]/[format]" | "/api/scan" | "/api/scan/[jobId]" | "/api/scan/[jobId]/status";
		RouteParams(): {
			"/api/export/[jobId]": { jobId: string };
			"/api/export/[jobId]/[format]": { jobId: string; format: string };
			"/api/scan/[jobId]": { jobId: string };
			"/api/scan/[jobId]/status": { jobId: string }
		};
		LayoutParams(): {
			"/": { jobId?: string; format?: string };
			"/api": { jobId?: string; format?: string };
			"/api/export": { jobId?: string; format?: string };
			"/api/export/car": Record<string, never>;
			"/api/export/csv": Record<string, never>;
			"/api/export/[jobId]": { jobId: string; format?: string };
			"/api/export/[jobId]/[format]": { jobId: string; format: string };
			"/api/scan": { jobId?: string };
			"/api/scan/[jobId]": { jobId: string };
			"/api/scan/[jobId]/status": { jobId: string }
		};
		Pathname(): "/" | "/api/export/car" | "/api/export/csv" | `/api/export/${string}/${string}` & {} | "/api/scan" | `/api/scan/${string}/status` & {};
		ResolvedPathname(): `${"" | `/${string}`}${ReturnType<AppTypes['Pathname']>}`;
		Asset(): string & {};
	}
}