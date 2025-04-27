<script>
	export let item;
	export let search;
	import { slide } from "svelte/transition";

	let faviconUrl = getFaviconUrl(item.url);

	function getFaviconUrl(url) {
		const cachedFavicon = localStorage.getItem(url);
		if (cachedFavicon) {
			return cachedFavicon;
		}

		const urlObj = new URL(url);
		const favicon = `https://www.google.com/s2/favicons?domain=${urlObj.hostname}`;

		localStorage.setItem(url, favicon);
		return favicon;
	}
</script>

<div transition:slide>
	{#if !search && item.type == "separator"}
		<hr />
	{:else if search && item.type == "separator"}
	<!-- hide separators during search -->
	{:else if item.title
		.toLowerCase()
		.includes(search.toLowerCase()) || (item.url && item.url
				.toLowerCase()
				.includes(search.toLowerCase()))}
		<a href={item.url}>
			<img class="favicon" src={faviconUrl} alt="" />
			<span class="title">{item.title}</span>
			<span class="link" style="margin-left: auto;"
				>{item.url.replace(/(^\w+:|^)\/\//, "").replace(/\/$/, "")}</span>
		</a>
	{/if}
</div>

<style>
	a {
		display: flex;
		align-items: center;
		padding: var(--padding);
		text-decoration: none;
		color: var(--text-color);
		background-color: var(--bg-color);
		border-radius: var(--border-radius);
		transition:
			background-color 0.2s var(--animation-curve),
			color 0.2s var(--animation-curve);
	}

	a:hover,
	a:active,
	a:focus
	{
		background-color: var(--bg-color-hover);
		color: var(--text-color-hover);
	}

	.title {
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.link {
		color: var(--text-color-dim);
		text-align: right;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		font-size: calc(var(--font-size) * 0.9);
		align-self: center;
		width: 300px;
	}

	.favicon {
		width: var(--font-size);
		height: var(--font-size);
		margin-right: var(--padding);
	}

	span {
		display: inline-block;
	}

	hr {
		border: 0;
		border-top: 1px solid var(--border-color);
		margin: var(--padding) calc(var(--padding) * 1.5);
	}
</style>
