import type { Poem } from '$lib/types';
import { json } from '@sveltejs/kit';

export const GET = async () => {
	// first get svgs
	const poemFiles = Object.entries(import.meta.glob('/src/routes/poems/*.txt', { as: 'raw' }));
	const poems = await Promise.all(
		poemFiles.map(async ([path, resolver]) => {
			let rawData = (await resolver()) as any;

			let [rawMeta, content, draft] = rawData.split('\n##\n');

			let poem: Exclude<Poem, 'slug' | 'content' | 'draft'> = JSON.parse(rawMeta);
			let slug = (path.split('/').pop() ?? '').replace('.json', '');
			return { ...poem, slug, content, draft };
		})
	);

	return json(poems);
};
