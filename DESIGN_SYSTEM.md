# KPI Plus Tech — Website Design System

Version 1.0 · July 2026 · Website and marketing surfaces

## 1. Purpose

This system defines how KPI Plus Tech should look, sound, and behave across its SaaS and software-development website. It takes inspiration from Channex's clarity, generous spacing, product-led proof, and developer-friendly presentation without copying its brand or page composition.

The intended impression is:

> A sharp, dependable product team that turns complicated business operations into software that feels simple.

The system should help the website do three jobs:

1. Explain what KPI Plus Tech builds in under ten seconds.
2. Prove technical capability without overwhelming non-technical buyers.
3. Move qualified visitors toward a project conversation or product demo.

## 2. Reference review: Channex

### What works

- **A narrow hero promise.** The page names the audience, product, integrations, and practical benefit immediately.
- **Proof close to the claim.** Property count, uptime, response time, pricing, and delivery time reduce uncertainty early.
- **Product made visible.** Dashboard imagery and a code sample make an API product feel concrete.
- **Strong visual hierarchy.** Large headings, short paragraphs, restrained color, and generous section spacing are easy to scan.
- **Repeated, consistent action.** Primary and secondary calls to action appear where intent naturally increases.
- **Technical confidence.** Documentation, sandbox, security, and system-status links support developer evaluation.

### What KPI Plus Tech should improve

- Avoid a generic “gradient SaaS” identity. Use the gradient as a signal, not as decoration everywhere.
- Organize the story around buyer problems and outcomes before listing technical capabilities.
- Add evidence with context: client situation, intervention, measurable result, and delivery time.
- Separate the paths for **SaaS products** and **custom software services** so visitors do not have to decode the offer.
- Use real product screens, process diagrams, team photography, and client artifacts instead of decorative mockups.
- Keep the contact form short. Ask detailed discovery questions after the first commitment.

## 3. Brand foundation

### Positioning

KPI Plus Tech designs and builds practical SaaS products, internal systems, integrations, and automation for growing businesses.

### Brand promise

**Complex operations. Clear software. Measurable progress.**

### Personality

- Clear, not simplistic
- Expert, not self-important
- Progressive, not experimental for its own sake
- Commercially aware, not technology-first
- Warm and collaborative, not anonymous

### Design principles

1. **Clarity earns attention.** One idea per section, one dominant action per view.
2. **Show the work.** Prefer product screens, workflows, metrics, and short demonstrations over abstract claims.
3. **Proof beats polish.** A specific result is more persuasive than another gradient card.
4. **Technical, made human.** Pair engineering detail with the business outcome it creates.
5. **Calm confidence.** Use space, typography, and disciplined repetition; avoid visual noise.
6. **Accessible by default.** Accessibility is a component requirement, not a final QA task.

## 4. Visual direction

The core visual idea is **Signal through complexity**: dark ink, clean white space, a light-blue brand signal, and a fresh teal success color. Use fine grid lines, connected nodes, small data labels, terminal details, and product crops sparingly to suggest systems thinking.

Do not recreate Channex's blue-to-purple gradient. KPI Plus Tech uses light blue as an ownable field color and a deeper blue for accessible actions.

### Color tokens

| Token | Value | Use |
|---|---:|---|
| `ink-950` | `#07111F` | Primary text, dark sections |
| `ink-900` | `#0D1B2A` | Dark surfaces |
| `ink-700` | `#334155` | Secondary headings |
| `ink-600` | `#475569` | Body text |
| `ink-500` | `#64748B` | Metadata, helper text |
| `mist-200` | `#DCE5EF` | Strong borders |
| `mist-100` | `#EAF0F6` | Default borders |
| `mist-50` | `#F5F8FB` | Alternating section background |
| `white` | `#FFFFFF` | Main surface |
| `signal-700` | `#064B70` | Pressed primary action |
| `signal-600` | `#075F8F` | Primary action, links, focus |
| `signal-500` | `#67D4FF` | Brand light blue, diagrams and large highlights |
| `signal-100` | `#CFF1FF` | Tinted badges and icon wells |
| `signal-50` | `#EAF8FF` | Soft highlighted surface |
| `teal-600` | `#007A6B` | Success text and data |
| `teal-500` | `#00A991` | Gradient endpoint |
| `teal-100` | `#CFF5EE` | Success surface |
| `amber-600` | `#B45309` | Warning text |
| `amber-100` | `#FEF3C7` | Warning surface |
| `red-600` | `#C93636` | Error text |
| `red-100` | `#FEE2E2` | Error surface |

