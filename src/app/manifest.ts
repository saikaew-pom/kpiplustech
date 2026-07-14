import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "NAVA",
    short_name: "NAVA",
    description: "Clear software for the work behind great customer experiences.",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#071722",
    icons: [],
  };
}
