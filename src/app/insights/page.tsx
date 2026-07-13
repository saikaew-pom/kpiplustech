import { ArrowUpRight } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

import { listPublishedPosts } from "@/lib/cms/db";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Insights for Clearer Digital Operations",
  description: "Practical thinking on hotel operations, digital growth, AI websites, CRM, ERP, and reducing manual work.",
  alternates: { canonical: "/insights" },
};

export default async function InsightsPage() {
  const posts = await listPublishedPosts();
  return (
    <main id="main-content">
      <section className="insights-hero">
        <div className="hero-grid-bg" aria-hidden="true" />
        <div className="shell insights-hero-inner">
          <span className="section-kicker">USEFUL IDEAS, CLEARLY EXPLAINED</span>
          <h1>Make the next digital decision with less guesswork.</h1>
          <p>Practical notes for teams improving customer experience, daily operations, and the systems connecting both.</p>
        </div>
      </section>

      <section className="section insights-list-section">
        <div className="shell insights-list">
          {posts.map((post, index) => (
            <article className={index === 0 ? "insight-row insight-row-featured" : "insight-row"} key={post.slug}>
              <div className="insight-row-meta">
                <span>{post.category}</span>
                <time dateTime={post.publishedAt ?? undefined}>{post.publishedAt ? new Intl.DateTimeFormat("en", { dateStyle: "medium" }).format(new Date(post.publishedAt)) : "Draft"}</time>
                <small>{post.readingTime}</small>
              </div>
              <div>
                <h2><Link href={`/insights/${post.slug}`}>{post.title}</Link></h2>
                <p>{post.description}</p>
                <Link className="card-link" href={`/insights/${post.slug}`}>Read the insight <ArrowUpRight size={18} /></Link>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
