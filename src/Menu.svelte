<script>
	import { onMount, onDestroy } from "svelte";

	let darkMode = localStorage.getItem("darkMode");
	let isManual = darkMode !== null;
	let currentDarkMode = darkMode === "true";

	let mediaQuery;

	function toggleTheme() {
		currentDarkMode = !currentDarkMode;
		isManual = true;
		localStorage.setItem("darkMode", currentDarkMode.toString());
		updateTheme();
	}

	function updateTheme() {
		// Use manual preference if set, otherwise use system preference
		const shouldBeDark = isManual ? currentDarkMode : mediaQuery.matches;

		if (shouldBeDark) {
			document.documentElement.style.setProperty("--bg-color", "#000000");
			document.documentElement.style.setProperty(
				"--bg-color-hover",
				"#ffffff11",
			);
			document.documentElement.style.setProperty("--text-color", "#d1d1d1");
			document.documentElement.style.setProperty(
				"--text-color-hover",
				"#ffffff",
			);
			document.documentElement.style.setProperty("--text-color-dim", "#808080");
			document.documentElement.style.setProperty("--border-color", "#ffffff22");
			document.documentElement.style.setProperty(
				"--border-color-hover",
				"#ffffff66",
			);
			document.documentElement.style.setProperty(
				"--search-bg-color",
				"#ffffff11",
			);
		} else {
			document.documentElement.style.setProperty("--bg-color", "#ffffff");
			document.documentElement.style.setProperty(
				"--bg-color-hover",
				"#00000011",
			);
			document.documentElement.style.setProperty("--text-color", "#000000");
			document.documentElement.style.setProperty(
				"--text-color-hover",
				"#000000",
			);
			document.documentElement.style.setProperty("--text-color-dim", "#606060");
			document.documentElement.style.setProperty("--border-color", "#00000022");
			document.documentElement.style.setProperty(
				"--border-color-hover",
				"#00000066",
			);
			document.documentElement.style.setProperty(
				"--search-bg-color",
				"#f5f5f5",
			);
		}
	}

	function handleSystemThemeChange(e) {
		if (!isManual) {
			updateTheme();
		}
	}

	onMount(() => {
		mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
		mediaQuery.addEventListener("change", handleSystemThemeChange);
		updateTheme();
	});

	onDestroy(() => {
		if (mediaQuery) {
			mediaQuery.removeEventListener("change", handleSystemThemeChange);
		}
	});
</script>

<div class="menu">
	<button class="theme-toggle" on:click={toggleTheme} aria-label="Toggle theme">
		{#if isManual ? currentDarkMode : mediaQuery?.matches}
			<!-- Moon icon -->
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="20"
				height="20"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				stroke-width="2"
				stroke-linecap="round"
				stroke-linejoin="round">
				<path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
			</svg>
		{:else}
			<!-- Sun icon -->
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="20"
				height="20"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				stroke-width="2"
				stroke-linecap="round"
				stroke-linejoin="round">
				<circle cx="12" cy="12" r="4" /><path d="M12 2v2" /><path
					d="M12 20v2" /><path d="m4.93 4.93 1.41 1.41" /><path
					d="m17.66 17.66 1.41 1.41" /><path d="M2 12h2" /><path
					d="M20 12h2" /><path d="m6.34 17.66-1.41 1.41" /><path
					d="m19.07 4.93-1.41 1.41" />
			</svg>
		{/if}
	</button>
</div>

<style>
	.menu {
		position: fixed;
		top: var(--padding);
		right: var(--padding);
		z-index: 1100;
	}

	.theme-toggle {
		background: none;
		border: 1px solid var(--border-color);
		color: var(--text-color-dim);
		padding: 8px;
		border-radius: 50%;
		cursor: pointer;
		display: flex;
		align-items: center;
		justify-content: center;
		transition: all 0.2s var(--animation-curve);
		background-color: var(--bg-color);
		backdrop-filter: blur(8px);
	}

	.theme-toggle:hover {
		border-color: var(--border-color-hover);
		color: var(--text-color-hover);
		background-color: var(--bg-color-hover);
		transform: scale(1.05);
	}

	.theme-toggle:active {
		transform: scale(0.95);
	}
</style>
