"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    Home,
    Wallet,
    Target,
    Trophy,
    Settings,
    LogOut,
    Zap
} from "lucide-react";
import { motion } from "framer-motion";

export default function GigSidebar() {
    const pathname = usePathname();

    const menuItems = [
        { name: "Home", icon: Home, href: "/gig/dashboard" },
        { name: "Add Earnings", icon: Wallet, href: "/gig/shift/new" },
        { name: "Goals", icon: Target, href: "/gig/savings" },
        { name: "Leaderboard", icon: Trophy, href: "/gig/leaderboard" },
        { name: "Settings", icon: Settings, href: "/gig/settings" },
    ];

    return (
        <aside className="fixed left-0 top-0 h-screen w-64 bg-[var(--bg-card)] border-r border-[#1F453F] hidden md:flex flex-col p-6 z-50">
            {/* Logo */}
            <div className="flex items-center gap-3 mb-10">
                <div className="w-8 h-8 rounded-lg bg-[var(--gig-primary)] flex items-center justify-center">
                    <Zap className="w-5 h-5 text-[#0B1E1B] fill-current" />
                </div>
                <h1 className="text-xl font-bold text-white tracking-tight">GigSuper</h1>
            </div>

            {/* Menu */}
            <nav className="space-y-2 flex-1">
                {menuItems.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                        <Link key={item.name} href={item.href}>
                            <motion.div
                                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${isActive
                                        ? "bg-[#1F453F] text-[var(--gig-primary)]"
                                        : "text-[#A0B3B0] hover:bg-[#1F453F]/50 hover:text-white"
                                    }`}
                                whileHover={{ x: 5 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                <item.icon className={`w-5 h-5 ${isActive ? "text-[var(--gig-primary)]" : "opacity-70"}`} />
                                <span className="font-medium">{item.name}</span>
                            </motion.div>
                        </Link>
                    );
                })}
            </nav>

            {/* Profile / Logout */}
            <div className="mt-auto pt-6 border-t border-[#1F453F]">
                <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-full bg-[#2A5A52] flex items-center justify-center text-white font-bold">
                        RK
                    </div>
                    <div>
                        <p className="text-sm font-bold text-white">Ramesh Kumar</p>
                        <p className="text-xs text-[var(--gig-primary)]">Premium Member</p>
                    </div>
                </div>
            </div>
        </aside>
    );
}
