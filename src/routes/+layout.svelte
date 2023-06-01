<script>
	import './styles.css';
	import { theme } from '$lib/stores';

	let themeStyle = '';
	theme.subscribe((newTheme) => {
		if (newTheme == undefined) {
			themeStyle = '';
		} else {
			themeStyle = `
				--back: ${newTheme.back}; 
				--text: ${newTheme.text}; 
			`;
		}
	});
</script>

<div class="app" style={themeStyle}>
	<div class="back" />
	<main>
		<slot />
	</main>
</div>

<style>
	.app {
		display: flex;
		flex-direction: column;
		min-height: 100vh;
	}
	.back {
		width: 100vw;
		height: 100vh;
		position: fixed;
		top: 0;
		left: 0;
		background: var(--back);
		transition: background 0.5s;
		z-index: -1;
	}

	main {
		flex: 1;
		display: flex;
		flex-direction: column;
		padding: 1rem;
		width: 100%;
		max-width: 40rem;
		margin: 0 auto;
		box-sizing: border-box;
	}
</style>
