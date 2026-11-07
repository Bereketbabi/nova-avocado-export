import { createFileRoute } from "@tanstack/react-router";
import { CheckCircle2, Mountain, Sprout, Users } from "lucide-react";
import hero from "@/assets/ethiopian-avocado-farmer.jpg";
import lead from "@/assets/avocado-export-inspection.jpg";
import hands from "@/assets/avocado-quality-hands.jpg";
import fruit from "@/assets/green-avocados-tree.jpg";
import { PageHero } from "@/components/site/PageHero";
import { Reveal, RevealImage } from "@/components/site/Reveal";
import { CtaBand } from "@/components/site/CtaBand";
import { WOLAITA_ADVANTAGES } from "@/lib/content";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Us — Nova Wholesale Trade | Wolaita Avocado Exporters" },
      { name: "description", content: "Connecting the fertile highlands of Wolaita, Ethiopia directly with global fresh produce importers. Discover our origin story, mission, and orchard partnerships." },
      { property: "og:title", content: "About Nova Wholesale Trade — Wolaita Avocado Export" },
      { property: "og:description", content: "Dedicated to the Art & Science of Ethiopian Avocado Export." },
    ],
  }),
  component: About,
});

const PILLARS = [
  { k: "Mission", v: "To deliver consistent, export-grade Ethiopian avocados through rigorous post-harvest management, reliable cold-chain logistics, and transparent long-term buyer partnerships." },
  { k: "Vision", v: "To establish Southern Ethiopia's Wolaita Zone as a globally recognized benchmark for ethical, premium-quality avocado production." },
  { k: "Values", v: "Traceability · Cold-Chain Integrity · Grower Partnership · Uncompromising Quality" },
];

const ADVANTAGE_ICONS = [Mountain, Sprout, Users];

function About() {
  return (
    <>
      <PageHero
        image={hero}
        eyebrow="About Nova Wholesale Trade"
        title="Dedicated to the Art & Science of Ethiopian Avocado Export."
        crumb="About Us"
      />

      {/* Narrative Section */}
      <section className="bg-ivory py-28 md:py-40">
        <div className="container-x grid gap-16 lg:grid-cols-12">
          <Reveal className="lg:col-span-5">
            <p className="eyebrow text-avocado">Who we are</p>
            <h2 className="mt-5 text-3xl sm:text-4xl leading-tight text-forest md:text-5xl">From Trusted Local Supplier to Direct Global Exporter.</h2>
          </Reveal>
          <Reveal delay={0.1} className="space-y-6 leading-relaxed text-muted-foreground lg:col-span-6 lg:col-start-7">
            <p className="text-lg text-foreground">
              Nova Wholesale Trade was founded with a clear purpose: to bring the exceptional quality of Southern Ethiopia's avocados directly to world markets.
            </p>
            <p>
              After years of operating at the heart of the supply chain—sourcing, inspecting, and supplying premium fruit to established exporting firms—we expanded into direct international trade to offer buyers uncompromised traceability and reliability.
            </p>
            <p>
              By eliminating unnecessary intermediaries, we provide international importers with fresher transit times, verified dry-matter consistency, and complete visibility back to the orchards of the Wolaita Zone.
            </p>
          </Reveal>
        </div>
      </section>

      {/* The Wolaita Origin Advantage Section */}
      <section className="bg-sage py-28 md:py-36">
        <div className="container-x">
          <Reveal className="max-w-3xl">
            <p className="eyebrow text-avocado">The Wolaita Advantage</p>
            <h2 className="mt-5 text-3xl sm:text-4xl leading-tight text-forest md:text-5xl">Why Wolaita Region Produces World-Class Avocados.</h2>
            <p className="mt-6 leading-relaxed text-muted-foreground">
              All of our avocados are cultivated and harvested in the Wolaita Zone of Southern Ethiopia—a premier agro-ecological region naturally engineered for year-round avocado excellence.
            </p>
          </Reveal>

          <div className="mt-16 grid gap-8 md:grid-cols-3">
            {WOLAITA_ADVANTAGES.map((adv, i) => {
              const Icon = ADVANTAGE_ICONS[i] ?? Mountain;
              return (
                <Reveal key={adv.title} delay={i * 0.1} className="rounded-sm border border-border bg-ivory p-8 shadow-sm">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-forest text-banana">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="mt-6 text-xl font-bold text-forest">{adv.title}</h3>
                  <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{adv.text}</p>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Pillars Section */}
      <section className="bg-ivory py-28 md:py-36">
        <div className="container-x grid items-center gap-16 lg:grid-cols-2">
          <RevealImage src={lead} alt="Nova trade representative in Wolaita avocado orchard" width={1200} height={1504} className="aspect-[4/5] max-h-[720px]" />
          <div className="space-y-px bg-border">
            {PILLARS.map((p, i) => (
              <Reveal key={p.k} delay={i * 0.1} className="bg-ivory py-10 pr-4">
                <p className="eyebrow text-avocado">0{i + 1} — {p.k}</p>
                <p className="mt-4 font-display text-2xl leading-snug text-forest md:text-3xl">{p.v}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* What sets us apart */}
      <section className="bg-sage py-28 md:py-36">
        <div className="container-x grid gap-6 md:grid-cols-3">
          <RevealImage src={hands} alt="Inspecting avocados by hand for dry matter and grade" width={1408} height={1008} className="aspect-[4/5] md:col-span-1" />
          <Reveal className="flex flex-col justify-center bg-forest p-10 text-ivory md:col-span-1 rounded-sm">
            <p className="eyebrow text-banana">What sets us apart</p>
            <ul className="mt-8 space-y-5 text-base">
              {[
                "Direct orchard sourcing in Wolaita",
                "Dry-matter & caliber testing protocols",
                "Unbroken cold-chain from packhouse to port",
                "Transparent CIF & FOB partnership terms",
                "Phytosanitary & Global GAP adherence",
              ].map((t) => (
                <li key={t} className="flex items-start gap-3 border-b border-ivory/10 pb-4">
                  <CheckCircle2 className="h-5 w-5 text-banana shrink-0 mt-0.5" />
                  <span>{t}</span>
                </li>
              ))}
            </ul>
          </Reveal>
          <RevealImage src={fruit} alt="Avocados ripening on the tree in Wolaita highlands" width={1200} height={1504} className="aspect-[4/5] md:col-span-1" />
        </div>
      </section>

      <CtaBand />
    </>
  );
}
