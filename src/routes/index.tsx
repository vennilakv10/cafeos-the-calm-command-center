import { createFileRoute } from "@tanstack/react-router";
import { CafeOS } from "@/components/cafe-os";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "CafeOS — Restaurant operations, made simple" },
      { name: "description", content: "CafeOS brings orders, kitchen, inventory, finance and branches into one calm restaurant operating system." },
      { property: "og:title", content: "CafeOS — Restaurant operations, made simple" },
      { property: "og:description", content: "A modern operating system for cafés and QSRs across India and the GCC." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return <CafeOS />;
}