Brand field gradient: `linear-gradient(135deg, #67D4FF 0%, #CFF1FF 100%)`.

Use the gradient only for hero atmosphere, a selected data visualization, or one focal graphic in a section. Do not put small white text on the light-blue gradient, and never apply it to long text or every icon.

### Contrast rules

- Default body text: `ink-600` on white or `mist-50`.
- Important text: `ink-950` on light surfaces.
- On `ink-950`, use white for headings and `#B8C5D6` for body text.
- White text may be used on `signal-600`, `signal-700`, `teal-600`, `ink-900`, or `ink-950`—not on `signal-500`.
- Never use `ink-500` below 16px on white.
- Target WCAG 2.2 AA: 4.5:1 for body text and 3:1 for large text and UI boundaries.

## 5. Typography

### Families

- **UI and display:** `Manrope`, then `Inter`, `system-ui`, sans-serif.
- **Code and technical labels:** `IBM Plex Mono`, then `SFMono-Regular`, monospace.

Manrope gives the brand a confident, contemporary voice while remaining highly legible. Keep weights limited to 400, 500, 600, and 700.

### Type scale

| Style | Desktop | Mobile | Weight | Line height | Use |
|---|---:|---:|---:|---:|---|
| Display | 72px | 44px | 700 | 1.04 | Home hero only |
| H1 | 60px | 40px | 700 | 1.08 | Interior page hero |
| H2 | 44px | 32px | 700 | 1.14 | Major sections |
| H3 | 30px | 26px | 650 | 1.22 | Section groups |
| H4 | 21px | 20px | 650 | 1.30 | Cards and modules |
| Lead | 20px | 18px | 400 | 1.60 | Hero and section intro |
| Body large | 18px | 17px | 400 | 1.65 | Editorial content |
| Body | 16px | 16px | 400 | 1.60 | Default copy |
| Small | 14px | 14px | 500 | 1.45 | Metadata and helper text |
| Label | 13px | 13px | 650 | 1.20 | Eyebrows, badges |
| Code | 14px | 13px | 400 | 1.65 | Code samples |

Rules:

- Hero heading: maximum 12 words and approximately 16 characters per line where practical.
- Body copy: 55–72 characters per line; maximum 3 lines in feature cards.
- Use sentence case. Avoid title case except proper names.
- Use gradient text for no more than one short phrase in a heading.
- Use tabular numerals for metrics, prices, and dashboards.

## 6. Spacing, grid, and layout

### Spacing scale

Use a 4px base: `4, 8, 12, 16, 24, 32, 40, 48, 64, 80, 96, 120, 160`.

- Component gaps: 8–24px.
- Card padding: 24px mobile, 32px desktop.
- Section padding: 80px mobile, 120px desktop.
- Hero padding: 112px top and 80px bottom mobile; 176px top and 128px bottom desktop.
- Do not add arbitrary spacing values unless a component has a documented optical need.

### Grid

- Maximum content width: 1280px.
- Maximum reading width: 720px.
- Desktop: 12 columns, 24px gutters.
- Tablet: 8 columns, 24px gutters.
- Mobile: 4 columns, 16px gutters.
- Page margins: 24px mobile, 40px tablet, 64px desktop.
- Breakpoints: 480, 768, 1024, 1280, 1440px.

Prefer asymmetric 5/7 or 7/5 splits for hero and product stories. Use equal columns for comparable items only.

### Radius and borders

- Small controls and badges: 8px.
- Buttons and inputs: 10px.
- Cards: 16px.
- Hero visuals and major panels: 24px.
- Pill: 999px.
- Default border: 1px `mist-100`.
- Dark border: 1px rgba(255,255,255,.12).

### Elevation

