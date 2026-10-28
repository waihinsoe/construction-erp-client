# 07 — Development workflow

## 1. Start with a small, defined change

For example: “Change the consultation button label in all three languages.” Identify whether the change belongs to content, UI messages, rendering, styling, or integration code before editing.

Check the working tree:

```bash
git status --short
```

Do not discard existing changes you do not understand. Read the root `AGENTS.md` for repository conventions. In particular, the installed Next.js version has project-specific guidance under `node_modules/next/dist/docs/`.

## 2. Find the right file

| Change                              | Starting point                                                |
| ----------------------------------- | ------------------------------------------------------------- |
| A button or validation message      | `messages/*.json`                                             |
| A project description               | `lib/content/projects.ts`                                     |
| Assign a professional to a project  | Project’s `teamMemberIds`                                     |
| Homepage section order              | `app/[locale]/page.tsx`                                       |
| Shared navigation                   | `components/site/header.tsx`                                  |
| Contact validation                  | `components/site/contact-form.tsx`                            |
| Project search/filter behavior      | `app/[locale]/projects/page.tsx` and `lib/content/queries.ts` |
| Colors, spacing, Myanmar typography | `app/[locale]/globals.css`                                    |
| Supported languages                 | `i18n/routing.ts` plus the linked files in chapter 05         |
| Browser assertions                  | `tests/site.spec.ts`                                          |

Keep filenames lowercase with hyphens, and keep user-facing routes under `app/[locale]`. Reuse existing UI primitives and interaction libraries before adding replacements.

## 3. Make and preview the change

Run `pnpm dev`, edit the smallest relevant set of files, and inspect the page in every supported language. For text changes, check narrow layouts as well as desktop.

When a component needs browser state or event handlers, use a small Client Component. Do not convert an entire server-rendered page into a Client Component just for one interaction.

If adding a needed package, use pnpm and keep the lockfile updated. Check whether the repository already includes a suitable package first.

## 4. Format and validate

Format only the files you changed. For example:

```bash
pnpm exec prettier --write components/site/contact-form.tsx
pnpm lint
pnpm exec tsc --noEmit
pnpm build
```

Then use chapter 06 to run the browser checks against the new build. Run focused tests while debugging, then the full suite before handing off a completed feature.

For a documentation-only edit, check facts, commands, links, and formatting. A new application build is usually unnecessary when no executable code or configuration changed.

## 5. Update tests for behavior changes

Add or revise a test when behavior changes, rather than merely copying the implementation into a test. For example, a new URL filter should be tested by submitting it and checking results and the URL.

If adding a seventh project, update the sample count and any affected category counts. Keep checks that catch incorrect assignments and missing translations. A test failure can reveal either a defect or an intentionally changed expectation; investigate before editing the assertion.

Do not remove a failing assertion solely to make the suite pass.

## 6. Review and hand off

```bash
git diff --check
git diff --stat
```

Review the actual diff as well. Confirm that no secrets, generated test reports, or unrelated changes were added. Update documentation when changing setup commands, supported locales, data contracts, or integration behavior.

A useful handoff explains what changed, how it was verified, and any remaining limitations. Do not describe a demo preview as a delivered inquiry or a passing browser test as proof of complete accessibility.

Next: [08 — Remaining work](08-remaining-work.md).
