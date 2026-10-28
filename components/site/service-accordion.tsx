"use client";
import Image from "next/image";
import { useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { motion, useReducedMotion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { Link } from "@/i18n/navigation";
import { services } from "@/lib/content/data";
import type { Locale } from "@/types/content";
export function ServiceAccordion() {
  const locale = useLocale() as Locale;
  const t = useTranslations();
  const [active, setActive] = useState(services[0].id);
  const reduced = useReducedMotion();
  const service = services.find((s) => s.id === active) ?? services[0];
  return (
    <div className="grid items-stretch gap-10 lg:grid-cols-2 lg:gap-20">
      <div className="relative hidden min-h-[480px] overflow-hidden lg:block">
        <motion.div
          key={service.id}
          className="absolute inset-0"
          initial={reduced ? false : { opacity: 0.5 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.45 }}
        >
          <Image
            src={service.image}
            alt={service.title[locale]}
            fill
            sizes="50vw"
            className="object-cover"
          />
        </motion.div>
        <span className="absolute bottom-6 left-6 bg-background px-4 py-2 text-xs">
          {t("common.photo")}
        </span>
      </div>
      <Accordion
        value={[active]}
        onValueChange={(value) => {
          if (value[0]) setActive(String(value[0]));
        }}
      >
        {services.map((s, i) => (
          <AccordionItem
            key={s.id}
            value={s.id}
            className="border-t border-border"
          >
            <AccordionTrigger className="items-center rounded-none py-6 text-lg font-normal hover:no-underline">
              <span className="mr-5 text-xs text-muted-foreground">
                0{i + 1}
              </span>
              <span className="mr-auto">{s.title[locale]}</span>
            </AccordionTrigger>
            <AccordionContent className="h-auto pb-7 pl-9">
              <p className="max-w-md leading-7 text-muted-foreground">
                {s.description[locale]}
              </p>
              <div className="relative mb-5 mt-4 aspect-video lg:hidden">
                <Image
                  src={s.image}
                  alt={s.title[locale]}
                  fill
                  sizes="100vw"
                  className="object-cover"
                />
              </div>
              <Link
                href={`/services#${s.slug}`}
                className="mt-5 inline-flex items-center gap-3 text-sm"
              >
                {t("common.learn")}
                <ArrowUpRight size={16} />
              </Link>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
