import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  devIndicators: false,
  reactCompiler: true,
  serverExternalPackages: ["@sparticuz/chromium", "puppeteer-core"],
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
        source: "/blogs/what-an-adjuster-is-doing-when-they-call",
        destination: "/blogs",
        permanent: true,
      },
      {
        source: "/blogs/what-an-adjuster-is-doing",
        destination: "/blogs",
        permanent: true,
      },
      {
        source: "/blogs/the-gap-in-your-medical-records",
        destination: "/blogs",
        permanent: true,
      },
      {
        source: "/blogs/gap-in-medical-records",
        destination: "/blogs",
        permanent: true,
      },
      {
        source: "/blogs/why-a-recorded-statement-is-not-neutral",
        destination: "/blogs",
        permanent: true,
      },
      {
        source: "/blogs/why-recorded-statement-is-not-neutral",
        destination: "/blogs",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
