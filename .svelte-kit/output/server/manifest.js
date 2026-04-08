export const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "_app",
	assets: new Set(["about/allyson.png","about/annabelle.png","about/clarrise.png","about/collegewise.jpg","about/collegewise_logo.png","about/ellie.png","about/erikaslighthouse.jpeg","about/erikaslighthouse_logo.png","about/killian.png","about/kiwanis.jpg","about/lex.png","about/maeve.jpg","about/mrcain.png","about/mrssteckler.png","about/mrsteckler.png","about/mrsvaught.jpeg","about/nikolay.png","about/ravindu.png","about/schoolhouse.png","about/schoolhouse_logo.png","about/thirstproject.png","about/thirstproject_logo.png","about/unicef.jpg","about/unicef_logo.png","bee.webp","committees/eldana.png","committees/kaitlyn.png","committees/natalie.png","committees/natalieM.png","committees/will.png","contactus/contact.jpg","districtproject/cover.jpg","districtproject/logo.png","events.jpeg","favicon.ico","faz.webp","fonts/abril-display-regular.otf","fonts/centurygothic.ttf","fonts/centurygothic_bold.ttf","gallery.jpg","home/committees_cover.jpg","home/cover.webp","home/deco_cover.jpg","home/leadership_cover.webp","home/remind.jpg","home/service_cover.jpg","home/spirit_cover.webp","home/whoRwe.jpg","hours.png","keyclub_horizontal_black.png","membership/members1.png","membership/members2.png","membership/members3.png","membership/membership_cover.jpg","robots.txt"]),
	mimeTypes: {".png":"image/png",".jpg":"image/jpeg",".jpeg":"image/jpeg",".webp":"image/webp",".otf":"font/otf",".ttf":"font/ttf",".txt":"text/plain"},
	_: {
		client: {start:"_app/immutable/entry/start.DSsRkpcm.js",app:"_app/immutable/entry/app.DNfAvdjl.js",imports:["_app/immutable/entry/start.DSsRkpcm.js","_app/immutable/chunks/VIzukNOb.js","_app/immutable/chunks/JeErQSZI.js","_app/immutable/chunks/s_XUVn6W.js","_app/immutable/entry/app.DNfAvdjl.js","_app/immutable/chunks/JeErQSZI.js","_app/immutable/chunks/DA7N40UD.js","_app/immutable/chunks/BKKfgthM.js","_app/immutable/chunks/B5-Yd39l.js","_app/immutable/chunks/s_XUVn6W.js","_app/immutable/chunks/DWtpnJmz.js","_app/immutable/chunks/R8Dh2q03.js"],stylesheets:[],fonts:[],uses_env_dynamic_public:false},
		nodes: [
			__memo(() => import('./nodes/0.js')),
			__memo(() => import('./nodes/1.js')),
			__memo(() => import('./nodes/2.js')),
			__memo(() => import('./nodes/3.js')),
			__memo(() => import('./nodes/4.js')),
			__memo(() => import('./nodes/5.js')),
			__memo(() => import('./nodes/6.js'))
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
				id: "/districtproject",
				pattern: /^\/districtproject\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 4 },
				endpoint: null
			},
			{
				id: "/events",
				pattern: /^\/events\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 5 },
				endpoint: null
			},
			{
				id: "/membership",
				pattern: /^\/membership\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 6 },
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
