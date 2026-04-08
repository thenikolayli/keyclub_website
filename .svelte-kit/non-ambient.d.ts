
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
	export interface AppTypes {
		RouteId(): "/" | "/about" | "/districtproject" | "/events" | "/membership";
		RouteParams(): {
			
		};
		LayoutParams(): {
			"/": Record<string, never>;
			"/about": Record<string, never>;
			"/districtproject": Record<string, never>;
			"/events": Record<string, never>;
			"/membership": Record<string, never>
		};
		Pathname(): "/" | "/about" | "/about/" | "/districtproject" | "/districtproject/" | "/events" | "/events/" | "/membership" | "/membership/";
		ResolvedPathname(): `${"" | `/${string}`}${ReturnType<AppTypes['Pathname']>}`;
		Asset(): "/about/allyson.png" | "/about/annabelle.png" | "/about/clarrise.png" | "/about/collegewise.jpg" | "/about/collegewise_logo.png" | "/about/ellie.png" | "/about/erikaslighthouse.jpeg" | "/about/erikaslighthouse_logo.png" | "/about/killian.png" | "/about/kiwanis.jpg" | "/about/lex.png" | "/about/maeve.jpg" | "/about/mrcain.png" | "/about/mrssteckler.png" | "/about/mrsteckler.png" | "/about/mrsvaught.jpeg" | "/about/nikolay.png" | "/about/ravindu.png" | "/about/schoolhouse.png" | "/about/schoolhouse_logo.png" | "/about/thirstproject.png" | "/about/thirstproject_logo.png" | "/about/unicef.jpg" | "/about/unicef_logo.png" | "/bee.webp" | "/committees/eldana.png" | "/committees/kaitlyn.png" | "/committees/natalie.png" | "/committees/natalieM.png" | "/committees/will.png" | "/contactus/contact.jpg" | "/districtproject/cover.jpg" | "/districtproject/logo.png" | "/events.jpeg" | "/favicon.ico" | "/faz.webp" | "/fonts/abril-display-regular.otf" | "/fonts/centurygothic.ttf" | "/fonts/centurygothic_bold.ttf" | "/gallery.jpg" | "/home/committees_cover.jpg" | "/home/cover.webp" | "/home/deco_cover.jpg" | "/home/leadership_cover.webp" | "/home/remind.jpg" | "/home/service_cover.jpg" | "/home/spirit_cover.webp" | "/home/whoRwe.jpg" | "/hours.png" | "/keyclub_horizontal_black.png" | "/membership/members1.png" | "/membership/members2.png" | "/membership/members3.png" | "/membership/membership_cover.jpg" | "/robots.txt" | string & {};
	}
}