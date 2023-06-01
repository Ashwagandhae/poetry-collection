// since there's no dynamic data here, we can prerender
// it so that it gets served as a static asset in production
export const prerender = true;

import type { Load } from '@sveltejs/kit';

export const load: Load = async ({ fetch }) => {
	const response = await fetch(`/api/poems`);
	const poems = await response.json();
	return {
		poems
	};
};
