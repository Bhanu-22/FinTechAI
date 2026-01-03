"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import clsx from "clsx";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

type Tab = "merchant" | "freelancer";

const features = {
    merchant: [
        {
            title: "Voice Inventory",
            desc: "Speak to add stock. No typing needed.",
            icon: "🎙️",
            href: "/merchants#voice-inventory",
        },
        {
            title: "Smart Khata Ledger",
            desc: "Track daily credit/debit automatically.",
            icon: "📒",
            href: "/merchants#smart-khata",
        },
        {
            title: "WhatsApp Billing",
            desc: "Send invoices directly to customers on WA.",
            icon: "💬",
            href: "/merchants#whatsapp-billing",
        },
        {
            title: "Expiry Alerts",
            desc: "Get notified before products go bad.",
            icon: "⏰",
            href: "/merchants#expiry-alerts",
        },
        {
            title: "GST Reports",
            desc: "One-click GSTR-1 & GSTR-3B generation.",
            icon: "📊",
            href: "/merchants#merchant-gst",
        }
    ],
    freelancer: [
        {
            title: "Global Invoicing",
            desc: "Multi-currency invoices (USD, EUR, GBP).",
            icon: "🌍",
            href: "/freelancers#global-invoicing",
        },
        {
            title: "Auto-Expense Swipe",
            desc: "Tinder-style swipe to categorize business expenses.",
            icon: "💳",
            href: "/freelancers#expense-swipe",
        },
        {
            title: "Project Time Tracking",
            desc: "Bill clients accurately for every minute.",
            icon: "⏱️",
            href: "/freelancers#time-tracking",
        },
        {
            title: "Legal Contracts",
            desc: "AI-generated freelance agreements.",
            icon: "⚖️",
            href: "/freelancers#legal-contracts",
        },
        {
            title: "Tax Saver AI",
            desc: "Find deductions you didn't know existed.",
            icon: "💰",
            href: "/freelancers#tax-saver",
        }
    ]
};

export default function FeaturesGrid() {
    const [activeTab, setActiveTab] = useState<Tab>("merchant");

    return (
        <section className="container mx-auto px-6 py-32 relative z-10">
            <div className="text-center mb-20 space-y-8">
                <h2 className="text-4xl md:text-5xl font-black text-[var(--text-main)] tracking-tight">
                    Tools designed for <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--grad-1)] via-[var(--grad-2)] to-[var(--grad-3)]">You</span>
                </h2>

                {/* Toggle Switch */}
                <div className="inline-flex bg-white/40 backdrop-blur-xl p-2 rounded-full border border-white/40 shadow-xl relative isolate">
                    <button
                        onClick={() => setActiveTab("merchant")}
                        className={clsx(
                            "px-10 py-4 rounded-full text-base font-bold transition-colors duration-200 relative z-10",
                            activeTab === "merchant" ? "text-white" : "text-[var(--text-main)] opacity-60 hover:opacity-100"
                        )}
                    >
                        For Merchants
                    </button>
                    <button
                        onClick={() => setActiveTab("freelancer")}
                        className={clsx(
                            "px-10 py-4 rounded-full text-base font-bold transition-colors duration-200 relative z-10",
                            activeTab === "freelancer" ? "text-white" : "text-[var(--text-main)] opacity-60 hover:opacity-100"
                        )}
                    >
                        For Freelancers
                    </button>

                    {/* Animated Background Pill */}
                    <motion.div
                        className="absolute top-2 bottom-2 bg-[var(--text-main)] rounded-full shadow-lg z-0"
                        layoutId="activeTabPill"
                        initial={false}
                        animate={{
                            left: activeTab === "merchant" ? "8px" : "50%",
                            width: "calc(50% - 8px)",
                            x: activeTab === "merchant" ? 0 : 4 // subtle nudge adjustment if needed
                        }}
                        transition={{ type: "spring", stiffness: 300, damping: 25 }}
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto min-h-[600px]">
                <AnimatePresence mode="popLayout" initial={false}>
                    {features[activeTab].map((feature, i) => (
                        <motion.div
                            key={feature.title}
                            layout
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            transition={{ duration: 0.4, delay: i * 0.05, ease: [0.22, 1, 0.36, 1] }}
                            className="h-full"
                        >
                            <Link href={feature.href} className="group h-full block">
                                <motion.div
                                    whileHover={{ y: -5, scale: 1.02 }}
                                    className="glass-panel p-10 rounded-[2.5rem] h-full flex flex-col justify-between bg-white/60 backdrop-blur-2xl border border-white/50 shadow-sm hover:shadow-2xl hover:shadow-[var(--grad-1)]/10 transition-all duration-300"
                                >
                                    <div className="space-y-6">
                                        <div className="text-6xl filter drop-shadow-sm group-hover:scale-110 transition-transform duration-300 origin-left">
                                            {feature.icon}
                                        </div>
                                        <div>
                                            <h3 className="text-2xl font-bold text-[var(--text-main)] mb-3">
                                                {feature.title}
                                            </h3>
                                            <p className="text-[var(--text-main)] opacity-60 text-base leading-relaxed font-medium">
                                                {feature.desc}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="mt-8 flex items-center gap-2 text-sm font-bold text-[var(--text-main)] opacity-40 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300">
                                        Learn more <ArrowRight className="w-4 h-4" />
                                    </div>
                                </motion.div>
                            </Link>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>
        </section>
    );
}
