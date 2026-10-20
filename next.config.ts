import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  devIndicators: false,
  reactCompiler: true,
  serverExternalPackages: ["@sparticuz/chromium", "puppeteer-core"],
  images: {
    dangerouslyAllowSVG: true,
    contentDispositionType: "inline",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
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
        source: "/aboutus",
        destination: "/about-us",
        permanent: true,
      },
      {
        source: "/service",
        destination: "/services",
        permanent: true,
      },
      {
        source: "/service/:slug*",
        destination: "/services/:slug*",
        permanent: true,
      },
      {
        source: "/nri-will-india",
        destination: "/services/nri-will-india",
        permanent: true,
      },
      {
        source: "/succession-calculator",
        destination: "/tools/succession-calculator",
        permanent: true,
      },
      {
        source: "/hindu-succession-calculator",
        destination: "/tools/succession-calculator",
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