- `shadow-xs`: `0 1px 2px rgba(7,17,31,.05)`
- `shadow-sm`: `0 6px 18px rgba(7,17,31,.07)`
- `shadow-md`: `0 16px 40px rgba(7,17,31,.10)`
- `shadow-signal`: `0 16px 36px rgba(47,107,255,.22)`

Borders establish structure. Shadows indicate elevation or focus. Do not place a strong shadow on every card.

## 7. Iconography and imagery

### Icons

- Use Lucide icons, 1.75px stroke, round caps.
- Standard sizes: 16, 20, and 24px; 32px for feature illustrations.
- Pair unfamiliar icons with a visible label.
- Use one icon color per module. Avoid rainbow icon grids.

### Product imagery

- Use real software screens at readable scale.
- Crop to emphasize one decision or workflow.
- Add no more than two contextual callouts per screenshot.
- Place screens in a subtle browser or app frame; avoid floating device mockups when they do not reflect use.
- Redact real customer data and replace it with believable, consistent samples.

### Photography

Use candid, naturally lit images of the team collaborating, reviewing products, or working with clients. Avoid generic handshakes, neon server rooms, posed laptop shots, and AI imagery with visibly artificial people.

### Technical graphics

Workflow diagrams should use `ink-950` nodes, `mist-200` connections, and `signal-500` for the active path. Keep labels brief and provide an accessible text description.

## 8. Core components

### Header

- Fixed 72px desktop / 64px mobile height.
- Initially transparent or white; on scroll use 92% white with blur and a bottom border.
- Left: logo. Center: Products, Services, Work, Process, Insights. Right: “Book a discovery call”.
- Products and Services may open compact mega menus with descriptions, not link lists alone.
- Mobile menu opens as a full-width sheet below the header; trap focus and close on Escape.
- The header CTA is visible at 1024px and above.

### Buttons

Sizes:

- Small: 36px high, 14px label.
- Medium: 44px high, 15px label.
- Large: 52px high, 16px label.

Variants:

- **Primary:** solid `signal-600`, white label, `shadow-signal` on hover.
- **Secondary:** white, `mist-200` border, `ink-950` label.
- **Tertiary:** transparent, `signal-600` label, arrow or chevron optional.
- **Dark:** white label on `ink-900`, used on light surfaces.
- **Destructive:** `red-600`, reserved for application UI—not marketing CTAs.

Interaction:

- Hover: translate up 1px; shadow or border changes, never both dramatically.
- Active: translate to 0; reduce shadow.
- Focus: 2px `signal-500` ring plus 3px white offset.
- Disabled: 45% opacity and no shadow.
- Keep labels action-led: “See our work”, “Explore the platform”, “Book a call”.

### Links

- Inline links are underlined with a 2px offset.
- Navigation links are not underlined by default; use color plus a 2px active indicator.
- External links show an external-link icon when the destination is not obvious.

### Eyebrow / badge

- 32px minimum height, pill shape, 13px semibold.
- Use a meaningful label such as “For operations teams” or “Case study”.
- Do not use an animated icon in every eyebrow.

### Cards

Card anatomy: optional icon or image → category/metric → heading → supporting copy → optional action.

- Default: white, 1px border, 16px radius, no shadow.
- Hoverable: stronger border, `shadow-sm`, translate up 2px.
- Feature cards are equal height within a row.
- Limit feature grids to three columns. Four small cards make scan paths weaker.
- The entire card may be clickable only when it has one destination and a visible focus state.

### Metric

- Number first, short label second, optional source or timeframe third.
- Use specific, defensible numbers: “38% less admin time,” not “10× better”.
- Show three metrics maximum in a hero proof strip.
- Never animate values unless the animation adds understanding.

### Forms

- Label above every input; placeholder is an example, not a label.
- Input height 48px; textarea minimum 128px.
- Contact form v1: Name, work email, company, “What would you like to improve?”
- Ask budget and timeline only when qualification is necessary; explain why.
- Validate after blur and on submit. Put errors below the field and summarize them at the top.
- Submit states: default, loading with preserved width, success confirmation, recoverable error.
- Use autocomplete attributes and suitable mobile keyboard types.

### Testimonial

- Use a specific quote of 25–55 words.
- Include full name, role, company, and approved image or logo.
- Pair the quote with one concrete result when possible.
- Do not use an auto-rotating carousel. Show a grid, stack, or manually controlled slider.

