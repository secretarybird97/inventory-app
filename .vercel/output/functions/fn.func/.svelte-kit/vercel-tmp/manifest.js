export const manifest = {
	appDir: "_app",
	appPath: "_app",
	assets: new Set([".nojekyll","favicon.png","fonts/DancingScript.ttf","fonts/Quicksand.ttf"]),
	mimeTypes: {".png":"image/png",".ttf":"font/ttf"},
	_: {
		client: {"start":"_app/immutable/entry/start.beec3c68.js","app":"_app/immutable/entry/app.4ce647c1.js","imports":["_app/immutable/entry/start.beec3c68.js","_app/immutable/chunks/index.f2a1b1a1.js","_app/immutable/chunks/singletons.c972b52e.js","_app/immutable/chunks/index.ddefa790.js","_app/immutable/entry/app.4ce647c1.js","_app/immutable/chunks/index.f2a1b1a1.js"],"stylesheets":[],"fonts":[]},
		nodes: [
			() => import('../output/server/nodes/0.js'),
			() => import('../output/server/nodes/1.js'),
			() => import('../output/server/nodes/2.js'),
			() => import('../output/server/nodes/3.js'),
			() => import('../output/server/nodes/4.js')
		],
		routes: [
			{
				id: "/",
				pattern: /^\/$/,
				params: [],
				page: { layouts: [0], errors: [1], leaf: 2 },
				endpoint: null
			},
			{
				id: "/api/stripeCheckout",
				pattern: /^\/api\/stripeCheckout\/?$/,
				params: [],
				page: null,
				endpoint: () => import('../output/server/entries/endpoints/api/stripeCheckout/_server.ts.js')
			},
			{
				id: "/cancel",
				pattern: /^\/cancel\/?$/,
				params: [],
				page: { layouts: [0], errors: [1], leaf: 3 },
				endpoint: null
			},
			{
				id: "/success",
				pattern: /^\/success\/?$/,
				params: [],
				page: { layouts: [0], errors: [1], leaf: 4 },
				endpoint: null
			}
		],
		matchers: async () => {
			
			return {  };
		}
	}
};
