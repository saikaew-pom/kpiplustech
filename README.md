# KPI Plus Tech website

Marketing website for KPI Plus Tech, a SaaS and software development company focused on hospitality automation, AI-powered websites, reputation management, CRM, and ERP.

The experience is built around clear, low-cognitive-load messaging, a light-blue visual system, strong technical SEO/GEO foundations, and a Cloudflare-first deployment path.

## Technology

- Next.js 16 App Router with TypeScript
- React 19
- Cloudflare Workers through OpenNext
- Cloudflare D1 content database and revision history
- Cloudflare R2 media library
- MiniMax-ready AI writing/chat with Workers AI fallback
- fal.ai article image generation
- Private first-party page and chatbot analytics
- CSS design system with responsive, accessible components
- Database-backed editorial content with dynamic insight pages
- JSON-LD, sitemap, robots, `llms.txt`, and generated social metadata

## Local development

Use Node.js 20.9 or newer.

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

The local studio is available at [http://localhost:3000/studio](http://localhost:3000/studio). Development mode uses the configured business owner identity. Production requires Cloudflare Access for `support@thekpiplus.com`.

## Quality checks

```bash
npm run lint
npm run typecheck
npm run build
```

## Cloudflare preview and deployment

Authenticate Wrangler before the first live deployment, then run:

```bash
npm run preview
npm run deploy
```

The deployment configuration lives in `wrangler.jsonc` and `open-next.config.ts`.

## Secrets and environment variables

Create a local `.env.local` file when these values are ready:

```bash
NEXT_PUBLIC_SITE_URL=https://your-domain.com
NEXT_PUBLIC_CONTACT_EMAIL=support@thekpiplus.com
```

Add provider keys as encrypted Worker secrets, never as public browser variables:

```bash
npx wrangler secret put FAL_KEY
npx wrangler secret put MINIMAX_API_KEY
```

MiniMax is optional. Without it, the CMS and chatbot use the configured Cloudflare Workers AI binding. fal.ai image generation remains disabled until `FAL_KEY` is present.

## Content Studio

- `/studio` — performance overview and article list
- `/studio/posts/new` — AI-assisted article drafting
- Draft, publish, archive, SEO/GEO metadata, soundbite, and featured image controls
- Automatic revision snapshot before every update
- Published content is read directly from D1; drafts never appear publicly
- Generated article images are copied into R2 instead of depending on temporary provider URLs

Database migrations are in `migrations/`. Apply pending production migrations with:

```bash
npx wrangler d1 migrations apply kpiplustech-cms --remote
```

## Cloudflare Builds

Connect `saikaew-pom/kpiplustech` in **Workers & Pages → kpiplustech-web → Settings → Builds**. Use:

- Build command: `npx opennextjs-cloudflare build`
- Deploy command: `npx opennextjs-cloudflare deploy`
- Production branch: `main`

The first connection requires approving Cloudflare's GitHub App. Runtime secrets remain in Worker Settings and are not copied into GitHub.

## Current pages

- Homepage and product overview
- Hotel self-check-in product page
- AI-powered website, reputation management, CRM, and ERP product pages
- D1-backed Insights index and three seeded launch articles
- AI website guide with MiniMax support and a Workers AI fallback
- Private D1/R2 content studio, revision history, fal.ai image workflow, and analytics overview
- Contact page
- Privacy and terms drafts
- Custom not-found page

Before announcing the final production domain, attach Cloudflare Access to `/studio*` and `/api/cms/*`, confirm the final domain, and add Turnstile when a public enquiry form replaces the current direct business-email channel.
