import { Suspense } from "react";
import { siteConfig } from "@/config/config";
import type { Metadata } from "next";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { Header } from "@/components/site/header";
import { Footer } from "@/components/site/content-blocks";
import "@fontsource/manrope/latin-400.css";
import "@fontsource/manrope/latin-500.css";
import "@fontsource/manrope/latin-700.css";
import "@fontsource/noto-sans-myanmar/myanmar-400.css";
import "@fontsource/noto-sans-myanmar/myanmar-500.css";
import "@fontsource/noto-sans-myanmar/myanmar-700.css";
import "./globals.css";
export const metadata: Metadata = {
  metadataBase: siteConfig.url,
  robots: { index: siteConfig.indexable, follow: siteConfig.indexable },
  title: { default: "Northline", template: "%s | Northline" },
};
<<<<<<< HEAD

export default function RootLayout({ children }: LayoutProps<"/[locale]">) {
=======
export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}
export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);
  const messages = (await import(`../../messages/${locale}.json`)).default;
  const t = await getTranslations({ locale });
>>>>>>> 5e017e4 (feat: finish first stage)
  return (
    <html lang={locale}>
      <body>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <a href="#main-content" className="skip-link">
            {t("common.skip")}
          </a>
          <Suspense
            fallback={
              <div
                className="h-[78px] border-b border-border md:h-24"
                aria-busy="true"
              />
            }
          >
            <Header />
          </Suspense>
          <main id="main-content">{children}</main>
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
