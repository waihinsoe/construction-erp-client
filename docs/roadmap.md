# Construction Company Website — Project Requirements & Implementation Roadmap

## 1. Project Overview

Build a modern, premium, fully responsive website for a professional construction and architecture company.

The website must showcase the company's completed projects, construction services, responsible project teams, company history, technical capabilities, and contact information.

The visual experience should feel like an award-quality architecture or construction portfolio: elegant, architectural, cinematic, highly polished, and interactive without sacrificing usability or performance.

**Primary objectives:**
- Establish trust and credibility for the construction company.
- Showcase completed and ongoing construction projects.
- Present the professionals responsible for each project.
- Tell the company's history through immersive scroll-driven storytelling.
- Allow visitors to explore projects using dynamically rendered content.
- Encourage potential clients to request consultations or construction estimates.
- Demonstrate professional frontend architecture, responsive design, accessibility, and maintainable code.

## 2. Recommended Technology Stack

Use the following stack unless the existing repository already provides an appropriate alternative:

- **Framework:** Next.js with App Router
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **UI components:** shadcn/ui or accessible custom components
- **Animation:** Motion for React
- **Icons:** Lucide React
- **Images:** Next.js Image optimization where compatible
- **Forms:** React Hook Form with Zod validation
- **Content:** Typed local data modules or JSON files, designed for future CMS integration

Build with reusable components, server rendering where appropriate, and clear separation of content, layout, and UI interactions.

Avoid unnecessary dependencies, database complexity, or backend services for the initial version.

## 3. Design Direction

### Visual Identity

The website should communicate stability, engineering precision, architectural sophistication, and professionalism.

Use:
- Charcoal and deep slate for primary backgrounds
- Warm white or soft ivory for content sections
- Construction amber or muted gold for accents
- Large architectural photography
- Generous whitespace
- Strong typography
- Thin borders and subtle geometric patterns inspired by technical drawings

Suggested colors:
- Charcoal: `#171C22`
- Warm ivory: `#F6F3ED`
- Construction amber: `#D99A32`
- Muted gray: `#89919A`

Use a bold contemporary heading font such as Manrope or Plus Jakarta Sans and a readable body font such as Inter.

### Signature Building Cutout Effect

A defining element of the website should be realistic, background-removed images of buildings or construction structures.

Requirements:
- Support transparent WebP or PNG assets.
- Allow building cutouts to extend across section boundaries where visually appropriate.
- Use subtle, realistic shadows to create depth.
- Layer typography, architectural grids, and building imagery carefully.
- Use restrained parallax and reveal animations.
- Avoid overwhelming glow effects, exaggerated 3D transformations, and excessive visual clutter.
- Provide attractive full-photo fallbacks if cutout assets are unavailable.
- Ensure the effect remains visually effective on mobile devices.

The site should feel sophisticated and realistic, not like a generic template.

## 4. Website Pages

### Required routes

- `/` — Home
- `/projects` — Project portfolio
- `/projects/[slug]` — Individual project details
- `/services` — Construction services
- `/about` — Company profile and history
- `/team` — Company leadership and professionals
- `/contact` — Contact and consultation request

Include a custom 404 page.

Shared across all pages:
- Responsive navigation
- Footer
- Consistent page transitions where appropriate
- Reusable section headings
- Mobile navigation
- Clear calls to action

## 5. Homepage — Main Experience

The homepage is the primary visual showcase.

Implement the following sections in this order.

### Section 1: Premium Hero

Create a striking, cinematic first impression.

Contents:
- Large architectural headline
- Short company introduction
- Primary CTA: "Explore Our Projects"
- Secondary CTA: "Start Your Project"
- Featured building cutout or premium architecture photograph
- Small company statistics
- Discreet scroll indicator

Animation:
- Staggered headline reveal
- Smooth image entrance
- Subtle decorative line movement
- Minimal motion on initial load

The hero must be attractive even when animations are disabled.

### Section 2: Interactive Accordion Showcase

Place the accordion immediately after the hero as the first major interactive content section.

Use a premium accordion layout to introduce the company's main construction capabilities.

Example categories:
- Residential Construction
- Commercial Development
- Industrial Construction
- Renovation & Restoration
- Architecture & Project Management

Each accordion item should display:
- Service title
- Index number
- Short description
- Associated image
- Link to the relevant service

On desktop, use a split layout with the accordion on one side and a large changing image on the other.

On mobile, present a clean, vertically stacked accordion.

