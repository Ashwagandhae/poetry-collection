<div class="top">
	<div class="donut" />
	<h1>HashSet</h1>
	<p>
		<span>Julian Bauer</span>, Poetry Seminar 2023
	</p>
</div>

<style>
	.top {
		text-align: center;
	}
	h1 {
		font-size: 3rem;
	}
	.donut {
		width: 10rem;
		height: 10rem;
		border-radius: 50%;
		background: var(--text);
		margin: 0 auto;
		display: flex;
		align-items: center;
		justify-content: center;
		transition: transform 1s;
	}
	.donut:hover {
		transform: scale(1.1);
	}
	.donut::before {
		content: '';
		display: block;
		width: 4rem;
		height: 4rem;
		border-radius: 50%;
		background: var(--back);
		animation: pulse 3s infinite ease-in-out;
	}
	@keyframes pulse {
		0% {
			transform: scale(0.9);
		}
		50% {
			transform: scale(1.1);
		}
		100% {
			transform: scale(0.9);
		}
	}
</style>
