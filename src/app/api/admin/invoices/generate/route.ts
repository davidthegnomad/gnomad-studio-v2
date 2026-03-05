import { NextRequest, NextResponse } from "next/server";
export const dynamic = "force-dynamic";
import { PDFDocument, rgb, StandardFonts } from "pdf-lib";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { Resend } from "resend";
import { v4 as uuidv4 } from "uuid";

interface ClientProfile {
    firstName: string;
    email?: string;
    websiteUrl?: string;
    tier: string;
    monthlyPrice?: number;
    invoiceAmount?: number;
    invoiceDueDate?: string;
    invoiceValueSummary?: string;
}

async function buildInvoicePdf(profile: ClientProfile, invoiceNumber: string, invoiceDate: string): Promise<Uint8Array> {
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage([595, 842]); // A4
    const { width, height } = page.getSize();

    const fontBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
    const font = await pdfDoc.embedFont(StandardFonts.Helvetica);

    const teal = rgb(0.16, 0.74, 0.71);
    const dark = rgb(0.06, 0.05, 0.1);
    const gray = rgb(0.4, 0.4, 0.45);
    const light = rgb(0.95, 0.95, 0.97);

    // Header bar
    page.drawRectangle({ x: 0, y: height - 90, width, height: 90, color: dark });

    // Company name
    page.drawText("GNOMAD STUDIO", {
        x: 40, y: height - 52,
        size: 22, font: fontBold, color: teal,
    });
    page.drawText("gnomadstudio.org", {
        x: 40, y: height - 70,
        size: 10, font, color: rgb(0.6, 0.6, 0.65),
    });

    // Invoice label
    page.drawText("INVOICE", {
        x: width - 140, y: height - 48,
        size: 26, font: fontBold, color: rgb(1, 1, 1),
    });
    page.drawText(`#${invoiceNumber}`, {
        x: width - 140, y: height - 68,
        size: 11, font, color: rgb(0.6, 0.6, 0.65),
    });

    // Invoice metadata block
    const metaY = height - 130;
    page.drawText("DATE", { x: 40, y: metaY, size: 9, font: fontBold, color: gray });
    page.drawText(invoiceDate, { x: 40, y: metaY - 16, size: 11, font, color: dark });

    page.drawText("DUE DATE", { x: 160, y: metaY, size: 9, font: fontBold, color: gray });
    page.drawText(profile.invoiceDueDate || "Upon Receipt", { x: 160, y: metaY - 16, size: 11, font, color: dark });

    page.drawText("PLAN", { x: 300, y: metaY, size: 9, font: fontBold, color: gray });
    page.drawText(profile.tier, { x: 300, y: metaY - 16, size: 11, font, color: dark });

    // Divider
    page.drawLine({ start: { x: 40, y: metaY - 36 }, end: { x: width - 40, y: metaY - 36 }, thickness: 1, color: light });

    // Bill To block
    const billY = height - 210;
    page.drawText("BILL TO", { x: 40, y: billY, size: 9, font: fontBold, color: gray });
    page.drawText(profile.firstName, { x: 40, y: billY - 18, size: 13, font: fontBold, color: dark });
    if (profile.email) page.drawText(profile.email, { x: 40, y: billY - 34, size: 10, font, color: gray });
    if (profile.websiteUrl) page.drawText(profile.websiteUrl, { x: 40, y: billY - 50, size: 10, font, color: teal });

    // Service table header
    const tableY = height - 310;
    page.drawRectangle({ x: 40, y: tableY - 4, width: width - 80, height: 24, color: dark });
    page.drawText("SERVICE DESCRIPTION", { x: 52, y: tableY + 4, size: 9, font: fontBold, color: rgb(1, 1, 1) });
    page.drawText("AMOUNT", { x: width - 130, y: tableY + 4, size: 9, font: fontBold, color: rgb(1, 1, 1) });

    // Service row
    const amount = profile.monthlyPrice ?? profile.invoiceAmount ?? 0;
    const rowY = tableY - 30;
    page.drawText(profile.invoiceValueSummary || "Monthly Retainer — Gnomad Studio Services", {
        x: 52, y: rowY, size: 10, font, color: dark, maxWidth: 350,
    });
    page.drawText(`$${amount.toFixed(2)}`, {
        x: width - 130, y: rowY, size: 10, font: fontBold, color: dark,
    });

    // Row divider
    page.drawLine({
        start: { x: 40, y: rowY - 18 }, end: { x: width - 40, y: rowY - 18 },
        thickness: 0.5, color: light,
    });

    // Total block
    const totalY = rowY - 54;
    page.drawRectangle({ x: width - 220, y: totalY - 8, width: 180, height: 36, color: teal });
    page.drawText("TOTAL DUE", { x: width - 210, y: totalY + 12, size: 9, font: fontBold, color: dark });
    page.drawText(`$${amount.toFixed(2)}`, { x: width - 210, y: totalY - 2, size: 18, font: fontBold, color: dark });

    // Footer
    const footerY = 50;
    page.drawLine({ start: { x: 40, y: footerY + 24 }, end: { x: width - 40, y: footerY + 24 }, thickness: 0.5, color: light });
    page.drawText("Thank you for your business! Questions? david.the.gnomad@gmail.com", {
        x: 40, y: footerY + 8, size: 9, font, color: gray,
    });
    page.drawText("Gnomad Studio — gnomadstudio.org", {
        x: 40, y: footerY - 6, size: 8, font, color: rgb(0.65, 0.65, 0.7),
    });

    return pdfDoc.save();
}

