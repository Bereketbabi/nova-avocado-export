import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, ArrowUpRight, Award, CheckCircle2, ShieldCheck, Sparkles } from "lucide-react";
import { useRef } from "react";
import hero from "@/assets/avocado-orchard-hero.jpg";
import farmer from "@/assets/ethiopian-avocado-farmer.jpg";
import hands from "@/assets/avocado-quality-hands.jpg";
import product from "@/assets/hass-avocado-crate.jpg";
import packing from "@/assets/avocado-packing-house.jpg";
import fruit from "@/assets/green-avocados-tree.jpg";
import { Reveal, RevealImage } from "@/components/site/Reveal";
import { CtaBand } from "@/components/site/CtaBand";
import { WorldMap } from "@/components/site/WorldMap";
import { JOURNEY } from "@/lib/content";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Nova Wholesale Trade — Premium Ethiopian Avocado Exporter (Wolaita Origin)" },
      { name: "description", content: "Export-grade Ethiopian Hass and green-skin avocados from Wolaita highlands. Trusted orchard sourcing and direct international cold-chain export." },
      { property: "og:title", content: "Nova Wholesale Trade — Ethiopian Avocado Export" },
      { property: "og:description", content: "From the Orchards of Wolaita to the World." },
    ],
  }),
  component: Home,
});

const ease = [0.16, 1, 0.3, 1] as const;
const INTRO_DELAY = 2.6; // lines up with the preloader exit

function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "22%"]);
  const fade = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  return (
    <section ref={ref} className="grain relative h-[100svh] min-h-[640px] overflow-hidden bg-forest-deep">
      <motion.div style={{ y }} className="absolute inset-0">
        <motion.img src={hero} alt="Avocado orchard in southern Ethiopia at golden hour" width={1920} height={1088} fetchPriority="high"
          className="h-full w-full object-cover" initial={{ scale: 1.2 }} animate={{ scale: 1 }} transition={{ duration: 3, ease, delay: INTRO_DELAY - 0.6 }} />
      </motion.div>
      <div className="absolute inset-0 bg-side-veil" />
      <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-forest-deep/90 to-transparent" />
      <motion.div style={{ opacity: fade }} className="container-x relative flex h-full flex-col justify-end pb-16 md:pb-24">
        <div className="overflow-hidden">
          <motion.h1
            className="max-w-4xl font-display text-3xl sm:text-5xl md:text-6xl lg:text-[4.75rem] font-bold leading-[1.08] text-ivory"
            initial={{ y: "105%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1.1, ease, delay: INTRO_DELAY + 0.1 }}
          >
            From the Orchards of <br />
            Wolaita <br />
            <span className="italic font-normal text-banana">to the World.</span>
          </motion.h1>
        </div>
        <div className="mt-8 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <motion.p
            className="max-w-xl text-base leading-relaxed text-ivory/85 md:text-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease, delay: INTRO_DELAY + 0.35 }}
          >
            Export-grade Ethiopian Hass and green-skin avocados. Grown in fertile southern highlands, graded with precision, and delivered directly to international markets.
          </motion.p>
          <motion.div
            className="flex flex-wrap gap-3.5"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease, delay: INTRO_DELAY + 0.65 }}
          >
            <Link to="/products" className="inline-flex items-center justify-center gap-3 bg-banana px-5 sm:px-7 py-3.5 sm:py-4 text-xs font-bold uppercase tracking-[0.18em] text-forest-deep transition-colors hover:bg-banana-deep">
              Explore Our Avocados <ArrowRight className="h-4 w-4" />
            </Link>
            <Link to="/contact" className="inline-flex items-center justify-center gap-3 border border-ivory/40 px-5 sm:px-7 py-3.5 sm:py-4 text-xs font-bold uppercase tracking-[0.18em] text-ivory transition-colors hover:border-banana hover:text-banana">
              Start a Partnership
            </Link>
          </motion.div>
        </div>
      </motion.div>
      <motion.div className="absolute bottom-8 right-6 hidden items-center gap-3 text-ivory/60 md:flex md:right-10" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: INTRO_DELAY + 1 }}>
        <span className="eyebrow">Scroll</span>
        <span className="relative h-12 w-px overflow-hidden bg-ivory/20"><motion.span className="absolute inset-x-0 top-0 h-1/2 bg-banana" animate={{ y: ["-100%", "200%"] }} transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }} /></span>
      </motion.div>
    </section>
  );
}

