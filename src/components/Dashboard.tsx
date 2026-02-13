'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
    Copy, Check, DollarSign, Users, MousePointer2, TrendingUp,
    LayoutDashboard, Link2, Wallet, Settings, LogOut, ChevronRight,
    CreditCard, Building2, Bitcoin, Plus, ArrowUpRight, ArrowDownRight,
    Eye, EyeOff, ExternalLink, Send, Trash2, CheckCircle2, Clock,
    ShieldCheck, Sparkles, Target, BarChart3
} from 'lucide-react'
import { addPayoutMethod, logoutAffiliate } from '@/app/actions'
import Image from 'next/image'
import EarningsCalculator from './dashboard/EarningsCalculator'
import EarningsChart from './dashboard/EarningsChart'

interface DashboardProps {
    affiliate: any
    referralCount: number
    clickCount: number
    recentReferrals: any[]
    chartData: any[]
    payoutMethods: any[]
    payoutHistory: any[]
}

type ActivePage = 'overview' | 'referrals' | 'payouts' | 'settings'

export function Dashboard({ affiliate, referralCount, clickCount, recentReferrals, chartData, payoutMethods, payoutHistory }: DashboardProps) {
    const [copied, setCopied] = useState(false)
    const [activePage, setActivePage] = useState<ActivePage>('overview')
    const [showEarnings, setShowEarnings] = useState(true)
    const [addingMethod, setAddingMethod] = useState<string | null>(null)
    const referralLink = `https://thetradal.com?ref=AYUSHFX1`

    // Chart data processing
    const days = 30
    const chart = new Array(days).fill(0).map((_, i) => {
        const d = new Date(); d.setDate(d.getDate() - (days - 1 - i))
        return {
            date: d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
            value: 0
        }
    })

    if (chartData && chartData.length > 0) {
        chartData.forEach(item => {
            const date = new Date(item.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
            const e = chart.find(c => c.date === date);
            if (e) e.value += item.earnings
        })
    }

    const maxE = Math.max(...chart.map(c => c.value), 10)

    const copyLink = () => { navigator.clipboard.writeText(referralLink); setCopied(true); setTimeout(() => setCopied(false), 2000) }

    // Real Data Display
    const displayEarnings = affiliate.total_earnings || 0
    const displayReferrals = referralCount || 0
    const displayClicks = clickCount || 0
    const convRate = displayClicks > 0 ? ((displayReferrals / displayClicks) * 100).toFixed(1) : '0.0'

    const navItems = [
        { id: 'overview' as ActivePage, label: 'Overview', icon: LayoutDashboard },
        { id: 'referrals' as ActivePage, label: 'Referrals', icon: Link2 },
        { id: 'payouts' as ActivePage, label: 'Payouts', icon: Wallet },
        { id: 'settings' as ActivePage, label: 'Settings', icon: Settings },
    ]

    const badge = (s: string) => {
        const c: Record<string, string> = { paid: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20', converted: 'bg-blue-500/10 text-blue-400 border-blue-500/20', pending: 'bg-amber-500/10 text-amber-400 border-amber-500/20', completed: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20', processing: 'bg-blue-500/10 text-blue-400 border-blue-500/20', failed: 'bg-red-500/10 text-red-400 border-red-500/20' }
        return <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border ${c[s] || c.pending}`}>{s}</span>
    }

    const fadeIn = { initial: { opacity: 0, y: 12 }, animate: { opacity: 1, y: 0 }, exit: { opacity: 0, y: -8 }, transition: { duration: 0.3 } }

    return (
        <div className="min-h-screen bg-[#050505] text-white flex" style={{ fontFamily: "'Inter', system-ui, -apple-system, sans-serif" }}>

            {/* ── Sidebar ── */}
            <aside className="w-[280px] border-r border-white/[0.06] bg-[#0A0A0A]/80 backdrop-blur-2xl flex flex-col fixed h-full z-40">
                <div className="p-6 border-b border-white/[0.06]">
                    <Image src="/partnerslogo.png" alt="Tradal Partners" width={160} height={48} className="object-contain" />
                </div>
                <div className="px-4 pt-5 pb-2">
                    <p className="text-[9px] text-white/30 uppercase tracking-[0.2em] font-semibold px-3">Navigation</p>
                </div>
                <nav className="flex-1 px-3 space-y-0.5">
                    {navItems.map(item => (
                        <button key={item.id} onClick={() => setActivePage(item.id)}
                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-[13px] font-medium transition-all duration-200 ${activePage === item.id
                                ? 'bg-gradient-to-r from-[#00E676]/15 to-[#00E676]/5 text-[#00E676] border border-[#00E676]/20 shadow-[0_0_20px_rgba(0,230,118,0.06)]'
                                : 'text-white/50 hover:text-white/80 hover:bg-white/[0.03] border border-transparent'
                                }`}>
                            <item.icon className="w-[18px] h-[18px]" />
                            <span className="flex-1 text-left">{item.label}</span>
                            {item.id === 'payouts' && (affiliate.pending_payout || 0) > 0 && (
                                <span className="text-[9px] bg-orange-500/15 text-orange-400 px-2 py-0.5 rounded-full border border-orange-500/20 font-bold">${affiliate.pending_payout.toFixed(0)}</span>
                            )}
                        </button>
                    ))}
                </nav>
                <div className="p-4 border-t border-white/[0.06]">
                    <div className="bg-gradient-to-br from-white/[0.04] to-white/[0.01] border border-white/[0.06] rounded-2xl p-4">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#00E676] to-emerald-600 flex items-center justify-center text-sm font-bold text-black shadow-lg shadow-[#00E676]/20">
                                {(affiliate.full_name || 'P')[0].toUpperCase()}
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-[13px] font-semibold truncate">{affiliate.full_name || 'Partner'}</p>
                                <p className="text-[10px] text-white/30 font-mono">{affiliate.code}</p>
                            </div>
                        </div>
                    </div>
                    <form action={logoutAffiliate}>
                        <button type="submit" className="w-full flex items-center gap-2 px-4 py-2.5 mt-2 text-[12px] text-white/30 hover:text-red-400 transition-all rounded-xl hover:bg-red-500/5">
                            <LogOut className="w-3.5 h-3.5" /> Sign Out
                        </button>
                    </form>
                </div>
            </aside>

            {/* ── Main ── */}
            <main className="flex-1 ml-[280px]">
                <header className="sticky top-0 z-30 border-b border-white/[0.06] bg-[#050505]/60 backdrop-blur-2xl">
                    <div className="px-8 h-[72px] flex items-center justify-between">
                        <div>
                            <h2 className="text-xl font-bold tracking-tight">{navItems.find(n => n.id === activePage)?.label}</h2>
                            <p className="text-[11px] text-white/30 mt-0.5">
                                {activePage === 'overview' && 'Your performance at a glance'}
                                {activePage === 'referrals' && 'Track every referral conversion'}
                                {activePage === 'payouts' && 'Manage earnings & withdrawals'}
                                {activePage === 'settings' && 'Account preferences'}
                            </p>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="bg-white/[0.03] border border-white/[0.06] rounded-full px-4 py-2 text-[11px] flex items-center gap-2 text-white/50"><div className="w-1.5 h-1.5 rounded-full bg-[#00E676] animate-pulse shadow-sm shadow-[#00E676]/50" /> Live Data</div>
                        </div>
                    </div>
                </header>

                <div className="p-8">
                    <AnimatePresence mode="wait">

                        {/* ═══ OVERVIEW ═══ */}
                        {activePage === 'overview' && (
                            <motion.div key="overview" {...fadeIn} className="space-y-7">

                                {/* Referral Link Banner */}
                                <div className="relative overflow-hidden rounded-2xl border border-white/[0.06] bg-gradient-to-r from-[#0A0A0A] via-[#0D1A0F] to-[#0A0A0A] p-6">
                                    <div className="absolute top-0 right-0 w-80 h-80 bg-[#00E676]/[0.04] rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3" />
                                    <div className="absolute bottom-0 left-20 w-48 h-48 bg-[#00E676]/[0.03] rounded-full blur-[80px] translate-y-1/2" />
                                    <div className="relative">
                                        <div className="flex items-center gap-2 mb-3">
                                            <Sparkles className="w-4 h-4 text-[#00E676]" />
                                            <h3 className="text-[13px] font-bold uppercase tracking-wider text-white/70">Your Referral Link</h3>
                                        </div>
                                        <div className="flex gap-3">
                                            <div className="flex-1 bg-black/40 border border-white/[0.08] rounded-xl px-5 py-3 font-mono text-[13px] text-[#00E676] truncate backdrop-blur-sm">{referralLink}</div>
                                            <button onClick={copyLink} className={`px-6 py-3 rounded-xl text-[13px] font-bold flex items-center gap-2 transition-all duration-300 ${copied ? 'bg-[#00E676] text-black shadow-lg shadow-[#00E676]/30' : 'bg-[#00E676]/10 text-[#00E676] border border-[#00E676]/20 hover:bg-[#00E676]/20 hover:shadow-lg hover:shadow-[#00E676]/10'}`}>
                                                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                                                {copied ? "Copied!" : "Copy"}
                                            </button>
                                        </div>
                                        <p className="text-[11px] text-white/30 mt-3">
                                            Earn <span className="text-[#00E676] font-bold">{affiliate.commission_rate}% commission</span> on every referred sale • 30-day cookie
                                        </p>
                                    </div>
                                </div>

                                {/* Stats Grid */}
                                <div className="grid grid-cols-4 gap-5">
                                    {[
                                        { label: "Total Earnings", value: showEarnings ? `$${displayEarnings.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}` : '••••••', icon: DollarSign, change: "+12.5%", pos: true, act: () => setShowEarnings(!showEarnings), actIcon: showEarnings ? EyeOff : Eye, gradient: 'from-emerald-500/20 to-emerald-600/5' },
                                        { label: "Conversions", value: displayReferrals.toLocaleString(), icon: Target, change: recentReferrals.length > 0 ? `+${recentReferrals.filter(r => r.status === 'converted').length} new` : '+0 new', pos: true, gradient: 'from-blue-500/20 to-blue-600/5' },
                                        { label: "Total Clicks", value: displayClicks.toLocaleString(), icon: MousePointer2, change: "+28 today", pos: true, gradient: 'from-violet-500/20 to-violet-600/5' },
                                        { label: "Conversion Rate", value: `${convRate}%`, icon: BarChart3, change: "+0.8%", pos: true, gradient: 'from-amber-500/20 to-amber-600/5' },
                                    ].map((stat, i) => (
                                        <motion.div key={stat.label} initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08, duration: 0.4 }}
                                            className="group relative overflow-hidden rounded-2xl border border-white/[0.06] bg-[#0A0A0A] p-5 hover:border-white/[0.1] transition-all duration-300 cursor-default">
                                            <div className={`absolute inset-0 bg-gradient-to-br ${stat.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                                            <div className="relative">
                                                <div className="flex items-center justify-between mb-4">
                                                    <div className="w-10 h-10 rounded-xl bg-white/[0.04] border border-white/[0.06] flex items-center justify-center group-hover:border-white/[0.12] transition-colors">
                                                        <stat.icon className="w-[18px] h-[18px] text-[#00E676]" />
                                                    </div>
                                                    <div className="flex items-center gap-1.5">
                                                        {stat.act && <button onClick={stat.act} className="p-1 hover:bg-white/5 rounded-lg">{stat.actIcon && <stat.actIcon className="w-3.5 h-3.5 text-white/30" />}</button>}
                                                        <span className={`text-[10px] font-bold flex items-center gap-0.5 ${stat.pos ? 'text-emerald-400' : 'text-red-400'}`}>
                                                            {stat.pos ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}{stat.change}
                                                        </span>
                                                    </div>
                                                </div>
                                                <h3 className="text-[28px] font-bold tracking-tight leading-none">{stat.value}</h3>
                                                <p className="text-[11px] text-white/30 mt-2 font-medium">{stat.label}</p>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>

                                {/* Chart + Side Stats */}
                                <div className="mb-5">
                                    <EarningsChart data={chart} />
                                </div>

                                <div className="grid grid-cols-3 gap-5">
                                    <EarningsCalculator commissionRate={affiliate.commission_rate} />
                                    <div className="flex flex-col gap-5 h-full">
                                        <div className="relative overflow-hidden rounded-2xl border border-white/[0.06] bg-[#0A0A0A] p-6 flex-1 flex flex-col justify-center group">
                                            <div className="absolute inset-0 bg-gradient-to-br from-[#00E676]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                            <div className="relative">
                                                <h3 className="text-[13px] font-bold mb-4 flex items-center gap-2"><Sparkles className="w-4 h-4 text-[#00E676]" /> Commission Tier</h3>
                                                <div className="text-center space-y-3">
                                                    <div className="w-20 h-20 rounded-2xl border-2 border-[#00E676]/20 mx-auto flex items-center justify-center relative bg-[#00E676]/[0.03] shadow-[0_0_30px_-10px_rgba(0,230,118,0.3)]">
                                                        <span className="text-2xl font-black text-[#00E676]">{affiliate.commission_rate}%</span>
                                                    </div>
                                                    <p className="text-[10px] text-white/30 font-medium">Standard Partner Rate</p>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="relative overflow-hidden rounded-2xl border border-white/[0.06] bg-[#0A0A0A] p-6 flex-1 flex flex-col justify-center group">
                                            <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                            <div className="relative">
                                                <div className="flex justify-between items-start mb-2">
                                                    <h3 className="text-[13px] font-bold">Payout Status</h3>
                                                    <span className="text-[9px] bg-orange-500/10 text-orange-400 border border-orange-500/20 px-2 py-0.5 rounded-full font-bold uppercase">Pending</span>
                                                </div>
                                                <p className="text-3xl font-black text-white tracking-tight">${(affiliate.pending_payout || 0).toFixed(2)}</p>
                                                <div className="flex justify-between items-center text-[10px] text-white/30 mt-1 mb-3">
                                                    <span>Min. $50.00</span>
                                                    <span>Paid: <span className="text-white/50">${(affiliate.total_paid || 0).toFixed(2)}</span></span>
                                                </div>
                                                <div className="w-full bg-white/[0.04] rounded-full h-1.5 overflow-hidden">
                                                    <motion.div initial={{ width: 0 }} animate={{ width: `${Math.min(((affiliate.pending_payout || 0) / 50) * 100, 100)}%` }} className="bg-gradient-to-r from-orange-500 to-amber-500 rounded-full h-full shadow-[0_0_20px_rgba(249,115,22,0.3)]" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Recent Activity */}
                                <div className="rounded-2xl border border-white/[0.06] bg-[#0A0A0A] overflow-hidden">
                                    <div className="p-6 border-b border-white/[0.06] flex items-center justify-between">
                                        <div>
                                            <h3 className="text-[14px] font-bold">Recent Activity</h3>
                                            <p className="text-[11px] text-white/25 mt-0.5">Latest conversions</p>
                                        </div>
                                        <button onClick={() => setActivePage('referrals')} className="text-[11px] text-[#00E676] hover:text-[#00E676]/80 flex items-center gap-1 font-semibold">View All <ChevronRight className="w-3 h-3" /></button>
                                    </div>
                                    <table className="w-full text-sm">
                                        <thead><tr className="text-white/25 text-[10px] uppercase tracking-[0.15em] font-semibold border-b border-white/[0.04]">
                                            <th className="text-left px-6 py-3.5">Member</th><th className="text-left px-4 py-3.5">Plan</th><th className="text-left px-4 py-3.5">Status</th><th className="text-right px-4 py-3.5">Commission</th><th className="text-right px-6 py-3.5">Date</th>
                                        </tr></thead>
                                        <tbody>
                                            {recentReferrals.length === 0 ? (
                                                <tr><td colSpan={5} className="px-6 py-16 text-center text-white/20"><Target className="w-10 h-10 mx-auto mb-3 text-white/[0.06]" /><p className="text-sm font-medium">No conversions yet</p><p className="text-[11px] text-white/15 mt-1">Share your link to start earning</p></td></tr>
                                            ) : recentReferrals.slice(0, 5).map(ref => (
                                                <tr key={ref.id} className="border-t border-white/[0.04] hover:bg-white/[0.015] transition-colors">
                                                    <td className="px-6 py-4">
                                                        <div className="flex items-center gap-3">
                                                            <div className="w-8 h-8 rounded-xl bg-white/[0.04] border border-white/[0.06] flex items-center justify-center text-[10px] font-bold text-white/40">{(ref.referred_name || '?')[0].toUpperCase()}</div>
                                                            <div><p className="text-[12px] font-semibold">{ref.referred_name || 'Anonymous'}</p><p className="text-[10px] text-white/25">{ref.referred_email}</p></div>
                                                        </div>
                                                    </td>
                                                    <td className="px-4 py-4"><span className="text-[11px] text-white/50 bg-white/[0.03] border border-white/[0.06] px-2.5 py-1 rounded-lg font-medium">{ref.plan_purchased || '—'}</span></td>
                                                    <td className="px-4 py-4">{badge(ref.status)}</td>
                                                    <td className="px-4 py-4 text-right font-bold text-[#00E676] text-[12px]">+${ref.earnings.toFixed(2)}</td>
                                                    <td className="px-6 py-4 text-right text-white/25 text-[11px]">{new Date(ref.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </motion.div>
                        )}

                        {/* ═══ REFERRALS ═══ */}
                        {activePage === 'referrals' && (
                            <motion.div key="referrals" {...fadeIn} className="space-y-6">
                                <div className="grid grid-cols-4 gap-4">
                                    {[
                                        { label: 'Total Referrals', value: referralCount, icon: Users, color: 'from-emerald-500/15 to-transparent' },
                                        { label: 'Pending', value: recentReferrals.filter(r => r.status === 'pending').length, icon: Clock, color: 'from-amber-500/15 to-transparent' },
                                        { label: 'Converted', value: recentReferrals.filter(r => r.status === 'converted').length, icon: CheckCircle2, color: 'from-blue-500/15 to-transparent' },
                                        { label: 'Paid Out', value: recentReferrals.filter(r => r.status === 'paid').length, icon: DollarSign, color: 'from-emerald-500/15 to-transparent' },
                                    ].map((s, i) => (
                                        <div key={i} className="rounded-2xl border border-white/[0.06] bg-[#0A0A0A] p-5 relative overflow-hidden">
                                            <div className={`absolute inset-0 bg-gradient-to-br ${s.color}`} />
                                            <div className="relative"><s.icon className="w-4 h-4 text-[#00E676] mb-2" /><h3 className="text-2xl font-bold">{s.value}</h3><p className="text-[10px] text-white/30 mt-0.5 font-medium">{s.label}</p></div>
                                        </div>
                                    ))}
                                </div>
                                <div className="rounded-2xl border border-white/[0.06] bg-[#0A0A0A] overflow-hidden">
                                    <div className="p-6 border-b border-white/[0.06]"><h3 className="text-[14px] font-bold">All Referrals</h3></div>
                                    <table className="w-full text-sm">
                                        <thead><tr className="text-white/25 text-[10px] uppercase tracking-[0.15em] font-semibold border-b border-white/[0.04]">
                                            <th className="text-left px-6 py-3">#</th><th className="text-left px-4 py-3">Member</th><th className="text-left px-4 py-3">Email</th><th className="text-left px-4 py-3">Plan</th><th className="text-center px-4 py-3">Status</th><th className="text-right px-4 py-3">Commission</th><th className="text-right px-6 py-3">Date</th>
                                        </tr></thead>
                                        <tbody>
                                            {recentReferrals.map((ref, i) => (
                                                <tr key={ref.id} className="border-t border-white/[0.04] hover:bg-white/[0.015]">
                                                    <td className="px-6 py-3.5 text-white/20 text-[11px] font-mono">#{i + 1}</td>
                                                    <td className="px-4 py-3.5"><div className="flex items-center gap-2"><div className="w-7 h-7 rounded-lg bg-white/[0.04] border border-white/[0.06] flex items-center justify-center text-[9px] font-bold text-white/40">{(ref.referred_name || '?')[0].toUpperCase()}</div><span className="text-[12px] font-semibold">{ref.referred_name}</span></div></td>
                                                    <td className="px-4 py-3.5 text-[11px] text-white/30">{ref.referred_email}</td>
                                                    <td className="px-4 py-3.5 text-[11px]">{ref.plan_purchased}</td>
                                                    <td className="px-4 py-3.5 text-center">{badge(ref.status)}</td>
                                                    <td className="px-4 py-3.5 text-right font-bold text-[#00E676] text-[12px]">+${ref.earnings.toFixed(2)}</td>
                                                    <td className="px-6 py-3.5 text-right text-white/25 text-[11px]">{new Date(ref.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </motion.div>
                        )}

                        {/* ═══ PAYOUTS ═══ */}
                        {activePage === 'payouts' && (
                            <motion.div key="payouts" {...fadeIn} className="space-y-6">
                                <div className="grid grid-cols-3 gap-5">
                                    {[
                                        { label: 'Total Earned', value: `$${affiliate.total_earnings.toFixed(2)}`, color: '#00E676', glow: true, icon: TrendingUp },
                                        { label: 'Pending Payout', value: `$${(affiliate.pending_payout || 0).toFixed(2)}`, color: '#f97316', icon: Clock },
                                        { label: 'Total Paid', value: `$${(affiliate.total_paid || 0).toFixed(2)}`, color: '#a78bfa', icon: Send },
                                    ].map((s, i) => (
                                        <div key={i} className="rounded-2xl border border-white/[0.06] bg-[#0A0A0A] p-6 relative overflow-hidden">
                                            {s.glow && <div className="absolute top-0 right-0 w-40 h-40 bg-[#00E676]/[0.04] rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2" />}
                                            <div className="relative"><s.icon className="w-5 h-5 mb-3" style={{ color: s.color }} /><h3 className="text-3xl font-black" style={{ color: s.color }}>{s.value}</h3><p className="text-[10px] text-white/25 mt-1 font-medium">{s.label}</p></div>
                                        </div>
                                    ))}
                                </div>

                                {/* Payout Methods */}
                                <div className="rounded-2xl border border-white/[0.06] bg-[#0A0A0A] p-6">
                                    <h3 className="text-[14px] font-bold mb-1">Payout Methods</h3>
                                    <p className="text-[11px] text-white/25 mb-5">Manage how you receive payments</p>

                                    {payoutMethods.length > 0 && (
                                        <div className="space-y-3 mb-5">
                                            {payoutMethods.map(m => (
                                                <div key={m.id} className="border border-[#00E676]/15 bg-[#00E676]/[0.02] rounded-2xl p-5 flex items-center justify-between">
                                                    <div className="flex items-center gap-4">
                                                        <div className="w-12 h-12 rounded-xl bg-[#00E676]/10 flex items-center justify-center border border-[#00E676]/20">
                                                            {m.method_type === 'bank_transfer' && <Building2 className="w-5 h-5 text-[#00E676]" />}
                                                            {m.method_type === 'paypal' && <CreditCard className="w-5 h-5 text-[#00E676]" />}
                                                            {m.method_type === 'crypto' && <Bitcoin className="w-5 h-5 text-[#00E676]" />}
                                                        </div>
                                                        <div>
                                                            <p className="text-[13px] font-bold">{m.method_type === 'bank_transfer' ? 'Bank Transfer' : m.method_type === 'paypal' ? 'PayPal' : 'Crypto (USDT)'}</p>
                                                            <p className="text-[11px] text-white/30 mt-0.5">
                                                                {m.method_type === 'paypal' && m.details?.email}
                                                                {m.method_type === 'bank_transfer' && `${m.details?.bank_name} ••••${m.details?.account_number?.slice(-4) || ''}`}
                                                                {m.method_type === 'crypto' && `${m.details?.wallet_address?.slice(0, 8)}...${m.details?.wallet_address?.slice(-6) || ''}`}
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <div className="flex items-center gap-3">
                                                        {m.is_primary && <span className="text-[9px] bg-[#00E676]/10 text-[#00E676] px-3 py-1 rounded-full uppercase font-bold border border-[#00E676]/20">Primary</span>}
                                                        <button className="p-2 hover:bg-red-500/10 rounded-xl transition-colors"><Trash2 className="w-4 h-4 text-white/20 hover:text-red-400" /></button>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )}

                                    <div className="grid grid-cols-3 gap-4">
                                        {[
                                            { type: 'bank_transfer', label: 'Bank Transfer', icon: Building2, desc: 'Direct bank deposit', tag: 'Recommended' },
                                            { type: 'paypal', label: 'PayPal', icon: CreditCard, desc: 'Instant transfer', tag: null },
                                            { type: 'crypto', label: 'Crypto (USDT)', icon: Bitcoin, desc: 'TRC-20 / ERC-20', tag: 'Fast' },
                                        ].map(m => (
                                            <button key={m.type} onClick={() => setAddingMethod(addingMethod === m.type ? null : m.type)}
                                                className={`rounded-2xl p-5 text-left group cursor-pointer transition-all duration-300 border ${addingMethod === m.type ? 'border-[#00E676]/30 bg-[#00E676]/[0.03]' : 'border-white/[0.06] bg-white/[0.01] hover:border-white/[0.12] hover:bg-white/[0.02]'}`}>
                                                <div className="flex items-start justify-between mb-3">
                                                    <div className="w-11 h-11 rounded-xl bg-white/[0.04] border border-white/[0.06] flex items-center justify-center group-hover:border-[#00E676]/20"><m.icon className="w-5 h-5 text-[#00E676]" /></div>
                                                    {m.tag && <span className="text-[8px] bg-[#00E676]/10 text-[#00E676] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider border border-[#00E676]/10">{m.tag}</span>}
                                                </div>
                                                <h4 className="text-[13px] font-bold">{m.label}</h4>
                                                <p className="text-[10px] text-white/25 mt-0.5">{m.desc}</p>
                                                <div className="flex items-center gap-1 mt-3 text-[10px] text-[#00E676] font-semibold"><Plus className="w-3 h-3" /> {addingMethod === m.type ? 'Close' : 'Add Method'}</div>
                                            </button>
                                        ))}
                                    </div>

                                    <AnimatePresence>
                                        {addingMethod && (
                                            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="overflow-hidden">
                                                <form action={async (formData) => {
                                                    const res = await addPayoutMethod(formData)
                                                    if (res?.error) alert(res.error) // Simple alert for now, can be toast
                                                    if (res?.success) setAddingMethod(null)
                                                }} className="border border-white/[0.06] bg-white/[0.01] rounded-2xl p-6 mt-5 space-y-4">
                                                    <input type="hidden" name="method_type" value={addingMethod} />
                                                    {addingMethod === 'bank_transfer' && (<div className="grid grid-cols-2 gap-4">
                                                        {[{ n: 'bank_name', l: 'Bank Name', p: 'e.g. JPMorgan Chase' }, { n: 'account_holder', l: 'Account Holder', p: 'Full name' }, { n: 'account_number', l: 'Account Number', p: 'Account number' }, { n: 'routing_number', l: 'Routing Number', p: 'Routing number' }].map(f => (
                                                            <div key={f.n}><label className="text-[10px] text-white/30 uppercase tracking-wider block mb-2 font-semibold">{f.l}</label><input name={f.n} required className="w-full bg-black/40 border border-white/[0.08] rounded-xl px-4 py-2.5 text-[13px] focus:outline-none focus:border-[#00E676]/30 placeholder:text-white/15" placeholder={f.p} /></div>
                                                        ))}
                                                    </div>)}
                                                    {addingMethod === 'paypal' && (<div><label className="text-[10px] text-white/30 uppercase tracking-wider block mb-2 font-semibold">PayPal Email</label><input name="paypal_email" type="email" required className="w-full bg-black/40 border border-white/[0.08] rounded-xl px-4 py-2.5 text-[13px] focus:outline-none focus:border-[#00E676]/30 placeholder:text-white/15" placeholder="your@email.com" /></div>)}
                                                    {addingMethod === 'crypto' && (<div className="space-y-4"><div><label className="text-[10px] text-white/30 uppercase tracking-wider block mb-2 font-semibold">Wallet Address</label><input name="wallet_address" required className="w-full bg-black/40 border border-white/[0.08] rounded-xl px-4 py-2.5 text-[13px] font-mono focus:outline-none focus:border-[#00E676]/30 placeholder:text-white/15" placeholder="USDT wallet address" /></div><div><label className="text-[10px] text-white/30 uppercase tracking-wider block mb-2 font-semibold">Network</label><select name="network" className="w-full bg-black/40 border border-white/[0.08] rounded-xl px-4 py-2.5 text-[13px] focus:outline-none focus:border-[#00E676]/30"><option value="TRC-20">TRC-20 (Tron)</option><option value="ERC-20">ERC-20 (Ethereum)</option><option value="BEP-20">BEP-20 (BSC)</option></select></div></div>)}
                                                    <button type="submit" className="w-full bg-[#00E676]/10 text-[#00E676] border border-[#00E676]/20 hover:bg-[#00E676]/20 rounded-xl py-3 text-[13px] font-bold transition-all flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-[#00E676]/10"><Plus className="w-4 h-4" /> Save Payout Method</button>
                                                </form>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>

                                {/* Payout History */}
                                <div className="rounded-2xl border border-white/[0.06] bg-[#0A0A0A] overflow-hidden">
                                    <div className="p-6 border-b border-white/[0.06]"><h3 className="text-[14px] font-bold">Payout History</h3></div>
                                    {payoutHistory.length === 0 ? (
                                        <div className="p-16 text-center"><Wallet className="w-12 h-12 mx-auto mb-3 text-white/[0.05]" /><p className="text-sm text-white/20 font-semibold">No payouts yet</p><p className="text-[11px] text-white/15 mt-1">Min. $50.00 required</p></div>
                                    ) : (
                                        <table className="w-full text-sm"><thead><tr className="text-white/25 text-[10px] uppercase tracking-[0.15em] font-semibold border-b border-white/[0.04]">
                                            <th className="text-left px-6 py-3">Date</th><th className="text-left px-4 py-3">Method</th><th className="text-right px-4 py-3">Amount</th><th className="text-center px-6 py-3">Status</th>
                                        </tr></thead><tbody>
                                                {payoutHistory.map(p => (
                                                    <tr key={p.id} className="border-t border-white/[0.04] hover:bg-white/[0.015]">
                                                        <td className="px-6 py-3.5 text-[11px] text-white/30">{new Date(p.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</td>
                                                        <td className="px-4 py-3.5 text-[12px] capitalize">{p.method_type?.replace('_', ' ')}</td>
                                                        <td className="px-4 py-3.5 text-right text-[12px] font-bold">${p.amount.toFixed(2)}</td>
                                                        <td className="px-6 py-3.5 text-center">{badge(p.status)}</td>
                                                    </tr>
                                                ))}
                                            </tbody></table>
                                    )}
                                </div>
                            </motion.div>
                        )}

                        {/* ═══ SETTINGS ═══ */}
                        {activePage === 'settings' && (
                            <motion.div key="settings" {...fadeIn} className="space-y-6 max-w-2xl">
                                <div className="rounded-2xl border border-white/[0.06] bg-[#0A0A0A] p-6">
                                    <h3 className="text-[14px] font-bold mb-5 flex items-center gap-2"><ShieldCheck className="w-4 h-4 text-[#00E676]" /> Account Information</h3>
                                    <div className="space-y-4">
                                        {[
                                            { l: 'Full Name', v: affiliate.full_name || 'Partner', tag: null },
                                            { l: 'Email', v: affiliate.email || '—', tag: null },
                                            { l: 'Referral Code', v: affiliate.code, tag: 'Read-only', mono: true },
                                            { l: 'Commission Rate', v: `${affiliate.commission_rate}%`, tag: 'Set by Admin' },
                                            { l: 'Account Status', v: affiliate.status, badge: true },
                                        ].map(item => (
                                            <div key={item.l}>
                                                <label className="text-[10px] text-white/30 uppercase tracking-wider block mb-2 font-semibold">{item.l}</label>
                                                <div className="bg-black/30 border border-white/[0.06] rounded-xl px-5 py-3 text-[13px] flex items-center justify-between">
                                                    <span className={`flex items-center gap-2 ${item.mono ? 'font-mono text-[#00E676]' : ''}`}>
                                                        {item.badge && <div className="w-2 h-2 rounded-full bg-[#00E676] shadow-sm shadow-[#00E676]/50" />}
                                                        <span className="capitalize">{item.v}</span>
                                                    </span>
                                                    {item.tag && <span className="text-[9px] text-white/20 bg-white/[0.04] px-2.5 py-1 rounded-full border border-white/[0.06] font-semibold">{item.tag}</span>}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="rounded-2xl border border-white/[0.06] bg-[#0A0A0A] p-6">
                                    <h3 className="text-[14px] font-bold mb-5 flex items-center gap-2"><Link2 className="w-4 h-4 text-[#00E676]" /> Promotional Links</h3>
                                    <div className="space-y-3">
                                        {[
                                            { l: 'Landing Page', url: referralLink },
                                            { l: 'Signup Direct', url: `https://thetradal.com/signup?ref=${affiliate.code}` },
                                        ].map(link => (
                                            <div key={link.l} className="bg-black/30 border border-white/[0.06] rounded-xl px-5 py-4 flex items-center justify-between">
                                                <div><p className="text-[12px] font-semibold">{link.l}</p><p className="text-[10px] text-[#00E676] font-mono mt-0.5 truncate max-w-md">{link.url}</p></div>
                                                <button onClick={() => navigator.clipboard.writeText(link.url)} className="p-2.5 hover:bg-white/5 rounded-xl border border-white/[0.06]"><ExternalLink className="w-4 h-4 text-white/30" /></button>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="rounded-2xl border border-white/[0.06] bg-[#0A0A0A] p-6">
                                    <h3 className="text-[14px] font-bold mb-5">Notification Preferences</h3>
                                    <div className="space-y-5">
                                        {[
                                            { l: 'New Conversion', d: 'When someone signs up with your link', on: true },
                                            { l: 'Payout Processed', d: 'When your payout has been sent', on: true },
                                            { l: 'Weekly Report', d: 'Performance summary every Monday', on: false },
                                        ].map(pref => (
                                            <div key={pref.l} className="flex items-center justify-between">
                                                <div><p className="text-[13px] font-semibold">{pref.l}</p><p className="text-[10px] text-white/25 mt-0.5">{pref.d}</p></div>
                                                <div className={`w-11 h-6 rounded-full relative cursor-pointer transition-all duration-300 ${pref.on ? 'bg-[#00E676]/20 border border-[#00E676]/30 shadow-sm shadow-[#00E676]/10' : 'bg-white/[0.06] border border-white/[0.08]'}`}>
                                                    <div className={`w-5 h-5 rounded-full absolute top-0.5 shadow-sm transition-all duration-300 ${pref.on ? 'right-0.5 bg-[#00E676] shadow-[#00E676]/30' : 'left-0.5 bg-white/30'}`} />
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </main>
        </div>
    )
}
