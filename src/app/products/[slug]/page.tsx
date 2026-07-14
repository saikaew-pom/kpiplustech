import { Check, ChevronRight } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { ButtonLink } from "@/components/button-link";
import { StructuredData } from "@/components/structured-data";
import { getProduct, products } from "@/lib/products";
import { siteConfig } from "@/lib/site";

export const dynamicParams = false;

export function generateStaticParams() {
  return products.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({
  params,
}: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);

  if (!product) return {};

  return {
    title: product.title,
    description: product.description,
    alternates: { canonical: `/products/${product.slug}` },
    openGraph: {
      title: `${product.promise} | NAVA`,
      description: product.description,
      url: `/products/${product.slug}`,
    },
  };
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = getProduct(slug);

  if (!product) notFound();

  const Icon = product.icon;
  const productUrl = `${siteConfig.url}/products/${product.slug}`;
  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      name: `NAVA ${product.title}`,
      applicationCategory: "BusinessApplication",
      operatingSystem: "Web",
      url: productUrl,
      description: product.description,
      provider: { "@type": "Organization", name: siteConfig.name, url: siteConfig.url },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: siteConfig.url },
        { "@type": "ListItem", position: 2, name: product.shortTitle, item: productUrl },
      ],
    },
  ];

  return (
    <>
      <StructuredData data={structuredData} />
      <main id="main-content">
        <section className="product-hero product-hero-generic">
          <div className="hero-grid-bg" aria-hidden="true" />
          <div className="shell breadcrumb">
            <Link href="/">Home</Link><ChevronRight size={14} /><span>{product.shortTitle}</span>
          </div>
          <div className="shell product-hero-grid">
            <div className="product-hero-copy">
              <div className="eyebrow"><Icon size={15} /> {product.audience}</div>
              <h1>{product.promise}</h1>
              <p>{product.description}</p>
              <div className="hero-actions">
                <ButtonLink href="/contact" arrow>Discuss your workflow</ButtonLink>
                <ButtonLink href="#outcomes" variant="secondary">See what changes</ButtonLink>
              </div>
            </div>

            <div className="product-signal" aria-label={`${product.shortTitle} workflow summary`}>
              <div className="product-signal-top">
                <span><Icon size={20} /></span>
                <small>{product.eyebrow}</small>
              </div>
              <h2>One clearer operating view</h2>
              <div className="product-signal-flow">
                {product.capabilities.slice(0, 3).map((capability, index) => (
                  <div key={capability.title}>
                    <span>0{index + 1}</span>
                    <p>{capability.title}</p>
                    {index < 2 ? <i aria-hidden="true" /> : null}
                  </div>
                ))}
              </div>
              <p>{product.problem}</p>
            </div>
          </div>
        </section>

        <section className="product-intro-strip">
          <div className="shell"><p>{product.problem}</p></div>
        </section>

        <section className="section" id="outcomes">
          <div className="shell product-detail-grid">
            <div>
              <span className="section-kicker">THE USEFUL CHANGE</span>
              <h2>Make the work clearer before making the system bigger.</h2>
            </div>
            <ul className="product-outcome-list">
              {product.outcomes.map((outcome) => <li key={outcome}><Check size={18} />{outcome}</li>)}
            </ul>
          </div>
        </section>

        <section className="section section-soft">
          <div className="shell">
            <div className="section-heading centered-heading">
              <span className="section-kicker">WHAT THE SYSTEM SUPPORTS</span>
              <h2>Focused capabilities around one business outcome.</h2>
            </div>
            <div className="capability-grid">
              {product.capabilities.map((capability, index) => (
                <div className="capability-card" key={capability.title}>
                  <span>0{index + 1}</span>
                  <h3>{capability.title}</h3>
                  <p>{capability.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="section section-dark">
          <div className="shell implementation-grid">
            <div>
              <span className="dark-kicker">A CONTROLLED DELIVERY PATH</span>
              <h2>Release useful change in clear stages.</h2>
              <p>Each stage should reduce uncertainty and leave your team with something concrete to review.</p>
            </div>
            <ol>
              {product.steps.map((step, index) => (
                <li key={step.title}><span>{index + 1}</span><div><h3>{step.title}</h3><p>{step.text}</p></div></li>
              ))}
            </ol>
          </div>
        </section>

        <section className="section faq-section">
          <div className="shell faq-layout">
            <div>
              <span className="section-kicker">COMMON QUESTIONS</span>
              <h2>What teams usually ask first.</h2>
              <ButtonLink href="/contact" variant="text" arrow>Ask about your setup</ButtonLink>
            </div>
            <div className="faq-list">
              {product.faqs.map((faq, index) => (
                <details key={faq.question} open={index === 0}>
                  <summary>{faq.question}<span aria-hidden="true">+</span></summary>
                  <p>{faq.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className="final-cta product-final-cta">
          <div className="final-cta-grid" aria-hidden="true" />
          <div className="shell final-cta-inner">
            <span>START WITH THE REAL WORK</span>
            <h2>Show us where the workflow slows down.</h2>
            <p>We&apos;ll help you clarify the smallest useful system to build first.</p>
            <ButtonLink href="/contact" variant="light" arrow>Start a conversation</ButtonLink>
          </div>
        </section>
      </main>
    </>
  );
}
