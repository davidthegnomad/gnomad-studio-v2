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

        const body = await request.json();
        const { uid, updates } = body;

        if (!uid || !updates) {
            return NextResponse.json({ error: "Missing uid or updates" }, { status: 400 });
        }

        const supabaseAdmin = createAdminClient();

        // Build a sanitized update object mapping to snake_case schema
        const allowedUpdates: Record<string, any> = {};

        // Core identity
        if (updates.firstName !== undefined) allowedUpdates.first_name = updates.firstName;
        if (updates.websiteUrl !== undefined) allowedUpdates.website_url = updates.websiteUrl;

        // Package & billing
        if (updates.tier !== undefined) allowedUpdates.tier = updates.tier;
        if (updates.monthlyPrice !== undefined) allowedUpdates.monthly_price = Number(updates.monthlyPrice);

        // Project tracking
        if (updates.projectStatus !== undefined) allowedUpdates.project_status = updates.projectStatus;

        // Authorizations & integrations
        if (updates.authorizations !== undefined) allowedUpdates.authorizations = updates.authorizations;
        if (updates.ga4PropertyId !== undefined) allowedUpdates.ga4_property_id = updates.ga4PropertyId;
        if (updates.ga4WebsiteUri !== undefined) allowedUpdates.ga4_website_uri = updates.ga4WebsiteUri;

        // Internal
        if (updates.internalNotes !== undefined) allowedUpdates.internal_notes = updates.internalNotes;

        // Fetch existing JSONB fields to merge
        const { data: profile } = await supabaseAdmin
            .from('client_profiles')
            .select('features, kpi_metrics')
            .eq('id', uid)
            .single();

        const existingFeatures = profile?.features || {};
        const existingKpi = profile?.kpi_metrics || {};

        let updateFeatures = false;
        let updateKpi = false;

        if (updates.features !== undefined) {
            const f = updates.features;
            if (f.chatbot !== undefined) { existingFeatures.chatbot = Boolean(f.chatbot); updateFeatures = true; }
            if (f.socialMediaManagement !== undefined) { existingFeatures.socialMediaManagement = Boolean(f.socialMediaManagement); updateFeatures = true; }
            if (f.businessConsulting !== undefined) { existingFeatures.businessConsulting = Boolean(f.businessConsulting); updateFeatures = true; }
            if (f.websiteUpdateFrequency !== undefined) { existingFeatures.websiteUpdateFrequency = f.websiteUpdateFrequency; updateFeatures = true; }
        }

        // Invoice and milestone features mapped to JSONB
        if (updates.invoiceAmount !== undefined) { existingFeatures.invoiceAmount = Number(updates.invoiceAmount); updateFeatures = true; }
        if (updates.invoiceDueDate !== undefined) { existingFeatures.invoiceDueDate = updates.invoiceDueDate; updateFeatures = true; }
        if (updates.invoiceValueSummary !== undefined) { existingFeatures.invoiceValueSummary = updates.invoiceValueSummary; updateFeatures = true; }
        if (updates.nextMilestone !== undefined) { existingFeatures.nextMilestone = updates.nextMilestone; updateFeatures = true; }
        if (updates.nextMilestoneDate !== undefined) { existingFeatures.nextMilestoneDate = updates.nextMilestoneDate; updateFeatures = true; }
        if (updates.customerSince !== undefined) { existingFeatures.customerSince = updates.customerSince; updateFeatures = true; } // storing arbitrarily in features if needed? Or mapped to `created_at`? We'll leave in features since schema doesn't have customer_since.

        // KPI Metrics
        if (updates.websiteHealthScore !== undefined) { existingKpi.websiteHealthScore = Number(updates.websiteHealthScore); updateKpi = true; }
        if (updates.leadsPerMonth !== undefined) { existingKpi.leadsPerMonth = Number(updates.leadsPerMonth); updateKpi = true; }
        if (updates.pageSpeedScore !== undefined) { existingKpi.pageSpeedScore = Number(updates.pageSpeedScore); updateKpi = true; }
        if (updates.seoScore !== undefined) { existingKpi.seoScore = Number(updates.seoScore); updateKpi = true; }
        if (updates.uptimePercent !== undefined) { existingKpi.uptimePercent = Number(updates.uptimePercent); updateKpi = true; }

        if (updateFeatures) allowedUpdates.features = existingFeatures;
        if (updateKpi) allowedUpdates.kpi_metrics = existingKpi;

        allowedUpdates.updated_at = new Date().toISOString();

        const { error } = await supabaseAdmin.from('client_profiles').update(allowedUpdates).eq('id', uid);

        if (error) {
            throw error;
        }

        return NextResponse.json({ success: true }, { status: 200 });

    } catch (error: any) {
        console.error("Admin Update Error:", error);
        return NextResponse.json({ error: "Internal Server Error", message: error.message }, { status: 500 });
    }
}
