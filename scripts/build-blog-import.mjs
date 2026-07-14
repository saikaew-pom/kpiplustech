import { readdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const draftsDir = path.join(root, "content", "drafts");
const outputFile = path.join(root, "migrations", "0003_publish_blog_library.sql");
const existingSlug = "hotel-self-check-in-thailand-2026-guide";
const publishedAt = "2026-07-14T23:45:00.000Z";

function parseFrontmatter(source) {
  const match = source.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!match) throw new Error("Missing frontmatter");

  const data = {};
  for (const line of match[1].split("\n")) {
    const separator = line.indexOf(":");
    if (separator === -1) continue;
    const key = line.slice(0, separator).trim();
    let value = line.slice(separator + 1).trim();
    if (value.startsWith('"') && value.endsWith('"')) {
      value = JSON.parse(value);
    }
    data[key] = value;
  }

  return { data, content: match[2].trim() };
}

function sql(value) {
  if (value === undefined || value === null || value === "") return "NULL";
  return `'${String(value).replaceAll("'", "''")}'`;
}

function stableId(prefix, slug) {
  return `${prefix}_${slug.replaceAll("-", "_")}`;
}

const files = (await readdir(draftsDir))
  .filter((file) => file.endsWith(".md") && file !== "CONTENT_REVIEW_INDEX.md")
  .sort();

const statements = [
  "-- Publish the 24 reviewed launch-library articles and register their R2 feature images.",
  "-- The original 2026 hotel self-check-in guide is intentionally excluded.",
  "PRAGMA foreign_keys = ON;",
  "",
];

let imported = 0;
for (const file of files) {
  const source = await readFile(path.join(draftsDir, file), "utf8");
  const { data, content } = parseFrontmatter(source);
  if (data.slug === existingSlug) continue;

  const imageName = path.basename(data.featured_image_path);
  const imageKey = `articles/2026-07-15/${imageName}`;
  const postId = stableId("post", data.slug);
  const mediaId = stableId("media", data.slug);

  statements.push(
    `INSERT OR IGNORE INTO media_assets (id, object_key, content_type, alt_text, prompt, provider, created_at, created_by) VALUES (${[
      sql(mediaId),
      sql(imageKey),
      sql("image/jpeg"),
      sql(data.featured_image_alt),
      "NULL",
      sql("openai/gpt-image-2"),
      sql(publishedAt),
      sql(data.author_email),
    ].join(", ")});`,
    `INSERT OR IGNORE INTO posts (id, slug, title, description, category, status, content_markdown, takeaway, featured_image_key, featured_image_alt, seo_title, seo_description, published_at, created_at, updated_at, author_email) VALUES (${[
      sql(postId),
      sql(data.slug),
      sql(data.title),
      sql(data.description),
      sql(data.category),
      sql("published"),
      sql(content),
      sql(data.takeaway),
      sql(imageKey),
      sql(data.featured_image_alt),
      sql(data.seo_title),
      sql(data.seo_description),
      sql(publishedAt),
      sql(publishedAt),
      sql(publishedAt),
      sql(data.author_email),
    ].join(", ")});`,
    "",
  );
  imported += 1;
}

if (imported !== 24) throw new Error(`Expected 24 articles, found ${imported}`);
await writeFile(outputFile, `${statements.join("\n")}\n`);
console.log(`Generated ${path.relative(root, outputFile)} with ${imported} articles.`);
