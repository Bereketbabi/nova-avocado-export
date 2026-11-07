import world from "@/assets/world-dots.jpg";

export function WorldMap() {
  return (
    <div className="relative overflow-hidden rounded-sm">
      <img src={world} alt="World map with Ethiopia highlighted" width={1920} height={960} loading="lazy" className="w-full [mask-image:radial-gradient(ellipse_at_center,black_60%,transparent_100%)]" />
      <div className="absolute" style={{ left: "58.2%", top: "46.5%" }}>
        <span className="absolute -left-10 -top-10 h-20 w-20 animate-ping rounded-full bg-banana/40" />
        <span className="absolute -left-2.5 -top-2.5 h-5 w-5 rounded-full border-4 border-ivory bg-banana shadow-soft" />
        <div className="absolute -left-20 sm:left-5 -top-12 sm:-top-14 whitespace-nowrap rounded-sm bg-forest px-2.5 sm:px-3 py-1 sm:py-1.5 shadow-lg">
          <p className="text-[0.62rem] sm:text-[0.68rem] font-bold uppercase tracking-[0.2em] text-ivory">Wolaita, Ethiopia</p>
          <p className="text-[0.55rem] sm:text-[0.6rem] font-medium text-banana">Orchard & Packhouse Origin</p>
        </div>
      </div>
    </div>
  );
}
