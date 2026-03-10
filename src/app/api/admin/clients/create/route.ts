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
        const { email, password, firstName, tier, invoiceAmount } = body;

        if (!email || !password || !firstName) {
            return NextResponse.json({ error: "Missing required fields (email, password, firstName)" }, { status: 400 });
        }

        // 3. Create Auth User
        const supabaseAdmin = createAdminClient();
        const { data: authData, error: createError } = await supabaseAdmin.auth.admin.createUser({
            email,
            password,
            email_confirm: true,
            user_metadata: {
                first_name: firstName,
            }
        });

        if (createError) {
            console.error("Supabase Admin Create User Error:", createError);
            if (createError.code === 'user_already_exists' || createError.message.includes('already registered')) {
                return NextResponse.json({ error: "Email already in use" }, { status: 409 });
            }
            throw createError;
        }

        const uid = authData.user.id;

        // 4. Update ClientProfile in Postgres (row is automatically created by trigger)
        const profileData = {
            first_name: firstName,
            tier: tier || "Pioneer",
            project_status: "Onboarding",
            monthly_price: Number(invoiceAmount) || 0,
            features: {
                nextMilestone: "Strategic Onboarding",
                nextMilestoneDate: "TBD",
                invoiceValueSummary: "Initial setup and onboarding phase.",
                invoiceDueDate: "TBD"
            }
        };

        const { error: updateError } = await supabaseAdmin
            .from('client_profiles')
            .update(profileData)
            .eq('id', uid);

        if (updateError) {
            console.error("Failed to update profile", updateError);
            throw updateError;
        }

        return NextResponse.json({ success: true, uid }, { status: 201 });

    } catch (error: any) {
        console.error("Admin Create Client Error:", error);
        // Handle specific Supabase errors (e.g., email already in use)
        if (error.code === 'auth/email-already-exists' || error.message?.includes('already registered')) {
            return NextResponse.json({ error: "Email already in use" }, { status: 409 });
        }
        return NextResponse.json({ error: "Internal Server Error", message: error.message }, { status: 500 });
    }
}
