import { Link } from "@tanstack/react-router";
import { Mail, MapPin, Phone } from "lucide-react";
import logo from "@/assets/nova-logo-light.png";
import { NAV, SITE } from "@/lib/site";

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-forest-deep text-ivory">
      <div className="container-x grid gap-14 py-20 md:grid-cols-12">
        <div className="md:col-span-5">
          <div className="inline-block">
            <img src={logo} alt="Nova Wholesale Trade" width={560} height={189} loading="lazy" className="h-11 w-auto" />
          </div>
          <p className="mt-6 max-w-sm text-sm leading-relaxed text-ivory/70">
            An experienced Ethiopian banana supplier, now connecting quality production directly with international buyers.
          </p>
        </div>
        <div className="md:col-span-3">
          <p className="eyebrow text-banana">Explore</p>
          <ul className="mt-5 space-y-3 text-sm">
            {NAV.map((n) => (
              <li key={n.to}><Link to={n.to} className="text-ivory/75 transition-colors hover:text-banana">{n.label}</Link></li>
            ))}
          </ul>
        </div>
        <div className="md:col-span-4">
          <p className="eyebrow text-banana">Contact</p>
          <ul className="mt-5 space-y-4 text-sm text-ivory/80">
            <li><a href={`mailto:${SITE.email}`} className="flex items-center gap-3 hover:text-banana"><Mail className="h-4 w-4 text-banana" />{SITE.email}</a></li>
            <li><a href={SITE.phoneHref} className="flex items-center gap-3 hover:text-banana"><Phone className="h-4 w-4 text-banana" />{SITE.phone}</a></li>
            <li className="flex items-center gap-3"><MapPin className="h-4 w-4 text-banana" />{SITE.location}</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-ivory/10">
        <div className="container-x flex flex-col justify-between gap-3 py-6 text-xs text-ivory/50 md:flex-row">
          <span>© {new Date().getFullYear()} Nova Wholesale Trade. All rights reserved.</span>
          <span className="tracking-[0.2em] uppercase">From trusted supply to direct global trade</span>
        </div>
      </div>
      <span aria-hidden className="pointer-events-none absolute -bottom-10 right-0 select-none font-display text-[12rem] leading-none text-ivory/[0.03] md:text-[18rem]">NOVA</span>
    </footer>
  );
}
