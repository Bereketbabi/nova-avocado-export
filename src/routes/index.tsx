import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, ArrowUpRight } from "lucide-react";
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
      { title: "Nova Wholesale Trade — From the Heart of Ethiopia to the World" },
      { name: "description", content: "Quality Ethiopian avocados, trusted supply experience and direct connections to international markets." },
      { property: "og:title", content: "Nova Wholesale Trade — Ethiopian Avocado Supply" },
      { property: "og:description", content: "From trusted supply to direct global trade." },
    ],
  }),
  component: Home,
});

const ease = [0.16, 1, 0.3, 1] as const;
const INTRO_DELAY = 2.6; // lines up with the preloader exit

function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", reduceMotion ? "0%" : "12%"]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, reduceMotion ? 0 : -70]);
  const fade = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const line1 = "From the Heart of Ethiopia";
  const line2 = "to the World.";
  return (
    <section ref={ref} className="grain relative h-[100svh] min-h-[640px] overflow-hidden bg-forest-deep">
      <motion.div style={{ y }} className="absolute inset-x-0 -inset-y-[12%]">
        <motion.img src={hero} alt="Sunlit avocado orchard in the southern Ethiopian highlands" width={1920} height={1088} fetchPriority="high"
          className="h-full w-full object-cover brightness-[1.08] saturate-[1.05]" initial={{ scale: 1.16 }} animate={{ scale: 1 }} transition={{ duration: 3, ease, delay: INTRO_DELAY - 0.6 }} />
      </motion.div>
      <div className="absolute inset-0 bg-hero-veil" />
      <div className="absolute inset-x-0 bottom-0 h-1/2 bg-hero-bottom" />
      <motion.div style={{ opacity: fade, y: contentY }} className="container-x relative flex h-full flex-col justify-end pb-20 md:pb-28">
        <motion.p className="eyebrow flex items-center gap-4 text-banana" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 1, ease, delay: INTRO_DELAY }}>
          <span className="h-px w-10 bg-banana" /> Ethiopian Agricultural Exports
        </motion.p>
        <h1 className="mt-6 max-w-5xl text-[2.4rem] leading-[1.02] text-ivory sm:text-6xl md:text-7xl lg:text-[6.5rem]">
          {[line1, line2].map((l, i) => (
            <span key={i} className="block overflow-hidden pb-2">
              <motion.span className={`block ${i === 1 ? "italic text-banana" : ""}`} initial={{ y: "110%" }} animate={{ y: 0 }} transition={{ duration: 1.3, ease, delay: INTRO_DELAY + 0.1 + i * 0.14 }}>{l}</motion.span>
            </span>
          ))}
        </h1>
        <div className="mt-10 flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
          <motion.p className="max-w-md text-base leading-relaxed text-ivory/90 md:text-lg" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, ease, delay: INTRO_DELAY + 0.5 }}>
            Quality Ethiopian avocados. Trusted supply experience. Direct connections to international markets.
          </motion.p>
          <motion.div className="flex flex-wrap gap-3" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, ease, delay: INTRO_DELAY + 0.65 }}>
            <Link to="/products" className="inline-flex items-center gap-3 bg-banana px-7 py-4 text-xs font-bold uppercase tracking-[0.18em] text-forest-deep transition-colors hover:bg-banana-deep">
              Explore Our Products <ArrowRight className="h-4 w-4" />
            </Link>
            <Link to="/contact" className="inline-flex items-center gap-3 border border-ivory/40 px-7 py-4 text-xs font-bold uppercase tracking-[0.18em] text-ivory transition-colors hover:border-banana hover:text-banana">
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
  return (
    <>
      <Hero />

      {/* About */}
      <section className="bg-ivory py-28 md:py-40">
        <div className="container-x grid items-center gap-16 lg:grid-cols-12">
          <div className="relative lg:col-span-6">
            <RevealImage src={farmer} alt="Ethiopian farmer inspecting a Hass avocado on the tree" width={1200} height={1504} parallax={30} className="aspect-[4/5] w-[82%]" />
            <RevealImage src={hands} alt="Inspector holding freshly cut Ethiopian avocados" width={1408} height={1056} parallax={18} accent={false} className="absolute -bottom-12 right-0 aspect-square w-[48%] border-[10px] border-ivory shadow-soft" />
          </div>
          <Reveal className="lg:col-span-5 lg:col-start-8">
            <p className="eyebrow text-avocado">About Nova</p>
            <h2 className="mt-5 text-3xl leading-[1.08] text-forest sm:text-4xl md:text-6xl">Experience that goes beyond supply.</h2>
            <p className="mt-8 leading-relaxed text-muted-foreground">
              Built on years of experience supplying established export partners, Nova Wholesale Trade now connects quality Ethiopian avocado production directly with international markets.
            </p>
            <ul className="mt-10 grid gap-px bg-border sm:grid-cols-2">
              {["Established supply experience", "Understanding of export requirements", "Commitment to quality", "Direct relationships with buyers"].map((t) => (
                <li key={t} className="bg-ivory py-4 pr-4 text-sm font-semibold text-forest"><span className="mr-3 inline-block h-1.5 w-1.5 rounded-full bg-banana align-middle" />{t}</li>
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
              <p className="eyebrow text-avocado">Our Products</p>
              <h2 className="mt-5 max-w-xl text-3xl leading-tight text-forest sm:text-4xl md:text-6xl">Grown in Ethiopia, selected with care.</h2>
            </div>
            <Link to="/products" className="text-sm font-bold uppercase tracking-[0.15em] text-forest underline decoration-banana decoration-2 underline-offset-8">View all products</Link>
          </Reveal>
          <div className="mt-16 grid gap-6 md:grid-cols-12">
            {[
              { img: product, t: "Fresh Ethiopian Avocados", d: "Carefully harvested avocados from Ethiopian growing regions, prepared for wholesale and export supply.", cls: "md:col-span-7", ar: "aspect-[4/3]" },
              { img: fruit, t: "Additional Varieties", d: "Further varieties and product specifications will be listed here once confirmed.", cls: "md:col-span-5 md:mt-24", ar: "aspect-[4/5]" },
            ].map((p, i) => (
              <Reveal key={p.t} delay={i * 0.1} className={p.cls}>
                <Link to="/products" className="group block">
                  <div className={`overflow-hidden ${p.ar}`}>
                    <img src={p.img} alt={p.t} loading="lazy" className="h-full w-full object-cover transition-transform duration-[1.4s] ease-expo group-hover:scale-105" />
                  </div>
                  <div className="mt-6 flex items-start justify-between gap-6">
                    <div>
                      <h3 className="text-2xl text-forest md:text-3xl">{p.t}</h3>
                      <p className="mt-2 max-w-md text-sm leading-relaxed text-muted-foreground">{p.d}</p>
                    </div>
                    <span className="mt-1 flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-forest text-ivory transition-all duration-500 group-hover:rotate-45 group-hover:bg-banana group-hover:text-forest-deep"><ArrowUpRight className="h-4 w-4" /></span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Experience */}
      <section className="grain relative overflow-hidden bg-forest py-28 text-ivory md:py-36">
        <div className="container-x">
          <Reveal className="max-w-2xl">
            <p className="eyebrow text-banana">Our Experience</p>
            <h2 className="mt-5 text-3xl leading-tight sm:text-4xl md:text-6xl">A journey built step by step.</h2>
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
          <Reveal className="mt-14"><Link to="/experience" className="text-sm font-bold uppercase tracking-[0.15em] text-banana underline underline-offset-8">Explore our experience</Link></Reveal>
        </div>
      </section>

      {/* Quality */}
      <section className="bg-ivory py-28 md:py-36">
        <div className="container-x grid items-center gap-16 lg:grid-cols-2">
          <Reveal>
            <p className="eyebrow text-avocado">Quality & Supply</p>
            <h2 className="mt-5 text-3xl leading-tight text-forest sm:text-4xl md:text-6xl">Quality starts at the source.</h2>
            <p className="mt-8 max-w-lg leading-relaxed text-muted-foreground">From the farm to the carton, every stage is handled with attention — sourcing, selection, quality checks, packaging and supply coordination.</p>
            <Link to="/experience" className="mt-10 inline-flex items-center gap-3 bg-forest px-7 py-4 text-xs font-bold uppercase tracking-[0.18em] text-ivory transition-colors hover:bg-forest-deep">See the supply journey <ArrowRight className="h-4 w-4" /></Link>
          </Reveal>
          <RevealImage src={packing} alt="Ethiopian workers sorting and packing fresh avocados" width={1600} height={1104} parallax={34} className="aspect-[16/11]" />
        </div>
      </section>

      {/* Global */}
      <section className="relative overflow-hidden bg-sage py-28 md:py-36">
        <div className="container-x">
          <Reveal className="mx-auto max-w-3xl text-center">
            <p className="eyebrow text-avocado">Global Trade</p>
            <h2 className="mt-5 text-3xl leading-tight text-forest sm:text-4xl md:text-6xl">Rooted in Ethiopia. Open to the world.</h2>
            <p className="mx-auto mt-6 max-w-xl text-muted-foreground">We are building direct relationships with international buyers seeking dependable Ethiopian avocado supply.</p>
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
