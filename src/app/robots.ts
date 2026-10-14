import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = "https://www.willdrafting.in";

  return {
    rules: [
      {
        userAgent: "*",
        allow: [
          "/",
          "/aboutus",
          "/service",
          "/pricing",
          "/blogs",
          "/blogs/*",
          "/contact",
        ],
        disallow: [
          "/start",
          "/start/*",
          "/dashboard",
          "/dashboard/*",
          "/authority",
          "/authority/*",
          "/nullify",
          "/nullify/*",
          "/api",
          "/api/*",
          "/login",
        ],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  };
}
