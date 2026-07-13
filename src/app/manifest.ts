import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "KPI Plus Tech",
    short_name: "KPI+",
    description: "Clear software for smoother operations.",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#071722",
    icons: [],
  };
}
