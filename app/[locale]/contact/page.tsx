import { setSiteLocale } from "@/i18n/locale";
import { getTranslations } from "next-intl/server";
import { PageIntro } from "@/components/site/content-blocks";
import { ContactForm } from "@/components/site/contact-form";
import { pageMetadata } from "@/lib/metadata";
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  return pageMetadata((await params).locale, "contact");
}
export default async function Contact({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  setSiteLocale((await params).locale);
  const t = await getTranslations();
  return (
    <>
      <PageIntro name="contact" />
      <section className="shell grid gap-14 pb-24 lg:grid-cols-[2fr_1fr]">
        <ContactForm />
        <aside className="space-y-10 border-t border-border pt-8 lg:border-l lg:border-t-0 lg:pl-10 lg:pt-0">
          <div>
            <h2 className="mb-4 text-xl">{t("footer.connect")}</h2>
            <p className="text-sm leading-7 text-muted-foreground">
              {t("footer.contactNote")}
            </p>
          </div>
          <div>
            <h2 className="mb-4 text-xl">{t("contact.privacy")}</h2>
            <p className="text-sm leading-7 text-muted-foreground">
              {t("contact.privacyText")}
            </p>
          </div>
        </aside>
      </section>
    </>
  );
}
