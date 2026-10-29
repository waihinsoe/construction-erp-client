# 06 — Testing

## 1. What each check does

| Check            | Command                     | What it catches                                                                        |
| ---------------- | --------------------------- | -------------------------------------------------------------------------------------- |
| Lint             | `pnpm lint`                 | Configured code-quality and React rule violations                                      |
| Type check       | `pnpm exec tsc --noEmit`    | Incorrect types, missing required fields, invalid props                                |
| Production build | `pnpm build`                | Compilation and production rendering/prerendering problems                             |
| Automated tests  | `pnpm exec playwright test` | Assertions about content and real-browser behavior                                     |
| Manual review    | Use the website yourself    | Visual, usability, language, and assistive-technology issues not covered by automation |

A passing build does not prove that a button works. A passing browser test does not prove that every visual detail is correct. Use the checks together.

## 2. Where tests are implemented

[`tests/site.spec.ts`](../../tests/site.spec.ts) contains **eight Playwright tests**. Some inspect local records directly; others open Chrome and interact with pages.

[`playwright.config.ts`](../../playwright.config.ts) sets:

- Test directory: `./tests`.
- Base URL: `http://localhost:3100`.
- Two workers with parallel execution enabled.
- Headless mode: Chrome runs without displaying a window.
- Chrome executable: `PLAYWRIGHT_CHROME_PATH`, falling back to `/opt/google/chrome/chrome`.
- `--no-sandbox`, retained for the development test environment.
- List reporter: results print in the terminal.

The configuration does **not** automatically start a server. It also does not define Firefox/WebKit projects, automatic retries, or an HTML report by default.

## 3. Run all checks, step by step

### Terminal A: validate and serve the build

From the `client` directory, run these commands in order. Fix failures before moving on:

```bash
pnpm install
pnpm lint
pnpm exec tsc --noEmit
pnpm build
pnpm start --port 3100
```

Leave this terminal running. Confirm that http://localhost:3100/en opens.

### Terminal B: run the tests

Open a second terminal in the same directory:

```bash
pnpm exec playwright test
```

A successful run ends with `8 passed` for the current suite. Nonzero exit status means the command failed; read the failing assertion, not only the final count.

After source changes, stop Terminal A with Ctrl+C, rebuild, restart it, and rerun the relevant tests. Testing an old production build is a common source of confusion.

### If Chrome is installed somewhere else

On Linux or macOS, pass its real executable path for the test command:

```bash
PLAYWRIGHT_CHROME_PATH="/path/to/chrome" pnpm exec playwright test
```

A typical macOS example is:

```bash
PLAYWRIGHT_CHROME_PATH="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" pnpm exec playwright test
```

PowerShell example:

```powershell
$env:PLAYWRIGHT_CHROME_PATH = 'C:\Program Files\Google\Chrome\Application\chrome.exe'
pnpm exec playwright test
```

Verify the executable exists on your machine. Running `pnpm exec playwright install` alone does not override the explicit executable path in this configuration. Screenshot paths are currently under `/tmp`; Windows users should update those paths in the test or use a compatible environment such as WSL.

## 4. What the eight tests actually check

| Test                           | Assertions and actions                                                                                                                                                | Important boundary                                                             |
| ------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------ |
| Content relationships          | Six projects, eight people, six milestones; team IDs resolve; English/Japanese project titles exist                                                                   | Counts are specific to the demo dataset                                        |
| Required routes                | Visits all 36 normal localized URLs; checks HTTP 200, visible main heading, document language, and no captured browser `pageerror`                                    | Does not inspect every element or every network failure                        |
| Filters and Japanese switching | Residential filter gives two results; locale switch preserves query; unmatched search and reset work                                                                  | Does not exhaust every status/sort/category combination                        |
| Accordion, gallery, form       | One accordion item opens while another closes; lightbox opens, receives ArrowRight/Escape, and closes; invalid and valid demo form paths work                         | Does not assert the slide index after ArrowRight or test every form boundary   |
| Mobile/reduced motion/images   | Uses 390×844 viewport and reduced-motion preference; checks menu, overflow on selected routes, hero image load, and already-complete broken images; saves screenshots | Does not verify every animation is disabled or wait for every lazy image       |
| 404 and SEO endpoints          | Root redirects to English in a fresh test context; English/Japanese 404 text appears; sitemap/robots return 200                                                       | Does not assert 404 response status or deeply validate sitemap/robots contents |
| Translation coverage           | Message key paths match across locales; localized content fields contain nonempty `en`, `ja`, and `my` strings                                                        | Does not validate translation quality or ICU-placeholder equivalence           |
| Myanmar interactions           | Preserved category/status query, Myanmar document language/count/title, localized gallery controls, validation message, and 404                                       | A focused scenario, not exhaustive Myanmar accessibility coverage              |

