"use client";

import { motion } from "framer-motion";

const testimonials = [
    {
        text: '"Mera loan approve ho gaya income certificate ki wajah se. Thank you Artha!"',
        author: "Rajesh Kumar",
        role: "Uber Driver, Mumbai",
        icon: "🚖",
        delay: 0,
    },
    {
        text: '"Voice inventory is magic. I don\'t type anymore, just speak and stock updates."',
        author: "Amit Shah",
        role: "Kirana Shop Owner, Delhi",
        icon: "🏪",
        delay: 0.1,
    },
    {
        text: '"Finally visible income proof. Got my first credit card using this app."',
        author: "Priya Sharma",
        role: "Graphic Designer, Bangalore",
        icon: "🎨",
        delay: 0.2,
    },
];

export default function Testimonials() {
    return (
        <section className="container mx-auto px-6 relative z-10 py-32">
            <div className="text-center mb-20 space-y-4">
                <h2 className="text-4xl md:text-5xl font-black text-[var(--text-main)] tracking-tight">
                    Loved by 10,000+ Indians
                </h2>
                <div className="flex justify-center gap-1 text-yellow-500 text-2xl">
                    ★★★★★
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
                {testimonials.map((t, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{ delay: t.delay, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                        whileHover={{ y: -8, transition: { duration: 0.3 } }}
                        className="glass-panel p-10 rounded-[2.5rem] flex flex-col justify-between bg-white/60 backdrop-blur-xl border border-white/50 shadow-lg hover:shadow-2xl hover:shadow-[var(--grad-1)]/10 transition-shadow duration-300 relative group"
                    >
                        <div className="relative z-10">
                            <div className="flex gap-1 mb-6 text-yellow-500 text-lg">
                                ★★★★★
                            </div>

                            <p className="text-[var(--text-main)] text-xl font-medium leading-relaxed opacity-90 mb-8 italic">
                                {t.text}
                            </p>
                        </div>

                        <div className="flex items-center gap-4 border-t border-[var(--text-main)]/10 pt-6 mt-auto">
                            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[var(--grad-1)]/20 to-[var(--grad-2)]/20 flex items-center justify-center text-2xl border border-white/50 shadow-inner">
                                {t.icon}
                            </div>
                            <div>
                                <h4 className="font-bold text-[var(--text-main)] text-lg">
                                    {t.author}
                                </h4>
                                <p className="text-[var(--text-main)] opacity-60 text-sm font-medium">
                                    {t.role}
                                </p>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
