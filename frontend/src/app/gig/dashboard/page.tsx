"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
    TrendingUp,
    Wallet,
    Target,
    Plus,
    Fuel,
    Equal,
    Trophy
} from "lucide-react";
import { motion } from "framer-motion";
import confetti from "canvas-confetti"; // Requires npm install canvas-confetti

// Types
import { API_URL } from "../../../config";

// Types
interface DashboardData {
    earnings_total: number;
    expenses_total: number;
    net_income: number;
    savings_goal: {
        target: number;
        progress_percentage: number;
        status: string;
    } | null;
}

interface HabitStatus {
    day_completed: boolean;
}

const fetchWithRetry = async (url: string, options: any, retries = 3, backoff = 1000): Promise<Response> => {
    try {
        const res = await fetch(url, options);
        // Retry on 5xx errors or network errors (which go to catch)
        if (!res.ok && res.status >= 500) {
            throw new Error(`Server error: ${res.status}`);
        }
        return res;
    } catch (err) {
        if (retries > 0) {
            console.warn(`Fetch failed, retrying in ${backoff}ms... (${retries} left)`);
            await new Promise(r => setTimeout(r, backoff));
            return fetchWithRetry(url, options, retries - 1, backoff * 2);
        }
        throw err;
    }
}

export default function DashboardPage() {
    const router = useRouter();
    const [data, setData] = useState<DashboardData | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [user] = useState("Ramesh");

    useEffect(() => {
        // Enforce Theme (Redundant with layout but safe)
        document.documentElement.setAttribute("data-theme", "gig-dark");

        const fetchDashboardData = async () => {
            try {
                const token = localStorage.getItem("access_token");
                if (!token) {
                    router.replace('/login');
                    return;
                }

                const today = new Date().toISOString().split('T')[0];

                // 1. Fetch Daily Summary
                try {
                    const res = await fetchWithRetry(`${API_URL}/api/gig/summary/daily?date=${today}`, {
                        headers: { "Authorization": `JWT ${token}` }
                    });

                    if (res.ok) {
                        const json = await res.json();
                        setData(json);

                        // 2. Check Habit Status for Celebration (GW-016)
                        const statusRes = await fetch(`${API_URL}/api/gig/summary/status`, {
                            headers: { "Authorization": `JWT ${token}` }
                        });

                        if (statusRes.ok) {
                            const statusJson: HabitStatus = await statusRes.json();
                            if (statusJson.day_completed) {
                                triggerCelebration();
                            }
                        }
                    } else {
                        if (res.status === 401) {
                            // Handle token expiry if not handled by interceptor logic (usually we want a centralized fetch wrapper)
                            // For now assuming the page redirects if 401 persists
                            setError("Session expired. Please login again.");
                            localStorage.removeItem("access_token");
                            router.replace('/login');
                            return;
                        }
                        setError(`Failed to load data: ${res.statusText}`);
                    }
                } catch (err) {
                    setError("Network error. Please check your connection.");
                }

            } catch (error) {
                console.error("Dashboard Load Error", error);
                setError("An unexpected error occurred.");
            } finally {
                setIsLoading(false);
            }
        };

        fetchDashboardData();
    }, [router]);

    const triggerCelebration = () => {
        // Confetti Canvas Animation
        const duration = 3000;
        const animationEnd = Date.now() + duration;
        const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

        const randomInRange = (min: number, max: number) => {
            return Math.random() * (max - min) + min;
        }

        const interval: any = setInterval(function () {
            const timeLeft = animationEnd - Date.now();

            if (timeLeft <= 0) {
                return clearInterval(interval);
            }

            const particleCount = 50 * (timeLeft / duration);
            confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
            confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
        }, 250);
    };

    if (isLoading) return <div className="p-8 text-center text-white">Loading dashboard...</div>;

    if (error) {
        return (
            <main className="p-8 space-y-8 max-w-7xl mx-auto text-white text-center">
                <div className="bg-red-900/50 p-6 rounded-xl border border-red-500">
                    <h2 className="text-xl font-bold mb-2">Error</h2>
                    <p>{error}</p>
                    <button onClick={() => window.location.reload()} className="mt-4 bg-white text-red-900 px-4 py-2 rounded font-bold">Retry</button>
                </div>
            </main>
        );
    }

    return (
        <main className="p-8 space-y-8 max-w-7xl mx-auto text-white">

            {/* Header */}
            <header className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold">Welcome back, {user}</h1>
                    <p className="text-[var(--text-muted)] mt-1">
                        {new Date().toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'short', year: 'numeric' })}
                    </p>
                </div>
                <button
                    onClick={() => router.push('/gig/shift/new')}
                    className="flex items-center gap-2 bg-[var(--gig-primary)] text-[#0B1E1B] font-bold px-6 py-3 rounded-xl hover:opacity-90 transition-opacity"
                >
                    <Plus className="w-5 h-5" />
                    <span>Add Earnings</span>
                </button>
            </header>

            {/* Income Equation Card */}
            <section className="bg-[var(--bg-card)] rounded-3xl p-8 border border-[#1F453F]">
                <div className="flex items-center gap-3 mb-8">
                    <div className="w-10 h-10 rounded-lg bg-[#1F453F] flex items-center justify-center">
                        <Wallet className="w-5 h-5 text-[var(--gig-primary)]" />
                    </div>
                    <h2 className="text-xl font-bold">Today&apos;s Income Summary</h2>
                    <span className="ml-auto text-xs font-bold bg-[#1F453F] text-[var(--text-muted)] px-3 py-1 rounded-full border border-[#2A5A52]">
                        Daily View
                    </span>
                </div>

                <div className="flex flex-col md:flex-row items-center gap-4 justify-between">
                    {/* Gross Earnings */}
                    <div className="flex-1 w-full bg-[#0B1E1B] p-6 rounded-2xl border border-[#1F453F] text-center">
                        <p className="text-[var(--text-muted)] text-xs font-bold uppercase tracking-wider mb-2">Gross Earnings</p>
                        <p className="text-3xl font-bold text-white">₹{data?.earnings_total || 0}</p>
                    </div>

                    {/* Operator */}
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-[#1F453F] text-[var(--text-muted)] shrink-0">
                        <span className="font-bold text-xl">-</span>
                    </div>

                    {/* Fuel / Expenses */}
                    <div className="flex-1 w-full bg-[#0B1E1B] p-6 rounded-2xl border border-[#1F453F] text-center relative overflow-hidden">
                        <p className="text-[var(--text-muted)] text-xs font-bold uppercase tracking-wider mb-2 flex items-center justify-center gap-2">
                            <Fuel className="w-3 h-3" /> Fuel Cost
                        </p>
                        <p className="text-3xl font-bold text-[var(--gig-negative)] mb-3">-₹{data?.expenses_total || 0}</p>

                        <button
                            onClick={() => router.push('/gig/expense/new')}
                            className="text-xs bg-[var(--gig-negative)]/10 text-[var(--gig-negative)] px-3 py-1.5 rounded-lg border border-[var(--gig-negative)]/20 hover:bg-[var(--gig-negative)] hover:text-white transition-all font-bold flex items-center gap-1 mx-auto"
                        >
                            <Plus className="w-3 h-3" /> Add Expense
                        </button>
                    </div>

                    {/* Operator */}
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-[#1F453F] text-[var(--text-muted)] shrink-0">
                        <Equal className="w-5 h-5" />
                    </div>

                    {/* Net Income (The Hero) */}
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="flex-1 w-full bg-gradient-to-br from-[#1F453F] to-[#132A26] p-6 rounded-2xl border border-[var(--gig-primary)] relative items-center flex flex-col justify-center shadow-[0_0_30px_rgba(0,229,153,0.1)]"
                    >
                        <div className="absolute top-3 right-3 w-2 h-2 rounded-full bg-[var(--gig-primary)] animate-pulse"></div>
                        <p className="text-[var(--gig-primary)] text-xs font-bold uppercase tracking-wider mb-2">Net Income</p>
                        <p className="text-5xl font-bold text-white mb-2">₹{data?.net_income || 0}</p>
                        <div className="flex items-center gap-1 text-[var(--gig-primary)] text-xs font-bold bg-[#00E599]/10 px-2 py-1 rounded">
                            <TrendingUp className="w-3 h-3" />
                            <span>Active Today</span>
                        </div>
                    </motion.div>
                </div>
            </section>

            <div className="grid md:grid-cols-3 gap-8">
                {/* Savings Goal Card */}
                <section className="md:col-span-2 bg-[var(--bg-card)] rounded-3xl p-8 border border-[#1F453F] relative">
                    <div className="flex items-center justify-between mb-8">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg bg-[#1F453F] flex items-center justify-center">
                                <Target className="w-5 h-5 text-[var(--gig-primary)]" />
                            </div>
                            <div>
                                <h2 className="text-xl font-bold">Savings Goal</h2>
                                <p className="text-xs text-[var(--text-muted)]">Bike Repair Fund</p>
                            </div>
                        </div>
                        <div className="text-right">
                            <p className="text-3xl font-bold text-[var(--gig-primary)]">
                                {data?.savings_goal ? data.savings_goal.progress_percentage : 0}%
                            </p>
                            <p className="text-[var(--text-muted)] text-xs font-bold uppercase">Completed</p>
                        </div>
                    </div>

                    {data?.savings_goal ? (
                        <div className="bg-[#0B1E1B] rounded-2xl p-6 border border-[#1F453F]">
                            <div className="flex justify-between mb-2 text-sm font-medium">
                                <span className="text-white">₹{data.net_income} Saved</span>
                                <span className="text-[var(--text-muted)]">Target: ₹{data.savings_goal.target}</span>
                            </div>
                            {/* Progress Bar Container */}
                            <div className="h-4 w-full bg-[#1F453F] rounded-full overflow-hidden relative">
                                <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: `${Math.min(data.savings_goal.progress_percentage, 100)}%` }}
                                    transition={{ duration: 1.5, ease: "easeOut" }}
                                    className="h-full bg-[var(--gig-primary)] rounded-full shadow-[0_0_15px_#00E599]"
                                />
                            </div>
                            <p className="mt-4 text-xs text-[#A0B3B0] flex items-center gap-2">
                                <span className="inline-block w-4 h-4 rounded-full bg-[#1F453F] text-center leading-4 text-[var(--gig-primary)] font-bold">i</span>
                                {data.savings_goal.progress_percentage >= 100
                                    ? "Goal Achieved! Great job."
                                    : `Just ₹${(data.savings_goal.target - data.net_income).toFixed(0)} more to go!`
                                }
                            </p>
                        </div>
                    ) : (
                        <div
                            onClick={() => router.push('/gig/savings')}
                            className="bg-[#0B1E1B] rounded-2xl p-8 border border-dashed border-[#1F453F] flex flex-col items-center justify-center cursor-pointer hover:border-[var(--gig-primary)] transition-colors"
                        >
                            <p className="text-[var(--text-muted)] font-medium">No goal set for today</p>
                            <button className="mt-4 text-[var(--gig-primary)] font-bold text-sm">Set Goal</button>
                        </div>
                    )}

                    <button
                        onClick={() => router.push('/gig/savings')}
                        className="mt-6 w-full py-4 rounded-xl bg-[#1F453F] text-white font-bold hover:bg-[#2A5A52] transition-colors flex items-center justify-center gap-2"
                    >
                        <Plus className="w-4 h-4" /> Top Up Fund
                    </button>
                </section>

                {/* Leaderboard Mockup */}
                <section className="bg-[var(--bg-card)] rounded-3xl p-6 border border-[#1F453F]">
                    <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg bg-[#1F453F] flex items-center justify-center">
                                <Trophy className="w-5 h-5 text-[var(--gig-primary)]" />
                            </div>
                            <h2 className="text-xl font-bold">Your Rank</h2>
                        </div>
                        <span className="text-[var(--gig-primary)] text-sm font-bold cursor-pointer">View All</span>
                    </div>

                    <div className="space-y-4">
                        {/* Other User */}
                        <div className="flex items-center justify-between p-3 rounded-xl opacity-50">
                            <div className="flex items-center gap-3">
                                <span className="font-bold text-[var(--text-muted)]">#44</span>
                                <div className="w-8 h-8 rounded-full bg-gray-600"></div>
                                <span className="font-medium">Vijay S.</span>
                            </div>
                        </div>

                        {/* Current User (Highlighed) */}
                        <div className="flex items-center justify-between p-4 rounded-xl bg-[#0B1E1B] border border-[var(--gig-primary)] shadow-lg transform scale-105">
                            <div className="flex items-center gap-3">
                                <span className="font-bold text-[var(--gig-primary)]">#45</span>
                                <div className="w-10 h-10 rounded-full bg-[#E6E6E6] text-black flex items-center justify-center font-bold">RK</div>
                                <div>
                                    <p className="font-bold text-white">You</p>
                                    <p className="text-[10px] text-[var(--text-muted)]">1,240 Points</p>
                                </div>
                            </div>
                            <Trophy className="w-4 h-4 text-[var(--gig-primary)]" />
                        </div>

                        {/* Other User */}
                        <div className="flex items-center justify-between p-3 rounded-xl opacity-50">
                            <div className="flex items-center gap-3">
                                <span className="font-bold text-[var(--text-muted)]">#46</span>
                                <div className="w-8 h-8 rounded-full bg-gray-600"></div>
                                <span className="font-medium">Amit P.</span>
                            </div>
                        </div>
                    </div>

                    <div className="mt-6 bg-[#1F453F] p-4 rounded-xl text-center">
                        <p className="text-xs text-[var(--text-muted)]">
                            You are <span className="text-[var(--gig-primary)] font-bold">50 points</span> away from rank #44!
                        </p>
                    </div>
                </section>
            </div>
        </main>
    );
}
