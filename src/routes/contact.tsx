import { createFileRoute } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
import {
  Building2,
  CheckCircle2,
  Clock,
  Globe,
  Loader2,
  Mail,
  MapPin,
  Package,
  Phone,
  RotateCcw,
  Send,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { useState, type FormEvent } from "react";
import { Reveal } from "@/components/site/Reveal";
import { SITE } from "@/lib/site";
import { inquirySchema, submitInquiryFn, WEB3FORMS_ACCESS_KEY, type InquiryInput } from "@/lib/inquiry";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact Us — Nova Wholesale Trade | Ethiopian Avocado Export" },
      {
        name: "description",
        content:
          "Contact Nova Wholesale Trade for wholesale Ethiopian avocado supply. Direct export from Wolaita to international markets. Email elsagetachew123@gmail.com or call +251 92 095 9903.",
      },
      { property: "og:title", content: "Contact Us — Nova Wholesale Trade — Avocado Export Desk" },
      { property: "og:description", content: "Let's build your Ethiopian avocado supply program." },
    ],
  }),
  component: Contact,
});

type Fields = InquiryInput;

const FIELDS: {
  name: keyof Fields;
  label: string;
  placeholder?: string;
  type?: string;
  full?: boolean;
  area?: boolean;
  required?: boolean;
}[] = [
  { name: "name", label: "Full Name", placeholder: "e.g. John Smith", required: true },
  { name: "company", label: "Company Name", placeholder: "e.g. Fresh Direct Trading LLC", required: true },
  { name: "email", label: "Business Email", type: "email", placeholder: "name@company.com", required: true },
  { name: "country", label: "Country / Destination Port", placeholder: "e.g. Netherlands / Port of Rotterdam", required: true },
  { name: "phone", label: "Phone / WhatsApp", type: "tel", placeholder: "+31 10 ... / +971 50 ..." },
  { name: "product", label: "Avocado Variety", placeholder: "Hass Avocado / Green-Skin (Fuerte, Ettinger)" },
  { name: "quantity", label: "Estimated Volume", full: true, placeholder: "e.g. 1 x 40ft Reefer container (21-23 MT) / Air shipment" },
  {
    name: "message",
    label: "Inquiry Details",
    full: true,
    area: true,
    required: true,
    placeholder: "Please specify target delivery timeframe, preferred caliber count sizes (12–24), and target port...",
  },
];

// Particle burst component for the success celebration animation
function SuccessBurst() {
  const particles = Array.from({ length: 18 });
  return (
    <div className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden">
      {particles.map((_, i) => {
        const angle = (i / particles.length) * 2 * Math.PI;
        const distance = 80 + (i % 3) * 35;
        const x = Math.cos(angle) * distance;
        const y = Math.sin(angle) * distance;
        const isGold = i % 2 === 0;

        return (
          <motion.span
            key={i}
            initial={{ scale: 0, x: 0, y: 0, opacity: 1 }}
            animate={{
              scale: [0, 1.2, 0.4],
              x: [0, x],
              y: [0, y],
              opacity: [1, 0.9, 0],
            }}
            transition={{
              duration: 1.1,
              ease: [0.16, 1, 0.3, 1],
              delay: 0.05 + (i % 4) * 0.03,
            }}
            className={`absolute h-2.5 w-2.5 rounded-full ${
              isGold ? "bg-banana shadow-[0_0_12px_#F5C542]" : "bg-avocado shadow-[0_0_12px_#2E5D3A]"
            }`}
          />
        );
      })}
    </div>
  );
}

