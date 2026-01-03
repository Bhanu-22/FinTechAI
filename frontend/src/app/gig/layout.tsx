"use client";

import { usePathname } from "next/navigation";
import GigSidebar from "@/features/gig/components/Sidebar";
import { useEffect } from "react";

export default function GigLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();

    useEffect(() => {
        // Enforce GigSuper Dark Theme
        document.documentElement.setAttribute("data-theme", "gig-dark");
    }, [pathname]);

    return (
        <div className="min-h-screen bg-[var(--bg-main)] font-sans">
            <GigSidebar />

            {/* Main Content Area - Shifted Right on Desktop */}
            <div className="md:ml-64 min-h-screen transition-all">
                {children}
            </div>
        </div>
    );
}
