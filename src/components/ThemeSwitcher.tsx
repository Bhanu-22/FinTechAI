"use client";

import { useEffect, useState } from "react";
import clsx from "clsx";

const themes = [
    { id: "midnight", color: "#7c3aed", label: "Midnight" },
    { id: "sunrise", color: "#f97316", label: "Sunrise" },
    { id: "forest", color: "#10b981", label: "Forest" },
    { id: "ocean", color: "#0ea5e9", label: "Ocean" },
    { id: "prism", color: "#db2777", label: "Prism" },
];

export default function ThemeSwitcher() {
    const [activeTheme, setActiveTheme] = useState("midnight");
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        const savedTheme = localStorage.getItem("theme") || "midnight";
        setActiveTheme(savedTheme);
        document.documentElement.setAttribute("data-theme", savedTheme);
        setMounted(true);
    }, []);

    const switchTheme = (themeId: string) => {
        setActiveTheme(themeId);
        document.documentElement.setAttribute("data-theme", themeId);
        localStorage.setItem("theme", themeId);
    };

    if (!mounted) return null;

    return (
        <div className="fixed bottom-6 right-6 z-50 flex gap-3 p-3 rounded-full glass-panel bg-black/20 backdrop-blur-md border border-white/10 shadow-2xl">
            {themes.map((theme) => (
                <button
                    key={theme.id}
                    onClick={() => switchTheme(theme.id)}
                    className={clsx(
                        "w-6 h-6 rounded-full transition-all duration-300 hover:scale-110",
                        activeTheme === theme.id ? "ring-2 ring-white scale-110" : "opacity-70 hover:opacity-100"
                    )}
                    style={{ backgroundColor: theme.color }}
                    title={theme.label}
                    aria-label={`Switch to ${theme.label} theme`}
                />
            ))}
        </div>
    );
}
