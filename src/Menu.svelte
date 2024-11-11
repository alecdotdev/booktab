<script>
	import { onMount } from "svelte";
	export let visibility;
	export let toggleVisibility;

	const folderTypes = [
		{ id: "menu", label: "Bookmarks Menu" },
		{ id: "toolbar", label: "Bookmarks Toolbar" },
		{ id: "other", label: "Other Bookmarks" },
		{ id: "mobile", label: "Mobile Bookmarks" },
	];
</script>

<div class="menu">
	<h3>Toggle Folders</h3>
	{#each folderTypes as folderType}
		<div>
			<input
				type="checkbox"
				id={folderType.id}
				bind:checked={visibility[folderType.id]}
				on:change={() => toggleVisibility(folderType.id)}
			/>
			<label for={folderType.id}>{folderType.label}</label>
		</div>
	{/each}
</div>

<style>
	.menu {
		padding: 10px;
		background-color: var(--bg-color);
		border: 1px solid var(--border-color);
		margin-bottom: 20px;
	}
	h3 {
		margin: 0 0 10px;
	}
	label {
		margin-left: 5px;
	}
</style>
