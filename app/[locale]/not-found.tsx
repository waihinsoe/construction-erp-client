import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
export default async function NotFound() {
  const t = await getTranslations("notFound");
  return (
    <section className="shell py-32">
      <p className="eyebrow">404</p>
      <h1 className="page-title">{t("title")}</h1>
      <p className="section-description">{t("description")}</p>
      <Link href="/" className="button button-dark mt-8">
        {t("back")}
      </Link>
    </section>
  );
}
