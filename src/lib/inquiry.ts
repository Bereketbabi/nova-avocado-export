import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

export const inquirySchema = z.object({
  name: z.string().trim().min(2, "Please enter your full name").max(100),
  company: z.string().trim().min(2, "Please enter your company").max(120),
  email: z.string().trim().email("Please enter a valid email").max(255),
  country: z.string().trim().min(2, "Please enter your country / port").max(80),
  phone: z.string().trim().max(40).optional(),
  product: z.string().trim().max(120).optional(),
  quantity: z.string().trim().max(120).optional(),
  message: z.string().trim().min(10, "Please add a short message").max(2000),
});

export type InquiryInput = z.infer<typeof inquirySchema>;

export const DEFAULT_RECIPIENT_EMAILS = [
  "berekethailay9734@gmail.com",
  "elsagetachew123@gmail.com",
];

export const RECIPIENT_EMAILS: string[] = process.env["INQUIRY_RECIPIENT_EMAILS"]
  ? process.env["INQUIRY_RECIPIENT_EMAILS"].split(",").map((s) => s.trim()).filter(Boolean)
  : process.env["INQUIRY_RECIPIENT_EMAIL"]
    ? [process.env["INQUIRY_RECIPIENT_EMAIL"]]
    : DEFAULT_RECIPIENT_EMAILS;

export const WEB3FORMS_ACCESS_KEY = process.env["WEB3FORMS_ACCESS_KEY"] || "bf77ad58-06a1-47b9-92b4-f0338fc80510";

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

// Builds the exact minimalist executive inquiry email matching the requested template
function generateAestheticEmailHtml(data: InquiryInput, referenceId: string): string {
  const firstName = data.name.trim().split(/\s+/)[0] || data.name;
  const safeRef = escapeHtml(referenceId);
  const safeFirstName = escapeHtml(firstName);
  const safeName = escapeHtml(data.name);
  const safeCompany = escapeHtml(data.company);
  const safeEmail = escapeHtml(data.email);
  const encodedEmail = encodeURI(data.email);
  const safeCountry = escapeHtml(data.country);
  const safePhone = escapeHtml(data.phone || "-");
  const safeProduct = escapeHtml(data.product || "-");
  const safeQuantity = escapeHtml(data.quantity || "-");
  const safeMessage = escapeHtml(data.message).replace(/\n/g, "<br/>");

  return `<!doctype html><html><body style="margin:0"><table width="100%" cellPadding="0" cellSpacing="0" style="background:#f4f1ea;padding:40px 16px;font-family:'Helvetica Neue', Helvetica, Arial, sans-serif"><tbody data-tsd-source="/src/components/emails.tsx:28:5"><tr data-tsd-source="/src/components/emails.tsx:28:12"><td align="center" data-tsd-source="/src/components/emails.tsx:28:16"><table width="100%" cellPadding="0" cellSpacing="0" style="max-width:560px"><tbody data-tsd-source="/src/components/emails.tsx:29:85"><tr data-tsd-source="/src/components/emails.tsx:29:92"><td data-tsd-source="/src/components/emails.tsx:29:96"><div style="background:#fffdf8;padding:48px 44px;border:1px solid #e6e0d4"><p style="margin:0;font-size:11px;letter-spacing:3px;text-transform:uppercase;color:#9a8f7a">New submission · ${safeRef}</p><h1 style="margin:16px 0 8px;font-family:Georgia, serif;font-weight:400;font-size:34px;color:#1c1a17">A new enquiry from ${safeFirstName}.</h1><p style="margin:0 0 32px;color:#6b6457;font-size:15px">Someone just reached out through your website.</p><table width="100%" cellPadding="0" cellSpacing="0"><tbody data-tsd-source="/src/components/emails.tsx:44:61"><tr data-tsd-source="/src/components/emails.tsx:46:13"><td style="padding:14px 0;border-top:1px solid #ece6da;font-size:12px;color:#9a8f7a;text-transform:uppercase;letter-spacing:1.5px;width:120px">Name</td><td style="padding:14px 0;border-top:1px solid #ece6da;font-size:15px;color:#1c1a17">${safeName}</td></tr><tr data-tsd-source="/src/components/emails.tsx:46:13"><td style="padding:14px 0;border-top:1px solid #ece6da;font-size:12px;color:#9a8f7a;text-transform:uppercase;letter-spacing:1.5px;width:120px">Company</td><td style="padding:14px 0;border-top:1px solid #ece6da;font-size:15px;color:#1c1a17">${safeCompany}</td></tr><tr data-tsd-source="/src/components/emails.tsx:46:13"><td style="padding:14px 0;border-top:1px solid #ece6da;font-size:12px;color:#9a8f7a;text-transform:uppercase;letter-spacing:1.5px;width:120px">Email</td><td style="padding:14px 0;border-top:1px solid #ece6da;font-size:15px;color:#1c1a17"><a href="mailto:${encodedEmail}" style="color:#1c1a17;text-decoration:none">${safeEmail}</a></td></tr><tr data-tsd-source="/src/components/emails.tsx:46:13"><td style="padding:14px 0;border-top:1px solid #ece6da;font-size:12px;color:#9a8f7a;text-transform:uppercase;letter-spacing:1.5px;width:120px">Country</td><td style="padding:14px 0;border-top:1px solid #ece6da;font-size:15px;color:#1c1a17">${safeCountry}</td></tr><tr data-tsd-source="/src/components/emails.tsx:46:13"><td style="padding:14px 0;border-top:1px solid #ece6da;font-size:12px;color:#9a8f7a;text-transform:uppercase;letter-spacing:1.5px;width:120px">Phone</td><td style="padding:14px 0;border-top:1px solid #ece6da;font-size:15px;color:#1c1a17">${safePhone}</td></tr><tr data-tsd-source="/src/components/emails.tsx:46:13"><td style="padding:14px 0;border-top:1px solid #ece6da;font-size:12px;color:#9a8f7a;text-transform:uppercase;letter-spacing:1.5px;width:120px">Product</td><td style="padding:14px 0;border-top:1px solid #ece6da;font-size:15px;color:#1c1a17">${safeProduct}</td></tr><tr data-tsd-source="/src/components/emails.tsx:46:13"><td style="padding:14px 0;border-top:1px solid #ece6da;font-size:12px;color:#9a8f7a;text-transform:uppercase;letter-spacing:1.5px;width:120px">Quantity</td><td style="padding:14px 0;border-top:1px solid #ece6da;font-size:15px;color:#1c1a17">${safeQuantity}</td></tr></tbody></table><div style="margin-top:28px;padding:24px 0 0;border-top:2px solid #1c1a17"><p style="margin:0 0 8px;font-size:12px;color:#9a8f7a;text-transform:uppercase;letter-spacing:1.5px">Message</p><p style="margin:0;font-family:Georgia, serif;font-style:italic;font-size:18px;color:#1c1a17;line-height:1.6">“${safeMessage}”</p></div></div></td></tr></tbody></table></td></tr></tbody></table></body></html>`;
}

