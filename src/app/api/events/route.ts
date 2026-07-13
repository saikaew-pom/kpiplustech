import { getCloudflareContext } from "@opennextjs/cloudflare";

const allowedEvents = new Set(["page_view", "chat_open", "chat_message", "contact_email"]);

export async function POST(request: Request) {
  const payload = await request.json().catch(() => null) as { eventName?: string; path?: string; sessionId?: string } | null;
  if (!payload?.eventName || !allowedEvents.has(payload.eventName)) return new Response(null, { status: 204 });
  const path = (payload.path || "/").slice(0, 500);
  if (!path.startsWith("/") || path.startsWith("/studio")) return new Response(null, { status: 204 });
  try {
    await (await getCloudflareContext({ async: true })).env.CMS_DB.prepare("INSERT INTO analytics_events (id, event_name, path, session_id) VALUES (?, ?, ?, ?)")
      .bind(crypto.randomUUID(), payload.eventName, path, payload.sessionId?.slice(0, 100) || null).run();
  } catch (error) {
    console.error("Analytics event failed", error);
  }
  return new Response(null, { status: 204 });
}
