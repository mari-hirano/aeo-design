import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  basePath: "/spring",
  assetPrefix: "/spring/",
  images: {
    unoptimized: true,
    path: "/spring/_next/image"
  },
  async redirects() {
    return [
      {
        source: '/',
        destination: '/spring',
        permanent: true,
        basePath: false,
      },
    ];
  },
};

export default nextConfig;
