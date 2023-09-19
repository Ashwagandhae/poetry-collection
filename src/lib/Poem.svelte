<script lang="ts">
	import { scrolledId, selectedId, showControls, theme as globalTheme } from '$lib/stores';
	import Cover from './Cover.svelte';
	import { onMount } from 'svelte';
	import type { Theme } from './types';
	export let title: string;
	export let note: string | null = null;
	export let content: string;
	export let draft: string | null = null;
	export let form: string | null = null;
	export let align: 'left' | 'right' | 'center' = 'left';
	export let theme: Theme | null = null;
	export let image: string | null = null;
	export let big: boolean = false;

	export let isCover: boolean = false;

	export const slug: string = '';

	export let id: number;

	let hidden = false;

	selectedId.subscribe((value) => {
		hidden = value !== id;
		if (!hidden) {
			$globalTheme = theme;
		}
	});

	onMount(() => {
		scrolledId.subscribe((value) => {
			if (value === id) {
				console.log('scrolling to element', id);
				window.scrollTo({
					top: element.offsetTop
				});
			}
		});
	});
	let element: HTMLElement;

	let showDraft = false;
</script>

<svelte:window />
<div class="poem" class:hidden bind:this={element} class:isCover class:big>
	{#if isCover}
		<Cover />
	{:else}
		{#if image}
			<div class="image">
				<img src={`${image}`} alt="karma juggler" />
			</div>
		{/if}
		<div class="upper">
			<h2>
				{title}
				{#if form}
					<span class="form">({form})</span>
				{/if}
			</h2>
			{#if draft != undefined}
				<button
					class="draftToggle"
					on:click={() => (showDraft = !showDraft)}
					class:show={showDraft || $showControls}
				>
					{#if showDraft}
						Show final
					{:else}
						Show draft
					{/if}
				</button>
			{/if}
		</div>

		{#if note}
			<p>
				<i>
					{note}
				</i>
			</p>
		{/if}

		<p style={`text-align: ${align}`}>
			{#if showDraft}
				{@html draft}
			{:else}
				{@html content}
			{/if}
		</p>
	{/if}
</div>

<style>
	.poem {
		width: 100%;
		padding: 15rem 0;
		transition: opacity 1s;
	}

	p {
		white-space: pre-wrap;
	}
	.poem.hidden {
		opacity: 0;
	}
	.upper {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	.isCover .upper {
		justify-content: center;
	}
	.draftToggle {
		background: none;
		border: none;
		cursor: pointer;
		padding: none;
		opacity: 0;
		transition: opacity 0.5s;
	}
	.draftToggle.show {
		opacity: 1;
	}
	span.form {
		font-size: 0.8em;
	}
	img {
		width: 100%;
		height: 100%;
	}
</style>
