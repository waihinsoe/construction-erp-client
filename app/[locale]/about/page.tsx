import { setSiteLocale } from "@/i18n/locale";
import Image from "next/image";
import { getTranslations } from "next-intl/server";
import {
  PageIntro,
  SectionHeading,
  Values,
  TeamCard,
  CallToAction,
} from "@/components/site/content-blocks";
import { CompanyTimeline } from "@/components/site/company-timeline";
import { team } from "@/lib/content/data";
import { pageMetadata } from "@/lib/metadata";
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  return pageMetadata((await params).locale, "about");
}
export default async function About({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  setSiteLocale((await params).locale);
  const t = await getTranslations();
  return (
    <>
      <PageIntro name="about" />
      <div className="shell">
        <div className="relative aspect-[16/7]">
          <Image
            src="/images/building.jpg"
            alt={t("common.photo")}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        </div>
        <section className="section grid gap-12 md:grid-cols-2">
          {["mission", "vision"].map((key) => (
            <div key={key}>
              <h2 className="mb-5 text-3xl">{t(`about.${key}`)}</h2>
              <p className="leading-8 text-muted-foreground">
                {t(`about.${key}Text`)}
              </p>
            </div>
          ))}
        </section>
      </div>
      <section className="section dark-section">
        <div className="shell">
          <SectionHeading
            label={t("home.historyLabel")}
            title={t("home.historyTitle")}
            description={t("home.historyIntro")}
          />
          <CompanyTimeline />
        </div>
      </section>
      <section className="section shell">
        <SectionHeading
          label={t("home.whyLabel")}
          title={t("about.commitment")}
          description={t("about.commitmentText")}
        />
        <Values />
      </section>
      <section className="section muted-section">
        <div className="shell">
          <SectionHeading
            label={t("team.label")}
            title={t("home.peopleTitle")}
          />
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {team.slice(0, 4).map((m) => (
              <TeamCard key={m.id} member={m} />
            ))}
          </div>
        </div>
      </section>
      <CallToAction />
    </>
  );
}
