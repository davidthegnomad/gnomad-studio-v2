import { NextRequest, NextResponse } from "next/server";
export const dynamic = "force-dynamic";
import { createAdminClient } from "@/lib/supabase/admin";

/**
 * Vercel Cron Job — runs at 9AM UTC on the 1st of every month
 * Defined in vercel.json: { "path": "/api/cron/monthly-invoices", "schedule": "0 9 1 * *" }
 *
 * Protected by a CRON_SECRET env var that Vercel automatically sends
 * in the Authorization header when it triggers the cron.
 */
export async function GET(request: NextRequest) {
    // Verify the cron secret so this can't be triggered publicly
    const authHeader = request.headers.get("authorization");
    if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        const supabaseAdmin = createAdminClient();
        const { data: profiles, error } = await supabaseAdmin.from('client_profiles').select('*');
        if (error) throw error;

        const results: { uid: string; status: string; message: string }[] = [];

        for (const profile of profiles) {
            const uid = profile.id;

            // Skip if no invoice amount set
            const amount = Number(profile.monthly_price) || 0;
            if (amount <= 0) {
                results.push({ uid, status: "skipped", message: "No invoice amount set" });
                continue;
            }

            try {
                // Call our invoice generation endpoint internally
                const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://gnomad-studio-client.web.app";
                const res = await fetch(`${baseUrl}/api/admin/invoices/generate`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        // Pass the cron secret so the generate route can trust this internal call
                        "X-Cron-Secret": process.env.CRON_SECRET || "",
                    },
                    body: JSON.stringify({ uid, fromCron: true }),
                });

                const data = await res.json();
                results.push({ uid, status: res.ok ? "success" : "error", message: data.message || data.error });
            } catch (err: any) {
                results.push({ uid, status: "error", message: err.message });
            }
        }

        // Log results to console instead of firestore
        console.log("Monthly invoices cron results:", {
            job: "monthly-invoices",
            runAt: new Date().toISOString(),
            processed: results.length,
            results,
        });

        return NextResponse.json({
            success: true,
            processed: results.length,
            results,
        });

    } catch (error: any) {
        console.error("Monthly invoice cron error:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
