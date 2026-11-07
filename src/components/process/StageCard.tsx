import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import type { Stage } from "./stages";

const ease = [0.22, 1, 0.36, 1] as const;

export function StageCard({ stage, index }: { stage: Stage; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const flip = index % 2 === 1;
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);
  const num = String(index + 1).padStart(2, "0");

  return (
    <section
      ref={ref}
      id={`stage-${num}`}
      className="relative grid items-center gap-10 py-16 sm:py-20 md:grid-cols-2 md:gap-20 md:py-28"
    >
      {/* dot on the line */}
      <motion.span
        className="absolute left-1/2 top-1/2 z-10 hidden size-4 -translate-x-1/2 -translate-y-1/2 rounded-full border-4 border-background bg-primary-glow md:block"
        initial={{ scale: 0 }}
        whileInView={{ scale: [0, 1.6, 1] }}
        viewport={{ once: false, amount: 0.6 }}
        transition={{ duration: 0.6, ease }}
      />

      {/* Image */}
      <motion.figure
        className={`relative ${flip ? "md:order-2" : ""}`}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.35 }}
      >
        <motion.div
          className="relative aspect-[4/3] overflow-hidden rounded-3xl shadow-photo"
          variants={{
            hidden: { clipPath: flip ? "inset(0 0 0 100% round 1.5rem)" : "inset(0 100% 0 0 round 1.5rem)" },
            show: { clipPath: "inset(0 0% 0 0% round 1.5rem)", transition: { duration: 1.2, ease } },
          }}
        >
          <motion.img
            src={stage.image}
            alt={stage.alt}
            width={1280}
            height={960}
            loading={index === 0 ? "eager" : "lazy"}
            style={{ y: imgY }}
            className="absolute inset-0 h-[116%] w-full -top-[8%] object-cover"
            variants={{ hidden: { scale: 1.25 }, show: { scale: 1, transition: { duration: 1.6, ease } } }}
          />
          <div className="absolute inset-0 bg-gradient-scrim" />
          <motion.figcaption
            className="absolute inset-x-6 bottom-6 font-display text-xl leading-snug text-ivory md:text-2xl"
            variants={{ hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0, transition: { delay: 0.9, duration: 0.8, ease } } }}
          >
            {stage.caption}
          </motion.figcaption>
        </motion.div>

        {/* floating stat */}
        <motion.div
          className={`absolute -top-6 ${flip ? "-left-2 sm:-left-4 md:-left-8" : "-right-2 sm:-right-4 md:-right-8"} rounded-2xl border border-border bg-card/90 px-3.5 sm:px-5 py-2.5 sm:py-4 backdrop-blur-md shadow-md`}
          variants={{
            hidden: { opacity: 0, scale: 0.6, y: 20, rotate: flip ? -6 : 6 },
            show: { opacity: 1, scale: 1, y: 0, rotate: 0, transition: { delay: 1.1, type: "spring", stiffness: 260, damping: 18 } },
          }}
        >
          <div className="font-display text-xl sm:text-2xl text-primary md:text-3xl">{stage.stat.value}</div>
          <div className="text-[0.68rem] sm:text-xs uppercase tracking-[0.18em] text-muted-foreground">{stage.stat.label}</div>
        </motion.div>
      </motion.figure>

      {/* Text */}
      <motion.div
        className={`relative ${flip ? "md:order-1 md:text-right" : ""}`}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.4 }}
        transition={{ staggerChildren: 0.12, delayChildren: 0.2 }}
      >
        <motion.span
          aria-hidden
          className={`pointer-events-none absolute -top-24 sm:-top-36 md:-top-48 ${flip ? "right-0" : "left-0"} select-none font-display text-[6.5rem] sm:text-[9rem] md:text-[12rem] leading-none text-stroke opacity-70`}
          variants={{ hidden: { opacity: 0, y: 60 }, show: { opacity: 1, y: 0, transition: { duration: 1.2, ease } } }}
        >
          {num}
        </motion.span>
        <motion.p
          className="relative text-xs font-bold uppercase tracking-[0.25em] text-avocado"
          variants={{ hidden: { opacity: 0, x: flip ? 20 : -20 }, show: { opacity: 1, x: 0 } }}
        >
          Stage {num} · {stage.kicker}
        </motion.p>
        <div className="relative overflow-hidden">
          <motion.h2
            className="mt-3 font-display text-3xl font-bold leading-[1.1] text-foreground md:text-5xl"
            variants={{ hidden: { y: "110%" }, show: { y: 0, transition: { duration: 0.9, ease } } }}
          >
            {stage.title}
          </motion.h2>
        </div>
        <motion.p
          className={`relative mt-5 max-w-md text-base leading-relaxed text-muted-foreground ${flip ? "md:ml-auto" : ""}`}
          variants={{ hidden: { opacity: 0, y: 16, filter: "blur(6px)" }, show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.8 } } }}
        >
          {stage.body}
        </motion.p>
        <div className={`relative mt-6 flex flex-wrap gap-2 ${flip ? "md:justify-end" : ""}`}>
          {stage.tags.map((t) => (
            <motion.span
              key={t}
              className="rounded-full bg-secondary px-3 py-1 text-xs font-semibold text-secondary-foreground"
              variants={{ hidden: { opacity: 0, scale: 0.7 }, show: { opacity: 1, scale: 1, transition: { type: "spring", stiffness: 300, damping: 20 } } }}
            >
              {t}
            </motion.span>
          ))}
        </div>
      </motion.div>
    </section>
  );
}

