const configuredUrl = process.env.NEXT_PUBLIC_SITE_URL;
export const siteConfig = {
  url: new URL(configuredUrl || "http://localhost:3000"),
  indexable: Boolean(configuredUrl),
};
