import React from "react";

export default function GradientBackground() {
    return (
        <div className="fixed inset-0 w-full h-full z-[-1] overflow-hidden pointer-events-none bg-[var(--bg-main)] transition-colors duration-500">
            {/* Blob 1 - Top Left */}
            <div className="absolute top-[-20%] left-[-20%] w-[70%] h-[70%] rounded-full bg-[var(--grad-1)] blur-[120px] opacity-40 animate-blob-1 mix-blend-multiply"></div>

            {/* Blob 2 - Top Right */}
            <div className="absolute top-[-30%] right-[-20%] w-[60%] h-[60%] rounded-full bg-[var(--grad-2)] blur-[120px] opacity-40 animate-blob-2 mix-blend-multiply"></div>

            {/* Blob 3 - Bottom Center */}
            <div className="absolute bottom-[-20%] left-[20%] w-[80%] h-[80%] rounded-full bg-[var(--grad-3)] blur-[120px] opacity-30 animate-blob-3 mix-blend-multiply"></div>
        </div>
    );
}
