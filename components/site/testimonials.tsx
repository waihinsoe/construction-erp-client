"use client";
import useEmblaCarousel from "embla-carousel-react";
import { useLocale, useTranslations } from "next-intl";
import { ArrowLeft, ArrowRight, Quote } from "lucide-react";
import { testimonials } from "@/lib/content/data";
import { getProjectBySlug } from "@/lib/content/queries";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/types/content";
export function Testimonials() {
  const [ref, api] = useEmblaCarousel({ loop: true });
  const locale = useLocale() as Locale;
  const t = useTranslations();
  return (
    <div role="region" aria-label={t("home.testimonialsTitle")}>
      <div className="overflow-hidden" ref={ref}>
        <div className="flex touch-pan-y">
          {testimonials.map((item) => {
            const project = getProjectBySlug(item.projectId ?? "");
            return (
              <figure key={item.id} className="min-w-0 flex-[0_0_100%] pr-6">
                <Quote className="mb-6 text-amber" size={32} />
                <blockquote className="max-w-4xl text-2xl font-light leading-relaxed md:text-4xl">
                  {item.quote[locale]}
                </blockquote>
                <figcaption className="mt-8 text-sm">
                  <p>{item.clientName[locale]}</p>
                  <p className="mt-2 text-muted-foreground">
                    {item.organization[locale]}
                  </p>
                  {project && (
                    <Link
                      href={`/projects/${project.slug}`}
                      className="mt-3 inline-block underline underline-offset-4"
                    >
                      {project.title[locale]}
                    </Link>
                  )}
                </figcaption>
              </figure>
            );
          })}
        </div>
      </div>
      <div className="mt-8 flex justify-end gap-3">
        <button
          className="icon-button border border-border"
          onClick={() => api?.scrollPrev()}
          aria-label={t("common.previous")}
        >
          <ArrowLeft size={18} />
        </button>
        <button
          className="icon-button border border-border"
          onClick={() => api?.scrollNext()}
          aria-label={t("common.next")}
        >
          <ArrowRight size={18} />
        </button>
      </div>
    </div>
  );
}
