import {
  ArrowUpRight,
  Bot,
  Building2,
  Check,
  Gauge,
  Hotel,
  Layers3,
  MessageSquareText,
  MonitorSmartphone,
  RefreshCw,
  Sparkles,
  UsersRound,
  Workflow,
} from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

import { ButtonLink } from "@/components/button-link";
import { CheckinVisual } from "@/components/checkin-visual";
import { StructuredData } from "@/components/structured-data";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "SaaS Products and Custom Business Software",
  description:
    "NAVA builds hotel self-check-in, reputation, CRM, ERP, and AI-powered web systems that reduce manual work and improve customer experiences.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Run your business with less manual work | NAVA",
    description:
      "Clear software for smoother operations and better customer experiences.",
    url: "/",
  },
};

const paths = [
  {
    icon: Hotel,
    number: "01",
    title: "Guest experience",
    description:
      "Give every guest a faster arrival and a better reason to return.",
    items: ["Hotel self-check-in", "Reputation management"],
    href: "/products/hotel-self-check-in",
    accent: "sky",
  },
  {
    icon: MonitorSmartphone,
    number: "02",
    title: "Digital growth",
    description:
      "Turn more searches, reviews, and enquiries into direct customer relationships.",
    items: ["AI-powered websites", "Customer follow-up"],
    href: "/#products",
    accent: "blue",
  },
  {
    icon: Workflow,
    number: "03",
    title: "Connected operations",
    description:
      "Replace scattered tools and manual updates with one clear operating system.",
    items: ["CRM and ERP", "Integrations and automation"],
    href: "/#products",
    accent: "ink",
  },
];

const products = [
  {
    icon: Hotel,
    eyebrow: "HOSPITALITY",
    title: "Hotel self-check-in",
    description:
      "A clear digital arrival that collects details, confirms requirements, and keeps reception informed.",
    href: "/products/hotel-self-check-in",
  },
  {
    icon: Bot,
    eyebrow: "DIGITAL GROWTH",
    title: "AI-powered websites",
    description:
      "Fast, search-ready websites that answer questions and turn more visits into useful conversations.",
    href: "/products/ai-powered-websites",
  },
  {
    icon: MessageSquareText,
    eyebrow: "CUSTOMER TRUST",
    title: "Reputation management",
    description:
      "Bring reviews and guest feedback into one workflow so your team can respond and improve faster.",
    href: "/products/reputation-management",
  },
  {
    icon: UsersRound,
    eyebrow: "CUSTOMER OPERATIONS",
    title: "CRM",
    description:
      "Keep every customer conversation, opportunity, and next step visible to the right people.",
    href: "/products/crm",
  },
  {
    icon: Building2,
    eyebrow: "BUSINESS OPERATIONS",
    title: "ERP",
    description:
      "Connect finance, inventory, people, and reporting around the way your business actually works.",
    href: "/products/erp",
  },
];

const process = [
  {
    number: "01",
    title: "Understand",
    text: "We map the real work, the bottlenecks, and the outcome worth improving.",
  },
  {
    number: "02",
    title: "Design",
    text: "We turn the workflow into a clear product plan and test the experience early.",
  },
  {
    number: "03",
    title: "Build",
    text: "We deliver in focused releases, with working software visible throughout.",
  },
  {
    number: "04",
    title: "Improve",
    text: "We measure what changes, support the team, and keep the product useful.",
  },
];

