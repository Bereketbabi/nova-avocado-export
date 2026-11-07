import { createFileRoute } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, Loader2, Mail, MapPin, MessageSquare, Phone, Send } from "lucide-react";
import { useState, type FormEvent } from "react";
import { Reveal } from "@/components/site/Reveal";
import { SITE } from "@/lib/site";
import { inquirySchema, submitInquiryFn, type InquiryInput } from "@/lib/inquiry";

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

type Fields = InquiryInput;

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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionResult, setSubmissionResult] = useState<{
    referenceId: string;
    name: string;
    company: string;
    email: string;
  } | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitError(null);

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());
    const r = inquirySchema.safeParse(data);

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
      const res = await submitInquiryFn({ data: r.data });
      if (res.success) {
        setSubmissionResult({
          referenceId: res.referenceId,
          name: r.data.name,
          company: r.data.company,
          email: r.data.email,
        });
        e.currentTarget.reset();
      } else {
        throw new Error(res.message || "Failed to submit inquiry.");
      }
    } catch (err) {
      console.error("Submission error:", err);
      setSubmitError("There was an issue dispatching your inquiry. Please try again or reach our export desk directly.");
    } finally {
      setIsSubmitting(false);
    }
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
              { icon: Phone, k: "Phone / WhatsApp", v: SITE.phone, href: SITE.phoneHref },
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

          <div className="mt-8 rounded-sm border border-forest/15 bg-cream/70 p-5">
            <p className="text-xs font-semibold uppercase tracking-wider text-forest">Export Response Guarantee</p>
            <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
              All commercial inquiries sent through this portal are delivered directly to Elsa Getachew (<strong className="text-forest">{SITE.email}</strong>). We respond to wholesale specifications within 24 business hours.
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.1} className="bg-cream p-5 sm:p-8 md:p-12 lg:col-span-8 rounded-sm shadow-sm">
          <p className="eyebrow text-avocado">Request a quote</p>
          <h3 className="mt-4 text-3xl font-display text-forest">Send an inquiry</h3>

          <AnimatePresence mode="wait">
            {submissionResult ? (
              <motion.div
                key="success-card"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                className="mt-8 rounded-sm border border-forest/20 bg-forest p-6 sm:p-8 text-ivory shadow-md"
              >
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-banana/20 text-banana">
                    <CheckCircle2 className="h-6 w-6" />
                  </span>
                  <div>
                    <span className="inline-block rounded bg-banana/15 px-2.5 py-0.5 text-xs font-mono font-semibold tracking-wider text-banana uppercase">
                      Reference #{submissionResult.referenceId}
                    </span>
                    <h4 className="mt-1 text-xl font-display font-semibold text-ivory">
                      Inquiry Dispatched Successfully!
                    </h4>
                  </div>
                </div>

                <p className="mt-5 text-sm leading-relaxed text-ivory/90">
                  Thank you, <strong className="text-banana">{submissionResult.name}</strong> from <strong className="text-white">{submissionResult.company}</strong>. Your avocado export inquiry has been automatically transmitted to our lead export officer at <strong className="text-banana">{SITE.email}</strong>.
                </p>

                <p className="mt-3 text-xs leading-relaxed text-ivory/70">
                  A comprehensive quotation including current season pricing, FOB Mojo / CIF port rates, and caliber availability (12–24 count) will be sent to <strong className="text-ivory">{submissionResult.email}</strong> within 24 hours.
                </p>

                <div className="mt-7 flex flex-wrap items-center gap-4 border-t border-ivory/15 pt-6">
                  <a
                    href={`https://wa.me/251920959903?text=${encodeURIComponent(
                      `Hello Elsa, I just submitted an avocado export inquiry for ${submissionResult.company} (Ref #${submissionResult.referenceId}).`
                    )}`}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2.5 rounded-sm bg-banana px-5 py-3 text-xs font-bold uppercase tracking-wider text-forest transition-colors hover:bg-banana/90"
                  >
                    <MessageSquare className="h-4 w-4" />
                    Instant WhatsApp Follow-up
                  </a>

                  <button
                    type="button"
                    onClick={() => setSubmissionResult(null)}
                    className="inline-flex items-center gap-2 rounded-sm border border-ivory/30 px-5 py-3 text-xs font-semibold uppercase tracking-wider text-ivory transition-colors hover:bg-ivory/10"
                  >
                    Submit Another Inquiry
                  </button>
                </div>
              </motion.div>
            ) : (
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
                        required={!["phone", "product", "quantity"].includes(f.name)}
                        placeholder={f.placeholder}
                        className="mt-3 w-full resize-none border-0 border-b border-forest/25 bg-transparent py-3 text-forest placeholder:text-forest/35 outline-none transition-colors focus:border-forest text-sm"
                      />
                    ) : (
                      <input
                        name={f.name}
                        type={f.type ?? "text"}
                        required={!["phone", "product", "quantity"].includes(f.name)}
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
                      You can also send your request directly to <a href={`mailto:${SITE.email}`} className="underline font-bold">{SITE.email}</a> or via WhatsApp at <a href={SITE.phoneHref} className="underline font-bold">{SITE.phone}</a>.
                    </p>
                  </div>
                )}

                <div className="md:col-span-2 pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="inline-flex items-center gap-3 bg-forest px-8 py-4 text-xs font-bold uppercase tracking-[0.18em] text-ivory transition-colors hover:bg-forest-deep disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Transmitting Inquiry...
                      </>
                    ) : (
                      <>
                        <Send className="h-4 w-4" />
                        Send Inquiry
                      </>
                    )}
                  </button>
                  <p className="mt-4 text-xs text-muted-foreground">
                    Direct automated dispatch to Elsa Getachew (<span className="text-forest font-medium">{SITE.email}</span>).
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
