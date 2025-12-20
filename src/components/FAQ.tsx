"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import clsx from "clsx";

const faqs = [
    {
        question: "Is my bank data safe?",
        answer: "Yes, we use 256-bit bank-grade encryption. We are ISO 27001 certified and never store your banking passwords.",
    },
    {
        question: "Does the voice feature support Hindi?",
        answer: "Bilkul! Our voice inventory works in Hindi, English, and Hinglish. Just say '50 Milk added' or '50 doodh add karo'.",
    },
    {
        question: "Can I cancel my subscription anytime?",
        answer: "Yes, there are no lock-in periods. You can cancel instantly from your dashboard.",
    },
];

const FAQItem = ({ question, answer, index }: { question: string; answer: string; index: number }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ delay: index * 0.1, duration: 0.6, ease: "easeOut" }}
            className="mb-4 rounded-[2rem] bg-white/40 border border-white/50 backdrop-blur-md overflow-hidden shadow-sm hover:shadow-md transition-all duration-300"
        >
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex items-center justify-between p-8 text-left transition-colors hover:bg-white/20"
            >
                <span className="text-xl font-bold text-[var(--text-main)] pr-8">
                    {question}
                </span>
                <motion.div
                    animate={{ rotate: isOpen ? 45 : 0 }}
                    className="text-3xl text-[var(--grad-1)] opacity-80 font-light"
                    transition={{ duration: 0.3 }}
                >
                    +
                </motion.div>
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                        className="overflow-hidden"
                    >
                        <p className="p-8 pt-0 text-[var(--text-main)] opacity-70 leading-loose text-lg font-medium">
                            {answer}
                        </p>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
};

export default function FAQ() {
    return (
        <section className="container mx-auto px-6 relative z-10 py-32">
            <div className="max-w-3xl mx-auto">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-4xl md:text-5xl font-black text-center text-[var(--text-main)] mb-16 tracking-tight"
                >
                    Frequently Asked Questions
                </motion.h2>

                <div className="space-y-6">
                    {faqs.map((faq, i) => (
                        <FAQItem key={i} {...faq} index={i} />
                    ))}
                </div>
            </div>
        </section>
    );
}
