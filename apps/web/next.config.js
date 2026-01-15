/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ['@bible-study/types'],
  experimental: {
    typedRoutes: true,
  },
}

module.exports = nextConfig
