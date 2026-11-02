"use client";

import { Monitor, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function ThemeToggle() {
  const { setTheme } = useTheme();
  const t = useTranslations("theme");

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={<Button variant="outline" size="icon" />}
        aria-label={t("toggle")}
        className="relative size-11 rounded-full"
      >
        <Sun aria-hidden="true" className="size-4 dark:hidden" />
        <Moon aria-hidden="true" className="hidden size-4 dark:block" />
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        sideOffset={8}
        className="min-w-40 rounded-xl p-1.5 motion-reduce:animate-none"
      >
        <DropdownMenuItem
          onClick={() => setTheme("light")}
          className="gap-3 rounded-lg py-2.5"
        >
          <Sun aria-hidden="true" />
          {t("light")}
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => setTheme("dark")}
          className="gap-3 rounded-lg py-2.5"
        >
          <Moon aria-hidden="true" />
          {t("dark")}
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => setTheme("system")}
          className="gap-3 rounded-lg py-2.5"
        >
          <Monitor aria-hidden="true" />
          {t("system")}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
