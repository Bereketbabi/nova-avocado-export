import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight, Check, ShieldCheck, Sparkles, Thermometer, Truck } from "lucide-react";
import hero from "@/assets/client-export-carton-pack.jpg";
import quality from "@/assets/client-hass-hand-quality.jpg";
import fruit from "@/assets/client-green-avocados-tree.jpg";
import packing from "@/assets/avocado-packing-house.jpg";
import { PageHero } from "@/components/site/PageHero";
import { Reveal, RevealImage } from "@/components/site/Reveal";
import { CtaBand } from "@/components/site/CtaBand";
import { AVOCADO_SPECS } from "@/lib/content";

export const Route = createFileRoute("/products")({
  head: () => ({
    meta: [
      { title: "Products — Nova Wholesale Trade | Ethiopian Avocado Export Portfolio" },
      { name: "description", content: "Premium Ethiopian avocados (Hass, Ettinger, Fuerte, Nabal) sourced from Wolaita highlands. Graded to international standards and packed in 4kg and 10kg export cartons." },
      { property: "og:title", content: "Ethiopian Avocado Export Products — Nova" },
      { property: "og:description", content: "Fresh Ethiopian avocados for international wholesale and retail importers." },
    ],
  }),
  component: Products,
});

const VARIETIES = [
  {
    name: "Ethiopian Hass Avocado",
    badge: "Flagship Export Variety",
    desc: "Our primary export cultivar. Characterized by thick, pebbly skin that ripens from deep forest green to an appetizing purplish-black.",
    flavor: "Rich, nutty, buttery flavor with high oil content and smooth, fiberless pale-yellow flesh.",
    dryMatter: "≥ 23% at harvest (tested by microwave/oven desiccation)",
    season: "August – December (Peak Export Window)",
    freight: "Ideal for long-distance controlled atmosphere (CA) sea reefer containers (up to 30 days).",
    img: quality,
    calibers: "Counts 12, 14, 16, 18, 20, 22, 24",
  },
  {
    name: "Ettinger Avocado",
    badge: "Green-Skin Early Crop",
    desc: "Smooth, glossy, bright green pear-shaped avocado highly prized in European and Middle Eastern wholesale markets for early-season delivery.",
    flavor: "Mild, creamy texture with delicate sweetness and lighter oil composition.",
    dryMatter: "≥ 21% at harvest",
    season: "July – October",
    freight: "Excellent for air freight and direct regional maritime trade lanes.",
    img: fruit,
    calibers: "Counts 12, 14, 16, 18, 20",
  },
  {
    name: "Fuerte & Nabal Avocados",
    badge: "Gourmet Cultivars",
    desc: "Complementary commercial varieties. Fuerte offers classic medium-thin pebbly green skin, while Nabal features large round fruit with dense culinary pulp.",
    flavor: "Rich and aromatic, preferred by commercial food-service and specialty retailers.",
    dryMatter: "≥ 22% at harvest",
    season: "September – January",
    freight: "Sea reefer and air cargo programs.",
    img: packing,
    calibers: "Counts 10, 12, 14, 16, 18",
  },
];

