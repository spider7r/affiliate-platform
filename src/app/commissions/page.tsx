'use client'

import { Navbar } from '@/components/landing/Navbar'
import { Footer } from '@/components/landing/Footer'
import { motion } from 'framer-motion'
import { Check, ArrowRight, TrendingUp, Users, Crown, Zap, Globe, ShieldCheck, Clock, Banknote, LayoutDashboard, Flag } from 'lucide-react'
import Link from 'next/link'

export default function CommissionsPage() {
    const tiers = [
        {
            name: "Affiliate",
            range: "0 - 50",
            usersLabel: "Referrals",
            commission: "20%",
            icon: Users,
            description: "Start your journey. Earn consistent income for every trader you refer.",
            color: "from-slate-400 to-slate-200",
            glow: "slate",
            benefits: ["Real-time Dashboard", "Monthly Payouts", "Marketing Assets"]
        },
        {
            name: "Pro Partner",
            range: "51 - 200",
            usersLabel: "Referrals",
            commission: "25%",
            icon: TrendingUp,
            description: "Scale your earnings. Higher rates for proven performers.",
            color: "from-[#00E676] to-emerald-400",
            glow: "emerald",
            benefits: ["Priority Support", "Custom Landing Pages", "25% Recurring Lifetime"]
        },
        {
            name: "Elite Partner",
            range: "201 - 499",
            usersLabel: "Referrals",
            commission: "30%",
            icon: Zap,
            description: "Dominate the market. Maximum standard commissions.",
            color: "from-cyan-400 to-blue-500",
            glow: "cyan",
            benefits: ["Dedicated Manager", "Co-branded Content", "30% Recurring Lifetime"]
        },
        {
            name: "Brand Ambassador",
            range: "500+",
            usersLabel: "Referrals",
            commission: "Custom",
            icon: Crown,
            description: "Become the face of Tradal. Exclusive perks and equity opportunities.",
            color: "from-amber-300 via-amber-400 to-yellow-600",
            glow: "amber",
            benefits: ["Equity Options", "Sponsored Events", "Custom Deal Structure", "White-glove Onboarding"]
        }
    ]

    const detailedBenefits = [
        {
            icon: Clock,
            title: "30-Day Cookie Life",
            desc: "Get credited for any user who signs up within 30 days of clicking your link, even if they leave and come back."
        },
        {
            icon: Banknote,
            title: "Recurring Revenue",
            desc: "Unlike other programs that pay once, we pay you every single month for the lifetime of the customer."
        },
        {
            icon: LayoutDashboard,
            title: "Real-Time Tracking",
            desc: "Watch your clicks, conversions, and earnings grow live on your partner dashboard."
        },
        {
            icon: Globe,
            title: "Global Payouts",
            desc: "Get paid in USD via PayPal, Wise, Stripe, or Crypto (USDT/USDC). No country restrictions."
        },
        {
            icon: ShieldCheck,
            title: "Transparent Reporting",
            desc: "Detailed breakdown of every referral source. Know exactly which content drives sales."
        },
        {
            icon: Flag,
            title: "High Conversion",
            desc: "Our optimized landing pages and freemium model convert traffic into paid users at industry-leading rates."
        }
    ]

    return (
        <div className="min-h-screen bg-[#050505] text-white selection:bg-[#00E676] selection:text-black font-sans">
            <Navbar />

            {/* Hero Section - Matching Landing Page Style */}
            <div className="relative pt-32 pb-20 overflow-hidden">
                <div className="absolute inset-0 z-0 pointer-events-none select-none overflow-hidden bg-[#050505]">
                    <div className="absolute top-[20%] left-[50%] -translate-x-1/2 w-[40vw] h-[40vw] bg-[#00E676]/10 blur-[150px] rounded-full mix-blend-screen animate-pulse opacity-40"></div>
                </div>

                <div className="max-w-[1600px] mx-auto px-6 relative z-10 text-center flex flex-col items-center">
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
                            Official Partner Tiers
                        </span>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                        className="text-[6vw] md:text-[5rem] lg:text-[6.5rem] font-black text-white tracking-tighter leading-[0.95] mb-8 drop-shadow-2xl uppercase"
                    >
                        Earn More As You <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-b from-[#00E676] to-emerald-700">Scale Your Impact.</span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.8 }}
                        className="text-xl text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed font-medium"
                    >
                        Our tiered commission structure rewards high performers. The more active traders you refer, the higher your lifetime recurring revenue share.
                    </motion.p>
                </div>
            </div>

            {/* Tiers Grid */}
            <div className="max-w-[1400px] mx-auto px-6 pb-32">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {tiers.map((tier, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1, duration: 0.6 }}
                            className={`relative group p-8 rounded-[2rem] border border-white/5 bg-[#0A0A0A] hover:bg-[#0F0F0F] hover:border-white/10 transition-all duration-500 overflow-hidden flex flex-col h-full`}
                        >
                            {/* Glow Effect */}
                            <div className={`absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-700 bg-gradient-to-br ${tier.color}`} />
                            <div className={`absolute top-0 right-0 w-40 h-40 bg-${tier.glow}-500/10 rounded-full blur-[80px] pointer-events-none transition-opacity duration-500 opacity-50 group-hover:opacity-100`} />

                            <div className="relative z-10 flex flex-col h-full">
                                <div className={`w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center mb-8 text-${tier.glow === 'slate' ? 'white' : tier.glow + '-400'} group-hover:scale-110 transition-transform duration-500`}>
                                    <tier.icon className="w-8 h-8" />
                                </div>

                                <h3 className="text-2xl font-black mb-2 tracking-tight">{tier.name}</h3>

                                <div className="flex items-baseline gap-2 mb-6">
                                    <span className={`text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r ${tier.color}`}>
                                        {tier.commission}
                                    </span>
                                    {tier.commission !== 'Custom' && (
                                        <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Comm.</span>
                                    )}
                                </div>

                                <div className="py-5 border-y border-white/5 mb-6">
                                    <div className="text-[10px] text-slate-500 font-mono uppercase tracking-widest mb-1.5">Requirement</div>
                                    <div className="text-xl font-bold text-white flex items-end gap-2">
                                        {tier.range} <span className="text-slate-500 font-medium text-sm mb-0.5">{tier.usersLabel}</span>
                                    </div>
                                </div>

                                <p className="text-slate-400 text-sm leading-relaxed mb-6 min-h-[60px]">
                                    {tier.description}
                                </p>

                                <ul className="space-y-4 mb-8 flex-1">
                                    {tier.benefits.map((benefit, j) => (
                                        <li key={j} className="flex items-start gap-3 text-sm text-slate-300 font-medium">
                                            <div className={`mt-0.5 w-4 h-4 rounded-full bg-${tier.glow === 'slate' ? 'emerald' : tier.glow}-500/20 flex items-center justify-center shrink-0`}>
                                                <Check className={`w-2.5 h-2.5 text-${tier.glow === 'slate' ? 'emerald' : tier.glow}-400`} />
                                            </div>
                                            {benefit}
                                        </li>
                                    ))}
                                </ul>

                                <Link
                                    href="/signup"
                                    className={`w-full py-4 rounded-xl font-bold text-center transition-all duration-300 bg-white/5 hover:bg-white text-white hover:text-black group-hover:translate-y-0 translate-y-2 opacity-90 group-hover:opacity-100 flex items-center justify-center gap-2`}
                                >
                                    {tier.name === 'Brand Ambassador' ? 'Apply Now' : 'Start Earning'}
                                    <ArrowRight className="w-4 h-4" />
                                </Link>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Detailed Benefits Section */}
            <div className="max-w-[1400px] mx-auto px-6 pb-40">
                <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-6">
                    <div>
                        <h2 className="text-4xl md:text-5xl font-black mb-4 tracking-tight">Everything You Need <br /><span className="text-slate-500">To Succeed.</span></h2>
                        <p className="text-slate-400 text-lg max-w-xl">We provide the tools, you bring the audience. Here is what every partner gets, regardless of tier.</p>
                    </div>
                    <Link href="/signup" className="text-[#00E676] font-bold uppercase tracking-widest border-b border-[#00E676] pb-1 hover:text-white hover:border-white transition-all">View All Perks</Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {detailedBenefits.map((item, i) => (
                        <div key={i} className="flex gap-5 p-6 rounded-2xl border border-white/5 bg-[#0A0A0A] hover:bg-[#0F0F0F] transition-colors group">
                            <div className="w-12 h-12 rounded-xl bg-[#00E676]/10 flex items-center justify-center shrink-0 group-hover:bg-[#00E676] transition-colors duration-500">
                                <item.icon className="w-6 h-6 text-[#00E676] group-hover:text-black transition-colors duration-500" />
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
                                <p className="text-slate-400 text-sm leading-relaxed">{item.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Calculator / CTA Section */}
            <div className="max-w-5xl mx-auto px-6 pb-32">
                <div className="relative rounded-[3rem] overflow-hidden bg-[#0A0A0A] border border-white/10 p-12 md:p-20 text-center group">
                    <div className="absolute inset-0 bg-gradient-to-br from-[#00E676]/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
                    <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-transparent via-[#00E676] to-transparent opacity-50"></div>

                    <div className="relative z-10">
                        <h2 className="text-4xl md:text-6xl font-black mb-8 tracking-tighter text-white">Ready to scale your income?</h2>
                        <p className="text-slate-400 mb-10 max-w-lg mx-auto text-lg">
                            Join thousands of creators, educators, and traders who are building sustainable wealth.
                        </p>
                        <Link
                            href="/signup"
                            className="inline-flex items-center px-10 py-5 bg-[#00E676] hover:bg-[#00c764] text-black font-extrabold rounded-full text-xl transition-all hover:scale-105 shadow-[0_0_40px_-10px_rgba(0,230,118,0.3)] hover:shadow-[0_0_60px_-15px_rgba(0,230,118,0.5)]"
                        >
                            Become a Partner <ArrowRight className="ml-2 w-6 h-6" />
                        </Link>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    )
}
