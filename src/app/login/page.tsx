"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const router = useRouter();
    const supabase = createClient();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const { error: signInError } = await supabase.auth.signInWithPassword({
                email,
                password,
            });

            if (signInError) {
                setError(signInError.message || "Invalid email or password. Please try again or contact support.");
            } else {
                router.push("/client-portal");
                router.refresh();
            }
        } catch (err) {
            console.error(err);
            setError("Authentication failed. Please try again or contact support.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-zinc-950 p-6 font-sans">
            <div className="w-full max-w-md bg-zinc-900 border border-zinc-800 rounded-xl p-8 shadow-2xl">
                <div className="text-center mb-10">
                    <h1 className="text-3xl font-bold bg-gradient-to-r from-teal-400 to-amber-200 bg-clip-text text-transparent">
                        Client Portal
                    </h1>
                    <p className="text-zinc-400 mt-2 text-sm">
                        Sign in with your provided credentials to access your dashboard.
                    </p>
                </div>

                <form onSubmit={handleLogin} className="space-y-6">
                    {error && (
                        <div className="bg-red-500/10 border border-red-500/50 text-red-500 text-sm px-4 py-3 rounded-lg text-center">
                            {error}
                        </div>
                    )}

                    <div>
                        <label className="block text-sm font-medium text-zinc-300 mb-2">
                            Email Address
                        </label>
                        <input
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-3 text-white placeholder-zinc-600 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
                            placeholder="client@example.com"
                        />
                    </div>

                    <div className="relative">
                        <label className="block text-sm font-medium text-zinc-300 mb-2">
                            Access Token (Password)
                        </label>
                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-3 text-white placeholder-zinc-600 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all pr-12"
                                placeholder="••••••••"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute inset-y-0 right-0 pr-4 flex items-center text-zinc-500 hover:text-teal-400 transition-colors"
                                title={showPassword ? "Hide password" : "Show password"}
                            >
                                {showPassword ? (
                                    <EyeOff className="w-5 h-5" />
                                ) : (
                                    <Eye className="w-5 h-5" />
                                )}
                            </button>
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className={`w-full py-3 px-4 rounded-lg font-medium text-zinc-950 transition-all duration-300 flex items-center justify-center gap-2 ${loading
                            ? "bg-teal-600/50 cursor-not-allowed"
                            : "bg-gradient-to-r from-teal-400 to-teal-500 hover:from-teal-300 hover:to-teal-400 hover:shadow-[0_0_20px_rgba(45,212,191,0.3)]"
                            }`}
                    >
                        {loading ? "Authenticating..." : "Secure Login"}
                    </button>
                </form>

                <div className="mt-8 text-center space-y-4">
                    <p className="text-zinc-500 text-xs">
                        Notice: Access to this portal is by invitation only. If you are an active client and require access, please contact your account manager.
                    </p>
                    <p className="text-zinc-600 text-[10px] leading-relaxed max-w-xs mx-auto">
                        <strong>Privacy Notice:</strong> Logging in sets a secure, essential HTTP-only session cookie to authenticate your identity and protect your data. By authenticating, you consent to our <a href="#" className="underline hover:text-zinc-400">Privacy Policy</a> and <a href="#" className="underline hover:text-zinc-400">Terms of Service</a>.
                    </p>
                </div>
            </div>
        </div>
    );
}
