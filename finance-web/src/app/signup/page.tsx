"use client";

import Link from "next/link";
import AntigravityBackground from "@/components/AntigravityBackground";
import { Mail, Lock, User, Briefcase } from "lucide-react";

export default function SignupPage() {
    return (
        <div className="min-h-screen w-full flex">
            {/* Left Panel - Visual (Desktop Only) */}
            <div className="hidden lg:flex w-1/2 bg-[#0A0F1E] relative items-center justify-center p-12 overflow-hidden">
                <AntigravityBackground />

                {/* Testimonial Card */}
                <div className="relative z-10 glass-panel p-10 rounded-3xl max-w-lg border border-white/10 shadow-2xl">
                    <div className="flex gap-1 text-yellow-400 mb-6 text-xl">
                        ★★★★★
                    </div>
                    <p className="text-2xl text-white font-medium leading-relaxed italic mb-8">
                        "I finally have proof of income. Got my first credit card thanks to Artha."
                    </p>
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center text-xl">
                            🎨
                        </div>
                        <div>
                            <h4 className="text-white font-bold text-lg">Priya Sharma</h4>
                            <p className="text-white/60 text-sm">Freelance Designer</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right Panel - Form */}
            <div className="w-full lg:w-1/2 flex items-center justify-center bg-[var(--bg)] p-6 transition-colors duration-700">
                <div className="max-w-md w-full space-y-8 p-8 md:p-10 rounded-2xl md:glass-panel md:border md:border-white/5">

                    {/* Header */}
                    <div className="text-center space-y-2">
                        <h1 className="text-3xl font-bold text-[var(--text-main)]">Create an account</h1>
                        <p className="text-[var(--text-main)] opacity-60">
                            Join 10,000+ Indians building financial freedom.
                        </p>
                    </div>

                    {/* Form */}
                    <form className="space-y-5">
                        {/* Full Name */}
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-[var(--text-main)] ml-1">Full Name</label>
                            <div className="relative">
                                <User className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-main)] opacity-40 w-5 h-5" />
                                <input
                                    type="text"
                                    placeholder="Rahul Singh"
                                    className="w-full bg-white/5 border border-white/10 rounded-xl p-3 pl-10 text-[var(--text-main)] placeholder:text-[var(--text-main)]/30 focus:border-[var(--orb1)] focus:ring-1 focus:ring-[var(--orb1)] outline-none transition-all"
                                />
                            </div>
                        </div>

                        {/* Email */}
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-[var(--text-main)] ml-1">Email</label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-main)] opacity-40 w-5 h-5" />
                                <input
                                    type="email"
                                    placeholder="name@example.com"
                                    className="w-full bg-white/5 border border-white/10 rounded-xl p-3 pl-10 text-[var(--text-main)] placeholder:text-[var(--text-main)]/30 focus:border-[var(--orb1)] focus:ring-1 focus:ring-[var(--orb1)] outline-none transition-all"
                                />
                            </div>
                        </div>

                        {/* Account Type */}
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-[var(--text-main)] ml-1">I am a...</label>
                            <div className="relative">
                                <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-main)] opacity-40 w-5 h-5" />
                                <select
                                    className="w-full bg-white/5 border border-white/10 rounded-xl p-3 pl-10 text-[var(--text-main)] focus:border-[var(--orb1)] focus:ring-1 focus:ring-[var(--orb1)] outline-none transition-all appearance-none cursor-pointer"
                                >
                                    <option value="" disabled className="bg-gray-800 text-white">Select your role</option>
                                    <option value="gig_worker" className="bg-gray-800 text-white">Gig Worker (Driver/Delivery)</option>
                                    <option value="merchant" className="bg-gray-800 text-white">Merchant / Shop Owner</option>
                                    <option value="freelancer" className="bg-gray-800 text-white">Freelancer</option>
                                </select>
                                {/* Custom arrow if needed, but native is usually fine for MVP. Or simple CSS chevron. */}
                                <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none opacity-50 text-[var(--text-main)]">
                                    ▼
                                </div>
                            </div>
                        </div>

                        {/* Password */}
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-[var(--text-main)] ml-1">Password</label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-main)] opacity-40 w-5 h-5" />
                                <input
                                    type="password"
                                    placeholder="Create a strong password"
                                    className="w-full bg-white/5 border border-white/10 rounded-xl p-3 pl-10 text-[var(--text-main)] placeholder:text-[var(--text-main)]/30 focus:border-[var(--orb1)] focus:ring-1 focus:ring-[var(--orb1)] outline-none transition-all"
                                />
                            </div>
                        </div>

                        <button
                            type="button"
                            className="w-full bg-[var(--orb1)] text-[var(--btn-text)] font-bold py-3 rounded-xl hover:opacity-90 hover:scale-[1.01] transition-all shadow-lg shadow-[var(--orb1)]/20 mt-4"
                        >
                            Create Account
                        </button>
                    </form>

                    <div className="text-center text-sm text-[var(--text-main)] opacity-60">
                        Already have an account?{" "}
                        <Link href="/login" className="text-[var(--orb1)] font-bold hover:underline">
                            Sign In
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
