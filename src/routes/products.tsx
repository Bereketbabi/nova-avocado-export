import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import hero from "@/assets/product-bananas.jpg";
import bunch from "@/assets/banana-bunch.jpg";
import packing from "@/assets/packing-shed.jpg";
import { PageHero } from "@/components/site/PageHero";
import { Reveal, RevealImage } from "@/components/site/Reveal";
import { CtaBand } from "@/components/site/CtaBand";

export const Route = createFileRoute("/products")({
  head: () => ({
    meta: [
      { title: "Products — Nova Wholesale Trade" },
      { name: "description", content: "Fresh Ethiopian bananas supplied for wholesale and export. Specifications available on request." },
      { property: "og:title", content: "Ethiopian Banana Products — Nova" },
      { property: "og:description", content: "Fresh Ethiopian bananas for wholesale and export buyers." },
    ],
  }),
  component: Products,
});

const SPECS = [
  ["Origin", "Ethiopia"],
  ["Variety", "To be confirmed"],
  ["Grade / size", "Available on request"],
  ["Packaging", "Available on request"],
  ["Supply volume", "Discussed per inquiry"],
];

function Products() {
  return (
    <>
      <PageHero image={hero} eyebrow="Our products" title="Ethiopian bananas, selected with care." crumb="Products" />

      <section className="bg-ivory py-28 md:py-40">
        <div className="container-x grid items-center gap-16 lg:grid-cols-12">
          <RevealImage src={hero} alt="Fresh Ethiopian bananas on a banana leaf" width={1408} height={1008} className="aspect-[4/3] lg:col-span-7" />
          <Reveal className="lg:col-span-5">
            <p className="eyebrow text-avocado">Featured product</p>
            <h2 className="mt-5 text-4xl leading-tight text-forest md:text-5xl">Fresh Ethiopian Bananas</h2>
            <p className="mt-6 leading-relaxed text-muted-foreground">Bananas sourced from Ethiopian growing regions and prepared for wholesale and export buyers. Full specifications are shared directly with each buyer.</p>
            <dl className="mt-10 divide-y divide-border border-y border-border">
              {SPECS.map(([k, v]) => (
                <div key={k} className="flex justify-between py-4 text-sm"><dt className="font-semibold text-forest">{k}</dt><dd className="text-muted-foreground">{v}</dd></div>
              ))}
            </dl>
            <Link to="/contact" className="mt-10 inline-flex items-center gap-3 bg-banana px-7 py-4 text-xs font-bold uppercase tracking-[0.18em] text-forest-deep transition-colors hover:bg-banana-deep">Request specifications <ArrowUpRight className="h-4 w-4" /></Link>
          </Reveal>
        </div>
      </section>

      <section className="bg-sage py-28 md:py-36">
        <div className="container-x">
          <Reveal><p className="eyebrow text-avocado">Coming soon</p><h2 className="mt-5 max-w-2xl text-4xl leading-tight text-forest md:text-5xl">More of our range.</h2></Reveal>
          <div className="mt-16 grid gap-6 md:grid-cols-2">
            {[{ img: bunch, t: "Additional varieties", d: "Further banana varieties will be listed here once confirmed." }, { img: packing, t: "Packing options", d: "Carton formats and packing details will be published once confirmed." }].map((c, i) => (
              <Reveal key={c.t} delay={i * 0.1} className="group">
                <div className="relative aspect-[16/11] overflow-hidden">
                  <img src={c.img} alt={c.t} loading="lazy" className="h-full w-full object-cover transition-transform duration-[1.4s] ease-expo group-hover:scale-105" />
                  <span className="absolute left-5 top-5 bg-ivory px-3 py-1.5 text-[0.65rem] font-bold uppercase tracking-[0.2em] text-forest">To be confirmed</span>
                </div>
                <h3 className="mt-6 text-2xl text-forest">{c.t}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{c.d}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      <CtaBand />
    </>
  );
}
