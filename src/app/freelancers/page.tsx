"use client";

import Link from "next/link";
import { ArrowLeft, Scale, Timer, Globe, CreditCard, PiggyBank } from "lucide-react";
import { motion, Variants } from "framer-motion";

const fadeInUp: Variants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
};

const staggerContainer: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.2
        }
    }
};

export default function FreelancersPage() {
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
                <span className="font-black text-xl tracking-tight hidden md:block text-[var(--text-main)]">ARTHA FOR FREELANCERS</span>
                <Link href="/signup" className="px-5 py-2 rounded-full bg-[var(--text-main)] text-white text-sm font-bold shadow-lg hover:scale-105 transition-transform">
                    Get Dashboard
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
                        You are a Business, <br /><span className="text-[var(--grad-2)]">Not Just a Freelancer</span>
                    </motion.h1>
                    <motion.p variants={fadeInUp} className="text-xl md:text-2xl text-[var(--text-main)] opacity-70 max-w-2xl mx-auto leading-relaxed">
                        Professional tools to win big clients, protect your time, and keep your money.
                    </motion.p>
                </motion.div>
            </section>

            {/* Section 1: The Pitch */}
            <motion.section
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={staggerContainer}
                id="legal-contracts"
                className="min-h-screen flex items-center py-32 px-6"
            >
                <div className="container mx-auto grid md:grid-cols-2 gap-16 items-center max-w-6xl">
                    <motion.div variants={fadeInUp} className="order-2 md:order-1 space-y-8">
                        <div className="w-20 h-20 rounded-3xl bg-[var(--grad-3)]/20 flex items-center justify-center text-[var(--grad-3)]">
                            <Scale className="w-10 h-10" />
                        </div>
                        <div className="space-y-4">
                            <h2 className="text-5xl font-bold text-[var(--text-main)]">Never Start <br />Without a Contract.</h2>
                            <h3 className="text-2xl font-medium text-[var(--grad-3)]">Step 1: The Pitch</h3>
                        </div>
                        <p className="text-xl text-[var(--text-main)] opacity-80 leading-relaxed">
                            Scope creep kills profitability. Our AI generates watertight legal contracts based on your quote. <br /><br />
                            Define payment milestones, kill fees, and IP rights. Get it e-signed before you write a single line of code.
                        </p>
                    </motion.div>
                    <motion.div variants={fadeInUp} className="order-1 md:order-2">
                        <div className="glass-panel p-8 rounded-[3rem] aspect-square flex items-center justify-center bg-white/30 backdrop-blur-xl border border-white/40 shadow-2xl skew-y-3 hover:skew-y-0 transition-transform duration-700">
                            <span className="text-[10rem]">⚖️</span>
                        </div>
                    </motion.div>
                </div>
            </motion.section>

            {/* Section 2: The Work */}
            <motion.section
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={staggerContainer}
                id="time-tracking"
                className="min-h-screen flex items-center py-32 px-6 bg-white/30 backdrop-blur-sm"
            >
                <div className="container mx-auto grid md:grid-cols-2 gap-16 items-center max-w-6xl">
                    <motion.div variants={fadeInUp} className="order-1">
                        <div className="glass-panel p-8 rounded-[3rem] aspect-square flex items-center justify-center bg-white/30 backdrop-blur-xl border border-white/40 shadow-2xl -skew-y-3 hover:skew-y-0 transition-transform duration-700">
                            <span className="text-[10rem]">⏱️</span>
                        </div>
                    </motion.div>
                    <motion.div variants={fadeInUp} className="order-2 space-y-8">
                        <div className="w-20 h-20 rounded-3xl bg-[var(--grad-1)]/20 flex items-center justify-center text-[var(--grad-1)]">
                            <Timer className="w-10 h-10" />
                        </div>
                        <div className="space-y-4">
                            <h2 className="text-5xl font-bold text-[var(--text-main)]">Proof of Work.</h2>
                            <h3 className="text-2xl font-medium text-[var(--grad-1)]">Step 2: Execution</h3>
                        </div>
                        <p className="text-xl text-[var(--text-main)] opacity-80 leading-relaxed">
                            Client asks "Why 10 hours?". Show them. <br /><br />
                            Our unobtrusive desktop widget tracks time against specific projects. Generate detailed timesheets that justify your high rates and build trust.
                        </p>
                    </motion.div>
                </div>
            </motion.section>

            {/* Section 3: The Invoice */}
            <motion.section
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={staggerContainer}
                id="global-invoicing"
                className="min-h-screen flex items-center py-32 px-6"
            >
                <div className="container mx-auto grid md:grid-cols-2 gap-16 items-center max-w-6xl">
                    <motion.div variants={fadeInUp} className="order-2 md:order-1 space-y-8">
                        <div className="w-20 h-20 rounded-3xl bg-[var(--grad-2)]/20 flex items-center justify-center text-[var(--grad-2)]">
                            <Globe className="w-10 h-10" />
                        </div>
                        <div className="space-y-4">
                            <h2 className="text-5xl font-bold text-[var(--text-main)]">Global Invoicing, <br />Local Payments.</h2>
                            <h3 className="text-2xl font-medium text-[var(--grad-2)]">Step 3: Get Paid</h3>
                        </div>
                        <p className="text-xl text-[var(--text-main)] opacity-80 leading-relaxed">
                            Working with US/UK clients? Send multi-currency invoices (USD, GBP, EUR) that auto-convert to INR. <br /><br />
                            Includes SWIFT codes and FIRC documentation support for smooth international transfers.
                        </p>
                    </motion.div>
                    <motion.div variants={fadeInUp} className="order-1 md:order-2">
                        <div className="glass-panel p-8 rounded-[3rem] aspect-square flex items-center justify-center bg-white/30 backdrop-blur-xl border border-white/40 shadow-2xl skew-y-3 hover:skew-y-0 transition-transform duration-700">
                            <span className="text-[10rem]">🌍</span>
                        </div>
                    </motion.div>
                </div>
            </motion.section>

            {/* Section 4: The Lifestyle */}
            <motion.section
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={staggerContainer}
                id="expense-swipe"
                className="min-h-screen flex items-center py-32 px-6 bg-white/30 backdrop-blur-sm"
            >
                <div className="container mx-auto grid md:grid-cols-2 gap-16 items-center max-w-6xl">
                    <motion.div variants={fadeInUp} className="order-1">
                        <div className="glass-panel p-8 rounded-[3rem] aspect-square flex items-center justify-center bg-white/30 backdrop-blur-xl border border-white/40 shadow-2xl -skew-y-3 hover:skew-y-0 transition-transform duration-700">
                            <span className="text-[10rem]">💳</span>
                        </div>
                    </motion.div>
                    <motion.div variants={fadeInUp} className="order-2 space-y-8">
                        <div className="w-20 h-20 rounded-3xl bg-[var(--grad-3)]/20 flex items-center justify-center text-[var(--grad-3)]">
                            <CreditCard className="w-10 h-10" />
                        </div>
                        <div className="space-y-4">
                            <h2 className="text-5xl font-bold text-[var(--text-main)]">Tinder for Taxes.</h2>
                            <h3 className="text-2xl font-medium text-[var(--grad-3)]">Step 4: Expenses</h3>
                        </div>
                        <p className="text-xl text-[var(--text-main)] opacity-80 leading-relaxed">
                            Don't hoard receipts. We sync with your transaction SMS. <br /><br />
                            Just swipe RIGHT for Business (Internet, Coffee, Software) and LEFT for Personal. We categorize it instantly for tax season.
                        </p>
                    </motion.div>
                </div>
            </motion.section>

            {/* Section 5: Year End */}
            <motion.section
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={staggerContainer}
                id="tax-saver"
                className="min-h-screen flex items-center py-32 px-6"
            >
                <div className="container mx-auto grid md:grid-cols-2 gap-16 items-center max-w-6xl">
                    <motion.div variants={fadeInUp} className="order-2 md:order-1 space-y-8">
                        <div className="w-20 h-20 rounded-3xl bg-[var(--grad-1)]/20 flex items-center justify-center text-[var(--grad-1)]">
                            <PiggyBank className="w-10 h-10" />
                        </div>
                        <div className="space-y-4">
                            <h2 className="text-5xl font-bold text-[var(--text-main)]">Save ₹40k with <br />Section 44ADA.</h2>
                            <h3 className="text-2xl font-medium text-[var(--grad-1)]">Step 5: Taxes</h3>
                        </div>
                        <p className="text-xl text-[var(--text-main)] opacity-80 leading-relaxed">
                            Most freelancers overpay taxes. Our AI engine is built for the Indian "Presumptive Taxation" scheme. <br /><br />
                            We automatically calculate your optimal declared income to legally minimize tax liability.
                        </p>
                    </motion.div>
                    <motion.div variants={fadeInUp} className="order-1 md:order-2">
                        <div className="glass-panel p-8 rounded-[3rem] aspect-square flex items-center justify-center bg-white/30 backdrop-blur-xl border border-white/40 shadow-2xl skew-y-3 hover:skew-y-0 transition-transform duration-700">
                            <span className="text-[10rem]">💰</span>
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
                <h2 className="text-4xl font-bold text-[var(--text-main)] mb-8">Take control of your freedom.</h2>
                <Link href="/signup" className="px-12 py-5 rounded-full bg-[var(--text-main)] text-white text-xl font-bold shadow-2xl hover:scale-105 transition-transform inline-block">
                    Start Free Trial
                </Link>
            </motion.section>
        </main>
    );
}
