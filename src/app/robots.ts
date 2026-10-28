import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = "https://www.willdrafting.in";

  return {
    rules: [
      {
        userAgent: "*",
        allow: [
          "/",
          "/about-us",
          "/services",
          "/services/*",
          "/tools",
          "/tools/*",
          "/pricing",
          "/blogs",
          "/blogs/*",
          "/templates",
          "/templates/*",
          "/locations",
          "/locations/*",
          "/contact",
          "/sitemap",
          "/api/blog-images",
          "/api/blog-images/*",
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
          "/thank-you",
          "/complete-profile",
          "/print",
          "/print/*",
        ],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  };
}