export async function POST(request: NextRequest) {
    try {
        // --- Auth check ---
        const cronSecretHeader = request.headers.get("X-Cron-Secret");
        const isCronTrigger = cronSecretHeader && cronSecretHeader === process.env.CRON_SECRET;

        let authorized = false;
        if (isCronTrigger) {
            authorized = true;
        } else {
            const supabase = await createClient();
            const { data: { user } } = await supabase.auth.getUser();
            if (user && (user.email === "david.the.gnomad@gmail.com" || user.email === process.env.ADMIN_EMAIL)) authorized = true;
        }

        if (!authorized) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

        const { uid } = await request.json();
        if (!uid) return NextResponse.json({ error: "Missing uid" }, { status: 400 });


        // --- Fetch client profile from Supabase ---
        const supabaseAdmin = createAdminClient();
        const { data: profileRow, error: fetchError } = await supabaseAdmin
            .from('client_profiles')
            .select('*')
            .eq('id', uid)
            .single();

        if (fetchError || !profileRow) return NextResponse.json({ error: "Client not found" }, { status: 404 });

        const profile: ClientProfile = {
            firstName: profileRow.first_name,
            email: profileRow.email,
            websiteUrl: profileRow.website_url,
            tier: profileRow.tier,
            monthlyPrice: Number(profileRow.monthly_price) || 0,
            invoiceAmount: Number(profileRow.monthly_price) || 0,
            invoiceDueDate: profileRow.features?.invoiceDueDate || "Upon Receipt",
            invoiceValueSummary: profileRow.features?.invoiceValueSummary || "Monthly Retainer",
        };

        // --- Build PDF ---
        const invoiceId = uuidv4();
        const now = new Date();
        const invoiceNumber = `GS-${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, "0")}-${invoiceId.slice(0, 6).toUpperCase()}`;
        const invoiceDate = now.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
        const invoiceFileName = `Invoice_${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, "0")}_Gnomad_Studio.pdf`;

        const pdfBytes = await buildInvoicePdf(profile, invoiceNumber, invoiceDate);

        // --- Upload to Supabase Storage ---
        const filePath = `clients/${uid}/invoices/${invoiceId}.pdf`;

        const { error: uploadError } = await supabaseAdmin
            .storage
            .from('client_documents')
            .upload(filePath, pdfBytes, {
                contentType: "application/pdf",
                upsert: true
            });

        if (uploadError) throw uploadError;

        const { data: { publicUrl } } = supabaseAdmin
            .storage
            .from('client_documents')
            .getPublicUrl(filePath);

        // --- Create Documents entry ---
        const { error: docError } = await supabaseAdmin
            .from('documents')
            .insert({
                id: invoiceId,
                owner_id: uid,
                file_name: invoiceFileName,
                file_size: pdfBytes.length,
                content_type: "application/pdf",
                storage_path: filePath,
                document_type: "invoice",
                uploaded_at: new Date().toISOString()
            });

        if (docError) throw docError;

        // --- Create Invoices entry ---
        const futureDate = new Date();
        futureDate.setDate(futureDate.getDate() + 14); // Default 14 days due date

        const { error: invError } = await supabaseAdmin
            .from('invoices')
            .insert({
                id: invoiceId,
                client_id: uid,
                invoice_number: invoiceNumber,
                amount: profile.monthlyPrice ?? profile.invoiceAmount ?? 0,
                status: "Pending",
                due_date: futureDate.toISOString(),
                issued_at: new Date().toISOString(),
                pdf_url: publicUrl,
                summary: profile.invoiceValueSummary
            });

        if (invError) throw invError;

        // --- Update Client Profile Quota ---
        const currentUsage = Number(profileRow.total_storage_used) || 0;
        await supabaseAdmin
            .from('client_profiles')
            .update({ total_storage_used: currentUsage + pdfBytes.length })
            .eq('id', uid);


        // --- Send email via Resend ---
        if (profile.email && process.env.RESEND_API_KEY) {
            const resend = new Resend(process.env.RESEND_API_KEY);
            await resend.emails.send({
                from: process.env.INVOICE_FROM_EMAIL || "Gnomad Studio <billing@gnomadstudio.org>",
                to: profile.email,
                subject: `Your Gnomad Studio Invoice — ${invoiceDate}`,
                html: `
                    <div style="font-family: sans-serif; max-width: 600px; margin: auto; background: #0f0c15; color: #fff; padding: 40px; border-radius: 16px;">
                        <h1 style="color: #2dd4bf; margin-bottom: 4px;">Gnomad Studio</h1>
                        <p style="color: #888; margin-top: 0;">gnomadstudio.org</p>
                        <hr style="border-color: #ffffff15; margin: 24px 0;" />
                        <h2 style="font-size: 20px;">Hi ${profile.firstName},</h2>
                        <p style="color: #aaa; line-height: 1.6;">
                            Your invoice <strong style="color: #fff;">${invoiceNumber}</strong> is ready. You can view and download it anytime from your client portal.
                        </p>
                        <div style="background: #1e1b26; border-radius: 12px; padding: 20px; margin: 24px 0;">
                            <p style="margin: 0; color: #888; font-size: 12px;">AMOUNT DUE</p>
                            <p style="margin: 4px 0 0; font-size: 28px; font-weight: bold; color: #2dd4bf;">
                                $${(profile.monthlyPrice ?? profile.invoiceAmount ?? 0).toFixed(2)}
                            </p>
                            <p style="margin: 4px 0 0; color: #666; font-size: 12px;">Due: ${profile.invoiceDueDate || "Upon Receipt"}</p>
                        </div>
                        <a href="${process.env.NEXT_PUBLIC_APP_URL || "https://gnomad-studio-client.web.app"}/client-portal"
                           style="display: inline-block; background: #2dd4bf; color: #0f0c15; font-weight: bold; padding: 14px 28px; border-radius: 10px; text-decoration: none; margin-top: 8px;">
                            View Invoice in Portal →
                        </a>
                        <hr style="border-color: #ffffff15; margin: 32px 0 16px;" />
                        <p style="color: #555; font-size: 12px;">Questions? Reply to this email or reach out at david.the.gnomad@gmail.com</p>
                    </div>
                `,
            });
        }

        return NextResponse.json({
            success: true,
            invoiceId,
            invoiceNumber,
            pdfUrl: publicUrl,
            message: `Invoice ${invoiceNumber} generated and ${profile.email ? "emailed to " + profile.email : "saved (no email on file)."}`
        }, { status: 200 });

    } catch (error: any) {
        console.error("Invoice generation error:", error);
        return NextResponse.json({ error: "Invoice generation failed", message: error.message }, { status: 500 });
    }
}
