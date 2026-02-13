'use client'

import React from 'react';
import { motion } from 'framer-motion';
import Button from './Button';
import {
    ArrowRight,
    LayoutDashboard,
    Users,
    Link as LinkIcon,
    TrendingUp,
    PieChart,
    Wallet,
    ShieldCheck,
    MousePointer2,
    CheckCircle2,
    Trophy,
    BarChart2,
    Globe,
    DollarSign
} from 'lucide-react';
import Image from 'next/image';

export function Hero() {
    const handleStartEarning = () => {
        window.location.href = '/signup';
    };

    return (
        <section className="relative min-h-screen flex flex-col items-center justify-center pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden bg-[#050505]">

            {/* Abstract Tech Background */}
            <div className="absolute inset-0 z-0 pointer-events-none select-none overflow-hidden bg-[#050505]">

                {/* CANDLE BACKGROUND LAYER */}
                <div className="absolute inset-0 hidden md:flex items-end justify-center gap-4 lg:gap-8 opacity-[0.05] px-4 -mb-20">
                    {[...Array(15)].map((_, i) => {
                        const isGreen = i % 3 !== 0;
                        const height = 20 + Math.random() * 40;
                        const delay = i * 0.1;
                        return (
                            <div key={i} className="w-16 md:w-32 relative flex flex-col items-center justify-end h-[80%] will-change-transform transform-gpu">
                                <motion.div initial={{ height: 0 }} animate={{ height: 60 }} transition={{ duration: 1, delay }} className={`w-[2px] ${isGreen ? 'bg-[#00E676]' : 'bg-slate-600'} opacity-50`}></motion.div>
                                <motion.div initial={{ height: 0 }} animate={{ height: `${height}%` }} transition={{ duration: 1.5, delay, ease: "easeOut" }} className={`w-full ${isGreen ? 'bg-[#00E676]' : 'bg-slate-700'} rounded-sm opacity-80`}></motion.div>
                                <motion.div initial={{ height: 0 }} animate={{ height: 60 }} transition={{ duration: 1, delay }} className={`w-[2px] ${isGreen ? 'bg-[#00E676]' : 'bg-slate-600'} opacity-50`}></motion.div>
                            </div>
                        )
                    })}
                </div>

                {/* MOBILE BG */}
                <div className="absolute inset-0 md:hidden bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#00E676]/10 via-[#050505] to-[#050505] opacity-50"></div>

                {/* DESKTOP BLURS */}
                <div className="hidden md:block absolute top-[20%] left-[20%] w-[40vw] h-[40vw] bg-[#00E676]/20 blur-[150px] rounded-full mix-blend-screen animate-pulse opacity-20 will-change-transform transform-gpu"></div>
                <div className="hidden md:block absolute bottom-[10%] right-[10%] w-[30vw] h-[30vw] bg-white/5 blur-[100px] rounded-full mix-blend-overlay opacity-20 will-change-transform transform-gpu"></div>

                <div className="absolute bottom-0 left-0 right-0 h-[50vh] bg-[linear-gradient(to_bottom,transparent_0%,rgba(0,230,118,0.05)_100%)] [mask-image:linear-gradient(to_bottom,transparent,black)]"></div>
            </div>

            <div className="max-w-[1600px] mx-auto px-6 relative z-10 text-center flex flex-col items-center w-full">

                {/* Signal Badge */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full border border-[#00E676]/20 bg-[#00E676]/5 backdrop-blur-md mb-8"
                >
                    <span className="flex h-2 w-2 relative">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00E676] opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00E676]"></span>
                    </span>
                    <span className="text-[10px] font-mono font-bold text-[#00E676] tracking-[0.2em] uppercase">
                        Partner Program v2.0
                    </span>
                </motion.div>

                {/* Main Headline */}
                <motion.h1
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className="text-[10vw] md:text-8xl lg:text-[7.5rem] font-black text-white tracking-tighter leading-[0.9] mb-8 drop-shadow-2xl"
                >
                    MONETIZE YOUR <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-b from-slate-400 to-slate-700">INFLUENCE.</span>
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.8 }}
                    className="max-w-2xl text-lg md:text-xl text-slate-400 font-medium mb-10 leading-relaxed"
                >
                    Tradal is the #1 AI-powered trading journal. <br />
                    <span className="text-white font-bold">Earn 20% recurring commissions</span> for every trader you refer.
                </motion.p>

                {/* CTAs */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.8 }}
                    className="flex flex-col sm:flex-row items-center gap-6 mb-32 w-full sm:w-auto"
                >
                    <Button
                        variant="primary"
                        size="lg"
                        onClick={handleStartEarning}
                        className="w-full sm:w-auto h-14 px-4 sm:px-10 text-base sm:text-lg font-extrabold flex items-center justify-center whitespace-nowrap"
                    >
                        START EARNING NOW
                        <ArrowRight className="ml-2 w-5 h-5" />
                    </Button>
                    <a href="#features" className="text-sm font-mono font-bold text-slate-500 hover:text-[#00E676] uppercase tracking-widest border-b-2 border-transparent hover:border-[#00E676] transition-all pb-1">
                        View Commission Rates
                    </a>
                </motion.div>

                {/* === 3D DASHBOARD VISUALIZATION === */}
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ delay: 0.2, duration: 1.2, ease: "circOut" }}
                    style={{ transformPerspective: 2000 }}
                    className="w-full max-w-[1400px] relative z-20 group transform-gpu"
                >
                    {/* Ambient Glow behind dashboard */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] h-[80%] bg-[#00E676]/20 blur-[120px] -z-10 rounded-[3rem] opacity-60 group-hover:opacity-80 transition-opacity duration-1000"></div>

                    {/* Floating Feature Widgets (Orbiting) */}
                    <div className="absolute inset-0 pointer-events-none z-30">
                        {/* Top Left: Active Referrals */}
                        <motion.div
                            animate={{ y: [0, -15, 0] }}
                            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                            className="absolute top-[-20px] left-0 scale-[0.35] origin-bottom-left lg:scale-100 lg:-top-12 lg:-left-12"
                        >
                            <div className="bg-[#151515]/90 border border-white/10 p-4 rounded-xl shadow-2xl flex items-center gap-3 w-64 ring-1 ring-white/5 backdrop-blur-xl">
                                <div className="w-10 h-10 rounded-full bg-[#00E676]/10 flex items-center justify-center shrink-0">
                                    <Users className="w-5 h-5 text-[#00E676]" />
                                </div>
                                <div>
                                    <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Active Referrals</div>
                                    <div className="text-xs font-bold text-white">4 New Signups Today</div>
                                </div>
                            </div>
                        </motion.div>

                        {/* Bottom Right: Conversion Rate */}
                        <motion.div
                            animate={{ y: [0, 20, 0] }}
                            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                            className="absolute bottom-[-10px] right-0 scale-[0.35] origin-top-right lg:scale-100 lg:-bottom-16 lg:-right-8"
                        >
                            <div className="bg-[#0A0A0A]/90 border border-white/10 p-5 rounded-2xl shadow-2xl backdrop-blur-xl w-64 ring-1 ring-[#00E676]/20">
                                <div className="flex justify-between items-center mb-4">
                                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Conversion Rate</span>
                                    <TrendingUp className="w-4 h-4 text-[#00E676]" />
                                </div>
                                <div className="flex items-baseline gap-3 mb-2">
                                    <span className="text-4xl font-black text-white">12.4%</span>
                                    <span className="text-xs font-bold text-[#00E676] bg-[#00E676]/10 px-1.5 py-0.5 rounded">▲ 2.1%</span>
                                </div>
                                <div className="flex gap-1 h-8 items-end opacity-80">
                                    {[40, 65, 50, 80, 60, 90, 75].map((h, i) => (
                                        <div key={i} className={`flex-1 rounded-t-sm ${i === 6 ? 'bg-[#00E676]' : 'bg-white/10'}`} style={{ height: `${h}%` }}></div>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    </div>

                    {/* Dashboard Container (Responsive Scaling) */}
                    <div className="w-full flex justify-center h-[240px] xs:h-[280px] sm:h-[500px] md:h-[680px] lg:h-[820px] xl:h-[920px] overflow-hidden rounded-[1.5rem] sm:rounded-[3rem] shadow-[0_0_80px_-20px_rgba(0,0,0,0.8)] border border-white/10 bg-[#050505] relative ring-1 ring-[#00E676]/30">

                        {/* Glass Reflection Glare */}
                        <div className="absolute inset-0 bg-gradient-to-tr from-white/10 via-transparent to-transparent pointer-events-none z-50 opacity-40"></div>

                        {/* SCALED CONTENT WRAPPER */}
                        <div className="w-[1200px] h-[900px] shrink-0 origin-top transform scale-[0.26] xs:scale-[0.3] sm:scale-[0.55] md:scale-[0.75] lg:scale-[0.9] xl:scale-100 transition-transform duration-500 relative bg-[#050505] select-none">

                            {/* --- DASHBOARD UI --- */}
                            <div className="flex h-full text-left">

                                {/* Ghost Cursor Simulation */}
                                <motion.div
                                    animate={{
                                        x: [1000, 1050, 400, 300, 1000],
                                        y: [120, 130, 400, 600, 120]
                                    }}
                                    transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
                                    className="absolute z-[60] pointer-events-none drop-shadow-[0_0_15px_rgba(0,230,118,1)]"
                                >
                                    <MousePointer2 className="w-8 h-8 text-[#00E676] fill-black stroke-[3px]" />
                                </motion.div>

                                {/* Live Conversion Notification Toast */}
                                <motion.div
                                    initial={{ x: 100, opacity: 0 }}
                                    animate={{ x: [100, 0, 0, 100], opacity: [0, 1, 1, 0] }}
                                    transition={{ duration: 6, repeat: Infinity, repeatDelay: 4 }}
                                    className="absolute top-28 right-8 bg-[#0A0A0A]/90 border border-[#00E676]/30 rounded-lg p-3 shadow-2xl z-50 flex items-center gap-3 w-72 backdrop-blur-xl"
                                >
                                    <CheckCircle2 className="w-5 h-5 text-[#00E676]" />
                                    <div>
                                        <div className="text-xs font-bold text-white">Commission Earned</div>
                                        <div className="text-[10px] text-slate-400">Pro Plan Signup ($450.00)</div>
                                    </div>
                                </motion.div>

                                {/* SIDEBAR */}
                                <div className="w-64 flex-col border-r border-white/5 bg-[#050505] hidden md:flex">
                                    <div className="h-20 flex items-center px-6 gap-3 border-b border-white/5">
                                        <div className="w-8 h-8 relative">
                                            {/* Using Next Image for logo optimization */}
                                            <Image src="/partnerslogo.png" fill alt="Tradal Logo" className="object-contain" />
                                        </div>
                                        <span className="font-bold text-lg text-[#00E676] tracking-tight">Tradal</span>
                                    </div>

                                    <div className="flex-1 py-6 space-y-1 px-3">
                                        {[
                                            { icon: <LayoutDashboard className="w-5 h-5" />, label: "Overview", active: true },
                                            { icon: <Users className="w-5 h-5" />, label: "Referrals" },
                                            { icon: <LinkIcon className="w-5 h-5" />, label: "Links" },
                                            { icon: <Trophy className="w-5 h-5" />, label: "Leaderboard" },
                                            { icon: <PieChart className="w-5 h-5" />, label: "Analytics" },
                                            { icon: <Wallet className="w-5 h-5" />, label: "Payouts" },
                                        ].map((item, i) => (
                                            <div key={i} className={`flex items-center gap-3 px-4 py-3 rounded-lg cursor-pointer transition-all ${item.active ? 'bg-[#00E676]/10 text-[#00E676] shadow-[0_0_15px_-5px_rgba(0,230,118,0.2)]' : 'text-slate-500 hover:text-slate-300 hover:bg-white/[0.02]'}`}>
                                                {item.icon}
                                                <span className="text-sm font-medium">{item.label}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* MAIN CONTENT AREA */}
                                <div className="flex-1 flex flex-col bg-[#050505] relative z-10">

                                    {/* Top Header */}
                                    <div className="h-20 flex items-center justify-between px-8 border-b border-white/5">
                                        <div className="flex gap-4 text-sm font-medium text-slate-500">
                                            <span className="text-slate-300">Home</span>
                                            <span className="text-slate-700">/</span>
                                            <span className="text-white">Overview</span>
                                        </div>
                                        <div className="flex items-center gap-6">
                                            <div className="flex items-center gap-3 pl-6 border-l border-white/5">
                                                <div className="text-right hidden sm:block">
                                                    <div className="text-sm font-bold text-white">Elite Partner</div>
                                                    <div className="text-[10px] text-[#00E676] uppercase font-bold tracking-wider">Top Tier</div>
                                                </div>
                                                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-slate-700 to-slate-800 border border-white/10"></div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Scrollable Content */}
                                    <div className="flex-1 p-8 overflow-hidden relative">
                                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(0,230,118,0.03),transparent_40%)] pointer-events-none"></div>

                                        <div className="flex justify-between items-end mb-8 relative z-10">
                                            <div>
                                                <h2 className="text-3xl font-black text-white italic tracking-wide mb-1">PARTNER DASHBOARD</h2>
                                                <p className="text-slate-500 font-medium">Performance for <span className="text-[#00E676]">This Month</span></p>
                                            </div>
                                            <button className="bg-[#00E676] hover:bg-brand-400 text-black px-6 py-2.5 rounded-lg font-bold flex items-center gap-2 transition-colors shadow-[0_0_20px_rgba(0,230,118,0.3)] hover:shadow-[0_0_30px_rgba(0,230,118,0.5)] transform hover:scale-105 duration-200">
                                                <LinkIcon className="w-4 h-4" /> Copy Link
                                            </button>
                                        </div>

                                        {/* EARNINGS CARD (HERO CARD) */}
                                        <div className="bg-gradient-to-br from-[#0A1F13] to-[#050505] border border-[#00E676]/20 rounded-3xl p-8 mb-8 relative overflow-hidden group hover:border-[#00E676]/40 transition-colors duration-500">
                                            <div className="absolute top-0 right-0 w-96 h-96 bg-[#00E676]/5 blur-[100px] rounded-full group-hover:bg-[#00E676]/10 transition-colors pointer-events-none"></div>

                                            <div className="relative z-10 flex justify-between items-center gap-8">
                                                <div>
                                                    <div className="flex items-center gap-3 mb-6">
                                                        <div className="w-10 h-10 rounded-xl bg-[#00E676]/10 flex items-center justify-center text-[#00E676] shadow-[0_0_15px_rgba(0,230,118,0.2)]">
                                                            <DollarSign className="w-5 h-5" />
                                                        </div>
                                                        <span className="text-slate-400 text-sm font-bold uppercase tracking-wider">Withdrawable Balance</span>
                                                        <span className="bg-[#00E676]/20 text-[#00E676] text-[10px] font-black px-2.5 py-1 rounded border border-[#00E676]/30 shadow-[0_0_10px_rgba(0,230,118,0.2)] tracking-wider">AVAILABLE</span>
                                                    </div>

                                                    <div className="text-7xl font-black text-white mb-3 tracking-tighter drop-shadow-lg">
                                                        $2,450.00
                                                    </div>

                                                    <div className="flex items-center gap-3 text-[#00E676] font-bold bg-[#00E676]/5 inline-block px-3 py-1 rounded-lg border border-[#00E676]/10">
                                                        <TrendingUp className="w-4 h-4" />
                                                        <span>+$450.00</span>
                                                        <span className="text-slate-500 font-mono">(Since last month)</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* STATS GRID */}
                                        <div className="grid grid-cols-4 gap-6">

                                            {/* Card 1: Total Clicks */}
                                            <div className="bg-[#0A0A0A] border border-white/5 rounded-3xl p-6 relative group overflow-hidden">
                                                <div className="flex justify-between items-start mb-6">
                                                    <div className="w-10 h-10 rounded-xl bg-[#00E676]/10 flex items-center justify-center text-[#00E676]">
                                                        <MousePointer2 className="w-5 h-5" />
                                                    </div>
                                                </div>
                                                <div className="text-[10px] text-slate-500 font-bold uppercase tracking-wider mb-1">Total Clicks</div>
                                                <div className="text-3xl font-black text-white tracking-tighter">1,245</div>
                                                <div className="h-1 w-full bg-[#00E676] mt-4 shadow-[0_0_10px_rgba(0,230,118,0.5)]"></div>
                                            </div>

                                            {/* Card 2: Signups */}
                                            <div className="bg-[#0A0A0A] border border-white/5 rounded-3xl p-6 relative group overflow-hidden">
                                                <div className="flex justify-between items-start mb-6">
                                                    <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-500">
                                                        <Users className="w-5 h-5" />
                                                    </div>
                                                    <span className="bg-blue-500/10 text-blue-500 text-[10px] font-bold px-2 py-0.5 rounded border border-blue-500/20">↑ 12%</span>
                                                </div>
                                                <div className="text-[10px] text-slate-500 font-bold uppercase tracking-wider mb-1">Signups</div>
                                                <div className="text-3xl font-black text-white tracking-tighter">154</div>
                                                <div className="h-1 w-full bg-blue-500 mt-4 shadow-[0_0_10px_rgba(59,130,246,0.5)]"></div>
                                            </div>

                                            {/* Card 3: Paid Out */}
                                            <div className="bg-[#0A0A0A] border border-white/5 rounded-3xl p-6 relative group overflow-hidden">
                                                <div className="flex justify-between items-start mb-6">
                                                    <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-500">
                                                        <Wallet className="w-5 h-5" />
                                                    </div>
                                                </div>
                                                <div className="text-[10px] text-slate-500 font-bold uppercase tracking-wider mb-1">Total Paid</div>
                                                <div className="text-3xl font-black text-white tracking-tighter">$12.5k</div>
                                                <div className="h-1 w-full bg-purple-500 mt-4 shadow-[0_0_10px_rgba(168,85,247,0.5)]"></div>
                                            </div>

                                            {/* Card 4: Global Reach */}
                                            <div className="bg-[#0A0A0A] border border-white/5 rounded-3xl p-6 relative group overflow-hidden">
                                                <div className="flex justify-between items-start mb-6">
                                                    <div className="w-10 h-10 rounded-xl bg-cyan-500/10 flex items-center justify-center text-cyan-500">
                                                        <Globe className="w-5 h-5" />
                                                    </div>
                                                </div>
                                                <div className="text-[10px] text-slate-500 font-bold uppercase tracking-wider mb-1">Countries</div>
                                                <div className="text-3xl font-black text-white tracking-tighter">14</div>
                                                <div className="h-1 w-full bg-cyan-500 mt-4 shadow-[0_0_10px_rgba(6,182,212,0.5)]"></div>
                                            </div>

                                        </div>

                                    </div>
                                </div>
                            </div>
                            {/* --- END DASHBOARD UI --- */}

                        </div>
                    </div>
                </motion.div>

            </div>
        </section>
    );
};
