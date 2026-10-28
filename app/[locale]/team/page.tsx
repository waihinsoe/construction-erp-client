import { setSiteLocale } from "@/i18n/locale";

import { team } from "@/lib/content/data";
import {
  PageIntro,
  TeamCard,
  CallToAction,
} from "@/components/site/content-blocks";
import { pageMetadata } from "@/lib/metadata";
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  return pageMetadata((await params).locale, "team");
}
export default async function Team({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  setSiteLocale((await params).locale);
  return (
    <>
      <PageIntro name="team" />
      <section className="shell grid gap-x-8 gap-y-14 pb-24 sm:grid-cols-2 lg:grid-cols-4">
        {team.map((m) => (
          <TeamCard key={m.id} member={m} />
        ))}
      </section>
      <CallToAction />
    </>
  );
}
