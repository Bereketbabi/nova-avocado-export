import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Anchor,
  ArrowUpRight,
  CheckCircle2,
  FileCheck2,
  Globe2,
  MapPin,
  Plane,
  Ship,
  ThermometerSnowflake,
  Truck,
} from "lucide-react";
import hero from "@/assets/avocado-orchard-hero.jpg";
import lead from "@/assets/avocado-export-inspection.jpg";
import { PageHero } from "@/components/site/PageHero";
import { Reveal, RevealImage } from "@/components/site/Reveal";
import { WorldMap } from "@/components/site/WorldMap";
import { CtaBand } from "@/components/site/CtaBand";

export const Route = createFileRoute("/global-trade")({
  head: () => ({
    meta: [
      { title: "Global Trade & Logistics — Nova Wholesale Trade | Ethiopian Avocado Export" },
      { name: "description", content: "Seamless air and sea export corridors delivering fresh Ethiopian avocados from Wolaita to importers across the Middle East, Europe, and Asia." },
      { property: "og:title", content: "Global Trade & Logistics — Nova Wholesale Trade" },
      { property: "og:description", content: "Rooted in Wolaita. Connected to Global Markets." },
    ],
  }),
  component: GlobalTrade,
});

const CORRIDORS = [
  {
    name: "Middle East & GCC",
    ports: "Jebel Ali (Dubai), Jeddah, Dammam, Hamad (Qatar), Kuwait",
    mode: "Sea Reefer (7–10 days) & Air Cargo (24–36h)",
    volume: "High-volume seasonal retail & wholesale programs",
    status: "Active Shipping Corridor",
  },
  {
    name: "European Union & United Kingdom",
    ports: "Rotterdam, Marseille, Antwerp, London Gateway",
    mode: "Controlled Atmosphere (CA) Reefer & Bole Air Cargo",
    volume: "Global GAP compliant supermarket programs",
    status: "Active Trade Lane",
  },
  {
    name: "Regional Horn of Africa",
    ports: "Djibouti Free Zone, Berbera, Nairobi (air)",
    mode: "Overland Reefer Truck & Regional Air Freight",
    volume: "Continuous cross-border fresh supply",
    status: "Direct Dispatch",
  },
  {
    name: "Central & South Asia",
    ports: "Mumbai, Delhi, Tashkent, Almaty",
    mode: "Scheduled Air Cargo via Ethiopian Airlines",
    volume: "Premium culinary & specialty wholesale",
    status: "Rapid Air Delivery",
  },
];

const DOCUMENTS = [
  "Official Phytosanitary Certificate (Ethiopian Ministry of Agriculture)",
  "Certificate of Origin (Ethiopian Chamber of Commerce)",
  "Commercial Invoice & Detailed Packing List (Carton counts, gross/net weight)",
  "Bill of Lading (Sea) or Air Waybill (Air Freight)",
  "Batch Dry-Matter & Quality Inspection Certificate",
  "Temperature Data Logger Graph Printouts upon Port Arrival",
];

