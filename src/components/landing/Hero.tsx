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
                    <div className="w-full flex justify-center relative z-20">
                        <div className="relative rounded-xl md:rounded-[2rem] overflow-hidden border border-white/10 shadow-2xl shadow-black/50 bg-[#050505]">
                            {/* Glass Reflection Glare */}
                            <div className="absolute inset-0 bg-gradient-to-tr from-white/10 via-transparent to-transparent pointer-events-none z-50 opacity-40"></div>

                            <Image
                                src="/dashboard-hero.png"
                                alt="Tradal Partner Dashboard"
                                width={1200}
                                height={800}
                                className="w-full h-auto object-cover"
                                priority
                            />
                        </div>

                        {/* Floating Elements (Optional - kept simple) */}
                        <motion.div
                            animate={{
                                y: [0, -10, 0]
                            }}
                            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                            className="absolute -right-4 -bottom-4 md:-right-10 md:bottom-10 z-30"
                        >
                            <div className="bg-[#0A0A0A]/90 border border-[#00E676]/30 backdrop-blur-xl p-4 rounded-2xl shadow-2xl flex items-center gap-4">
                                <div className="p-3 bg-[#00E676]/10 rounded-full">
                                    <TrendingUp className="w-6 h-6 text-[#00E676]" />
                                </div>
                                <div>
                                    <div className="text-xs text-slate-400 font-bold uppercase">Monthly Growth</div>
                                    <div className="text-xl font-black text-white">+124.5%</div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </motion.div>

            </div>
        </section>
    );
};
