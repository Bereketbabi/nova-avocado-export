import { Link, useRouterState } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Menu, Phone, X } from "lucide-react";
import { useEffect, useState } from "react";
import logoDark from "@/assets/nova-logo.png";
import logoLight from "@/assets/nova-logo-light.png";
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
        <div className={`container-x flex items-center justify-between gap-4 transition-all duration-700 ease-expo ${solid ? "h-20" : "h-24"}`}>
          <Link to="/" aria-label="Nova Wholesale Trade — home"
            className="flex shrink-0 items-center">
            <img src={solid ? logoDark : logoLight} alt="Nova Wholesale Trade" width={560} height={189} className="h-9 w-auto sm:h-10 md:h-11" />
          </Link>

          <nav className="hidden items-center gap-0.5 xl:flex">
            {NAV.map((n) => (
              <Link key={n.to} to={n.to} activeOptions={{ exact: n.to === "/" }}
                className={`group relative whitespace-nowrap px-2.5 py-2 text-[0.8rem] font-semibold tracking-wide transition-colors ${solid ? "text-forest" : "text-ivory"}`}>
                {({ isActive }) => (
                  <>
                    {n.label}
                    <span className={`absolute inset-x-3 -bottom-0.5 h-[2px] origin-left bg-banana transition-transform duration-500 ease-expo ${isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"}`} />
                  </>
                )}
              </Link>
            ))}
          </nav>

          <div className="flex shrink-0 items-center gap-3">
            <a href={SITE.phoneHref} className={`hidden items-center gap-2 whitespace-nowrap text-sm font-semibold 2xl:flex ${solid ? "text-forest" : "text-ivory"}`}>
              <Phone className="h-4 w-4" /> {SITE.phone}
            </a>
            <Link to="/contact" className="hidden items-center gap-2 whitespace-nowrap bg-banana px-4 py-2.5 text-xs font-bold uppercase tracking-[0.15em] text-forest-deep transition-colors duration-300 hover:bg-banana-deep md:inline-flex">
              Get a Quote <ArrowUpRight className="h-4 w-4" />
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
            className="fixed inset-x-0 bottom-0 top-20 overflow-y-auto bg-forest-deep xl:hidden"
            initial={{ clipPath: "inset(0% 0% 100% 0%)" }}
            animate={{ clipPath: "inset(0% 0% 0% 0%)" }}
            exit={{ clipPath: "inset(0% 0% 100% 0%)" }}
            transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
          >
            <nav className="container-x flex flex-col gap-1 pb-10 pt-8">
              {NAV.map((n, i) => (
                <motion.div key={n.to} initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 + i * 0.05, duration: 0.6 }}>
                  <Link to={n.to} activeOptions={{ exact: n.to === "/" }} className="block border-b border-ivory/10 py-3 font-display text-2xl sm:py-4 sm:text-3xl text-ivory" activeProps={{ className: "text-banana" }}>
                    {n.label}
                  </Link>
                </motion.div>
              ))}
              <Link to="/contact" className="mt-6 inline-flex w-fit items-center gap-2 bg-banana px-5 py-3 text-xs font-bold uppercase tracking-[0.15em] text-forest-deep md:hidden">Get a Quote <ArrowUpRight className="h-4 w-4" /></Link>
              <div className="mt-8 space-y-2 break-all text-ivory/80">
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
