<script>
	export let item;
	export let search;
	import { slide } from "svelte/transition";

	function getFaviconUrl(url) {
		const urlObj = new URL(url);
		return `https://www.google.com/s2/favicons?domain=${urlObj.hostname}`;
	}
</script>

{#if item.url == "data:"}
	<hr/>
{:else if item.title.toLowerCase().includes(search.toLowerCase())}
	<a href={item.url} transition:slide>
		<img class="favicon" src={getFaviconUrl(item.url)} />
		<span>{item.title}</span>
		<span class="link" style="margin-left: auto;">{item.url.replace(/(^\w+:|^)\/\//, "").replace(/\/$/, "")}</span>
	</a>
{/if}

<style>
	a {
		display: flex;
		align-items: center;
		padding: 10px;
		text-decoration: none;
		color: var(--bookmark-color);
		background-color: var(--bg-color);
		border-radius: var(--border-radius);
		transition: background-color 0.2s var(--animation-curve);
	}

	a:hover {
		background-color: var(--bg-color-hover);
	}

	.link {
		color: var(--text-color-dim);
		text-align: right;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		font-size: 14px;
		align-self: center;
		width: 300px;
	}

	.favicon {
		width: 16px;
		height: 16px;
		margin-right: 10px; 
	}

	span {
		display: inline-block;
	}

	hr {
		border: 0;
		border-top: 1px solid var(--border-color);
		margin: 10px 5px;
	}
</style>