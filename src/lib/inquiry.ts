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

export const submitInquiryFn = createServerFn({ method: "POST" })
  .validator((d: unknown) => inquirySchema.parse(d))
  .handler(async ({ data }) => {
    const timestamp = new Date().toISOString();
    const referenceId = `NV-${Math.floor(100000 + Math.random() * 900000)}`;

    const targetEmail = "elsagetachew123@gmail.com";

    // 1. Try Resend if configured
    const resendApiKey = process.env.RESEND_API_KEY;
    if (resendApiKey) {
      try {
        const emailHtml = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: 'Helvetica Neue', Arial, sans-serif; background-color: #F8F7F2; margin: 0; padding: 24px; color: #1B3524; }
    .card { max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 8px; border: 1px solid #E3DFD4; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.05); }
    .header { background: #1B3524; color: #F5C542; padding: 24px; }
    .header h1 { margin: 0; font-size: 20px; font-weight: 700; letter-spacing: 0.05em; text-transform: uppercase; }
    .header p { margin: 6px 0 0; font-size: 13px; color: #E8EDE9; }
    .content { padding: 28px; }
    .ref-badge { display: inline-block; background: #E8EDE9; color: #1B3524; padding: 4px 10px; border-radius: 4px; font-weight: 600; font-size: 12px; margin-bottom: 20px; }
    table { width: 100%; border-collapse: collapse; margin-top: 12px; }
    td { padding: 10px 12px; border-bottom: 1px solid #F0EEE6; font-size: 14px; vertical-align: top; }
    td.label { width: 35%; font-weight: 600; color: #4A6B53; text-transform: uppercase; font-size: 11px; letter-spacing: 0.08em; }
    td.val { color: #1B3524; font-weight: 500; }
    .message-box { margin-top: 20px; padding: 16px; background: #F8F7F2; border-left: 4px solid #1B3524; font-size: 14px; line-height: 1.6; }
    .footer { padding: 16px 28px; background: #F8F7F2; font-size: 12px; color: #738A78; text-align: center; border-top: 1px solid #E3DFD4; }
  </style>
</head>
<body>
  <div class="card">
    <div class="header">
      <h1>Nova Wholesale Trade</h1>
      <p>New Commercial Avocado Supply Inquiry</p>
    </div>
    <div class="content">
      <span class="ref-badge">Reference ID: ${referenceId}</span>
      <table>
        <tr>
          <td class="label">Buyer Name</td>
          <td class="val">${data.name}</td>
        </tr>
        <tr>
          <td class="label">Company Name</td>
          <td class="val"><strong>${data.company}</strong></td>
        </tr>
        <tr>
          <td class="label">Email Address</td>
          <td class="val"><a href="mailto:${data.email}" style="color: #1B3524;">${data.email}</a></td>
        </tr>
        <tr>
          <td class="label">Destination Port / Country</td>
          <td class="val">${data.country}</td>
        </tr>
        <tr>
          <td class="label">Phone / WhatsApp</td>
          <td class="val">${data.phone || "Not provided"}</td>
        </tr>
        <tr>
          <td class="label">Product Interest</td>
          <td class="val">${data.product || "Export Avocado (General Inquiry)"}</td>
        </tr>
        <tr>
          <td class="label">Estimated Volume</td>
          <td class="val">${data.quantity || "Standard Reefer / Air trial"}</td>
        </tr>
      </table>

      <div class="message-box">
        <strong style="display:block; margin-bottom: 6px; font-size: 12px; text-transform: uppercase; color: #4A6B53; letter-spacing: 0.08em;">Buyer Message:</strong>
        ${data.message.replace(/\n/g, "<br/>")}
      </div>
    </div>
    <div class="footer">
      Received on ${new Date(timestamp).toLocaleString("en-US", { timeZone: "Africa/Addis_Ababa" })} (East Africa Time)<br/>
      Direct reply to this email will respond directly to the buyer: ${data.email}
    </div>
  </div>
</body>
</html>
        `;

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
            subject: `🥑 New Avocado Inquiry: ${data.company} (${data.country}) — Ref ${referenceId}`,
            html: emailHtml,
          }),
        });

        if (res.ok) {
          console.log(`[Inquiry] Successfully sent via Resend: ${referenceId}`);
          return {
            success: true,
            method: "resend",
            referenceId,
            message: "Inquiry dispatched to Nova Export Desk successfully.",
          };
        } else {
          const errText = await res.text();
          console.error(`[Inquiry] Resend failed (${res.status}): ${errText}`);
        }
      } catch (err) {
        console.error("[Inquiry] Error calling Resend:", err);
      }
    }

    // 2. Try Formspree if endpoint is provided
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
            _subject: `New Avocado Supply Inquiry: ${data.company} - ${referenceId}`,
          }),
        });
        if (res.ok) {
          return {
            success: true,
            method: "formspree",
            referenceId,
            message: "Inquiry received and dispatched successfully.",
          };
        }
      } catch (err) {
        console.error("[Inquiry] Error calling Formspree:", err);
      }
    }

    // 3. Fallback: Log inquiry securely on server
    console.log(`[INQUIRY_RECEIVED] ${referenceId}`, {
      timestamp,
      targetEmail,
      ...data,
    });

    return {
      success: true,
      method: "logged",
      referenceId,
      message: "Inquiry recorded successfully.",
    };
  });
