import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sprout,
  Scissors,
  Droplets,
  Scale,
  Snowflake,
  Plane,
  CheckCircle2,
  MapPin,
  Thermometer,
  ShieldCheck,
  ChevronRight,
} from "lucide-react";

export interface ProcessStage {
  id: string;
  step: string;
  title: string;
  subtitle: string;
  location: string;
  metricLabel: string;
  metricValue: string;
  badge: string;
  description: string;
  protocols: string[];
}

export const PROCESS_STAGES: ProcessStage[] = [
  {
    id: "cultivation",
    step: "01",
    title: "Highland Orchard Cultivation",
    subtitle: "Wolaita Highlands, Southern Ethiopia",
    location: "Wolaita Zone · 1,500m – 2,200m Elevation",
    metricLabel: "Agro-Ecological Soil",
    metricValue: "Mineral-Rich Volcanic Red Soil",
    badge: "Bimodal Rain & Drip Irrigation",
    description:
      "Every export-grade avocado begins in certified highland nurseries across the Wolaita Region. Grafted Hass, Ettinger, and Fuerte trees flourish in nutrient-dense volcanic soil under mild tropical sun, slow-maturing the fruit for rich oil concentration.",
    protocols: [
      "Disease-free clonal rootstock grafting",
      "Organic compost & integrated soil nourishment",
      "Sustainable tree canopy pruning & blossom tracking",
    ],
  },
  {
    id: "harvest",
    step: "02",
    title: "Dry-Matter Testing & Selective Clipping",
    subtitle: "Zero Ground Contact Harvesting",
    location: "Wolaita Sourcing Clusters",
    metricLabel: "Maturity Standard",
    metricValue: "≥ 23% – 26% Dry Matter",
    badge: "3–5 mm Stem Button Retained",
    description:
      "Before harvest begins, agronomists conduct microwave dry-matter tests to verify oil content. Harvesters selectively clip each fruit using specialized shear clippers, retaining a 3–5 mm stem button to prevent fungal decay, placing them directly into sanitized crates.",
    protocols: [
      "Refractometer & oven dry-matter laboratory testing",
      "Anti-bruising cushioned collection sacks",
      "Immediate crate tagging for farm-to-box traceability",
    ],
  },
  {
    id: "wash",
    step: "03",
    title: "Hydro-Sanitization & Soft Brushing",
    subtitle: "Wolaita Central Packhouse Reception",
    location: "Wolaita Facility · < 4h Post-Harvest",
    metricLabel: "Transfer Window",
    metricValue: "Same-Day Field Reception",
    badge: "Double Water-Bath & Food-Grade Wash",
    description:
      "Harvest crates arrive at our Wolaita processing facility within hours. Fruits enter a gentle circulating water-immersion bath, followed by counter-rotating soft nylon brushes to eliminate orchard dust and surface impurities while preserving natural skin integrity.",
    protocols: [
      "Ozonated wash water with continuous filtration",
      "High-pressure soft bristle spray treatment",
      "Air-knife drying before optical sorting",
    ],
  },
  {
    id: "grading",
    step: "04",
    title: "Clinical Inspection & Caliber Grading",
    subtitle: "Automated Gram-Weight Sizing",
    location: "Automated Optical Grading Line",
    metricLabel: "Export Caliber Counts",
    metricValue: "Counts 12 · 14 · 16 · 18 · 20 · 22 · 24",
    badge: "Strict Blemish & Scorch Elimination",
    description:
      "Every avocado passes through a precision multi-channel electronic scale and visual grading station. Fruits with skin abrasions or irregular curvature are culled, while export-grade avocados are segregated by exact gram weight into international retail sizes.",
    protocols: [
      "±2g electronic load-cell weight accuracy",
      "Class 1 export phytosanitary standard",
      "Uniform box count matching buyer specification",
    ],
  },
  {
    id: "packing",
    step: "05",
    title: "Ventilated Packaging & Forced-Air Cooling",
    subtitle: "Rapid Core Temperature Pulldown",
    location: "Precooling Chambers, Wolaita",
    metricLabel: "Target Pulp Temp",
    metricValue: "5.0°C – 7.0°C Pulldown",
    badge: "4 kg & 10 kg Ventilated Export Cartons",
    description:
      "Graded avocados are hand-packed into ventilated corrugated export cartons with food-safe pulp trays. Pallets with reinforced corner posts are immediately transferred into forced-air precooling tunnels, halting respiration and sealing in freshness.",
    protocols: [
      "Reinforced 5-ply export cartonboard with airflow vents",
      "4 kg open-top retail display & 10 kg bulk telescopic boxes",
      "Core pulp probe temperature logs before loading",
    ],
  },
  {
    id: "export",
    step: "06",
    title: "Cold-Chain Logistics & Global Reefer Cargo",
    subtitle: "From Ethiopia to International Hubs",
    location: "Addis Ababa Air Hub & Djibouti Sea Corridor",
    metricLabel: "Global Distribution",
    metricValue: "Middle East · Europe · Asia",
    badge: "CA Sea Containers & Express Air Cargo",
    description:
      "Precooled pallets are loaded directly into GPS-monitored refrigerated reefers. Air freight dispatches from Addis Ababa Bole Cargo Terminal within 24–48 hours, while sea consignments depart via the Djibouti port corridor in Controlled Atmosphere (CA) reefers.",
    protocols: [
      "Continuous live GPS & temperature dataloggers",
      "Ethylene scrubbing & CA atmosphere management (2% O2, 5% CO2)",
      "Full export phytosanitary certificate & documentation packet",
    ],
  },
];

