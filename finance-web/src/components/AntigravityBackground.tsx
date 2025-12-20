"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function AntigravityBackground() {
    const [mounted, SJ] = useState(false);

    useEffect(() => {
        SJ(true);
    }, []);

    if (!mounted) return null;

    const orbs = [
        {
            size: "w-[500px] h-[500px]",
            color: "bg-[var(--accent-primary)]",
            initial: { x: -100, y: -100, scale: 1 },
            animate: {
                x: [0, 100, -50, 0],
                y: [0, -100, 50, 0],
                scale: [1, 1.2, 0.9, 1],
            },
            duration: 25,
            delay: 0,
        },
        {
            size: "w-[400px] h-[400px]",
            color: "bg-[var(--accent-secondary)]",
            initial: { x: 400, y: 100, scale: 1 },
            animate: {
                x: [0, -150, 100, 0],
                y: [0, 100, -100, 0],
                scale: [1, 1.4, 0.8, 1],
            },
            duration: 30,
            delay: 2,
        },
        {
            size: "w-[600px] h-[600px]",
            color: "bg-[var(--accent-primary)] opacity-40",
            initial: { x: -200, y: 400, scale: 1 },
            animate: {
                x: [0, 200, -100, 0],
                y: [0, -200, 150, 0],
                scale: [1, 1.1, 0.9, 1],
            },
            duration: 35,
            delay: 1,
        },
        {
            size: "w-[300px] h-[300px]",
            color: "bg-[var(--accent-secondary)] opacity-40",
            initial: { x: 500, y: -200, scale: 1 },
            animate: {
                x: [0, -100, 150, 0],
                y: [0, 150, -50, 0],
                scale: [1, 1.5, 1, 1],
            },
            duration: 28,
            delay: 3,
        },
        {
            size: "w-[450px] h-[450px]",
            color: "bg-[var(--accent-primary)] opacity-30",
            initial: { x: 0, y: 0, scale: 1 },
            animate: {
                x: [-50, 50, -50],
                y: [-50, 50, -50],
                scale: [1, 1.3, 1],
            },
            duration: 40,
            delay: 0,
        },
    ];

    return (
        <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
            {orbs.map((orb, i) => (
                <motion.div
                    key={i}
                    className={`absolute rounded-full blur-[100px] mix-blend-screen ${orb.color} ${orb.size}`}
                    style={{
                        left: "50%",
                        top: "50%",
                        transform: "translate(-50%, -50%)",
                        ...orb.initial,
                    }}
                    animate={orb.animate}
                    transition={{
                        duration: orb.duration,
                        repeat: Infinity,
                        repeatType: "mirror",
                        ease: "easeInOut",
                        delay: orb.delay,
                    }}
                />
            ))}
            <div className="absolute inset-0 bg-transparent backdrop-blur-[50px] opacity-20" />
        </div>
    );
}
