"use client";

import { motion } from "framer-motion";

export default function BackgroundBlobs() {
    return (
        <div className="fixed inset-0 z-[-1] overflow-hidden bg-white pointer-events-none">
            {/* Blob 1: Purple (#A78BFA) */}
            <motion.div
                className="absolute top-0 left-[-10%] w-[70vw] h-[70vw] rounded-full bg-[#A78BFA] mix-blend-multiply filter blur-[100px] opacity-30"
                animate={{
                    x: [0, 100, 0],
                    y: [0, 50, 0],
                    scale: [1, 1.1, 1],
                }}
                transition={{
                    duration: 20,
                    repeat: Infinity,
                    repeatType: "reverse",
                    ease: "easeInOut",
                }}
            />

            {/* Blob 2: Blue (#60A5FA) */}
            <motion.div
                className="absolute top-[-10%] right-[-10%] w-[60vw] h-[60vw] rounded-full bg-[#60A5FA] mix-blend-multiply filter blur-[100px] opacity-30"
                animate={{
                    x: [0, -100, 0],
                    y: [0, 100, 0],
                    scale: [1, 1.2, 1],
                }}
                transition={{
                    duration: 25,
                    repeat: Infinity,
                    repeatType: "reverse",
                    ease: "easeInOut",
                }}
            />

            {/* Blob 3: Warm Yellow/Orange (#FBBF24) */}
            <motion.div
                className="absolute bottom-[-10%] left-[20%] w-[60vw] h-[60vw] rounded-full bg-[#FBBF24] mix-blend-multiply filter blur-[100px] opacity-30"
                animate={{
                    x: [0, 50, 0],
                    y: [0, -50, 0],
                    scale: [1, 1.1, 1],
                }}
                transition={{
                    duration: 30,
                    repeat: Infinity,
                    repeatType: "reverse",
                    ease: "easeInOut",
                }}
            />
        </div>
    );
}
