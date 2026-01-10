"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, MessageSquare, Shield, AlertCircle } from "lucide-react";
import { motion } from "framer-motion";

export default function SettingsPage() {
    const router = useRouter();
    const [smsEnabled, setSmsEnabled] = useState(false);

    useEffect(() => {
        // Enforce Theme
        document.documentElement.setAttribute("data-theme", "gig-dark");

        // Load preference
        const consent = localStorage.getItem("sms_auto_import");
        setSmsEnabled(consent === "enabled");
    }, []);

    const toggleSMS = () => {
        const newState = !smsEnabled;
        setSmsEnabled(newState);
        localStorage.setItem("sms_auto_import", newState ? "enabled" : "declined");
    };

    return (
        <main className="p-6 md:p-8 min-h-screen max-w-2xl mx-auto text-white">
            {/* Header */}
            <div className="flex items-center gap-4 mb-8">
                <button
                    onClick={() => router.back()}
                    className="p-2 rounded-xl bg-[var(--bg-card)] hover:bg-[#1F453F] text-[var(--text-muted)] hover:text-white transition-colors"
                >
                    <ArrowLeft className="w-5 h-5" />
                </button>
                <h1 className="text-2xl font-bold">Settings</h1>
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
            >
                {/* SMS Auto-Import Section */}
                <section className="bg-[var(--bg-card)] p-6 rounded-3xl border border-[#1F453F]">
                    <div className="flex items-start gap-4">
                        <div className="p-3 rounded-xl bg-[#1F453F] text-[var(--gig-primary)]">
                            <MessageSquare className="w-6 h-6" />
                        </div>
                        <div className="flex-1">
                            <h2 className="text-lg font-bold mb-1">Auto-Import Earnings</h2>
                            <p className="text-sm text-[var(--text-muted)] mb-4">
                                Automatically detect earnings from platform SMS messages.
                                We never read your personal messages.
                            </p>

                            <div className="flex items-center justify-between bg-[#0B1E1B] p-4 rounded-xl border border-[#1F453F]">
                                <span className="font-bold text-white">Enable Auto-Import</span>
                                <button
                                    onClick={toggleSMS}
                                    className={`w-14 h-8 rounded-full p-1 transition-colors ${smsEnabled ? "bg-[var(--gig-primary)]" : "bg-[#1F453F]"
                                        }`}
                                >
                                    <div
                                        className={`w-6 h-6 rounded-full bg-white shadow-sm transition-transform ${smsEnabled ? "translate-x-6" : "translate-x-0"
                                            }`}
                                    />
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="mt-6 flex items-center gap-2 text-xs text-[var(--text-muted)] bg-[#1F453F]/50 p-3 rounded-lg">
                        <Shield className="w-4 h-4 shrink-0" />
                        <p>Privacy First: Data is processed locally on your device.</p>
                    </div>
                </section>

                {/* Placeholder for other settings */}
                <section className="bg-[var(--bg-card)] p-6 rounded-3xl border border-[#1F453F] opacity-50">
                    <div className="flex items-center gap-2 mb-4 text-[var(--text-muted)]">
                        <AlertCircle className="w-5 h-5" />
                        <h2 className="font-bold">More Settings Coming Soon</h2>
                    </div>
                    <p className="text-sm text-[var(--text-muted)]">
                        Profile management, notification preferences, and bank account linking will be available in future updates.
                    </p>
                </section>
            </motion.div>
        </main>
    );
}
