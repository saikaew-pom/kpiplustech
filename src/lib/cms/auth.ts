import { createRemoteJWKSet, jwtVerify } from "jose";
import { headers } from "next/headers";

const defaultAdminEmail = "support@thekpiplus.com";

let accessJwks: ReturnType<typeof createRemoteJWKSet> | null = null;
let accessJwksUrl = "";

function getAccessJwks(teamDomain: string) {
  const jwksUrl = `${teamDomain}/cdn-cgi/access/certs`;

  if (!accessJwks || accessJwksUrl !== jwksUrl) {
    accessJwks = createRemoteJWKSet(new URL(jwksUrl));
    accessJwksUrl = jwksUrl;
  }

  return accessJwks;
}

export async function getCmsIdentity() {
  const adminEmail = (process.env.CMS_ADMIN_EMAIL || defaultAdminEmail).toLowerCase();

  if (process.env.NODE_ENV === "development") return adminEmail;
  if (String(process.env.CMS_ACCESS_READY) !== "true") return null;

  const teamDomain = process.env.CF_ACCESS_TEAM_DOMAIN?.replace(/\/+$/, "");
  const audience = process.env.CF_ACCESS_AUD;
  const token = (await headers()).get("cf-access-jwt-assertion");

  if (!teamDomain || !audience || !token) return null;

  try {
    const { payload } = await jwtVerify(token, getAccessJwks(teamDomain), {
      algorithms: ["RS256"],
      audience,
      issuer: teamDomain,
    });

    if (payload.type !== "app" || typeof payload.email !== "string") return null;

    const email = payload.email.toLowerCase();
    return email === adminEmail ? email : null;
  } catch {
    return null;
  }
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
