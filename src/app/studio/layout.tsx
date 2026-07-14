import Link from "next/link";

import { getCmsIdentity } from "@/lib/cms/auth";

export const dynamic = "force-dynamic";
export const metadata = { title: "Content Studio", robots: { index: false, follow: false } };

export default async function StudioLayout({ children }: { children: React.ReactNode }) {
  const identity = await getCmsIdentity();
  if (!identity) {
    return (
      <main id="main-content" className="studio-access">
        <div>
          <span className="section-kicker">PRIVATE CONTENT STUDIO</span>
          <h1>This workspace is protected.</h1>
          <p>Cloudflare Access must confirm <strong>support@thekpiplus.com</strong> before the editor can open.</p>
          <Link className="studio-button" href="/">Return to website</Link>
        </div>
      </main>
    );
  }

  return (
    <main id="main-content" className="studio-shell">
      <aside className="studio-sidebar">
        <div><span>NAVA</span><strong>Content Studio</strong></div>
        <nav aria-label="Studio navigation">
          <Link href="/studio">Overview</Link>
          <Link href="/studio/posts/new">New article</Link>
          <Link href="/insights">View website</Link>
        </nav>
        <small>{identity}</small>
      </aside>
      <div className="studio-main">{children}</div>
    </main>
  );
}
