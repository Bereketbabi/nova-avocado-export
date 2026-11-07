import { createFileRoute } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, Mail, MapPin, Phone } from "lucide-react";
import { useState, type FormEvent } from "react";
import { z } from "zod";
import { Reveal } from "@/components/site/Reveal";
import { SITE } from "@/lib/site";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact Us — Nova Wholesale Trade | Ethiopian Avocado Export" },
      { name: "description", content: "Contact Nova Wholesale Trade for wholesale Ethiopian avocado supply. Direct export from Wolaita to international markets. Email elsagetachew123@gmail.com or call +251 92 095 9903." },
      { property: "og:title", content: "Contact Us — Nova Wholesale Trade — Avocado Export Desk" },
      { property: "og:description", content: "Let's build your Ethiopian avocado supply program." },
    ],
  }),
  component: Contact,
});

const schema = z.object({
  name: z.string().trim().min(2, "Please enter your full name").max(100),
  company: z.string().trim().min(2, "Please enter your company").max(120),
  email: z.string().trim().email("Please enter a valid email").max(255),
  country: z.string().trim().min(2, "Please enter your country / port").max(80),
  phone: z.string().trim().max(40).optional(),
  product: z.string().trim().max(120).optional(),
  quantity: z.string().trim().max(120).optional(),
  message: z.string().trim().min(10, "Please add a short message").max(2000),
});
type Fields = z.infer<typeof schema>;

const FIELDS: { name: keyof Fields; label: string; placeholder?: string; type?: string; full?: boolean; area?: boolean }[] = [
  { name: "name", label: "Full Name", placeholder: "e.g. John Smith" },
  { name: "company", label: "Company Name", placeholder: "e.g. Fresh Direct Trading LLC" },
  { name: "email", label: "Business Email", type: "email", placeholder: "name@company.com" },
  { name: "country", label: "Country / Destination Port", placeholder: "e.g. UAE / Netherlands" },
  { name: "phone", label: "Phone Number", type: "tel", placeholder: "+971 50 ... / +44 79 ..." },
  { name: "product", label: "Product of Interest", placeholder: "Hass Avocado / Green-Skin Varieties" },
  { name: "quantity", label: "Estimated Quantity", full: true, placeholder: "e.g. 1 x 40ft Reefer container / Air freight trial" },
  { name: "message", label: "Message", full: true, area: true, placeholder: "Please specify target volumes, preferred caliber sizes (12–24), and desired delivery timeline..." },
];

function Contact() {
  const [errors, setErrors] = useState<Partial<Record<keyof Fields, string>>>({});
  const [sent, setSent] = useState(false);

  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget));
    const r = schema.safeParse(data);
    if (!r.success) {
      const errs: Partial<Record<keyof Fields, string>> = {};
      r.error.issues.forEach((i) => { errs[i.path[0] as keyof Fields] = i.message; });
      setErrors(errs);
      return;
    }
    setErrors({});
    const v = r.data;
    const body = FIELDS.map((f) => `${f.label}: ${v[f.name] || "-"}`).join("\n");
    window.location.href = `mailto:${SITE.email}?subject=${encodeURIComponent(`Avocado Supply Inquiry — ${v.company}`)}&body=${encodeURIComponent(body)}`;
    setSent(true);
    e.currentTarget.reset();
  };

  return (
    <section className="bg-ivory pt-32 pb-24 md:pt-40 md:pb-36">
      <div className="container-x grid gap-16 lg:grid-cols-12">
        <Reveal className="lg:col-span-4">
          <p className="eyebrow text-avocado">Get in touch</p>
          <h2 className="mt-5 text-3xl sm:text-4xl leading-tight text-forest md:text-5xl font-display">Talk to our team.</h2>
          <p className="mt-6 leading-relaxed text-muted-foreground">
            Looking for a reliable Ethiopian avocado supply partner? Reach us directly or send an inquiry for current seasonal pricing and caliber charts.
          </p>
          <div className="mt-10 space-y-px bg-border">
            {[
              { icon: Mail, k: "Email", v: SITE.email, href: `mailto:${SITE.email}` },
              { icon: Phone, k: "Phone", v: SITE.phone, href: SITE.phoneHref },
              { icon: MapPin, k: "Based in", v: SITE.location },
            ].map((c) => (
              <div key={c.k} className="flex items-center gap-5 bg-ivory py-6">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center bg-forest text-banana rounded-sm">
                  <c.icon className="h-5 w-5" />
                </span>
                <div>
                  <p className="eyebrow text-olive">{c.k}</p>
                  {c.href ? (
                    <a href={c.href} className="mt-1 block break-all font-semibold text-forest hover:text-avocado">
                      {c.v}
                    </a>
                  ) : (
                    <p className="mt-1 font-semibold text-forest">{c.v}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.1} className="bg-cream p-5 sm:p-8 md:p-12 lg:col-span-8 rounded-sm shadow-sm">
          <p className="eyebrow text-avocado">Request a quote</p>
          <h3 className="mt-4 text-3xl font-display text-forest">Send an inquiry</h3>
          <form onSubmit={submit} noValidate className="mt-10 grid gap-x-8 gap-y-7 md:grid-cols-2">
            {FIELDS.map((f) => (
              <label key={f.name} className={`block ${f.full ? "md:col-span-2" : ""}`}>
                <span className="eyebrow text-olive">
                  {f.label}{["phone", "product", "quantity"].includes(f.name) ? "" : " *"}
                </span>
                {f.area ? (
                  <textarea
                    name={f.name}
                    rows={5}
                    placeholder={f.placeholder}
                    className="mt-3 w-full resize-none border-0 border-b border-forest/25 bg-transparent py-3 text-forest placeholder:text-forest/35 outline-none transition-colors focus:border-forest text-sm"
                  />
                ) : (
                  <input
                    name={f.name}
                    type={f.type ?? "text"}
                    placeholder={f.placeholder}
                    className="mt-3 w-full border-0 border-b border-forest/25 bg-transparent py-3 text-forest placeholder:text-forest/35 outline-none transition-colors focus:border-forest text-sm"
                  />
                )}
                {errors[f.name] && <span className="mt-2 block text-xs text-destructive">{errors[f.name]}</span>}
              </label>
            ))}
            <div className="md:col-span-2 pt-2">
              <button
                type="submit"
                className="inline-flex items-center gap-3 bg-forest px-8 py-4 text-xs font-bold uppercase tracking-[0.18em] text-ivory transition-colors hover:bg-forest-deep"
              >
                Send Inquiry
              </button>
              <p className="mt-4 text-xs text-muted-foreground">
                Sending opens your email app with your inquiry addressed to {SITE.email}.
              </p>
            </div>
          </form>
          <AnimatePresence>
            {sent && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="mt-8 flex items-start gap-3 bg-forest p-5 text-ivory rounded-sm"
              >
                <CheckCircle2 className="h-5 w-5 shrink-0 text-banana mt-0.5" />
                <p className="text-sm">
                  Thank you — your email client should now be open with your inquiry ready to send. You can also write to us directly at {SITE.email}.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </Reveal>
      </div>
    </section>
  );
}