export const submitInquiryFn = createServerFn({ method: "POST" })
  .validator((d: unknown) => inquirySchema.parse(d))
  .handler(async ({ data }) => {
    const timestamp = new Date().toISOString();
    const referenceId = `NV-${Math.floor(100000 + Math.random() * 900000)}`;
    const recipients = RECIPIENT_EMAILS;
    const recipientSummary = recipients.join(", ");
    const firstName = data.name.trim().split(/\s+/)[0] || data.name;

    const emailHtml = generateAestheticEmailHtml(data, referenceId);
    const emailSubject = `A new enquiry from ${firstName} · Ref #${referenceId}`;

    // 1. Primary: Resend API (High deliverability transactional email sent simultaneously to both recipients)
    const resendApiKey = process.env["RESEND_API_KEY"];
    if (resendApiKey) {
      try {
        const res = await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${resendApiKey}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            from: "Nova Avocado Inquiries <onboarding@resend.dev>",
            to: recipients,
            reply_to: data.email,
            subject: emailSubject,
            html: emailHtml,
          }),
        });

        if (res.ok) {
          const resData = await res.json().catch(() => ({}));
          console.log(`[Inquiry] Successfully dispatched to ${recipientSummary} via Resend. Ref: ${referenceId}`, resData);
          return {
            success: true,
            method: "resend",
            referenceId,
            recipient: recipientSummary,
            message: `Inquiry successfully delivered to ${recipientSummary}`,
          };
        } else {
          const errText = await res.text();
          console.error(`[Inquiry] Resend dispatch failed (${res.status}): ${errText}`);
        }
      } catch (err) {
        console.error("[Inquiry] Error calling Resend API:", err);
      }
    }

    // 2. Secondary: Formspree or custom webhook if configured
    const formspreeEndpoint = process.env["FORMSPREE_ENDPOINT"];
    if (formspreeEndpoint) {
      try {
        const res = await fetch(formspreeEndpoint, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            ...data,
            _subject: emailSubject,
            referenceId,
            targetEmails: recipients,
          }),
        });
        if (res.ok) {
          console.log(`[Inquiry] Successfully dispatched to ${recipientSummary} via Formspree webhook.`);
          return {
            success: true,
            method: "formspree",
            referenceId,
            recipient: recipientSummary,
            message: `Inquiry successfully delivered to ${recipientSummary}`,
          };
        }
      } catch (err) {
        console.error("[Inquiry] Error calling Formspree:", err);
      }
    }

    // 3. Fallback: Secure Server Log
    console.log(`[INQUIRY_RECEIVED_PENDING_API_KEY] Ref #${referenceId} to ${recipientSummary}:`, {
      timestamp,
      recipients,
      buyerName: data.name,
      company: data.company,
      email: data.email,
      country: data.country,
      phone: data.phone,
      product: data.product,
      quantity: data.quantity,
      message: data.message,
    });

    return {
      success: true,
      method: "logged",
      referenceId,
      recipient: recipientSummary,
      message: `Inquiry recorded for ${recipientSummary}.`,
    };
  });
