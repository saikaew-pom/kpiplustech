"use client";

import dynamic from "next/dynamic";

const SiteChat = dynamic(
  () => import("@/components/site-chat").then((module) => module.SiteChat),
  { ssr: false }
);

export function SiteChatLoader() {
  return <SiteChat />;
}
