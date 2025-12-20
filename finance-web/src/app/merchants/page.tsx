"use client";

import Link from "next/link";
import { ArrowLeft, Mic, BookOpen, MessageCircle, Clock, FileText, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";

const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
};

const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.2
        }
    }
};

export default function MerchantsPage() {
    return (
        <main className="min-h-screen relative overflow-x-hidden">
            {/* Navigation */}
            <motion.nav
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6 }}
                className="fixed top-0 w-full z-50 px-6 py-4 flex justify-between items-center glass-nav"
            >
                <Link href="/" className="flex items-center gap-2 text-[var(--text-main)] font-bold hover:opacity-70 transition-opacity">
                    <ArrowLeft className="w-5 h-5" />
                    Back to Home
                </Link>
                <span className="font-black text-xl tracking-tight hidden md:block text-[var(--text-main)]">ARTHA FOR MERCHANTS</span>
                <Link href="/signup" className="px-5 py-2 rounded-full bg-[var(--text-main)] text-white text-sm font-bold shadow-lg hover:scale-105 transition-transform">
                    Get App
                </Link>
            </motion.nav>

            {/* Hero Section */}
            <section className="min-h-[90vh] flex flex-col items-center justify-center text-center px-6 pt-32 pb-20">
                <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={staggerContainer}
                    className="max-w-4xl mx-auto space-y-8"
                >
                    <motion.h1 variants={fadeInUp} className="text-6xl md:text-8xl font-black text-[var(--text-main)] tracking-tighter leading-[1.1]">
                        Run Your Dukan <br /><span className="text-[var(--grad-1)]">On Autopilot</span>
                    </motion.h1>
                    <motion.p variants={fadeInUp} className="text-xl md:text-2xl text-[var(--text-main)] opacity-70 max-w-2xl mx-auto leading-relaxed">
                        From opening the shutter to filing GST—Artha handles the boring stuff so you can focus on customers.
                    </motion.p>
                </motion.div>
            </section>

            {/* Section 1: Morning */}
            <motion.section
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={staggerContainer}
                id="voice-inventory"
                className="min-h-screen flex items-center py-32 px-6"
            >
                <div className="container mx-auto grid md:grid-cols-2 gap-16 items-center max-w-6xl">
                    <motion.div variants={fadeInUp} className="order-2 md:order-1 space-y-8">
                        <div className="w-20 h-20 rounded-3xl bg-[var(--grad-1)]/20 flex items-center justify-center text-[var(--grad-1)]">
                            <Mic className="w-10 h-10" />
                        </div>
                        <div className="space-y-4">
                            <h2 className="text-5xl font-bold text-[var(--text-main)]">Muh se bolo, <br />Stock add karo.</h2>
                            <h3 className="text-2xl font-medium text-[var(--grad-1)]">Morning Inventory</h3>
                        </div>
                        <p className="text-xl text-[var(--text-main)] opacity-80 leading-relaxed">
                            Your hands are busy moving boxes. Don't type. Just say "50kg Ashirvaad Atta arrived". <br /><br />
                            Our AI is trained on Indian accents and works even in noisy markets. It auto-categorizes items and updates stock levels instantly.
                        </p>
                        <ul className="space-y-3">
                            <li className="flex items-center gap-3 text-[var(--text-main)] font-medium">
                                <CheckCircle2 className="w-5 h-5 text-[var(--grad-1)]" /> Works Offline
                            </li>
                            <li className="flex items-center gap-3 text-[var(--text-main)] font-medium">
                                <CheckCircle2 className="w-5 h-5 text-[var(--grad-1)]" /> Supports Hindi/Hinglish
                            </li>
                            <li className="flex items-center gap-3 text-[var(--text-main)] font-medium">
                                <CheckCircle2 className="w-5 h-5 text-[var(--grad-1)]" /> Barcode scanner alternative
                            </li>
                        </ul>
                    </motion.div>
                    <motion.div variants={fadeInUp} className="order-1 md:order-2">
                        <div className="glass-panel p-8 rounded-[3rem] aspect-square flex items-center justify-center bg-white/30 backdrop-blur-xl border border-white/40 shadow-2xl skew-y-3 hover:skew-y-0 transition-transform duration-700">
                            <span className="text-[10rem]">🎙️</span>
                        </div>
                    </motion.div>
                </div>
            </motion.section>

            {/* Section 2: Afternoon */}
            <motion.section
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={staggerContainer}
                id="smart-khata"
                className="min-h-screen flex items-center py-32 px-6 bg-white/30 backdrop-blur-sm"
            >
                <div className="container mx-auto grid md:grid-cols-2 gap-16 items-center max-w-6xl">
                    <motion.div variants={fadeInUp} className="order-1">
                        <div className="glass-panel p-8 rounded-[3rem] aspect-square flex items-center justify-center bg-white/30 backdrop-blur-xl border border-white/40 shadow-2xl -skew-y-3 hover:skew-y-0 transition-transform duration-700">
                            <span className="text-[10rem]">📒</span>
                        </div>
                    </motion.div>
                    <motion.div variants={fadeInUp} className="order-2 space-y-8">
                        <div className="w-20 h-20 rounded-3xl bg-[var(--grad-2)]/20 flex items-center justify-center text-[var(--grad-2)]">
                            <BookOpen className="w-10 h-10" />
                        </div>
                        <div className="space-y-4">
                            <h2 className="text-5xl font-bold text-[var(--text-main)]">Recover Udhaar <br />3x Faster.</h2>
                            <h3 className="text-2xl font-medium text-[var(--grad-2)]">Smart Khata Ledger</h3>
                        </div>
                        <p className="text-xl text-[var(--text-main)] opacity-80 leading-relaxed">
                            Stop chasing customers. Artha tracks every rupee of credit given. <br /><br />
                            Set auto-reminders, and we send a polite WhatsApp message with a payment link. It’s professional, so you maintain relationships while getting paid.
                        </p>
                    </motion.div>
                </div>
            </motion.section>

            {/* Section 3: Peak Hours */}
            <motion.section
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={staggerContainer}
                id="whatsapp-billing"
                className="min-h-screen flex items-center py-32 px-6"
            >
                <div className="container mx-auto grid md:grid-cols-2 gap-16 items-center max-w-6xl">
                    <motion.div variants={fadeInUp} className="order-2 md:order-1 space-y-8">
                        <div className="w-20 h-20 rounded-3xl bg-[var(--grad-3)]/20 flex items-center justify-center text-[var(--grad-3)]">
                            <MessageCircle className="w-10 h-10" />
                        </div>
                        <div className="space-y-4">
                            <h2 className="text-5xl font-bold text-[var(--text-main)]">Checkout in <br />3 Seconds.</h2>
                            <h3 className="text-2xl font-medium text-[var(--grad-3)]">WhatsApp Billing</h3>
                        </div>
                        <p className="text-xl text-[var(--text-main)] opacity-80 leading-relaxed">
                            Thermal printers jam. Paper fades. <br /><br />
                            Send professional, GST-compliant digital bills directly to your customer's WhatsApp. They get a permanent record, and you save ₹5,000/year on paper rolls.
                        </p>
                    </motion.div>
                    <motion.div variants={fadeInUp} className="order-1 md:order-2">
                        <div className="glass-panel p-8 rounded-[3rem] aspect-square flex items-center justify-center bg-white/30 backdrop-blur-xl border border-white/40 shadow-2xl skew-y-3 hover:skew-y-0 transition-transform duration-700">
                            <span className="text-[10rem]">💬</span>
                        </div>
                    </motion.div>
                </div>
            </motion.section>

            {/* Section 4: Inventory Health */}
            <motion.section
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={staggerContainer}
                id="expiry-alerts"
                className="min-h-screen flex items-center py-32 px-6 bg-white/30 backdrop-blur-sm"
            >
                <div className="container mx-auto grid md:grid-cols-2 gap-16 items-center max-w-6xl">
                    <motion.div variants={fadeInUp} className="order-1">
                        <div className="glass-panel p-8 rounded-[3rem] aspect-square flex items-center justify-center bg-white/30 backdrop-blur-xl border border-white/40 shadow-2xl -skew-y-3 hover:skew-y-0 transition-transform duration-700">
                            <span className="text-[10rem]">⏰</span>
                        </div>
                    </motion.div>
                    <motion.div variants={fadeInUp} className="order-2 space-y-8">
                        <div className="w-20 h-20 rounded-3xl bg-[var(--grad-1)]/20 flex items-center justify-center text-[var(--grad-1)]">
                            <Clock className="w-10 h-10" />
                        </div>
                        <div className="space-y-4">
                            <h2 className="text-5xl font-bold text-[var(--text-main)]">Zero Wastage <br />Policy.</h2>
                            <h3 className="text-2xl font-medium text-[var(--grad-1)]">Expiry Alerts</h3>
                        </div>
                        <p className="text-xl text-[var(--text-main)] opacity-80 leading-relaxed">
                            We track the shelf life of every batch. <br /><br />
                            Get alerted 30 days before items expire so you can run a "Clearance Sale" instead of throwing money in the trash.
                        </p>
                    </motion.div>
                </div>
            </motion.section>

            {/* Section 5: Month End */}
            <motion.section
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={staggerContainer}
                id="merchant-gst"
                className="min-h-screen flex items-center py-32 px-6"
            >
                <div className="container mx-auto grid md:grid-cols-2 gap-16 items-center max-w-6xl">
                    <motion.div variants={fadeInUp} className="order-2 md:order-1 space-y-8">
                        <div className="w-20 h-20 rounded-3xl bg-[var(--grad-2)]/20 flex items-center justify-center text-[var(--grad-2)]">
                            <FileText className="w-10 h-10" />
                        </div>
                        <div className="space-y-4">
                            <h2 className="text-5xl font-bold text-[var(--text-main)]">The 1-Click <br />GST Filing.</h2>
                            <h3 className="text-2xl font-medium text-[var(--grad-2)]">Month End</h3>
                        </div>
                        <p className="text-xl text-[var(--text-main)] opacity-80 leading-relaxed">
                            No more scrambling for bills on the 20th. <br /><br />
                            Artha auto-compiles your GSTR-1 and GSTR-3B reports daily. Send a clean Excel sheet to your CA, or file directly from the app.
                        </p>
                    </motion.div>
                    <motion.div variants={fadeInUp} className="order-1 md:order-2">
                        <div className="glass-panel p-8 rounded-[3rem] aspect-square flex items-center justify-center bg-white/30 backdrop-blur-xl border border-white/40 shadow-2xl skew-y-3 hover:skew-y-0 transition-transform duration-700">
                            <span className="text-[10rem]">📊</span>
                        </div>
                    </motion.div>
                </div>
            </motion.section>

            {/* CTA Footer */}
            <motion.section
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
                className="py-40 px-6 text-center"
            >
                <h2 className="text-4xl font-bold text-[var(--text-main)] mb-8">Ready to upgrade your shop?</h2>
                <Link href="/signup" className="px-12 py-5 rounded-full bg-[var(--text-main)] text-white text-xl font-bold shadow-2xl hover:scale-105 transition-transform inline-block">
                    Start Free Trial
                </Link>
            </motion.section>
        </main>
    );
}
