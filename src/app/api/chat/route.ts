import { getCloudflareContext } from "@opennextjs/cloudflare";

type IncomingMessage = {
  role: "user" | "assistant";
  content: string;
};

const systemPrompt = `You are the KPI Plus Tech website guide. Help business visitors understand the clearest useful next step.

KPI Plus Tech builds:
- hotel self-check-in systems
- AI-powered, SEO-ready websites
- reputation management systems
- CRM systems
- ERP and connected operations software
- custom integrations and workflow automation

Style rules:
- Be concise, calm, practical, and easy to scan.
- Lead with the direct answer.
- Ask at most one useful follow-up question.
- Never invent prices, delivery dates, integrations, clients, or performance claims.
- When details depend on the visitor's setup, say so clearly and suggest booking a discovery conversation.
- Do not request sensitive personal, payment, identity, or confidential business data.
- Use short markdown only when a small list improves clarity.`;

function fallbackStream(message: string) {
  const encoder = new TextEncoder();
  return new ReadableStream({
    start(controller) {
      controller.enqueue(encoder.encode(`data: ${JSON.stringify({ response: message })}\n\n`));
      controller.enqueue(encoder.encode("data: [DONE]\n\n"));
      controller.close();
    },
  });
}

async function minimaxAnswer(messages: IncomingMessage[], apiKey: string, model: string) {
  const response = await fetch("https://api.minimax.io/v1/chat/completions", {
    method: "POST",
    headers: { authorization: `Bearer ${apiKey}`, "content-type": "application/json" },
    body: JSON.stringify({ model, temperature: 0.35, max_tokens: 420, messages: [{ role: "system", content: systemPrompt }, ...messages] }),
  });
  if (!response.ok) throw new Error(`MiniMax returned ${response.status}`);
  const result = await response.json() as { choices?: Array<{ message?: { content?: string } }> };
  const answer = result.choices?.[0]?.message?.content?.trim();
  if (!answer) throw new Error("MiniMax returned no answer");
  return answer;
}

export async function POST(request: Request) {
  let payload: { messages?: IncomingMessage[] };

  try {
    payload = await request.json();
  } catch {
    return Response.json({ error: "Invalid request." }, { status: 400 });
  }

  const messages = (payload.messages ?? [])
    .filter((message) => message.role === "user" || message.role === "assistant")
    .slice(-8)
    .map((message) => ({
      role: message.role,
      content: message.content.trim().slice(0, 1200),
    }))
    .filter((message) => message.content.length > 0);

  if (!messages.length || messages.at(-1)?.role !== "user") {
    return Response.json({ error: "Please send a question." }, { status: 400 });
  }

  try {
    const { env } = await getCloudflareContext({ async: true });
    const secrets = env as CloudflareEnv & { MINIMAX_API_KEY?: string };
    if (secrets.MINIMAX_API_KEY) {
      const answer = await minimaxAnswer(messages, secrets.MINIMAX_API_KEY, env.MINIMAX_MODEL);
      return new Response(fallbackStream(answer), { headers: { "Content-Type": "text/event-stream; charset=utf-8", "Cache-Control": "no-cache, no-transform", "X-Content-Type-Options": "nosniff" } });
    }
    const stream = await env.AI.run("@cf/meta/llama-3.1-8b-instruct-fp8", {
      messages: [{ role: "system", content: systemPrompt }, ...messages],
      max_tokens: 420,
      temperature: 0.35,
      stream: true,
    });

    return new Response(stream, {
      headers: {
        "Content-Type": "text/event-stream; charset=utf-8",
        "Cache-Control": "no-cache, no-transform",
        "X-Content-Type-Options": "nosniff",
      },
    });
  } catch (error) {
    console.error("Workers AI chat unavailable", error);
    return new Response(
      fallbackStream(
        "I can still point you in the right direction. KPI Plus Tech helps with hotel self-check-in, AI-powered websites, reputation management, CRM, and ERP. Tell me which workflow is creating the most manual work, or use **Book a demo** to discuss it with the team."
      ),
      { headers: { "Content-Type": "text/event-stream; charset=utf-8" } }
    );
  }
}
