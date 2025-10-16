/** @type {import('next').NextConfig} */
const nextConfig = {

  outputFileTracingRoot: __dirname,
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