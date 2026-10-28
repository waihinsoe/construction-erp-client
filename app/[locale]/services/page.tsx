import { setSiteLocale } from "@/i18n/locale";
import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { ArrowUpRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { services } from "@/lib/content/data";
import {
  PageIntro,
  CallToAction,
  Process,
  SectionHeading,
} from "@/components/site/content-blocks";
import { pageMetadata } from "@/lib/metadata";
import type { Locale } from "@/types/content";
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  return pageMetadata((await params).locale, "services");
}
export default async function Services({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setSiteLocale(locale);
  const t = await getTranslations();
  return (
    <>
      <PageIntro name="services" />
      <div className="shell pb-24">
        {services.map((s, i) => (
          <section
            key={s.id}
            id={s.slug}
            className="grid scroll-mt-28 items-center gap-10 border-t border-border py-14 md:grid-cols-2 md:gap-20"
          >
            <div
              className={`relative aspect-[4/3] ${i % 2 ? "md:order-2" : ""}`}
            >
              <Image
                src={s.image}
                alt={s.title[locale]}
                fill
                sizes="(max-width:768px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
            <div>
              <p className="eyebrow">0{i + 1}</p>
              <h2 className="text-3xl md:text-4xl">{s.title[locale]}</h2>
              <p className="my-6 leading-8 text-muted-foreground">
                {s.description[locale]}
              </p>
              <Link href="/contact" className="text-link">
                {t("common.start")}
                <ArrowUpRight size={18} />
              </Link>
            </div>
          </section>
        ))}
      </div>
      <section className="section muted-section">
        <div className="shell">
          <SectionHeading
            label={t("home.processLabel")}
            title={t("home.processTitle")}
          />
          <Process />
        </div>
      </section>
      <CallToAction />
    </>
  );
}
