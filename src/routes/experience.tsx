import { createFileRoute } from "@tanstack/react-router";
import { motion, useScroll, useSpring } from "framer-motion";
import { useRef } from "react";
import hero from "@/assets/supply-journey-hero.jpg";
import { PageHero } from "@/components/site/PageHero";
import { Reveal } from "@/components/site/Reveal";
import { CtaBand } from "@/components/site/CtaBand";
import { StageCard } from "@/components/process/StageCard";
import { stages } from "@/components/process/stages";
import { JOURNEY, QUALITY_CHECKPOINTS } from "@/lib/content";
import { ShieldCheck } from "lucide-react";

export const Route = createFileRoute("/experience")({
  head: () => ({
    meta: [
      { title: "Orchard to Port — 7-Stage Avocado Process | Nova Wholesale Trade" },
      { name: "description", content: "Follow a Wolaita avocado through seven stages, from grafted nursery seedling to chilled cold-chain export across the world." },
      { property: "og:title", content: "Orchard to Port — 7-Stage Avocado Process | Nova Wholesale Trade" },
      { property: "og:description", content: "Seven stages from a Wolaita seedling to a chilled export carton." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Experience,
});

export function Experience() {
  const trackRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start center", "end center"],
  });
  const fill = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

  return (
    <>
      <PageHero
        image={hero}
        eyebrow="The Supply Journey"
        title="How a Wolaita Avocado Travels the World."
        crumb="The Supply Journey"
      />

      {/* 7-Stage Interactive Scroll Timeline with Parallax & Central Spring Line */}
      <section className="bg-ivory py-20 md:py-28 overflow-hidden">
        <div ref={trackRef} className="relative mx-auto max-w-6xl px-6">
          {/* Subtle central guideline */}
          <div className="absolute left-1/2 top-0 hidden h-full w-px -translate-x-1/2 bg-border md:block" />
          {/* Animated filling spring line driven by scroll */}
          <motion.div
            className="absolute left-1/2 top-0 hidden h-full w-[3px] -translate-x-1/2 origin-top rounded-full bg-gradient-line md:block"
            style={{ scaleY: fill }}
          />

          {stages.map((s, i) => (
            <StageCard key={s.title} stage={s} index={i} />
          ))}
        </div>
      </section>

      {/* Quality Checkpoints Section */}
      <section className="bg-sage py-24 md:py-32">
        <div className="container-x">
          <Reveal className="max-w-2xl">
            <p className="eyebrow text-avocado">Export Quality Protocols</p>
            <h2 className="mt-4 text-3xl sm:text-4xl leading-tight text-forest md:text-5xl">
              Three Non-Negotiable Quality Safeguards.
            </h2>
            <p className="mt-4 text-muted-foreground">
              Every export consignment leaving our Wolaita facility is governed by strict physical, dry-matter, and temperature inspection gates.
            </p>
          </Reveal>

          <div className="mt-14 grid gap-8 md:grid-cols-3">
            {QUALITY_CHECKPOINTS.map((chk, i) => (
              <Reveal key={chk.title} delay={i * 0.1} className="rounded-sm border border-border bg-ivory p-8 shadow-sm">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-forest text-banana">
                  <ShieldCheck className="h-6 w-6" />
                </div>
                <h3 className="mt-6 text-xl font-bold text-forest">{chk.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{chk.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Business Evolution Timeline */}
      <section className="grain relative bg-forest py-28 text-ivory md:py-36">
        <div className="container-x">
          <Reveal className="max-w-2xl">
            <p className="eyebrow text-banana">Our Evolution</p>
            <h2 className="mt-4 text-3xl sm:text-4xl leading-tight md:text-5xl">
              From Local Wolaita Supplier to Direct Global Exporter.
            </h2>
          </Reveal>
          <ol className="relative mt-16 max-w-3xl border-l border-ivory/20 pl-8 space-y-12">
            {JOURNEY.map((j, i) => (
              <li key={j.title} className="relative pb-4">
                <Reveal>
                  <span className="absolute -left-[2.55rem] top-1.5 flex h-6 w-6 items-center justify-center rounded-full bg-banana ring-8 ring-forest" />
                  <div className="flex items-center gap-3">
                    <span className="font-display text-2xl font-bold text-banana">
                      0{i + 1}
                    </span>
                    <h3 className="text-xl sm:text-2xl font-bold text-ivory">{j.title}</h3>
                  </div>
                  <p className="mt-3 max-w-2xl leading-relaxed text-ivory/75 text-sm sm:text-base">{j.text}</p>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
