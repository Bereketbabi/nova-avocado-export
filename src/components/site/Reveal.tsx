import { motion, useInView, useReducedMotion, useScroll, useTransform, type HTMLMotionProps } from "framer-motion";
import { useRef } from "react";

const ease = [0.16, 1, 0.3, 1] as const;

export function Reveal({ delay = 0, y = 32, ...props }: HTMLMotionProps<"div"> & { delay?: number; y?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 1, ease, delay }}
      {...props}
    />
  );
}

/**
 * Image that unveils with a clip-path wipe, layered over slanted geometric
 * accent panels. Visibility is observed on an unclipped wrapper so the image
 * always reveals (a fully clipped element can fail to register as in view).
 */
export function RevealImage({ src, alt, className = "", imgClassName = "", width, height, eager, accent = true }: {
  src: string; alt: string; className?: string; imgClassName?: string; width?: number; height?: number; eager?: boolean; accent?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.15 });
  return (
    <div ref={ref} className={`relative ${className}`}>
      {accent && (
        <>
          <motion.span aria-hidden className="absolute -right-4 -top-4 h-2/3 w-2/3 -skew-y-6 bg-banana/90"
            initial={{ opacity: 0, x: 30 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 1.2, ease, delay: 0.2 }} />
          <motion.span aria-hidden className="absolute -bottom-5 -left-5 h-1/2 w-1/2 skew-x-6 bg-avocado/80"
            initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 1.2, ease, delay: 0.35 }} />
        </>
      )}
      <motion.div
        className="relative h-full w-full overflow-hidden"
        style={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)" }}
        initial={{ clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0 100%)" }}
        animate={inView ? { clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)" } : {}}
        transition={{ duration: 1.3, ease }}
      >
        <motion.img
          src={src} alt={alt} width={width} height={height}
          loading={eager ? "eager" : "lazy"} decoding="async"
          className={`h-full w-full object-cover ${imgClassName}`}
          initial={{ scale: 1.25 }} animate={inView ? { scale: 1 } : {}} transition={{ duration: 1.8, ease }}
        />
      </motion.div>
    </div>
  );
}
