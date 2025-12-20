"use client";

import {
    Plus,
    Send,
    Download,
    Wallet,
    Clock,
    PiggyBank,
    ArrowUpRight,
    ArrowDownRight,
    MoreHorizontal
} from "lucide-react";

export default function DashboardPage() {
    const transactions = [
        {
            id: 1,
            name: "Uber Payment",
            date: "Today, 10:23 AM",
            amount: "+ ₹450.00",
            type: "income",
            icon: ArrowUpRight,
            category: "Ride",
        },
        {
            id: 2,
            name: "Chai Point",
            date: "Today, 09:15 AM",
            amount: "- ₹85.00",
            type: "expense",
            icon: ArrowDownRight,
            category: "Food",
        },
        {
            id: 3,
            name: "Client Invoice #002",
            date: "Yesterday, 4:00 PM",
            amount: "+ ₹12,000.00",
            type: "income",
            icon: ArrowUpRight,
            category: "Freight",
        },
        {
            id: 4,
            name: "Petrol Station",
            date: "Yesterday, 8:30 AM",
            amount: "- ₹2,100.00",
            type: "expense",
            icon: ArrowDownRight,
            category: "Fuel",
        },
    ];

    return (
        <div className="space-y-8 pb-10">

            {/* Section A: Header & Actions */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-[var(--text-main)]">Good Morning, Rajesh</h1>
                    <p className="text-[var(--text-main)] opacity-60">Here is your financial overview for today.</p>
                </div>

                <div className="flex items-center gap-3">
                    {/* Download Report */}
                    <button className="flex items-center gap-2 px-4 py-2 rounded-xl border border-[var(--text-main)]/20 text-[var(--text-main)] font-medium hover:bg-[var(--text-main)]/5 transition-colors">
                        <Download className="w-4 h-4" />
                        <span className="hidden sm:inline">Report</span>
                    </button>

                    {/* Send Invoice */}
                    <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 text-[var(--text-main)] font-medium hover:bg-white/20 transition-colors">
                        <Send className="w-4 h-4" />
                        <span className="hidden sm:inline">Invoice</span>
                    </button>

                    {/* Add Expense (Primary) */}
                    <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[var(--orb1)] text-[var(--btn-text)] font-bold hover:opacity-90 transition-colors shadow-lg shadow-[var(--orb1)]/20">
                        <Plus className="w-5 h-5" />
                        <span>Add Expense</span>
                    </button>
                </div>
            </div>

            {/* Section B: Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Card 1: Revenue */}
                <div className="glass-panel p-6 rounded-2xl border border-white/10 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                        <Wallet className="w-16 h-16 text-[var(--text-main)]" />
                    </div>
                    <div className="flex items-start justify-between mb-4">
                        <div className="p-3 rounded-xl bg-[var(--accent-secondary)]/10 text-[var(--accent-secondary)]">
                            <Wallet className="w-6 h-6" />
                        </div>
                        <span className="flex items-center gap-1 text-xs font-medium text-green-400 bg-green-400/10 px-2 py-1 rounded-full">
                            +12% <ArrowUpRight className="w-3 h-3" />
                        </span>
                    </div>
                    <p className="text-[var(--text-main)] opacity-60 text-sm">Total Revenue</p>
                    <h3 className="text-3xl font-bold text-[var(--text-main)] mt-1">₹45,200</h3>
                </div>

                {/* Card 2: Pending Invoices */}
                <div className="glass-panel p-6 rounded-2xl border border-white/10 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                        <Clock className="w-16 h-16 text-yellow-400" />
                    </div>
                    <div className="flex items-start justify-between mb-4">
                        <div className="p-3 rounded-xl bg-yellow-400/10 text-yellow-400">
                            <Clock className="w-6 h-6" />
                        </div>
                    </div>
                    <p className="text-[var(--text-main)] opacity-60 text-sm">Pending Invoices</p>
                    <h3 className="text-3xl font-bold text-yellow-400 mt-1">₹12,800</h3>
                </div>

                {/* Card 3: Tax Saved */}
                <div className="glass-panel p-6 rounded-2xl border border-white/10 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                        <PiggyBank className="w-16 h-16 text-green-400" />
                    </div>
                    <div className="flex items-start justify-between mb-4">
                        <div className="p-3 rounded-xl bg-green-400/10 text-green-400">
                            <PiggyBank className="w-6 h-6" />
                        </div>
                        <span className="flex items-center gap-1 text-xs font-medium text-green-400 bg-green-400/10 px-2 py-1 rounded-full">
                            Safe
                        </span>
                    </div>
                    <p className="text-[var(--text-main)] opacity-60 text-sm">Tax Saved</p>
                    <h3 className="text-3xl font-bold text-green-400 mt-1">₹8,450</h3>
                </div>
            </div>

            {/* Section C: Recent Activity */}
            <div className="glass-panel rounded-2xl border border-white/10 overflow-hidden">
                <div className="p-6 border-b border-white/10 flex items-center justify-between">
                    <h2 className="text-lg font-bold text-[var(--text-main)]">Recent Transactions</h2>
                    <button className="text-sm text-[var(--orb1)] font-medium hover:underline">View All</button>
                </div>

                <div className="divide-y divide-white/5">
                    {transactions.map((t) => (
                        <div key={t.id} className="p-4 flex items-center justify-between hover:bg-white/5 transition-colors group">
                            <div className="flex items-center gap-4">
                                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${t.type === 'income'
                                    ? 'bg-green-400/10 text-green-400'
                                    : 'bg-red-400/10 text-red-400'
                                    }`}>
                                    <t.icon className="w-5 h-5" />
                                </div>
                                <div>
                                    <p className="text-[var(--text-main)] font-medium">{t.name}</p>
                                    <p className="text-[var(--text-main)] opacity-40 text-xs">{t.date}</p>
                                </div>
                            </div>

                            <div className="text-right">
                                <p className={`font-bold ${t.type === 'income' ? 'text-green-400' : 'text-[var(--text-main)]'
                                    }`}>
                                    {t.amount}
                                </p>
                                <p className="text-[var(--text-main)] opacity-40 text-xs capitalize">{t.category}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

        </div>
    );
}
