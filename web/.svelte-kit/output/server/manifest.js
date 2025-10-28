export const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "_app",
	assets: new Set(["about/allyson.png","about/annabelle.png","about/charlie2.png","about/clarrise.png","about/collegewise.jpg","about/collegewise_logo.png","about/ellie.png","about/erikaslighthouse.jpeg","about/erikaslighthouse_logo.png","about/killian.png","about/kiwanis.jpg","about/lex.png","about/maeve.jpg","about/mrcain.png","about/mrssteckler.png","about/mrsteckler.png","about/mrsvaught.jpeg","about/nikolay.png","about/ravindu.png","about/schoolhouse.png","about/schoolhouse_logo.png","about/thirstproject.png","about/thirstproject_logo.png","about/unicef.jpg","about/unicef_logo.png","contactus/contact.jpg","districtproject/cover.jpg","districtproject/logo.png","fonts/abril-display-regular.otf","fonts/centurygothic.ttf","fonts/centurygothic_bold.ttf","home/committees_cover.jpg","home/cover.webp","home/deco_cover.jpg","home/leadership_cover.webp","home/remind.jpg","home/service_cover.jpg","home/spirit_cover.webp","home/whoRwe.jpg","keyclub_horizontal_black.png","membership/members1.png","membership/members2.png","membership/members3.png","membership/membership_cover.jpg","robots.txt"]),
	mimeTypes: {".png":"image/png",".jpg":"image/jpeg",".jpeg":"image/jpeg",".otf":"font/otf",".ttf":"font/ttf",".webp":"image/webp",".txt":"text/plain"},
	_: {
		client: {start:"_app/immutable/entry/start.D7CaWYE0.js",app:"_app/immutable/entry/app.CBcio75f.js",imports:["_app/immutable/entry/start.D7CaWYE0.js","_app/immutable/chunks/CVgfZBXu.js","_app/immutable/chunks/Dsa8zvjK.js","_app/immutable/chunks/DABXHGZq.js","_app/immutable/entry/app.CBcio75f.js","_app/immutable/chunks/DABXHGZq.js","_app/immutable/chunks/Dsa8zvjK.js","_app/immutable/chunks/DsnmJJEf.js","_app/immutable/chunks/CYlUxvXb.js"],stylesheets:[],fonts:[],uses_env_dynamic_public:false},
		nodes: [
			__memo(() => import('./nodes/0.js')),
			__memo(() => import('./nodes/1.js')),
			__memo(() => import('./nodes/2.js')),
			__memo(() => import('./nodes/3.js')),
			__memo(() => import('./nodes/4.js')),
			__memo(() => import('./nodes/5.js')),
			__memo(() => import('./nodes/6.js')),
			__memo(() => import('./nodes/7.js')),
			__memo(() => import('./nodes/8.js'))
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
				id: "/about",
				pattern: /^\/about\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 3 },
				endpoint: null
			},
			{
				id: "/contact",
				pattern: /^\/contact\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 4 },
				endpoint: null
			},
			{
				id: "/districtproject",
				pattern: /^\/districtproject\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 5 },
				endpoint: null
			},
			{
				id: "/events",
				pattern: /^\/events\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 6 },
				endpoint: null
			},
			{
				id: "/gallery",
				pattern: /^\/gallery\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 7 },
				endpoint: null
			},
			{
				id: "/membership",
				pattern: /^\/membership\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 8 },
				endpoint: null
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
