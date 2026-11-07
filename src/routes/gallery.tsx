import { createFileRoute } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
import { Eye, X } from "lucide-react";
import { useState } from "react";
import hero from "@/assets/avocado-orchard-hero.jpg";
import farmer from "@/assets/ethiopian-avocado-farmer.jpg";
import quality from "@/assets/client-hass-hand-quality.jpg";
import crew from "@/assets/client-orchard-harvest-crew.jpg";
import fruit from "@/assets/client-green-avocados-tree.jpg";
import packing from "@/assets/avocado-packing-house.jpg";
import carton from "@/assets/client-export-carton-pack.jpg";
import lead from "@/assets/avocado-export-inspection.jpg";
import { Reveal } from "@/components/site/Reveal";

export const Route = createFileRoute("/gallery")({
  head: () => ({
    meta: [
      { title: "Gallery — Nova Wholesale Trade | Wolaita Avocado Operations in Pictures" },
      { name: "description", content: "Visual proof of Nova's avocado operations in Wolaita, Ethiopia: highland orchards, selective hand-harvesting, packhouse grading, and cold-chain reefer dispatch." },
      { property: "og:title", content: "Avocado Operations Gallery — Nova Wholesale Trade" },
      { property: "og:description", content: "From Wolaita Orchards to Global Export Cartons." },
    ],
  }),
  component: Gallery,
});

type Category = "all" | "orchards" | "harvest" | "packhouse" | "export";

const IMAGES = [
  {
    src: hero,
    caption: "Mature avocado orchards flourishing in the fertile highland volcanic soils of Wolaita, Southern Ethiopia.",
    category: "orchards" as Category,
    tag: "Wolaita Orchards",
    cls: "md:col-span-2 aspect-[16/9]",
  },
  {
    src: fruit,
    caption: "Lush green-skin avocado clusters maturing on the branch under optimal highland sunshine.",
    category: "orchards" as Category,
    tag: "Cultivar Maturation",
    cls: "md:row-span-2 aspect-[4/5] md:aspect-auto",
  },
  {
    src: farmer,
    caption: "Selective hand-harvesting directly from mature avocado trees in the grove.",
    category: "harvest" as Category,
    tag: "Selective Harvesting",
    cls: "aspect-[4/5]",
  },
  {
    src: crew,
    caption: "Harvest field crew transporting freshly picked avocados across the orchard in ventilated crates.",
    category: "harvest" as Category,
    tag: "Field Crating & Transport",
    cls: "md:col-span-2 aspect-[16/9]",
  },
  {
    src: quality,
    caption: "Single-fruit maturity and dry-matter assessment over freshly collected highland harvest.",
    category: "harvest" as Category,
    tag: "Maturity & Quality Check",
    cls: "aspect-[4/5]",
  },
  {
    src: packing,
    caption: "Packhouse washing, sorting, and optical/weight caliber grading into export cartons.",
    category: "packhouse" as Category,
    tag: "Packhouse Processing",
    cls: "md:col-span-2 aspect-[16/9]",
  },
  {
    src: carton,
    caption: "Uniform caliber export cartons packed and ready for forced-air precooling and dispatch.",
    category: "export" as Category,
    tag: "Export Packaging",
    cls: "aspect-[4/5]",
  },
  {
    src: lead,
    caption: "Temperature-monitored reefer container loading and phytosanitary trade compliance inspection.",
    category: "export" as Category,
    tag: "Cold-Chain Reefer Dispatch",
    cls: "aspect-[4/5]",
  },
];

function Gallery() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <>
      <section className="bg-ivory pt-32 pb-24 md:pt-40 md:pb-36">
        <div className="container-x">
          {/* Photo Grid */}
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
            {IMAGES.map((im, i) => (
              <Reveal key={im.caption} delay={(i % 3) * 0.08} className={im.cls}>
                <button
                  onClick={() => setOpen(i)}
                  className="group relative block h-full w-full overflow-hidden rounded-sm bg-forest-deep focus:outline-none"
                  aria-label={`Open photo: ${im.caption}`}
                >
                  <img
                    src={im.src}
                    alt={im.caption}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-[1.4s] ease-expo group-hover:scale-105 group-hover:opacity-90"
                  />
                  <span className="absolute left-3 top-3 rounded-full bg-forest/80 px-2.5 py-1 text-[0.65rem] font-bold uppercase tracking-wider text-banana backdrop-blur-sm">
                    {im.tag}
                  </span>
                  <div className="absolute inset-x-0 bottom-0 flex items-end justify-between bg-gradient-to-t from-forest-deep/95 via-forest-deep/60 to-transparent p-5 text-left transition-opacity duration-300">
                    <p className="text-xs text-ivory/95 font-medium leading-relaxed max-w-[85%]">
                      {im.caption}
                    </p>
                    <Eye className="h-4 w-4 text-banana shrink-0 opacity-0 transition-opacity group-hover:opacity-100" />
                  </div>
                </button>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {open !== null && (
          <motion.div
            className="fixed inset-0 z-[80] flex flex-col items-center justify-center bg-forest-deep/95 p-4 sm:p-6 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(null)}
          >
            <button
              aria-label="Close image preview"
              className="absolute right-4 top-4 sm:right-6 sm:top-6 flex h-11 w-11 items-center justify-center rounded-full bg-ivory/10 text-ivory transition-colors hover:bg-banana hover:text-forest-deep"
            >
              <X className="h-6 w-6" />
            </button>
            <motion.img
              key={open}
              src={IMAGES[open]!.src}
              alt={IMAGES[open]!.caption}
              className="max-h-[65vh] sm:max-h-[75vh] max-w-full rounded-sm object-contain shadow-2xl"
              initial={{ scale: 0.94, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            />
            <p className="mt-5 max-w-2xl text-center text-sm font-medium text-ivory">
              {IMAGES[open]!.caption}
            </p>
            <span className="mt-1 text-xs text-banana">
              {IMAGES[open]!.tag} · Nova Wholesale Trade (Wolaita, Ethiopia)
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
