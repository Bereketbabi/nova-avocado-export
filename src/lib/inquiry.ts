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

export const RECIPIENT_EMAIL = process.env.INQUIRY_RECIPIENT_EMAIL || "berekethailay9734@gmail.com";
export const WEB3FORMS_ACCESS_KEY = process.env.WEB3FORMS_ACCESS_KEY || "bf77ad58-06a1-47b9-92b4-f0338fc80510";

// Builds an ultra-aesthetic, high-converting executive inquiry email for the export desk
function generateAestheticEmailHtml(data: InquiryInput, referenceId: string, timestamp: string): string {
  const formattedDateEAT = new Date(timestamp).toLocaleString("en-US", {
    timeZone: "Africa/Addis_Ababa",
    dateStyle: "full",
    timeStyle: "short",
  });
  const replySubject = encodeURIComponent(`Re: Avocado Export Supply Inquiry — ${data.company} [Ref ${referenceId}]`);
  const replyBody = encodeURIComponent(
    `Dear ${data.name},\n\nThank you for reaching out to Nova Wholesale Trade regarding wholesale avocado supply to ${data.country}.\n\n`
  );
  const cleanPhone = (data.phone || "").replace(/[^0-9+]/g, "");
  const waUrl = cleanPhone
    ? `https://wa.me/${cleanPhone.replace("+", "")}?text=${encodeURIComponent(
        `Hello ${data.name}, this is Nova Wholesale Trade following up on your avocado export inquiry (Ref #${referenceId}).`
      )}`
    : null;

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Avocado Export Inquiry — ${data.company}</title>
  <style>
    body {
      margin: 0;
      padding: 0;
      background-color: #F3EFE6;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
      color: #172B1E;
      -webkit-font-smoothing: antialiased;
    }
    .wrapper {
      width: 100%;
      table-layout: fixed;
      background-color: #F3EFE6;
      padding: 32px 12px;
    }
    .container {
      max-width: 620px;
      margin: 0 auto;
      background-color: #FFFFFF;
      border-radius: 12px;
      overflow: hidden;
      border: 1px solid #DFD9CB;
      box-shadow: 0 10px 30px rgba(15, 36, 23, 0.08);
    }
    /* Header */
    .header {
      background: linear-gradient(135deg, #0D2416 0%, #173822 60%, #1E462B 100%);
      padding: 36px 32px 30px;
      text-align: left;
      border-bottom: 3px solid #E6B94D;
      position: relative;
    }
    .brand-eyebrow {
      color: #E6B94D;
      font-size: 11px;
      font-weight: 700;
      letter-spacing: 0.22em;
      text-transform: uppercase;
      margin: 0 0 6px 0;
    }
    .brand-title {
      color: #FFFFFF;
      font-size: 24px;
      font-weight: 700;
      letter-spacing: -0.01em;
      margin: 0;
      font-family: Georgia, 'Times New Roman', serif;
    }
    .brand-subtitle {
      color: #D6E4D9;
      font-size: 13px;
      margin: 6px 0 0 0;
      letter-spacing: 0.02em;
    }
    .ref-pill {
      display: inline-block;
      margin-top: 18px;
      background: rgba(230, 185, 77, 0.16);
      border: 1px solid rgba(230, 185, 77, 0.5);
      color: #FCE699;
      font-size: 12px;
      font-family: 'SF Mono', Consolas, Monaco, monospace;
      font-weight: 600;
      padding: 5px 12px;
      border-radius: 20px;
      letter-spacing: 0.08em;
    }

    /* Hero Notice */
    .notice {
      background: #FAF7F0;
      border-bottom: 1px solid #ECE7DA;
      padding: 20px 32px;
    }
    .notice-title {
      font-size: 14px;
      font-weight: 700;
      color: #173822;
      margin: 0 0 4px 0;
      text-transform: uppercase;
      letter-spacing: 0.08em;
    }
    .notice-p {
      margin: 0;
      font-size: 14px;
      color: #4A5E50;
      line-height: 1.5;
    }

    /* Body */
    .body {
      padding: 32px;
    }

    /* Stat Cards */
    .stat-grid {
      width: 100%;
      margin-bottom: 28px;
      border-collapse: separate;
      border-spacing: 8px;
    }
    .stat-card {
      background: #F8F6EF;
      border: 1px solid #E5E0D2;
      border-radius: 8px;
      padding: 14px 16px;
      text-align: left;
      vertical-align: top;
      width: 33.33%;
    }
    .stat-label {
      font-size: 10px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.14em;
      color: #6C8271;
      margin: 0 0 4px 0;
    }
    .stat-value {
      font-size: 14px;
      font-weight: 700;
      color: #0D2416;
      margin: 0;
      line-height: 1.3;
    }

    /* Detail Table */
    .section-heading {
      font-size: 12px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.16em;
      color: #173822;
      border-bottom: 1px solid #DFD9CB;
      padding-bottom: 8px;
      margin: 0 0 16px 0;
    }
    .detail-table {
      width: 100%;
      border-collapse: collapse;
      margin-bottom: 26px;
    }
    .detail-table tr {
      border-bottom: 1px solid #F0ECE2;
    }
    .detail-table td {
      padding: 11px 8px;
      font-size: 14px;
      line-height: 1.5;
      vertical-align: top;
    }
    .detail-label {
      width: 34%;
      font-size: 11px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.1em;
      color: #556D5C;
    }
    .detail-value {
      color: #11281A;
      font-weight: 600;
    }
    .detail-value a {
      color: #173822;
      text-decoration: underline;
    }

    /* Message Quote Block */
    .message-block {
      background: #F7F5EE;
      border-left: 4px solid #E6B94D;
      border-radius: 0 8px 8px 0;
      padding: 18px 20px;
      margin-bottom: 30px;
    }
    .message-heading {
      font-size: 11px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.12em;
      color: #6C8271;
      margin: 0 0 8px 0;
    }
    .message-text {
      font-size: 14px;
      line-height: 1.65;
      color: #1A3022;
      margin: 0;
      font-style: italic;
      white-space: pre-wrap;
    }

    /* Action Buttons */
    .action-row {
      text-align: center;
      padding: 10px 0 16px;
    }
    .cta-button {
      display: inline-block;
      background: #0D2416;
      color: #FFFFFF !important;
      font-size: 13px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.12em;
      padding: 14px 26px;
      border-radius: 6px;
      text-decoration: none;
      box-shadow: 0 4px 12px rgba(13, 36, 22, 0.2);
      margin: 0 6px 8px 6px;
    }
    .cta-wa {
      display: inline-block;
      background: #25D366;
      color: #FFFFFF !important;
      font-size: 13px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.12em;
      padding: 14px 24px;
      border-radius: 6px;
      text-decoration: none;
      box-shadow: 0 4px 12px rgba(37, 211, 102, 0.25);
      margin: 0 6px 8px 6px;
    }

    /* Footer */
    .footer {
      background-color: #FAF8F2;
      border-top: 1px solid #E5E0D2;
      padding: 24px 32px;
      font-size: 12px;
      color: #7A8E7F;
      line-height: 1.6;
      text-align: center;
    }
    .footer strong {
      color: #173822;
    }
    .footer-stamp {
      display: inline-block;
      margin-top: 10px;
      padding: 4px 10px;
      background: #ECE8DC;
      border-radius: 4px;
      font-family: monospace;
      font-size: 11px;
      color: #4A5E50;
    }
  </style>
</head>
<body>
  <div class="wrapper">
    <div class="container">
      <!-- Executive Header -->
      <div class="header">
        <p class="brand-eyebrow">NOVA WHOLESALE TRADE • COMMERCIAL DISPATCH</p>
        <h1 class="brand-title">New Avocado Export Inquiry</h1>
        <p class="brand-subtitle">Wolaita Highlands Cold Chain Program • International Supply Desk</p>
        <span class="ref-pill">REFERENCE ID: #${referenceId}</span>
      </div>

      <!-- Quick Summary Alert -->
      <div class="notice">
        <p class="notice-title">Commercial Trade Lead Received</p>
        <p class="notice-p">
          <strong>${data.name}</strong> from <strong>${data.company}</strong> has requested an export quotation for <strong>${data.country}</strong>.
        </p>
      </div>

      <!-- Body Content -->
      <div class="body">
        <!-- 3 Highlight Metric Tiles -->
        <table class="stat-grid" role="presentation">
          <tr>
            <td class="stat-card">
              <p class="stat-label">Destination</p>
              <p class="stat-value">${data.country}</p>
            </td>
            <td class="stat-card">
              <p class="stat-label">Product</p>
              <p class="stat-value">${data.product || "Hass Avocado"}</p>
            </td>
            <td class="stat-card">
              <p class="stat-label">Volume Target</p>
              <p class="stat-value">${data.quantity || "1 x 40ft Reefer"}</p>
            </td>
          </tr>
        </table>

        <!-- Detailed Buyer Specifications -->
        <p class="section-heading">Buyer Commercial Specifications</p>
        <table class="detail-table" role="presentation">
          <tr>
            <td class="detail-label">Buyer Contact</td>
            <td class="detail-value"><strong>${data.name}</strong></td>
          </tr>
          <tr>
            <td class="detail-label">Company Name</td>
            <td class="detail-value"><strong>${data.company}</strong></td>
          </tr>
          <tr>
            <td class="detail-label">Direct Email</td>
            <td class="detail-value"><a href="mailto:${data.email}">${data.email}</a></td>
          </tr>
          <tr>
            <td class="detail-label">Phone / WhatsApp</td>
            <td class="detail-value">${data.phone || "Not provided in form"}</td>
          </tr>
          <tr>
            <td class="detail-label">Port / Country</td>
            <td class="detail-value"><strong>${data.country}</strong></td>
          </tr>
          <tr>
            <td class="detail-label">Requested Variety</td>
            <td class="detail-value">${data.product || "Export Grade Hass / Green-Skin"}</td>
          </tr>
          <tr>
            <td class="detail-label">Target Volume</td>
            <td class="detail-value">${data.quantity || "1 x 40ft Reefer Container (21-23 MT)"}</td>
          </tr>
        </table>

        <!-- Inset Buyer Message Quote -->
        <div class="message-block">
          <p class="message-heading">Buyer Note & Quality Requirements:</p>
          <p class="message-text">&ldquo;${data.message}&rdquo;</p>
        </div>

        <!-- Quick Action Reply Buttons -->
        <div class="action-row">
          <a class="cta-button" href="mailto:${data.email}?subject=${replySubject}&body=${replyBody}">
            ✉️ Reply to ${data.name} (${data.company})
          </a>
          ${
            waUrl
              ? `<a class="cta-wa" href="${waUrl}" target="_blank" rel="noreferrer">
                  💬 Chat on WhatsApp
                </a>`
              : ""
          }
        </div>
      </div>

      <!-- Verified Logistics Footer -->
      <div class="footer">
        <p style="margin: 0 0 6px 0;">
          <strong>Nova Wholesale Trade Avocado Export Operations</strong><br/>
          Sourcing: Wolaita Highlands (1,800m - 2,200m ASL) | Hub: Mojo Dry Port / Addis Ababa Bole Air Cargo
        </p>
        <p style="margin: 0;">
          Controlled Atmosphere Reefer Cold Chain (+4.5°C to +5.5°C) • GlobalG.A.P. Standard Packhouse Grading
        </p>
        <span class="footer-stamp">Received: ${formattedDateEAT} (EAT)</span>
      </div>
    </div>
  </div>
</body>
</html>
  `.trim();
}