function GlobalTrade() {
  return (
    <>
      <PageHero
        image={hero}
        eyebrow="International Logistics & Export"
        title="Rooted in Wolaita. Connected to Global Markets."
        crumb="Global Trade"
      />

      {/* World Map Section */}
      <section className="bg-sage py-28 md:py-36">
        <div className="container-x">
          <Reveal className="mx-auto max-w-2xl text-center">
            <p className="eyebrow text-avocado">Origin & Reach</p>
            <h2 className="mt-5 text-3xl sm:text-4xl leading-tight text-forest md:text-5xl">Our Wolaita Origin, Your Market.</h2>
            <p className="mt-6 text-muted-foreground">
              Strategic transport routes connecting Southern Ethiopia's avocado production with commercial buyers across the Middle East, Europe, and Asia.
            </p>
          </Reveal>
          <Reveal className="mx-auto mt-14 max-w-5xl">
            <WorldMap />
          </Reveal>
        </div>
      </section>

      {/* Dual Freight Corridors */}
      <section className="bg-ivory py-28 md:py-36">
        <div className="container-x">
          <Reveal className="max-w-3xl">
            <p className="eyebrow text-avocado">Multimodal Logistics</p>
            <h2 className="mt-4 text-3xl sm:text-4xl leading-tight text-forest md:text-5xl">
              Air & Maritime Cold-Chain Corridors.
            </h2>
            <p className="mt-4 text-muted-foreground">
              Whether you need rapid air delivery for premium retail or large-scale sea reefer containers for wholesale distribution, Nova Wholesale Trade operates reliable multimodal routes.
            </p>
          </Reveal>

          <div className="mt-16 grid gap-8 md:grid-cols-2">
            {/* Air Freight Card */}
            <Reveal delay={0.1} className="rounded-sm border border-border bg-sage/20 p-8 shadow-sm">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-forest text-banana">
                <Plane className="h-6 w-6" />
              </div>
              <h3 className="mt-6 text-2xl font-bold text-forest">Air Cargo Corridor (Rapid Dispatch)</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                Refrigerated trucks transport precooled avocado cartons directly from our Wolaita packhouse to Addis Ababa Bole International Airport Cargo Terminal.
              </p>
              <ul className="mt-6 space-y-2.5 text-xs text-forest/90 border-t border-border pt-4">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-avocado" />
                  <span>Transit Time: 24–48 hours from tree to overseas destination hub</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-avocado" />
                  <span>Network: Ethiopian Airlines cargo belly-hold & dedicated freighters</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-avocado" />
                  <span>Best For: Early-season Ettinger, air-freight Hass, urgent supermarket replenishment</span>
                </li>
              </ul>
            </Reveal>

            {/* Sea Reefer Card */}
            <Reveal delay={0.2} className="rounded-sm border border-border bg-sage/20 p-8 shadow-sm">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-forest text-banana">
                <Ship className="h-6 w-6" />
              </div>
              <h3 className="mt-6 text-2xl font-bold text-forest">Maritime Reefer Corridor (Bulk Volume)</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                Loaded into 40ft High-Cube Controlled Atmosphere (CA) reefer containers in Wolaita, sealed, and moved via the bonded Djibouti port transport corridor.
              </p>
              <ul className="mt-6 space-y-2.5 text-xs text-forest/90 border-t border-border pt-4">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-avocado" />
                  <span>Technology: Controlled Atmosphere (O2 2%–5%, CO2 3%–5%) to halt ripening</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-avocado" />
                  <span>Capacity: ~5,280 cartons (4 kg) / 20 pallets per 40ft container</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-avocado" />
                  <span>Best For: High-volume wholesale importers in UAE, Saudi Arabia, and Europe</span>
                </li>
              </ul>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Target Destination Corridors */}
      <section className="bg-sage py-28 md:py-36">
        <div className="container-x">
          <Reveal className="max-w-2xl">
            <p className="eyebrow text-avocado">Destination Markets</p>
            <h2 className="mt-4 text-3xl sm:text-4xl leading-tight text-forest md:text-5xl">
              Target Import Corridors.
            </h2>
            <p className="mt-4 text-muted-foreground">
              We work with commercial fresh produce importers, wholesalers, and retail distributors across major global markets.
            </p>
          </Reveal>

          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {CORRIDORS.map((c, i) => (
              <Reveal key={c.name} delay={i * 0.1} className="rounded-sm border border-border bg-ivory p-6 shadow-sm">
                <span className="inline-block rounded-full bg-forest/10 px-2.5 py-1 text-[0.68rem] font-bold text-forest">
                  {c.status}
                </span>
                <h3 className="mt-4 text-xl font-bold text-forest">{c.name}</h3>
                <p className="mt-2 text-xs font-semibold text-avocado">{c.ports}</p>
                <div className="mt-4 border-t border-border pt-3 text-xs text-muted-foreground space-y-1">
                  <p><strong className="text-forest">Mode:</strong> {c.mode}</p>
                  <p><strong className="text-forest">Volume:</strong> {c.volume}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Export Documentation & Compliance */}
      <section className="bg-ivory py-28 md:py-36">
        <div className="container-x grid items-center gap-16 lg:grid-cols-12">
          <Reveal className="lg:col-span-6">
            <p className="eyebrow text-avocado">Documentation & Trade Compliance</p>
            <h2 className="mt-5 text-3xl sm:text-4xl leading-tight text-forest md:text-5xl">
              Certified Phytosanitary & Customs Clearance.
            </h2>
            <p className="mt-6 leading-relaxed text-muted-foreground">
              Every shipment leaving Nova Wholesale Trade is accompanied by complete international trade documentation to ensure smooth, unhindered customs release at destination ports.
            </p>
            <ul className="mt-8 space-y-3">
              {DOCUMENTS.map((doc) => (
                <li key={doc} className="flex items-start gap-3 text-sm text-forest">
                  <FileCheck2 className="h-5 w-5 text-avocado shrink-0 mt-0.5" />
                  <span>{doc}</span>
                </li>
              ))}
            </ul>
            <Link to="/contact" className="mt-10 inline-flex items-center gap-3 bg-banana px-7 py-4 text-xs font-bold uppercase tracking-[0.18em] text-forest-deep transition-colors hover:bg-banana-deep">
              Become a Trade Partner <ArrowUpRight className="h-4 w-4" />
            </Link>
          </Reveal>
          <div className="lg:col-span-6">
            <RevealImage src={lead} alt="Nova international trade representative" width={1200} height={1504} className="aspect-[4/5] max-h-[700px]" />
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
