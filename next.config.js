/** @type {import('next').NextConfig} */
const nextConfig = {
  outputFileTracingRoot: __dirname,
  
  // Configuração para Prisma na Vercel
  experimental: {
    outputFileTracingIncludes: {
      '/api/**/*': ['./src/generated/prisma/**/*'],
      '/': ['./src/generated/prisma/**/*'],
    },
  },
  
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cms.ponteamericas.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'ponteamericas.com',
        port: '',
        pathname: '/**',
      },
    ],
  }
};

module.exports = nextConfig; 