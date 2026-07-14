import Link from "next/link";

import { Logo } from "@/components/logo";
import { siteConfig } from "@/lib/site";

const footerGroups = [
  {
    title: "Solutions",
    links: [
      { label: "Guest experience", href: "/#solutions" },
      { label: "Digital growth", href: "/#solutions" },
      { label: "Connected operations", href: "/#solutions" },
    ],
  },
  {
    title: "Products",
    links: [
      { label: "Hotel self-check-in", href: "/products/hotel-self-check-in" },
      { label: "AI-powered websites", href: "/products/ai-powered-websites" },
      { label: "Reputation management", href: "/products/reputation-management" },
      { label: "CRM", href: "/products/crm" },
      { label: "ERP", href: "/products/erp" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "How we work", href: "/#process" },
      { label: "About", href: "/#about" },
      { label: "Insights", href: "/insights" },
      { label: "Contact", href: "/contact" },
    ],
  },
];

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="shell footer-grid">
        <div className="footer-brand">
          <Logo inverse />
          <p>
            Clear SaaS products and custom software for smoother operations and
            better customer experiences.
          </p>
          <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>
          <span>{siteConfig.location}</span>
        </div>

        {footerGroups.map((group) => (
          <div className="footer-group" key={group.title}>
            <h2>{group.title}</h2>
            <ul>
              {group.links.map((link) => (
                <li key={link.label}>
                  <Link href={link.href}>{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="shell footer-bottom">
        <p>© {new Date().getFullYear()} NAVA. All rights reserved.</p>
        <div>
          <Link href="/privacy">Privacy</Link>
          <Link href="/terms">Terms</Link>
          <Link href="/accessibility">Accessibility</Link>
        </div>
      </div>
    </footer>
  );
}
