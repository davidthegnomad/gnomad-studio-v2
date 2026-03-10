import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";

export async function GET() {
    try {
        const supabase = await createClient();
        const { data: { user }, error: authError } = await supabase.auth.getUser();

        if (authError || !user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        if (user.email !== "david.the.gnomad@gmail.com" && user.email !== process.env.ADMIN_EMAIL) {
            return NextResponse.json({ error: "Forbidden: Admin access only" }, { status: 403 });
        }

        // 3. Fetch all client profiles
        const supabaseAdmin = createAdminClient();
        const { data: profiles, error: dbError } = await supabaseAdmin
            .from('client_profiles')
            .select('*');

        if (dbError) throw dbError;

        const clients = profiles.map(row => ({
            uid: row.id,
            firstName: row.first_name,
            email: row.email,
            websiteUrl: row.website_url,
            tier: row.tier,
            projectStatus: row.project_status,
            monthlyPrice: row.monthly_price,
            invoiceAmount: row.monthly_price,
            totalStorageUsed: row.total_storage_used,
            ga4PropertyId: row.ga4_property_id,
            ga4WebsiteUri: row.ga4_website_uri,
            internalNotes: row.internal_notes,
            createdAt: row.created_at,
            ...row.features,
            ...row.kpi_metrics,
        }));

        return NextResponse.json({ clients }, { status: 200 });

    } catch (error: any) {
        console.error("Admin List Error:", error);
        return NextResponse.json({ error: "Internal Server Error", message: error.message }, { status: 500 });
    }
}
