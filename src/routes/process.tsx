import { createFileRoute } from "@tanstack/react-router";
import { Experience } from "./experience";

export const Route = createFileRoute("/process")({
  head: () => ({
    meta: [
      { title: "Orchard to Port — 7-Stage Avocado Process | Nova Wholesale Trade" },
      { name: "description", content: "Follow a Wolaita avocado through seven stages, from nursery to cold-chain export." },
      { property: "og:title", content: "Orchard to Port — 7-Stage Avocado Process" },
      { property: "og:description", content: "Seven stages from a Wolaita seedling to a chilled export carton." },
    ],
  }),
  component: ProcessWrapper,
});

function ProcessWrapper() {
  return <Experience />;
}
