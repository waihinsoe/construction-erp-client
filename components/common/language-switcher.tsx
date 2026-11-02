"use client";

import { useTransition } from "react";
import { hasLocale, useLocale, useTranslations } from "next-intl";
import { GB, JP, MM } from "country-flag-icons/react/3x2";
import { LoaderCircle } from "lucide-react";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const flags = { en: GB, ja: JP, my: MM };

export function LanguageSwitcher() {
  const locale = useLocale();
  const t = useTranslations();
  const pathname = usePathname();
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const Flag =
    flags[hasLocale(routing.locales, locale) ? locale : routing.defaultLocale];

  function changeLanguage(nextLocale: string | null) {
    if (!hasLocale(routing.locales, nextLocale) || nextLocale === locale)
      return;

    startTransition(() => {
      router.replace(pathname + window.location.search + window.location.hash, {
        locale: nextLocale,
        scroll: false,
      });
    });
  }

  return (
    <Select value={locale} onValueChange={changeLanguage} disabled={pending}>
      <SelectTrigger
        aria-label={t("common.language")}
        aria-busy={pending}
        className="w-32 shrink-0 cursor-pointer rounded-full border-border bg-background px-3 text-xs font-medium shadow-xs hover:bg-muted data-[size=default]:h-11 max-sm:w-16"
      >
        <SelectValue>
          {pending ? (
            <LoaderCircle
              aria-hidden="true"
              className="size-5 animate-spin text-muted-foreground motion-reduce:animate-none"
            />
          ) : (
            <Flag
              aria-hidden="true"
              className="size-5 h-3.5 rounded-xs shadow-sm ring-1 ring-foreground/10"
            />
          )}
          <span className="max-sm:sr-only" lang={locale}>
            {t(`languages.${locale}`)}
          </span>
        </SelectValue>
      </SelectTrigger>
      <SelectContent
        align="end"
        alignItemWithTrigger={false}
        sideOffset={8}
        className="min-w-44 rounded-xl p-1 shadow-lg motion-reduce:animate-none"
      >
        <SelectGroup>
          {routing.locales.map((language) => {
            const ItemFlag = flags[language];
            return (
              <SelectItem
                key={language}
                value={language}
                className="cursor-pointer rounded-lg py-2.5 pl-3 [&_[data-slot]]:items-center"
              >
                <span className="flex items-center gap-3" lang={language}>
                  <ItemFlag
                    aria-hidden="true"
                    className="size-5 h-3.5 rounded-xs shadow-sm ring-1 ring-foreground/10"
                  />
                  {t(`languages.${language}`)}
                </span>
              </SelectItem>
            );
          })}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
