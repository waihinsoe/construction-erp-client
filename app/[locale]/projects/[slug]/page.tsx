import { setSiteLocale } from "@/i18n/locale";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { ArrowLeft } from "lucide-react";
import { Link } from "@/i18n/navigation";
import {
  getProjectBySlug,
  getProjects,
  getProjectTeam,
  getRelatedProjects,
} from "@/lib/content/queries";
import {
  TeamCard,
  ProjectCard,
  CallToAction,
} from "@/components/site/content-blocks";
import { ProjectGallery } from "@/components/site/project-gallery";
import type { Locale } from "@/types/content";
type Props = { params: Promise<{ locale: Locale; slug: string }> };
export function generateStaticParams() {
  return getProjects().map((p) => ({ slug: p.slug }));
}
export async function generateMetadata({ params }: Props) {
  const { locale, slug } = await params;
  setSiteLocale(locale);
  const p = getProjectBySlug(slug);
  if (!p) return {};
  return {
    title: p.title[locale],
    description: p.summary[locale],
    openGraph: {
      title: p.title[locale],
      description: p.summary[locale],
      images: [p.heroImage],
    },
  };
}
export default async function ProjectPage({ params }: Props) {
  const { locale, slug } = await params;
  setSiteLocale(locale);
  const p = getProjectBySlug(slug);
  if (!p) notFound();
  const t = await getTranslations();
  const date = (s: string) =>
    new Intl.DateTimeFormat(locale, {
      year: "numeric",
      month: "long",
      timeZone: "UTC",
    }).format(new Date(s));
  return (
    <>
      <section className="shell pb-10 pt-12">
        <Link href="/projects" className="text-link mb-10">
          <ArrowLeft size={16} />
          {t("common.back")}
        </Link>
        <p className="eyebrow">
          {t(`category.${p.category}`)} / {t(`status.${p.status}`)}
        </p>
        <h1 className="page-title">{p.title[locale]}</h1>
        <p className="section-description">{p.summary[locale]}</p>
        <p className="mt-5 text-xs text-muted-foreground">
          {t("common.sample")} · {t("common.photo")}
        </p>
      </section>
      <div className="shell">
        <div className="relative aspect-[16/9] md:aspect-[21/9]">
          <Image
            src={p.heroImage}
            alt={p.title[locale]}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        </div>
        <dl className="grid gap-6 border-b border-border py-8 sm:grid-cols-2 lg:grid-cols-4">
          {[
            ["location", p.location[locale]],
            ["category", t(`category.${p.category}`)],
            ["startDate", date(p.startDate)],
            p.completionDate
              ? ["completionDate", date(p.completionDate)]
              : ["status", t(`status.${p.status}`)],
          ].map(([key, value]) => (
            <div key={key}>
              <dt className="mb-2 text-xs uppercase tracking-wider text-muted-foreground">
                {t(`projects.${key}`)}
              </dt>
              <dd className="text-sm">{value}</dd>
            </div>
          ))}
        </dl>
      </div>
      <section className="section shell grid gap-12 md:grid-cols-2">
        <div>
          <h2 className="text-3xl">{t("projects.overview")}</h2>
          <p className="mt-6 leading-8 text-muted-foreground">
            {p.description[locale]}
          </p>
        </div>
        <div className="space-y-8">
          {(["scope", "challenges", "solutions"] as const).map((key) => (
            <div key={key}>
              <h2 className="text-xl">{t(`projects.${key}`)}</h2>
              <p className="mt-3 text-sm leading-7 text-muted-foreground">
                {p[key][locale]}
              </p>
            </div>
          ))}
        </div>
      </section>
      <section className="shell pb-24">
        <h2 className="mb-8 text-3xl">{t("projects.gallery")}</h2>
        <ProjectGallery images={p.gallery} title={p.title[locale]} />
      </section>
      <section className="section muted-section">
        <div className="shell">
          <h2 className="mb-10 text-3xl">{t("projects.assigned")}</h2>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {getProjectTeam(p).map((m) => (
              <TeamCard key={m.id} member={m} />
            ))}
          </div>
        </div>
      </section>
      <section className="section shell">
        <h2 className="mb-10 text-3xl">{t("projects.related")}</h2>
        <div className="grid gap-8 md:grid-cols-2">
          {getRelatedProjects(p).map((r, i) => (
            <ProjectCard key={r.id} project={r} index={i} />
          ))}
        </div>
      </section>
      <CallToAction />
    </>
  );
}
