"use client";

import { MessageSquare, Shield, Settings } from "lucide-react";

interface SMSConsentProps {
    onAccept: () => void;
    onDecline: () => void;
}

export default function SMSConsent({ onAccept, onDecline }: SMSConsentProps) {
    return (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50">
            <div className="bg-[var(--bg-card)] rounded-3xl p-8 border border-[#1F453F] text-center max-w-sm w-full mx-4 shadow-2xl">
                <div className="w-16 h-16 rounded-full bg-[#1F453F] flex items-center justify-center mx-auto mb-4">
                    <MessageSquare className="w-8 h-8 text-[var(--gig-primary)]" />
                </div>

                <h3 className="text-xl font-bold mb-2 text-white">Auto-Import Earnings</h3>
                <p className="text-[var(--text-muted)] mb-6">
                    We can automatically detect earnings SMS from gig platforms in the future,
                    so you don’t have to log everything manually.
                </p>

                <div className="space-y-3 mb-6 text-sm text-[var(--text-muted)]">
                    <div className="flex items-center gap-2 justify-center">
                        <Shield className="w-4 h-4 text-[var(--gig-primary)]" />
                        <span>You stay in control at all times</span>
                    </div>
                    <div className="flex items-center gap-2 justify-center">
                        <Settings className="w-4 h-4 text-[var(--gig-primary)]" />
                        <span>You can change this anytime in Settings</span>
                    </div>
                </div>

                <div className="flex gap-3">
                    <button
                        onClick={onAccept}
                        className="flex-1 bg-[var(--gig-primary)] text-[#0B1E1B] font-bold py-3 rounded-xl hover:opacity-90 transition-opacity"
                    >
                        Enable Later
                    </button>

                    <button
                        onClick={onDecline}
                        className="flex-1 bg-[#1F453F] text-white font-bold py-3 rounded-xl hover:bg-[#2A5A52] transition-colors"
                    >
                        Maybe Later
                    </button>
                </div>
            </div>
        </div>
    );
}
