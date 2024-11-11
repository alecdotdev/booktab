<script>
	export let folder;
	export let search = "";
	import Bookmark from "../src/Bookmark.svelte";
	import { slide } from "svelte/transition";
	let open = true;

	// Automatically open the folder if any children match the search term
	$: open = folder.title.toLowerCase().includes(search.toLowerCase()) || folder.children.some((child) => {
		// Check if the bookmark or folder title or URL matches
		return child.title.toLowerCase().includes(search.toLowerCase()) || (child.url && child.url.toLowerCase().includes(search.toLowerCase()));
	});
</script>

{#if folder.children && folder.children.length > 0}
	<div transition:slide class="folder">
		<h3 on:click={() => (open = !open)}>
			{folder.title}
			<svg class={open ? "caret open" : "caret"} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
				<path fill="transparent" stroke="currentColor" stroke-width="1" d="M8 5l8 7-8 7" />
			</svg>
		</h3>

		<div class={open ? "open" : "closed"}>
			{#each folder.children as item (item.id)}
				{#if item.url && !item.url.startsWith("data:")}
					<Bookmark {item} {search} />
				{:else}
					<Folder {folder} {search} />
				{/if}
			{/each}
		</div>
	</div>
{/if}

<style>
	.folder {
		border: 1px solid var(--border-color);
		border-radius: var(--border-radius);
		user-select: none;
		padding: 10px;
		margin-bottom: 10px;
		transition: border 0.2s var(--animation-curve);
	}

	h3 {
		display: flex;
		align-items: center;
		justify-content: space-between;
		cursor: pointer;
		padding: 5px 7px;
		margin: 3px 3px;
	}

	.folder:hover {
		border: 1px solid #ffffff66;
	}

	.open {
		display: block;
	}

	.closed {
		display: none;
	}

	.caret {
		width: 16px;
		height: 16px;
		fill: var(--text-color);
		transition: transform 0.2s var(--animation-curve);
	}

	.caret.open {
		transform: rotate(90deg);
	}
</style>
