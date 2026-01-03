"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, DollarSign, Clock, FileText, LogOut, Laptop } from "lucide-react";
import clsx from "clsx";

const navItems = [
    { label: "Overview", href: "/freelancers", icon: Home },
    { label: "Invoices", href: "/freelancers/invoices", icon: FileText },
    { label: "Time Tracking", href: "/freelancers/time", icon: Clock },
    { label: "Earnings", href: "/freelancers/earnings", icon: DollarSign },
];

export default function FreelancerSidebar() {
    const pathname = usePathname();

    return (
        <aside className="fixed left-0 top-0 h-screen w-64 bg-[#0A0F1E] border-r border-white/10 flex flex-col z-40">
            {/* Logo */}
            <div className="p-6 border-b border-white/5">
                <h1 className="text-2xl font-bold text-white flex items-center gap-2">
                    <Laptop className="w-6 h-6 text-[var(--orb1)]" />
                    Artha <span className="text-xs opacity-50 font-normal mt-1">Freelance</span>
                </h1>
            </div>

            {/* Nav */}
            <nav className="flex-1 p-4 space-y-2">
                {navItems.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={clsx(
                                "flex items-center gap-3 px-4 py-3 rounded-xl transition-all",
                                isActive
                                    ? "bg-[var(--orb1)] text-white shadow-lg shadow-[var(--orb1)]/20"
                                    : "text-white/60 hover:text-white hover:bg-white/5"
                            )}
                        >
                            <item.icon className="w-5 h-5" />
                            <span className="font-medium">{item.label}</span>
                        </Link>
                    );
                })}
            </nav>

            {/* Footer / Profile */}
            <div className="p-4 border-t border-white/10">
                <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/5">
                    <div className="w-10 h-10 rounded-full bg-purple-500 flex items-center justify-center text-white font-bold">
                        PS
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="text-sm font-bold text-white truncate">Priya Sharma</p>
                        <p className="text-xs text-white/50 truncate">UI/UX Designer</p>
                    </div>
                    <button className="text-white/40 hover:text-white transition-colors">
                        <LogOut className="w-5 h-5" />
                    </button>
                </div>
            </div>
        </aside>
    );
}
