<script lang="ts">
	export let title: string;
	export let slug: string;
</script>

<a href={`/poems/${slug}`}>
	<h2>
		{title}
	</h2>
</a>

<style>
	a {
		text-decoration: none;
		color: inherit;
	}
	a:hover {
		text-decoration: underline;
	}
</style>