export const submitInquiryFn = createServerFn({ method: "POST" })
  .validator((d: unknown) => inquirySchema.parse(d))
  .handler(async ({ data }) => {
    const timestamp = new Date().toISOString();
    const referenceId = `NV-${Math.floor(100000 + Math.random() * 900000)}`;
    const targetEmail = RECIPIENT_EMAIL;

    const emailHtml = generateAestheticEmailHtml(data, referenceId, timestamp);
    const emailSubject = `🥑 Avocado Supply Inquiry: ${data.company} (${data.country}) — Ref #${referenceId}`;

    // 1. Primary: Resend API (High deliverability transactional email)
    const resendApiKey = process.env.RESEND_API_KEY;
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
            to: [targetEmail],
            reply_to: data.email,
            subject: emailSubject,
            html: emailHtml,
          }),
        });

        if (res.ok) {
          const resData = await res.json().catch(() => ({}));
          console.log(`[Inquiry] Successfully dispatched to ${targetEmail} via Resend. Ref: ${referenceId}`, resData);
          return {
            success: true,
            method: "resend",
            referenceId,
            recipient: targetEmail,
            message: `Inquiry successfully delivered to ${targetEmail}`,
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
    const formspreeEndpoint = process.env.FORMSPREE_ENDPOINT;
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
            targetEmail,
          }),
        });
        if (res.ok) {
          console.log(`[Inquiry] Successfully dispatched to ${targetEmail} via Formspree webhook.`);
          return {
            success: true,
            method: "formspree",
            referenceId,
            recipient: targetEmail,
            message: `Inquiry successfully delivered to ${targetEmail}`,
          };
        }
      } catch (err) {
        console.error("[Inquiry] Error calling Formspree:", err);
      }
    }

    // 3. Fallback: Secure Server Log
    console.log(`[INQUIRY_RECEIVED_PENDING_API_KEY] Ref #${referenceId} to ${targetEmail}:`, {
      timestamp,
      recipient: targetEmail,
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
      recipient: targetEmail,
      message: `Inquiry recorded for ${targetEmail}.`,
    };
  });
