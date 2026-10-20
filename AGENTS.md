<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Frontend Project — Agent Guidelines

## Purpose and Scope

This repository is a reusable, internationalized frontend application built with Next.js. These rules apply to every feature unless a more specific project instruction overrides them.

- Focus on UI, user experience, client-side interactions, and integration with external services.
- Backend APIs, authentication providers, authorization, and domain-specific business rules may live in separate services. Do not invent or duplicate them in the frontend.
- Follow existing code and configuration before introducing new patterns or dependencies.
- Keep the project generic: do not assume a specific industry, product, or domain.

## Tech Stack

| Layer | Technology |
| --- | --- |
| Framework | Next.js 16 (App Router) |
| Language | TypeScript (strict mode) |
| Styling | Tailwind CSS v4 |
| UI | shadcn/ui with Radix UI primitives |
| Icons | lucide-react |
| Internationalization | next-intl |
| Client state | Zustand |
| Server state | TanStack React Query v5 |
| HTTP client | Axios |
| Forms and validation | React Hook Form + Zod |
| Notifications | Sonner |
| Date handling | date-fns, with locale-aware formatting |
| Animation | Framer Motion, when already installed/configured |
| Theme | next-themes |
| Package manager | pnpm |

Do not install an alternative package for a concern already handled by this stack without a clear reason.

## Project Structure

```text
project-name/
├── app/
│   ├── globals.css
│   └── [locale]/
│       ├── layout.tsx
│       ├── provider.tsx
│       ├── loading.tsx
│       ├── not-found.tsx
│       ├── (auth)/
│       │   ├── login/page.tsx
│       │   └── register/page.tsx
│       └── (main)/
│           ├── layout.tsx
│           ├── page.tsx
│           └── example/
│               ├── page.tsx
│               └── [id]/page.tsx
├── api/
│   ├── axios-instance.ts
│   └── example.ts
├── components/
│   ├── ui/
│   ├── layout/
│   ├── card/
│   │   └── example-card.tsx
│   └── common/
│       └── empty-state.tsx
├── config/
│   └── config.ts
├── hooks/
│   └── use-example.ts
├── i18n/
│   ├── routing.ts
│   ├── navigation.ts
│   └── request.ts
├── lib/
│   ├── utils.ts
│   └── constants.ts
├── messages/
│   ├── en.json
│   └── ja.json
├── store/
│   └── use-ui-store.ts
├── types/
│   ├── example.ts
│   ├── user.ts
│   └── response-model.ts
├── proxy.ts
├── next.config.ts
└── .env.local
```

This is a reference structure, not a requirement to create unused files or routes. Use route groups only when they meaningfully separate layouts; their names do not appear in URLs. Keep application pages and layouts beneath `app/[locale]/` so they participate in locale-aware routing. Follow Next.js file conventions for special filenames.

## File and Symbol Naming

- Use lowercase **kebab-case** for custom file and folder names: `example-card.tsx`, `use-example.ts`, `axios-instance.ts`.
- Do not use PascalCase or camelCase filenames: `ExampleCard.tsx` and `useExample.ts` are not allowed.
- Preserve required framework/tool names such as `page.tsx`, `layout.tsx`, `proxy.ts`, `package.json`, and `AGENTS.md`.
- Use **PascalCase** for React component and TypeScript type/interface names; use **camelCase** for variables, functions, and hooks.
- Keep names descriptive and domain-neutral in shared examples. Actual feature names should reflect the feature being implemented.

## Component Architecture

- `components/ui/`: reusable shadcn/ui primitives; prefer using the generated component as intended.
- `components/layout/`: shared headers, footers, navigation, and layout shells.
- `components/card/`: reusable card patterns, such as `example-card.tsx`.
- `components/common/`: generic empty states, error states, loading placeholders, and shared widgets.
- Keep components small, accessible, composable, and focused on a single responsibility.
- Check existing components before building another component with the same purpose.
- Prefer passing explicit, typed props to hidden dependencies or unnecessary global state.

