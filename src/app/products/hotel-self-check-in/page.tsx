import {
  BellRing,
  Check,
  ChevronRight,
  CircleUserRound,
  CreditCard,
  Hotel,
  KeyRound,
  MessageSquareText,
  ShieldCheck,
  Signature,
  Sparkles,
} from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

import { ButtonLink } from "@/components/button-link";
import { GuestPhone } from "@/components/guest-phone";
import { StructuredData } from "@/components/structured-data";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Hotel Self-Check-In System",
  description:
    "Give hotel guests a clear digital check-in before arrival while your front desk sees what is complete and what needs attention.",
  alternates: { canonical: "/products/hotel-self-check-in" },
  openGraph: {
    title: "A smoother hotel arrival | KPI Plus Tech",
    description:
      "Digital hotel self-check-in that reduces repetitive front-desk work and keeps guests informed.",
    url: "/products/hotel-self-check-in",
  },
};

const journey = [
  {
    icon: MessageSquareText,
    number: "01",
    title: "Invite",
    text: "Send one clear, branded check-in link before arrival.",
  },
  {
    icon: CircleUserRound,
    number: "02",
    title: "Confirm",
    text: "Collect guest details and the requirements your hotel needs.",
  },
  {
    icon: Signature,
    number: "03",
    title: "Complete",
    text: "Handle registration, policies, and optional payments in one flow.",
  },
  {
    icon: KeyRound,
    number: "04",
    title: "Arrive",
    text: "Share arrival guidance or room access at the right time.",
  },
];

const outcomes = [
  {
    title: "For guests",
    items: [
      "A shorter, clearer arrival",
      "Complete details on their own device",
      "Useful instructions before reaching the hotel",
    ],
  },
  {
    title: "For front desk",
    items: [
      "See who is ready before arrival",
      "Focus on exceptions instead of repeat entry",
      "Keep a consistent registration process",
    ],
  },
  {
    title: "For management",
    items: [
      "A visible arrival workflow",
      "Fewer disconnected handoffs",
      "A foundation for better guest follow-up",
    ],
  },
];

const faqs = [
  {
    question: "Does self-check-in replace the front desk?",
    answer:
      "No. It removes repetitive arrival steps so the front desk can focus on hospitality, exceptions, and guests who need personal help.",
  },
  {
    question: "Can the journey match our hotel brand?",
    answer:
      "Yes. The guest-facing flow is designed to use your hotel's identity, instructions, and policies so it feels like part of the stay.",
  },
  {
    question: "Can it connect with our current hotel systems?",
    answer:
      "The intended architecture is integration-ready. We first review your PMS, payments, identity requirements, messaging, and room-access setup before confirming the exact connection plan.",
  },
  {
    question: "What happens when a guest cannot complete a step?",
    answer:
      "The experience should explain what is missing and route exceptions to staff. A digital journey must make assistance easier, not hide it.",
  },
  {
    question: "How long does implementation take?",
    answer:
      "Timing depends on branding, required steps, and integrations. After a short discovery, we provide a staged implementation plan with clear responsibilities and acceptance criteria.",
  },
];

