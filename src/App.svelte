<script>
	import { onMount } from "svelte";
	import "./global.css";
	import Folder from "../src/Folder.svelte";
	import Bookmark from "../src/Bookmark.svelte";
	let bookmarks = [];
	let folder = {};
	let search = "";

	onMount(() => {
		chrome.bookmarks.getTree((tree) => {
			bookmarks = flattenBookmarks(tree[0].children);
		});
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
			(item.url && item.url.toLowerCase().includes(search.toLowerCase()))
		);
	});
</script>

<div class="container">
	<input type="text" bind:value={search} placeholder="Search bookmarks..." />

	{#each filteredBookmarks as item (item.id)}
		{#if item.url}
			<Bookmark {item} {search} />
		{:else}
			<Folder {folder} {search} />
		{/if}
	{/each}
</div>

<style>
	input {
		display: flex;
		width: 100%;
		padding: 16px;
		margin-bottom: 20px;
		font-size: 16px;
		border-radius: var(--border-radius);
		background-color: var(--bg-color);
		border: 1px solid var(--border-color);
		color: var(--text-color);
	}

	.container {
		padding: 20px;
		background-color: var(--bg-color);
		border-radius: var(--border-radius);
		color: var(--text-color);
		width: 800px;
		margin: 0 auto;
	}
</style>
