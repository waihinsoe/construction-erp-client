# 08 — Remaining work

## 1. Current status

The portfolio frontend and its three languages are implemented. The current local demo can be built and tested. Turning it into a real company website requires verified content, real inquiry handling, and deployment-specific checks.

The original [roadmap](../roadmap.md) is a requirements document; its checklist is not the current completion ledger. Use the distinctions below when planning further work.

## 2. Required before accepting real inquiries

| Work                                  | Why it is needed                                      | Suggested completion check                                                                             |
| ------------------------------------- | ----------------------------------------------------- | ------------------------------------------------------------------------------------------------------ |
| Choose an API/email provider          | The form currently sends nothing                      | A valid inquiry reaches an authorized destination                                                      |
| Add server-side validation            | Browser checks can be bypassed                        | Malformed direct requests are rejected                                                                 |
| Add abuse controls                    | A public form can receive automated submissions       | Rate limits and spam handling are tested                                                               |
| Add real request states               | Current confirmation only means local input was valid | Pending, success, failure, retry, and duplicate-submit behavior reflect actual requests                |
| Decide storage and retention          | No inquiry storage currently exists                   | Data ownership, retention, access, and deletion behavior are documented                                |
| Publish an appropriate privacy policy | The current acknowledgement only explains the demo    | Notice and consent accurately describe the production handling                                         |
| Add integration tests                 | No backend or email delivery tests exist              | Success, provider failure, and rejected input are covered without emailing real customers during tests |

Keep provider credentials on the server. Put request logic in an appropriate API layer; avoid ad hoc provider calls from presentation components. An external backend may own validation and business rules—do not duplicate them unnecessarily in the frontend.

## 3. Required before presenting this as a real company

- Replace the fictional company identity, projects, biographies, milestones, and testimonials with approved material.
- Replace illustrative/repeated portraits and project photography with authorized assets and accurate descriptions.
- Add verified contact details, office address, and social links. Add a map only when the real address is available.
- Remove demo labels only for content that has actually been replaced and approved.
- Publish only verifiable achievements, certifications, affiliations, and business statistics.
- Have English, Japanese, and Myanmar copy reviewed by suitable speakers, especially business and privacy wording.

No actual awards, email inbox, office map, company structured data, or verified social links have been implemented.

## 4. Deployment and search visibility

Choose a hosting environment compatible with the installed Next.js configuration, including Cache Components and image optimization. A successful local build is not proof of compatibility with every hosting service or static export.

Configure the real site origin and verify generated sitemap, metadata, and robots output on the deployed host. The current `NEXT_PUBLIC_SITE_URL` setting also enables indexing; consider separating these settings before using preview or staging environments.

Add deployment automation, error monitoring, and a documented rollback procedure as needed. No CI workflow or live production deployment was added in this implementation. CI should install dependencies, run lint/type checks, build, start a test server, and run the browser suite with a valid browser installation.

## 5. Testing improvements

| Gap                                | Next useful verification                                                                          |
| ---------------------------------- | ------------------------------------------------------------------------------------------------- |
| Single Chrome configuration        | Firefox, WebKit, and real-device coverage                                                         |
| Selected mobile overflow checks    | More widths, landscape, and every detail page                                                     |
| No testimonial/timeline assertions | Manual carousel navigation and active milestone/progress tests                                    |
| Partial gallery keyboard check     | Assert the selected slide changes and focus returns correctly                                     |
| Basic form scenarios               | Maximum lengths, whitespace, optional fields, consent failures, and localized success paths       |
| Message-key parity only            | ICU-placeholder consistency and human language review                                             |
| Basic SEO response checks          | Sitemap entries/alternates, robots rules, canonical strategy, metadata, and 404 response behavior |
| No automated accessibility audit   | Semantic/focus checks, screen reader review, and an accessibility tool if adopted                 |
| No visual baselines                | Stable screenshot comparisons after images and fonts load                                         |
| No performance benchmark           | Lighthouse measurement, image budgets, and realistic mobile/network testing                       |
| No backend integration             | Provider/API and abuse-control tests after real submission is implemented                         |

Screenshots currently use `/tmp` and the browser config assumes a particular Linux Chrome location. Making both portable and adding automatic test-server startup would simplify onboarding and CI.

## 6. Optional enhancements

These are possibilities, not required features already promised by the current demo:

- A CMS/admin editing interface to replace code-based content updates.
- Real transparent building cutouts and their rendering/layout support.
- A company-approved theme switcher; the current site has one deliberate palette.
- More consistent locale-specific formatting for decorative indices and years.
- Separate team profile or service detail routes when content warrants them.
- Project progress phases, richer search, or more portfolio records.
- Privacy-appropriate analytics after deciding what should be measured.

Authentication, accounts, dashboards, database administration, inventory, and accounting are separate product scopes. Do not assume they are needed just because the parent directory contains “ERP.”

## 7. Suggested next milestone

Start by replacing one complete project and its assigned team with approved real content in all three languages. Then implement real inquiry delivery and its tests. Finally, complete deployment, accessibility, cross-browser, and performance checks before enabling public indexing.

Next: [09 — Glossary](09-glossary.md).
