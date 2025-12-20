"use client";

import { motion } from "framer-motion";

export default function Hero() {
    return (
        <section className="min-h-[85vh] flex flex-col items-center justify-center px-4 relative z-10 pt-20">
            <div className="max-w-5xl mx-auto text-center space-y-10">

                {/* Headline */}
                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }} // Custom cubic-bezier for "calm" feel
                    className="text-6xl md:text-8xl font-black text-[var(--text-main)] leading-[1.05] tracking-tighter"
                >
                    The Financial OS for <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--grad-1)] via-[var(--grad-2)] to-[var(--grad-3)] animate-gradient-x">
                        India&apos;s New Workforce
                    </span>
                </motion.h1>

                {/* Subheading */}
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 0.8, y: 0 }}
                    transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                    className="text-xl md:text-2xl text-[var(--text-main)] max-w-3xl mx-auto font-normal leading-relaxed"
                >
                    Empowering Gig Workers, Freelancers, and Merchants. <br className="hidden md:block" />
                    Track earnings. Save taxes. Grow wealth.
                </motion.p>

                {/* CTA Button */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    className="pt-4"
                >
                    <motion.button
                        whileHover={{ scale: 1.02, boxShadow: "0 20px 40px -10px rgba(167, 139, 250, 0.3)" }}
                        whileTap={{ scale: 0.98 }}
                        className="px-10 py-5 rounded-full bg-gradient-to-r from-[var(--grad-1)] to-[var(--grad-2)] text-white font-bold text-lg shadow-2xl shadow-[var(--grad-1)]/20 transition-all border border-white/20"
                    >
                        Join the Waitlist
                    </motion.button>
                </motion.div>

            </div>
        </section>
    );
}
