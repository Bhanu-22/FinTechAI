"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { auth } from "@/lib/auth";
import Link from "next/link";
import AntigravityBackground from "@/components/background/AntigravityBackground";
import { Mail, Lock, CheckCircle } from "lucide-react";
import { Suspense } from "react";

function LoginForm() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const router = useRouter();
    const searchParams = useSearchParams();
    const registered = searchParams.get("registered");

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            await auth.login(email, password);

            // Check Role for Redirection
            const user = await auth.getCurrentUser();
            if (user?.role === 'MERCHANT') {
                router.push("/merchants");
            } else if (user?.role === 'GIG_WORKER') {
                router.push("/gig/dashboard");
            } else {
                router.push("/dashboard");
            }
        } catch (err: any) {
            setError(err.message || "Failed to login. Please check your credentials.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <form className="space-y-6" onSubmit={handleLogin}>
            {registered && (
                <div className="bg-green-500/10 border border-green-500/20 text-green-500 p-3 rounded-xl text-sm text-center flex items-center justify-center gap-2">
                    <CheckCircle className="w-4 h-4" />
                    Account created! Please sign in.
                </div>
            )}
            {error && (
                <div className="bg-red-500/10 border border-red-500/20 text-red-500 p-3 rounded-xl text-sm text-center">
                    {error}
                </div>
            )}

            <div className="space-y-2">
                <label className="text-sm font-medium text-[var(--text-main)] ml-1">Email</label>
                <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-main)] opacity-40 w-5 h-5" />
                    <input
                        type="email"
                        placeholder="name@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full bg-white/5 border border-white/10 rounded-xl p-3 pl-10 text-[var(--text-main)] placeholder:text-[var(--text-main)]/30 focus:border-[var(--orb1)] focus:ring-1 focus:ring-[var(--orb1)] outline-none transition-all"
                        required
                    />
                </div>
            </div>

            <div className="space-y-2">
                <label className="text-sm font-medium text-[var(--text-main)] ml-1">Password</label>
                <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-main)] opacity-40 w-5 h-5" />
                    <input
                        type="password"
                        placeholder="••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full bg-white/5 border border-white/10 rounded-xl p-3 pl-10 text-[var(--text-main)] placeholder:text-[var(--text-main)]/30 focus:border-[var(--orb1)] focus:ring-1 focus:ring-[var(--orb1)] outline-none transition-all"
                        required
                    />
                </div>
            </div>

            <div className="flex items-center justify-between text-sm">
                <label className="flex items-center gap-2 cursor-pointer text-[var(--text-main)] opacity-80 hover:opacity-100">
                    <input type="checkbox" className="rounded border-white/20 bg-white/10" />
                    Remember me
                </label>
                <Link href="#" className="text-[var(--orb1)] hover:underline font-medium">
                    Forgot password?
                </Link>
            </div>

            <button
                type="submit"
                disabled={loading}
                className="w-full bg-[var(--orb1)] text-[var(--btn-text)] font-bold py-3 rounded-xl hover:opacity-90 hover:scale-[1.01] transition-all shadow-lg shadow-[var(--orb1)]/20 disabled:opacity-50 disabled:cursor-not-allowed"
            >
                {loading ? "Signing In..." : "Sign In"}
            </button>

            <div className="relative">
                <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-[var(--text-main)]/10"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                    <span className="bg-[var(--bg)] px-2 text-[var(--text-main)] opacity-50">Or continue with</span>
                </div>
            </div>

            <button
                type="button"
                className="w-full bg-white/5 border border-white/10 text-[var(--text-main)] font-medium py-3 rounded-xl hover:bg-white/10 transition-all flex items-center justify-center gap-2"
            >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                        fill="#4285F4"
                    />
                    <path
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                        fill="#34A853"
                    />
                    <path
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                        fill="#FBBC05"
                    />
                    <path
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                        fill="#EA4335"
                    />
                </svg>
                Sign in with Google
            </button>
        </form>
    );
}

export default function LoginPage() {
    return (
        <div className="min-h-screen w-full flex">
            {/* Left Panel - Visual (Desktop Only) */}
            <div className="hidden lg:flex w-1/2 bg-[#0A0F1E] relative items-center justify-center p-12 overflow-hidden">
                {/* Reuse the background */}
                <AntigravityBackground />

                {/* Testimonial Card */}
                <div className="relative z-10 glass-panel p-10 rounded-3xl max-w-lg border border-white/10 shadow-2xl">
                    <div className="flex gap-1 text-yellow-400 mb-6 text-xl">
                        ★★★★★
                    </div>
                    <p className="text-2xl text-white font-medium leading-relaxed italic mb-8">
                        "Artha has completely changed how I manage my daily earnings. I can finally see where my money goes."
                    </p>
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center text-xl">
                            🚖
                        </div>
                        <div>
                            <h4 className="text-white font-bold text-lg">Rajesh Kumar</h4>
                            <p className="text-white/60 text-sm">Uber Driver, Mumbai</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right Panel - Form */}
            <div className="w-full lg:w-1/2 flex items-center justify-center bg-[var(--bg)] p-6 transition-colors duration-700">
                <div className="max-w-md w-full space-y-8 p-8 md:p-10 rounded-2xl md:glass-panel md:border md:border-white/5">

                    {/* Header */}
                    <div className="text-center space-y-2">
                        <h1 className="text-3xl font-bold text-[var(--text-main)]">Welcome back</h1>
                        <p className="text-[var(--text-main)] opacity-60">
                            Enter your details to access your dashboard.
                        </p>
                    </div>

                    {/* Form Wrap with Suspense for useSearchParams */}
                    <Suspense fallback={<div>Loading...</div>}>
                        <LoginForm />
                    </Suspense>

                    <div className="text-center text-sm text-[var(--text-main)] opacity-60">
                        Don't have an account?{" "}
                        <Link href="/signup" className="text-[var(--orb1)] font-bold hover:underline">
                            Sign up
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
