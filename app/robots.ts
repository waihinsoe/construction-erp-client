import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/config";
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      ...(siteConfig.indexable ? { allow: "/" } : { disallow: "/" }),
    },
    sitemap: new URL("/sitemap.xml", siteConfig.url).href,
  };
}
