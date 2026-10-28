import Image from "next/image";
import { getLocale, getTranslations } from "next-intl/server";
import {
  ArrowUpRight,
  Building2,
  Home,
  Factory,
  Ruler,
  Compass,
  ShieldCheck,
  Leaf,
  MessageSquare,
  Users,
  HardHat,
  CheckCircle2,
} from "lucide-react";
import { Link } from "@/i18n/navigation";
import { services } from "@/lib/content/data";
import { getMemberProjects } from "@/lib/content/queries";
import type { Locale, Project, TeamMember } from "@/types/content";
export function SectionHeading({
  label,
  title,
  description,
  children,
}: {
  label: string;
  title: string;
  description?: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="section-heading">
      <div>
        <p className="eyebrow">{label}</p>
        <h2 className="section-title whitespace-pre-line">{title}</h2>
        {description && <p className="section-description">{description}</p>}
      </div>
      {children}
    </div>
  );
}
export async function PageIntro({
  name,
}: {
  name: "projects" | "services" | "team" | "about" | "contact";
}) {
  const t = await getTranslations(name);
  return (
    <section className="page-intro shell">
      <p className="eyebrow">{t("label")}</p>
      <h1 className="page-title whitespace-pre-line">{t("title")}</h1>
      <p className="section-description">{t("intro")}</p>
    </section>
  );
}
export async function ProjectCard({
  project,
  index = 0,
}: {
  project: Project;
  index?: number;
}) {
  const locale = (await getLocale()) as Locale;
  const t = await getTranslations();
  return (
    <article className="project-card group">
      <Link href={`/projects/${project.slug}`} className="block">
        <div className="project-image">
          <Image
            src={project.thumbnail}
            alt={project.title[locale]}
            fill
            sizes="(max-width: 767px) 100vw, 50vw"
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <span className="image-index">
            {String(index + 1).padStart(2, "0")}
          </span>
          <span className="status-pill">{t(`status.${project.status}`)}</span>
          <span className="image-arrow">
            <ArrowUpRight size={23} />
          </span>
        </div>
        <div className="mt-5 flex items-start justify-between gap-4">
          <div>
            <p className="eyebrow mb-2">{t(`category.${project.category}`)}</p>
            <h3 className="text-2xl font-medium tracking-tight">
              {project.title[locale]}
            </h3>
            <p className="mt-2 text-sm text-muted-foreground">
              {project.location[locale]} <span aria-hidden> / </span>{" "}
              {new Intl.DateTimeFormat(locale, {
                year: "numeric",
                timeZone: "UTC",
              }).format(new Date(project.completionDate ?? project.startDate))}
            </p>
          </div>
          <ArrowUpRight size={19} className="mt-7" />
        </div>
      </Link>
    </article>
  );
}
export async function TeamCard({
  member,
  compact = false,
}: {
  member: TeamMember;
  compact?: boolean;
}) {
  const locale = (await getLocale()) as Locale;
  const t = await getTranslations();
  return (
    <article id={member.slug} className="team-card scroll-mt-28">
      <div className="relative aspect-[4/5] overflow-hidden bg-muted">
        <Image
          src={member.portrait}
          alt={member.name[locale]}
          fill
          sizes="(max-width: 640px) 85vw, (max-width: 1024px) 45vw, 25vw"
          className="object-cover grayscale transition-all duration-500 hover:grayscale-0"
        />
      </div>
      <p className="eyebrow mb-2 mt-5">{member.role[locale]}</p>
      <h3 className="text-xl font-medium">{member.name[locale]}</h3>
      <p className="mt-2 text-sm text-muted-foreground">
        {member.expertise[locale]}
      </p>
      {!compact && (
        <p className="mt-3 text-sm leading-7 text-muted-foreground">
          {member.biography[locale]}
        </p>
      )}
      <div className="mt-4 border-t pt-3">
        <p className="mb-2 text-xs text-muted-foreground">
          {t("team.projects")}
        </p>
        {getMemberProjects(member.id).length ? (
          getMemberProjects(member.id).map((p) => (
            <Link
              key={p.id}
              className="mb-1 flex items-center justify-between gap-2 text-xs hover:underline"
              href={`/projects/${p.slug}`}
            >
              {p.title[locale]}
              <ArrowUpRight size={13} />
            </Link>
          ))
        ) : (
          <p className="text-xs">{t("common.noProjects")}</p>
        )}
      </div>
    </article>
  );
}
const icons = {
  home: Home,
  building: Building2,
  factory: Factory,
  ruler: Ruler,
  compass: Compass,
};
export async function ServiceGrid() {
  const locale = (await getLocale()) as Locale;
  const t = await getTranslations();
  return (
    <div className="grid gap-px border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
      {services.map((s) => {
        const Icon = icons[s.icon];
        return (
          <Link
            href={`/services#${s.slug}`}
            key={s.id}
            className="service-tile group"
          >
            <Icon size={30} strokeWidth={1.25} className="mb-10 text-amber" />
            <h3 className="text-xl">{s.title[locale]}</h3>
            <p className="mt-4 text-sm leading-7 text-muted-foreground">
              {s.description[locale]}
            </p>
            <span className="mt-8 flex items-center justify-between text-xs">
              {t("common.learn")}
              <ArrowUpRight size={18} />
            </span>
          </Link>
        );
      })}
    </div>
  );
}
const values = [
  ["engineering", HardHat],
  ["safety", ShieldCheck],
  ["quality", CheckCircle2],
  ["communication", MessageSquare],
  ["people", Users],
  ["sustainability", Leaf],
] as const;
export async function Values() {
  const t = await getTranslations("values");
  return (
    <div className="grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
      {values.map(([key, Icon]) => (
        <div key={key}>
          <Icon size={25} strokeWidth={1.4} className="mb-5 text-amber" />
          <h3 className="text-lg">{t(key)}</h3>
          <p className="mt-3 text-sm leading-7 text-muted-foreground">
            {t(`${key}Text`)}
          </p>
        </div>
      ))}
    </div>
  );
}
export async function Process() {
  const t = await getTranslations("process");
  return (
    <ol className="grid gap-8 sm:grid-cols-2 lg:grid-cols-5">
      {(["consult", "design", "estimate", "build", "deliver"] as const).map(
        (key, i) => (
          <li key={key} className="border-t border-border pt-6">
            <span className="text-4xl font-light text-amber">0{i + 1}</span>
            <h3 className="mb-3 mt-7 text-lg">{t(key)}</h3>
            <p className="text-sm leading-7 text-muted-foreground">
              {t(`${key}Text`)}
            </p>
          </li>
        ),
      )}
    </ol>
  );
}
export async function CallToAction() {
  const t = await getTranslations("cta");
  return (
    <section className="cta-section">
      <div className="shell relative z-10 flex flex-col justify-between gap-10 py-24 md:flex-row md:items-end">
        <div>
          <p className="eyebrow">{t("label")}</p>
          <h2 className="section-title whitespace-pre-line">{t("title")}</h2>
          <p className="mt-6 max-w-md text-sm leading-7 text-white/65">
            {t("description")}
          </p>
        </div>
        <Link
          href="/contact"
          className="button button-amber shrink-0 self-start md:self-end"
        >
          {t("button")}
          <ArrowUpRight size={18} />
        </Link>
      </div>
    </section>
  );
}
export async function Footer() {
  const t = await getTranslations();
  return (
    <footer className="site-footer">
      <div className="shell">
        <div className="grid gap-12 py-16 md:grid-cols-[2fr_1fr_1fr]">
          <div>
            <Link href="/" className="brand">
              <span className="brand-mark" aria-hidden>
                N<span>↗</span>
              </span>
              <span>
                <strong>{t("brand")}</strong>
                <small>{t("brandSub")}</small>
              </span>
            </Link>
            <p className="mt-6 max-w-xs text-sm leading-7 text-white/60">
              {t("footer.intro")}
            </p>
          </div>
          <div>
            <h2 className="mb-6 text-sm">{t("footer.explore")}</h2>
            <div className="grid grid-cols-2 gap-3 text-sm text-white/60">
              {(
                [
                  "home",
                  "projects",
                  "services",
                  "about",
                  "team",
                  "contact",
                ] as const
              ).map((key) => (
                <Link
                  key={key}
                  href={key === "home" ? "/" : `/${key}`}
                  className="hover:text-white"
                >
                  {t(`nav.${key}`)}
                </Link>
              ))}
            </div>
          </div>
          <div>
            <h2 className="mb-6 text-sm">{t("footer.connect")}</h2>
            <Link
              href="/contact"
              className="inline-flex items-center gap-3 text-sm text-amber"
            >
              {t("common.start")}
              <ArrowUpRight size={16} />
            </Link>
            <p className="mt-4 text-xs leading-6 text-white/60">
              {t("footer.contactNote")}
            </p>
          </div>
        </div>
        <p className="border-t border-white/15 py-5 text-xs leading-6 text-white/50">
          {t("common.demo")}
        </p>
        <div className="flex flex-wrap justify-between gap-4 border-t border-white/15 py-6 text-xs text-white/50">
          <span>{t("footer.rights", { year: 2026 })}</span>
          <a href="https://unsplash.com" className="hover:text-white">
            {t("footer.credit")}
          </a>
        </div>
      </div>
    </footer>
  );
}
