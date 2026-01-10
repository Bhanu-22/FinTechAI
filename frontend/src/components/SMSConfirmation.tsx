"use client";

import { useState } from "react";
import { MessageSquare, Check, X, Loader2, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { API_URL } from "../config";

interface SMSConfirmationProps {
    parsedData: {
        platform: string;
        amount: number;
        date: string;
    };
    onConfirm: () => void;
    onReject: () => void;
}

export default function SMSConfirmation({ parsedData, onConfirm, onReject }: SMSConfirmationProps) {
    const [isConfirming, setIsConfirming] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleConfirm = async () => {
        setIsConfirming(true);
        setError(null);

        try {
            const token = localStorage.getItem("access_token");
            if (!token) throw new Error("Not authenticated");

            const res = await fetch(`${API_URL}/api/gig/sms/confirm`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `JWT ${token}`
                },
                body: JSON.stringify(parsedData)
            });

            if (!res.ok) {
                const text = await res.text();
                throw new Error(text || "Failed to confirm shift");
            }

            // Success
            onConfirm();
        } catch (err: any) {
            setError(err.message);
            setIsConfirming(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50">
            <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="bg-[var(--bg-card)] rounded-3xl p-6 border border-[#1F453F] max-w-sm w-full shadow-2xl space-y-6"
            >
                <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 rounded-lg bg-[#1F453F] flex items-center justify-center shrink-0">
                        <MessageSquare className="w-5 h-5 text-[var(--gig-primary)]" />
                    </div>
                    <div>
                        <h3 className="text-lg font-bold text-white">New Earnings Detected</h3>
                        <p className="text-xs text-[var(--text-muted)]">From SMS</p>
                    </div>
                </div>

                {/* Parsed Data Card */}
                <div className="bg-[#0B1E1B] p-4 rounded-xl border border-[#1F453F] space-y-3">
                    <div className="flex items-center justify-between">
                        <span className="text-[var(--text-muted)] text-sm">Platform</span>
                        <div className="flex items-center gap-2">
                            <span className="text-lg">
                                {parsedData.platform === "UBER" && "🚗"}
                                {parsedData.platform === "ZOMATO" && "🍔"}
                                {parsedData.platform === "SWIGGY" && "🥘"}
                            </span>
                            <span className="font-bold text-white">{parsedData.platform}</span>
                        </div>
                    </div>

                    <div className="h-px bg-[#1F453F] w-full" />

                    <div className="flex items-center justify-between">
                        <span className="text-[var(--text-muted)] text-sm">Amount</span>
                        <span className="font-bold text-xl text-[var(--gig-primary)]">₹{parsedData.amount}</span>
                    </div>

                    <div className="h-px bg-[#1F453F] w-full" />

                    <div className="flex items-center justify-between">
                        <span className="text-[var(--text-muted)] text-sm">Date</span>
                        <span className="font-medium text-white">{parsedData.date}</span>
                    </div>
                </div>

                {error && (
                    <div className="bg-red-900/20 p-3 rounded-lg border border-red-500/50 text-red-200 text-xs">
                        {error}
                    </div>
                )}

                <div className="grid grid-cols-2 gap-3">
                    <button
                        onClick={onReject}
                        className="bg-[#1F453F] text-white font-bold py-3 rounded-xl hover:bg-[#2A5A52] transition-colors flex items-center justify-center gap-2"
                    >
                        <X className="w-4 h-4" />
                        Reject
                    </button>

                    <button
                        onClick={handleConfirm}
                        disabled={isConfirming}
                        className="bg-[var(--gig-primary)] text-[#0B1E1B] font-bold py-3 rounded-xl hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
                    >
                        {isConfirming ? (
                            <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                            <>
                                <Check className="w-4 h-4" />
                                Confirm
                            </>
                        )}
                    </button>
                </div>
            </motion.div>
        </div>
    );
}
