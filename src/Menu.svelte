<script>
	let darkMode = localStorage.getItem("darkMode");
	darkMode = darkMode === null ? true : darkMode === "true";

	function toggleTheme() {
		darkMode = !darkMode;
		localStorage.setItem("darkMode", darkMode);
		updateTheme();
	}

	function updateTheme() {
		if (darkMode) {
			document.documentElement.style.setProperty("--bg-color", "#000000");
			document.documentElement.style.setProperty("--bg-color-hover", "#ffffff11");
			document.documentElement.style.setProperty("--text-color", "#d1d1d1");
			document.documentElement.style.setProperty("--text-color-hover", "#ffffff");
			document.documentElement.style.setProperty("--text-color-dim", "#808080");
			document.documentElement.style.setProperty("--border-color", "#ffffff22");
			document.documentElement.style.setProperty("--border-color-hover", "#ffffff66");
			document.documentElement.style.setProperty("--search-bg-color", "#ffffff11");
		} else {
			document.documentElement.style.setProperty("--bg-color", "#ffffff");
			document.documentElement.style.setProperty("--bg-color-hover", "#00000011");
			document.documentElement.style.setProperty("--text-color", "#000000");
			document.documentElement.style.setProperty("--text-color-hover", "#000000");
			document.documentElement.style.setProperty("--text-color-dim", "#606060");
			document.documentElement.style.setProperty("--border-color", "#00000022");
			document.documentElement.style.setProperty("--border-color-hover", "#00000066");
			document.documentElement.style.setProperty("--search-bg-color", "#00000044");
		}
	}

	import { onMount } from "svelte";
	onMount(() => {
		updateTheme();
	});
</script>
