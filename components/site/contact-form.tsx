"use client";
import { useState } from "react";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ArrowUpRight, CheckCircle2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
const categories = [
  "residential",
  "commercial",
  "industrial",
  "infrastructure",
  "renovation",
] as const;
export function ContactForm() {
  const t = useTranslations();
  const [complete, setComplete] = useState(false);
  const schema = z.object({
    name: z
      .string()
      .trim()
      .min(1, t("contact.required"))
      .max(100, t("contact.max")),
    email: z.email(t("contact.invalidEmail")).max(254, t("contact.max")),
    phone: z.string().max(40, t("contact.max")),
    type: z.enum(categories, { error: t("contact.required") }),
    budget: z.string().max(100, t("contact.max")),
    location: z.string().max(200, t("contact.max")),
    message: z
      .string()
      .trim()
      .min(20, t("contact.messageMin"))
      .max(5000, t("contact.max")),
    consent: z.boolean().refine(Boolean, t("contact.consentError")),
  });
  type Values = z.infer<typeof schema>;
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<Values>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      budget: "",
      location: "",
      message: "",
      consent: false,
    },
  });
  function error(key: keyof Values) {
    return errors[key] ? (
      <p id={`${key}-error`} className="mt-2 text-sm text-red-700" role="alert">
        {errors[key]?.message}
      </p>
    ) : null;
  }
  return (
    <form
      noValidate
      onChange={() => setComplete(false)}
      onSubmit={handleSubmit(async () => {
        setComplete(true);
      })}
      className="space-y-7"
    >
      <p className="border-l-2 border-amber bg-muted p-4 text-sm leading-7">
        {t("contact.demo")}
      </p>
      <div className="grid gap-6 sm:grid-cols-2">
        {(["name", "email", "phone", "location", "budget"] as const).map(
          (key) => (
            <div key={key}>
              <label htmlFor={key} className="mb-2 block text-sm">
                {t(`contact.${key}`)}
              </label>
              <Input
                id={key}
                type={
                  key === "email" ? "email" : key === "phone" ? "tel" : "text"
                }
                autoComplete={
                  key === "name"
                    ? "name"
                    : key === "email"
                      ? "email"
                      : key === "phone"
                        ? "tel"
                        : "off"
                }
                {...register(key)}
                aria-invalid={!!errors[key]}
                aria-describedby={
                  errors[key]
                    ? `${key}-error`
                    : key === "budget"
                      ? "budget-hint"
                      : undefined
                }
                className="h-12 rounded-none"
              />
              {key === "budget" && (
                <p
                  id="budget-hint"
                  className="mt-2 text-xs text-muted-foreground"
                >
                  {t("contact.budgetHint")}
                </p>
              )}
              {error(key)}
            </div>
          ),
        )}
        <div>
          <label htmlFor="type" className="mb-2 block text-sm">
            {t("contact.type")}
          </label>
          <select
            id="type"
            {...register("type")}
            aria-invalid={!!errors.type}
            aria-describedby={errors.type ? "type-error" : undefined}
            className="form-select"
          >
            <option value="">{t("contact.select")}</option>
            {categories.map((c) => (
              <option key={c} value={c}>
                {t(`category.${c}`)}
              </option>
            ))}
          </select>
          {error("type")}
        </div>
      </div>
      <div>
        <label htmlFor="message" className="mb-2 block text-sm">
          {t("contact.message")}
        </label>
        <Textarea
          id="message"
          rows={6}
          {...register("message")}
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? "message-error" : undefined}
          className="rounded-none"
        />
        {error("message")}
      </div>
      <div>
        <label className="flex items-start gap-3 text-sm leading-6">
          <input
            type="checkbox"
            {...register("consent")}
            aria-invalid={!!errors.consent}
            aria-describedby={errors.consent ? "consent-error" : undefined}
            className="mt-1 size-4 accent-amber"
          />
          {t("contact.consent")}
        </label>
        {error("consent")}
      </div>
      <button
        className="button button-dark"
        disabled={isSubmitting}
        type="submit"
      >
        {t(isSubmitting ? "contact.submitting" : "contact.submit")}
        <ArrowUpRight size={18} />
      </button>
      {complete && (
        <p
          role="status"
          className="flex items-start gap-3 border border-green-700/30 bg-green-50 p-5 text-sm leading-7 text-green-900"
        >
          <CheckCircle2 className="mt-1 shrink-0" size={18} />
          {t("contact.success")}
        </p>
      )}
    </form>
  );
}
