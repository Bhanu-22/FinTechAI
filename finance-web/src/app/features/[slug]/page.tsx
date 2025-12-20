import GradientBackground from "@/components/GradientBackground";
import Link from "next/link";
import { ArrowLeft, CheckCircle, AlertCircle, Zap } from "lucide-react";

interface PageProps {
    params: { slug: string };
}

const featureData: Record<string, {
    title: string;
    icon: string;
    subtitle: string;
    problem: string;
    solution: string;
    benefits: string[];
}> = {
    // MERCHANT FEATURES
    "voice-inventory": {
        title: "Voice Inventory",
        icon: "🎙️",
        subtitle: "Speak. Stock. Done.",
        problem: "Typing product names and quantities into a phone screen is slow, tedious, and error-prone when your shop is busy.",
        solution: "Artha's AI Voice engine understands your natural speech. Just say 'Added 50kg Basmati Rice' or 'Sold 12 packets of Milk', and we update your inventory in real-time.",
        benefits: ["Works in Hindi, English & Hinglish", "No typing required", "Instant stock updates"]
    },
    "smart-khata": {
        title: "Smart Khata Ledger",
        icon: "📒",
        subtitle: "Digital Udhaar Management",
        problem: "Paper ledgers get lost, damaged, or miscalculated. Chasing customers for payments is awkward and difficult.",
        solution: "A digital ledger that tracks credit/debit automatically. We send polite, automated payment reminders to your customers via WhatsApp so you get paid faster.",
        benefits: ["Auto-Whatsapp Reminders", "100% Accurate Calculations", "Data Backup"]
    },
    "whatsapp-billing": {
        title: "WhatsApp Billing",
        icon: "💬",
        subtitle: "Invoices Where Your Customers Are",
        problem: "Printing thermal receipts is costly, and customers often lose them. Email invoices get ignored.",
        solution: "Send professional, GST-compliant invoices directly to your customer's WhatsApp. It's fast, paperless, and builds trust.",
        benefits: ["Zero Paper Cost", "Instant Delivery", "Professional Branding"]
    },
    "expiry-alerts": {
        title: "Expiry Alerts",
        icon: "⏰",
        subtitle: "Stop Wasting Stock",
        problem: "Merchants lose thousands of rupees every month because products expire on the shelf unnoticed.",
        solution: "Artha tracks batch dates and sends you proactive alerts 30 days before items expire so you can run a clearance sale.",
        benefits: ["Reduce Wastage", "Maximize Profit", "Automated Tracking"]
    },
    "merchant-gst": {
        title: "GST Reports",
        icon: "📊",
        subtitle: "Tax Filing Made Simple",
        problem: "Hiring an accountant is expensive, and doing GST filing yourself is confusing and stressful.",
        solution: "One-click generation of GSTR-1 and GSTR-3B reports based on your daily sales and purchases. Send directly to the portal.",
        benefits: ["Error-Free Reports", "Save Accountant Fees", "Always On Time"]
    },

    // FREELANCER FEATURES
    "global-invoicing": {
        title: "Global Invoicing",
        icon: "🌍",
        subtitle: "Bill the World",
        problem: "Creating professional international invoices with correct currency conversions and SWIFT codes is a hassle.",
        solution: "Create stunning multi-currency invoices (USD, EUR, GBP) in seconds that act as a payment gateway for your international clients.",
        benefits: ["Multi-Currency Support", "Payment Gateway Links", "Professional Templates"]
    },
    "expense-swipe": {
        title: "Auto-Expense Swipe",
        icon: "💳",
        subtitle: "Gamified Expense Tracking",
        problem: "Categorizing bank transactions at the end of the month is boring and time-consuming.",
        solution: "We connect to your SMS/Bank statements and show you transactions. Just swipe Right for 'Business' and Left for 'Personal'. It's actually fun.",
        benefits: ["2-Minute Daily Review", "Never Miss Deductions", "Visual Analytics"]
    },
    "time-tracking": {
        title: "Project Time Tracking",
        icon: "⏱️",
        subtitle: "Bill Every Minute",
        problem: "Freelancers often undercharge because they lose track of small tasks and revisions.",
        solution: "A built-in timer that links to specific projects. Once you're done, convert hours into an invoice with one click.",
        benefits: ["One-Click Invoicing", "Client Transparency", "Boost Revenue"]
    },
    "legal-contracts": {
        title: "Legal Contracts",
        icon: "⚖️",
        subtitle: "Iron-Clad Agreements",
        problem: "Lawyers are expensive, but working without a contract is risky. Clients often delay payments or change scope.",
        solution: "AI-generated contracts tailored for Indian Freelancers. Define scope, payment terms, and IP rights in minutes.",
        benefits: ["Standard Templates", "E-Signature Ready", "Protect Your Work"]
    },
    "tax-saver": {
        title: "Tax Saver AI",
        icon: "💰",
        subtitle: "Your Personal CA",
        problem: "Most freelancers overpay taxes because they don't know which expenses (internet, rent, travel) are deductible.",
        solution: "Our AI scans your 'Business' expenses and highlights 44AD presumptive taxation opportunities to save you up to ₹40k/year.",
        benefits: ["Maximize Refunds", "Audit-Proof Logic", "Peace of Mind"]
    }
};

