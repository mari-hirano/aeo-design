import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  basePath: "/orion",
  async redirects() {
    return [
      {
        source: '/',
        destination: '/orion',
        permanent: true,
        basePath: false,
      },
    ];
  },
};

export default nextConfig;