The carousel and timeline are implemented, but the suite does not explicitly assert testimonial navigation or milestone/progress changes. Screenshots are review artifacts, **not** image-diff regression tests.

## 5. How a browser test is written

A simplified example based on the existing tests:

```ts
import { test, expect } from "@playwright/test";

test("contact rejects an invalid email", async ({ page }) => {
  await page.goto("/en/contact");
  await page.getByRole("button", { name: "Preview inquiry" }).click();
  await expect(page.getByText("Enter a valid email address.")).toBeVisible();
});
```

`test` names the scenario. `page` is an isolated browser page supplied by Playwright. `await` waits for an asynchronous action. `expect` asserts the required result and usually retries while the UI updates.

Selectors such as `getByRole` and `getByLabel` use accessible names rather than fragile visual positions. If translated text changes, update the relevant expected accessible name. Prefer an assertion about the resulting behavior to adding an arbitrary sleep.

The direct-content test does not need a browser: it imports arrays and verifies relationships. The translation test reads JSON with Node’s filesystem API and recursively compares message keys and localized records.

## 6. Run a smaller test or debug a failure

```bash
# List tests without executing them
pnpm exec playwright test --list

# Run only the Myanmar scenario
pnpm exec playwright test --grep "Myanmar switching"

# Show Chrome while running
pnpm exec playwright test --headed --workers=1

# Open Playwright's debugging workflow
pnpm exec playwright test --debug

# Generate a trace for a failing test
pnpm exec playwright test --grep "Myanmar switching" --trace on
```

Use the same Chrome environment variable if required. Trace artifacts are written under `test-results`; open the actual trace path with:

```bash
pnpm exec playwright show-trace test-results/<actual-test-folder>/trace.zip
```

The list reporter does not automatically create an HTML report. Request one explicitly if wanted:

```bash
pnpm exec playwright test --reporter=html
pnpm exec playwright show-report
```

`test-results/` and `playwright-report/` are ignored by Git. The mobile test writes `/tmp/northline-mobile.png` and `/tmp/northline-desktop.png`; they are replaced on later runs and are not source files.

## 7. Common failure patterns

| Failure                               | What to inspect first                                                                       |
| ------------------------------------- | ------------------------------------------------------------------------------------------- |
| Connection refused                    | Is the server running on port 3100?                                                         |
| Executable not found                  | Does `PLAYWRIGHT_CHROME_PATH` point to an installed browser?                                |
| Old labels or missing recent edits    | Was the production server rebuilt and restarted?                                            |
| Expected six projects, received seven | Did content change? Update intentional sample-count assertions                              |
| Locator cannot find a button          | Check route, language, accessible name, and whether the control is visible at that viewport |
| Missing translation key               | Add the same key to all message files                                                       |
| Overflow assertion fails              | Inspect the element exceeding the viewport; do not simply hide all overflow                 |
| Image assertion fails                 | Check local file paths and the Next.js image response                                       |

## 8. Manual review still needed

Tab through navigation, accordion, form, and gallery. Check focus visibility and return of focus after dialogs close. Review long Japanese/Myanmar labels at several widths, ordinary and reduced motion, actual photo crops, and form error announcements. Test additional browsers and real mobile devices before launch.

There is no coverage percentage report, axe accessibility suite, Lighthouse budget, email delivery test, or backend test at present. These gaps are tracked in chapter 08.

Next: [07 — Development workflow](07-development-workflow.md).
