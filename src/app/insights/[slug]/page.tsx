import { ArrowLeft } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { ButtonLink } from "@/components/button-link";
import { ArticleMarkdown } from "@/components/article-markdown";
import { StructuredData } from "@/components/structured-data";
import { getPublishedPost } from "@/lib/cms/db";
import { siteConfig } from "@/lib/site";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPublishedPost(slug);
  if (!post) return {};

  return {
    title: post.title,
    description: post.description,
    alternates: { canonical: `/insights/${post.slug}` },
    openGraph: { type: "article", title: post.seoTitle || post.title, description: post.seoDescription || post.description, url: `/insights/${post.slug}`, publishedTime: post.publishedAt ?? undefined, modifiedTime: post.updatedAt },
  };
}

export default async function InsightPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPublishedPost(slug);
  if (!post) notFound();

  const postUrl = `${siteConfig.url}/insights/${post.slug}`;
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    datePublished: post.publishedAt ?? post.createdAt,
    dateModified: post.updatedAt,
    mainEntityOfPage: postUrl,
    author: { "@type": "Organization", name: siteConfig.name, url: siteConfig.url },
    publisher: { "@type": "Organization", name: siteConfig.name, url: siteConfig.url },
  };

  return (
    <>
      <StructuredData data={articleJsonLd} />
      <main id="main-content">
        <article>
          <header className="article-hero">
            <div className="hero-grid-bg" aria-hidden="true" />
            <div className="reading-shell article-hero-inner">
              <Link className="article-back" href="/insights"><ArrowLeft size={17} /> All insights</Link>
              <div className="article-meta"><span>{post.category}</span><time dateTime={post.publishedAt ?? post.createdAt}>{new Intl.DateTimeFormat("en", { dateStyle: "long" }).format(new Date(post.publishedAt ?? post.createdAt))}</time><small>{post.readingTime}</small></div>
              <h1>{post.title}</h1>
              <p>{post.description}</p>
              {post.featuredImageKey ? <Image className="article-featured-image" src={`/media/${post.featuredImageKey}`} alt={post.featuredImageAlt || ""} width={1200} height={675} unoptimized /> : null}
            </div>
          </header>

          <div className="reading-shell article-layout">
            <aside className="article-takeaway">
              <span>THE SOUNDBITE</span>
              <p>{post.takeaway}</p>
            </aside>
            <ArticleMarkdown markdown={post.contentMarkdown} />
          </div>
        </article>

        <section className="article-cta">
          <div className="reading-shell">
            <span>APPLY IT TO YOUR OPERATION</span>
            <h2>Turn the idea into a useful next step.</h2>
            <ButtonLink href="/contact" arrow>Discuss your workflow</ButtonLink>
          </div>
        </section>
      </main>
    </>
  );
}
