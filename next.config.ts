/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: "/orion",
  assetPrefix: "/orion/",
  images: {
    loader: "custom",
    path: "/orion/_next/image"
  },
  async rewrites() {
    return [
      {
        source: '/',
        destination: '/orion',
        basePath: false,
      },
    ]
  },
}

module.exports = nextConfig