## Next.js Server and Client Components

- Default to Server Components for route pages, layouts, and non-interactive rendering.
- Add `'use client'` only when a component requires hooks, event handlers, browser-only behavior, client state, animations, or client providers.
- Keep Client Component boundaries small. Do not mark an entire page as client-side solely because one child is interactive.
- Do not access browser APIs during server rendering.
- Use Next.js built-ins such as `next/image`, `next/link` where appropriate, and metadata APIs for page metadata.
- Avoid unnecessary waterfalls and client-side fetching when server rendering is more appropriate; follow existing data-fetching architecture.

## Internationalization (`next-intl`)

- All user-facing application routes should be located under `app/[locale]/`.
- Configure supported locales and the default locale centrally in `i18n/routing.ts`.
- Configure locale-specific request data in `i18n/request.ts` and locale-aware navigation helpers in `i18n/navigation.ts`.
- Use root-level `proxy.ts` for `next-intl` locale negotiation and redirects in Next.js 16. Do not create deprecated `middleware.ts` for new projects.
- Store translated UI messages in `messages/<locale>.json`. Keep key names and namespaces consistent across locales.
- Never hardcode user-facing labels, headings, validation messages, accessibility labels, toasts, or error messages in components when translations are required.
- Use `useTranslations` in supported components and `getTranslations` in async server contexts.
- Prefer navigation helpers from `i18n/navigation.ts` for locale-aware links, navigation, and language switching. Preserve the current route and relevant parameters when switching locales.
- Validate requested locales and handle unsupported ones with the configured not-found behavior.
- Format numbers, currency, dates, and times with locale-aware APIs; do not assume all locales share formatting conventions.
- Set document language and handle text direction where applicable.
- Localize metadata and accessibility text as well as visible UI text.

## Data Flow

```text
External API response
         ↓
    types/ (contracts)
         ↓
    api/ (requests)
         ↓
    hooks/ (TanStack Query)
         ↓
    pages / components
```

Typical feature implementation order: define types, create API functions, add query/mutation hooks, build reusable components, then wire up routes.

## API Layer

- Keep backend requests in `api/`, organized by feature/domain.
- Reuse `api/axios-instance.ts` for base URL, shared headers, interceptors, and normalized error handling.
- Do not make ad hoc Axios requests directly inside presentation components.
- Read public configuration through `config/config.ts`; keep secrets on the server and never expose them through `NEXT_PUBLIC_` variables.
- Treat API responses as untrusted input and validate where necessary. Keep transport types and UI-facing types explicit.
- Handle loading, empty, unauthorized, and failure states consistently.

## State Management

### TanStack React Query — Server State

- Use TanStack Query for remote lists, details, mutations, caching, invalidation, and asynchronous request status in interactive client features.
- Encapsulate query logic in hooks such as `hooks/use-example.ts`.
- Use stable, structured query keys and invalidate relevant queries after mutations.
- Do not duplicate query results in Zustand without a concrete need.

### Zustand — Client State

- Use Zustand for cross-component UI state or transient client preferences that cannot be handled cleanly by local state.
- Prefer component state for local-only interactions and URL search parameters for shareable filter/search state.
- Do not use a client store as a security or authorization boundary.
- Avoid persisting credentials or sensitive tokens in browser storage by default.

## Forms and Validation

- Use React Hook Form with Zod for forms that need structured validation.
- Derive types from schemas when practical.
- Use existing shadcn/ui form-related primitives and accessible error descriptions.
- Localize labels, placeholders, helper text, and validation messages.
- Show submission progress, prevent accidental duplicate submissions, and provide actionable error feedback.

## Animation and Motion