Requirements:
- Animate expansion and collapse smoothly.
- Update the accompanying image when the active item changes.
- Support keyboard navigation and accessible expanded states.
- Ensure only one item is open at a time.
- Keep the content data-driven.

### Section 3: Featured and Completed Projects

Showcase actual project data using a reusable system rather than hardcoded project cards.

Display a curated collection of featured projects.

Each card should contain:
- Project image or transparent building cutout
- Project name
- Project category
- Location
- Completion year
- Project status
- Link to project details

Design:
- Responsive asymmetric or editorial grid
- Subtle hover image movement
- Elegant project number labels
- Optional cutout images overlapping their cards
- Scroll-based reveal animations

Include a "View All Projects" CTA.

### Section 4: People Behind the Projects

Show the professionals responsible for selected projects.

Include roles such as:
- Project Manager
- Lead Architect
- Civil Engineer
- Site Supervisor
- Structural Engineer

Each professional card should include:
- Name
- Position
- Professional photograph
- Short professional biography or specialization
- Associated projects

On an individual project page, show the actual team members assigned to that project through data relationships.

Use elegant portrait cards and subtle hover states.

Do not duplicate people records inside individual projects.

### Section 5: Animated Company History

Build an immersive company timeline that tells the story of the company.

Possible milestones:
- Company founded
- First major construction project
- Expansion into commercial construction
- New regional office
- Major company milestone
- Recent engineering innovations
- Present-day achievements

The timeline must be data-driven, not hardcoded into the UI.

Desktop interaction:
- Use a vertical scroll-driven timeline with a sticky visual panel.
- Highlight the current milestone as the user scrolls.
- Display an associated image, year, heading, and description.
- Animate the timeline progress indicator.
- Transition gently between milestone images.

Mobile interaction:
- Use a straightforward vertical timeline.
- Avoid complicated scroll locking or horizontal overflow.
- Maintain readable descriptions.

Follow reduced-motion preferences and ensure timeline content remains accessible without animation.

### Section 6: Our Services

Create a services grid showing the company's construction capabilities.

Each card should include:
- Service name
- Icon or relevant image
- Brief description
- Link to full details

Avoid repeating the exact accordion presentation.

### Section 7: Why Choose Us

Present credibility signals such as:
- Engineering expertise
- Safety standards
- Quality assurance
- Transparent communication
- Experienced professionals
- Sustainable practices

Include a statistics section for verified figures such as years of experience, delivered projects, and team size.

Do not present invented achievements as genuine facts.

### Section 8: Our Construction Process

Show a simple project lifecycle:

1. Consultation
2. Planning and Design
3. Cost Estimation
4. Construction
5. Inspection and Delivery

Use a visually connected step layout with small motion effects and clear descriptions.

### Section 9: Client Testimonials

Create a testimonial section with:
- Client name
- Client organization, if applicable
- Testimonial
- Associated project, if applicable

Use a carousel or editorial cards, with manual navigation and accessible controls.

Use clearly labeled sample testimonials until genuine client feedback is available.

### Section 10: Consultation CTA

Finish the homepage with a strong section encouraging visitors to discuss their construction plans.

Include:
- Bold heading
- Brief supportive text
- "Request a Consultation" CTA
- Architectural background image or subtle technical drawing

### Section 11: Footer

Include:
- Company information
- Navigation links
- Contact details
- Social links
- Office location
- Copyright
- Privacy policy link if relevant

## 6. Projects Listing Page

Create a dynamic portfolio page.

Features:
- Responsive project grid
- Category filtering
- Status filtering
- Search by project name
- Optional sorting by year
- Project count
- Empty-results state
- Links to individual project pages

Possible project categories:
- Residential
- Commercial
- Industrial
- Infrastructure
- Renovation

Possible statuses:
- Completed
- In Progress
- Planned

Use URL search parameters where appropriate so filtered views can be shared.

## 7. Individual Project Details Page

Use a dynamic route at `/projects/[slug]`.

Every project page should contain:

- Project title and hero photograph
- Project overview
- Location
- Construction category
- Status
- Start and completion dates, where available
- Scope of work
- Project challenges and solutions
- Image gallery
- Optional project progress or construction phases
- Assigned project team
- Related projects
- Consultation CTA

Create a reusable project detail template, so new projects require only new data rather than new pages.

For each assigned professional, link to or display their relevant profile.

## 8. Team Page

Create a dedicated page introducing company leadership and construction professionals.

