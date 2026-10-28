import type { Locale } from "@/types/content";
import { setSiteLocale } from "@/i18n/locale";
import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { ArrowUpRight, ArrowDown } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { getFeaturedProjects } from "@/lib/content/queries";
import { team, projects, services } from "@/lib/content/data";
import { pageMetadata } from "@/lib/metadata";
import {
  SectionHeading,
  ProjectCard,
  TeamCard,
  ServiceGrid,
  Values,
  Process,
  CallToAction,
} from "@/components/site/content-blocks";
import { ServiceAccordion } from "@/components/site/service-accordion";
import { CompanyTimeline } from "@/components/site/company-timeline";
import { Testimonials } from "@/components/site/testimonials";
import { Reveal } from "@/components/site/reveal";
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  return pageMetadata((await params).locale, "home");
}
export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setSiteLocale(locale);
  const t = await getTranslations();
  return (
    <>
      <section className="hero">
        <div className="hero-image">
          <Image
            src="/images/tower.jpg"
            alt={t("home.featured")}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        </div>
        <div className="hero-shade" />
        <div className="shell relative z-10">
          <div className="hero-copy">
            <p className="eyebrow text-white/70">
              <span className="mr-3 inline-block size-1.5 bg-amber" />
              {t("home.eyebrow")}
            </p>
            <Reveal>
              <h1>
                {t("home.title")}
                <br />
                <span>{t("home.titleAccent")}</span>
              </h1>
              <p className="hero-intro">{t("home.intro")}</p>
              <div className="mt-9 flex flex-wrap gap-4">
                <Link href="/projects" className="button button-amber">
                  {t("common.explore")}
                  <ArrowUpRight size={18} />
                </Link>
                <Link href="/contact" className="button button-outline">
                  {t("common.start")}
                  <ArrowUpRight size={18} />
                </Link>
              </div>
            </Reveal>
          </div>
          <div className="hero-bottom">
            <a
              href="#capabilities"
              className="flex items-center gap-4 text-[10px] tracking-[.18em]"
            >
              <span className="icon-button border border-white/30">
                <ArrowDown size={16} />
              </span>
              {t("home.scroll")}
            </a>
            <Link
              href="/projects/northline-tower"
              className="hidden text-right sm:block"
            >
              <p className="text-[9px] tracking-[.18em] text-white/60">
                {t("home.featured")}
              </p>
              <p className="mt-2 flex items-center justify-end gap-4 text-sm">
                {projects[1].title[locale as Locale]}
                <ArrowUpRight size={16} />
              </p>
            </Link>
          </div>
        </div>
      </section>
      <div className="stats-strip">
        <div className="shell grid grid-cols-3 divide-x divide-border">
          {[
            [projects.length, "statProjects"],
            [team.length, "statPeople"],
            [services.length, "statServices"],
          ].map(([n, key]) => (
            <div
              key={key}
              className="flex flex-col items-center justify-center gap-2 px-3 py-7 sm:flex-row sm:gap-5"
            >
              <strong className="text-3xl font-light">
                {new Intl.NumberFormat(locale, {
                  minimumIntegerDigits: 2,
                }).format(Number(n))}
              </strong>
              <span className="text-center text-[10px] uppercase tracking-widest text-muted-foreground">
                {t(`home.${key}`)}
              </span>
            </div>
          ))}
        </div>
      </div>
      <section id="capabilities" className="section shell scroll-mt-24">
        <SectionHeading
          label={t("home.capLabel")}
          title={t("home.capTitle")}
          description={t("home.capIntro")}
        />
        <ServiceAccordion />
      </section>
      <section className="section muted-section">
        <div className="shell">
          <SectionHeading
            label={t("home.projectsLabel")}
            title={t("home.projectsTitle")}
            description={t("home.projectsIntro")}
          >
            <Link href="/projects" className="text-link">
              {t("common.allProjects")}
              <ArrowUpRight size={17} />
            </Link>
          </SectionHeading>
          <div className="featured-grid">
            {getFeaturedProjects().map((p, i) => (
              <Reveal key={p.id}>
                <ProjectCard project={p} index={i} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      <section className="section shell">
        <SectionHeading
          label={t("home.peopleLabel")}
          title={t("home.peopleTitle")}
          description={t("home.peopleIntro")}
        >
          <Link href="/team" className="text-link">
            {t("common.allTeam")}
            <ArrowUpRight size={17} />
          </Link>
        </SectionHeading>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {team.slice(0, 4).map((m) => (
            <TeamCard key={m.id} member={m} compact />
          ))}
        </div>
      </section>
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
          label={t("home.servicesLabel")}
          title={t("home.servicesTitle")}
        />
        <ServiceGrid />
      </section>
      <section className="section muted-section">
        <div className="shell">
          <SectionHeading
            label={t("home.whyLabel")}
            title={t("home.whyTitle")}
            description={t("home.whyIntro")}
          />
          <Values />
        </div>
      </section>
      <section className="section shell">
        <SectionHeading
          label={t("home.processLabel")}
          title={t("home.processTitle")}
        />
        <Process />
      </section>
      <section className="section muted-section">
        <div className="shell">
          <SectionHeading
            label={t("home.testimonialsLabel")}
            title={t("home.testimonialsTitle")}
            description={t("home.testimonialsNote")}
          />
          <Testimonials />
        </div>
      </section>
      <CallToAction />
    </>
  );
}
