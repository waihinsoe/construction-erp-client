# 03 — Pages and use cases

## 1. Route map

A route is the address of a page. Replace `/en` below with `/ja` or `/my` for the other languages.

| Route                      | Visitor’s goal                     | Current behavior                                                                                                            |
| -------------------------- | ---------------------------------- | --------------------------------------------------------------------------------------------------------------------------- |
| `/en`                      | Understand the company at a glance | Hero, services accordion, projects, people, history, service grid, principles, process, testimonials, and consultation link |
| `/en/projects`             | Find relevant work                 | Search, filters, sort, count, reset, and empty state                                                                        |
| `/en/projects/the-terrace` | Inspect a project                  | Overview, dates, scope, challenges/solutions, gallery, assigned team, and related projects                                  |
| `/en/services`             | Explore capabilities               | Five service sections, process, consultation link                                                                           |
| `/en/about`                | Understand the company story       | Introduction, mission, vision, timeline, commitments, and leadership preview                                                |
| `/en/team`                 | Meet professionals                 | Eight profiles with expertise, biographies, and associated projects                                                         |
| `/en/contact`              | Describe a possible project        | Browser-validated demo inquiry                                                                                              |
| `/en/missing-page`         | Recover from a bad link            | Localized custom 404 content                                                                                                |

`/sitemap.xml` and `/robots.txt` are machine-readable endpoints for search engines, not visitor pages. The current dataset provides 12 normal pages per locale, or **36 localized page URLs**.

## 2. Find a residential project

1. Open `/en/projects`.
2. Choose **Residential** under Category.
3. Click **Apply filters**. Changing the select alone does not submit the form.
4. The current dataset shows two matching projects.
5. Copy the resulting URL to share the same filter settings.
6. Use **Reset filters** to return to all six records.

The URL uses parameters such as:

```text
/en/projects?q=&category=residential&status=&sort=newest
```

`q` searches the **project title in the selected language**. It does not search biographies, descriptions, or all languages at once. Status and category combine with the search; sorting uses the project’s **start date**, not its completion date. An unmatched query displays a helpful empty state.

## 3. Understand a project’s team

Open a project and scroll to its assigned team. The page looks up `teamMemberIds` in shared team records. Associated project links on each profile are calculated from the same assignments.

This prevents the same person from having inconsistent biographies on different pages. There are no separate `/team/[slug]` profile pages; profiles are displayed on the team and project pages.

## 4. Change language

Use the language selector in the header. It preserves the current route, query string, and hash fragment. A visitor on a filtered project listing can switch language without losing category or status selections.

The search text itself is preserved, not translated. An English title query may return no results after switching to Myanmar because searching uses the current language’s titles.

English, Japanese, and Myanmar UI messages, content, and form errors are supplied locally. There is no runtime machine-translation service.

## 5. Use the interactive sections

| Interaction        | How to use it                                                                                            |
| ------------------ | -------------------------------------------------------------------------------------------------------- |
| Services accordion | Activate a heading to expand its description and change the photograph; only one item is open            |
| History timeline   | Scroll normally; desktop has a sticky image and progress indicator, mobile has a vertical reading layout |
| Testimonials       | Use previous/next controls or swipe; feedback is explicitly labeled sample content                       |
| Gallery            | Select a thumbnail to open the lightbox; use arrow controls and Escape to close                          |
| Mobile menu        | Open the menu button, select a destination, or close the dialog                                          |

Motion is reduced when the device requests reduced motion. The site does not lock scrolling to force timeline navigation.

## 6. Try an inquiry

Required fields are name, email, project type, message, and acknowledgement that this is a demo. Phone, budget, and location are optional. The message must have at least 20 characters under the current string-length validation.

Submitting an empty form reveals validation messages. Valid input produces an honest local confirmation. Changing a field clears that confirmation. No server request delivers the inquiry, and refreshing does not restore a saved draft.

The budget is free text: visitors can include their currency. Phone validation currently limits length; it does not validate country-specific phone formats.

Next: [04 — Code structure](04-code-structure.md).
