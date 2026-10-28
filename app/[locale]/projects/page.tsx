import { setSiteLocale } from "@/i18n/locale";
import { Suspense } from "react";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { filterProjects } from "@/lib/content/queries";
import {
  PageIntro,
  ProjectCard,
  CallToAction,
} from "@/components/site/content-blocks";
import { pageMetadata } from "@/lib/metadata";
import type { Locale } from "@/types/content";
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  return pageMetadata((await params).locale, "projects");
}
type Search = Promise<Record<string, string | string[] | undefined>>;
export default async function ProjectsPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Search;
}) {
  const { locale } = await params;
  setSiteLocale(locale);
  return (
    <>
      <PageIntro name="projects" />
      <Suspense
        fallback={
          <div className="shell section min-h-96 animate-pulse bg-muted" />
        }
      >
        <Results searchParams={searchParams} locale={locale as Locale} />
      </Suspense>
      <CallToAction />
    </>
  );
}
async function Results({
  searchParams,
  locale,
}: {
  searchParams: Search;
  locale: Locale;
}) {
  const search = await searchParams;
  const read = (key: string) =>
    typeof search[key] === "string" ? (search[key] as string) : "";
  const category = read("category"),
    status = read("status"),
    query = read("q"),
    sort = read("sort") || "newest";
  const items = filterProjects({ category, status, query, sort, locale });
  const t = await getTranslations({ locale });
  return (
    <section className="shell pb-24">
      <form action={`/${locale}/projects`} className="filter-form">
        <div className="sm:col-span-2 lg:col-span-1">
          <label htmlFor="q">{t("projects.search")}</label>
          <input className="form-select" id="q" name="q" defaultValue={query} />
        </div>
        <div>
          <label htmlFor="category">{t("projects.category")}</label>
          <select
            className="form-select"
            name="category"
            id="category"
            defaultValue={category}
          >
            <option value="">{t("projects.all")}</option>
            {[
              "residential",
              "commercial",
              "industrial",
              "infrastructure",
              "renovation",
            ].map((c) => (
              <option key={c} value={c}>
                {t(`category.${c}`)}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="status">{t("projects.status")}</label>
          <select
            className="form-select"
            name="status"
            id="status"
            defaultValue={status}
          >
            <option value="">{t("projects.allStatuses")}</option>
            {["completed", "inProgress", "planned"].map((s) => (
              <option key={s} value={s}>
                {t(`status.${s}`)}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="sort">{t("projects.sort")}</label>
          <select
            className="form-select"
            name="sort"
            id="sort"
            defaultValue={sort}
          >
            <option value="newest">{t("projects.newest")}</option>
            <option value="oldest">{t("projects.oldest")}</option>
          </select>
        </div>
        <button className="button button-dark self-end" type="submit">
          {t("projects.apply")}
        </button>
      </form>
      <div className="mb-8 flex items-center justify-between border-b border-border py-5 text-sm">
        <p role="status">{t("projects.count", { count: items.length })}</p>
        <Link href="/projects" className="underline underline-offset-4">
          {t("projects.clear")}
        </Link>
      </div>
      {items.length ? (
        <div className="grid gap-x-8 gap-y-14 md:grid-cols-2">
          {items.map((p, i) => (
            <ProjectCard key={p.id} project={p} index={i} />
          ))}
        </div>
      ) : (
        <div className="border border-border px-6 py-24 text-center">
          <h2 className="text-2xl">{t("projects.empty")}</h2>
          <p className="mt-4 text-muted-foreground">
            {t("projects.emptyHint")}
          </p>
        </div>
      )}
    </section>
  );
}
