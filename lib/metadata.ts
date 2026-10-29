import { setSiteLocale } from "@/i18n/locale";
import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
export async function pageMetadata(
  locale: string,
  page: "home" | "projects" | "services" | "about" | "team" | "contact",
): Promise<Metadata> {
  setSiteLocale(locale);
  const t = await getTranslations({ locale, namespace: "meta" });
  return {
    title: t(page),
    description: t("description"),
    openGraph: {
      title: t(page),
      description: t("description"),
      images: [{ url: "/images/tower.jpg", width: 1800, height: 1200 }],
    },
  };
}