export default function FeaturePage({ params }: PageProps) {
    const data = featureData[params.slug];

    if (!data) {
        return (
            <main className="min-h-screen flex items-center justify-center p-6 relative overflow-hidden bg-white/5">
                <GradientBackground />
                <div className="glass-panel p-10 rounded-3xl text-center z-10 bg-white/40 backdrop-blur-md">
                    <AlertCircle className="w-16 h-16 text-[var(--grad-1)] mx-auto mb-4" />
                    <h1 className="text-4xl font-bold text-[var(--text-main)] mb-2">Feature Not Found</h1>
                    <p className="text-[var(--text-main)] opacity-70 mb-6">We couldn't find the feature "{params.slug}".</p>
                    <Link href="/" className="px-6 py-3 rounded-full bg-[var(--text-main)] text-white font-bold hover:scale-105 transition-transform">
                        Back to Home
                    </Link>
                </div>
            </main>
        );
    }

    return (
        <main className="min-h-screen relative overflow-x-hidden p-6 md:p-12 flex flex-col items-center">
            <GradientBackground />

            {/* Back Button */}
            <div className="w-full max-w-5xl z-20 mb-10">
                <Link href="/" className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel text-[var(--text-main)] hover:bg-white/50 transition-colors">
                    <ArrowLeft className="w-4 h-4" />
                    <span className="font-medium">All Features</span>
                </Link>
            </div>

            <div className="max-w-5xl w-full z-10 grid md:grid-cols-2 gap-12 items-start">
                {/* Left Column: Hero & Hooks */}
                <div className="space-y-8">
                    <div className="inline-block p-4 rounded-3xl bg-white/30 backdrop-blur-md shadow-sm border border-white/20">
                        <div className="text-6xl md:text-8xl">{data.icon}</div>
                    </div>

                    <div>
                        <h1 className="text-5xl md:text-7xl font-black text-[var(--text-main)] tracking-tight mb-2">
                            {data.title}
                        </h1>
                        <p className="text-2xl md:text-3xl text-[var(--grad-1)] font-bold">
                            {data.subtitle}
                        </p>
                    </div>

                    <div className="glass-panel p-8 rounded-3xl bg-red-50/50 border-red-100">
                        <h3 className="text-lg font-bold text-red-800 mb-2 flex items-center gap-2">
                            <AlertCircle className="w-5 h-5" /> The Problem
                        </h3>
                        <p className="text-red-900/80 leading-relaxed text-lg">
                            {data.problem}
                        </p>
                    </div>

                    <div className="glass-panel p-8 rounded-3xl bg-emerald-50/50 border-emerald-100">
                        <h3 className="text-lg font-bold text-emerald-800 mb-2 flex items-center gap-2">
                            <Zap className="w-5 h-5" /> The Solution
                        </h3>
                        <p className="text-emerald-900/80 leading-relaxed text-lg">
                            {data.solution}
                        </p>
                    </div>
                </div>

                {/* Right Column: Benefits & CTA */}
                <div className="space-y-8 md:pt-20">
                    <div className="glass-panel p-8 md:p-12 rounded-[2.5rem] bg-white/40 backdrop-blur-xl border border-white/40 shadow-2xl">
                        <h3 className="text-2xl font-bold text-[var(--text-main)] mb-8">Key Benefits</h3>
                        <div className="space-y-6">
                            {data.benefits.map((benefit, i) => (
                                <div key={i} className="flex items-start gap-4 p-4 rounded-2xl bg-white/50 border border-white/30 shadow-sm transition-transform hover:scale-102">
                                    <CheckCircle className="w-6 h-6 text-[var(--orb1)] mt-1 shrink-0" />
                                    <span className="text-xl text-[var(--text-main)] font-semibold opacity-90">{benefit}</span>
                                </div>
                            ))}
                        </div>

                        <div className="mt-12 pt-8 border-t border-white/20 text-center">
                            <p className="text-[var(--text-main)] opacity-70 mb-6 font-medium">Ready to transform your workflow?</p>
                            <Link href="/signup" className="block w-full py-4 rounded-2xl bg-[var(--text-main)] text-white font-bold text-xl hover:scale-[1.02] active:scale-95 transition-all shadow-lg hover:shadow-2xl">
                                Get Started for Free
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