### Case-study preview

- Industry and service label.
- Outcome-led headline.
- One product visual.
- Two measurable results.
- “Read case study” action.
- On mobile, keep the visual above results and action.

### Code / integration panel

- Dark `ink-950` surface, 16px radius.
- Header includes environment/file label and optional copy button.
- Use syntax color only for meaning; maintain 4.5:1 contrast.
- Code lines should demonstrate an actual capability in 8–16 lines.
- Pair the code with a plain-language explanation for business readers.

### FAQ

- Use native disclosure semantics.
- One item open at a time on mobile; multiple may remain open on desktop.
- Questions should address buying risk: ownership, timeline, maintenance, security, pricing, and handover.

### Footer

- `ink-950` background.
- Columns: Products, Services, Company, Resources.
- Include location/timezone, response expectation, email, LinkedIn, privacy, terms, and accessibility.
- Add a short trust statement rather than repeating the entire hero pitch.

## 9. Page and section patterns

### Recommended sitemap

- Home
- Products
  - Product detail page for each SaaS product
- Services
  - SaaS product development
  - Custom business software
  - Integrations and automation
  - Product rescue and modernization
- Work / case studies
- Process
- About
- Insights
- Contact

### Home page narrative

1. **Header** — simple routes and one primary action.
2. **Hero** — outcome-led promise, short explanation, primary/secondary CTA, product or workflow visual.
3. **Trust strip** — client logos or factual credibility signals.
4. **Choose your path** — “Use our SaaS” and “Build with our team”.
5. **Problems and outcomes** — three high-value business problems solved.
6. **Featured products** — real screens and key use cases.
7. **Services** — three service families, each tied to an outcome.
8. **Case study** — situation, approach, measurable result.
9. **How we work** — Discover, Design, Build, Improve.
10. **Technical confidence** — security, stack flexibility, integrations, ownership, support.
11. **Testimonials** — credible, attributed evidence.
12. **Final CTA** — one low-friction next step.
13. **Footer**.

### Hero content model

Eyebrow: `SaaS products + custom software`

Headline direction: `Software that makes complex work feel simple.`

Supporting copy: `We design and build SaaS platforms, internal tools, integrations, and automation that remove operational friction and create measurable progress.`

Primary CTA: `Book a discovery call`

Secondary CTA: `See our work`

Proof strip: `Business-first discovery` · `Senior product team` · `Built for long-term ownership`

### Service page pattern

1. Buyer problem and desired state.
2. What the service includes.
3. Suitable / not suitable qualification.
4. Example engagement and timeline.
5. Relevant work and results.
6. Process and collaboration model.
7. FAQ.
8. CTA with expectation setting.

### Case study pattern

1. Outcome-led title and summary metrics.
2. Client context and constraints.
3. The problem in the client's words.
4. Decision and approach.
5. Product walkthrough with annotated screens.
6. Delivery process and technical decisions.
7. Results, timeframe, and measurement method.
8. What changed next.
9. Related service CTA.

## 10. Voice and content

### Voice rules

- Lead with the outcome; explain the technology second.
- Write in direct, conversational English.
- Prefer short sentences and concrete nouns.
- Use “we” for KPI Plus Tech and “you” for the visitor.
- Name trade-offs honestly. Precision signals expertise.
- Use technical terms when they help the intended reader; define them when they do not.

### Preferred language

| Avoid | Prefer |
|---|---|
| Cutting-edge solutions | Software built around how your team works |
| Digital transformation | Replace slow manual work with a clear, connected system |
| Leverage AI | Use AI where it improves speed, quality, or decisions |
| Seamless | Describe exactly what connects or becomes easier |
| World-class | Provide the evidence |
| End-to-end | Name the actual stages or deliverables |

### CTA hierarchy

- High intent: Book a discovery call, Request a demo, Start a project.
- Medium intent: See our work, Explore the product, View capabilities.
- Low intent: Read the case study, See how it works, Read the guide.

Every page gets one primary CTA label. Secondary actions must not visually compete with it.

## 11. Motion

Motion should confirm cause and effect, establish hierarchy, or explain a system.

