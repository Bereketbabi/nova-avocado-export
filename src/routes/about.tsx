import { createFileRoute } from "@tanstack/react-router";
import hero from "@/assets/farmer-harvest.jpg";
import lead from "@/assets/trade-lead.jpg";
import hands from "@/assets/hands-quality.jpg";
import bunch from "@/assets/banana-bunch.jpg";
import { PageHero } from "@/components/site/PageHero";
import { Reveal, RevealImage } from "@/components/site/Reveal";
import { CtaBand } from "@/components/site/CtaBand";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Us — Nova Wholesale Trade" },
      { name: "description", content: "An experienced Ethiopian banana supplier taking the next step into direct international trade." },
      { property: "og:title", content: "About Nova Wholesale Trade" },
      { property: "og:description", content: "From trusted supply to direct global trade." },
    ],
  }),
  component: About,
});

const PILLARS = [
  { k: "Mission", v: "To supply quality Ethiopian bananas to international buyers with consistency, transparency and care at every step." },
  { k: "Vision", v: "To become a trusted name in direct Ethiopian banana trade, connecting growers and global markets." },
  { k: "Values", v: "Reliability · Quality · Integrity · Partnership" },
];

function About() {
  return (
    <>
      <PageHero image={hero} eyebrow="Who we are" title="Experience that goes beyond supply." crumb="About Us" />

      <section className="bg-ivory py-28 md:py-40">
        <div className="container-x grid gap-16 lg:grid-cols-12">
          <Reveal className="lg:col-span-5">
            <p className="eyebrow text-avocado">Our story</p>
            <h2 className="mt-5 text-4xl leading-tight text-forest md:text-5xl">From trusted supply to direct global trade.</h2>
          </Reveal>
          <Reveal delay={0.1} className="space-y-6 leading-relaxed text-muted-foreground lg:col-span-6 lg:col-start-7">
            <p className="text-lg text-foreground">Nova Wholesale Trade has built its experience supplying banana products to several established exporting companies, who handled the international export process.</p>
            <p>That work gave us close relationships with Ethiopian growers and a practical understanding of what export supply demands — consistent selection, careful handling and dependable timing.</p>
            <p>Now we are expanding our operations to export our own products directly to international buyers, bringing the same discipline to every partnership.</p>
          </Reveal>
        </div>
      </section>

      <section className="bg-sage py-28 md:py-36">
        <div className="container-x grid items-center gap-16 lg:grid-cols-2">
          <RevealImage src={lead} alt="Nova Wholesale Trade team member in a banana plantation" width={1200} height={1504} className="aspect-[4/5] max-h-[720px]" />
          <div className="space-y-px bg-border">
            {PILLARS.map((p, i) => (
              <Reveal key={p.k} delay={i * 0.1} className="bg-sage py-10">
                <p className="eyebrow text-avocado">0{i + 1} — {p.k}</p>
                <p className="mt-4 font-display text-2xl leading-snug text-forest md:text-3xl">{p.v}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-ivory py-28 md:py-36">
        <div className="container-x grid gap-6 md:grid-cols-3">
          <RevealImage src={hands} alt="Bananas being checked by hand" width={1408} height={1008} className="aspect-[4/5] md:col-span-1" />
          <Reveal className="flex flex-col justify-center bg-forest p-10 text-ivory md:col-span-1">
            <p className="eyebrow text-banana">What sets us apart</p>
            <ul className="mt-8 space-y-5 text-lg">
              {["Established supply experience", "Knowledge of export requirements", "Close grower relationships", "Direct buyer communication"].map((t) => (
                <li key={t} className="flex gap-4 border-b border-ivory/10 pb-5"><span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-banana" />{t}</li>
              ))}
            </ul>
          </Reveal>
          <RevealImage src={bunch} alt="Banana bunch on the plant" width={1200} height={1504} className="aspect-[4/5] md:col-span-1" />
        </div>
      </section>

      <CtaBand />
    </>
  );
}
