<script>
	export let item;
	export let search;
	export let selectedId = null;
	import { slide } from "svelte/transition";

	$: selected = selectedId === item.id;
	let el;

	$: if (selected && el) {
		el.scrollIntoView({ behavior: "smooth", block: "nearest" });
	}

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
	$: isVisible =
		(!search && item.type === "separator") ||
		(item.type !== "separator" &&
			(!search ||
				item.title.toLowerCase().includes(search.toLowerCase()) ||
				(item.url && item.url.toLowerCase().includes(search.toLowerCase()))));
</script>

{#if isVisible}
	<div transition:slide bind:this={el} class:selected>
		{#if item.type === "separator"}
			<hr />
		{:else}
			<a href={item.url}>
				<img class="favicon" src={faviconUrl} alt="" />
				<span class="title">{item.title}</span>
				<span class="link" style="margin-left: auto;"
					>{item.url.replace(/(^\w+:|^)\/\//, "").replace(/\/$/, "")}</span>
			</a>
		{/if}
	</div>
{/if}

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
	a:focus {
		background-color: var(--bg-color-hover);
		color: var(--text-color-hover);
	}

	.selected a {
		background-color: var(--bg-color-hover);
		color: var(--text-color-hover);
		outline: 1px solid var(--border-color-hover);
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
