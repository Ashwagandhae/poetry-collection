<script lang="ts">
	import type { Poem as PoemType } from '$lib/types';
	import Poems from '$lib/Poems.svelte';
	import Contents from '$lib/Contents.svelte';
	import { showControls } from '$lib/stores';
	export let data: { poems: PoemType[] };

	let mouseMoveTimeout: number;
	function handleMouseMove() {
		$showControls = true;
		clearTimeout(mouseMoveTimeout);
		mouseMoveTimeout = setTimeout(() => {
			$showControls = false;
		}, 2000);
	}
</script>

<svelte:window
	on:mousemove={handleMouseMove}
	on:mousedown={handleMouseMove}
	on:touchstart={handleMouseMove}
	on:touchmove={handleMouseMove}
/>
<svelte:head>
	<title>Poems</title>
	<meta name="description" content="Poetry collection" />
</svelte:head>

<section class="poems">
	<Poems poems={data.poems} />
</section>
<footer />
<Contents poems={data.poems} />

<style>
	section {
		width: 100%;
	}

	footer {
		height: 30vh;
	}
</style>
