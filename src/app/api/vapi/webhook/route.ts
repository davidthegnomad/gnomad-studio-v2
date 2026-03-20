import { NextResponse } from "next/server";
import { Resend } from "resend";

export const runtime = "nodejs";

const resend = new Resend(process.env.RESEND_API_KEY);

interface VapiToolCall {
    id?: string;
    toolCallId?: string;
    function?: {
        arguments?: Record<string, unknown> | string | null;
    };
    arguments?: Record<string, unknown> | string | null;
}

export async function POST(req: Request) {
    const body = await req.json();
    console.log("VAPI WEBHOOK RECEIVED:", JSON.stringify(body));

    const msg = body?.message;

    // 1) Tool calls MUST respond with results[]
    if (msg?.type === "tool-calls") {
        const toolCalls = (msg.toolCallList ?? []) as VapiToolCall[];
        const results = toolCalls.map((tc) => ({
            toolCallId: tc.id ?? tc.toolCallId,
            result: { ok: true },
        }));
        return NextResponse.json({ results });
    }

    // 2) End of call -> send email
    if (msg?.type === "end-of-call-report") {
        const to = process.env.LEADS_TO_EMAIL!;
        const from = process.env.LEADS_FROM_EMAIL || "onboarding@resend.dev";

        // Prefer your assistant summary if present
        const summaryText =
            msg?.analysis?.summary ||
            msg?.artifact?.structuredOutputs?.["c46441a1-d39f-4034-bafb-52b773e9dfca"]?.result ||
            "(no summary)";

        // Structured data (you defined this schema on the assistant)
        const sd = msg?.analysis?.structuredData || {};

        const subject =
            (typeof summaryText === "string" && summaryText.split("\n")[0]?.startsWith("Subject:")
                ? summaryText.split("\n")[0].replace(/^Subject:\s*/i, "").trim()
                : `New Morgan lead: ${sd.caller_name ?? "Client"}`);

        const text = [
            `Call ID: ${msg?.call?.id}`,
            `From: ${msg?.customer?.number}`,
            `Intent: ${sd.intent ?? "unknown"}`,
            `Name: ${sd.caller_name ?? "unknown"}`,
            `Business: ${sd.business_name ?? "unknown"}`,
            `Phone: ${sd.phone ?? "unknown"}`,
            `Email: ${sd.email ?? "unknown"}`,
            `Qualified: ${String(sd.qualified_lead ?? "unknown")}`,
            "",
            "Summary:",
            typeof summaryText === "string" ? summaryText : JSON.stringify(summaryText, null, 2),
            "",
            "Recording:",
            msg?.recordingUrl || msg?.artifact?.recordingUrl || "(none)",
        ].join("\n");

        try {
            await resend.emails.send({ from, to, subject, text });
            console.log("Lead email sent to:", to);
        } catch (error) {
            console.error("Failed to send lead email:", error);
        }

        return NextResponse.json({ ok: true });
    }

    // Everything else
    return NextResponse.json({ ok: true });
}
