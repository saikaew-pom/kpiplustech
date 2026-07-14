import { ArrowUpRight, Compass, HeartHandshake, Layers3, Sparkles } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

import { ButtonLink } from "@/components/button-link";
import { StructuredData } from "@/components/structured-data";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn why KPI Plus Tech builds clear software for the work behind great customer experiences across Thailand and ASEAN.",
  alternates: { canonical: "/about" },
};

const principles = [
  {
    icon: Compass,
    title: "Start with the real work",
    text: "We listen for the handoff that costs your team time, trust, or momentum before we recommend a feature.",
  },
  {
    icon: Layers3,
    title: "Connect what already matters",
    text: "Good software should reduce the number of places your team has to look, copy, and remember.",
  },
  {
    icon: HeartHandshake,
    title: "Keep people in the loop",
    text: "Automation should make human help easier to reach, not make a customer feel passed around by machines.",
  },
];

export default function AboutPage() {
  const organizationJsonLd = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: "About KPI Plus Tech",
    url: `${siteConfig.url}/about`,
    description: metadata.description,
    about: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
      address: { "@type": "PostalAddress", addressLocality: "Bangkok", addressCountry: "TH" },
    },
  };

  return (
    <>
      <StructuredData data={organizationJsonLd} />
      <main id="main-content">
        <section className="contact-hero">
          <div className="hero-grid-bg" aria-hidden="true" />
          <div className="shell contact-grid">
            <div className="contact-copy">
              <span className="section-kicker">ABOUT US</span>
              <h1>Clearer systems for the work people remember.</h1>
              <p>
                We build practical software for businesses that care about the
                experience they deliver, but are tired of losing time between
                one system, one team, and the next.
              </p>
              <ButtonLink href="/contact" arrow>Start a conversation</ButtonLink>
            </div>
            <div className="contact-card">
              <Sparkles size={24} aria-hidden="true" />
              <span>OUR SOUND BITE</span>
              <h2>Make the work behind great experiences feel simpler.</h2>
              <p>Less operational noise gives good teams more room to notice, decide, and grow.</p>
            </div>
          </div>
        </section>

        <section className="section">
          <div className="shell confidence-grid">
            <div className="confidence-panel">
              <span className="section-kicker">THE STORY</span>
              <h2>It started with the handoffs.</h2>
              <p>
                A booking becomes an arrival. An enquiry becomes a follow-up.
                A promise becomes a delivered service. Those moments should
                feel connected, yet they are often where businesses lose
                momentum: a spreadsheet here, a chat message there, and a
                customer waiting for someone to find the answer.
              </p>
              <p>
                We started KPI Plus Tech to make those moments clearer. From
                hotel self-check-in and reputation management to AI-powered
                websites, CRM, and ERP, we turn repeated work into dependable
                workflows while keeping people close to the decisions that
                matter.
              </p>
              <p>
                We are based in Bangkok and build with the realities of
                Thailand and ASEAN in mind: multilingual customers, lean teams,
                fast-moving operations, and growth that should not require a
                maze of software to manage.
              </p>
            </div>
            <div className="confidence-points">
              {principles.map(({ icon: Icon, title, text }) => (
                <div key={title}>
                  <span><Icon size={20} /></span>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="section">
          <div className="shell insight-shell">
            <div>
              <span className="dark-kicker">WHAT WE BELIEVE</span>
              <h2>Technology should create confidence, not another task list.</h2>
            </div>
            <div className="insight-card">
              <span>OUR APPROACH</span>
              <h3>Understand first. Build with purpose. Improve in public.</h3>
              <p>
                The best next step is sometimes a product, sometimes an
                integration, and sometimes a clearer decision not to automate.
                We will tell you which one we believe.
              </p>
              <ButtonLink href="/contact" variant="light" arrow>Talk through your workflow</ButtonLink>
            </div>
          </div>
        </section>

        <section className="section section-soft">
          <div className="shell section-heading section-heading-split">
            <div>
              <span className="section-kicker">READY WHEN YOU ARE</span>
              <h2>Bring us the messy part.</h2>
            </div>
            <p>
              Tell us where the customer journey or daily operation is losing
              energy. We will help you find a practical place to begin.
              <br /><br />
              <Link className="muted-link" href="/contact">Meet the team <ArrowUpRight size={17} /></Link>
            </p>
          </div>
        </section>
      </main>
    </>
  );
}
