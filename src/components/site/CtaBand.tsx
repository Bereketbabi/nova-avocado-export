import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import img from "@/assets/supply-truck.jpg";
import { Reveal } from "./Reveal";

export function CtaBand() {
  return (
    <section className="grain relative overflow-hidden bg-forest-deep">
      <img src={img} alt="" width={1600} height={1008} loading="lazy" className="absolute inset-0 h-full w-full object-cover opacity-45" />
      <div className="absolute inset-0 bg-side-veil" />
      <div className="container-x relative py-28 md:py-36">
        <Reveal className="max-w-2xl">
          <p className="eyebrow text-banana">Partnership</p>
          <h2 className="mt-5 text-4xl leading-tight text-ivory md:text-6xl">Let's build a supply partnership.</h2>
          <p className="mt-6 max-w-lg text-ivory/75">Looking for a reliable banana supply partner? Connect with Nova Wholesale Trade to discuss your sourcing requirements.</p>
          <Link to="/contact" className="mt-10 inline-flex items-center gap-3 bg-banana px-7 py-4 text-xs font-bold uppercase tracking-[0.18em] text-forest-deep transition-colors hover:bg-banana-deep">
            Start a Partnership <ArrowUpRight className="h-4 w-4" />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
