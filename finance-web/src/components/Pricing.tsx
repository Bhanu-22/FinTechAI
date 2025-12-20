"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import clsx from "clsx";
import FeatureModal from "./FeatureModal";
import { Check } from "lucide-react";

export default function Pricing() {
    const [isYearly, setIsYearly] = useState(false);
    const [activeModal, setActiveModal] = useState<"Gig Worker" | "Merchant Pro" | "Freelance OS" | null>(null);

    const plans = [
        {
            title: "Gig Worker",
            price: isYearly ? "₹1999" : "₹200",
            period: isYearly ? "/year" : "/month",
            color: "#22c55e", // Green
            buttonColor: "bg-[#22c55e]",
            buttonText: "Download App",
            features: ["Income tracking", "Certificate generation", "Basic support"],
            tier: "Gig Worker",
        },
        {
            title: "Merchant Pro",
            price: isYearly ? "₹5999" : "₹599",
            period: isYearly ? "/year" : "/month",
            color: "#f97316", // Orange
            buttonColor: "bg-[#f97316]",
            buttonText: "Start Free Trial",
            features: ["Voice inventory", "Bill scanning", "GST filing support"],
            tier: "Merchant Pro",
        },
        {
            title: "Freelance OS",
            price: isYearly ? "₹9999" : "₹999",
            period: isYearly ? "/year" : "/month",
            color: "#a855f7", // Purple
            buttonColor: "bg-[#a855f7]",
            buttonText: "Try Dashboard",
            features: ["AI Expense categorization", "Tax reports", "Multi-client invoicing"],
            badge: "Most Popular",
            tier: "Freelance OS",
        },
    ];

    return (
        <section className="container mx-auto px-6 relative z-10 py-32">
            <div className="text-center mb-24 space-y-6">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="text-4xl md:text-5xl font-black text-[var(--text-main)] tracking-tight"
                >
                    Simple, Transparent Pricing
                </motion.h2>
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
                    className="text-[var(--text-main)] opacity-70 text-xl font-medium"
                >
                    No hidden charges. Cancel anytime.
                </motion.p>

                {/* Toggle */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                    className="flex items-center justify-center gap-6 mt-10"
                >
                    <span className={clsx("text-base font-bold transition-colors duration-300", !isYearly ? "text-[var(--text-main)]" : "text-[var(--text-main)] opacity-50")}>
                        Monthly
                    </span>
                    <button
                        onClick={() => setIsYearly(!isYearly)}
                        className="w-20 h-10 rounded-full bg-white/40 backdrop-blur-md border border-white/50 relative p-1 transition-all duration-300 hover:bg-white/50 cursor-pointer shadow-inner"
                        aria-label="Toggle pricing period"
                    >
                        <motion.div
                            animate={{ x: isYearly ? 40 : 0 }}
                            className="w-8 h-8 rounded-full bg-white shadow-lg border border-black/5"
                            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }} // Calm cubic-bezier
                        />
                    </button>
                    <span className={clsx("text-base font-bold transition-colors duration-300 flex items-center gap-2", isYearly ? "text-[var(--text-main)]" : "text-[var(--text-main)] opacity-50")}>
                        Yearly <span className="text-[var(--grad-1)] text-xs bg-[var(--grad-1)]/10 px-2 py-1 rounded-full font-black">SAVE 20%</span>
                    </span>
                </motion.div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto items-start">
                {plans.map((plan, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{ delay: i * 0.1, duration: 0.8, ease: [0.22, 1, 0.36, 1] }} // Calm easing
                        whileHover={{ y: -8, scale: 1.01, transition: { duration: 0.4, ease: "easeOut" } }}
                        className="glass-panel p-10 rounded-[2.5rem] relative flex flex-col h-full bg-white/60 backdrop-blur-xl border border-white/50 shadow-xl hover:shadow-2xl transition-all duration-500"
                    >
                        {plan.badge && (
                            <div className="absolute -top-4 left-0 right-0 flex justify-center">
                                <span
                                    className="px-6 py-2 rounded-full text-xs font-black text-white uppercase tracking-widest shadow-xl ring-4 ring-white/50"
                                    style={{ backgroundColor: plan.color }}
                                >
                                    {plan.badge}
                                </span>
                            </div>
                        )}

                        <div className="mb-8">
                            <h3 className="text-xl font-bold text-[var(--text-main)] mb-4 flex items-center gap-2">
                                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: plan.color }} />
                                {plan.title}
                            </h3>
                            <div className="flex items-baseline gap-1">
                                <span className="text-5xl font-black text-[var(--text-main)] tracking-tight">
                                    {plan.price}
                                </span>
                                <span className="text-[var(--text-main)] opacity-60 text-base font-medium">
                                    {plan.period}
                                </span>
                            </div>
                        </div>

                        <ul className="space-y-4 mb-10 flex-grow">
                            {plan.features.map((feat, j) => (
                                <li key={j} className="flex items-start gap-3 text-[var(--text-main)] opacity-80 text-sm font-medium leading-relaxed">
                                    <div className="mt-0.5 min-w-5 h-5 rounded-full flex items-center justify-center bg-black/5">
                                        <Check className="w-3 h-3" style={{ color: plan.color }} strokeWidth={4} />
                                    </div>
                                    {feat}
                                </li>
                            ))}
                        </ul>

                        <div className="space-y-4 mt-auto">
                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                transition={{ duration: 0.2 }}
                                className="w-full py-4 rounded-2xl font-bold text-white transition-all shadow-lg hover:shadow-xl relative overflow-hidden group"
                                style={{ backgroundColor: plan.color }}
                            >
                                <span className="relative z-10">{plan.buttonText}</span>
                                <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                            </motion.button>

                            <button
                                onClick={() => setActiveModal(plan.tier as "Gig Worker" | "Merchant Pro" | "Freelance OS")}
                                className="w-full py-2 text-sm font-bold text-[var(--text-main)] opacity-50 hover:opacity-100 hover:text-[var(--orb1)] transition-all flex items-center justify-center gap-1 group"
                            >
                                Learn More
                                <span className="group-hover:translate-x-1 transition-transform">→</span>
                            </button>
                        </div>
                    </motion.div>
                ))}
            </div>

            <FeatureModal
                isOpen={activeModal !== null}
                onClose={() => setActiveModal(null)}
                tier={activeModal}
            />
        </section>
    );
}
