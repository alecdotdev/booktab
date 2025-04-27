<script>
	import { onMount } from "svelte";
	import Folder from "../src/Folder.svelte";
	import Bookmark from "../src/Bookmark.svelte";
	import { slide } from "svelte/transition";
	import Menu from "../src/Menu.svelte";
	import "./global.css";

	let filterbar;
	let bookmarks = [];
	let search = "";

	onMount(() => {
		chrome.bookmarks.getTree((tree) => {
			bookmarks = flattenBookmarks(tree[0].children);
		});

		setTimeout(() => filterbar?.focus(), 50);
	});

	function flattenBookmarks(folders) {
		let result = [];
		folders.forEach((folder) => {
			if (folder.children) {
				result = result.concat(flattenBookmarks(folder.children));
			} else {
				result.push(folder);
			}
		});
		return result;
	}

	let filteredBookmarks = [];
	$: filteredBookmarks = bookmarks.filter((item) => {
		return (
			item.title.toLowerCase().includes(search.toLowerCase()) ||
			item.url.toLowerCase().includes(search.toLowerCase())
		);
	});
</script>

<svelte:window
	on:keydown={(e) => {
		if (e.ctrlKey && e.key === "f") {
			e.preventDefault();
			filterbar.focus();
		}
		if (e.key === "Escape") {
			filterbar.blur();
		}
		if (e.key === "Enter") {
			const firstResult = filteredBookmarks.find((item) => item.url);
			if (firstResult) {
				window.open(firstResult.url, "_self");
			}
		}
	}} />

<Menu />

<div class="page">
	<div class="input-container">
		<input
			bind:this={filterbar}
			type="text"
			bind:value={search}
			placeholder="Filter bookmarks..." />
	</div>
	<div class="container">
		{#each filteredBookmarks as item (item.id)}
			{#if item.url}
				<Bookmark {item} {search} />
			{:else}
				<Folder folder={item} {search} />
			{/if}
		{/each}
	</div>
</div>

<style>
	input {
		width: 100%;
		padding: calc(var(--padding) * 2);
		font-size: var(--font-size);
		border-radius: var(--border-radius);
		background-color: var(--search-bg-color);
		backdrop-filter: blur(16px);
		transform: translate3d(0, 0, 0);
		border: 1px solid var(--border-color);
		color: var(--text-color);
		transition: border 0.2s var(--animation-curve);
	}

	input:active,
	input:hover,
	input:focus {
		border: 1px solid var(--border-color-hover);
	}

	input::placeholder {
		color: var(--text-color-dim);
	}

	.input-container {
		position: fixed;
		top: 0;
		left: 50%;
		transform: translateX(-50%);
		z-index: 1000;
		width: 800px;
		margin-top: calc(var(--padding) * 8);
	}

	.container {
		padding: calc(var(--padding) * 2);
		background-color: var(--bg-color);
		border-radius: var(--border-radius);
		color: var(--text-color);
		width: 800px;
		margin: calc(var(--padding) * 14) auto;
		filter: grayscale(1);
		transform: translate3d(0, 0, 0);
		opacity: 0.25;
		transition:
			filter 0.5s var(--animation-curve),
			opacity 0.5s var(--animation-curve);
	}

	.page {
		z-index: 999;
	}

	.page:hover .container,
	.page:focus-within .container,
	.container:focus-within {
		filter: grayscale(0);
		opacity: 1;
	}
</style>
