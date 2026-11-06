import { AnimatePresence, motion } from "framer-motion";
import { useRouterState } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import mark from "@/assets/nova-mark.png";

const ease = [0.76, 0, 0.24, 1] as const;
const WORD = "NOVA";

/** First-visit cinematic intro. */
function Intro({ onDone }: { onDone: () => void }) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    let raf = 0;
    const start = performance.now();
    const total = 2200;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / total);
      setCount(Math.round((1 - Math.pow(1 - p, 3)) * 100));
      if (p < 1) raf = requestAnimationFrame(tick);
      else setTimeout(onDone, 350);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [onDone]);

  return (
    <motion.div
      key="intro"
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center overflow-hidden bg-ivory"
      exit={{ clipPath: "inset(0% 0% 100% 0%)" }}
      initial={{ clipPath: "inset(0% 0% 0% 0%)" }}
      transition={{ duration: 1.1, ease }}
    >
      <motion.div
        className="relative flex flex-col items-center"
        exit={{ y: -60, opacity: 0 }}
        transition={{ duration: 0.7, ease }}
      >
        <motion.div
          className="relative flex h-40 w-40 items-center justify-center md:h-48 md:w-48"
          initial={{ scale: 0.6, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <svg viewBox="0 0 200 200" className="absolute inset-0 h-full w-full -rotate-90" aria-hidden>
            <circle cx="100" cy="100" r="92" fill="none" className="stroke-forest/10" strokeWidth="2" />
            <circle cx="100" cy="100" r="92" fill="none" className="stroke-avocado" strokeWidth="3" strokeLinecap="round"
              pathLength={100} strokeDasharray="100" strokeDashoffset={100 - count} />
          </svg>
          <motion.svg viewBox="0 0 200 200" className="absolute inset-[-14px] h-[calc(100%+28px)] w-[calc(100%+28px)]" aria-hidden
            animate={{ rotate: 360 }} transition={{ duration: 2.4, repeat: Infinity, ease: "linear" }}>
            <circle cx="100" cy="100" r="96" fill="none" className="stroke-banana" strokeWidth="3" strokeLinecap="round" pathLength={100} strokeDasharray="22 78" />
          </motion.svg>
          <motion.svg viewBox="0 0 200 200" className="absolute inset-[14px] h-[calc(100%-28px)] w-[calc(100%-28px)]" aria-hidden
            animate={{ rotate: -360 }} transition={{ duration: 3.2, repeat: Infinity, ease: "linear" }}>
            <circle cx="100" cy="100" r="96" fill="none" className="stroke-avocado/60" strokeWidth="1.5" strokeLinecap="round" pathLength={100} strokeDasharray="8 12" />
          </motion.svg>
          <img src={mark} alt="" width={360} height={330} className="h-24 w-auto md:h-28" />
        </motion.div>

        <div className="mt-8 flex overflow-hidden font-display text-3xl tracking-[0.4em] text-forest md:text-4xl">
          {WORD.split("").map((l, i) => (
            <motion.span
              key={i}
              initial={{ y: "110%" }}
              animate={{ y: 0 }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.35 + i * 0.08 }}
            >
              {l}
            </motion.span>
          ))}
        </div>
        <motion.p
          className="eyebrow mt-3 text-olive"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.8 }}
        >
          Wholesale Trade
        </motion.p>
      </motion.div>

      <div className="absolute inset-x-0 bottom-10 container-x flex items-end justify-between text-forest">
        <span className="eyebrow text-olive">From Ethiopia to the world</span>
        <span className="font-display text-5xl tabular-nums md:text-7xl">{count}</span>
      </div>
      <div className="absolute bottom-0 left-0 h-[3px] bg-banana" style={{ width: `${count}%` }} />
    </motion.div>
  );
}

/** Short curtain shown between pages — same ring loader as the intro. */
function PageCurtain() {
  return (
    <motion.div
      key="curtain"
      className="fixed inset-0 z-[90] flex items-center justify-center bg-ivory"
      initial={{ clipPath: "inset(100% 0% 0% 0%)" }}
      animate={{ clipPath: "inset(0% 0% 0% 0%)" }}
      exit={{ clipPath: "inset(0% 0% 100% 0%)" }}
      transition={{ duration: 0.6, ease }}
    >
      <motion.div className="relative flex h-32 w-32 items-center justify-center md:h-40 md:w-40"
        exit={{ opacity: 0, y: -30 }} transition={{ duration: 0.35 }}>
        <svg viewBox="0 0 200 200" className="absolute inset-0 h-full w-full -rotate-90" aria-hidden>
          <circle cx="100" cy="100" r="92" fill="none" className="stroke-forest/10" strokeWidth="2" />
          <motion.circle cx="100" cy="100" r="92" fill="none" className="stroke-avocado" strokeWidth="3" strokeLinecap="round"
            initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.2 }} />
        </svg>
        <motion.svg viewBox="0 0 200 200" className="absolute inset-[-12px] h-[calc(100%+24px)] w-[calc(100%+24px)]" aria-hidden
          animate={{ rotate: 360 }} transition={{ duration: 1.6, repeat: Infinity, ease: "linear" }}>
          <circle cx="100" cy="100" r="96" fill="none" className="stroke-banana" strokeWidth="3" strokeLinecap="round" pathLength={100} strokeDasharray="22 78" />
        </motion.svg>
        <motion.svg viewBox="0 0 200 200" className="absolute inset-[12px] h-[calc(100%-24px)] w-[calc(100%-24px)]" aria-hidden
          animate={{ rotate: -360 }} transition={{ duration: 2.2, repeat: Infinity, ease: "linear" }}>
          <circle cx="100" cy="100" r="96" fill="none" className="stroke-avocado/60" strokeWidth="1.5" strokeLinecap="round" pathLength={100} strokeDasharray="8 12" />
        </motion.svg>
        <img src={mark} alt="" width={360} height={330} className="h-16 w-auto md:h-20" />
      </motion.div>
    </motion.div>
  );
}

export function Preloader() {
  const [intro, setIntro] = useState(true);
  const [curtain, setCurtain] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const first = useRef(true);

  useEffect(() => {
    document.documentElement.style.overflow = intro ? "hidden" : "";
  }, [intro]);

  useEffect(() => {
    if (first.current) { first.current = false; return; }
    setCurtain(true);
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
    const t = setTimeout(() => setCurtain(false), 1300);
    return () => clearTimeout(t);
  }, [pathname]);

  return (
    <AnimatePresence>
      {intro ? <Intro onDone={() => setIntro(false)} /> : curtain ? <PageCurtain /> : null}
    </AnimatePresence>
  );
}
