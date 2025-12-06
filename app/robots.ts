import { MetadataRoute } from "next";
import { siteConfig } from "@/data/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "CCBot",
        disallow: ["/"],
      },
      {
        userAgent: "ChatGPT-User",
        disallow: ["/"],
      },
      {
        userAgent: "GPTBot",
        disallow: ["/"],
      },
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/hp"],
      },
    ],
    sitemap: `${siteConfig.url}/sitemap.xml`,
  };
}
