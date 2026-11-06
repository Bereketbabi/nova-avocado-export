import { createFileRoute } from "@tanstack/react-router";
import hero from "@/assets/supply-truck.jpg";
import hands from "@/assets/hands-quality.jpg";
import packing from "@/assets/packing-shed.jpg";
import farmer from "@/assets/farmer-harvest.jpg";
import bunch from "@/assets/banana-bunch.jpg";
import { PageHero } from "@/components/site/PageHero";
import { Reveal, RevealImage } from "@/components/site/Reveal";
import { CtaBand } from "@/components/site/CtaBand";
import { JOURNEY, PROCESS } from "@/lib/content";

export const Route = createFileRoute("/experience")({
  head: () => ({
    meta: [
      { title: "Our Experience — Nova Wholesale Trade" },
      { name: "description", content: "How years of supplying established exporters prepared Nova for direct international banana trade." },
      { property: "og:title", content: "Our Experience — Nova Wholesale Trade" },
      { property: "og:description", content: "Quality starts at the source." },
    ],
  }),
  component: Experience,
});

const PROCESS_IMG = [farmer, bunch, hands, packing, hero];

function Experience() {
  return (
    <>
      <PageHero image={hero} eyebrow="Our experience" title="A journey built step by step." crumb="Our Experience" />

      <section className="bg-ivory py-28 md:py-40">
        <div className="container-x">
          <Reveal className="max-w-2xl"><p className="eyebrow text-avocado">Timeline</p><h2 className="mt-5 text-4xl leading-tight text-forest md:text-5xl">From supplier to direct exporter.</h2></Reveal>
          <ol className="relative mt-20 border-l border-border pl-10 md:ml-[33%]">
            {JOURNEY.map((j, i) => (
              <li key={j.title} className="relative pb-16 last:pb-0"><Reveal>
                <span className="absolute -left-[3.05rem] top-1 flex h-6 w-6 items-center justify-center rounded-full bg-banana ring-8 ring-ivory" />
                <span className="font-display text-sm text-avocado md:absolute md:-left-[calc(50%+3rem)] md:top-0 md:w-40 md:text-right md:text-6xl md:text-forest/15">0{i + 1}</span>
                <h3 className="mt-2 text-2xl text-forest md:mt-0 md:text-3xl">{j.title}</h3>
                <p className="mt-3 max-w-xl leading-relaxed text-muted-foreground">{j.text}</p>
              </Reveal></li>
            ))}
          </ol>
        </div>
      </section>

      <section className="grain relative bg-forest py-28 text-ivory md:py-36">
        <div className="container-x">
          <Reveal className="max-w-2xl"><p className="eyebrow text-banana">Quality & supply</p><h2 className="mt-5 text-4xl leading-tight md:text-6xl">Quality starts at the source.</h2></Reveal>
          <div className="mt-20 space-y-24">
            {PROCESS.map((p, i) => (
              <div key={p.title} className={`grid items-center gap-10 md:grid-cols-2 ${i % 2 ? "md:[&>*:first-child]:order-2" : ""}`}>
                <RevealImage src={PROCESS_IMG[i] ?? hero} alt={p.title} className="aspect-[16/11]" />
                <Reveal className="md:px-10">
                  <span className="font-display text-7xl text-banana">0{i + 1}</span>
                  <h3 className="mt-4 text-3xl md:text-4xl">{p.title}</h3>
                  <p className="mt-4 max-w-md leading-relaxed text-ivory/70">{p.text}</p>
                </Reveal>
              </div>
            ))}
          </div>
        </div>
      </section>
      <CtaBand />
    </>
  );
}
