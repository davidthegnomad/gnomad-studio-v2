import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { name, email, phone, business, message } = body;

        // Validation
        if (!process.env.RESEND_API_KEY) {
            console.warn("[API] RESEND_API_KEY is missing.");
            if (process.env.NODE_ENV === "development") {
                console.log("[DEV MODE] Simulated lead capture for:", name);
                return NextResponse.json({ success: true, mocked: true });
            }
            return NextResponse.json({ error: "Email service not configured" }, { status: 500 });
        }

        // 1. Send Email Notification via Resend
        try {
            await resend.emails.send({
                from: "Gnomad Studio <leads@gnomadstudio.org>",
                to: ["david.the.gnomad@gmail.com"],
                subject: `🔥 New High-Ticket Lead: ${business || name}`,
                html: `
                    <div style="font-family: sans-serif; background: #0f0c15; color: #fff; padding: 40px; border-radius: 20px;">
                        <h2 style="color: #00bfc8;">New Lead Captured</h2>
                        <p><strong>Name:</strong> ${name}</p>
                        <p><strong>Business:</strong> ${business || "N/A"}</p>
                        <p><strong>Email:</strong> ${email}</p>
                        <p><strong>Phone:</strong> ${phone}</p>
                        <hr style="border: 0; border-top: 1px solid #333; margin: 20px 0;" />
                        <p><strong>Message:</strong></p>
                        <p>${message}</p>
                        <div style="margin-top: 30px; padding: 20px; background: rgba(0, 135, 142, 0.1); border-left: 4px solid #00878e;">
                            <p style="margin: 0; font-size: 12px; color: #00878e; font-weight: bold; text-transform: uppercase;">L2V Protocol Active</p>
                            <p style="margin: 5px 0 0 0; font-size: 14px;">The 60-Second Loop has been triggered. Morgan is contacting this lead now.</p>
                        </div>
                    </div>
                `,
            });
        } catch (emailError) {
            console.error("[API] Resend failed:", emailError);
            if (process.env.NODE_ENV !== "development") {
                throw emailError;
            }
        }

        // 2. Trigger Vapi Outbound Call (L2V Protocol)
        // Only trigger if phone is provided and Vapi is configured
        if (phone && process.env.VAPI_API_KEY && process.env.VAPI_ASSISTANT_ID) {
            console.log(`[L2V] Triggering Vapi call for ${phone}...`);

            const vapiResponse = await fetch("https://api.vapi.ai/call", {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${process.env.VAPI_API_KEY}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    assistantId: process.env.VAPI_ASSISTANT_ID,
                    phoneNumberId: process.env.VAPI_PHONE_NUMBER_ID,
                    customer: {
                        number: phone.startsWith('+') ? phone : `+1${phone.replace(/\D/g, '')}`,
                        name: name,
                    },
                }),
            });

            if (!vapiResponse.ok) {
                const errorData = await vapiResponse.json();
                console.error("[L2V] Vapi Call Failed:", errorData);
            } else {
                console.log("[L2V] Vapi Call Triggered Successfully.");
            }
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Lead submission error:", error);
        return NextResponse.json({ error: "Failed to process lead" }, { status: 500 });
    }
}
