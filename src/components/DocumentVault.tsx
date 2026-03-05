"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    FileText,
    Upload,
    Trash2,
    Download,
    CheckCircle2,
    AlertCircle,
    Loader2,
    HardDrive,
    X
} from "lucide-react";
import { createClient } from "@/lib/supabase/client";

interface DocumentRecord {
    id: string;
    owner_id: string;
    file_name: string;
    file_size: number;
    content_type: string;
    storage_path: string;
    uploaded_at: string;
}

interface DocumentVaultProps {
    uid: string;
    totalStorageUsed: number;
}

export default function DocumentVault({ uid, totalStorageUsed }: DocumentVaultProps) {
    const [documents, setDocuments] = useState<DocumentRecord[]>([]);
    const [isUploading, setIsUploading] = useState(false);
    const [uploadError, setUploadError] = useState<string | null>(null);
    const [isDragging, setIsDragging] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const MAX_QUOTA = 100 * 1024 * 1024; // 100MB
    const usagePercentage = Math.min(100, (totalStorageUsed / MAX_QUOTA) * 100);

    useEffect(() => {
        if (!uid) return;

        const supabase = createClient();

        const fetchDocuments = async () => {
            const { data, error } = await supabase
                .from('documents')
                .select('*')
                .eq('owner_id', uid)
                .order('uploaded_at', { ascending: false });

            if (!error && data) {
                setDocuments(data);
            }
        };

        fetchDocuments();

        // Set up real-time subscription for updates
        const subscription = supabase
            .channel('public:documents')
            .on('postgres_changes', {
                event: '*',
                schema: 'public',
                table: 'documents',
                filter: `owner_id=eq.${uid}`
            }, () => {
                fetchDocuments();
            })
            .subscribe();

        return () => {
            supabase.removeChannel(subscription);
        };
    }, [uid]);

    const handleUpload = async (file: File) => {
        if (!file) return;

        setIsUploading(true);
        setUploadError(null);

        const formData = new FormData();
        formData.append("file", file);

        try {
            const res = await fetch("/api/documents/upload", {
                method: "POST",
                body: formData
            });

            if (!res.ok) {
                const errorData = await res.json();
                throw new Error(errorData.message || errorData.error || "Upload failed");
            }

            // Success! The API handles the Firestore & Storage updates.
            // The local onSnapshot listener will pick up the record.
        } catch (err: any) {
            setUploadError(err.message);
        } finally {
            setIsUploading(false);
        }
    };

    const handleDelete = async (docObj: DocumentRecord) => {
        if (!confirm(`Are you sure you want to delete "${docObj.file_name}"?`)) return;

        try {
            const supabase = createClient();

            // 1. Delete from Supabase Storage
            const { error: storageError } = await supabase
                .storage
                .from('client_documents')
                .remove([docObj.storage_path]);

            if (storageError) throw storageError;

            // 2. Delete from Postgres Database
            const { error: dbError } = await supabase
                .from('documents')
                .delete()
                .eq('id', docObj.id);

            if (dbError) throw dbError;

            // 3. Update Quota on Profile
            const { data: profile } = await supabase
                .from('client_profiles')
                .select('total_storage_used')
                .eq('id', uid)
                .single();

            if (profile) {
                const current = profile.total_storage_used || 0;
                await supabase
                    .from('client_profiles')
                    .update({ total_storage_used: Math.max(0, current - docObj.file_size) })
                    .eq('id', uid);
            }
        } catch (err) {
            console.error("Delete failed:", err);
            alert("Failed to delete document. Please try again.");
        }
    };

    const formatSize = (bytes: number) => {
        if (bytes === 0) return "0 B";
        const k = 1024;
        const sizes = ["B", "KB", "MB", "GB"];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
    };

    const onDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const onDragLeave = () => setIsDragging(false);

    const onDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
        const file = e.dataTransfer.files[0];
        if (file) handleUpload(file);
    };

    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">Document Vault</h2>
                    <p className="text-zinc-400 mt-2">Securely store and manage your project assets. 100MB limit per client.</p>
                </div>

                <div className="w-full md:w-64 space-y-2">
                    <div className="flex justify-between text-xs font-medium">
                        <span className="text-zinc-500 flex items-center gap-1">
                            <HardDrive className="w-3 h-3" /> Storage Used
                        </span>
                        <span className={usagePercentage > 90 ? "text-red-400" : "text-zinc-400"}>
                            {formatSize(totalStorageUsed)} / 100MB
                        </span>
                    </div>
                    <div className="h-2 w-full bg-zinc-800 rounded-full overflow-hidden border border-white/5">
                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${usagePercentage}%` }}
                            className={`h-full rounded-full ${usagePercentage > 90 ? "bg-red-500" :
                                usagePercentage > 70 ? "bg-amber-500" : "bg-emerald-500"
                                }`}
                        />
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Upload Side */}
                <div className="lg:col-span-1 space-y-6">
                    <div
                        onDragOver={onDragOver}
                        onDragLeave={onDragLeave}
                        onDrop={onDrop}
                        className={`
                            relative border-2 border-dashed rounded-3xl p-8 transition-all flex flex-col items-center justify-center text-center gap-4
                            ${isDragging ? "border-brand-secondary bg-brand-secondary/10" : "border-white/10 bg-[#1e1b26]"}
                            ${isUploading ? "opacity-50 pointer-events-none" : "hover:border-white/20"}
                        `}
                    >
                        <div className={`p-4 rounded-2xl ${isDragging ? "bg-brand-secondary/20" : "bg-zinc-800/50"}`}>
                            {isUploading ? (
                                <Loader2 className="w-8 h-8 text-brand-secondary animate-spin" />
                            ) : (
                                <Upload className={`w-8 h-8 ${isDragging ? "text-brand-secondary" : "text-zinc-500"}`} />
                            )}
                        </div>

                        <div>
                            <p className="font-bold text-lg">
                                {isUploading ? "Uploading..." : "Click or Drag to Upload"}
                            </p>
                            <p className="text-zinc-500 text-sm mt-1">Maximum file size: 50MB</p>
                        </div>

                        <input
                            aria-label="Upload document"
                            type="file"
                            className="hidden"
                            ref={fileInputRef}
                            onChange={(e) => e.target.files?.[0] && handleUpload(e.target.files[0])}
                        />

                        <button
                            disabled={isUploading}
                            onClick={() => fileInputRef.current?.click()}
                            className="px-6 py-2 bg-white text-black rounded-full font-bold text-sm hover:scale-105 active:scale-95 transition-all disabled:opacity-50"
                        >
                            Select File
                        </button>
                    </div>

                    {uploadError && (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="p-4 bg-red-400/10 border border-red-400/20 rounded-2xl flex items-start gap-3 text-red-400 text-sm"
                        >
                            <AlertCircle className="w-5 h-5 flex-shrink-0" />
                            <p>{uploadError}</p>
                            <button
                                onClick={() => setUploadError(null)}
                                title="Dismiss error"
                                aria-label="Dismiss error"
                                className="ml-auto"
                            >
                                <X className="w-4 h-4" />
                            </button>
                        </motion.div>
                    )}
                </div>

                {/* List Side */}
                <div className="lg:col-span-2 space-y-4">
                    <h3 className="text-lg font-bold flex items-center gap-2">
                        <FileText className="w-5 h-5 text-brand-secondary" />
                        My Documents ({documents.length})
                    </h3>

                    <div className="space-y-3">
                        <AnimatePresence mode="popLayout">
                            {documents.length > 0 ? (
                                documents.map((doc) => (
                                    <motion.div
                                        key={doc.id}
                                        layout
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, scale: 0.95 }}
                                        className="p-4 bg-[#14111d] border border-white/5 rounded-2xl flex items-center gap-4 hover:bg-[#1e1b26] transition-all group"
                                    >
                                        <div className="p-3 bg-zinc-900 rounded-xl">
                                            <FileText className="w-5 h-5 text-zinc-400 group-hover:text-brand-secondary transition-colors" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="font-semibold truncate">{doc.file_name}</p>
                                            <div className="flex items-center gap-2 text-[10px] text-zinc-500">
                                                <span>{formatSize(doc.file_size)}</span>
                                                <span className="w-1 h-1 bg-zinc-700 rounded-full" />
                                                <span>{new Date(doc.uploaded_at).toLocaleDateString()}</span>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <button
                                                onClick={() => handleDelete(doc)}
                                                title="Delete document"
                                                aria-label="Delete document"
                                                className="p-2 hover:bg-red-500/10 text-zinc-500 hover:text-red-400 rounded-lg transition-colors"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </motion.div>
                                ))
                            ) : (
                                <div className="p-12 text-center border border-dashed border-white/10 rounded-3xl">
                                    <div className="w-12 h-12 bg-zinc-900 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <FileText className="w-6 h-6 text-zinc-600" />
                                    </div>
                                    <p className="text-zinc-500">Your vault is empty. Upload project files here.</p>
                                </div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </div>
    );
}
