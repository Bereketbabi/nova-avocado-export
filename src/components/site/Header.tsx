import { Link, useRouterState } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Menu, Phone, X } from "lucide-react";
import { useEffect, useState } from "react";
import logo from "@/assets/nova-logo.png";
import { NAV, SITE } from "@/lib/site";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 40);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  useEffect(() => setOpen(false), [pathname]);

  const solid = scrolled || open;

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className={`transition-all duration-700 ease-expo ${solid ? "bg-ivory/95 border-b border-border backdrop-blur-md" : "bg-transparent"}`}>
        <div className={`container-x flex items-center justify-between gap-6 transition-all duration-700 ease-expo ${solid ? "h-20" : "h-24"}`}>
          <Link to="/" aria-label="Nova Wholesale Trade — home"
            className={`flex shrink-0 items-center rounded-sm transition-all duration-700 ease-expo ${solid ? "px-0 py-0" : "bg-ivory px-4 py-2.5 shadow-soft"}`}>
            <img src={logo} alt="Nova Wholesale Trade" width={560} height={189} className="h-10 w-auto md:h-11" />
          </Link>

          <nav className="hidden items-center gap-1 xl:flex">
            {NAV.map((n) => (
              <Link key={n.to} to={n.to} activeOptions={{ exact: n.to === "/" }}
                className={`group relative px-3 py-2 text-[0.82rem] font-semibold tracking-wide transition-colors ${solid ? "text-forest" : "text-ivory"}`}>
                {({ isActive }) => (
                  <>
                    {n.label}
                    <span className={`absolute inset-x-3 -bottom-0.5 h-[2px] origin-left bg-banana transition-transform duration-500 ease-expo ${isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"}`} />
                  </>
                )}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <a href={SITE.phoneHref} className={`hidden items-center gap-2 text-sm font-semibold lg:flex ${solid ? "text-forest" : "text-ivory"}`}>
              <Phone className="h-4 w-4" /> {SITE.phone}
            </a>
            <Link to="/contact" className="hidden items-center gap-2 bg-banana px-5 py-3 text-xs font-bold uppercase tracking-[0.15em] text-forest-deep transition-colors duration-300 hover:bg-banana-deep md:inline-flex">
              Request a Quote <ArrowUpRight className="h-4 w-4" />
            </Link>
            <button aria-label={open ? "Close menu" : "Open menu"} onClick={() => setOpen((o) => !o)}
              className={`flex h-11 w-11 items-center justify-center xl:hidden ${solid ? "text-forest" : "text-ivory"}`}>
              {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-x-0 bottom-0 top-20 bg-forest-deep xl:hidden"
            initial={{ clipPath: "inset(0% 0% 100% 0%)" }}
            animate={{ clipPath: "inset(0% 0% 0% 0%)" }}
            exit={{ clipPath: "inset(0% 0% 100% 0%)" }}
            transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
          >
            <nav className="container-x flex flex-col gap-1 pt-10">
              {NAV.map((n, i) => (
                <motion.div key={n.to} initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 + i * 0.05, duration: 0.6 }}>
                  <Link to={n.to} activeOptions={{ exact: n.to === "/" }} className="block border-b border-ivory/10 py-4 font-display text-3xl text-ivory" activeProps={{ className: "text-banana" }}>
                    {n.label}
                  </Link>
                </motion.div>
              ))}
              <div className="mt-8 space-y-2 text-ivory/80">
                <a href={`mailto:${SITE.email}`} className="block">{SITE.email}</a>
                <a href={SITE.phoneHref} className="block">{SITE.phone}</a>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