Features:
- Leadership introduction
- Team member cards
- Role and expertise
- Short biographies
- Associated projects

Project assignment and team profiles must reference the same underlying data.

## 9. About Page

Include:
- Company introduction
- Mission and vision
- Core values
- Animated company timeline
- Leadership overview
- Safety and quality commitments
- Certifications or industry affiliations, if verified
- CTA to view projects or contact the company

Reuse the same timeline data and core component from the homepage, with a more detailed presentation where useful.

## 10. Contact Page

Include a professional inquiry form with:

- Full name
- Email address
- Phone number, optional
- Project type
- Estimated budget range, optional
- Project location, optional
- Message
- Privacy consent where applicable

Requirements:
- Client and server-side validation where a backend exists
- Clear loading, success, and error states
- Accessible form labels and validation messages
- Basic spam protection for production use
- Mobile-friendly layout

If no email provider or backend is configured, use a clearly labeled demo form. Do not pretend an inquiry was delivered successfully.

Also display company contact information and an office map only when a real address is available.

## 11. Dynamic Content Architecture

The website should be content-driven from the beginning.

Create typed data models for:

**Project**
- id
- slug
- title
- summary
- description
- category
- status
- location
- startDate
- completionDate
- thumbnail
- cutoutImage (optional)
- heroImage
- gallery
- teamMemberIds
- featured
- challenges (optional)
- solutions (optional)

**Team Member**
- id
- name
- slug
- role
- biography
- expertise
- portrait
- socialLinks (optional)

**Company Milestone**
- id
- year
- title
- description
- image

**Service**
- id
- slug
- title
- description
- image
- icon

**Testimonial**
- id
- clientName
- organization
- quote
- projectId (optional)

Create reusable query/helper functions for:
- Fetching all projects
- Fetching featured projects
- Finding a project by slug
- Filtering projects by category and status
- Resolving the team assigned to a project
- Finding related projects
- Sorting milestones chronologically

Start with local TypeScript data or JSON. Design the content access layer so it can later be replaced with a headless CMS or API without restructuring the UI.

Provide realistic but explicitly fictional demo content for at least six projects, eight team members, five services, and six company history milestones.

Keep demo information easy to replace.

## 12. Animation and Interaction Guidelines

Use animation deliberately to reinforce the architecture-focused design.

Recommended interactions:
- Text and image reveal on scroll
- Accordion image transitions
- Subtle card hover interactions
- Sticky company history timeline
- Timeline progress indication
- Gentle hero parallax
- Smooth mobile menu transitions
- Gallery image transitions

Guidelines:
- Favor opacity and transform animations.
- Avoid layout thrashing and heavy scroll listeners.
- Avoid unnecessary animation libraries.
- Never hide critical content behind animations.
- Support `prefers-reduced-motion`.
- Avoid scroll hijacking.
- Keep animations subtle enough for a professional company.

## 13. Responsive Design

Design mobile-first and support common screen sizes.

**Mobile**
- Single-column layouts where appropriate
- Touch-friendly accordion
- Collapsible navigation
- Simplified timeline
- Properly sized images and typography
- No unwanted horizontal scrolling

**Tablet**
- Adaptive grids
- Balanced image and text layouts

**Desktop**
- Editorial layouts
- Asymmetric project galleries
- Sticky timeline visuals
- Large cutout imagery
- Rich hover interactions

Use fluid sizing rather than relying entirely on fixed pixel dimensions.

## 14. Accessibility, SEO, and Performance

### Accessibility
- Semantic HTML landmarks
- Logical heading hierarchy
- Proper button and link behavior
- Keyboard-accessible components
- Visible focus indicators
- Accessible accordion controls
- Form labels and error messages
- Sufficient color contrast
- Reduced-motion support

### SEO
- Unique page titles and descriptions
- Dynamic metadata for project pages
- Open Graph images and metadata
- XML sitemap
- robots.txt
- Structured data for the company only where accurate
- Descriptive image alt text

### Performance
- Optimize images
- Lazy-load below-the-fold media
- Prioritize key hero imagery
- Prevent excessive layout shifts
- Use server components where beneficial
- Keep JavaScript bundles lean
- Avoid expensive motion effects
- Minimize dependency weight

Aim for strong Lighthouse performance and accessibility results under realistic testing conditions.

## 15. Reusable Component Architecture

Organize the codebase around reusable components.

Suggested component groups:

