import { getCloudflareContext } from "@opennextjs/cloudflare";

import { authorizeCmsRequest } from "@/lib/cms/auth";

const instructions = `You are the senior content strategist for NAVA, a software company serving hospitality and growing businesses.
Create a useful, credible article with one memorable main takeaway, short sentences, clear headings, and low cognitive load.
Never invent statistics, clients, pricing, integrations, or guarantees. Return JSON only with these keys: title, slug, description, category, takeaway, contentMarkdown, seoTitle, seoDescription.
The markdown must contain 3-5 sections using ## headings, practical paragraphs, and a short bullet list where useful. Aim for 700-1000 words.`;

function parseJson(text: string) {
  const clean = text.trim().replace(/^```(?:json)?/i, "").replace(/```$/, "").trim();
  const start = clean.indexOf("{");
  const end = clean.lastIndexOf("}");
  if (start < 0 || end < start) throw new Error("No JSON returned");
  return JSON.parse(clean.slice(start, end + 1)) as Record<string, string>;
}

function safeStarterDraft(topic: string) {
  const title = topic.replace(/[?.!]+$/, "").trim();
  const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 120);
  return {
    title, slug,
    description: `A practical guide to ${title.charAt(0).toLowerCase()}${title.slice(1)} with less complexity and clearer next steps.`,
    category: /hotel|guest|hospitality/i.test(title) ? "Hotel operations" : "Business technology",
    takeaway: "Make the workflow clear before adding more technology.",
    contentMarkdown: `## Start with the real customer problem\n\nDescribe the pressure your customer feels today, in their own language. Focus on the costly delay, repeated task, or confusing handoff—not the software feature.\n\n## Make the better path easy to understand\n\nExplain the new workflow as a short sequence. Each step should answer what happens, who is responsible, and what the customer gains.\n\n- Remove one unnecessary decision.\n- Keep human help easy to reach.\n- Connect the new step to the systems the team already uses.\n- Measure the operational result after launch.\n\n## Begin with one useful improvement\n\nChoose the smallest change that produces evidence. Review the result with the people doing the work, then expand from what you learn.\n\nThis is a starter outline created when the AI provider was unavailable. Replace these prompts with your expertise before publishing.`,
    seoTitle: title.slice(0, 60),
    seoDescription: `A clear, practical guide to ${title.toLowerCase()}. Learn what to simplify first and how to choose a useful next step.`.slice(0, 155),
  };
}

export async function POST(request: Request) {
  if (!await authorizeCmsRequest()) return Response.json({ error: "Unauthorized" }, { status: 401 });
  const payload = await request.json().catch(() => null) as { topic?: string } | null;
  const topic = payload?.topic?.trim().slice(0, 500);
  if (!topic) return Response.json({ error: "Add an article topic first." }, { status: 400 });

  try {
    const { env } = await getCloudflareContext({ async: true });
    const secrets = env as CloudflareEnv & {
      MINIMAX_API_KEY?: string;
      MINIMAX_MODEL?: string;
    };
    let text = "";
    if (secrets.MINIMAX_API_KEY) {
      try {
        const response = await fetch("https://api.minimax.io/v1/chat/completions", {
          method: "POST",
          headers: { authorization: `Bearer ${secrets.MINIMAX_API_KEY}`, "content-type": "application/json" },
          body: JSON.stringify({ model: secrets.MINIMAX_MODEL ?? "MiniMax-M2.7", temperature: 0.45, response_format: { type: "json_object" }, messages: [{ role: "system", content: instructions }, { role: "user", content: topic }] }),
        });
        if (!response.ok) throw new Error(`MiniMax returned ${response.status}`);
        const result = await response.json() as { choices?: Array<{ message?: { content?: string } }> };
        text = result.choices?.[0]?.message?.content || "";
      } catch (error) {
        console.warn("MiniMax drafting unavailable; using Workers AI", error);
      }
    }
    if (!text) {
      const result = await env.AI.run("@cf/meta/llama-3.1-8b-instruct-fast", {
        messages: [{ role: "system", content: instructions }, { role: "user", content: topic }],
        max_tokens: 1900,
        temperature: 0.45,
        response_format: { type: "json_object" },
      }) as { response?: string | Record<string, string> };
      if (result.response && typeof result.response === "object") {
        return Response.json({ ...result.response, status: "draft", publishedAt: null, featuredImageKey: null, featuredImageAlt: null });
      }
      text = result.response || "";
    }
    const draft = parseJson(text);
    return Response.json({ ...draft, status: "draft", publishedAt: null, featuredImageKey: null, featuredImageAlt: null });
  } catch (error) {
    console.error("CMS generation failed", error);
    return Response.json({ ...safeStarterDraft(topic), status: "draft", publishedAt: null, featuredImageKey: null, featuredImageAlt: null, providerWarning: "AI provider unavailable; starter outline used." });
  }
}
