import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import hero from "@/assets/avocado-orchard-hero.jpg";
import lead from "@/assets/avocado-export-inspection.jpg";
import { PageHero } from "@/components/site/PageHero";
import { Reveal, RevealImage } from "@/components/site/Reveal";
import { WorldMap } from "@/components/site/WorldMap";
import { CtaBand } from "@/components/site/CtaBand";

export const Route = createFileRoute("/global-trade")({
  head: () => ({
    meta: [
      { title: "Global Trade — Nova Wholesale Trade" },
      { name: "description", content: "Rooted in Ethiopia, open to the world: building direct relationships with international avocado buyers." },
      { property: "og:title", content: "Global Trade — Nova Wholesale Trade" },
      { property: "og:description", content: "Rooted in Ethiopia. Open to the world." },
    ],
  }),
  component: GlobalTrade,
});

function GlobalTrade() {
  return (
    <>
      <PageHero image={hero} eyebrow="Global trade" title="Rooted in Ethiopia. Open to the world." crumb="Global Trade" />
      <section className="bg-sage py-28 md:py-36">
        <div className="container-x">
          <Reveal className="mx-auto max-w-2xl text-center">
            <p className="eyebrow text-avocado">Origin</p>
            <h2 className="mt-5 text-3xl leading-tight text-forest sm:text-4xl md:text-5xl">Our origin, your market.</h2>
            <p className="mt-6 text-muted-foreground">We are building direct relationships with international buyers seeking dependable Ethiopian avocado supply.</p>
          </Reveal>
          <Reveal className="mx-auto mt-14 max-w-5xl"><WorldMap /></Reveal>
        </div>
      </section>
      <section className="bg-ivory py-28 md:py-36">
        <div className="container-x grid items-center gap-16 lg:grid-cols-2">
          <Reveal>
            <p className="eyebrow text-avocado">Destinations</p>
            <h2 className="mt-5 text-3xl leading-tight text-forest sm:text-4xl md:text-5xl">Confirmed markets will appear here.</h2>
            <p className="mt-6 max-w-lg leading-relaxed text-muted-foreground">As direct export partnerships are confirmed, destination markets will be listed in this section. If you are a buyer interested in Ethiopian avocados, we'd like to hear from you.</p>
            <div className="mt-10 grid grid-cols-2 gap-px bg-border">
              {["Market — TBC", "Market — TBC", "Market — TBC", "Market — TBC"].map((m, i) => (
                <div key={i} className="bg-ivory py-5 text-sm font-semibold text-muted-foreground">{m}</div>
              ))}
            </div>
            <Link to="/contact" className="mt-10 inline-flex items-center gap-3 bg-banana px-7 py-4 text-xs font-bold uppercase tracking-[0.18em] text-forest-deep transition-colors hover:bg-banana-deep">Become a buyer <ArrowUpRight className="h-4 w-4" /></Link>
          </Reveal>
          <RevealImage src={lead} alt="Ethiopian export coordinators inspecting avocados at a refrigerated container" width={1200} height={1504} className="aspect-[4/5] max-h-[700px]" />
        </div>
      </section>
      <CtaBand />
    </>
  );
}
