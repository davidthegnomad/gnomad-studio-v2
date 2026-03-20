import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function POST(request: NextRequest) {
    try {
        const supabase = await createClient();
        const { data: { user }, error: authError } = await supabase.auth.getUser();

        if (authError || !user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        // Verify session
        const uid = user.id;

        const formData = await request.formData();
        const file = formData.get("file") as File;

        if (!file) {
            return NextResponse.json({ error: "No file provided" }, { status: 400 });
        }

        const MAX_QUOTA = 100 * 1024 * 1024; // 100MB
        const fileSize = file.size;

        // 1. Get current storage usage from Supabase user profile
        const { data: profile } = await supabase
            .from('client_profiles')
            .select('total_storage_used')
            .eq('id', uid)
            .single();

        const currentUsage = profile?.total_storage_used || 0;

        // 2. Enforce Quota
        if (currentUsage + fileSize > MAX_QUOTA) {
            return NextResponse.json({
                error: "Storage quota exceeded",
                message: `Uploading this file would exceed your 100MB limit. Remaining: ${((MAX_QUOTA - currentUsage) / (1024 * 1024)).toFixed(2)}MB`
            }, { status: 403 });
        }

        // 3. Upload to Supabase Storage
        const fileName = `${Date.now()}-${file.name.replace(/\s+/g, "_")}`;
        const storagePath = `clients/${uid}/docs/${fileName}`;

        const { error: uploadError } = await supabase.storage
            .from('client_documents')
            .upload(storagePath, file, {
                contentType: file.type,
                upsert: false
            });

        if (uploadError) {
            throw uploadError;
        }

        // 4. Update Postgres `documents` record
        const docData = {
            owner_id: uid,
            file_name: file.name,
            file_size: fileSize,
            content_type: file.type,
            storage_path: storagePath,
            // uploaded_at is handled by default gen_random_uuid in migration? Oh, uploaded_at is a timestamp with default now().
            // Wait, we didn't specify DEFAULT NOW() for uploaded_at in the migration. Let's explicitly provide it.
            uploaded_at: new Date().toISOString()
        };

        const { data: insertedDoc, error: dbError } = await supabase
            .from('documents')
            .insert(docData)
            .select()
            .single();

        if (dbError) {
            throw dbError;
        }

        // 5. Update quota usage
        // Note: For atomicity, an RPC is better, but doing it in sequential steps for now.
        await supabase
            .from('client_profiles')
            .update({ total_storage_used: currentUsage + fileSize })
            .eq('id', uid);

        return NextResponse.json({
            success: true,
            document: insertedDoc,
            usage: currentUsage + fileSize
        }, { status: 200 });

    } catch (error) {
        console.error("Upload error:", error);
        return NextResponse.json({
            error: "Internal Server Error",
            message: error instanceof Error ? error.message : "Upload failed"
        }, { status: 500 });
    }
}
