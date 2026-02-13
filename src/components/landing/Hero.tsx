'use client'

import { motion } from 'framer-motion'
import { ArrowRight, ChevronRight, Play } from 'lucide-react'
import Image from 'next/image'

export function Hero() {
    return (
        <section className="relative pt-32 pb-20 px-6 overflow-hidden">
            {/* Background Elements */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-[#00E676]/5 rounded-full blur-[120px] -z-10" />
            <div className="absolute bottom-0 right-0 w-[800px] h-[600px] bg-[#00E676]/[0.02] rounded-full blur-[100px] -z-10" />

            <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
                {/* Text Content */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <div className="inline-flex items-center gap-2 bg-[#00E676]/10 border border-[#00E676]/20 rounded-full px-4 py-1.5 text-[12px] font-semibold text-[#00E676] mb-6">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00E676] opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00E676]"></span>
                        </span>
                        Accepting New Partners
                    </div>

                    <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 leading-[1.1]">
                        Monetize Your <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-white/50">Trading Influence</span>
                    </h1>

                    <p className="text-lg text-white/40 mb-8 max-w-lg leading-relaxed">
                        Join the elite affiliate network for the #1 Trading Journal. Earn <span className="text-[#00E676]">20% recurring commissions</span> for every trader you refer.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4">
                        <button
                            onClick={() => document.getElementById('auth-section')?.scrollIntoView({ behavior: 'smooth' })}
                            className="bg-[#00E676] hover:bg-[#00c764] text-black font-bold px-8 py-4 rounded-xl transition-all shadow-lg shadow-[#00E676]/25 hover:shadow-[#00E676]/40 flex items-center justify-center gap-2 group"
                        >
                            Start Earning Now
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </button>
                        <button
                            className="bg-white/5 hover:bg-white/10 text-white border border-white/10 px-8 py-4 rounded-xl transition-all flex items-center justify-center gap-2 group font-medium"
                        >
                            <Play className="w-4 h-4 fill-current" />
                            How it Works
                        </button>
                    </div>

                    <div className="mt-10 flex items-center gap-4 text-[13px] text-white/30">
                        <div className="flex -space-x-2">
                            {[1, 2, 3, 4].map((i) => (
                                <div key={i} className="w-8 h-8 rounded-full bg-[#111] border border-[#222] flex items-center justify-center text-[10px] font-bold text-white/50">
                                    {String.fromCharCode(64 + i)}
                                </div>
                            ))}
                        </div>
                        <p>Trusted by <span className="text-white font-medium">500+</span> trading influencers</p>
                    </div>
                </motion.div>

                {/* Visual / Stats Card Mockup */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.2 }}
                    className="relative hidden lg:block"
                >
                    <div className="absolute inset-0 bg-gradient-to-tr from-[#00E676]/20 to-transparent rounded-3xl blur-2xl" />
                    <div className="relative bg-[#0A0A0A] border border-white/[0.08] rounded-3xl p-6 shadow-2xl">
                        {/* Fake Dashboard UI */}
                        <div className="flex justify-between items-center mb-8">
                            <div>
                                <h3 className="text-white/40 text-xs font-medium uppercase tracking-wider">Total Earnings</h3>
                                <div className="text-4xl font-bold mt-1">$12,450.00</div>
                            </div>
                            <div className="bg-[#00E676]/10 text-[#00E676] px-3 py-1 rounded-lg text-xs font-bold">+24% this month</div>
                        </div>

                        <div className="space-y-4">
                            {[1, 2, 3].map((i) => (
                                <div key={i} className="flex items-center justify-between p-4 bg-white/[0.03] rounded-xl border border-white/[0.02]">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white/40">
                                            <ArrowRight className="w-4 h-4 -rotate-45" />
                                        </div>
                                        <div>
                                            <div className="text-sm font-medium">Commission Payout</div>
                                            <div className="text-xs text-white/30">Just now</div>
                                        </div>
                                    </div>
                                    <div className="text-[#00E676] font-bold">+$450.00</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    )
}
