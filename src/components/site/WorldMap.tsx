import world from "@/assets/world-dots.jpg";

export function WorldMap() {
  return (
    <div className="relative">
      <img src={world} alt="World map with Ethiopia highlighted" width={1920} height={960} loading="lazy" className="w-full [mask-image:radial-gradient(ellipse_at_center,black_60%,transparent_100%)]" />
      <div className="absolute" style={{ left: "58.2%", top: "46.5%" }}>
        <span className="absolute -left-10 -top-10 h-20 w-20 animate-ping rounded-full bg-banana/40" />
        <span className="absolute -left-2.5 -top-2.5 h-5 w-5 rounded-full border-4 border-ivory bg-banana shadow-soft" />
        <span className="absolute left-5 -top-12 whitespace-nowrap bg-forest px-3 py-1.5 text-[0.65rem] font-bold uppercase tracking-[0.2em] text-ivory">Ethiopia · Origin</span>
      </div>
    </div>
  );
}
