import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";

const ease = [0.16, 1, 0.3, 1] as const;

export function PageHero({ image, eyebrow, title, crumb }: { image: string; eyebrow: string; title: string; crumb: string }) {
  return (
    <section className="grain relative flex h-[72vh] min-h-[520px] items-end overflow-hidden bg-forest-deep">
      <motion.img src={image} alt="" width={1920} height={1080} fetchPriority="high"
        className="absolute inset-0 h-full w-full object-cover"
        initial={{ scale: 1.18 }} animate={{ scale: 1 }} transition={{ duration: 2.4, ease }} />
      <div className="absolute inset-0 bg-veil" />
      <div className="container-x relative pb-16 md:pb-24">
        <motion.p className="eyebrow text-banana" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, ease, delay: 0.2 }}>{eyebrow}</motion.p>
        <div className="overflow-hidden">
          <motion.h1 className="mt-4 max-w-4xl break-words text-4xl leading-[1.05] text-ivory sm:text-5xl md:text-7xl lg:text-8xl"
            initial={{ y: "105%" }} animate={{ y: 0 }} transition={{ duration: 1.2, ease, delay: 0.3 }}>{title}</motion.h1>
        </div>
        <motion.nav aria-label="Breadcrumb" className="mt-8 flex items-center gap-2 text-sm text-ivory/70"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8, duration: 1 }}>
          <Link to="/" className="hover:text-banana">Home</Link>
          <ChevronRight className="h-3.5 w-3.5" />
          <span className="text-ivory">{crumb}</span>
        </motion.nav>
      </div>
    </section>
  );
}