export function AvocadoProcessShowcase() {
  const [activeStage, setActiveStage] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const stage = PROCESS_STAGES[activeStage];

  return (
    <div ref={containerRef} className="relative rounded-2xl border border-border bg-ivory/80 shadow-xl overflow-hidden backdrop-blur-sm">
      {/* Top Banner / Interactive Stepper Header */}
      <div className="border-b border-border bg-sage/30 px-6 py-5 md:px-10">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-avocado">
              <MapPin className="h-3.5 w-3.5" />
              <span>Wolaita Region, Ethiopia · Seed-to-Export Blueprint</span>
            </div>
            <h3 className="mt-1 font-display text-2xl font-bold text-forest sm:text-3xl">
              The Interactive Orchard-to-Port Journey
            </h3>
          </div>

          {/* Step Selector Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
            {PROCESS_STAGES.map((s, idx) => {
              const isCurrent = idx === activeStage;
              const isPast = idx < activeStage;
              return (
                <button
                  key={s.id}
                  onClick={() => setActiveStage(idx)}
                  className={`group relative flex items-center gap-2 rounded-full px-3.5 py-1.5 text-xs font-semibold transition-all ${
                    isCurrent
                      ? "bg-forest text-banana shadow-sm scale-105"
                      : isPast
                      ? "bg-avocado/15 text-avocado hover:bg-avocado/25"
                      : "bg-forest/5 text-muted-foreground hover:bg-forest/10 hover:text-forest"
                  }`}
                >
                  <span className="font-mono">{s.step}</span>
                  <span className="hidden sm:inline">{s.title.split(" ")[0]}</span>
                  {isCurrent && (
                    <motion.span
                      layoutId="activeIndicator"
                      className="absolute inset-0 rounded-full border-2 border-banana/50 pointer-events-none"
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main Interactive Stage Body */}
      <div className="grid gap-10 p-6 md:p-10 lg:grid-cols-12 lg:items-center">
        {/* Left Column: Clinical Telemetry & Stage Narrative (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={stage.id}
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 16 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="space-y-5"
            >
              {/* Stage Badge & Location Tag */}
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-forest px-3 py-1 font-mono text-xs font-bold text-banana">
                  <span className="h-1.5 w-1.5 rounded-full bg-banana animate-pulse" />
                  STAGE {stage.step}
                </span>
                <span className="rounded-full border border-avocado/30 bg-avocado/10 px-3 py-1 text-xs font-semibold text-avocado">
                  {stage.location}
                </span>
              </div>

              {/* Title & Subtitle */}
              <div>
                <h4 className="font-display text-2xl sm:text-3xl font-bold leading-tight text-forest">
                  {stage.title}
                </h4>
                <p className="mt-1 text-xs uppercase tracking-wider text-olive font-semibold">
                  {stage.subtitle}
                </p>
              </div>

              {/* Stage Description */}
              <p className="text-sm sm:text-base leading-relaxed text-muted-foreground">
                {stage.description}
              </p>

              {/* Protocol Checklist */}
              <div className="space-y-2 pt-2">
                <span className="text-[11px] font-bold uppercase tracking-widest text-forest/70">
                  Execution Safeguards:
                </span>
                <ul className="space-y-2 text-xs text-forest/90">
                  {stage.protocols.map((p, i) => (
                    <li key={i} className="flex items-start gap-2.5">
                      <CheckCircle2 className="h-4 w-4 shrink-0 text-avocado mt-0.5" />
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Live Technical Metrics Dual Readout */}
              <div className="grid grid-cols-2 gap-3 pt-2">
                <div className="rounded-xl border border-border bg-white/70 p-3.5 shadow-2xs">
                  <span className="block text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                    {stage.metricLabel}
                  </span>
                  <span className="mt-1 block text-sm sm:text-base font-bold text-forest">
                    {stage.metricValue}
                  </span>
                </div>
                <div className="rounded-xl border border-border bg-white/70 p-3.5 shadow-2xs">
                  <span className="block text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                    Origin Assurance
                  </span>
                  <span className="mt-1 block text-sm sm:text-base font-bold text-avocado">
                    100% Wolaita Zone
                  </span>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Right Column: 100% Pure Vector Animated SVG Graphic Canvas (7 cols) */}
        <div className="lg:col-span-7 flex flex-col items-center justify-center">
          <div className="relative w-full max-w-lg aspect-[4/3] rounded-2xl border border-border/80 bg-sage/20 p-4 sm:p-6 shadow-inner flex items-center justify-center overflow-hidden">
            {/* Ambient Background Grid Pattern */}
            <div className="absolute inset-0 bg-[radial-gradient(#4A7C2C_1px,transparent_1px)] [background-size:24px_24px] opacity-15" />

            {/* Main Interactive SVG Scene */}
            <svg
              viewBox="0 0 600 450"
              className="relative z-10 w-full h-full select-none overflow-visible"
            >
              <defs>
                <radialGradient id="avocadoPulse" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#4A7C2C" stopOpacity="0.25" />
                  <stop offset="100%" stopColor="#4A7C2C" stopOpacity="0" />
                </radialGradient>
                <linearGradient id="laserGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#84CC16" stopOpacity="0" />
                  <stop offset="50%" stopColor="#84CC16" stopOpacity="0.9" />
                  <stop offset="100%" stopColor="#84CC16" stopOpacity="0" />
                </linearGradient>
              </defs>

              {/* Ambient Technical Pulse */}
              <circle cx="300" cy="225" r="185" fill="url(#avocadoPulse)" />

              {/* Concentric Calibration Ring */}
              <motion.circle
                cx="300"
                cy="225"
                r="160"
                fill="none"
                stroke="#14261C"
                strokeOpacity="0.12"
                strokeWidth="1.5"
                strokeDasharray="6 8"
                animate={{ rotate: 360 }}
                transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                style={{ transformOrigin: "300px 225px" }}
              />

              {/* Dynamic SVG Scene Swapping based on active stage */}
              <AnimatePresence mode="wait">
                {activeStage === 0 && (
                  <motion.g
                    key="scene-0"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.05 }}
                    transition={{ duration: 0.4 }}
                  >
                    {/* Volcanic Mountain Contours of Wolaita */}
                    <path
                      d="M60 350 Q 180 230 300 350 T 540 350"
                      fill="none"
                      stroke="#4A7C2C"
                      strokeWidth="3.5"
                    />
                    <path
                      d="M120 350 Q 230 260 350 350"
                      fill="#4A7C2C"
                      fillOpacity="0.12"
                    />

                    {/* Central Avocado Tree: Trunk & Branches */}
                    <path
                      d="M300 350 L300 215 M300 270 L255 230 M300 250 L345 220"
                      stroke="#14261C"
                      strokeWidth="6.5"
                      strokeLinecap="round"
                    />
                    {/* Canopy Clusters */}
                    <circle cx="300" cy="175" r="72" fill="#4A7C2C" fillOpacity="0.25" stroke="#4A7C2C" strokeWidth="2.5" />
                    <circle cx="245" cy="195" r="50" fill="#4A7C2C" fillOpacity="0.3" />
                    <circle cx="355" cy="195" r="50" fill="#4A7C2C" fillOpacity="0.3" />

                    {/* Hanging Avocados on Branches */}
                    <motion.ellipse
                      cx="265"
                      cy="190"
                      rx="11"
                      ry="15"
                      fill="#4A7C2C"
                      stroke="#14261C"
                      strokeWidth="1.5"
                      animate={{ y: [0, 3, 0] }}
                      transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
                    />
                    <motion.ellipse
                      cx="335"
                      cy="185"
                      rx="11"
                      ry="15"
                      fill="#4A7C2C"
                      stroke="#14261C"
                      strokeWidth="1.5"
                      animate={{ y: [0, -3, 0] }}
                      transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
                    />
                    <motion.ellipse
                      cx="300"
                      cy="150"
                      rx="12"
                      ry="16"
                      fill="#84CC16"
                      stroke="#14261C"
                      strokeWidth="1.5"
                      animate={{ scale: [1, 1.06, 1] }}
                      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                    />

                    {/* Sun Rays & Altitude Annotation */}
                    <circle cx="430" cy="120" r="22" fill="#F5E89B" fillOpacity="0.6" />
                    <text x="300" y="390" textAnchor="middle" className="text-[11px] font-mono font-bold fill-[#14261C]">
                      ORCHARD ELEVATION: 1,500m – 2,200m · WOLAITA
                    </text>
                  </motion.g>
                )}

                {activeStage === 1 && (
                  <motion.g
                    key="scene-1"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.05 }}
                    transition={{ duration: 0.4 }}
                  >
                    {/* Hanging Stem */}
                    <line x1="300" y1="70" x2="300" y2="135" stroke="#14261C" strokeWidth="4" />

                    {/* Clipper Action Line */}
                    <motion.line
                      x1="250"
                      y1="110"
                      x2="350"
                      y2="130"
                      stroke="#4A7C2C"
                      strokeWidth="3.5"
                      strokeDasharray="6 4"
                      animate={{ opacity: [0.4, 1, 0.4] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    />

                    {/* 3-5mm Stem Button */}
                    <rect x="296" y="132" width="8" height="12" rx="2" fill="#14261C" />

                    {/* Hero Harvest Avocado Profile */}
                    <path
                      d="M300 142 C335 142, 355 190, 350 230 C345 265, 325 285, 300 285 C275 285, 255 265, 250 230 C245 190, 265 142, 300 142 Z"
                      fill="#4A7C2C"
                      stroke="#14261C"
                      strokeWidth="3.5"
                    />
                    {/* Inner Seed Indicator */}
                    <circle cx="300" cy="230" r="22" fill="#84CC16" stroke="#14261C" strokeWidth="2" />

                    {/* Ventilated Harvest Crate */}
                    <rect x="190" y="310" width="220" height="60" rx="6" fill="none" stroke="#14261C" strokeWidth="3" />
                    <line x1="215" y1="330" x2="385" y2="330" stroke="#4A7C2C" strokeWidth="2.5" strokeDasharray="14 8" />
                    <line x1="215" y1="350" x2="385" y2="350" stroke="#4A7C2C" strokeWidth="2.5" strokeDasharray="14 8" />

                    <text x="300" y="395" textAnchor="middle" className="text-[11px] font-mono font-bold fill-[#4A7C2C]">
                      DRY MATTER: 23%–26% VERIFIED · 3–5mm STEM BUTTON
                    </text>
                  </motion.g>
                )}

                {activeStage === 2 && (
                  <motion.g
                    key="scene-2"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.05 }}
                    transition={{ duration: 0.4 }}
                  >
                    {/* Conveyor Belt Platform */}
                    <line x1="100" y1="285" x2="500" y2="285" stroke="#14261C" strokeWidth="4.5" />
                    <line x1="100" y1="300" x2="500" y2="300" stroke="#14261C" strokeWidth="2" strokeDasharray="8 6" />

                    {/* Rotating Soft-Bristle Brushes */}
                    <motion.circle
                      cx="210"
                      cy="215"
                      r="42"
                      fill="none"
                      stroke="#4A7C2C"
                      strokeWidth="3.5"
                      strokeDasharray="6 6"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                      style={{ transformOrigin: "210px 215px" }}
                    />
                    <motion.circle
                      cx="390"
                      cy="215"
                      r="42"
                      fill="none"
                      stroke="#4A7C2C"
                      strokeWidth="3.5"
                      strokeDasharray="6 6"
                      animate={{ rotate: -360 }}
                      transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                      style={{ transformOrigin: "390px 215px" }}
                    />

                    {/* Water Droplets & Ripples */}
                    <motion.circle
                      cx="300"
                      cy="215"
                      r="65"
                      fill="none"
                      stroke="#84CC16"
                      strokeWidth="2.5"
                      strokeOpacity="0.7"
                      animate={{ r: [55, 75], opacity: [0.8, 0] }}
                      transition={{ duration: 1.8, repeat: Infinity }}
                    />

                    {/* Washed Avocado on Conveyor */}
                    <ellipse cx="300" cy="215" rx="36" ry="48" fill="#4A7C2C" stroke="#14261C" strokeWidth="3.5" />

                    <text x="300" y="345" textAnchor="middle" className="text-[11px] font-mono font-bold fill-[#14261C]">
                      CIRCULATING HYDRO-BATH &amp; SOFT BRISTLE SANITIZATION
                    </text>
                  </motion.g>
                )}

                {activeStage === 3 && (
                  <motion.g
                    key="scene-3"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.05 }}
                    transition={{ duration: 0.4 }}
                  >
                    {/* Electronic Inspection Scan Target Frame */}
                    <rect
                      x="195"
                      y="110"
                      width="210"
                      height="200"
                      rx="14"
                      fill="none"
                      stroke="#14261C"
                      strokeWidth="2.5"
                      strokeDasharray="12 8"
                    />

                    {/* Animated Optical Laser Sweep Line */}
                    <motion.line
                      x1="180"
                      y1="160"
                      x2="420"
                      y2="160"
                      stroke="url(#laserGrad)"
                      strokeWidth="4"
                      animate={{ y1: [130, 280, 130], y2: [130, 280, 130] }}
                      transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
                    />

                    {/* Array of Sorted Calibers */}
                    <ellipse cx="240" cy="220" rx="22" ry="30" fill="#4A7C2C" fillOpacity="0.4" stroke="#14261C" strokeWidth="2" />
                    <ellipse cx="300" cy="215" rx="29" ry="39" fill="#4A7C2C" stroke="#14261C" strokeWidth="3.5" />
                    <ellipse cx="360" cy="210" rx="34" ry="46" fill="#4A7C2C" fillOpacity="0.4" stroke="#14261C" strokeWidth="2" />

                    {/* Gram Weight HUD Badge */}
                    <rect x="250" y="275" width="100" height="26" rx="6" fill="#14261C" />
                    <text x="300" y="292" textAnchor="middle" className="text-[11px] font-mono font-bold fill-banana">
                      COUNT 16 · 250g
                    </text>

                    <text x="300" y="355" textAnchor="middle" className="text-[11px] font-mono font-bold fill-[#4A7C2C]">
                      STANDARDS: COUNTS 12, 14, 16, 18, 20, 22, 24
                    </text>
                  </motion.g>
                )}

                {activeStage === 4 && (
                  <motion.g
                    key="scene-4"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.05 }}
                    transition={{ duration: 0.4 }}
                  >
                    {/* Isometric 3D Ventilated Export Carton */}
                    {/* Top Surface */}
                    <polygon
                      points="300,120 440,180 300,240 160,180"
                      fill="#4A7C2C"
                      fillOpacity="0.18"
                      stroke="#14261C"
                      strokeWidth="3"
                    />
                    {/* Left Surface */}
                    <polygon
                      points="160,180 300,240 300,320 160,260"
                      fill="#FAF8F5"
                      stroke="#14261C"
                      strokeWidth="3"
                    />
                    {/* Right Surface */}
                    <polygon
                      points="440,180 300,240 300,320 440,260"
                      fill="#4A7C2C"
                      fillOpacity="0.1"
                      stroke="#14261C"
                      strokeWidth="3"
                    />

                    {/* Ventilation Airflow Holes */}
                    <circle cx="215" cy="245" r="7" fill="#14261C" />
                    <circle cx="245" cy="258" r="7" fill="#14261C" />
                    <circle cx="355" cy="258" r="7" fill="#4A7C2C" />
                    <circle cx="385" cy="245" r="7" fill="#4A7C2C" />

                    {/* Graded Avocados Resting In Carton */}
                    <circle cx="265" cy="180" r="16" fill="#4A7C2C" stroke="#14261C" strokeWidth="2" />
                    <circle cx="300" cy="165" r="16" fill="#84CC16" stroke="#14261C" strokeWidth="2" />
                    <circle cx="335" cy="180" r="16" fill="#4A7C2C" stroke="#14261C" strokeWidth="2" />

                    {/* Precooling Thermometer Graphic */}
                    <rect x="475" y="150" width="16" height="85" rx="8" fill="none" stroke="#14261C" strokeWidth="2.5" />
                    <motion.rect
                      x="478"
                      y="190"
                      width="10"
                      height="42"
                      rx="5"
                      fill="#84CC16"
                      animate={{ height: [42, 52, 42] }}
                      transition={{ duration: 2.5, repeat: Infinity }}
                    />
                    <text x="483" y="142" textAnchor="middle" className="text-[10px] font-mono font-bold fill-forest">
                      5.5°C
                    </text>

                    <text x="300" y="365" textAnchor="middle" className="text-[11px] font-mono font-bold fill-[#14261C]">
                      FORCED-AIR PRECOOLING: 5.0°C – 7.0°C · 4kg/10kg CARTONS
                    </text>
                  </motion.g>
                )}

                {activeStage === 5 && (
                  <motion.g
                    key="scene-5"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.05 }}
                    transition={{ duration: 0.4 }}
                  >
                    {/* Dotted Globe Grid */}
                    <circle cx="300" cy="225" r="125" fill="#4A7C2C" fillOpacity="0.08" stroke="#14261C" strokeWidth="2.5" />
                    <ellipse cx="300" cy="225" rx="60" ry="125" fill="none" stroke="#14261C" strokeOpacity="0.25" strokeWidth="1.5" />
                    <line x1="175" y1="225" x2="425" y2="225" stroke="#14261C" strokeOpacity="0.25" strokeWidth="1.5" />

                    {/* Wolaita Origin Node (Pulsing Pin) */}
                    <circle cx="320" cy="245" r="9" fill="#84CC16" stroke="#14261C" strokeWidth="2.5" />
                    <motion.circle
                      cx="320"
                      cy="245"
                      r="16"
                      fill="none"
                      stroke="#84CC16"
                      strokeWidth="2"
                      animate={{ r: [12, 28], opacity: [0.9, 0] }}
                      transition={{ duration: 1.6, repeat: Infinity }}
                    />

                    {/* Trade Route Arc: To Middle East */}
                    <motion.path
                      d="M320 245 Q 365 175 400 165"
                      fill="none"
                      stroke="#4A7C2C"
                      strokeWidth="3.5"
                      strokeDasharray="6 4"
                      animate={{ strokeDashoffset: [0, -40] }}
                      transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                    />
                    <circle cx="400" cy="165" r="6" fill="#14261C" />
                    <text x="415" y="165" className="text-[10px] font-mono font-bold fill-forest">GULF / ME</text>

                    {/* Trade Route Arc: To Europe */}
                    <motion.path
                      d="M320 245 Q 285 145 240 130"
                      fill="none"
                      stroke="#4A7C2C"
                      strokeWidth="3.5"
                      strokeDasharray="6 4"
                      animate={{ strokeDashoffset: [0, -40] }}
                      transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                    />
                    <circle cx="240" cy="130" r="6" fill="#14261C" />
                    <text x="180" y="130" className="text-[10px] font-mono font-bold fill-forest">EUROPE</text>

                    {/* Trade Route Arc: To Asia */}
                    <motion.path
                      d="M320 245 Q 405 220 445 210"
                      fill="none"
                      stroke="#84CC16"
                      strokeWidth="3.5"
                      strokeDasharray="6 4"
                      animate={{ strokeDashoffset: [0, -40] }}
                      transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                    />
                    <circle cx="445" cy="210" r="6" fill="#14261C" />
                    <text x="455" y="210" className="text-[10px] font-mono font-bold fill-forest">ASIA</text>

                    <text x="300" y="385" textAnchor="middle" className="text-[11px] font-mono font-bold fill-[#14261C]">
                      WOLAITA ORIGIN → BOLE AIR CARGO &amp; DJIBOUTI REEFER PORT
                    </text>
                  </motion.g>
                )}
              </AnimatePresence>
            </svg>
          </div>

          {/* Stepper Navigation Footer Buttons */}
          <div className="mt-4 flex w-full max-w-lg items-center justify-between px-2 text-xs font-semibold">
            <button
              onClick={() => setActiveStage((prev) => Math.max(0, prev - 1))}
              disabled={activeStage === 0}
              className="rounded-md border border-border px-3.5 py-1.5 transition-colors hover:bg-sage/40 disabled:opacity-40 disabled:hover:bg-transparent text-forest"
            >
              ← Previous Phase
            </button>

            <span className="font-mono text-muted-foreground">
              {activeStage + 1} of {PROCESS_STAGES.length}
            </span>

            <button
              onClick={() => setActiveStage((prev) => Math.min(PROCESS_STAGES.length - 1, prev + 1))}
              disabled={activeStage === PROCESS_STAGES.length - 1}
              className="rounded-md bg-forest px-3.5 py-1.5 text-banana transition-colors hover:bg-forest-deep disabled:opacity-40"
            >
              Next Phase →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

