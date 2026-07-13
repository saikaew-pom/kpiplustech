import { revalidatePath } from "next/cache";

import { authorizeCmsRequest } from "@/lib/cms/auth";
import { getPostById, updatePost } from "@/lib/cms/db";
import { parsePostInput } from "@/lib/cms/validation";

export const dynamic = "force-dynamic";

export async function GET(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!await authorizeCmsRequest()) return Response.json({ error: "Unauthorized" }, { status: 401 });
  const post = await getPostById((await params).id);
  return post ? Response.json({ post }) : Response.json({ error: "Not found" }, { status: 404 });
}

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const identity = await authorizeCmsRequest();
  if (!identity) return Response.json({ error: "Unauthorized" }, { status: 401 });
  const input = parsePostInput(await request.json().catch(() => null));
  if (!input) return Response.json({ error: "Add a title and a valid URL slug." }, { status: 400 });
  try {
    const post = await updatePost((await params).id, input, identity.email);
    if (!post) return Response.json({ error: "Not found" }, { status: 404 });
    revalidatePath("/insights");
    revalidatePath(`/insights/${post.slug}`);
    return Response.json({ post });
  } catch (error) {
    console.error("Update post failed", error);
    return Response.json({ error: "That URL slug may already be in use." }, { status: 409 });
  }
}