function Products() {
  return (
    <>
      <PageHero
        image={hero}
        eyebrow="Our Export Portfolio"
        title="Premium Ethiopian Avocados."
        crumb="Products"
      />

      {/* Featured Flagship Product Section */}
      <section className="bg-ivory py-28 md:py-40">
        <div className="container-x grid items-center gap-16 lg:grid-cols-12">
          <RevealImage src={hero} alt="Fresh Ethiopian Hass Avocados ready for export" width={1408} height={1008} className="aspect-[4/3] lg:col-span-7" />
          <Reveal className="lg:col-span-5">
            <span className="inline-block rounded-full bg-forest px-3 py-1 text-xs font-bold uppercase tracking-wider text-banana">
              Flagship Export Variety
            </span>
            <h2 className="mt-4 text-3xl sm:text-4xl leading-tight text-forest md:text-5xl">Ethiopian Hass Avocados</h2>
            <p className="mt-5 leading-relaxed text-muted-foreground">
              Cultivated in Wolaita's mineral-rich volcanic soil at 1,800 meters elevation, our Hass avocados develop thick pebbly skin, exceptional oil concentration, and uniform ripening profiles.
            </p>
            <div className="mt-8 space-y-3">
              <div className="flex items-center gap-2 text-sm font-semibold text-forest">
                <Check className="h-4 w-4 text-avocado" />
                <span>Dry Matter: Minimum 23% at harvest (optimal ripening)</span>
              </div>
              <div className="flex items-center gap-2 text-sm font-semibold text-forest">
                <Check className="h-4 w-4 text-avocado" />
                <span>Pulp: Zero fiber, creamy pale-yellow with high oleic acid</span>
              </div>
              <div className="flex items-center gap-2 text-sm font-semibold text-forest">
                <Check className="h-4 w-4 text-avocado" />
                <span>Packing: 4 kg open-top & 10 kg telescopic ventilated export cartons</span>
              </div>
            </div>
            <Link to="/contact" className="mt-10 inline-flex items-center gap-3 bg-banana px-7 py-4 text-xs font-bold uppercase tracking-[0.18em] text-forest-deep transition-colors hover:bg-banana-deep">
              Request Price Quote (FOB / CIF) <ArrowUpRight className="h-4 w-4" />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* Complete Variety Breakdown */}
      <section className="bg-sage py-28 md:py-36">
        <div className="container-x">
          <Reveal>
            <p className="eyebrow text-avocado">Cultivar Diversity</p>
            <h2 className="mt-4 max-w-2xl text-3xl sm:text-4xl leading-tight text-forest md:text-5xl">
              Export Varieties from the Wolaita Highlands.
            </h2>
            <p className="mt-4 max-w-xl text-muted-foreground">
              We offer multiple commercial cultivars to give our international retail and wholesale buyers continuous seasonal coverage from July through January.
            </p>
          </Reveal>

          <div className="mt-16 grid gap-8 lg:grid-cols-3">
            {VARIETIES.map((v, i) => (
              <Reveal key={v.name} delay={i * 0.1} className="flex flex-col justify-between rounded-sm border border-border bg-ivory p-8 shadow-sm">
                <div>
                  <div className="relative aspect-[16/10] overflow-hidden rounded-sm">
                    <img src={v.img} alt={v.name} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 hover:scale-105" />
                    <span className="absolute left-3 top-3 rounded-full bg-forest/90 px-3 py-1 text-[0.68rem] font-bold uppercase tracking-wider text-banana">
                      {v.badge}
                    </span>
                  </div>
                  <h3 className="mt-6 text-2xl font-bold text-forest">{v.name}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{v.desc}</p>
                  
                  <div className="mt-6 space-y-2 border-t border-border pt-4 text-xs text-forest/90">
                    <p><strong className="text-forest">Flavor & Pulp:</strong> {v.flavor}</p>
                    <p><strong className="text-forest">Dry Matter:</strong> {v.dryMatter}</p>
                    <p><strong className="text-forest">Season:</strong> {v.season}</p>
                    <p><strong className="text-forest">Calibers:</strong> {v.calibers}</p>
                  </div>
                </div>

                <Link to="/contact" className="mt-8 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-forest hover:text-avocado">
                  Inquire About {v.name} <ArrowUpRight className="h-3.5 w-3.5" />
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Technical Export Specifications Table */}
      <section className="bg-ivory py-28 md:py-36">
        <div className="container-x">
          <Reveal className="max-w-3xl">
            <p className="eyebrow text-avocado">Technical Export Data</p>
            <h2 className="mt-4 text-3xl sm:text-4xl leading-tight text-forest md:text-5xl">
              Specifications & Packing Standards.
            </h2>
            <p className="mt-4 text-muted-foreground">
              Every shipment is packed to stringent European and Middle Eastern import specifications, certified by the Ethiopian Ministry of Agriculture.
            </p>
          </Reveal>

          <Reveal delay={0.1} className="mt-14 overflow-hidden rounded-sm border border-border bg-ivory shadow-sm">
            <dl className="divide-y divide-border">
              {AVOCADO_SPECS.map((s, idx) => (
                <div key={s.label} className={`grid grid-cols-1 gap-2 p-5 sm:grid-cols-12 sm:items-center ${idx % 2 === 0 ? "bg-sage/15" : "bg-ivory"}`}>
                  <dt className="text-sm font-bold text-forest sm:col-span-5">{s.label}</dt>
                  <dd className="text-sm text-muted-foreground sm:col-span-7">{s.value}</dd>
                </div>
              ))}
            </dl>
          </Reveal>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            <div className="flex items-start gap-4 rounded-sm border border-border bg-sage/30 p-6">
              <Thermometer className="h-6 w-6 text-avocado shrink-0 mt-1" />
              <div>
                <h4 className="font-bold text-forest text-sm">Cold Chain Integrity</h4>
                <p className="mt-1 text-xs leading-relaxed text-muted-foreground">Precooled to 5°C–7°C and transported in continuous temperature-monitored reefer containers.</p>
              </div>
            </div>
            <div className="flex items-start gap-4 rounded-sm border border-border bg-sage/30 p-6">
              <Truck className="h-6 w-6 text-avocado shrink-0 mt-1" />
              <div>
                <h4 className="font-bold text-forest text-sm">Dual Freight Corridors</h4>
                <p className="mt-1 text-xs leading-relaxed text-muted-foreground">Air cargo via Bole International Airport (24–48h) or sea reefer via Djibouti port corridor.</p>
              </div>
            </div>
            <div className="flex items-start gap-4 rounded-sm border border-border bg-sage/30 p-6">
              <ShieldCheck className="h-6 w-6 text-avocado shrink-0 mt-1" />
              <div>
                <h4 className="font-bold text-forest text-sm">Phytosanitary Certification</h4>
                <p className="mt-1 text-xs leading-relaxed text-muted-foreground">100% compliant with importing country pest screening, pesticide residue, and MRL limits.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
