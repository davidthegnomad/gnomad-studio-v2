import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

export const dynamic = "force-dynamic";

// Vapi sends POST requests for various call lifecycle events.
// We only act on `end-of-call-report` which contains the full transcript.
export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { message } = body;

        // Only process end-of-call events
        if (!message || message.type !== "end-of-call-report") {
            return NextResponse.json({ received: true }, { status: 200 });
        }

        const call = message.call ?? {};
        const artifact = message.artifact ?? {};
        const analysis = message.analysis ?? {};

        // --- Extract call details ---
        const callId = call.id ?? "unknown";
        const callerNumber = call.customer?.number ?? "Unknown Number";
        const endedReason = message.endedReason ?? "unknown";
        const startedAt = call.startedAt ? new Date(call.startedAt).toLocaleString("en-US", { timeZone: "America/Chicago" }) : "Unknown";
        const durationSeconds = message.durationSeconds ?? 0;
        const durationFormatted = durationSeconds >= 60
            ? `${Math.floor(durationSeconds / 60)}m ${Math.round(durationSeconds % 60)}s`
            : `${Math.round(durationSeconds)}s`;

        // --- Extract transcript & summary ---
        const transcript = artifact.transcript ?? "No transcript available.";
        const summary = analysis.summary ?? "";

        // --- Build email HTML ---
        const transcriptHtml = transcript
            .split("\n")
            .map((line: string) => {
                const isAI = line.toLowerCase().startsWith("ai:") || line.toLowerCase().startsWith("morgan:");
                const isCaller = line.toLowerCase().startsWith("user:") || line.toLowerCase().startsWith("human:");
                const color = isAI ? "#2dd4bf" : isCaller ? "#a78bfa" : "#888";
                const label = isAI ? "MORGAN" : isCaller ? "CALLER" : "";
                return label
                    ? `<p style="margin: 6px 0;"><span style="color:${color}; font-weight: bold; font-size: 11px; text-transform: uppercase;">${label}</span><br/><span style="color: #ccc;">${line.replace(/^(ai:|morgan:|user:|human:)/i, "").trim()}</span></p>`
                    : `<p style="margin: 4px 0; color: #666; font-size: 12px;">${line}</p>`;
            })
            .join("");

        const html = `
            <div style="font-family: -apple-system, sans-serif; max-width: 640px; margin: auto; background: #0f0c15; color: #fff; padding: 36px; border-radius: 16px;">
                <h1 style="color: #2dd4bf; margin: 0 0 4px;">📞 New Call — Morgan</h1>
                <p style="color: #555; margin: 0 0 24px; font-size: 13px;">Gnomad Studio AI Receptionist</p>

                <div style="background: #1a1728; border-radius: 12px; padding: 20px; margin-bottom: 24px; display: flex; flex-wrap: wrap; gap: 16px;">
                    <div style="flex: 1; min-width: 140px;">
                        <p style="margin: 0; color: #555; font-size: 11px; text-transform: uppercase; font-weight: bold;">Caller</p>
                        <p style="margin: 4px 0 0; font-size: 16px; font-weight: bold;">${callerNumber}</p>
                    </div>
                    <div style="flex: 1; min-width: 140px;">
                        <p style="margin: 0; color: #555; font-size: 11px; text-transform: uppercase; font-weight: bold;">Duration</p>
                        <p style="margin: 4px 0 0; font-size: 16px; font-weight: bold;">${durationFormatted}</p>
                    </div>
                    <div style="flex: 1; min-width: 140px;">
                        <p style="margin: 0; color: #555; font-size: 11px; text-transform: uppercase; font-weight: bold;">Time (CST)</p>
                        <p style="margin: 4px 0 0; font-size: 14px;">${startedAt}</p>
                    </div>
                    <div style="flex: 1; min-width: 140px;">
                        <p style="margin: 0; color: #555; font-size: 11px; text-transform: uppercase; font-weight: bold;">Ended Reason</p>
                        <p style="margin: 4px 0 0; font-size: 14px; color: ${endedReason === "customer-ended-call" ? "#10b981" : "#f59e0b"};">${endedReason}</p>
                    </div>
                </div>

                ${summary ? `
                <div style="background: #1e1b26; border-left: 3px solid #2dd4bf; border-radius: 8px; padding: 16px; margin-bottom: 24px;">
                    <p style="margin: 0; color: #555; font-size: 11px; text-transform: uppercase; font-weight: bold; margin-bottom: 8px;">✨ AI Summary</p>
                    <p style="margin: 0; color: #bbb; line-height: 1.6; font-size: 14px;">${summary}</p>
                </div>` : ""}

                <div style="background: #14111d; border-radius: 12px; padding: 20px;">
                    <p style="margin: 0 0 16px; color: #555; font-size: 11px; text-transform: uppercase; font-weight: bold;">Full Transcript</p>
                    <div style="border-top: 1px solid #ffffff10; padding-top: 12px;">
                        ${transcriptHtml || '<p style="color: #555;">No transcript available.</p>'}
                    </div>
                </div>

                <p style="margin-top: 24px; color: #333; font-size: 11px; text-align: center;">
                    Call ID: ${callId} — Gnomad Studio AI Receptionist
                </p>
            </div>
        `;

        // --- Send email ---
        if (!process.env.RESEND_API_KEY) {
            console.error("RESEND_API_KEY not set");
            return NextResponse.json({ error: "Email not configured" }, { status: 500 });
        }

        const resend = new Resend(process.env.RESEND_API_KEY);
        await resend.emails.send({
            from: "Gnomad Studio <morgan@gnomadstudio.org>",
            to: "david@gnomadstudio.org",
            subject: `📞 Morgan Call — ${callerNumber} — ${durationFormatted}`,
            html,
        });

        return NextResponse.json({ success: true }, { status: 200 });

    } catch (error: any) {
        console.error("Vapi webhook error:", error);
        return NextResponse.json({ error: "Webhook processing failed", message: error.message }, { status: 500 });
    }
}
