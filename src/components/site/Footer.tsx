import { Link } from "@tanstack/react-router";
import { Mail, MapPin, MessageCircle, Phone } from "lucide-react";
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
            An experienced Ethiopian avocado supplier, now connecting premium highland production from Wolaita directly with international buyers.
          </p>
          <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-ivory/15 bg-forest px-3.5 py-1.5 text-xs text-banana">
            <span className="h-2 w-2 rounded-full bg-banana animate-pulse" />
            <span>Origin: Wolaita Region, Southern Ethiopia</span>
          </div>
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
          <p className="eyebrow text-banana">Contact & Export Desk</p>
          <ul className="mt-5 space-y-4 text-sm text-ivory/80">
            <li><a href={`mailto:${SITE.email}`} className="flex items-center gap-3 hover:text-banana break-all"><Mail className="h-4 w-4 text-banana shrink-0" /><span>{SITE.email}</span></a></li>
            <li><a href={SITE.phoneHref} className="flex items-center gap-3 hover:text-banana break-all"><Phone className="h-4 w-4 text-banana shrink-0" /><span>{SITE.phone}</span></a></li>
            <li className="flex items-start gap-3"><MapPin className="h-4 w-4 text-banana shrink-0 mt-0.5" /><span>{SITE.location}</span></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-ivory/10">
        <div className="container-x flex flex-col justify-between gap-3 py-6 text-xs text-ivory/50 md:flex-row">
          <span>© {new Date().getFullYear()} Nova Wholesale Trade. All rights reserved.</span>
          <span className="tracking-[0.2em] uppercase">From Wolaita Highlands to Direct Global Trade</span>
        </div>
      </div>
      <span aria-hidden className="pointer-events-none absolute -bottom-10 right-0 select-none font-display text-[12rem] leading-none text-ivory/[0.03] md:text-[18rem]">NOVA</span>
    </footer>
  );
}
