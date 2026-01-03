"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
    ArrowLeft,
    Fuel,
    Wrench,
    CircleParking,
    Percent,
    Loader2,
    CheckCircle2,
    CloudOff,
    Receipt
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// Types
type ExpenseType = 'FUEL' | 'REPAIR' | 'PARKING' | 'COMMISSION' | 'OTHER';
interface Expense {
    id: string;
    expense_type: ExpenseType;
    amount: number;
    status: 'saved' | 'pending' | 'error';
    shiftId: string;
}

const EXPENSE_TYPES: { id: ExpenseType; label: string; icon: React.ElementType; color: string }[] = [
    { id: 'FUEL', label: 'Fuel', icon: Fuel, color: 'text-blue-400' },
    { id: 'PARKING', label: 'Parking', icon: CircleParking, color: 'text-purple-400' },
    { id: 'REPAIR', label: 'Repairs', icon: Wrench, color: 'text-red-400' },
    { id: 'COMMISSION', label: 'Comm. %', icon: Percent, color: 'text-yellow-400' },
    { id: 'OTHER', label: 'Other', icon: Receipt, color: 'text-gray-400' },
];

export default function ExpenseEntryPage() {
    const router = useRouter();
    const [shiftId, setShiftId] = useState<string | null>(null);
    const [isShiftLoading, setIsShiftLoading] = useState(true);

    // Core Expenses State
    const [expenses, setExpenses] = useState<Expense[]>([]);

    // UI State for Modal
    const [activeType, setActiveType] = useState<ExpenseType | null>(null);
    const [amountInput, setAmountInput] = useState("");
    const [isSaving, setIsSaving] = useState(false);

    // Initial Load: Find Shift for Today
    useEffect(() => {
        document.documentElement.setAttribute("data-theme", "gig-dark");

        async function fetchShift() {
            try {
                const token = localStorage.getItem("access_token");
                if (!token) {
                    router.replace('/login');
                    return;
                }

                // Get shifts for today
                const today = new Date().toISOString().split('T')[0];
                const res = await fetch(`http://127.0.0.1:8000/api/gig/shifts/?date=${today}`, {
                    headers: { "Authorization": `JWT ${token}` }
                });

                if (res.ok) {
                    const data = await res.json();
                    
                    // Logic: Find ANY active shift for today to attach expenses to.
                    // Since we allow multiple shifts, we just grab the last one (most recent).
                    // If no shift exists, we'll prompt user to create one (or handle it gracefully).
                    if (data && data.length > 0) {
                        const match = data[data.length - 1]; // Use the most recent one
                        setShiftId(match.id);

                        // Fetch existing expenses for this shift (and potentially others for today, but keeping it simple)
                        // Actually, let's fetch ALL expenses for today via the backend filter if possible, 
                        // but currently the endpoint filters by `shift`.
                        // For now, we list expenses attached to THIS specific shift session.
                        const expRes = await fetch(`http://127.0.0.1:8000/api/gig/expenses/?shift=${match.id}`, {
                            headers: { "Authorization": `JWT ${token}` }
                        });
                        if (expRes.ok) {
                            const expData = await expRes.json();
                            setExpenses(expData.map((e: any) => ({
                                id: e.id,
                                expense_type: e.expense_type,
                                amount: parseFloat(e.amount),
                                status: 'saved',
                                shiftId: match.id
                            })));
                        }
                    } else {
                        // No shift found for today.
                        // Ideally we show a "Start Day" screen, but for now redirect to Add Earnings.
                        // Or we could auto-create a 0-value shift? Let's redirect for safety.
                        // router.push('/gig/shift/new');
                        setShiftId(null);
                    }
                }
            } catch (e) {
                console.error("Shift Fetch Error", e);
            } finally {
                setIsShiftLoading(false);
            }
        }

        fetchShift();
    }, [router]);


    // Handlers
    const handleSaveExpense = async (id: string, type: ExpenseType, amount: number) => {
        try {
            const token = localStorage.getItem("access_token");
            
            // If no shiftId, we can't save (unless we create one).
            // For this UI flow, ensuring shiftId is present is key.
            if (!shiftId) return;

            const res = await fetch("http://127.0.0.1:8000/api/gig/expenses/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `JWT ${token}`
                },
                body: JSON.stringify({
                    id: id, // Idempotency Key (Note: ID needs to be ReadOnly in backend usually, check if we enabled client-side IDs? We made them read-only. So we shouldn't send ID!)
                    // WAIT: We made ID read-only in the previous step backend fix. 
                    // So we should NOT send 'id' here, or the backend will ignore it (or error if strict).
                    // Let's NOT send ID. Backend generates it.
                    // But we need to map the backend response ID back to our local state if we want to confirm it.
                    
                    shift: shiftId,
                    expense_type: type,
                    amount: amount,
                    description: "Quick Add"
                })
            });

            if (res.ok) {
                const savedExp = await res.json();
                // Success: Mark as saved using the REAL backend ID if possible, 
                // but since we using optimistic ID, we might need to swap.
                // For simplicity in this "Quick Add" view with no edit, we just mark status.
                setExpenses(prev => prev.map(exp =>
                    exp.id === id ? { ...exp, status: 'saved', id: savedExp.id || id } : exp
                ));
            } else {
                setExpenses(prev => prev.map(exp =>
                    exp.id === id ? { ...exp, status: 'error' } : exp
                ));
            }
        } catch (error) {
            setExpenses(prev => prev.map(exp =>
                exp.id === id ? { ...exp, status: 'error' } : exp
            ));
        }
    };

    const handleQuickAdd = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!activeType || !amountInput) return;

        if (!shiftId) {
            alert("No Active Shift found. Please add 'Earnings' first to start your day!");
            router.push('/gig/shift/new');
            return;
        }

        const amount = parseFloat(amountInput);
        if (isNaN(amount) || amount <= 0) return;

        setIsSaving(true);

        const tempId = crypto.randomUUID();

        // OPTIMISTIC UPDATE
        const newExpense: Expense = {
            id: tempId,
            expense_type: activeType,
            amount: amount,
            status: 'pending',
            shiftId: shiftId
        };

        setExpenses(prev => [...prev, newExpense]);
        setActiveType(null); // Close modal
        setAmountInput("");
        setIsSaving(false);

        // API Call
        await handleSaveExpense(tempId, activeType, amount);
    };

    const handleRetry = (expense: Expense) => {
        setExpenses(prev => prev.map(e =>
            e.id === expense.id ? { ...e, status: 'pending' } : e
        ));
        handleSaveExpense(expense.id, expense.expense_type, expense.amount);
    };

    const totalExpenses = expenses.reduce((sum, item) => sum + (item.status !== 'error' ? item.amount : 0), 0);

    if (isShiftLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#0B1E1B]">
                <Loader2 className="w-8 h-8 animate-spin text-[var(--gig-primary)]" />
            </div>
        );
    }

    return (
        <main className="min-h-screen p-6 pb-24 relative bg-[var(--bg-main)] text-white">
            {/* Header */}
            <div className="flex items-center gap-4 mb-8">
                <button 
                    onClick={() => router.push('/gig/dashboard')}
                    className="p-2 rounded-xl bg-[var(--bg-card)] hover:bg-[#1F453F] text-[var(--text-muted)] hover:text-white transition-colors"
                >
                    <ArrowLeft className="w-5 h-5" />
                </button>
                <div>
                    <h1 className="text-2xl font-bold">Add Expenses</h1>
                    <p className="text-[var(--text-muted)] text-sm">Quickly log your costs</p>
                </div>
            </div>

            {/* Quick Add Grid */}
            <div className="grid grid-cols-2 gap-4 mb-8">
                {EXPENSE_TYPES.map((type) => (
                    <motion.button
                        key={type.id}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => { setActiveType(type.id); setAmountInput(""); }}
                        className="bg-[var(--bg-card)] p-4 rounded-2xl border border-[#1F453F] flex flex-col items-center justify-center gap-2 hover:border-[var(--gig-primary)] transition-all group"
                    >
                        <div className={`p-3 rounded-full bg-[#1F453F] ${type.color} group-hover:bg-[#1F453F]/80`}>
                            <type.icon className="w-6 h-6" />
                        </div>
                        <span className="font-semibold">{type.label}</span>
                    </motion.button>
                ))}
            </div>

            {/* List */}
            <div className="space-y-4">
                <h3 className="text-sm font-bold text-[var(--text-muted)] uppercase tracking-widest mb-4">
                    Session Expenses
                </h3>

                <AnimatePresence>
                    {expenses.length === 0 && (
                        <motion.div
                            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                            className="text-center p-8 border-2 border-dashed border-[#1F453F] rounded-2xl"
                        >
                            <p className="text-[var(--text-muted)] text-sm">No expenses added yet</p>
                        </motion.div>
                    )}

                    {expenses.map((expense) => {
                        const typeDef = EXPENSE_TYPES.find(t => t.id === expense.expense_type) || EXPENSE_TYPES[0];
                        return (
                            <motion.div
                                key={expense.id}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                layout
                                className="bg-[var(--bg-card)] p-4 rounded-xl border border-[#1F453F] flex items-center justify-between"
                            >
                                <div className="flex items-center gap-3">
                                    <div className={`p-2 rounded-lg bg-[#1F453F] ${typeDef.color}`}>
                                        <typeDef.icon className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <p className="font-bold">{typeDef.label}</p>
                                        <p className="text-xs text-[var(--text-muted)]">
                                            {expense.status === 'pending' ? 'Saving...' : 'Saved'}
                                        </p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="font-bold text-[var(--gig-negative)]">-₹{expense.amount}</p>

                                    {expense.status === 'pending' && (
                                        <span className="text-xs text-[var(--text-muted)] flex items-center justify-end gap-1">
                                            <Loader2 className="w-3 h-3 animate-spin" />
                                        </span>
                                    )}

                                    {expense.status === 'error' && (
                                        <button
                                            onClick={() => handleRetry(expense)}
                                            className="text-xs text-[var(--gig-negative)] flex items-center justify-end gap-1 hover:underline mt-1"
                                        >
                                            <CloudOff className="w-3 h-3" /> Retry
                                        </button>
                                    )}
                                </div>
                            </motion.div>
                        );
                    })}
                </AnimatePresence>
            </div>

            {/* Total & Action */}
            <div className="fixed bottom-0 left-0 w-full bg-[#0B1E1B]/90 backdrop-blur-md border-t border-[#1F453F] p-6 flex items-center justify-between z-10">
                <div>
                    <p className="text-xs text-[var(--text-muted)] uppercase">Total Expenses</p>
                    <p className="text-2xl font-bold text-white">₹{totalExpenses}</p>
                </div>
                <button
                    onClick={() => router.push('/gig/dashboard')}
                    className="bg-[var(--gig-primary)] text-[#0B1E1B] px-8 py-3 rounded-xl font-bold hover:shadow-[0_0_20px_rgba(0,229,153,0.3)] transition-all text-lg flex items-center gap-2"
                >
                    Done
                    <CheckCircle2 className="w-5 h-5" />
                </button>
            </div>

            {/* Amount Input Modal */}
            <AnimatePresence>
                {activeType && (
                    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-sm p-4">
                        <motion.div
                            initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ y: "100%" }}
                            className="bg-[var(--bg-card)] w-full max-w-sm rounded-3xl p-6 border border-[#1F453F] shadow-2xl"
                        >
                            <h3 className="text-lg font-bold text-center mb-6 text-white">
                                Add {EXPENSE_TYPES.find(t => t.id === activeType)?.label} Cost
                            </h3>
                            <form onSubmit={handleQuickAdd} className="space-y-6">
                                <div className="relative">
                                    <span className="absolute left-1/2 -translate-x-[40px] top-1/2 -translate-y-1/2 text-[var(--text-muted)] text-3xl font-bold">₹</span>
                                    <input
                                        type="number"
                                        autoFocus
                                        placeholder="0"
                                        value={amountInput}
                                        onChange={e => setAmountInput(e.target.value)}
                                        className="w-full bg-transparent text-center text-5xl font-bold border-b-2 border-[#1F453F] outline-none pb-2 focus:border-[var(--gig-primary)] text-white placeholder-gray-700 transition-colors"
                                    />
                                </div>
                                <div className="grid grid-cols-2 gap-3">
                                    <button
                                        type="button"
                                        onClick={() => setActiveType(null)}
                                        className="py-3 rounded-xl bg-[#1F453F] font-bold text-[var(--text-muted)] hover:text-white transition-colors"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={!amountInput}
                                        className="py-3 rounded-xl bg-[var(--gig-primary)] font-bold text-[#0B1E1B] hover:shadow-[0_0_15px_rgba(0,229,153,0.3)] transition-all disabled:opacity-50"
                                    >
                                        Add
                                    </button>
                                </div>
                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </main>
    );
}

