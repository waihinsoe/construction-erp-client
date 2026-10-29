# 01 — Introduction

## 1. What this project is

Northline is a public-facing construction and architecture portfolio website. Its purpose is to help a visitor understand a company’s services, explore its work, meet the people responsible for projects, and start a consultation.

Although the parent folder is named `construction-erp`, the current application is a marketing and portfolio website. It does not implement an ERP system, inventory, accounting, employee administration, or customer accounts.

## 2. What is currently included

- Home, project listing, project detail, services, about, team, and contact pages.
- English (`en`), Japanese (`ja`), and Myanmar (`my`) versions.
- Six fictional projects, eight fictional team profiles, five services, six history milestones, and three sample testimonials.
- Search, category/status filters, and sorting on the project listing.
- Project-to-team relationships and related project suggestions.
- A service accordion, scrolling timeline, testimonial carousel, and image lightbox.
- Responsive navigation, mobile layouts, loading placeholders, error feedback, and localized not-found pages.
- A validated demo consultation form.
- Page metadata, sitemap, robots configuration, and automated browser checks.

There is one shared page template for project details. Six projects do not mean six copied page files: each record supplies content to the same template.

## 3. What “demo” means here

The company, project records, professional profiles, company history, and testimonials are fictional. The photos are illustrative. They must not be presented as a real company’s achievements or employees without replacement and verification.

The contact form checks input **inside the browser only**. Valid input produces a message saying nothing was sent or saved. There is no email delivery, inquiry database, admin inbox, or customer relationship management integration.

There are no verified office details, social accounts, certifications, or real client endorsements. The website deliberately avoids inventing these.

## 4. Who uses the project

| Person                                | Their use case                                                  |
| ------------------------------------- | --------------------------------------------------------------- |
| Potential customer                    | Explore services and sample projects, then try the inquiry form |
| Visitor using another language        | Switch languages while staying on the same page                 |
| Content editor with repository access | Edit typed content files and translations                       |
| Frontend developer                    | Maintain components, interactions, and layouts                  |
| Tester                                | Run automated checks and manually review usability              |

Content editing currently requires editing code files. There is no content-management dashboard.

## 5. A first tour

After following chapter 02, open `/en`, browse `/en/projects`, select a project, inspect its assigned team, open a gallery image, and visit `/en/contact`. Switch to `/my` or `/ja` through the header selector. Notice that project IDs and URL slugs stay stable while displayed text changes.

Next: [02 — Installation and running](02-installation-and-running.md).
