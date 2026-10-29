# Beginner’s guide to the Northline project

This guide describes the implementation as of **23 October 2026**. It is for someone who is new to the repository and wants to understand what the website does, how its code fits together, how to test it, and what remains before a real company can use it.

Read the chapters in numerical order. All terminal commands assume you are inside the repository’s `client` directory, where `package.json` lives.

| Chapter                                                         | What you will learn                                   |
| --------------------------------------------------------------- | ----------------------------------------------------- |
| [01 — Introduction](01-introduction.md)                         | Purpose, current scope, and what “demo” means         |
| [02 — Installation and running](02-installation-and-running.md) | Tools, dependencies, development, and production      |
| [03 — Pages and use cases](03-pages-and-use-cases.md)           | What visitors can do and how to try it                |
| [04 — Code structure](04-code-structure.md)                     | Routes, components, libraries, and data flow          |
| [05 — Content and languages](05-content-and-languages.md)       | Edit projects, teams, images, and translations        |
| [06 — Testing](06-testing.md)                                   | How tests are implemented, run, and debugged          |
| [07 — Development workflow](07-development-workflow.md)         | Make a small change safely and verify it              |
| [08 — Remaining work](08-remaining-work.md)                     | Launch requirements, test gaps, and optional features |
| [09 — Glossary](09-glossary.md)                                 | Plain-language definitions of common terms            |

The original [roadmap](../roadmap.md) describes the intended product. This guide describes the **current code**, so a roadmap requirement is not automatically an implemented feature. See [image sources](../image-sources.md) for placeholder photography and the [root README](../../README.md) for quick commands.

The last implementation validation passed lint, TypeScript, a production build, and all eight Playwright tests. This is a historical result, not a guarantee about later edits or other machines. Chapter 06 explains how to repeat the checks.
