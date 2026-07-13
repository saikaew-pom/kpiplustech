import { revalidatePath } from "next/cache";

import { authorizeCmsRequest } from "@/lib/cms/auth";
import { createPost, listAllPosts } from "@/lib/cms/db";
import { parsePostInput } from "@/lib/cms/validation";

export const dynamic = "force-dynamic";

export async function GET() {
  if (!await authorizeCmsRequest()) return Response.json({ error: "Unauthorized" }, { status: 401 });
  return Response.json({ posts: await listAllPosts() });
}

export async function POST(request: Request) {
  const identity = await authorizeCmsRequest();
  if (!identity) return Response.json({ error: "Unauthorized" }, { status: 401 });
  const input = parsePostInput(await request.json().catch(() => null));
  if (!input) return Response.json({ error: "Add a title and a valid URL slug." }, { status: 400 });
  try {
    const post = await createPost(input, identity.email);
    revalidatePath("/insights");
    return Response.json({ post }, { status: 201 });
  } catch (error) {
    console.error("Create post failed", error);
    return Response.json({ error: "That URL slug may already be in use." }, { status: 409 });
  }
}
