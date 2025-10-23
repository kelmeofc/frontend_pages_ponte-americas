import { defineConfig } from "prisma/config";

export default defineConfig({
	migrations: {
		seed: "pnpm tsx prisma/seed.ts",
	},
	experimental: {
		adapter: true,
	},
});