- If **Framer Motion is already included in the preset/project**, use it for purposeful component entrances, exits, layout changes, dialogs, interactive feedback, and route-specific transitions where needed.
- Do **not** introduce Framer Motion solely to animate trivial hover or color changes; prefer Tailwind/CSS transitions for those.
- If Framer Motion is not installed, use existing styling tools unless the feature genuinely requires a motion library and adding one is approved.
- Keep motion subtle, responsive, and consistent. Avoid excessive bouncing, parallax, distracting loops, and unnecessary full-page transitions.
- Animate `opacity` and `transform` where possible to minimize layout work; avoid animating expensive layout properties unnecessarily.
- Respect `prefers-reduced-motion`. When using Framer Motion, use its reduced-motion support (`MotionConfig` or `useReducedMotion`) as appropriate.
- Keep interactive content usable before, during, and after an animation. Never block critical actions behind animations.
- Keep animation logic in small Client Components rather than converting whole server-rendered routes into Client Components.
- Avoid hydration mismatches and surprising initial animations.

## Theme, Styling, and UI

- Use Tailwind CSS utilities, shadcn/ui components, and theme tokens/CSS variables.
- Support the existing `next-themes` setup when present; keep light and dark styles accessible.
- Follow the project's chosen shadcn preset for colors, border radius, density, typography, and component styles.
- Avoid inline styles for ordinary layout or styling, scattered CSS files, magic numbers, and duplicate component implementations.
- Use `lucide-react` icons consistently, with accessible labels where needed.
- Prioritize visual hierarchy, spacing consistency, responsive layouts, readable contrast, keyboard access, and visible focus states.

## Loading, Empty, and Error States

- Prefer skeletons that resemble the final layout over generic `Loading...` text or blocking full-page spinners.
- Provide appropriate empty states with helpful next actions.
- Show clear, localized error messages with retry actions where possible.
- Use Sonner for short-lived feedback and shadcn/ui alert/dialog components for persistent or consequential states.
- Prevent layout shifts where practical, especially around images and asynchronous content.

## Types and Strictness

- Use strict TypeScript. Avoid `any`; prefer `unknown` plus narrowing when types are not known.
- Place shared contracts and types in `types/`; keep small component-only types beside their components.
- Export types and interfaces explicitly, for example `export interface Example { id: string; title: string }`.
- Do not use ambient `declare interface` for regular application models.
- Handle optional values, errors, and asynchronous states explicitly.

## Environment and Configuration

- Use `.env.local` for local environment values; never commit credentials.
- Example public variable: `NEXT_PUBLIC_API_BASE_URL=https://api.example.com`.
- Read environment values through `config/config.ts` to centralize validation and defaults.
- Remember: anything prefixed `NEXT_PUBLIC_` is exposed to the browser bundle.

## Development Commands

```bash
pnpm dev             # Start development server
pnpm build           # Create production build
pnpm start           # Start production server
pnpm lint            # Run the configured linter
pnpm exec tsc --noEmit # Type-check the project
```

## Implementation Checklist for Agents

1. Inspect existing routes, components, dependencies, UI preset, and project conventions first.
2. Define or update shared TypeScript contracts only where necessary.
3. Add API functions and TanStack Query hooks when the feature depends on remote data.
4. Build with reusable shadcn/ui components and the existing theme.
5. Place route pages and layouts under `app/[locale]/` and keep navigation locale-aware.
6. Add translation keys for **every** new piece of user-facing text in the supported locale files.
7. Use Framer Motion only if configured and useful; respect reduced-motion preferences.
8. Implement matching skeletons, empty states, form validation, and error feedback.
9. Check responsive behavior, keyboard access, contrast, and dark mode (if enabled).
10. Run linting, type-checking, and a production build where available; fix errors caused by the change.
11. Do not introduce unused files, speculative abstractions, or unrelated refactors.

## Core Principles

- Favor clarity over cleverness and composition over duplication.
- Separate data access, state, and presentation concerns.
- Keep UI professional, responsive, accessible, and appropriately animated.
- Treat internationalization as a default requirement, not an afterthought.
- Reuse installed tools and existing components before adding dependencies.
- Make the smallest coherent change that fully solves the requested task.