<script lang="ts">
	import type { Poem } from '$lib/types';
	import { scrolledId, selectedId, showControls } from '$lib/stores';
	export let poems: Poem[];
	let shown: boolean;

	function transition(_: HTMLElement) {
		return {
			duration: 400,
			css: (t: number) => {
				return `
          opacity: ${t};
        `;
			}
		};
	}
</script>

<button
	class="toggle"
	on:click={() => (shown = !shown)}
	class:show={shown || $showControls}
	class:showContents={shown}>Contents</button
>
{#if shown}
	<div class="top" transition:transition>
		<div class="contents">
			{#each poems as poem, index}
				<button
					class="poemLink"
					on:click={() => {
						scrolledId.set(-1);
						scrolledId.set(index);
						selectedId.set(index);
					}}
					class:selected={index === $selectedId}
					class:meta={poem.meta}
				>
					<p>
						{poem.title}
					</p>
				</button>
			{/each}
		</div>
	</div>
{/if}

<style>
	.toggle {
		position: fixed;
		top: 0;
		left: 0;
		padding: 1rem;
		box-sizing: border-box;
		z-index: 1001;

		border: none;
		cursor: pointer;
		margin: 0;
		text-align: left;
		background: none;

		width: 15rem;
		opacity: 0;
		background: none;
		transition: opacity 0.5s, color 0.5s, background 0.5s;
	}
	.toggle.show {
		opacity: 1;
	}
	.toggle.showContents {
		background: var(--back);
	}

	.top {
		display: flex;
		flex-direction: column;
		width: 15rem;
		height: 100vh;
		background: var(--back);
		position: fixed;
		z-index: 1000;
		top: 0;
		left: 0;
		overflow-y: scroll;
		padding-top: 3.5rem;
		transition: background 0.5s;
	}
	@media (max-width: 600px) {
		.toggle {
			width: 100vw;
		}
		.top {
			width: 100vw;
		}
	}
	.contents {
		padding: 0rem 1rem 10rem 1rem;
		display: flex;
		flex-direction: column;
	}
	.poemLink {
		background: none;
		border: none;
		cursor: pointer;
		padding: 0;
		margin: 0;
		text-align: left;
		width: 100%;
	}
	.poemLink.selected {
		text-decoration: underline;
	}
	.poemLink.meta {
		font-style: italic;
	}
</style>
