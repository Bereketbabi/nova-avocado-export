import nursery from "@/assets/stage-1-nursery.jpg";
import orchard from "@/assets/stage-2-orchard.jpg";
import harvest from "@/assets/stage-3-harvest.jpg";
import washing from "@/assets/stage-4-washing.jpg";
import grading from "@/assets/stage-5-grading.jpg";
import packing from "@/assets/stage-6-packing.jpg";
import exportImg from "@/assets/stage-7-export.jpg";

export type Stage = {
  title: string;
  kicker: string;
  caption: string;
  body: string;
  image: string;
  alt: string;
  stat: { value: string; label: string };
  tags: string[];
};

export const stages: Stage[] = [
  {
    title: "Nursery Grafting & Planting",
    kicker: "Propagation",
    caption: "Every tree starts as a hand-grafted seedling.",
    body: "Disease-free rootstocks are grafted with Hass, Ettinger and Fuerte, then planted in Wolaita's red volcanic soil.",
    image: nursery,
    alt: "Farmer grafting a young avocado seedling in red volcanic soil",
    stat: { value: "1,500–2,200 m", label: "Altitude" },
    tags: ["Hass", "Ettinger", "Fuerte"],
  },
  {
    title: "Orchard Care & Flowering",
    kicker: "Cultivation",
    caption: "Highland sun and two rainy seasons do the slow work.",
    body: "Trees blossom and set fruit under careful pruning, natural soil nutrition and steady pest checks.",
    image: orchard,
    alt: "Avocado branch with flowers and young fruit over misty green hills",
    stat: { value: "Bimodal", label: "Rainfall" },
    tags: ["Pruning", "Drip irrigation", "Natural nutrition"],
  },
  {
    title: "Maturity Test & Hand-Harvest",
    kicker: "Harvesting",
    caption: "Harvested at peak maturity. Transferred in ventilated field crates.",
    body: "Fruit is harvested following rigorous dry-matter testing, clipped with short stem buttons and transferred across the orchard in ventilated crates to protect the skin.",
    image: harvest,
    alt: "Field harvest team carrying freshly picked avocados in ventilated crates through the Wolaita orchard",
    stat: { value: "22–26%", label: "Dry matter" },
    tags: ["Ventilated crates", "Field transport", "Stem clipped"],
  },
  {
    title: "Washing & Brushing",
    kicker: "Wolaita packhouse",
    caption: "From tree to wash line the same day.",
    body: "A gentle water bath and soft rotating brushes clean each fruit before a protective coating seals in freshness.",
    image: washing,
    alt: "Avocados moving through a water wash under soft brushes",
    stat: { value: "< 24 h", label: "Field to packhouse" },
    tags: ["Water bath", "Soft brush", "Wax seal"],
  },
  {
    title: "Inspection & Grading",
    kicker: "Quality control",
    caption: "Weighed to the gram, sorted to the count.",
    body: "Any fruit with blemishes or sunburn is removed. The rest is weighed with precision digital scales and sorted into uniform export calibers.",
    image: grading,
    alt: "Quality technician weighing avocados on a digital scale in the grading facility",
    stat: { value: "12 – 24", label: "Count sizes" },
    tags: ["Visual check", "Gram-weight sort", "Calibers L · M · S"],
  },
  {
    title: "Packing & Precooling",
    kicker: "Cold-chain prep",
    caption: "Packed, palletised and chilled in hours.",
    body: "Ventilated 4 kg and 10 kg cartons are stacked on pallets and moved into forced-air cooling rooms.",
    image: packing,
    alt: "Pallets of avocado cartons in a misty cold room",
    stat: { value: "5–7 °C", label: "Pulp temperature" },
    tags: ["4 kg", "10 kg", "Forced air"],
  },
  {
    title: "Cold-Chain Export",
    kicker: "To the world",
    caption: "Chilled all the way to the buyer's door.",
    body: "Palletized cartons are loaded into temperature-monitored reefer containers at Mojo Dry Port, connecting seamlessly to Bole Airport and the Djibouti port corridor.",
    image: exportImg,
    alt: "Forklift loading pallets of export avocado cartons into a refrigerated container at Mojo Dry Port, Ethiopia",
    stat: { value: "Sea & Air", label: "Reefer · Cargo" },
    tags: ["Mojo Dry Port", "Bole Airport", "Djibouti port"],
  },
];