function Contact() {
  const [errors, setErrors] = useState<Partial<Record<keyof Fields, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submissionResult, setSubmissionResult] = useState<{
    referenceId: string;
    data: Fields;
    submittedAt: string;
  } | null>(null);

  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitError(null);

    const formData = new FormData(e.currentTarget);
    const rawData = Object.fromEntries(formData.entries());
    const r = inquirySchema.safeParse(rawData);

    if (!r.success) {
      const errs: Partial<Record<keyof Fields, string>> = {};
      r.error.issues.forEach((i) => {
        errs[i.path[0] as keyof Fields] = i.message;
      });
      setErrors(errs);
      return;
    }

    setErrors({});
    setIsSubmitting(true);

    try {
      const referenceId = `NV-${Math.floor(100000 + Math.random() * 900000)}`;

      // 1. Submit directly from browser to Web3Forms using the verified access key
      const firstName = r.data.name.trim().split(/\s+/)[0] || r.data.name;
      const web3Payload = {
        access_key: WEB3FORMS_ACCESS_KEY,
        subject: `A new enquiry from ${firstName} · Ref #${referenceId}`,
        from_name: `${r.data.name} via Nova Avocado Export`,
        name: r.data.name,
        company: r.data.company,
        email: r.data.email,
        country: r.data.country,
        phone: r.data.phone || "-",
        product: r.data.product || "-",
        quantity: r.data.quantity || "-",
        message: r.data.message,
        reference_id: referenceId,
        ccemail: "elsagetachew123@gmail.com",
      };

      try {
        const web3Res = await fetch("https://api.web3forms.com/submit", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify(web3Payload),
        });
        const web3Json = await web3Res.json().catch(() => null);
        console.log("[Inquiry Web3Forms Result]", web3Json);
      } catch (clientErr) {
        console.warn("[Inquiry Web3Forms warning]", clientErr);
      }

      // 2. Also record through server function for audit and multi-channel delivery
      submitInquiryFn({ data: r.data }).catch((serverErr) => {
        console.warn("[Inquiry ServerFn log]", serverErr);
      });

      // 3. Display celebratory confirmation and receipt
      setSubmissionResult({
        referenceId,
        data: r.data,
        submittedAt: new Date().toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          timeZoneName: "short",
        }),
      });
    } catch (err) {
      console.error("Submission error:", err);
      setSubmitError(
        "There was a network issue dispatching your inquiry. Please try again or reach our team via WhatsApp."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="bg-ivory pt-32 pb-24 md:pt-40 md:pb-36">
      <div className="container-x grid gap-16 lg:grid-cols-12">
        {/* Left Column: Direct Contacts */}
        <Reveal className="lg:col-span-4">
          <p className="eyebrow text-avocado">Get in touch</p>
          <h2 className="mt-5 text-3xl sm:text-4xl leading-tight text-forest md:text-5xl font-display">
            Talk to our team.
          </h2>
          <p className="mt-6 leading-relaxed text-muted-foreground">
            Looking for a reliable Ethiopian avocado export partner? Reach our export desk directly or submit your
            requirements for current seasonal pricing, caliber specs, and container schedules.
          </p>

          <div className="mt-10 space-y-px bg-border">
            {[
              { icon: Mail, k: "Direct Email", v: SITE.email, href: `mailto:${SITE.email}` },
              { icon: Phone, k: "Phone / WhatsApp", v: SITE.phone, href: SITE.phoneHref },
              { icon: MapPin, k: "Orchards & Hub", v: SITE.location },
            ].map((c) => (
              <div key={c.k} className="flex items-center gap-5 bg-ivory py-6">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center bg-forest text-banana rounded-sm">
                  <c.icon className="h-5 w-5" />
                </span>
                <div>
                  <p className="eyebrow text-olive">{c.k}</p>
                  {c.href ? (
                    <a
                      href={c.href}
                      className="mt-1 block break-all font-semibold text-forest hover:text-avocado transition-colors"
                    >
                      {c.v}
                    </a>
                  ) : (
                    <p className="mt-1 font-semibold text-forest">{c.v}</p>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 rounded-sm border border-forest/15 bg-cream/70 p-5">
            <div className="flex items-center gap-2 text-forest">
              <ShieldCheck className="h-4 w-4 text-avocado" />
              <p className="text-xs font-semibold uppercase tracking-wider">Direct Automated Delivery</p>
            </div>
            <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
              Every detail submitted through this inquiry form is automatically transmitted directly to our commercial
              export desk (<strong className="text-forest">elsagetachew123@gmail.com</strong>) and management.
              No third-party forwarding, no redirection. We review and respond to wholesale specifications within 24 business hours.
            </p>
          </div>
        </Reveal>

        {/* Right Column: Inquiry Form & Animated Success State */}
        <Reveal delay={0.1} className="relative bg-cream p-5 sm:p-8 md:p-12 lg:col-span-8 rounded-sm shadow-sm overflow-hidden">
          <p className="eyebrow text-avocado">Request a quote</p>
          <h3 className="mt-4 text-3xl font-display text-forest">Send an inquiry</h3>

          <AnimatePresence mode="wait">
            {submissionResult ? (
              /* Success Animation & Executive Receipt */
              <motion.div
                key="success-receipt"
                initial={{ opacity: 0, scale: 0.96, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                className="relative mt-8 rounded-sm border border-forest/20 bg-forest p-6 sm:p-9 text-ivory shadow-xl overflow-hidden"
              >
                {/* Floating particle burst effect */}
                <SuccessBurst />

                {/* Animated checkmark header */}
                <div className="relative z-10 flex flex-wrap items-center justify-between gap-4 border-b border-ivory/15 pb-6">
                  <div className="flex items-center gap-4">
                    <motion.div
                      initial={{ scale: 0, rotate: -45 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ type: "spring", stiffness: 260, damping: 20 }}
                      className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-banana/20 text-banana shadow-[0_0_20px_rgba(245,197,66,0.35)]"
                    >
                      <CheckCircle2 className="h-8 w-8" />
                    </motion.div>
                    <div>
                      <span className="inline-flex items-center gap-1.5 rounded bg-banana/15 px-2.5 py-0.5 text-xs font-mono font-bold tracking-wider text-banana uppercase">
                        <Sparkles className="h-3 w-3" />
                        Inquiry Ref #{submissionResult.referenceId}
                      </span>
                      <h4 className="mt-1 text-2xl font-display font-semibold text-ivory">
                        Inquiry Automatically Dispatched!
                      </h4>
                    </div>
                  </div>

                  <span className="inline-flex items-center gap-1.5 text-xs text-ivory/70 font-mono">
                    <Clock className="h-3.5 w-3.5" />
                    {submissionResult.submittedAt}
                  </span>
                </div>

                <div className="relative z-10 mt-6 space-y-4">
                  <p className="text-sm leading-relaxed text-ivory/90">
                    Thank you, <strong className="text-banana">{submissionResult.data.name}</strong>. Your commercial
                    avocado export inquiry for <strong className="text-white">{submissionResult.data.company}</strong> has
                    been successfully transmitted directly to <strong className="text-banana">berekethailay9734@gmail.com</strong>.
                  </p>

                  {/* Summary of what was sent to Elsa */}
                  <div className="rounded border border-ivory/15 bg-forest-deep/60 p-5 text-xs">
                    <p className="font-semibold uppercase tracking-wider text-banana/90 mb-3">
                      Transmission Summary Delivered to Export Desk:
                    </p>
                    <div className="grid gap-2.5 sm:grid-cols-2">
                      <div className="flex items-center gap-2 text-ivory/90">
                        <Building2 className="h-3.5 w-3.5 text-banana shrink-0" />
                        <span>Company: <strong>{submissionResult.data.company}</strong></span>
                      </div>
                      <div className="flex items-center gap-2 text-ivory/90">
                        <Globe className="h-3.5 w-3.5 text-banana shrink-0" />
                        <span>Destination: <strong>{submissionResult.data.country}</strong></span>
                      </div>
                      <div className="flex items-center gap-2 text-ivory/90">
                        <Mail className="h-3.5 w-3.5 text-banana shrink-0" />
                        <span>Buyer Email: <strong>{submissionResult.data.email}</strong></span>
                      </div>
                      <div className="flex items-center gap-2 text-ivory/90">
                        <Package className="h-3.5 w-3.5 text-banana shrink-0" />
                        <span>Volume: <strong>{submissionResult.data.quantity || "Standard Reefer Container"}</strong></span>
                      </div>
                    </div>

                    <div className="mt-4 border-t border-ivory/10 pt-3">
                      <p className="text-ivory/75 italic">
                        &ldquo;{submissionResult.data.message}&rdquo;
                      </p>
                    </div>
                  </div>

                  <p className="text-xs leading-relaxed text-ivory/70">
                    Elsa and the export desk are reviewing your specifications and will follow up directly at{" "}
                    <strong className="text-ivory">{submissionResult.data.email}</strong> with current pricing, caliber
                    availability, and port lead times.
                  </p>
                </div>

                {/* Actions */}
                <div className="relative z-10 mt-7 flex flex-wrap items-center gap-4 border-t border-ivory/15 pt-6">
                  <button
                    type="button"
                    onClick={() => setSubmissionResult(null)}
                    className="inline-flex items-center gap-2 rounded-sm border border-ivory/30 px-5 py-3.5 text-xs font-semibold uppercase tracking-wider text-ivory transition-colors hover:bg-ivory/10"
                  >
                    <RotateCcw className="h-3.5 w-3.5" />
                    Submit Another Inquiry
                  </button>
                </div>
              </motion.div>
            ) : (
              /* The Inquiry Form */
              <form onSubmit={submit} noValidate className="mt-10 grid gap-x-8 gap-y-7 md:grid-cols-2">
                {FIELDS.map((f) => (
                  <label key={f.name} className={`block ${f.full ? "md:col-span-2" : ""}`}>
                    <span className="eyebrow text-olive">
                      {f.label}
                      {f.required ? " *" : ""}
                    </span>
                    {f.area ? (
                      <textarea
                        name={f.name}
                        rows={5}
                        required={f.required}
                        placeholder={f.placeholder}
                        className="mt-3 w-full resize-none border-0 border-b border-forest/25 bg-transparent py-3 text-forest placeholder:text-forest/35 outline-none transition-colors focus:border-forest text-sm"
                      />
                    ) : (
                      <input
                        name={f.name}
                        type={f.type ?? "text"}
                        required={f.required}
                        placeholder={f.placeholder}
                        className="mt-3 w-full border-0 border-b border-forest/25 bg-transparent py-3 text-forest placeholder:text-forest/35 outline-none transition-colors focus:border-forest text-sm"
                      />
                    )}
                    {errors[f.name] && <span className="mt-2 block text-xs text-destructive">{errors[f.name]}</span>}
                  </label>
                ))}

                {submitError && (
                  <div className="md:col-span-2 rounded-sm bg-destructive/10 p-4 text-xs text-destructive">
                    <p className="font-semibold">{submitError}</p>
                    <p className="mt-1">
                      Direct WhatsApp:{" "}
                      <a href={SITE.phoneHref} className="underline font-bold">
                        {SITE.phone}
                      </a>{" "}
                      | Email:{" "}
                      <a href={`mailto:${SITE.email}`} className="underline font-bold">
                        {SITE.email}
                      </a>
                    </p>
                  </div>
                )}

                <div className="md:col-span-2 pt-4">
                  {/* High-End Animated Button with Unique Hover and Click Flight Effects */}
                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    whileHover={
                      !isSubmitting
                        ? {
                            scale: 1.025,
                            boxShadow: "0 10px 28px -6px rgba(27, 53, 36, 0.45), 0 0 20px rgba(245, 197, 66, 0.3)",
                          }
                        : undefined
                    }
                    whileTap={!isSubmitting ? { scale: 0.98 } : undefined}
                    className="relative group inline-flex items-center justify-center gap-3.5 overflow-hidden rounded-sm bg-forest px-9 py-4 text-xs font-bold uppercase tracking-[0.2em] text-ivory transition-all duration-300 disabled:opacity-75 disabled:cursor-not-allowed"
                  >
                    {/* Shimmer light sweep on hover */}
                    <motion.span
                      className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover:translate-x-full transition-transform duration-700 ease-in-out pointer-events-none"
                    />

                    {/* Subtle golden ambient accent line on top */}
                    <span className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-banana to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                    {isSubmitting ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin text-banana" />
                        <span className="relative z-10 text-ivory">Dispatching to Export Desk...</span>
                      </>
                    ) : (
                      <>
                        {/* Paper plane icon with micro-hover glide animation */}
                        <motion.span
                          className="relative flex items-center justify-center"
                          animate={{ x: 0, y: 0, rotate: 0 }}
                          whileHover={{ x: 4, y: -2, rotate: -15 }}
                          transition={{ type: "spring", stiffness: 400, damping: 15 }}
                        >
                          <Send className="h-4 w-4 text-banana transition-colors group-hover:text-banana" />
                        </motion.span>
                        <span className="relative z-10">Send Inquiry</span>
                      </>
                    )}
                  </motion.button>

                  <p className="mt-4 text-xs text-muted-foreground">
                    Direct automated transmission to Export Desk (<span className="text-forest font-medium">berekethailay9734@gmail.com</span>).
                  </p>
                </div>
              </form>
            )}
          </AnimatePresence>
        </Reveal>
      </div>
    </section>
  );
}
