"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
    ChevronLeft,
    Target,
    TrendingUp,
    CheckCircle2,
    AlertCircle,
    Loader2
} from "lucide-react";
import { motion } from "framer-motion";
import { logEvent } from "@/lib/events";

export default function SavingsPage() {
    const router = useRouter();

    // State
    const [isLoading, setIsLoading] = useState(true);
    const [goalAmount, setGoalAmount] = useState<number>(0); // Target
    const [currentSavings, setCurrentSavings] = useState<number>(0); // Net Income
    const [inputGoal, setInputGoal] = useState("");
    const [isSaving, setIsSaving] = useState(false);

    // Motivation Message
    const [nudge, setNudge] = useState("Set a goal to track your progress!");

    const updateNudge = (current: number, target: number) => {
        if (target <= 0) {
            setNudge("Set a target to start saving!");
        } else if (current >= target) {
            setNudge("🎉 Amazing! You've hit your daily goal!");
        } else {
            const remaining = target - current;
            setNudge(`₹${remaining.toFixed(0)} more to reach your goal!`);
        }
    };

    useEffect(() => {
        document.documentElement.setAttribute("data-theme", "gig");

        const fetchData = async () => {
            try {
                const token = localStorage.getItem("access_token");
                const today = new Date().toISOString().split('T')[0];

                const res = await fetch(`http://127.0.0.1:8000/api/gig/summary/daily?date=${today}`, {
                    headers: { "Authorization": `JWT ${token}` }
                });

                if (res.ok) {
                    const data = await res.json();
                    const net = parseFloat(data.net_income || 0);
                    setCurrentSavings(net);

                    if (data.savings_goal) {
                        const target = parseFloat(data.savings_goal.target);
                        setGoalAmount(target);
                        setInputGoal(target.toString());
                        updateNudge(net, target);
                    }
                }
            } catch (error) {
                console.error("Fetch Error", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);

    const handleSaveGoal = async (e: React.FormEvent) => {
        e.preventDefault();
        const target = parseFloat(inputGoal);
        if (isNaN(target) || target <= 0) return;

        setIsSaving(true);
        try {
            const token = localStorage.getItem("access_token");
            const today = new Date().toISOString().split('T')[0];

            const res = await fetch("http://127.0.0.1:8000/api/gig/savings/goal/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `JWT ${token}`
                },
                body: JSON.stringify({
                    date: today,
                    daily_target_amount: target
                })
            });

            if (res.ok) {
                setGoalAmount(target);
                updateNudge(currentSavings, target);

                logEvent('savings_goal_set', {
                    target: target,
                    date: today
                });
                // Optional: Show toast
            }
        } catch (error) {
            console.error("Save Error", error);
        } finally {
            setIsSaving(false);
        }
    };

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#fffbf5]">
                <Loader2 className="w-8 h-8 animate-spin text-orange-500" />
            </div>
        );
    }

    // Progress Calculation
    const progressPercent = goalAmount > 0
        ? Math.min(Math.max((currentSavings / goalAmount) * 100, 0), 100)
        : 0;

    return (
        <main className="min-h-screen p-6 relative bg-[var(--bg-main)]">
            {/* Header */}
            <div className="flex items-center gap-4 mb-8">
                <button onClick={() => router.back()} className="p-2 bg-white rounded-full shadow-sm hover:bg-gray-50">
                    <ChevronLeft className="w-6 h-6 text-gray-700" />
                </button>
                <h1 className="text-2xl font-bold text-[var(--text-main)]">Daily Goal</h1>
            </div>

            {/* Main Content */}
            <div className="space-y-6 max-w-md mx-auto">

                {/* Persistence Banner */}
                <div className="bg-blue-50 text-blue-700 px-4 py-3 rounded-xl text-sm flex items-center gap-2 border border-blue-100">
                    <AlertCircle className="w-4 h-4" />
                    Goals reset at midnight daily
                </div>

                {/* Progress Card */}
                <div className="bg-white rounded-3xl p-8 shadow-xl border border-orange-50">
                    <div className="flex items-center justify-between mb-4">
                        <span className="text-sm font-semibold text-gray-400 uppercase tracking-wider">Progress</span>
                        <div className="flex items-center gap-1 text-[var(--gig-green)] font-bold">
                            <TrendingUp className="w-4 h-4" />
                            {progressPercent.toFixed(0)}%
                        </div>
                    </div>

                    {/* Bar container */}
                    <div className="h-6 w-full bg-gray-100 rounded-full overflow-hidden mb-6 relative inner-shadow">
                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${progressPercent}%` }}
                            transition={{ duration: 1.2, ease: "circOut" }}
                            className="h-full bg-[var(--gig-green)] rounded-full relative"
                        >
                            {/* Shine effect */}
                            <div className="absolute top-0 right-0 bottom-0 w-full bg-gradient-to-l from-white/30 to-transparent" />
                        </motion.div>
                    </div>

                    <p className="text-center font-medium text-gray-700 text-lg">
                        {nudge}
                    </p>
                </div>

                {/* Goal Setting */}
                <form onSubmit={handleSaveGoal} className="bg-white/50 glass-panel rounded-3xl p-6 border border-white/50">
                    <label className="block text-center text-sm font-medium text-gray-500 mb-4 uppercase">
                        Your Target for Today (₹)
                    </label>

                    <div className="flex items-center gap-4">
                        <div className="relative flex-1">
                            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                                <Target className="w-5 h-5" />
                            </div>
                            <input
                                type="number"
                                value={inputGoal}
                                onChange={(e) => setInputGoal(e.target.value)}
                                placeholder="e.g. 1000"
                                className="w-full pl-12 pr-4 py-4 rounded-xl bg-white border border-gray-200 focus:border-[var(--gig-orange)] focus:ring-2 focus:ring-orange-100 outline-none font-bold text-xl text-gray-800 transition-all"
                            />
                        </div>
                        <button
                            type="submit"
                            disabled={isSaving || !inputGoal}
                            className="bg-[var(--gig-orange)] text-white p-4 rounded-xl shadow-lg shadow-orange-500/20 active:scale-95 transition-all hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isSaving ? <Loader2 className="w-6 h-6 animate-spin" /> : <CheckCircle2 className="w-6 h-6" />}
                        </button>
                    </div>
                </form>

            </div>
        </main>
    );
}