export default function HotelSelfCheckinPage() {
  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "KPI Plus Tech Hotel Self-Check-In",
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    url: `${siteConfig.url}/products/hotel-self-check-in`,
    description:
      "A digital hotel arrival system that helps guests complete check-in before arrival and gives staff a clear view of progress and exceptions.",
    provider: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
    },
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: siteConfig.url,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Hotel self-check-in",
        item: `${siteConfig.url}/products/hotel-self-check-in`,
      },
    ],
  };

  return (
    <>
      <StructuredData data={[productJsonLd, breadcrumbJsonLd]} />

      <main id="main-content">
        <section className="product-hero">
          <div className="hero-grid-bg" aria-hidden="true" />
          <div className="shell breadcrumb">
            <Link href="/">Home</Link><ChevronRight size={14} /><span>Hotel self-check-in</span>
          </div>
          <div className="shell product-hero-grid">
            <div className="product-hero-copy">
              <div className="eyebrow"><Hotel size={15} /> For hotel operations teams</div>
              <h1>A smoother arrival for guests. <span>Less pressure for your front desk.</span></h1>
              <p>
                Give guests one clear check-in journey before arrival, while
                your team sees what is complete and what needs attention.
              </p>
              <div className="hero-actions">
                <ButtonLink href="/contact" arrow>Book a product demo</ButtonLink>
                <ButtonLink href="#journey" variant="secondary">See how it works</ButtonLink>
              </div>
              <div className="product-hero-note">
                <ShieldCheck size={19} />
                <span><strong>Designed around trust</strong> Clear consent, secure handling, and visible assistance.</span>
              </div>
            </div>
            <GuestPhone />
          </div>
        </section>

        <section className="product-intro-strip">
          <div className="shell">
            <p>
              Hotel self-check-in gives guests a faster arrival <strong>without
              adding another disconnected task for your team.</strong>
            </p>
          </div>
        </section>

        <section className="section" id="journey">
          <div className="shell">
            <div className="section-heading centered-heading journey-heading">
              <span className="section-kicker">ONE CLEAR GUEST JOURNEY</span>
              <h2>From pre-arrival message to ready-to-welcome.</h2>
              <p>Each step should remove uncertainty for the guest and make progress visible to staff.</p>
            </div>

            <ol className="journey-grid">
              {journey.map((step, index) => {
                const Icon = step.icon;
                return (
                  <li key={step.title}>
                    <div className="journey-icon"><Icon size={23} /></div>
                    <span>{step.number}</span>
                    <h3>{step.title}</h3>
                    <p>{step.text}</p>
                    {index < journey.length - 1 ? <i aria-hidden="true" /> : null}
                  </li>
                );
              })}
            </ol>
          </div>
        </section>

        <section className="section section-soft">
          <div className="shell outcome-layout">
            <div className="outcome-intro">
              <span className="section-kicker">WHAT CHANGES</span>
              <h2>Less arrival admin. More time for hospitality.</h2>
              <p>
                The system is successful when guests know what to do and staff
                spend less time repeating the same steps.
              </p>
            </div>
            <div className="outcome-grid">
              {outcomes.map((outcome) => (
                <div className="outcome-card" key={outcome.title}>
                  <h3>{outcome.title}</h3>
                  <ul>
                    {outcome.items.map((item) => <li key={item}><Check size={15} />{item}</li>)}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="section integration-section">
          <div className="shell integration-grid">
            <div className="integration-copy">
              <span className="section-kicker">DESIGNED TO CONNECT</span>
              <h2>Fit the arrival into your hotel stack.</h2>
              <p>
                We review the systems you already use, then define where data
                should move automatically and where staff should stay in control.
              </p>
              <ButtonLink href="/contact" variant="text" arrow>Discuss your hotel setup</ButtonLink>
            </div>
            <div className="integration-map" aria-label="Potential hotel system connections">
              <div className="integration-center"><Hotel size={25} /><strong>Self-check-in</strong></div>
              <div className="integration-node node-one"><Sparkles size={17} /><span>PMS</span></div>
              <div className="integration-node node-two"><CreditCard size={17} /><span>Payments</span></div>
              <div className="integration-node node-three"><ShieldCheck size={17} /><span>Identity</span></div>
              <div className="integration-node node-four"><BellRing size={17} /><span>Messaging</span></div>
              <div className="integration-node node-five"><KeyRound size={17} /><span>Room access</span></div>
              <svg aria-hidden="true" viewBox="0 0 600 360" preserveAspectRatio="none">
                <path d="M300 180 C220 170 180 90 105 72" />
                <path d="M300 180 C380 160 420 82 505 72" />
                <path d="M300 180 C190 185 150 180 70 190" />
                <path d="M300 180 C395 200 430 180 535 192" />
                <path d="M300 180 C302 235 300 270 300 315" />
              </svg>
            </div>
          </div>
        </section>

        <section className="section section-dark implementation-section">
          <div className="shell implementation-grid">
            <div>
              <span className="dark-kicker">IMPLEMENTATION</span>
              <h2>Start with your real arrival process.</h2>
              <p>
                No two hotels handle arrival in exactly the same way. We map
                what must stay, what can be simplified, and what should connect.
              </p>
            </div>
            <ol>
              <li><span>1</span><div><h3>Arrival workshop</h3><p>Map guest types, current steps, exceptions, policies, and systems.</p></div></li>
              <li><span>2</span><div><h3>Branded pilot</h3><p>Configure one clear journey and test it with staff before rollout.</p></div></li>
              <li><span>3</span><div><h3>Connect and launch</h3><p>Integrate agreed systems, train the team, and monitor the first arrivals.</p></div></li>
              <li><span>4</span><div><h3>Improve</h3><p>Review completion, exceptions, guest feedback, and operational impact.</p></div></li>
            </ol>
          </div>
        </section>

        <section className="section faq-section">
          <div className="shell faq-layout">
            <div>
              <span className="section-kicker">COMMON QUESTIONS</span>
              <h2>What hotel teams usually ask first.</h2>
              <p>Need a more specific answer? Tell us about your current arrival process.</p>
              <ButtonLink href="/contact" variant="text" arrow>Ask about your setup</ButtonLink>
            </div>
            <div className="faq-list">
              {faqs.map((faq, index) => (
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
            <span>SEE IT AROUND YOUR ARRIVAL FLOW</span>
            <h2>Make the next guest arrival easier.</h2>
            <p>Show us how check-in works today. We&apos;ll demonstrate the clearest place to begin.</p>
            <ButtonLink href="/contact" variant="light" arrow>Book a product demo</ButtonLink>
          </div>
        </section>
      </main>
    </>
  );
}
