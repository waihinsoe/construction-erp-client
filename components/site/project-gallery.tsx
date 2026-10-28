"use client";
import { useState } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";
import { useTranslations } from "next-intl";
import { Expand } from "lucide-react";
import { useReducedMotion } from "motion/react";
import "yet-another-react-lightbox/styles.css";
const Lightbox = dynamic(() => import("yet-another-react-lightbox"), {
  ssr: false,
});
export function ProjectGallery({
  images,
  title,
}: {
  images: string[];
  title: string;
}) {
  const [index, setIndex] = useState(-1);
  const t = useTranslations();
  const reduced = useReducedMotion();
  return (
    <>
      <div className="grid gap-4 sm:grid-cols-3">
        {images.map((src, i) => (
          <button
            key={`${src}-${i}`}
            onClick={() => setIndex(i)}
            className="group relative aspect-[4/3] overflow-hidden"
            aria-label={t("projects.openImage", { number: i + 1 })}
          >
            <Image
              src={src}
              alt={`${title} — ${i + 1}`}
              fill
              sizes="(max-width:640px) 100vw, 33vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <span className="absolute bottom-3 right-3 bg-background p-2">
              <Expand size={18} />
            </span>
          </button>
        ))}
      </div>
      {index >= 0 && (
        <Lightbox
          open
          index={index}
          close={() => setIndex(-1)}
          slides={images.map((src, i) => ({ src, alt: `${title} — ${i + 1}` }))}
          labels={{
            Next: t("common.next"),
            Previous: t("common.previous"),
            Close: t("common.close"),
            Slide: t("gallery.slide"),
            Carousel: t("gallery.carousel"),
            Lightbox: t("gallery.lightbox"),
            "Photo gallery": t("gallery.photos"),
            "{index} of {total}": t.raw("gallery.position"),
          }}
          animation={reduced ? { fade: 0, swipe: 0 } : undefined}
        />
      )}
    </>
  );
}