**Layout**
- Header
- MobileNavigation
- Footer
- Container
- SectionHeading
- CallToAction

**Home**
- Hero
- ServiceAccordion
- FeaturedProjects
- ProjectTeamPreview
- CompanyTimeline
- WhyChooseUs
- ConstructionProcess
- Testimonials

**Projects**
- ProjectCard
- ProjectGrid
- ProjectFilters
- ProjectGallery
- ProjectMetadata
- ProjectTeam
- RelatedProjects

**People**
- TeamMemberCard
- TeamGrid

**UI**
- AnimatedReveal
- ImageCutout
- StatCounter
- AccessibleAccordion
- Button
- SectionDivider

Use descriptive names, clear props, and limited component responsibilities.

## 16. Implementation Phases

### Phase 1 — Foundation
- [ ] Inspect the existing repository and its conventions.
- [ ] Configure the necessary dependencies.
- [ ] Establish colors, typography, and spacing.
- [ ] Build global layouts and navigation.
- [ ] Set up the typed content models.
- [ ] Create initial demo data.

### Phase 2 — Homepage MVP
- [ ] Implement responsive hero.
- [ ] Build interactive service accordion.
- [ ] Render featured projects from data.
- [ ] Add assigned-team previews.
- [ ] Build the company history timeline.
- [ ] Add services, trust signals, process, and consultation CTA.
- [ ] Complete footer.

### Phase 3 — Additional Pages
- [ ] Build projects listing with filtering.
- [ ] Implement dynamic project detail routes.
- [ ] Build team page.
- [ ] Build about page.
- [ ] Build services page.
- [ ] Build contact page.

### Phase 4 — Visual Polish
- [ ] Add building cutout imagery where appropriate.
- [ ] Add restrained scroll animations.
- [ ] Refine responsive layouts.
- [ ] Improve hover and focus states.
- [ ] Add gallery and image transitions.
- [ ] Make the timeline feel immersive.

### Phase 5 — Quality Assurance
- [ ] Verify all navigation and dynamic routes.
- [ ] Verify filter and search behavior.
- [ ] Validate project-to-team relationships.
- [ ] Test interactive elements with keyboard navigation.
- [ ] Test mobile and desktop layouts.
- [ ] Verify reduced-motion behavior.
- [ ] Check image loading and fallbacks.
- [ ] Run linting and TypeScript validation.
- [ ] Run the production build.
- [ ] Document configuration and any outstanding limitations.

## 17. Acceptance Criteria

The website is complete when:

1. Every required route loads correctly and has a professional design.
2. The homepage prominently features the accordion, portfolio, responsible team members, and animated company history.
3. Project content is rendered from structured data, not duplicated page markup.
4. Every project has a working dynamic details page.
5. Team assignments are correctly resolved from project data.
6. Project filtering works and provides appropriate empty states.
7. Cutout building imagery is visually integrated, with sensible fallbacks.
8. The company history timeline works on desktop and mobile.
9. Forms provide honest and accessible submission feedback.
10. The website is responsive, keyboard accessible, and supports reduced motion.
11. No major layout overflow, broken media, or dead internal links remain.
12. The production build succeeds.
13. The repository includes setup instructions and guidance for editing demo content.

## 18. Instructions for Codex

Act as an experienced frontend engineer and digital designer.

Before implementation:
- Inspect the existing repository.
- Identify the framework, installed libraries, and current project structure.
- Preserve existing conventions where reasonable.
- Avoid unnecessary rewrites.

During implementation:
- Follow the phases in order.
- Prioritize a complete, working experience over decorative complexity.
- Build with reusable, maintainable components.
- Use polished content layouts and sophisticated visual hierarchy.
- Make actual interactions functional.
- Use temporary demo data only where necessary, and label it clearly.
- Avoid adding nonexistent awards, clients, licenses, or business achievements.
- Respect accessibility and performance throughout development.
- Do not replace missing images with broken URLs or misleading assets.

When imagery is not yet provided, structure the interface for easy replacement and use clearly identified placeholder assets that are permitted for use.

After implementation:
- Run the available validation commands.
- Fix errors introduced by the work.
- Describe the important files and components created.
- Explain how to add a new project, team member, and company milestone.
- List any unfinished functionality or external integrations honestly.

**Final goal:** Deliver an impressive, production-minded construction company website with beautiful architecture-inspired visuals, genuinely functional components, structured project data, connected team profiles, and an immersive company history experience. The design should feel custom-built, not like a generic construction theme.