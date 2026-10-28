# 02 — Installation and running

## 1. Tools you need

- A terminal and a code editor.
- Node.js and pnpm. The validated environment used Node **22.22.3** and pnpm **11.5.0**. `package.json` pins pnpm 11.5.0 through its `packageManager` field. Use the tested Node version to reproduce that environment; do not assume that meeting Next.js’s minimum Node version also meets pnpm’s requirements.
- Internet access for the initial dependency installation.
- Google Chrome for the current browser test configuration.

Check your tools:

```bash
node --version
pnpm --version
```

If a command is not found, install that tool before continuing. Dependencies are packages the application needs; pnpm downloads and links them in `node_modules`.

## 2. Start development

Open a terminal in the `client` directory:

```bash
pnpm install
pnpm dev
```

Open http://localhost:3000/en, http://localhost:3000/ja, or http://localhost:3000/my. Opening `/` runs locale negotiation; English is the default, but browser preferences or a previous language choice can affect the redirect.

Keep the terminal running. Saving a source file normally updates the development website automatically. Press **Ctrl+C** to stop the server. If port 3000 is occupied, read the address printed in the terminal rather than assuming it stayed on 3000.

## 3. Run the production version

A production build prepares the application for deployment. It also checks whether pages can render under the project’s Next.js configuration.

```bash
pnpm build
pnpm start
```

Run these in order: `start` needs a successful build. After editing files, rebuild before testing with `start`; otherwise you may be viewing an older version.

Development and production are different modes. A working development page does not prove the production build will pass.

## 4. Environment configuration

No API credentials or database connection are required for the current demo.

The public deployment origin is read by [`config/config.ts`](../../config/config.ts). For a real deployment, create `.env.local` at the repository root:

```dotenv
NEXT_PUBLIC_SITE_URL=https://your-company.example
```

Replace this example with the actual origin. Use a complete URL beginning with `https://` or `http://`. The configuration constructs a URL object, so an invalid value can prevent startup or build.

Without this variable, generated absolute URLs use `http://localhost:3000`, and indexing is disabled. **Setting any nonempty valid origin also enables indexing** through the current configuration. Do not set a public production origin and publish unapproved fictional content accidentally. There is no separate indexing toggle yet.

Variables starting with `NEXT_PUBLIC_` are public configuration, not a place for secrets. `.env.local` is ignored by Git. Restart/rebuild after changing environment configuration.

## 5. Useful commands

| Command                     | Purpose                                                |
| --------------------------- | ------------------------------------------------------ |
| `pnpm install`              | Install dependencies from the manifest and lockfile    |
| `pnpm dev`                  | Run the development server                             |
| `pnpm lint`                 | Check configured code-quality rules                    |
| `pnpm exec tsc --noEmit`    | Check TypeScript without generating application output |
| `pnpm build`                | Compile and generate the production application        |
| `pnpm start --port 3100`    | Serve the build on the browser tests’ expected port    |
| `pnpm exec playwright test` | Run the automated tests; start the server first        |

There is currently no `pnpm test` script. Use the exact Playwright command above.

## 6. Installation troubleshooting

- **Permission or pnpm store errors:** check that your user can access pnpm’s package store. This project was developed in a sandbox that sometimes required approved access outside that sandbox. That approval mechanism is an environment feature, not a website requirement.
- **Blocked dependency build scripts:** [`pnpm-workspace.yaml`](../../pnpm-workspace.yaml) explicitly disables lifecycle builds for listed packages. Do not enable all scripts blindly. Investigate the specific package and platform if installation or native bindings fail.
- **SWC/native binding errors:** these can arise from installation, architecture, or native-cache permissions. Verify your Node/pnpm installation and permissions; do not remove type checking to bypass the error.
- **Outdated generated route types:** after route changes, run a successful `pnpm build` to regenerate Next.js output before retrying a standalone type check.

Next: [03 — Pages and use cases](03-pages-and-use-cases.md).