- Micro interaction: 120–180ms.
- Component transition: 180–240ms.
- Section reveal: 350–500ms.
- Easing enter: `cubic-bezier(.16, 1, .3, 1)`.
- Easing exit: `cubic-bezier(.4, 0, 1, 1)`.
- Reveal distance: 8–16px, never 50px.
- Stagger: 40–70ms, maximum six items.
- Avoid infinite glow and pulse animations except for a real live status.
- Respect `prefers-reduced-motion`; remove transforms and autoplay effects.
- Do not delay content visibility for animation.

## 12. Responsive behavior

- Start with the mobile reading order; desktop columns must collapse into that same logical order.
- Mobile hero uses one column. Show the proof strip after CTAs and the product visual after proof.
- Convert multi-column card grids to a single stack below 768px.
- Do not hide essential evidence or content on mobile.
- Use a minimum 44×44px interactive target.
- Avoid horizontal carousels for core content.
- Tables become labeled cards or horizontally scroll with a visible affordance.
- Keep mobile body copy at 16px or larger.
- Test at 320, 375, 768, 1024, 1280, and 1440px.

## 13. Accessibility requirements

- Meet WCAG 2.2 AA.
- Use one H1 per page and maintain a logical heading hierarchy.
- Provide a visible “Skip to content” link.
- All functionality must work with keyboard alone.
- Focus order follows visual and reading order.
- Do not communicate state through color alone.
- Product images need useful alternative text; decorative graphics use empty alt text.
- Icons used as buttons require accessible names.
- Form errors are programmatically associated with fields and announced.
- Modal dialogs trap focus, label themselves, close on Escape, and restore focus.
- Announce async form and copied-code status with polite live regions.
- Videos require captions and a transcript; no autoplay with sound.
- Support 200% zoom without loss of content or function.

## 14. Performance and quality

- Target Core Web Vitals: LCP ≤ 2.5s, INP ≤ 200ms, CLS ≤ 0.1 at the 75th percentile.
- Use responsive AVIF/WebP images with explicit dimensions.
- Keep the hero's main visual below 250KB where practical.
- Self-host and subset fonts; preload only the primary regular face.
- Limit initial font styles to four files or fewer.
- Avoid video in the first viewport unless it materially improves comprehension.
- Lazy-load below-the-fold media.
- Reserve space for images, embeds, notifications, and form messages.
- Render core marketing copy in HTML; do not depend on client-side JavaScript for discovery.

## 15. Governance

### Component states required before release

Default, hover, focus-visible, active, disabled, loading, empty, error, and success where applicable.

### Definition of done

- Uses named tokens rather than raw colors or arbitrary spacing.
- Works at all defined breakpoints.
- Meets contrast and keyboard requirements.
- Includes real, approved content—not placeholder lorem ipsum.
- Has empty, long-content, error, and loading cases where relevant.
- Does not introduce a duplicate component pattern.
- Passes visual regression, accessibility, and performance checks.

### Ownership

- Product/design owns principles, tokens, and component intent.
- Engineering owns implementation fidelity and test coverage.
- Marketing owns approved messaging and evidence.
- Changes to shared tokens or component behavior require review by both design and engineering.

Review the system quarterly and after any significant product or positioning change.

## 16. Launch checklist

- Value proposition understood in a five-second test.
- Products and services are clearly separated.
- One primary CTA per page.
- Real work or product evidence appears above the midpoint of the home page.
- Every major claim has proof, context, or a path to evidence.
- Navigation works by keyboard and touch.
- Forms cover validation, loading, success, and failure.
- Analytics events are defined for CTA, form, case-study, and product interactions.
- Metadata, social images, sitemap, robots, and structured data are present.
- 404, privacy, terms, accessibility, and thank-you pages are designed.
- Mobile, slow network, reduced motion, zoom, and screen-reader flows are tested.

## 17. Reference boundary

Channex is a useful UX reference for hierarchy, proof placement, developer credibility, and conversion structure. KPI Plus Tech should not reuse Channex's copy, exact gradient, illustrations, layout measurements, screenshots, or component styling. The final website should express KPI Plus Tech's own offer, evidence, people, and visual signal.
