

export const index = 0;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_layout.svelte.js')).default;
export const imports = ["_app/immutable/nodes/0.AinEm663.js","_app/immutable/chunks/DsnmJJEf.js","_app/immutable/chunks/DABXHGZq.js"];
export const stylesheets = ["_app/immutable/assets/0.n3kWNT52.css"];
export const fonts = [];
