<script lang="ts">
	import type { Poem as PoemType } from '$lib/types';
	import { selectedId } from '$lib/stores';
	import Poem from '$lib/Poem.svelte';
	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';
	export let poems: PoemType[];

	let element: HTMLElement;

	let lastScrollTop = 0;

	let showScrollHint = true;

	function selectPoem(poemElement: HTMLElement) {
		let poemRect = poemElement.getBoundingClientRect();
		let windowHeight = window.innerHeight;
		if (poemRect.top < windowHeight / 2 && poemRect.bottom > windowHeight / 2) {
			return true;
		}
		return false;
	}
	function handleScroll() {
		// get scroll direction
		let scrollTop = document.documentElement.scrollTop;
		showScrollHint = scrollTop < 10;
		let scrollDirection = scrollTop > lastScrollTop ? 'down' : 'up';
		lastScrollTop = scrollTop;

		for (let i = 0; i < poems.length; i++) {
			let realIndex = scrollDirection === 'down' ? i : poems.length - i - 1;
			realIndex = realIndex % poems.length;
			let poemElement = element.children[realIndex] as HTMLElement;
			if (selectPoem(poemElement)) {
				selectedId.set(realIndex);
				return;
			}
		}
	}
	onMount(() => {
		handleScroll();
	});
</script>

<svelte:window on:scroll={handleScroll} />
<div class="top" bind:this={element}>
	{#each poems as poem, index}
		<Poem {...poem} id={index} />
	{/each}
	{#if showScrollHint}
		<div class="scrollHint" transition:fade={{ duration: 500 }}><p>Scroll down slowly</p></div>
	{/if}
</div>

<style>
	.top {
		display: flex;
		flex-direction: column;
		width: 100%;
	}
	.scrollHint {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 100vw;
		position: fixed;
		bottom: 0;
		left: 0;
		pointer-events: none;
	}
</style>
