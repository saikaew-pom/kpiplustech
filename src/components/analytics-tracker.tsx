"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

function sessionId() {
  const key = "nava_session";
  let id = sessionStorage.getItem(key);
  if (!id) { id = crypto.randomUUID(); sessionStorage.setItem(key, id); }
  return id;
}

export function trackEvent(eventName: string, path = window.location.pathname) {
  const body = JSON.stringify({ eventName, path, sessionId: sessionId() });
  if (navigator.sendBeacon) navigator.sendBeacon("/api/events", new Blob([body], { type: "application/json" }));
  else void fetch("/api/events", { method: "POST", headers: { "content-type": "application/json" }, body, keepalive: true });
}

export function AnalyticsTracker() {
  const pathname = usePathname();
  useEffect(() => { if (!pathname.startsWith("/studio")) trackEvent("page_view", pathname); }, [pathname]);
  return null;
}
