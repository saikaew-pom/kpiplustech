export const siteConfig = {
  name: "NAVA",
  shortName: "NAVA",
  description:
    "Clear software for the work behind great customer experiences across Thailand and ASEAN.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://kpiplustech-web.pskspace.workers.dev",
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "support@thekpiplus.com",
  locale: "en_US",
  location: "Bangkok, Thailand",
};

export const navigation = [
  { label: "Solutions", href: "/#solutions" },
  { label: "Products", href: "/#products" },
  { label: "How we work", href: "/#process" },
  { label: "Insights", href: "/insights" },
  { label: "About", href: "/#about" },
];
