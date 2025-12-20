"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function Navbar() {
    return (
        <motion.nav
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="fixed top-0 w-full z-50 px-6 py-4 flex items-center justify-between backdrop-blur-md bg-white/5 border-b border-white/10"
        >
            <div className="text-2xl font-bold tracking-tight text-[var(--text-main)]">
                Artha
            </div>

            <div className="flex items-center gap-6">
                <Link
                    href="/login"
                    className="text-sm font-medium text-[var(--text-main)] hover:opacity-80 transition-opacity"
                >
                    Login
                </Link>
                <Link
                    href="/signup"
                    className="px-5 py-2 rounded-full bg-[var(--orb1)] text-[var(--btn-text)] font-medium hover:bg-opacity-90 transition-all shadow-lg shadow-[var(--orb1)]/20"
                >
                    Get Started
                </Link>
            </div>
        </motion.nav>
    );
}