export default function Home() {
  const organizationJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.name,
    url: siteConfig.url,
    email: siteConfig.email,
    description: siteConfig.description,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Bangkok",
      addressCountry: "TH",
    },
  };

  const websiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.name,
    url: siteConfig.url,
    description: siteConfig.description,
  };

  return (
    <>
      <StructuredData data={[organizationJsonLd, websiteJsonLd]} />

      <main id="main-content">
        <section className="hero">
          <div className="hero-grid-bg" aria-hidden="true" />
          <div className="shell hero-grid">
            <div className="hero-copy">
              <div className="eyebrow">
                <Sparkles size={15} aria-hidden="true" />
                SaaS products + custom software
              </div>
              <h1>
                Run your business with <span>less manual work.</span>
              </h1>
              <p className="hero-lead">
                We build hotel self-check-in, reputation, CRM, ERP, and
                AI-powered web systems that connect customer experience with
                daily operations.
              </p>

              <div className="hero-actions">
                <ButtonLink href="/contact" arrow>Book a demo</ButtonLink>
                <ButtonLink href="#solutions" variant="secondary">
                  Explore our solutions
                </ButtonLink>
              </div>

              <div className="hero-proof" aria-label="How we work">
                <span><Check size={16} /> Business-first discovery</span>
                <span><Check size={16} /> Senior product thinking</span>
                <span><Check size={16} /> Built for long-term ownership</span>
              </div>
            </div>

            <div className="hero-visual-wrap">
              <CheckinVisual />
            </div>
          </div>
        </section>

        <section className="clarity-strip" aria-label="Our focus">
          <div className="shell clarity-grid">
            <p>One connected view of the work that matters.</p>
            <div>
              <span>Guest journey</span><i />
              <span>Customer growth</span><i />
              <span>Business operations</span>
            </div>
          </div>
        </section>

        <section className="section" id="solutions">
          <div className="shell">
            <div className="section-heading section-heading-split">
              <div>
                <span className="section-kicker">START WITH THE BOTTLENECK</span>
                <h2>Where is work slowing you down?</h2>
              </div>
              <p>
                Choose the outcome you need. We&apos;ll help you find the right
                product, integration, or custom build.
              </p>
            </div>

            <div className="path-grid">
              {paths.map((path) => {
                const Icon = path.icon;
                return (
                  <Link
                    className={`path-card path-${path.accent}`}
                    href={path.href}
                    key={path.title}
                  >
                    <div className="path-card-top">
                      <span className="path-icon"><Icon size={23} /></span>
                      <span className="path-number">{path.number}</span>
                    </div>
                    <h3>{path.title}</h3>
                    <p>{path.description}</p>
                    <ul>
                      {path.items.map((item) => <li key={item}>{item}</li>)}
                    </ul>
                    <span className="card-link">
                      Explore this path <ArrowUpRight size={18} />
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        <section className="section section-dark flagship-section">
          <div className="shell flagship-grid">
            <div className="flagship-copy">
              <span className="dark-kicker">FLAGSHIP PRODUCT</span>
              <h2>A smoother arrival for guests. Less pressure at reception.</h2>
              <p>
                Give guests one clear check-in journey before arrival, while
                your team sees what is complete and what needs attention.
              </p>

              <div className="benefit-list">
                <div><span><Check size={16} /></span><p><strong>Collect details once</strong>Keep the arrival flow clear and consistent.</p></div>
                <div><span><RefreshCw size={16} /></span><p><strong>Keep staff in the loop</strong>Surface exceptions instead of creating more admin.</p></div>
                <div><span><Gauge size={16} /></span><p><strong>Make progress visible</strong>See which guests are ready before they reach the desk.</p></div>
              </div>

              <ButtonLink href="/products/hotel-self-check-in" variant="light" arrow>
                See the guest journey
              </ButtonLink>
            </div>

            <div className="flagship-visual">
              <CheckinVisual compact />
            </div>
          </div>
        </section>

        <section className="section" id="products">
          <div className="shell">
            <div className="section-heading centered-heading">
              <span className="section-kicker">A CONNECTED PRODUCT SYSTEM</span>
              <h2>Use one product. Connect the whole operation.</h2>
              <p>
                Start with the problem that costs the most time, then connect
                the rest when the business is ready.
              </p>
            </div>

            <div className="product-grid">
              {products.map((product, index) => {
                const Icon = product.icon;
                return (
                  <Link
                    className={`product-card ${index === 0 ? "product-card-featured" : ""}`}
                    href={product.href}
                    key={product.title}
                  >
                    <div className="product-card-icon"><Icon size={22} /></div>
                    <span>{product.eyebrow}</span>
                    <h3>{product.title}</h3>
                    <p>{product.description}</p>
                    <span className="product-arrow" aria-hidden="true"><ArrowUpRight size={19} /></span>
                  </Link>
                );
              })}
            </div>

            <div className="system-line" aria-label="Products can work together">
              <Layers3 size={19} />
              <span>One customer journey</span><i />
              <span>One source of truth</span><i />
              <span>Fewer manual handoffs</span>
            </div>
          </div>
        </section>

        <section className="section section-soft" id="process">
          <div className="shell process-layout">
            <div className="process-intro">
              <span className="section-kicker">HOW WE WORK</span>
              <h2>Clear decisions before more code.</h2>
              <p>
                We begin with the work, not the technology. That keeps the
                product focused and gives every release a reason to exist.
              </p>
              <ButtonLink href="/contact" variant="text" arrow>
                Talk through your workflow
              </ButtonLink>
            </div>

            <ol className="process-list">
              {process.map((step) => (
                <li key={step.number}>
                  <span>{step.number}</span>
                  <div><h3>{step.title}</h3><p>{step.text}</p></div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="section" id="about">
          <div className="shell confidence-grid">
            <div className="confidence-panel">
              <span className="section-kicker">ABOUT US</span>
              <h2>We make the work behind great experiences feel simpler.</h2>
              <p>
                We started with a simple observation: businesses lose momentum
                in the handoffs between promise and delivery. Our job is to
                remove the repetitive work, connect the systems that matter,
                and leave people more time for judgement, care, and growth.
              </p>
              <div className="confidence-tags">
                <span>Cloud-first</span><span>API-ready</span><span>Accessible</span><span>Search-ready</span>
              </div>
            </div>

            <div className="confidence-points">
              <div><span><Layers3 size={20} /></span><h3>Designed to connect</h3><p>Build around existing systems where that creates more value than replacement.</p></div>
              <div><span><Gauge size={20} /></span><h3>Measured by the work</h3><p>Success means less friction, clearer decisions, and a better customer experience.</p></div>
              <div><span><RefreshCw size={20} /></span><h3>Ready to evolve</h3><p>Documented systems and focused releases make future improvements easier.</p></div>
            </div>
          </div>
        </section>

        <section className="section insight-section" id="insights">
          <div className="shell insight-shell">
            <div>
              <span className="section-kicker">PRACTICAL INSIGHT</span>
              <h2>Better software starts with a better question.</h2>
            </div>
            <div className="insight-card">
              <span>GUIDE · HOTEL OPERATIONS</span>
              <h3>What should a hotel automate before guest arrival?</h3>
              <p>
                A practical way to separate useful automation from another
                layer of technology for your team to manage.
              </p>
              <Link className="muted-link" href="/insights/hotel-self-check-in-without-losing-hospitality">
                Read the article <ArrowUpRight size={17} />
              </Link>
            </div>
          </div>
        </section>

        <section className="final-cta">
          <div className="final-cta-grid" aria-hidden="true" />
          <div className="shell final-cta-inner">
            <span>START WITH ONE CONVERSATION</span>
            <h2>What would you like to make simpler?</h2>
            <p>
              Show us the workflow that is slowing your team down. We&apos;ll help
              you find the clearest next step.
            </p>
            <ButtonLink href="/contact" variant="light" arrow>
              Book a 30-minute discovery call
            </ButtonLink>
            <small>No sales theatre. Just the problem, the options, and a useful next step.</small>
          </div>
        </section>
      </main>
    </>
  );
}
