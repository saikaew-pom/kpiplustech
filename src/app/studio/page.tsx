import Link from "next/link";

import { getDashboardStats, listAllPosts } from "@/lib/cms/db";

export default async function StudioPage() {
  const [posts, stats] = await Promise.all([listAllPosts(), getDashboardStats()]);
  return (
    <>
      <header className="studio-heading">
        <div><span className="section-kicker">CONTENT & PERFORMANCE</span><h1>Overview</h1><p>Write, review, publish, and improve every article from one clear workspace.</p></div>
        <Link className="studio-button" href="/studio/posts/new">Create article</Link>
      </header>
      <section className="studio-stats" aria-label="Website summary">
        <div><span>Total articles</span><strong>{stats.posts}</strong></div>
        <div><span>Published</span><strong>{stats.published}</strong></div>
        <div><span>30-day views</span><strong>{stats.views}</strong></div>
        <div><span>New enquiries</span><strong>{stats.leads}</strong></div>
      </section>
      <section className="studio-card">
        <div className="studio-card-heading"><div><h2>Articles</h2><p>Drafts, live articles, and their latest update.</p></div></div>
        <div className="studio-post-list">
          {posts.map((post) => (
            <Link href={`/studio/posts/${post.id}`} key={post.id}>
              <div><strong>{post.title}</strong><span>{post.category} · Updated {new Intl.DateTimeFormat("en", { dateStyle: "medium" }).format(new Date(post.updatedAt))}</span></div>
              <small data-status={post.status}>{post.status}</small>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
