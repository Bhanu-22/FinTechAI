"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function Footer() {
    return (
        <footer className="container mx-auto px-4 relative z-10 pt-20 pb-10">

            {/* CTA Banner */}
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className="rounded-[3rem] bg-gradient-to-br from-white/40 to-white/10 border border-white/40 p-16 text-center mb-32 backdrop-blur-xl shadow-2xl relative overflow-hidden"
            >
                {/* Decorative blob inside banner */}
                <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[var(--grad-1)]/10 blur-[80px] rounded-full pointer-events-none" />

                <h2 className="relative z-10 text-3xl md:text-5xl font-black text-[var(--text-main)] mb-8 tracking-tight">
                    Join 10,000+ Indians Taking <br className="hidden md:block" /> Control of Their Finances.
                </h2>

                <div className="relative z-10 flex flex-col md:flex-row items-center justify-center gap-6">
                    <button className="flex items-center gap-3 px-8 py-5 rounded-2xl bg-white/60 hover:bg-white border border-white/50 transition-all hover:scale-105 hover:shadow-lg group">
                        <span className="text-3xl grayscale group-hover:grayscale-0 transition-all duration-300">🛵</span>
                        <span className="font-bold text-[var(--text-main)] text-lg">For Gig Workers</span>
                    </button>

                    <button className="flex items-center gap-3 px-8 py-5 rounded-2xl bg-white/60 hover:bg-white border border-white/50 transition-all hover:scale-105 hover:shadow-lg group">
                        <span className="text-3xl grayscale group-hover:grayscale-0 transition-all duration-300">🏪</span>
                        <span className="font-bold text-[var(--text-main)] text-lg">For Shop Owners</span>
                    </button>

                    <button className="flex items-center gap-3 px-8 py-5 rounded-2xl bg-white/60 hover:bg-white border border-white/50 transition-all hover:scale-105 hover:shadow-lg group">
                        <span className="text-3xl grayscale group-hover:grayscale-0 transition-all duration-300">💻</span>
                        <span className="font-bold text-[var(--text-main)] text-lg">For Freelancers</span>
                    </button>
                </div>
            </motion.div>

            {/* Links Section */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-12 border-t border-[var(--text-main)]/10 pt-16 pb-12">

                {/* Branding */}
                <div className="space-y-6">
                    <h2 className="text-3xl font-black text-[var(--text-main)] tracking-tighter">Artha</h2>
                    <p className="text-sm text-[var(--text-main)] opacity-60 font-medium">
                        Made with ❤️ in India for India.
                    </p>
                </div>

                {/* Product */}
                <div className="space-y-6">
                    <h3 className="font-bold text-[var(--text-main)] text-lg">Product</h3>
                    <ul className="space-y-3 text-sm text-[var(--text-main)] opacity-70 font-medium">
                        <li><Link href="#pricing" className="hover:text-[var(--grad-1)] transition-colors">Pricing</Link></li>
                        <li><Link href="#features" className="hover:text-[var(--grad-1)] transition-colors">Features</Link></li>
                        <li><Link href="/download" className="hover:text-[var(--grad-1)] transition-colors">Download App</Link></li>
                    </ul>
                </div>

                {/* Company */}
                <div className="space-y-6">
                    <h3 className="font-bold text-[var(--text-main)] text-lg">Company</h3>
                    <ul className="space-y-3 text-sm text-[var(--text-main)] opacity-70 font-medium">
                        <li><Link href="/about" className="hover:text-[var(--grad-1)] transition-colors">About Us</Link></li>
                        <li><Link href="/careers" className="hover:text-[var(--grad-1)] transition-colors">Careers</Link></li>
                        <li><Link href="/contact" className="hover:text-[var(--grad-1)] transition-colors">Contact</Link></li>
                    </ul>
                </div>

                {/* Legal */}
                <div className="space-y-6">
                    <h3 className="font-bold text-[var(--text-main)] text-lg">Legal</h3>
                    <ul className="space-y-3 text-sm text-[var(--text-main)] opacity-70 font-medium">
                        <li><Link href="/privacy" className="hover:text-[var(--grad-1)] transition-colors">Privacy Policy</Link></li>
                        <li><Link href="/terms" className="hover:text-[var(--grad-1)] transition-colors">Terms of Service</Link></li>
                        <li><Link href="/security" className="hover:text-[var(--grad-1)] transition-colors">Data Security</Link></li>
                    </ul>
                </div>

            </div>
        </footer>
    );
}
