"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Wallet, Calendar, DollarSign, Loader2, Target } from "lucide-react";
import { motion } from "framer-motion";

export default function AddEarningsPage() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        date: new Date().toISOString().split('T')[0],
        earnings_amount: "",
        platform: "MANUAL"
    });

    useEffect(() => {
        // Enforce Theme
        document.documentElement.setAttribute("data-theme", "gig-dark");
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const token = localStorage.getItem("access_token");
            if (!token) {
                router.replace('/login');
                return;
            }

            const res = await fetch('http://127.0.0.1:8000/api/gig/shifts/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `JWT ${token}`
                },
                body: JSON.stringify({
                    date: formData.date,
                    earnings_amount: parseFloat(formData.earnings_amount),
                    platform: formData.platform
                })
            });

            if (res.ok) {
                // Success! Go back to dashboard to see the celebration 🎉
                router.push('/gig/dashboard');
            } else {
                const errorData = await res.text();
                console.error(`Failed to log shift. Status: ${res.status}. Response: ${errorData}`);
            }
        } catch (error) {
            console.error("Error:", error);
        } finally {
            setIsLoading(false);
        }
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
                <h1 className="text-2xl font-bold">Add Earnings</h1>
            </div>

            <motion.form
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                onSubmit={handleSubmit}
                className="bg-[var(--bg-card)] p-8 rounded-3xl border border-[#1F453F] space-y-6"
            >
                {/* Date Input */}
                <div className="space-y-2">
                    <label className="text-sm font-bold text-[var(--text-muted)] uppercase tracking-wider flex items-center gap-2">
                        <Calendar className="w-4 h-4" /> Shift Date
                    </label>
                    <input
                        type="date"
                        required
                        value={formData.date}
                        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                        className="w-full bg-[#0B1E1B] border border-[#1F453F] rounded-xl p-4 text-white focus:outline-none focus:border-[var(--gig-primary)] transition-colors accent-[var(--gig-primary)]"
                    />
                </div>

                {/* Amount Input */}
                <div className="space-y-2">
                    <label className="text-sm font-bold text-[var(--text-muted)] uppercase tracking-wider flex items-center gap-2">
                        <DollarSign className="w-4 h-4" /> Earnings Amount (₹)
                    </label>
                    <div className="relative">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--text-muted)] font-bold text-lg">₹</span>
                        <input
                            type="number"
                            required
                            min="0"
                            step="0.01"
                            placeholder="0.00"
                            value={formData.earnings_amount}
                            onChange={(e) => setFormData({ ...formData, earnings_amount: e.target.value })}
                            className="w-full bg-[#0B1E1B] border border-[#1F453F] rounded-xl p-4 pl-10 text-3xl font-bold text-white placeholder-gray-700 focus:outline-none focus:border-[var(--gig-primary)] transition-colors"
                        />
                    </div>
                </div>

                {/* Platform Selection */}
                <div className="space-y-2">
                    <label className="text-sm font-bold text-[var(--text-muted)] uppercase tracking-wider flex items-center gap-2">
                        <Target className="w-4 h-4" />
                        Platform
                    </label>

                    <select
                        value={formData.platform}
                        onChange={(e) =>
                            setFormData({ ...formData, platform: e.target.value })
                        }
                        className="w-full bg-[#0B1E1B] border border-[#1F453F] rounded-xl p-4 text-white focus:outline-none focus:border-[var(--gig-primary)] transition-colors"
                    >
                        <option value="MANUAL">✏️ Manual Entry</option>
                        <option value="UBER">🚗 Uber</option>
                        <option value="ZOMATO">🍔 Zomato</option>
                        <option value="SWIGGY">🥘 Swiggy</option>
                        <option value="RAPIDO">🏍️ Rapido</option>
                    </select>
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-[var(--gig-primary)] text-[#0B1E1B] font-bold py-4 rounded-xl shadow-[0_0_20px_rgba(0,229,153,0.3)] hover:shadow-[0_0_30px_rgba(0,229,153,0.5)] active:scale-[0.98] transition-all flex items-center justify-center gap-2 group"
                >
                    {isLoading ? (
                        <Loader2 className="w-5 h-5 animate-spin" />
                    ) : (
                        <>
                            <Wallet className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                            <span>Confirm Earnings</span>
                        </>
                    )}
                </button>

            </motion.form>
        </main>
    );
}
