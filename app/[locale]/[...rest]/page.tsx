import { setSiteLocale } from "@/i18n/locale";
import { notFound } from "next/navigation";

export default async function UnknownPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  setSiteLocale((await params).locale);
  notFound();
}
