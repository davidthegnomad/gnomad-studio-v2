import { NextResponse } from "next/server";

export const runtime = "nodejs"; // important if you use any node libs

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

    // TEMP: log everything (remove after debugging)
    console.log("VAPI WEBHOOK RECEIVED:", JSON.stringify(body));

    const msg = body?.message;

    // Tool calls MUST return results[]
    if (msg?.type === "tool-calls") {
        const toolCalls: VapiToolCall[] = msg.toolCallList ?? [];
        const results = toolCalls.map((tc: VapiToolCall) => ({
            toolCallId: tc.id || tc.toolCallId, // if id is present
            result: { ok: true, echoed: tc.function?.arguments ?? tc.arguments ?? null },
        }));

        // If toolCallId is missing from results, we try to grab it from the source
        if (!results[0]?.toolCallId && toolCalls[0]?.id) {
            results[0].toolCallId = toolCalls[0].id;
        }

        return NextResponse.json({ results });
    }

    // End-of-call-report (and other events) can just 200 OK
    return NextResponse.json({ ok: true });
}
