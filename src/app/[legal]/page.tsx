import type { Metadata } from "next";
import { notFound } from "next/navigation";

const pages = {
  privacy: {
    title: "Privacy",
    intro: "How KPI Plus Tech intends to handle information submitted through this website.",
    sections: [
      ["Information we collect", "We may collect contact information, enquiry details, basic website analytics, and technical security signals when you choose to contact us or use site features."],
      ["How information is used", "Information is used to respond to enquiries, operate and secure the website, improve our services, and meet legal obligations."],
      ["AI features", "When AI chat is introduced, the interface will identify itself clearly, explain retention, and ask for consent before converting conversation details into a sales lead."],
      ["Your choices", "You may ask about, correct, or request deletion of personal information, subject to applicable legal requirements."],
      ["Contact", "This is a launch placeholder and requires legal review before production. Contact hello@kpiplustech.com with privacy questions."],
    ],
  },
  terms: {
    title: "Terms",
    intro: "Basic terms for using the KPI Plus Tech website.",
    sections: [
      ["Website information", "Website content is provided for general information and does not create a client relationship, service commitment, or product guarantee."],
      ["Intellectual property", "Unless stated otherwise, the website's brand, design, written content, and original materials belong to KPI Plus Tech."],
      ["External services", "Links to third-party services are provided for convenience. Their availability and practices are outside our control."],
      ["Changes", "We may update these terms as the website and services evolve."],
      ["Review required", "This launch placeholder must be reviewed for the company's legal entity, jurisdiction, products, and contracting model before production."],
    ],
  },
  accessibility: {
    title: "Accessibility",
    intro: "KPI Plus Tech aims to make its website useful to as many people as possible.",
    sections: [
      ["Our target", "The website is being designed and tested toward WCAG 2.2 Level AA, including keyboard access, visible focus, readable contrast, responsive zoom, and reduced-motion support."],
      ["Ongoing work", "Accessibility is reviewed as content and features change. The CMS and chatbot will be held to the same interaction requirements as public pages."],
      ["Feedback", "If something prevents you from using this website, contact hello@kpiplustech.com and describe the page, device, and assistance you need."],
    ],
  },
} as const;

type LegalPage = keyof typeof pages;

export function generateStaticParams() {
  return Object.keys(pages).map((legal) => ({ legal }));
}

export async function generateMetadata({ params }: { params: Promise<{ legal: string }> }): Promise<Metadata> {
  const { legal } = await params;
  if (!(legal in pages)) return {};
  const page = pages[legal as LegalPage];
  return { title: page.title, description: page.intro, alternates: { canonical: `/${legal}` } };
}

export default async function LegalPage({ params }: { params: Promise<{ legal: string }> }) {
  const { legal } = await params;
  if (!(legal in pages)) notFound();
  const page = pages[legal as LegalPage];

  return (
    <main id="main-content" className="legal-page">
      <article className="reading-shell">
        <span className="section-kicker">KPI PLUS TECH</span>
        <h1>{page.title}</h1>
        <p className="legal-intro">{page.intro}</p>
        <div className="legal-notice">Draft website copy — legal review required before production launch.</div>
        {page.sections.map(([title, text]) => (
          <section key={title}><h2>{title}</h2><p>{text}</p></section>
        ))}
      </article>
    </main>
  );
}
