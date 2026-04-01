import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: process.env.NEXT_OUTPUT === "export" ? "export" : undefined,
  images: { unoptimized: true },
  trailingSlash: true,
  turbopack: {
    root: ".",
  },
  async rewrites() {
    return [
      {
        source: '/okiepaws',
        destination: '/okiepaws/index.html',
      },
      {
        source: '/okiepaws/:path*',
        destination: '/okiepaws/:path*',
      },
    ];
  },
};

export default nextConfig;
