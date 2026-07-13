export type PostStatus = "draft" | "published" | "archived";

export type CmsPost = {
  id: string;
  slug: string;
  title: string;
  description: string;
  category: string;
  status: PostStatus;
  contentMarkdown: string;
  takeaway: string;
  featuredImageKey: string | null;
  featuredImageAlt: string | null;
  seoTitle: string | null;
  seoDescription: string | null;
  publishedAt: string | null;
  createdAt: string;
  updatedAt: string;
  authorEmail: string;
  readingTime: string;
};

export type PostInput = Pick<
  CmsPost,
  | "slug"
  | "title"
  | "description"
  | "category"
  | "status"
  | "contentMarkdown"
  | "takeaway"
  | "featuredImageKey"
  | "featuredImageAlt"
  | "seoTitle"
  | "seoDescription"
  | "publishedAt"
>;
