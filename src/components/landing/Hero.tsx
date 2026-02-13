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




                    {/* Dashboard Container (Reference-Based Responsive Scaling) */}
                    <div className="w-full flex justify-center relative z-20 mt-10 perspective-1000">
                        {/* Outer Motion Wrapper for Entry Animation */}
                        <motion.div
                            initial={{ rotateX: 20, opacity: 0, y: 50 }}
                            whileInView={{ rotateX: 0, opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 1.2, ease: "easeOut" }}
                            className="w-full h-[240px] xs:h-[280px] sm:h-[500px] md:h-[680px] lg:h-[820px] xl:h-[920px] overflow-hidden rounded-[1.5rem] sm:rounded-[3rem] shadow-[0_0_80px_-20px_rgba(0,0,0,0.8)] border border-white/10 bg-[#050505] relative ring-1 ring-[#00E676]/30 flex justify-center"
                        >
                            {/* Glass Reflection Glare */}
                            <div className="absolute inset-0 bg-gradient-to-tr from-white/10 via-transparent to-transparent pointer-events-none z-50 opacity-40"></div>

                            {/* SCALED CONTENT WRAPPER */}
                            {/* This div handles the layout scaling independently of the parent's entry animation */}
                            <div className="w-[1280px] shrink-0 origin-top transform scale-[0.26] xs:scale-[0.3] sm:scale-[0.55] md:scale-[0.75] lg:scale-[0.9] xl:scale-100 transition-transform duration-500 relative bg-[#050505] select-none h-full">

                                {/* Top Bar */}
                                <div className="h-14 border-b border-white/[0.06] bg-[#050505] flex items-center justify-between px-8">
                                    <div className="flex gap-3 opacity-50">
                                        <div className="w-3 h-3 rounded-full bg-white/20"></div>
                                        <div className="w-3 h-3 rounded-full bg-white/20"></div>
                                        <div className="w-3 h-3 rounded-full bg-white/20"></div>
                                    </div>
                                    <div className="flex bg-black/40 border border-white/5 rounded-md px-4 py-1.5 gap-2 items-center min-w-[400px] justify-center">
                                        <ShieldCheck className="w-3.5 h-3.5 text-zinc-600" />
                                        <span className="text-xs font-mono text-zinc-600">partners.thetradal.com</span>
                                    </div>
                                    <div className="w-4"></div>
                                </div>

                                <div className="flex h-[800px]">
                                    {/* Sidebar (Always Visible, Fixed Width) */}
                                    <div className="w-72 border-r border-white/[0.06] bg-[#050505] flex flex-col">
                                        {/* Sidebar Logo */}
                                        <div className="p-8 pb-8">
                                            <div className="relative h-10 w-48">
                                                <Image
                                                    src="/partnerslogo.png"
                                                    alt="Tradal Partners"
                                                    fill
                                                    className="object-contain object-left"
                                                />
                                            </div>
                                        </div>

                                        {/* Navigation */}
                                        <div className="px-5 py-2">
                                            <p className="text-[10px] text-white/30 font-bold uppercase tracking-widest px-4 mb-3">Navigation</p>
                                            <div className="space-y-1.5">
                                                {[
                                                    { l: 'Overview', i: LayoutDashboard, a: true },
                                                    { l: 'Referrals', i: LinkIcon, a: false },
                                                    { l: 'Payouts', i: Wallet, a: false },
                                                    { l: 'Settings', i: ShieldCheck, a: false },
                                                ].map((item, i) => (
                                                    <div key={i} className={`flex items-center gap-4 px-5 py-3.5 rounded-xl text-sm font-medium transition-colors ${item.a ? 'bg-[#00E676]/10 text-[#00E676] border border-[#00E676]/20' : 'text-white/50 hover:bg-white/5 hover:text-white'}`}>
                                                        <item.i className="w-5 h-5" />
                                                        <span>{item.l}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                        {/* User Profile Footer */}
                                        <div className="mt-auto p-5 pt-0">
                                            <div className="border border-white/[0.06] bg-white/[0.02] rounded-2xl p-4 hover:bg-white/[0.04] transition-colors cursor-pointer group">
                                                <div className="flex items-center gap-4">
                                                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#00E676] to-emerald-600 flex items-center justify-center text-black font-bold text-xl shadow-lg shadow-[#00E676]/20 group-hover:scale-105 transition-transform">
                                                        A
                                                    </div>
                                                    <div className="flex-col overflow-hidden">
                                                        <div className="text-base font-bold text-white truncate">AyushFX</div>
                                                        <div className="text-xs font-mono text-white/30 truncate group-hover:text-[#00E676] transition-colors">AYUSHFX1</div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-3 mt-5 px-3 text-white/30 text-xs font-medium cursor-pointer hover:text-white transition-colors">
                                                <div className="w-7 h-7 rounded-full border border-white/10 flex items-center justify-center bg-white/5">
                                                    <ArrowRight className="w-3.5 h-3.5 rotate-180" />
                                                </div>
                                                Sign Out
                                            </div>
                                        </div>
                                    </div>

                                    {/* Main Content */}
                                    <div className="flex-1 bg-[#050505] p-10 overflow-hidden relative flex flex-col">
                                        {/* Grid Background */}
                                        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none"></div>

                                        <div className="relative z-10 flex flex-col h-full gap-8">

                                            {/* 1. Referral Link Section */}
                                            <div className="w-full">
                                                <div className="flex items-center gap-2 mb-3">
                                                    <div className="w-4 h-4 text-[#00E676]">
                                                        <svg viewBox="0 0 24 24" fill="currentColor"><path d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                                                    </div>
                                                    <span className="text-xs font-bold text-white/50 uppercase tracking-wider">YOUR REFERRAL LINK</span>
                                                </div>
                                                <div className="flex gap-4">
                                                    <div className="flex-1 bg-[#0A0A0A] border border-white/10 rounded-xl px-5 py-4 flex items-center text-base font-mono text-[#00E676] shadow-inner relative group overflow-hidden">
                                                        <div className="absolute inset-0 bg-[#00E676]/5 group-hover:bg-[#00E676]/10 transition-colors"></div>
                                                        <span className="relative z-10">https://thetradal.com?ref=AYUSHFX1</span>
                                                    </div>
                                                    <button className="bg-[#00E676] hover:bg-[#00C853] text-black px-8 py-4 rounded-xl text-base font-extrabold flex items-center gap-2.5 transition-all shadow-lg shadow-[#00E676]/20 hover:shadow-[#00E676]/40 hover:-translate-y-0.5 active:translate-y-0">
                                                        <LinkIcon className="w-5 h-5" />
                                                        <span>Copy</span>
                                                    </button>
                                                </div>
                                                <div className="flex justify-between items-center mt-3 px-1">
                                                    <p className="text-xs text-white/30 flex items-center gap-2">
                                                        <span className="w-2 h-2 rounded-full bg-[#00E676]"></span>
                                                        Earn <span className="text-[#00E676] font-bold">20% commission</span> on every referred sale • 30-day cookie
                                                    </p>
                                                </div>
                                            </div>

                                            {/* 2. Stats Grid (Fixed 4 Columns) */}
                                            <div className="grid grid-cols-4 gap-5">
                                                {[
                                                    { label: 'Total Earnings', value: '$54,468.50', change: '+12.5%', icon: DollarSign, trend: 'up', color: 'text-[#00E676]' },
                                                    { label: 'Conversions', value: '1,240', change: '+12 new', icon: CheckCircle2, trend: 'up', color: 'text-blue-400' },
                                                    { label: 'Total Clicks', value: '12,890', change: '+28 today', icon: MousePointer2, trend: 'up', color: 'text-purple-400' },
                                                    { label: 'Conversion Rate', value: '9.6%', change: '+0.8%', icon: BarChart2, trend: 'up', color: 'text-amber-400' },
                                                ].map((stat, i) => (
                                                    <motion.div
                                                        key={i}
                                                        initial={{ opacity: 0, y: 10 }}
                                                        whileInView={{ opacity: 1, y: 0 }}
                                                        transition={{ delay: 0.1 * i }}
                                                        className="bg-[#0A0A0A] border border-white/10 rounded-2xl p-6 flex flex-col justify-between h-[140px] relative overflow-hidden group hover:border-white/20 transition-all hover:shadow-2xl hover:shadow-black/50"
                                                    >
                                                        <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>

                                                        <div className="flex justify-between items-start relative z-10">
                                                            <div className={`w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center ${stat.color} group-hover:scale-110 transition-transform duration-300`}>
                                                                <stat.icon className="w-6 h-6" />
                                                            </div>
                                                            <div className="flex items-center gap-1.5 text-xs font-bold text-[#00E676] bg-[#00E676]/10 px-2.5 py-1 rounded-full border border-[#00E676]/10">
                                                                <TrendingUp className="w-3.5 h-3.5" />
                                                                {stat.change}
                                                            </div>
                                                        </div>
                                                        <div className="relative z-10">
                                                            <div className="text-[1.75rem] font-black text-white tracking-tight group-hover:translate-x-1 transition-transform">{stat.value}</div>
                                                            <div className="text-xs text-white/40 font-medium mt-1 uppercase tracking-wide">{stat.label}</div>
                                                        </div>
                                                    </motion.div>
                                                ))}
                                            </div>

                                            {/* 3. Earnings Overview Chart */}
                                            <div className="flex-1 bg-[#0A0A0A] border border-white/10 rounded-3xl p-8 flex flex-col relative overflow-hidden group hover:border-white/20 transition-colors">
                                                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-[#00E676]/5 via-transparent to-transparent opacity-50"></div>

                                                <div className="flex justify-between items-center mb-8 relative z-10">
                                                    <div>
                                                        <h3 className="text-base font-bold text-white">Earnings Overview</h3>
                                                        <p className="text-xs text-white/30 mt-1">Performance over time</p>
                                                    </div>
                                                    <div className="flex bg-black border border-white/10 rounded-lg p-1">
                                                        {['7D', '30D', '90D'].map((d, i) => (
                                                            <button key={d} className={`px-4 py-1.5 text-xs font-bold rounded-md transition-all ${i === 1 ? 'bg-[#00E676] text-black shadow-lg shadow-[#00E676]/20' : 'text-white/40 hover:text-white'}`}>
                                                                {d}
                                                            </button>
                                                        ))}
                                                    </div>
                                                </div>

                                                {/* Chart Area */}
                                                <div className="flex-1 w-full relative">
                                                    {/* Y-Axis Grid Lines */}
                                                    <div className="absolute inset-0 flex flex-col justify-between text-[10px] text-white/10 font-mono pointer-events-none">
                                                        {[6000, 4500, 3000, 1500, 0].map(val => (
                                                            <div key={val} className="border-b border-dashed border-white/5 w-full h-0 flex items-center">
                                                                <span className="mb-2">${val}</span>
                                                            </div>
                                                        ))}
                                                    </div>

                                                    {/* SVG Path Chart */}
                                                    <svg className="absolute inset-x-0 bottom-8 h-[85%] w-full overflow-visible" preserveAspectRatio="none">
                                                        <defs>
                                                            <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
                                                                <stop offset="0%" stopColor="#00E676" stopOpacity="0.2" />
                                                                <stop offset="100%" stopColor="#00E676" stopOpacity="0" />
                                                            </linearGradient>
                                                        </defs>
                                                        {/* Smooth Curve */}
                                                        <motion.path
                                                            initial={{ pathLength: 0 }}
                                                            whileInView={{ pathLength: 1 }}
                                                            transition={{ duration: 2, ease: "easeOut" }}
                                                            d="M0,100 C100,100 150,80 250,70 C350,60 400,20 500,30 C600,40 700,-10 800,5 C900,20 1000,10 1100,-20 C1200,-50 1300,-40 1400,-60 L1400,150 L0,150 Z"
                                                            fill="url(#areaGradient)"
                                                        />
                                                        <motion.path
                                                            initial={{ pathLength: 0 }}
                                                            whileInView={{ pathLength: 1 }}
                                                            transition={{ duration: 2, ease: "easeOut" }}
                                                            d="M0,100 C100,100 150,80 250,70 C350,60 400,20 500,30 C600,40 700,-10 800,5 C900,20 1000,10 1100,-20 C1200,-50 1300,-40 1400,-60"
                                                            fill="none"
                                                            stroke="#00E676"
                                                            strokeWidth="2"
                                                            strokeLinecap="round"
                                                        />
                                                    </svg>

                                                    {/* X-Axis Labels */}
                                                    <div className="absolute bottom-0 left-0 right-0 flex justify-between text-[10px] text-white/20 font-mono px-4">
                                                        {['Jan 16', 'Jan 18', 'Jan 20', 'Jan 22', 'Jan 24', 'Jan 26', 'Jan 28', 'Jan 30', 'Feb 1', 'Feb 3', 'Feb 5', 'Feb 7', 'Feb 9', 'Feb 11', 'Feb 13'].map((d, i) => (
                                                            <span key={i}>{d}</span>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </motion.div>

                        {/* Floating Widgets Outside (Hidden on mobile keyframe scaling now, or adjusted?) 
                            The user said "MAKE IT POTRAIT ON MOBILE USE IT AS IT IS ON DESKTOP"
                            So we actually probably want to hide these extra floating widgets if they clutter, or scale them too.
                            Since they are outside the main scaled div, they might look weird.
                            I'll hide them on small screens to keep the main focus on the "same to same" dashboard.
                        */}
                    </div>
                </motion.div>

            </div>
        </section>
    );
};
