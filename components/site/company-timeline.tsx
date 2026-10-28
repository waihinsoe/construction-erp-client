"use client";
import { useRef, useState } from "react";
import Image from "next/image";
import { useLocale } from "next-intl";
import {
  motion,
  useScroll,
  useMotionValueEvent,
  useReducedMotion,
} from "motion/react";
import { getMilestones } from "@/lib/content/queries";
import type { Locale } from "@/types/content";
const milestones = getMilestones();
export function CompanyTimeline() {
  const locale = useLocale() as Locale;
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start center", "end center"],
  });
  useMotionValueEvent(scrollYProgress, "change", (v) =>
    setActive(
      Math.min(milestones.length - 1, Math.floor(v * milestones.length)),
    ),
  );
  return (
    <div ref={ref} className="relative grid gap-12 lg:grid-cols-2 lg:gap-24">
      <div className="hidden self-start lg:sticky lg:top-32 lg:block">
        <motion.div
          key={active}
          initial={reduced ? false : { opacity: 0.65 }}
          animate={{ opacity: 1 }}
          className="relative aspect-[4/5]"
        >
          <Image
            src={milestones[active].image}
            alt={milestones[active].title[locale]}
            fill
            sizes="45vw"
            className="object-cover"
          />
          <span className="absolute bottom-7 left-7 text-7xl font-light text-white">
            {milestones[active].year}
          </span>
        </motion.div>
      </div>
      <div className="relative">
        <div className="absolute bottom-0 left-0 top-0 w-px bg-white/20" />
        <motion.div
          aria-hidden
          className="absolute bottom-0 left-0 top-0 w-px origin-top bg-amber"
          style={{ scaleY: reduced ? 1 : scrollYProgress }}
        />
        {milestones.map((m, i) => (
          <article
            key={m.id}
            className={`timeline-item relative py-10 pl-10 ${active === i ? "is-active" : ""}`}
          >
            <span className="timeline-dot" />
            <p className="mb-4 text-sm text-amber">{m.year}</p>
            <h3 className="mb-4 text-2xl font-normal">{m.title[locale]}</h3>
            <p className="max-w-sm text-sm leading-7 text-white/60">
              {m.description[locale]}
            </p>
            <div className="relative mt-6 aspect-video lg:hidden">
              <Image
                src={m.image}
                alt={m.title[locale]}
                fill
                sizes="90vw"
                className="object-cover"
              />
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
