"use client";
import { useTranslations } from "next-intl";
export default function ErrorPage({ reset }: { reset: () => void }) {
  const t = useTranslations("common");
  return (
    <section className="shell py-32">
      <h1 className="text-3xl">{t("error")}</h1>
      <button onClick={reset} className="button button-dark mt-8">
        {t("retry")}
      </button>
    </section>
  );
}
