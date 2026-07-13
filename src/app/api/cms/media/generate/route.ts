import { getCloudflareContext } from "@opennextjs/cloudflare";

import { authorizeCmsRequest } from "@/lib/cms/auth";

export async function POST(request: Request) {
  const identity = await authorizeCmsRequest();
  if (!identity) return Response.json({ error: "Unauthorized" }, { status: 401 });
  const payload = await request.json().catch(() => null) as { title?: string; category?: string } | null;
  if (!payload?.title) return Response.json({ error: "Add an article title first." }, { status: 400 });

  const { env } = await getCloudflareContext({ async: true });
  const secrets = env as CloudflareEnv & { FAL_KEY?: string };
  if (!secrets.FAL_KEY) return Response.json({ error: "FAL_KEY has not been added to this Cloudflare Worker yet." }, { status: 503 });

  const prompt = `Editorial hero image for a premium B2B software article titled "${payload.title.slice(0, 180)}". Category: ${(payload.category || "business technology").slice(0, 80)}. Clean light-blue and white palette, precise modern SaaS aesthetic, subtle depth, one strong visual metaphor, spacious composition, no text, no logos, no people, 16:9.`;
  try {
    const falResponse = await fetch("https://fal.run/fal-ai/flux/schnell", {
      method: "POST",
      headers: { authorization: `Key ${secrets.FAL_KEY}`, "content-type": "application/json" },
      body: JSON.stringify({ prompt, image_size: "landscape_16_9", num_images: 1, enable_safety_checker: true }),
    });
    if (!falResponse.ok) throw new Error(`fal.ai returned ${falResponse.status}`);
    const generated = await falResponse.json() as { images?: Array<{ url?: string; content_type?: string }> };
    const imageUrl = generated.images?.[0]?.url;
    if (!imageUrl) throw new Error("fal.ai returned no image");
    const imageResponse = await fetch(imageUrl);
    if (!imageResponse.ok) throw new Error("Could not retrieve generated image");
    const contentType = imageResponse.headers.get("content-type") || "image/jpeg";
    const extension = contentType.includes("png") ? "png" : contentType.includes("webp") ? "webp" : "jpg";
    const key = `articles/${new Date().toISOString().slice(0, 10)}/${crypto.randomUUID()}.${extension}`;
    await env.MEDIA_BUCKET.put(key, imageResponse.body, { httpMetadata: { contentType, cacheControl: "public, max-age=31536000, immutable" } });
    await env.CMS_DB.prepare("INSERT INTO media_assets (id, object_key, content_type, alt_text, prompt, provider, created_by) VALUES (?, ?, ?, ?, ?, 'fal-ai/flux/schnell', ?)")
      .bind(crypto.randomUUID(), key, contentType, `Editorial illustration for ${payload.title.slice(0, 180)}`, prompt, identity.email).run();
    return Response.json({ key, alt: `Editorial illustration for ${payload.title.slice(0, 180)}` });
  } catch (error) {
    console.error("Image generation failed", error);
    return Response.json({ error: "fal.ai could not generate the image right now." }, { status: 502 });
  }
}
