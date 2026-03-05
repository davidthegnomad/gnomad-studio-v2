import { NextRequest, NextResponse } from "next/server";
import { BetaAnalyticsDataClient } from "@google-analytics/data";
import { createClient } from "@/lib/supabase/server";

const GA4_PROPERTY_ID = process.env.GA4_PROPERTY_ID;

// Lazy factory — credentials are NOT read at module evaluation time.
// This prevents "Failed to parse private key" crashes during Firebase build.
function getAnalyticsClient(): BetaAnalyticsDataClient | null {
    const rawKey = process.env.PRIVATE_KEY;
    const clientEmail = process.env.CLIENT_EMAIL;
    if (!rawKey || !clientEmail) return null;
    const privateKey = rawKey.replace(/\\n/g, "\n");
    return new BetaAnalyticsDataClient({
        credentials: { client_email: clientEmail, private_key: privateKey },
    });
}

export async function GET(request: NextRequest) {
    try {
        // Auth check
        const supabase = await createClient();
        const { data: { user }, error: authError } = await supabase.auth.getUser();
        if (authError || !user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

        if (!GA4_PROPERTY_ID || GA4_PROPERTY_ID === "REPLACE_WITH_NUMERIC_PROPERTY_ID") {
            return NextResponse.json({
                ok: false,
                pending: true,
                hint: "Add GA4_PROPERTY_ID to .env.local (GA4 → Admin → Property Settings → Property ID) and grant the Firebase service account Viewer access.",
            }, { status: 200 });
        }

        const client = getAnalyticsClient();
        if (!client) {
            return NextResponse.json({
                ok: false,
                pending: true,
                hint: "PRIVATE_KEY or CLIENT_EMAIL secrets are not configured in Firebase App Hosting / .env.local",
            }, { status: 200 });
        }
        const property = `properties/${GA4_PROPERTY_ID}`;


        const [overviewRes, sourcesRes, pagesRes] = await Promise.all([
            // Overview: all 8 board-approved metrics
            client.runReport({
                property,
                dateRanges: [{ startDate: "30daysAgo", endDate: "today" }],
                metrics: [
                    { name: "sessions" },
                    { name: "totalUsers" },
                    { name: "newUsers" },
                    { name: "engagementRate" },
                    { name: "averageSessionDuration" },
                    { name: "screenPageViews" },
                ],
            }),
            // Traffic by channel
            client.runReport({
                property,
                dateRanges: [{ startDate: "30daysAgo", endDate: "today" }],
                dimensions: [{ name: "sessionDefaultChannelGroup" }],
                metrics: [{ name: "sessions" }],
                orderBys: [{ metric: { metricName: "sessions" }, desc: true }],
                limit: 6,
            }),
            // Top pages
            client.runReport({
                property,
                dateRanges: [{ startDate: "30daysAgo", endDate: "today" }],
                dimensions: [{ name: "pagePath" }],
                metrics: [{ name: "screenPageViews" }],
                orderBys: [{ metric: { metricName: "screenPageViews" }, desc: true }],
                limit: 5,
            }),
        ]);

        const row = overviewRes[0].rows?.[0];
        const overview = row ? {
            sessions: parseInt(row.metricValues?.[0]?.value || "0"),
            totalUsers: parseInt(row.metricValues?.[1]?.value || "0"),
            newUsers: parseInt(row.metricValues?.[2]?.value || "0"),
            returningUsers: parseInt(row.metricValues?.[1]?.value || "0") - parseInt(row.metricValues?.[2]?.value || "0"),
            engagementRate: Math.round(parseFloat(row.metricValues?.[3]?.value || "0") * 100),
            avgSessionDuration: parseFloat(row.metricValues?.[4]?.value || "0"),
            pageViews: parseInt(row.metricValues?.[5]?.value || "0"),
        } : null;

        const trafficSources = sourcesRes[0].rows?.map((r) => ({
            channel: r.dimensionValues?.[0]?.value || "Unknown",
            sessions: parseInt(r.metricValues?.[0]?.value || "0"),
        })) || [];

        const topPages = pagesRes[0].rows?.map((r) => ({
            path: r.dimensionValues?.[0]?.value || "/",
            views: parseInt(r.metricValues?.[0]?.value || "0"),
        })) || [];

        // No cache during troubleshooting
        return NextResponse.json({ ok: true, overview, trafficSources, topPages, fetchedAt: new Date().toISOString() }, {
            status: 200,
            headers: { "Cache-Control": "no-store, no-cache, must-revalidate" },
        });


    } catch (error: any) {
        console.error("GA4 API error:", error?.message);
        return NextResponse.json({
            ok: false,
            error: error.message,
            hint: error.message?.includes("PERMISSION_DENIED")
                ? "Add firebase-adminsdk-fbsvc@gnomad-studio-client.iam.gserviceaccount.com as Viewer in GA4 → Admin → Property Access Management"
                : error.message?.includes("NOT_FOUND")
                    ? "Check GA4_PROPERTY_ID in .env.local — make sure it's the numeric Property ID from GA4 → Admin → Property Settings"
                    : "Unknown GA4 error — check server logs",
        }, { status: 200 });
    }
}
