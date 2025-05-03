/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: '/orion',
  images: {
    unoptimized: false,
  },
  webpack(config) {
    // SVG handling
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });

    return config;
  },
}

module.exports = nextConfig 