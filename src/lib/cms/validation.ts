import type { PostInput, PostStatus } from "./types";

const statuses = new Set<PostStatus>(["draft", "published", "archived"]);

export function parsePostInput(value: unknown): PostInput | null {
  if (!value || typeof value !== "object") return null;
  const input = value as Record<string, unknown>;
  const text = (key: string, max: number) => typeof input[key] === "string" ? input[key].trim().slice(0, max) : "";
  const nullable = (key: string, max: number) => text(key, max) || null;
  const status = statuses.has(input.status as PostStatus) ? input.status as PostStatus : "draft";
  const title = text("title", 160);
  const slug = text("slug", 160).toLowerCase().replace(/[^a-z0-9-]/g, "").replace(/-{2,}/g, "-").replace(/^-|-$/g, "");
  if (!title || !slug) return null;
  return {
    title, slug, status,
    description: text("description", 320),
    category: text("category", 80) || "Business technology",
    contentMarkdown: text("contentMarkdown", 50000),
    takeaway: text("takeaway", 240),
    featuredImageKey: nullable("featuredImageKey", 500),
    featuredImageAlt: nullable("featuredImageAlt", 240),
    seoTitle: nullable("seoTitle", 160),
    seoDescription: nullable("seoDescription", 320),
    publishedAt: nullable("publishedAt", 40),
  };
}
