import { headers } from "next/headers";

const adminEmail = "support@thekpiplus.com";

export async function getCmsIdentity() {
  if (process.env.NODE_ENV === "development") return adminEmail;
  const email = (await headers()).get("cf-access-authenticated-user-email")?.toLowerCase();
  return email === adminEmail ? email : null;
}

export async function requireCmsIdentity() {
  const email = await getCmsIdentity();
  if (!email) throw new Error("CMS_UNAUTHORIZED");
  return email;
}

export async function authorizeCmsRequest() {
  const email = await getCmsIdentity();
  return email ? { email } : null;
}
