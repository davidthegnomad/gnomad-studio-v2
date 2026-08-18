import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: process.env.NEXT_OUTPUT === "export" ? "export" : undefined,
  images: { unoptimized: true },
  trailingSlash: true,
  turbopack: {
    root: ".",
  },
  async redirects() {
    return [
      // www → apex (stops GSC duplicate/canonical noise)
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.gnomadstudio.org" }],
        destination: "https://gnomadstudio.org/:path*",
        permanent: true,
      },
      // Legacy paths still crawled as 404s (GSC 2026-07-27)
      { source: "/blog", destination: "/examples/", permanent: true },
      { source: "/blog/:path*", destination: "/examples/", permanent: true },
      { source: "/portfolio", destination: "/examples/", permanent: true },
      { source: "/portfolio/:path*", destination: "/examples/", permanent: true },
      { source: "/work", destination: "/examples/", permanent: true },
      { source: "/projects", destination: "/examples/", permanent: true },
      { source: "/demos", destination: "/demo/", permanent: true },
      { source: "/demos/:path*", destination: "/demo/", permanent: true },
      // Hostinger gnomad.studio / demo.gnomad.studio is down (TLS). Serve
      // pitches on this host. Do NOT redirect /DEMO/:slug — App Hosting is
      // case-insensitive, so that also 308'd /demo/:slug to a dead host.
      {
        source: "/demo/muskogee/:slug",
        destination: "/demo/:slug",
        permanent: false,
      },
      {
        source: "/demo/park-hill/:slug",
        destination: "/demo/:slug",
        permanent: false,
      },
      { source: "/about", destination: "/", permanent: true },
      { source: "/agency", destination: "/", permanent: true },
      { source: "/home", destination: "/", permanent: true },
      { source: "/pricing", destination: "/services/", permanent: true },
      { source: "/web-design", destination: "/services/", permanent: true },
      { source: "/seo", destination: "/services/", permanent: true },
      { source: "/index.html", destination: "/", permanent: true },
    ];
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
