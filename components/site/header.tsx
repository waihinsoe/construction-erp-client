"use client";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { Menu, ArrowUpRight, X } from "lucide-react";
import { useState } from "react";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetTitle,
  SheetClose,
} from "@/components/ui/sheet";
import { LanguageSwitcher } from "@/components/common/language-switcher";
import { ThemeToggle } from "@/components/common/theme-toggle";

const links = ["projects", "services", "about", "team"] as const;
export function Header() {
  const t = useTranslations();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  return (
    <header className="site-header">
      <div className="shell flex h-24 items-center justify-between gap-3 sm:gap-5">
        <Link href="/" className="brand" aria-label={t("nav.home")}>
          <span className="brand-mark" aria-hidden="true">
            N<span>↗</span>
          </span>
          <span className="max-[380px]:hidden">
            <strong>{t("brand")}</strong>
            <small>{t("brandSub")}</small>
          </span>
        </Link>
        <nav
          aria-label={t("footer.explore")}
          className="hidden items-center gap-8 lg:flex"
        >
          {links.map((key) => (
            <Link
              key={key}
              href={`/${key}`}
              aria-current={pathname.startsWith(`/${key}`) ? "page" : undefined}
              className="nav-link"
            >
              {t(`nav.${key}`)}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2 sm:gap-3">
          <LanguageSwitcher />
          <ThemeToggle />
          <Link
            href="/contact"
            className="button button-amber hidden md:inline-flex"
          >
            {t("common.start")}
            <ArrowUpRight size={16} />
          </Link>
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger
              className="icon-button lg:hidden"
              aria-label={t("common.menu")}
            >
              <Menu />
            </SheetTrigger>
            <SheetContent showCloseButton={false} className="p-7">
              <SheetTitle>{t("footer.explore")}</SheetTitle>
              <SheetClose
                aria-label={t("common.close")}
                className="icon-button absolute right-5 top-5"
              >
                <X />
              </SheetClose>
              <nav className="mt-8 flex flex-col gap-7">
                {(["home", ...links, "contact"] as const).map((key) => (
                  <Link
                    href={key === "home" ? "/" : `/${key}`}
                    onClick={() => setOpen(false)}
                    key={key}
                    className="text-xl"
                  >
                    {t(`nav.${key}`)}
                  </Link>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
