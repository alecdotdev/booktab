<script>
	import { onMount } from "svelte";
	import Folder from "../src/Folder.svelte";
	import Bookmark from "../src/Bookmark.svelte";
	import Menu from "../src/Menu.svelte";
	import "./global.css";

	let filterbar;
	let items = [];
	let search = "";
	let selectedIndex = 0;

	let shortcutHint = " (Ctrl+F)";
	onMount(() => {
		if (navigator.platform.toUpperCase().indexOf("MAC") >= 0) {
			shortcutHint = " (⌘F)";
		}
		chrome.bookmarks.getTree((tree) => {
			// top-level children (Bookmarks Menu, Bookmarks Toolbar, etc.)
			items = tree[0].children.flatMap((root) => root.children || []);
		});

		setTimeout(() => filterbar?.focus(), 50);
	});

	$: visibleResults = getVisibleBookmarks(items, search);
	$: selectedId = visibleResults[selectedIndex]?.id || null;

	// reset selection when search changes
	$: if (search) {
		selectedIndex = 0;
	}

	function getVisibleBookmarks(nodes, q) {
		let results = [];
		const s = q.toLowerCase();
		for (const node of nodes) {
			if (node.children) {
				results = results.concat(getVisibleBookmarks(node.children, q));
			} else if (node.url && node.type !== "separator") {
				if (
					!s ||
					node.title.toLowerCase().includes(s) ||
					node.url.toLowerCase().includes(s)
				) {
					results.push(node);
				}
			}
		}
		return results;
	}
</script>

<svelte:window
	on:keydown={(e) => {
		if ((e.ctrlKey || e.metaKey) && e.key === "f") {
			e.preventDefault();
			filterbar.focus();
		}
		if (e.key === "Escape") {
			filterbar.blur();
		}
		if (e.key === "ArrowDown") {
			e.preventDefault();
			selectedIndex = Math.min(selectedIndex + 1, visibleResults.length - 1);
		}
		if (e.key === "ArrowUp") {
			e.preventDefault();
			selectedIndex = Math.max(0, selectedIndex - 1);
		}
		if (e.key === "Enter") {
			const selectedItem = visibleResults[selectedIndex];
			if (selectedItem?.url) {
				window.open(selectedItem.url, "_self");
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
			placeholder="Filter bookmarks...{shortcutHint}" />
	</div>
	<div class="container">
		{#each items as item (item.id)}
			{#if item.children}
				<Folder folder={item} {search} {selectedId} />
			{:else if item.url}
				<Bookmark {item} {search} {selectedId} />
			{/if}
		{/each}

		{#if visibleResults.length === 0}
			<div class="no-results">No matches found for "{search}"</div>
		{/if}
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
		display: flex;
		flex-direction: column;
		gap: 2px;
		padding: calc(var(--padding) * 2);
		background-color: var(--bg-color);
		border-radius: var(--border-radius);
		color: var(--text-color);
		width: 800px;
		margin: calc(var(--padding) * 14) auto;
		transform: translate3d(0, 0, 0);
	}

	.page {
		z-index: 999;
	}

	.no-results {
		text-align: center;
		padding: calc(var(--padding) * 4);
		color: var(--text-color-dim);
		font-variant: small-caps;
		letter-spacing: 1px;
	}
</style>
