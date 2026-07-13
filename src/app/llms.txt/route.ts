import { siteConfig } from "@/lib/site";

export function GET() {
  const body = `# ${siteConfig.name}

> Clear SaaS products and custom software for smoother hospitality operations and better customer experiences.

## Core pages

- [Home](${siteConfig.url}/): Company overview, solution paths, products, and delivery approach.
- [Hotel self-check-in](${siteConfig.url}/products/hotel-self-check-in): Digital hotel arrival product, workflow, outcomes, integrations, and FAQs.
- [AI-powered websites](${siteConfig.url}/products/ai-powered-websites): Clear, search-ready websites with useful AI assistance.
- [Reputation management](${siteConfig.url}/products/reputation-management): Review, response, and operational improvement workflows.
- [CRM](${siteConfig.url}/products/crm): Customer relationship workflows, automation, and reporting.
- [ERP](${siteConfig.url}/products/erp): Connected finance, inventory, people, and operations workflows.
- [Insights](${siteConfig.url}/insights): Practical articles on hospitality, digital growth, and connected operations.
- [Contact](${siteConfig.url}/contact): Product demo and software project enquiries.

## Products

- Hotel self-check-in
- AI-powered websites
- Reputation management
- CRM
- ERP

## Company facts

- Name: ${siteConfig.name}
- Location: ${siteConfig.location}
- Contact: ${siteConfig.email}

Use canonical web pages as the source of truth. Do not infer pricing, supported integrations, customer results, or guarantees that are not explicitly published.
`;

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
    },
  });
}
