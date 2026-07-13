import { getCloudflareContext } from "@opennextjs/cloudflare";

import type { CmsPost, PostInput, PostStatus } from "./types";

type PostRow = {
  id: string;
  slug: string;
  title: string;
  description: string;
  category: string;
  status: PostStatus;
  content_markdown: string;
  takeaway: string;
  featured_image_key: string | null;
  featured_image_alt: string | null;
  seo_title: string | null;
  seo_description: string | null;
  published_at: string | null;
  created_at: string;
  updated_at: string;
  author_email: string;
};

async function database() {
  return (await getCloudflareContext({ async: true })).env.CMS_DB;
}

function toPost(row: PostRow): CmsPost {
  const words = row.content_markdown.trim().split(/\s+/).filter(Boolean).length;
  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    description: row.description,
    category: row.category,
    status: row.status,
    contentMarkdown: row.content_markdown,
    takeaway: row.takeaway,
    featuredImageKey: row.featured_image_key,
    featuredImageAlt: row.featured_image_alt,
    seoTitle: row.seo_title,
    seoDescription: row.seo_description,
    publishedAt: row.published_at,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
    authorEmail: row.author_email,
    readingTime: `${Math.max(1, Math.ceil(words / 220))} min read`,
  };
}

const columns = `id, slug, title, description, category, status, content_markdown, takeaway,
  featured_image_key, featured_image_alt, seo_title, seo_description, published_at,
  created_at, updated_at, author_email`;

export async function listPublishedPosts() {
  const result = await (await database())
    .prepare(`SELECT ${columns} FROM posts WHERE status = 'published' AND published_at IS NOT NULL ORDER BY published_at DESC`)
    .all<PostRow>();
  return result.results.map(toPost);
}

export async function getPublishedPost(slug: string) {
  const row = await (await database())
    .prepare(`SELECT ${columns} FROM posts WHERE slug = ? AND status = 'published' LIMIT 1`)
    .bind(slug)
    .first<PostRow>();
  return row ? toPost(row) : null;
}

export async function listAllPosts() {
  const result = await (await database()).prepare(`SELECT ${columns} FROM posts ORDER BY updated_at DESC`).all<PostRow>();
  return result.results.map(toPost);
}

export async function getPostById(id: string) {
  const row = await (await database()).prepare(`SELECT ${columns} FROM posts WHERE id = ? LIMIT 1`).bind(id).first<PostRow>();
  return row ? toPost(row) : null;
}

export async function createPost(input: PostInput, authorEmail: string) {
  const db = await database();
  const id = crypto.randomUUID();
  const now = new Date().toISOString();
  const publishedAt = input.status === "published" ? input.publishedAt || now : input.publishedAt;
  await db.prepare(`INSERT INTO posts (
    id, slug, title, description, category, status, content_markdown, takeaway,
    featured_image_key, featured_image_alt, seo_title, seo_description, published_at,
    created_at, updated_at, author_email
  ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`)
    .bind(id, input.slug, input.title, input.description, input.category, input.status, input.contentMarkdown,
      input.takeaway, input.featuredImageKey, input.featuredImageAlt, input.seoTitle, input.seoDescription,
      publishedAt, now, now, authorEmail)
    .run();
  return getPostById(id);
}

export async function updatePost(id: string, input: PostInput, authorEmail: string) {
  const current = await getPostById(id);
  if (!current) return null;
  const now = new Date().toISOString();
  const publishedAt = input.status === "published" ? input.publishedAt || current.publishedAt || now : input.publishedAt;
  const db = await database();
  await db.batch([
    db.prepare(`INSERT INTO post_revisions (id, post_id, snapshot_json, created_at, created_by) VALUES (?, ?, ?, ?, ?)`)
      .bind(crypto.randomUUID(), id, JSON.stringify(current), now, authorEmail),
    db.prepare(`UPDATE posts SET slug = ?, title = ?, description = ?, category = ?, status = ?,
      content_markdown = ?, takeaway = ?, featured_image_key = ?, featured_image_alt = ?, seo_title = ?,
      seo_description = ?, published_at = ?, updated_at = ?, author_email = ? WHERE id = ?`)
      .bind(input.slug, input.title, input.description, input.category, input.status, input.contentMarkdown,
        input.takeaway, input.featuredImageKey, input.featuredImageAlt, input.seoTitle, input.seoDescription,
        publishedAt, now, authorEmail, id),
  ]);
  return getPostById(id);
}

export async function getDashboardStats() {
  const db = await database();
  const [posts, views, leads] = await db.batch<unknown>([
    db.prepare("SELECT COUNT(*) AS total, SUM(CASE WHEN status = 'published' THEN 1 ELSE 0 END) AS published FROM posts"),
    db.prepare("SELECT COUNT(*) AS total FROM analytics_events WHERE event_name = 'page_view' AND created_at >= datetime('now', '-30 days')"),
    db.prepare("SELECT COUNT(*) AS total FROM lead_submissions WHERE status = 'new'"),
  ]);
  const postRow = posts.results[0] as { total: number; published: number } | undefined;
  const viewRow = views.results[0] as { total: number } | undefined;
  const leadRow = leads.results[0] as { total: number } | undefined;
  return { posts: postRow?.total ?? 0, published: postRow?.published ?? 0, views: viewRow?.total ?? 0, leads: leadRow?.total ?? 0 };
}
