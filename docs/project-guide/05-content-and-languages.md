# 05 — Content and languages

## 1. Two places contain translated text

| Kind of text                                                               | Where to edit                                              |
| -------------------------------------------------------------------------- | ---------------------------------------------------------- |
| Buttons, navigation, headings, validation, accessibility labels, metadata  | `messages/en.json`, `messages/ja.json`, `messages/my.json` |
| Project titles/descriptions, biographies, services, timeline, testimonials | `lib/content/*.ts` records with `en`, `ja`, `my` fields    |

A localized field follows this structure:

```ts
{ en: "Example", ja: "例", my: "ဥပမာ" }
```

The `Localized` type requires every supported language. Translation keys must match across message files. Proper nouns can retain their original spelling when appropriate, but missing translations should not silently be replaced with unrelated text.

## 2. Add a project

1. Open [`lib/content/projects.ts`](../../lib/content/projects.ts).
2. Copy one existing complete record inside the `projects` array.
3. Give it a new unique ID and URL-safe slug, such as `garden-house`. Avoid changing published slugs without a redirect plan.
4. Translate its title, summary, description, location, scope, challenges, and solutions in all three languages.
5. Choose a supported category and status from [`types/content.ts`](../../types/content.ts).
6. Supply an ISO date such as `2026-04-01` for `startDate`; include `completionDate` only when appropriate.
7. Add actual image files under `public/images` and reference them as `/images/your-file.jpg`.
8. Set `teamMemberIds` to IDs that already exist in the team array.
9. Set `featured: true` only if the homepage should feature it.
10. Rebuild, visit its detail page, and update affected tests before rerunning them.

The detail page and sitemap entry derive from the data. No extra page file is needed. The homepage currently has an editorial grid designed around three featured projects; review its layout if you increase that number. Its hero also selects a featured project explicitly, so editing the array order requires reviewing that presentation.

**Test reminder:** the suite currently expects six projects and specific filter-result counts. A seventh project can legitimately change these expectations. Update them deliberately, retaining meaningful assertions.

## 3. Add a team member

Edit [`lib/content/team.ts`](../../lib/content/team.ts). Include a unique ID and slug, translated name, role, biography and expertise, and a portrait path.

Then add the member’s ID to the appropriate project records. The profile’s associated-project list is derived by `getMemberProjects`; do not write a second independent assignment list. A profile with no assignments displays a translated notice.

The current homepage and about page preview the first four profiles. Review ordering when adding leadership records. Optional `socialLinks` exist in the type, but the current card does not display them automatically.

## 4. Add a milestone, service, or testimonial

- **Milestone:** edit `milestones.ts`; provide an ID, numeric year, translated title/description, and image. `getMilestones` sorts by year. The home and about pages reuse the timeline.
- **Service:** edit `services.ts`; keep ID/slug unique and select one of the existing icon keys. Detail links point to section anchors on `/services`, not separate service detail pages.
- **Testimonial:** edit `testimonials.ts`; translate the name, organization, and quote. An optional `projectId` currently resolves using the project slug; existing IDs and slugs match. Keep them aligned or update that lookup if you separate them.

Keep sample labels until the records have been replaced with real, approved material. Adding data may change assertions about sample counts.

## 5. Change a UI message

For an existing label, find its namespace/key in the message files and edit all three translations. Components typically call `t("contact.submit")` rather than embedding a literal label.

For a new label:

1. Add the same key in every locale file.
2. Use `useTranslations` in an interactive component or `getTranslations` in an async server component.
3. Preserve message placeholders, such as `{count}`, `{number}`, or `{year}`.
4. Test long text on a narrow screen and verify accessibility labels as well as visible text.

Some messages use ICU number/plural syntax, such as `{count, number}`. The gallery position message uses literal `{index}` and `{total}` placeholders consumed by the lightbox; the component reads it with `t.raw`. Do not remove those placeholders.

Key parity checks detect missing keys, but they do **not** prove that a translation is linguistically correct. Human review remains necessary.

## 6. Language and typography wiring

- `i18n/routing.ts`: supported locales and the default.
- `i18n/request.ts`: loads a locale’s message file.
- `i18n/locale.ts`: validates locale values before rendering.
- `i18n/navigation.ts`: locale-aware links and navigation helpers.
- `proxy.ts`: locale negotiation for incoming page requests.
- `components/site/header.tsx`: language selector.
- `app/[locale]/layout.tsx`: document language, fonts, and provider.
- `app/[locale]/globals.css`: language-specific spacing and typography.

Myanmar uses Noto Sans Myanmar; the theme adjusts line height and letter spacing for its script. Dates and some numbers use locale-aware formatting, but some decorative indices and timeline years remain literal numbers. Full numeral-format consistency is a possible polish task.

## 7. Replace images

Use approved local assets with sensible dimensions and compression. Check thumbnail, hero, gallery, and portrait crops separately. Keep image descriptions meaningful in every language. Source references for the current placeholders are in [image-sources.md](../image-sources.md).

Changing `cutoutImage` alone will not display a cutout: rendering support and responsive styling must be added. Four placeholder portrait photos are currently reused across eight fictional profiles.

Next: [06 — Testing](06-testing.md).
