"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { X, Globe } from "lucide-react";

type ModalTier = "Gig Worker" | "Merchant Pro" | "Freelance OS" | null;

interface FeatureModalProps {
    isOpen: boolean;
    onClose: () => void;
    tier: ModalTier;
}

const contentData = {
    "Gig Worker": {
        title: "For Gig Workers",
        english: "Artha connects to all your platform apps (Uber, Zomato, Swiggy, Blinkit) to show your total true earnings in one place. Most importantly, we generate a 'Verified Income Certificate' for you. You can use this certificate to apply for bank loans, personal credit cards, and vehicle financing—things that banks usually reject because you don't have a standard salary slip.",
        hindi: "Artha aapke sabhi apps (Uber, Zomato, Swiggy, Blinkit) se judkar aapki asli kamai ek jagah dikhata hai. Sabse zaroori baat, hum aapke liye ek 'Verified Income Certificate' banate hain. Is certificate ka upyog karke aap bank loan, credit card, aur gadi ki loan ke liye apply kar sakte hain—jo aksar salary slip na hone ke karan reject ho jate hain."
    },
    "Merchant Pro": {
        title: "For Shop Owners",
        english: "Managing a shop is hard work. Artha becomes your digital manager. You don't need to type anything—just press the mic button and say '50kg Rice added' or 'Sold 10 packets of Milk'. We automatically track your stock, manage your daily 'Khata' (Ledger), and even generate GST-compliant bills that you can share on WhatsApp. We save you 2 hours of manual work every day.",
        hindi: "Dukan chalana mehnat ka kaam hai. Artha aapka digital manager banta hai. Aapko kuch type karne ki zaroorat nahi—bas mic dabayein aur bolein '50kg Chawal aaya' ya '10 packet Doodh bika'. Hum apne aap stock track karte hain, aapka daily 'Khata' manage karte hain, aur GST bill bhi banate hain jo aap WhatsApp par bhej sakte hain. Hum roz aapke 2 ghante bachate hain."
    },
    "Freelance OS": {
        title: "For Freelancers",
        english: "Freelancing gives you freedom, but taxes are a headache. Artha acts as your personal CFO. We scan your expenses to find tax-saving opportunities that you might miss. We help you save up to ₹40,000 a year in taxes lawfully. Plus, create professional invoices in seconds that make you look like a big agency to your international clients.",
        hindi: "Freelancing azaadi deti hai, lekin tax ka hisaab sir-dard hai. Artha aapka personal CFO banta hai. Hum aapke kharche scan karke tax bachane ke mauke dhundte hain jo aapse miss ho sakte hain. Hum kanooni taur par aapke saal mein ₹40,000 tak bachane mein madad karte hain. Saath hi, professional invoice banayein jo aapke clients par accha asar dalein."
    }
};

export default function FeatureModal({ isOpen, onClose, tier }: FeatureModalProps) {
    const [isHindi, setIsHindi] = useState(false);

    // Reset language when modal opens/closes
    useEffect(() => {
        if (isOpen) setIsHindi(false);
    }, [isOpen]);

    if (!tier || !contentData[tier]) return null;

    const data = contentData[tier];

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 transition-opacity"
                    />

                    {/* Modal Card */}
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.9, opacity: 0, y: 20 }}
                            className="w-full max-w-lg glass-panel rounded-3xl overflow-hidden pointer-events-auto border border-white/10 shadow-2xl bg-[#0A0F1E]/90"
                        >
                            {/* Header */}
                            <div className="flex items-center justify-between p-6 border-b border-white/10">
                                <h3 className="text-xl font-bold text-white">
                                    {data.title}
                                </h3>
                                <button
                                    onClick={onClose}
                                    className="p-2 rounded-full hover:bg-white/10 text-white/60 hover:text-white transition-colors"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>

                            {/* Translation Toggle (Top Prominent) */}
                            <div className="px-6 pt-6 pb-2">
                                <button
                                    onClick={() => setIsHindi(!isHindi)}
                                    className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-white border border-white/10 w-full justify-center transition-colors group"
                                >
                                    <Globe className="w-4 h-4 text-[var(--orb2)]" />
                                    <span className="text-sm font-medium">
                                        {isHindi ? "Read in English" : "🇮🇳 Translate to Hindi / हिंदी में पढ़ें"}
                                    </span>
                                </button>
                            </div>

                            {/* Body */}
                            <div className="p-6 md:p-8 pt-2">
                                <p className="text-lg md:text-xl text-gray-200 leading-relaxed min-h-[120px]">
                                    {isHindi ? data.hindi : data.english}
                                </p>
                            </div>

                            {/* Footer */}
                            <div className="p-6 bg-white/5 border-t border-white/10 flex justify-end">
                                <button
                                    onClick={onClose}
                                    className="text-sm text-white/50 hover:text-white transition-colors"
                                >
                                    Close
                                </button>
                            </div>
                        </motion.div>
                    </div>
                </>
            )}
        </AnimatePresence>
    );
}
