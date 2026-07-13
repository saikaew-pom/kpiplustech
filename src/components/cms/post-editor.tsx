"use client";

import { ArrowLeft, ImagePlus, LoaderCircle, Sparkles } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import type { CmsPost, PostInput, PostStatus } from "@/lib/cms/types";

const emptyPost: PostInput = {
  slug: "", title: "", description: "", category: "Business technology", status: "draft",
  contentMarkdown: "", takeaway: "", featuredImageKey: null, featuredImageAlt: null,
  seoTitle: null, seoDescription: null, publishedAt: null,
};

function slugify(value: string) {
  return value.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

export function PostEditor({ post }: { post?: CmsPost }) {
  const [form, setForm] = useState<PostInput>(post ?? emptyPost);
  const [topic, setTopic] = useState(post?.title ?? "");
  const [busy, setBusy] = useState<"save" | "ai" | "image" | null>(null);
  const [notice, setNotice] = useState("");
  const words = form.contentMarkdown.trim().split(/\s+/).filter(Boolean).length;

  const set = <K extends keyof PostInput>(key: K, value: PostInput[K]) => setForm((current) => ({ ...current, [key]: value }));

  async function save(status?: PostStatus) {
    setBusy("save"); setNotice("");
    const payload = { ...form, status: status ?? form.status, slug: form.slug || slugify(form.title) };
    try {
      const response = await fetch(post ? `/api/cms/posts/${post.id}` : "/api/cms/posts", {
        method: post ? "PUT" : "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(payload),
      });
      const data = await response.json() as { post?: CmsPost; error?: string };
      if (!response.ok || !data.post) throw new Error(data.error || "Could not save the article.");
      if (!post) window.location.assign(`/studio/posts/${data.post.id}`);
      else { setForm(data.post); setNotice(status === "published" ? "Article published." : "Changes saved."); }
    } catch (error) { setNotice(error instanceof Error ? error.message : "Could not save the article."); }
    finally { setBusy(null); }
  }

  async function draftWithAi() {
    if (!topic.trim()) { setNotice("Add a topic or working title first."); return; }
    setBusy("ai"); setNotice("");
    try {
      const response = await fetch("/api/cms/generate", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ topic }) });
      const data = await response.json() as Partial<PostInput> & { error?: string };
      if (!response.ok) throw new Error(data.error || "AI drafting is unavailable.");
      setForm((current) => ({ ...current, ...data, status: "draft", slug: data.slug || slugify(data.title || topic) }));
      setNotice("Draft created. Review every detail before publishing.");
    } catch (error) { setNotice(error instanceof Error ? error.message : "AI drafting is unavailable."); }
    finally { setBusy(null); }
  }

  async function generateImage() {
    if (!form.title) { setNotice("Add a title before generating an image."); return; }
    setBusy("image"); setNotice("");
    try {
      const response = await fetch("/api/cms/media/generate", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ title: form.title, category: form.category }) });
      const data = await response.json() as { key?: string; alt?: string; error?: string };
      if (!response.ok || !data.key) throw new Error(data.error || "Image generation is unavailable.");
      setForm((current) => ({ ...current, featuredImageKey: data.key!, featuredImageAlt: data.alt || current.title }));
      setNotice("Image generated and saved to your media library.");
    } catch (error) { setNotice(error instanceof Error ? error.message : "Image generation is unavailable."); }
    finally { setBusy(null); }
  }

  return (
    <>
      <header className="studio-heading studio-editor-heading">
        <div><Link className="studio-back" href="/studio"><ArrowLeft size={16} /> Articles</Link><h1>{post ? "Edit article" : "Create article"}</h1><p>{words} words · {Math.max(1, Math.ceil(words / 220))} min read</p></div>
        <div className="studio-actions"><button className="studio-button-secondary" disabled={!!busy} onClick={() => save("draft")}>Save draft</button><button className="studio-button" disabled={!!busy} onClick={() => save("published")}>{busy === "save" ? <LoaderCircle className="spin" size={17} /> : null} Publish</button></div>
      </header>

      <section className="studio-ai-panel">
        <div><Sparkles size={19} /><div><strong>AI writing assistant</strong><span>Creates a clear first draft using your soundbite strategy. You remain the editor.</span></div></div>
        <div className="studio-ai-form"><input value={topic} onChange={(event) => setTopic(event.target.value)} placeholder="Article topic, customer question, or working title" /><button disabled={!!busy} onClick={draftWithAi}>{busy === "ai" ? <LoaderCircle className="spin" size={17} /> : <Sparkles size={17} />} Create draft</button></div>
      </section>

      {notice ? <p className="studio-notice" role="status">{notice}</p> : null}

      <div className="studio-editor-grid">
        <section className="studio-card studio-form">
          <label>Article title<input value={form.title} onChange={(event) => { set("title", event.target.value); if (!post && !form.slug) set("slug", slugify(event.target.value)); }} /></label>
          <label>One-sentence description<textarea rows={2} value={form.description} onChange={(event) => set("description", event.target.value)} /></label>
          <label>The soundbite<input value={form.takeaway} onChange={(event) => set("takeaway", event.target.value)} placeholder="The one idea readers should remember" /></label>
          <label>Article body <span>Use ## for section headings and - for bullet points.</span><textarea className="studio-content-input" value={form.contentMarkdown} onChange={(event) => set("contentMarkdown", event.target.value)} /></label>
        </section>
        <aside className="studio-editor-aside">
          <section className="studio-card studio-form">
            <h2>Publishing</h2>
            <label>Category<input value={form.category} onChange={(event) => set("category", event.target.value)} /></label>
            <label>URL slug<input value={form.slug} onChange={(event) => set("slug", slugify(event.target.value))} /></label>
            <label>Status<select value={form.status} onChange={(event) => set("status", event.target.value as PostStatus)}><option value="draft">Draft</option><option value="published">Published</option><option value="archived">Archived</option></select></label>
          </section>
          <section className="studio-card studio-form">
            <h2>Featured image</h2>
            {form.featuredImageKey ? <Image className="studio-image-preview" src={`/media/${form.featuredImageKey}`} alt={form.featuredImageAlt || ""} width={640} height={360} unoptimized /> : <div className="studio-image-empty"><ImagePlus size={26} /><span>No image yet</span></div>}
            <button className="studio-button-secondary" disabled={!!busy} onClick={generateImage}>{busy === "image" ? <LoaderCircle className="spin" size={17} /> : <ImagePlus size={17} />} Generate with fal.ai</button>
            <label>Image description<input value={form.featuredImageAlt || ""} onChange={(event) => set("featuredImageAlt", event.target.value)} /></label>
          </section>
          <section className="studio-card studio-form">
            <h2>Search & AI discovery</h2>
            <label>SEO title<input value={form.seoTitle || ""} onChange={(event) => set("seoTitle", event.target.value || null)} placeholder={form.title || "Search result title"} /></label>
            <label>SEO description<textarea rows={3} value={form.seoDescription || ""} onChange={(event) => set("seoDescription", event.target.value || null)} placeholder={form.description || "Search result description"} /></label>
          </section>
        </aside>
      </div>
    </>
  );
}
