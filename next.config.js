/** @type {import('next').NextConfig} */
const nextConfig = {
	// Define explicitamente a raiz para o outputFileTracing a fim de evitar
	// avisos sobre múltiplos lockfiles ou caminhos de build em monorepos.
	outputFileTracingRoot: __dirname,

	// Configuração para Prisma na Vercel
	// outputFileTracingIncludes: {
	// 	"/api/**/*": ["./src/generated/prisma/**/*"],
	// 	"/": ["./src/generated/prisma/**/*"],
	// },


	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "cms.ponteamericas.com",
				port: "",
				pathname: "/**",
			},
			{
				protocol: "https",
				hostname: "ponteamericas.com",
				port: "",
				pathname: "/**",
			},
		],
	},
};

module.exports = nextConfig;