function Home() {
  const PILLARS = [
    { title: "Direct Orchard Sourcing", desc: "Long-term grower partnerships across the Wolaita Region" },
    { title: "Export Sizing & Maturity", desc: "Dry-matter testing ≥23%, calibers 12–24, blemish-free skin" },
    { title: "End-to-End Cold Chain", desc: "Precooled packhouse handling, reefer trucks, and air/sea freight" },
    { title: "Direct Buyer Relationships", desc: "Transparent CIF/FOB terms for international fresh produce importers" },
  ];

  return (
    <>
      <Hero />

      {/* About */}
      <section className="bg-ivory py-28 md:py-40">
        <div className="container-x grid items-center gap-16 lg:grid-cols-12">
          <div className="relative lg:col-span-6">
            <RevealImage src={farmer} alt="Ethiopian farmer harvesting fresh avocados in the orchard" width={1200} height={1504} className="aspect-[4/5] w-[82%]" />
            <RevealImage src={hands} alt="Inspecting fresh export-grade avocados for quality and size" width={1408} height={1008} accent={false} className="absolute -bottom-6 sm:-bottom-12 right-0 aspect-square w-[48%] border-[6px] sm:border-[10px] border-ivory shadow-soft" />
          </div>
          <Reveal className="lg:col-span-5 lg:col-start-8">
            <p className="eyebrow text-avocado">About Nova Wholesale Trade</p>
            <h2 className="mt-5 text-3xl sm:text-4xl leading-[1.08] text-forest md:text-5xl lg:text-6xl">Rooted in Wolaita. Built for Global Avocado Trade.</h2>
            <p className="mt-8 leading-relaxed text-muted-foreground">
              Built on years of hands-on experience sourcing from southern Ethiopia's finest avocado orchards and supplying established exporters, Nova Wholesale Trade now connects Wolaita's premium avocado harvests directly with international importers and wholesalers.
            </p>
            <ul className="mt-10 grid gap-3 sm:grid-cols-2">
              {PILLARS.map((p) => (
                <li key={p.title} className="rounded-sm border border-border/80 bg-sage/30 p-4">
                  <div className="flex items-center gap-2 font-semibold text-forest text-sm">
                    <CheckCircle2 className="h-4 w-4 text-avocado shrink-0" />
                    <span>{p.title}</span>
                  </div>
                  <p className="mt-1.5 text-xs text-muted-foreground">{p.desc}</p>
                </li>
              ))}
            </ul>
            <Link to="/about" className="group mt-10 inline-flex items-center gap-3 text-sm font-bold uppercase tracking-[0.15em] text-forest">
              Discover our story <span className="flex h-10 w-10 items-center justify-center rounded-full border border-forest/30 transition-all duration-500 group-hover:bg-forest group-hover:text-ivory"><ArrowUpRight className="h-4 w-4" /></span>
            </Link>
          </Reveal>
        </div>
      </section>

      {/* Products */}
      <section className="bg-sage py-28 md:py-36">
        <div className="container-x">
          <Reveal className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <p className="eyebrow text-avocado">Our Avocados</p>
              <h2 className="mt-5 max-w-xl text-3xl sm:text-4xl leading-tight text-forest md:text-6xl">Grown in Wolaita's volcanic soil, selected with care.</h2>
            </div>
            <Link to="/products" className="text-sm font-bold uppercase tracking-[0.15em] text-forest underline decoration-banana decoration-2 underline-offset-8">View full avocado catalog</Link>
          </Reveal>
          <div className="mt-16 grid gap-6 md:grid-cols-12">
            {[
              {
                img: product,
                t: "Ethiopian Hass Avocados",
                badge: "Flagship Export Variety",
                d: "Rich, creamy, high-oil content Hass avocados grown in Wolaita's fertile southern highlands. Graded and packed for long-distance sea reefer and air freight.",
                specs: "Dry Matter ≥23% · Counts 12–24 · 4kg & 10kg cartons",
                cls: "md:col-span-7",
                ar: "aspect-[4/3]",
              },
              {
                img: fruit,
                t: "Ettinger & Fuerte Avocados",
                badge: "Green-Skin Varieties",
                d: "Smooth, glossy green-skin varieties prized for their larger caliber sizes, nutty flavor profile, and early-season international export availability.",
                specs: "Delicate Flavor · Calibers 12–22 · High Moisture Balance",
                cls: "md:col-span-5 md:mt-16",
                ar: "aspect-[4/5]",
              },
            ].map((p, i) => (
              <Reveal key={p.t} delay={i * 0.1} className={p.cls}>
                <Link to="/products" className="group block">
                  <div className={`relative overflow-hidden rounded-sm ${p.ar}`}>
                    <img src={p.img} alt={p.t} loading="lazy" className="h-full w-full object-cover transition-transform duration-[1.4s] ease-expo group-hover:scale-105" />
                    <span className="absolute left-4 top-4 rounded-full bg-forest/90 px-3 py-1 text-[0.68rem] font-bold uppercase tracking-wider text-banana backdrop-blur-sm">
                      {p.badge}
                    </span>
                  </div>
                  <div className="mt-6 flex items-start justify-between gap-6">
                    <div>
                      <h3 className="text-2xl text-forest md:text-3xl">{p.t}</h3>
                      <p className="mt-2 max-w-md text-sm leading-relaxed text-muted-foreground">{p.d}</p>
                      <p className="mt-3 text-xs font-semibold uppercase tracking-wider text-avocado">{p.specs}</p>
                    </div>
                    <span className="mt-1 flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-forest text-ivory transition-all duration-500 group-hover:rotate-45 group-hover:bg-banana group-hover:text-forest-deep"><ArrowUpRight className="h-4 w-4" /></span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Experience / Evolution */}
      <section className="grain relative overflow-hidden bg-forest py-28 text-ivory md:py-36">
        <div className="container-x">
          <Reveal className="max-w-2xl">
            <p className="eyebrow text-banana">Our Journey</p>
            <h2 className="mt-5 text-3xl sm:text-4xl leading-tight md:text-6xl">A foundation built orchard by orchard.</h2>
          </Reveal>
          <div className="mt-20 grid gap-px bg-ivory/10 md:grid-cols-2 lg:grid-cols-4">
            {JOURNEY.map((j, i) => (
              <Reveal key={j.title} delay={i * 0.1} className="group bg-forest p-8 transition-colors duration-500 hover:bg-forest-deep">
                <span className="font-display text-6xl text-banana">0{i + 1}</span>
                <h3 className="mt-8 text-xl leading-snug">{j.title}</h3>
                <p className="mt-4 text-sm leading-relaxed text-ivory/65">{j.text}</p>
              </Reveal>
            ))}
          </div>
          <Reveal className="mt-14"><Link to="/experience" className="text-sm font-bold uppercase tracking-[0.15em] text-banana underline underline-offset-8">Explore our full supply journey & process</Link></Reveal>
        </div>
      </section>

      {/* Quality & Supply */}
      <section className="bg-ivory py-28 md:py-36">
        <div className="container-x grid items-center gap-16 lg:grid-cols-2">
          <Reveal>
            <p className="eyebrow text-avocado">Seed-to-Port Quality</p>
            <h2 className="mt-5 text-3xl sm:text-4xl leading-tight text-forest md:text-6xl">Precision from the Wolaita tree to the export carton.</h2>
            <p className="mt-8 max-w-lg leading-relaxed text-muted-foreground">
              From nursery grafting and selective hand-clipping to packhouse brushing, weight grading, precooling, and reefer loading, every stage is controlled to protect fruit integrity.
            </p>
            <div className="mt-8 flex flex-col gap-3">
              <div className="flex items-center gap-3 text-sm font-medium text-forest">
                <ShieldCheck className="h-5 w-5 text-avocado shrink-0" />
                <span>Zero ground contact — clipped with 3–5 mm stem buttons intact</span>
              </div>
              <div className="flex items-center gap-3 text-sm font-medium text-forest">
                <Award className="h-5 w-5 text-avocado shrink-0" />
                <span>Dry-matter tested (22%–26%) for uniform natural ripening</span>
              </div>
            </div>
          </Reveal>
          <RevealImage src={packing} alt="Workers grading and packing fresh avocados into export cartons in Ethiopia" width={1600} height={1008} className="aspect-[16/11]" />
        </div>
      </section>

      {/* Global */}
      <section className="relative overflow-hidden bg-sage py-28 md:py-36">
        <div className="container-x">
          <Reveal className="mx-auto max-w-3xl text-center">
            <p className="eyebrow text-avocado">Global Trade</p>
            <h2 className="mt-5 text-3xl sm:text-4xl leading-tight text-forest md:text-6xl">Rooted in Wolaita. Open to the world.</h2>
            <p className="mx-auto mt-6 max-w-xl text-muted-foreground">
              We are building direct relationships with international importers, distributors, and supermarkets seeking dependable Ethiopian avocado supply.
            </p>
          </Reveal>
          <Reveal className="relative mx-auto mt-14 max-w-5xl">
            <WorldMap />
          </Reveal>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
