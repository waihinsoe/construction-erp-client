import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/config";
import { routing } from "@/i18n/routing";
import { getProjects } from "@/lib/content/queries";
export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [
    "",
    "/projects",
    "/services",
    "/about",
    "/team",
    "/contact",
    ...getProjects().map((p) => `/projects/${p.slug}`),
  ];
  return routing.locales.flatMap((locale) =>
    paths.map((path) => ({
      url: new URL(`/${locale}${path}`, siteConfig.url).href,
      alternates: {
        languages: Object.fromEntries(
          routing.locales.map((lang) => [
            lang,
            new URL(`/${lang}${path}`, siteConfig.url).href,
          ]),
        ),
      },
    })),
  );
}
