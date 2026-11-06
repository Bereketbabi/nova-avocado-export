import { createFileRoute } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { useState } from "react";
import hero from "@/assets/hero-plantation.jpg";
import farmer from "@/assets/farmer-harvest.jpg";
import hands from "@/assets/hands-quality.jpg";
import product from "@/assets/product-bananas.jpg";
import packing from "@/assets/packing-shed.jpg";
import truck from "@/assets/supply-truck.jpg";
import lead from "@/assets/trade-lead.jpg";
import bunch from "@/assets/banana-bunch.jpg";
import { PageHero } from "@/components/site/PageHero";
import { Reveal } from "@/components/site/Reveal";

export const Route = createFileRoute("/gallery")({
  head: () => ({
    meta: [
      { title: "Gallery — Nova Wholesale Trade" },
      { name: "description", content: "Ethiopian banana farms, harvest, quality checks and packing — in pictures." },
      { property: "og:title", content: "Gallery — Nova Wholesale Trade" },
      { property: "og:description", content: "From Ethiopian farms to export cartons." },
    ],
  }),
  component: Gallery,
});

const IMAGES = [
  { src: hero, alt: "Banana plantation at golden hour", cls: "md:col-span-2 aspect-[16/9]" },
  { src: bunch, alt: "Banana bunch on the plant", cls: "md:row-span-2 aspect-[4/5] md:aspect-auto" },
  { src: farmer, alt: "Farmer carrying a banana bunch", cls: "aspect-[4/5]" },
  { src: hands, alt: "Checking bananas by hand", cls: "aspect-[4/5]" },
  { src: packing, alt: "Packing bananas into cartons", cls: "md:col-span-2 aspect-[16/9]" },
  { src: lead, alt: "Nova trade representative", cls: "aspect-[4/5]" },
  { src: product, alt: "Fresh bananas on a leaf", cls: "aspect-[4/5]" },
  { src: truck, alt: "Bananas loaded for transport", cls: "md:col-span-1 aspect-[4/5]" },
];

function Gallery() {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <>
      <PageHero image={packing} eyebrow="Gallery" title="From the farm to the carton." crumb="Gallery" />
      <section className="bg-ivory py-28 md:py-36">
        <div className="container-x grid gap-4 md:grid-cols-3">
          {IMAGES.map((im, i) => (
            <Reveal key={im.alt} delay={(i % 3) * 0.08} className={im.cls}>
              <button onClick={() => setOpen(i)} className="group relative block h-full w-full overflow-hidden" aria-label={`Open ${im.alt}`}>
                <img src={im.src} alt={im.alt} loading="lazy" className="h-full w-full object-cover transition-transform duration-[1.4s] ease-expo group-hover:scale-105" />
                <span className="absolute inset-x-0 bottom-0 translate-y-full bg-forest-deep/85 p-4 text-left text-sm text-ivory transition-transform duration-500 ease-expo group-hover:translate-y-0">{im.alt}</span>
              </button>
            </Reveal>
          ))}
        </div>
      </section>
      <AnimatePresence>
        {open !== null && (
          <motion.div className="fixed inset-0 z-[80] flex items-center justify-center bg-forest-deep/95 p-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setOpen(null)}>
            <button aria-label="Close" className="absolute right-6 top-6 text-ivory"><X className="h-8 w-8" /></button>
            <motion.img key={open} src={IMAGES[open]!.src} alt={IMAGES[open]!.alt} className="max-h-[85vh] max-w-full object-contain" initial={{ scale: 0.94, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }} />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
