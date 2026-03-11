<script>
	export let folder;
	export let search = "";
	export let selectedId = null;
	import Bookmark from "../src/Bookmark.svelte";
	import Folder from "../src/Folder.svelte";
	import { slide } from "svelte/transition";

	let open = false;

	// count matching bookmarks only
	$: itemCount = countMatches(folder.children, search);

	function countMatches(children, q) {
		let count = 0;
		const s = q.toLowerCase();
		for (const child of children) {
			if (child.children) {
				count += countMatches(child.children, q);
			} else if (child.url && child.type !== "separator") {
				if (
					!s ||
					child.title.toLowerCase().includes(s) ||
					child.url.toLowerCase().includes(s)
				) {
					count++;
				}
			}
		}
		return count;
	}

	// visibility: show if no search, or if the folder contains matching items
	$: isVisible =
		!search ||
		itemCount > 0 ||
		folder.title.toLowerCase().includes(search.toLowerCase());

	// auto-expand when search matches something inside
	$: if (search && isVisible) {
		open = true;
	}

	function toggle() {
		open = !open;
	}
</script>

{#if isVisible && folder.children && folder.children.length > 0}
	<div transition:slide class="folder" class:open>
		<!-- svelte-ignore a11y-click-events-have-key-events -->
		<button class="header" on:click={toggle}>
			<span class="folder-title">{folder.title}</span>
			<span class="meta">
				<span class="count">{itemCount}</span>
				<svg
					class="caret"
					class:open
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 24 24">
					<path
						fill="none"
						stroke="currentColor"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
						d="M9 6l6 6-6 6" />
				</svg>
			</span>
		</button>

		{#if open}
			<div class="children" transition:slide={{ duration: 200 }}>
				{#each folder.children as item (item.id)}
					{#if item.children}
						<svelte:self folder={item} {search} {selectedId} />
					{:else if item.url && !item.url.startsWith("data:")}
						<Bookmark {item} {search} {selectedId} />
					{/if}
				{/each}
			</div>
		{/if}
	</div>
{/if}

<style>
	.folder {
		border: 1px solid var(--border-color);
		border-radius: var(--border-radius);
		user-select: none;
		margin-bottom: var(--padding);
		transition:
			border 0.2s var(--animation-curve),
			background-color 0.2s var(--animation-curve);
		overflow: hidden;
	}

	.folder:hover {
		border-color: var(--border-color-hover);
	}

	.folder.open {
		background-color: var(--bg-color-hover);
	}

	.header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		width: 100%;
		cursor: pointer;
		padding: calc(var(--padding) * 1.2) calc(var(--padding) * 1.5);
		margin: 0;
		border: none;
		background: none;
		color: var(--text-color);
		font-family: var(--font-family);
		font-size: var(--font-size);
		text-align: left;
	}

	.header:hover {
		color: var(--text-color-hover);
	}

	.folder-title {
		font-weight: 500;
	}

	.meta {
		display: flex;
		align-items: center;
		gap: 8px;
		flex-shrink: 0;
	}

	.count {
		font-size: calc(var(--font-size) * 0.8);
		color: var(--text-color-dim);
		background-color: var(--border-color);
		padding: 2px 8px;
		border-radius: 99px;
		min-width: 24px;
		text-align: center;
	}

	.caret {
		width: 14px;
		height: 14px;
		color: var(--text-color-dim);
		transition: transform 0.2s var(--animation-curve);
		flex-shrink: 0;
	}

	.caret.open {
		transform: rotate(90deg);
	}

	.children {
		display: flex;
		flex-direction: column;
		padding: 0 var(--padding) var(--padding);
		gap: 2px;
	}
</style>
