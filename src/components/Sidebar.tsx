"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, FileText, PieChart, File, LogOut, User } from "lucide-react";
import clsx from "clsx";

const navItems = [
    { label: "Dashboard", href: "/dashboard", icon: Home },
    { label: "Transactions", href: "/dashboard/transactions", icon: FileText },
    { label: "Analytics", href: "/dashboard/analytics", icon: PieChart },
    { label: "Invoices", href: "/dashboard/invoices", icon: File, section: "Tools" },
];

export default function Sidebar() {
    const pathname = usePathname();

    return (
        <aside className="fixed left-0 top-0 h-screen w-64 bg-[#0A0F1E] border-r border-white/10 flex flex-col z-40">
            {/* Logo */}
            <div className="p-6 border-b border-white/5">
                <h1 className="text-2xl font-bold text-white">Artha</h1>
            </div>

            {/* Nav */}
            <nav className="flex-1 p-4 space-y-2">
                {navItems.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                        <div key={item.label}>
                            {item.section && (
                                <div className="mt-6 mb-2 px-4 text-xs font-semibold text-white/40 uppercase tracking-wider">
                                    {item.section}
                                </div>
                            )}
                            <Link
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
                        </div>
                    );
                })}
            </nav>

            {/* Footer / Profile */}
            <div className="p-4 border-t border-white/10">
                <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/5">
                    <div className="w-10 h-10 rounded-full bg-[var(--orb2)] flex items-center justify-center text-white font-bold">
                        RK
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="text-sm font-bold text-white truncate">Rajesh Kumar</p>
                        <p className="text-xs text-white/50 truncate">Uber Driver</p>
                    </div>
                    <button className="text-white/40 hover:text-white transition-colors">
                        <LogOut className="w-5 h-5" />
                    </button>
                </div>
            </div>
        </aside>
    );
}
