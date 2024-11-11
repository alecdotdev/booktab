import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";

// https://vite.dev/config/
export default defineConfig({
	plugins: [svelte()],
	build: {
		outDir: "dist",
		rollupOptions: {
			input: "/src/main.js",
			output: {
				entryFileNames: "assets/[name].js", // Remove hash from JavaScript entry
				chunkFileNames: "assets/[name].js", // Remove hash from JavaScript chunks
				assetFileNames: "assets/[name].[ext]", // Remove hash from other assets like CSS
			},
		},
	},
	publicDir: "public",
});
