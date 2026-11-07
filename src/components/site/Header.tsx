import { Link, useRouterState } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Clock, Mail, MapPin, Menu, MessageCircle, Phone, X } from "lucide-react";
import { useEffect, useState } from "react";
import logoDark from "@/assets/nova-logo.png";
import logoLight from "@/assets/nova-logo-light.png";
import { NAV, SITE } from "@/lib/site";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 30);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  useEffect(() => setOpen(false), [pathname]);

  const isLightPage = pathname.startsWith("/gallery") || pathname.startsWith("/contact");
  const solid = scrolled || open || isLightPage;

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      {/* Top Utility Bar */}
      <div className={`hidden border-b border-ivory/10 text-xs transition-colors duration-500 lg:block ${solid ? "bg-forest-deep text-ivory/80" : "bg-forest-deep/80 text-ivory/90 backdrop-blur-sm"}`}>
        <div className="container-x flex h-8 items-center justify-between">
          <div className="flex items-center gap-2 tracking-wide font-medium">
            <MapPin className="h-3 w-3 text-banana" />
            <span>Wolaita, Ethiopia · Export Operations</span>
          </div>
          <div className="flex items-center gap-5">
            <a href={`mailto:${SITE.email}`} className="flex items-center gap-1.5 hover:text-banana transition-colors">
              <Mail className="h-3 w-3 text-banana" />
              <span>{SITE.email}</span>
            </a>
            <span className="text-ivory/30">·</span>
            <a href="tel:+251920959903" className="flex items-center gap-1.5 hover:text-banana transition-colors">
              <Phone className="h-3 w-3 text-banana" />
              <span>{SITE.phone}</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className={`transition-all duration-700 ease-expo ${solid ? "bg-ivory/95 border-b border-border shadow-sm backdrop-blur-md" : "bg-transparent"}`}>
        <div className={`container-x flex items-center justify-between gap-4 transition-all duration-700 ease-expo ${solid ? "h-20" : "h-24"}`}>
          <Link to="/" aria-label="Nova Wholesale Trade — home" className="flex shrink-0 items-center">
            <img src={solid ? logoDark : logoLight} alt="Nova Wholesale Trade" width={560} height={189} className="h-9 w-auto sm:h-10 md:h-11" />
          </Link>

          <nav className="hidden items-center gap-0.5 xl:flex">
            {NAV.map((n) => (
              <Link key={n.to} to={n.to} activeOptions={{ exact: n.to === "/" }}
                className={`group relative whitespace-nowrap rounded-sm px-2.5 py-2 text-[0.82rem] font-semibold tracking-wide outline-none focus:outline-none focus-visible:ring-1 focus-visible:ring-banana/60 transition-colors ${solid ? "text-forest hover:text-avocado" : "text-ivory hover:text-banana"}`}>
                {({ isActive }) => (
                  <>
                    <span className={isActive ? (solid ? "text-forest font-bold" : "text-ivory font-bold") : ""}>
                      {n.label}
                    </span>
                    <span className={`absolute inset-x-3 -bottom-0.5 h-[2px] origin-left bg-banana transition-transform duration-500 ease-expo ${isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"}`} />
                  </>
                )}
              </Link>
            ))}
          </nav>

          <div className="flex shrink-0 items-center gap-3">
            <a href="tel:+251920959903" className={`hidden items-center gap-2 whitespace-nowrap text-sm font-semibold 2xl:flex outline-none focus:outline-none transition-colors ${solid ? "text-forest hover:text-avocado" : "text-ivory hover:text-banana"}`}>
              <Phone className="h-4 w-4 text-banana" /> {SITE.phone}
            </a>
            <Link to="/contact" className="hidden items-center gap-2 whitespace-nowrap bg-banana px-4 py-2.5 text-xs font-bold uppercase tracking-[0.15em] text-forest-deep transition-colors duration-300 hover:bg-banana-deep md:inline-flex">
              Request a Quote <ArrowUpRight className="h-4 w-4" />
            </Link>
            <button aria-label={open ? "Close menu" : "Open menu"} onClick={() => setOpen((o) => !o)}
              className={`flex h-11 w-11 items-center justify-center outline-none focus:outline-none xl:hidden ${solid ? "text-forest" : "text-ivory"}`}>
              {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-x-0 bottom-0 top-[73px] overflow-y-auto bg-forest-deep xl:hidden"
            initial={{ clipPath: "inset(0% 0% 100% 0%)" }}
            animate={{ clipPath: "inset(0% 0% 0% 0%)" }}
            exit={{ clipPath: "inset(0% 0% 100% 0%)" }}
            transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
          >
            <nav className="container-x flex flex-col gap-1 pb-10 pt-8">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-ivory/15 bg-forest px-3 py-1 text-xs text-banana">
                <span className="h-2 w-2 rounded-full bg-banana animate-ping" />
                <span>Wolaita Origin · Export Packing & Cold Chain</span>
              </div>
              {NAV.map((n, i) => (
                <motion.div key={n.to} initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 + i * 0.05, duration: 0.6 }}>
                  <Link to={n.to} activeOptions={{ exact: n.to === "/" }} className="block border-b border-ivory/10 py-3.5 font-display text-2xl sm:text-3xl text-ivory" activeProps={{ className: "text-banana" }}>
                    {n.label}
                  </Link>
                </motion.div>
              ))}
              <div className="mt-8 flex flex-col gap-3">
                <Link to="/contact" className="inline-flex items-center justify-center gap-2 bg-banana px-5 py-3.5 text-xs font-bold uppercase tracking-[0.15em] text-forest-deep">
                  Request a Quote <ArrowUpRight className="h-4 w-4" />
                </Link>
              </div>
              <div className="mt-8 space-y-2.5 break-all text-sm text-ivory/80">
                <a href={`mailto:${SITE.email}`} className="block hover:text-banana">{SITE.email}</a>
                <a href="tel:+251920959903" className="block hover:text-banana">{SITE.phone}</a>
                <p className="text-xs text-ivory/50">Origin: Wolaita Zone, Southern Ethiopia</p>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
