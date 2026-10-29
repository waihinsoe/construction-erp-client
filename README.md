# Northline portfolio

A fictional construction and architecture website built from `docs/roadmap.md`. All company information, projects, professionals, milestones, and testimonials are explicitly demo content. Photographs illustrate concepts; they are not evidence of completed work.

## Beginner documentation

Read the numbered [project guide](docs/project-guide/README.md) for use cases, architecture, content editing, all three languages, test implementation and commands, troubleshooting, and remaining work.

## Run locally

```bash
pnpm install
pnpm dev
```

Open http://localhost:3000. Locale routing redirects to English (`/en`), Japanese (`/ja`), or Myanmar (`/my`). The header language selector preserves the current route, query parameters, and hash.

```bash
pnpm lint
pnpm exec tsc --noEmit
pnpm build
pnpm start
```

The project uses Next.js 16 Cache Components, next-intl, Tailwind v4, existing shadcn/Base UI primitives, Motion, Embla Carousel, Yet Another React Lightbox, React Hook Form, and Zod. Manrope and Noto Sans Myanmar are locally hosted through Fontsource packages.

## Edit content

- `lib/content/projects.ts`: add a typed project with a unique `id` and `slug`, translated text in `en`, `ja`, and `my`, dates, category/status, local images, and valid `teamMemberIds`. Its detail route and sitemap entry are generated automatically. Set `featured: true` to include it on the homepage.
- `lib/content/team.ts`: add a unique member ID and slug, translated name/role/biography/expertise, and a portrait. Reference the ID from project records. Associated projects resolve automatically; do not duplicate people inside projects.
- `lib/content/milestones.ts`: add a unique ID, numeric year, translated title/description, and image. The shared home/about timeline sorts records by year.
- `lib/content/services.ts` and `testimonials.ts`: edit services and explicitly labeled sample feedback.
- `types/content.ts`: shared contracts. `lib/content/queries.ts`: the local content access layer to replace with CMS/API queries later.
- `messages/en.json`, `ja.json`, `my.json`: UI, accessibility, validation, and metadata translations. Keep identical keys and ICU placeholders across locales.
- `i18n/routing.ts`: supported locales. When adding a language, extend `Locale`, translate every localized content field, add its messages and selector option, and test typography.

Images are stored under `public/images/`; their sources are listed in `docs/image-sources.md`. Replace them with approved company assets before launch. The full-photo presentation is the roadmap's fallback for unavailable transparent building cutouts. `cutoutImage` is reserved in the project contract; this version displays photography.

## Browser checks

Build and start a production server in one terminal:

```bash
pnpm build
pnpm start --port 3100
```

Then run:

```bash
pnpm exec playwright test
```

The test configuration uses installed Chrome at `/opt/google/chrome/chrome`. Set `PLAYWRIGHT_CHROME_PATH` to your Chrome executable on another machine. Tests cover required routes in all three languages, data relationships, translation parity, URL filters, locale switching, accordion, gallery keyboard controls, demo form validation, mobile overflow, reduced motion, image loading, localized 404s, and SEO endpoints. Screenshots are written to `/tmp/northline-desktop.png` and `/tmp/northline-mobile.png`.

## Before publishing

Set `NEXT_PUBLIC_SITE_URL` in `.env.local` to the real deployment origin for sitemap and Open Graph URLs. Without it, URLs use `http://localhost:3000` and search-engine indexing is disabled. Do not enable indexing until demo content has been replaced and approved.

The consultation form deliberately validates only in the browser; it sends and stores nothing. Connect an email/API service, server-side validation, rate limiting/spam protection, and a privacy policy before accepting real inquiries. Add verified contact details, office location, and social links; the demo does not invent these. No map or company structured data is emitted without verified business information.

The site uses an intentional ivory/charcoal visual theme; no theme switcher was configured in the starter. Motion respects reduced-motion preferences. Lighthouse scores have not been benchmarked.
