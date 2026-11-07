import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import mark from "@/assets/nova-mark.png";

const ease = [0.76, 0, 0.24, 1] as const;
const WORD = "NOVA";

/** First-visit cinematic intro with single circle loader and popping spring typography physics. */
function Intro({ onDone }: { onDone: () => void }) {
  useEffect(() => {
    const timer = setTimeout(onDone, 2000);
    return () => clearTimeout(timer);
  }, [onDone]);

  return (
    <motion.div
      key="intro"
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center overflow-hidden bg-ivory"
      initial={{ clipPath: "inset(0% 0% 0% 0%)" }}
      exit={{ clipPath: "inset(0% 0% 100% 0%)" }}
      transition={{ duration: 0.85, ease }}
    >
      <motion.div
        className="relative flex flex-col items-center"
        exit={{ y: -40, opacity: 0 }}
        transition={{ duration: 0.5, ease }}
      >
        {/* Emblem with ONE single clean circular line */}
        <motion.div
          className="relative flex h-36 w-36 items-center justify-center md:h-44 md:w-44"
          initial={{ scale: 0.75, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          <svg viewBox="0 0 180 180" className="absolute inset-0 h-full w-full -rotate-90" aria-hidden>
            {/* Subtle background track */}
            <circle
              cx="90"
              cy="90"
              r="80"
              fill="none"
              className="stroke-forest/10"
              strokeWidth="2.5"
            />
            {/* Single clean loading circle line */}
            <motion.circle
              cx="90"
              cy="90"
              r="80"
              fill="none"
              className="stroke-avocado"
              strokeWidth="3.5"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
            />
          </svg>

          {/* Avocado N Mark */}
          <motion.img
            src={mark}
            alt="Nova Emblem"
            width={360}
            height={330}
            className="h-20 w-auto md:h-24 select-none drop-shadow-sm"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 340, damping: 18, delay: 0.12 }}
          />
        </motion.div>

        {/* Popping Typography Physics for NOVA */}
        <div className="mt-8 flex items-center justify-center overflow-hidden">
          {WORD.split("").map((letter, i) => (
            <motion.span
              key={i}
              className="inline-block font-display text-4xl sm:text-5xl tracking-[0.28em] text-forest"
              initial={{ opacity: 0, y: 35, scale: 0.45, rotate: i % 2 === 0 ? -6 : 6 }}
              animate={{ opacity: 1, y: 0, scale: 1, rotate: 0 }}
              transition={{
                type: "spring",
                stiffness: 420,
                damping: 18,
                mass: 0.8,
                delay: 0.28 + i * 0.08,
              }}
            >
              {letter}
            </motion.span>
          ))}
        </div>

        {/* Subtitle popping up with spring */}
        <motion.div
          initial={{ opacity: 0, y: 16, scale: 0.92 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{
            type: "spring",
            stiffness: 280,
            damping: 20,
            delay: 0.68,
          }}
          className="mt-3 flex flex-col items-center gap-1.5"
        >
          <span className="text-xs sm:text-sm font-semibold tracking-[0.4em] text-olive uppercase">
            Wholesale Trade
          </span>
          <div className="flex items-center gap-2 text-[10px] tracking-[0.25em] text-muted-foreground/75 uppercase">
            <span>Wolaita</span>
            <span className="h-1 w-1 rounded-full bg-avocado/60" />
            <span>Ethiopia</span>
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

export function Preloader() {
  const [intro, setIntro] = useState(true);

  useEffect(() => {
    document.documentElement.style.overflow = intro ? "hidden" : "";
  }, [intro]);

  return (
    <AnimatePresence>
      {intro ? <Intro onDone={() => setIntro(false)} /> : null}
    </AnimatePresence>
  );
}
