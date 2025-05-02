import MillionLint from "@million/lint";
import netlifyPlugin from "@netlify/vite-plugin-react-router";
import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
	plugins: [
		MillionLint.vite({
			enabled: true,
		}),
		tailwindcss(),
		reactRouter(),
		tsconfigPaths(),
		netlifyPlugin(),
	],
});
