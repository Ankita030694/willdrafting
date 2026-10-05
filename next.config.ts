import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
  async redirects() {
    return [
      {
        source: "/contactus",
        destination: "/contact",
        permanent: true,
      },
      {
        source: "/start",
        destination: "/contact",
        permanent: false,
      },
      {
        source: "/start/:path*",
        destination: "/contact",
        permanent: false,
      },
      {
        source: "/dashboard",
        destination: "/contact",
        permanent: false,
      },
      {
        source: "/dashboard/:path*",
        destination: "/contact",
        permanent: false,
      },
      {
        source: "/dashboard2",
        destination: "/contact",
        permanent: false,
      },
      {
        source: "/dashboard2/:path*",
        destination: "/contact",
        permanent: false,
      },
      {
        source: "/login",
        destination: "/contact",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
