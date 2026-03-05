import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";

export async function POST(request: NextRequest) {
    try {
        const supabase = await createClient();
        const { data: { user }, error: authError } = await supabase.auth.getUser();

        if (authError || !user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        if (user.email !== "david.the.gnomad@gmail.com" && user.email !== process.env.ADMIN_EMAIL) {
            return NextResponse.json({ error: "Forbidden: Admin access only" }, { status: 403 });
        }

        // List all Supabase Auth users
        const supabaseAdmin = createAdminClient();
        const { data: listResult, error: listError } = await supabaseAdmin.auth.admin.listUsers();
        if (listError) throw listError;

        let created = 0;
        let skipped = 0;

        // Fetch existing profiles to avoid conflicts
        const { data: existingProfiles, error: fetchError } = await supabaseAdmin
            .from('client_profiles')
            .select('id');

        if (fetchError) throw fetchError;

        const existingIds = new Set(existingProfiles.map(p => p.id));

        for (const userRecord of listResult.users) {
            const uid = userRecord.id;

            if (!existingIds.has(uid)) {
                // Create a skeleton profile for users who don't have one yet
                const { error: insertError } = await supabaseAdmin
                    .from('client_profiles')
                    .insert({
                        id: uid,
                        first_name: userRecord.user_metadata?.first_name || userRecord.email?.split("@")[0] || "Client",
                        email: userRecord.email || "",
                        website_url: "",
                        tier: "Pioneer",
                        monthly_price: 0,
                        project_status: "Onboarding",
                        features: {
                            nextMilestone: "Strategic Onboarding",
                            nextMilestoneDate: "TBD",
                            invoiceValueSummary: "New client — profile pending setup.",
                            invoiceDueDate: "TBD",
                            activeServices: [],
                            chatbot: false,
                            socialMediaManagement: false,
                            businessConsulting: false,
                            websiteUpdateFrequency: "Monthly",
                        },
                        authorizations: ["dashboard", "resources"],
                        ga4_property_id: "",
                        ga4_website_uri: "",
                        internal_notes: "",
                        total_storage_used: 0
                    });

                if (insertError) {
                    console.error(`Failed to sync user ${uid}:`, insertError);
                } else {
                    created++;
                }
            } else {
                skipped++;
            }
        }

        return NextResponse.json({
            success: true,
            message: `Sync complete. Created ${created} new profile(s). Skipped ${skipped} existing.`,
            created,
            skipped,
        }, { status: 200 });

    } catch (error: any) {
        console.error("Sync Auth Users Error:", error);
        return NextResponse.json({ error: "Internal Server Error", message: error.message }, { status: 500 });
    }
}
