import { ArrowUpRight, Clock3, Mail, MapPin } from "lucide-react";
import type { Metadata } from "next";

import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Book a Demo or Start a Software Project",
  description:
    "Tell KPI Plus Tech what you would like to make simpler. Discuss a product demo, hotel workflow, AI website, CRM, ERP, or custom software project.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <main id="main-content">
      <section className="contact-hero">
        <div className="hero-grid-bg" aria-hidden="true" />
        <div className="shell contact-grid">
          <div className="contact-copy">
            <span className="section-kicker">START WITH THE WORKFLOW</span>
            <h1>What would you like to make simpler?</h1>
            <p>
              Tell us where work is slowing down. We&apos;ll help you clarify the
              problem, the options, and a useful next step.
            </p>
            <div className="contact-expectation">
              <div><Clock3 size={20} /><span><strong>30-minute conversation</strong>No long sales presentation.</span></div>
              <div><ArrowUpRight size={20} /><span><strong>A practical next step</strong>Even when that step is not a new build.</span></div>
            </div>
          </div>

          <div className="contact-card">
            <span>CONTACT KPI PLUS TECH</span>
            <h2>Start the conversation</h2>
            <p>
              Email is the direct launch channel. A protected enquiry form
              will connect to Cloudflare D1 and Turnstile before production.
            </p>
            <a className="contact-email" href={`mailto:${siteConfig.email}?subject=KPI Plus Tech enquiry`}>
              <Mail size={20} />
              <span><small>EMAIL</small><strong>{siteConfig.email}</strong></span>
              <ArrowUpRight size={18} />
            </a>
            <div className="contact-location"><MapPin size={18} /><span>{siteConfig.location}</span></div>
          </div>
        </div>
      </section>
    </main>
  );
}
