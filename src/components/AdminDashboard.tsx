'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
    Users, DollarSign, TrendingUp, Clock, ChevronDown, ChevronRight,
    Edit3, Check, X, CreditCard, Building2, Bitcoin, AlertCircle,
    ArrowUpRight, Send, Search,
    LayoutDashboard, UserCheck, Wallet, BarChart3, Bell, LogOut,
    Mail, Calendar, Activity, Zap, Globe, Settings, Target, Eye,
    Filter, Sparkles
} from 'lucide-react'
import { updateCommission, updateAffiliateStatus, processPayoutAction } from '@/app/admin/actions'
import Image from 'next/image'

interface AdminDashboardProps {
    affiliates: any[]
    allReferrals: any[]
    allPayoutMethods: any[]
    allPayouts: any[]
    stats: {
        totalEarnings: number
        totalPaid: number
        totalPending: number
        totalConversions: number
        activePartners: number
        totalPartners: number
    }
}

type AdminPage = 'overview' | 'partners' | 'conversions' | 'payouts' | 'analytics'

export function AdminDashboard({ affiliates, allReferrals, allPayoutMethods, allPayouts, stats }: AdminDashboardProps) {
    const [activePage, setActivePage] = useState<AdminPage>('overview')
    const [expandedPartner, setExpandedPartner] = useState<string | null>(null)
    const [editingCommission, setEditingCommission] = useState<string | null>(null)
    const [commissionValue, setCommissionValue] = useState('')
    const [searchQuery, setSearchQuery] = useState('')
    const [filterStatus, setFilterStatus] = useState('all')

    const filteredAffiliates = affiliates.filter(a => {
        const q = searchQuery.toLowerCase()
        const match = !q || a.full_name?.toLowerCase().includes(q) || a.email?.toLowerCase().includes(q) || a.code?.toLowerCase().includes(q)
        const status = filterStatus === 'all' || a.status === filterStatus
        return match && status
    })

    const getRefs = (id: string) => allReferrals.filter(r => r.affiliate_id === id)
    const getMethod = (id: string) => allPayoutMethods.find(p => p.affiliate_id === id && p.is_primary)
    const getPayouts = (id: string) => allPayouts.filter(p => p.affiliate_id === id)

    const methodIcon = (t: string) => t === 'bank_transfer' ? <Building2 className="w-3.5 h-3.5" /> : t === 'paypal' ? <CreditCard className="w-3.5 h-3.5" /> : t === 'crypto' ? <Bitcoin className="w-3.5 h-3.5" /> : <AlertCircle className="w-3.5 h-3.5" />
    const methodLabel = (t: string) => t === 'bank_transfer' ? 'Bank Transfer' : t === 'paypal' ? 'PayPal' : t === 'crypto' ? 'Crypto USDT' : 'Not Set'

    const badge = (s: string) => {
        const c: Record<string, string> = { active: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20', suspended: 'bg-red-500/10 text-red-400 border-red-500/20', pending: 'bg-amber-500/10 text-amber-400 border-amber-500/20', converted: 'bg-blue-500/10 text-blue-400 border-blue-500/20', paid: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20', completed: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20', processing: 'bg-blue-500/10 text-blue-400 border-blue-500/20', failed: 'bg-red-500/10 text-red-400 border-red-500/20' }
        return <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border ${c[s] || c.pending}`}>{s}</span>
    }

    const navItems = [
        { id: 'overview' as AdminPage, label: 'Overview', icon: LayoutDashboard },
        { id: 'partners' as AdminPage, label: 'Partners', icon: Users, count: stats.totalPartners },
        { id: 'conversions' as AdminPage, label: 'Conversions', icon: Activity, count: stats.totalConversions },
        { id: 'payouts' as AdminPage, label: 'Payouts', icon: Wallet, count: stats.totalPending > 0 ? `$${stats.totalPending.toFixed(0)}` : null },
        { id: 'analytics' as AdminPage, label: 'Analytics', icon: BarChart3 },
    ]

    const topPartners = [...affiliates].sort((a, b) => b.total_earnings - a.total_earnings).slice(0, 5)
    const totalRevenueGenerated = stats.totalEarnings * 5 // Revenue from referred users
    const avgCommission = affiliates.length ? (affiliates.reduce((s: number, a: any) => s + a.commission_rate, 0) / affiliates.length).toFixed(1) : '0'
    const fadeIn = { initial: { opacity: 0, y: 12 }, animate: { opacity: 1, y: 0 }, exit: { opacity: 0, y: -8 }, transition: { duration: 0.3 } }

    // Plan breakdown
    const planStats = allReferrals.reduce((acc: any, r) => { acc[r.plan_purchased] = (acc[r.plan_purchased] || 0) + 1; return acc }, {})

    return (
        <div className="min-h-screen bg-[#050505] text-white flex" style={{ fontFamily: "'Inter', system-ui, -apple-system, sans-serif" }}>

            {/* ── Sidebar ── */}
            <aside className="w-[280px] border-r border-white/[0.06] bg-[#0A0A0A]/80 backdrop-blur-2xl flex flex-col fixed h-full z-40">
                <div className="p-6 border-b border-white/[0.06]">
                    <Image src="/logo.png" alt="Tradal" width={160} height={48} className="object-contain" />
                    <p className="text-[9px] text-[#00E676]/60 uppercase tracking-[0.3em] font-bold mt-2 pl-0.5">Admin Console</p>
                </div>
                <div className="px-4 pt-5 pb-2">
                    <p className="text-[9px] text-white/20 uppercase tracking-[0.2em] font-semibold px-3">Management</p>
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
                            {item.count && <span className="text-[9px] bg-white/[0.04] px-2 py-0.5 rounded-full border border-white/[0.06] font-bold">{item.count}</span>}
                        </button>
                    ))}
                </nav>
                <div className="p-4 border-t border-white/[0.06]">
                    <div className="bg-gradient-to-br from-white/[0.04] to-white/[0.01] border border-white/[0.06] rounded-2xl p-4">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#00E676] to-emerald-600 flex items-center justify-center text-sm font-bold text-black shadow-lg shadow-[#00E676]/20">A</div>
                            <div className="flex-1 min-w-0">
                                <p className="text-[13px] font-semibold">Admin</p>
                                <p className="text-[10px] text-white/25 truncate">admin@thetradal.com</p>
                            </div>
                        </div>
                    </div>
                </div>
            </aside>

            {/* ── Main ── */}
            <main className="flex-1 ml-[280px]">
                <header className="sticky top-0 z-30 border-b border-white/[0.06] bg-[#050505]/60 backdrop-blur-2xl">
                    <div className="px-8 h-[72px] flex items-center justify-between">
                        <div>
                            <h2 className="text-xl font-bold tracking-tight">{navItems.find(n => n.id === activePage)?.label}</h2>
                            <p className="text-[11px] text-white/25 mt-0.5">Manage your affiliate program</p>
                        </div>
                        <div className="flex items-center gap-2">
                            <button className="relative p-2.5 rounded-xl border border-white/[0.06] hover:bg-white/[0.03] transition-all"><Bell className="w-4 h-4 text-white/40" /><div className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-[#00E676] border-2 border-[#050505] shadow-sm shadow-[#00E676]/40" /></button>
                            <div className="bg-white/[0.03] border border-white/[0.06] rounded-full px-4 py-2 text-[11px] flex items-center gap-2 text-white/40"><div className="w-1.5 h-1.5 rounded-full bg-[#00E676] animate-pulse shadow-sm shadow-[#00E676]/50" /> Live</div>
                        </div>
                    </div>
                </header>

                <div className="p-8">
                    <AnimatePresence mode="wait">

                        {/* ═══ OVERVIEW ═══ */}
                        {activePage === 'overview' && (
                            <motion.div key="ov" {...fadeIn} className="space-y-6">
                                <div className="grid grid-cols-3 gap-5">
                                    {[
                                        { label: 'Revenue Generated', value: `$${totalRevenueGenerated.toFixed(2)}`, sub: 'From affiliate referrals', icon: DollarSign, glow: true },
                                        { label: 'Total Partners', value: stats.totalPartners, sub: `${stats.activePartners} active`, icon: Users },
                                        { label: 'Total Conversions', value: stats.totalConversions, sub: `${(stats.totalConversions / Math.max(stats.totalPartners, 1)).toFixed(1)} avg/partner`, icon: Target },
                                    ].map((s, i) => (
                                        <motion.div key={s.label} initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}
                                            className={`relative overflow-hidden rounded-2xl border border-white/[0.06] bg-[#0A0A0A] p-6 ${s.glow ? 'border-[#00E676]/10' : ''}`}>
                                            {s.glow && <div className="absolute top-0 right-0 w-40 h-40 bg-[#00E676]/[0.04] rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2" />}
                                            <div className="relative">
                                                <div className="w-10 h-10 rounded-xl bg-white/[0.04] border border-white/[0.06] flex items-center justify-center mb-4"><s.icon className="w-[18px] h-[18px] text-[#00E676]" /></div>
                                                <h3 className="text-3xl font-black tracking-tight">{s.value}</h3>
                                                <p className="text-[11px] text-white/30 mt-1 font-medium">{s.label}</p>
                                                <p className="text-[10px] text-white/15 mt-0.5">{s.sub}</p>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>

                                <div className="grid grid-cols-3 gap-5">
                                    {[
                                        { label: 'Commission Paid', value: `$${stats.totalPaid.toFixed(2)}`, icon: Send, color: '#00E676' },
                                        { label: 'Pending Payouts', value: `$${stats.totalPending.toFixed(2)}`, icon: Clock, color: '#f97316' },
                                        { label: 'Avg Commission', value: `${avgCommission}%`, icon: Zap, color: '#a78bfa' },
                                    ].map((s, i) => (
                                        <motion.div key={s.label} initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 + i * 0.08 }}
                                            className="rounded-2xl border border-white/[0.06] bg-[#0A0A0A] p-5">
                                            <div className="w-9 h-9 rounded-xl bg-white/[0.04] border border-white/[0.06] flex items-center justify-center mb-3"><s.icon className="w-4 h-4" style={{ color: s.color }} /></div>
                                            <h3 className="text-xl font-bold" style={{ color: s.color }}>{s.value}</h3>
                                            <p className="text-[10px] text-white/25 mt-0.5 font-medium">{s.label}</p>
                                        </motion.div>
                                    ))}
                                </div>

                                <div className="grid grid-cols-2 gap-5">
                                    {/* Top Partners */}
                                    <div className="rounded-2xl border border-white/[0.06] bg-[#0A0A0A] p-6">
                                        <h3 className="text-[14px] font-bold mb-1 flex items-center gap-2"><Sparkles className="w-4 h-4 text-[#00E676]" /> Top Partners</h3>
                                        <p className="text-[11px] text-white/20 mb-5">By total earnings</p>
                                        <div className="space-y-3">
                                            {topPartners.map((p, i) => (
                                                <div key={p.id} className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/[0.02] transition-colors">
                                                    <span className="text-[11px] text-white/20 w-5 text-right font-mono font-bold">#{i + 1}</span>
                                                    <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#00E676] to-emerald-600 flex items-center justify-center text-[11px] font-bold text-black shrink-0 shadow-sm shadow-[#00E676]/20">{(p.full_name || '?')[0].toUpperCase()}</div>
                                                    <div className="flex-1 min-w-0">
                                                        <p className="text-[12px] font-semibold truncate">{p.full_name}</p>
                                                        <p className="text-[10px] text-white/20 truncate">{p.email}</p>
                                                    </div>
                                                    <div className="text-right">
                                                        <p className="text-[12px] font-black text-[#00E676]">${p.total_earnings.toFixed(2)}</p>
                                                        <p className="text-[9px] text-white/20">{getRefs(p.id).length} conv.</p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Recent Conversions */}
                                    <div className="rounded-2xl border border-white/[0.06] bg-[#0A0A0A] p-6">
                                        <h3 className="text-[14px] font-bold mb-1 flex items-center gap-2"><Activity className="w-4 h-4 text-[#00E676]" /> Recent Conversions</h3>
                                        <p className="text-[11px] text-white/20 mb-5">Latest referral activity</p>
                                        <div className="space-y-3">
                                            {allReferrals.slice(0, 6).map(r => {
                                                const partner = affiliates.find((a: any) => a.id === r.affiliate_id)
                                                return (
                                                    <div key={r.id} className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/[0.02] transition-colors">
                                                        <div className="w-8 h-8 rounded-lg bg-white/[0.04] border border-white/[0.06] flex items-center justify-center text-[10px] font-bold text-white/30">{(r.referred_name || '?')[0].toUpperCase()}</div>
                                                        <div className="flex-1 min-w-0">
                                                            <p className="text-[12px] font-semibold">{r.referred_name || 'Anonymous'}</p>
                                                            <p className="text-[10px] text-white/20">via <span className="text-[#00E676]">{partner?.full_name}</span> • {r.plan_purchased}</p>
                                                        </div>
                                                        <div className="text-right">
                                                            <p className="text-[12px] font-bold text-[#00E676]">+${r.earnings.toFixed(2)}</p>
                                                            <p className="text-[9px] text-white/20">{new Date(r.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</p>
                                                        </div>
                                                    </div>
                                                )
                                            })}
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        )}

                        {/* ═══ PARTNERS ═══ */}
                        {activePage === 'partners' && (
                            <motion.div key="pt" {...fadeIn} className="space-y-5">
                                <div className="flex items-center gap-3">
                                    <div className="flex-1 relative">
                                        <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-white/25" />
                                        <input type="text" placeholder="Search by name, email, or code..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)}
                                            className="w-full bg-[#0A0A0A] border border-white/[0.06] rounded-xl pl-11 pr-4 py-3 text-[13px] focus:outline-none focus:border-[#00E676]/20 placeholder:text-white/15 transition-colors" />
                                    </div>
                                    <div className="flex items-center gap-1 bg-[#0A0A0A] border border-white/[0.06] rounded-xl p-1">
                                        {['all', 'active', 'suspended', 'pending'].map(s => (
                                            <button key={s} onClick={() => setFilterStatus(s)}
                                                className={`px-4 py-2 rounded-lg text-[11px] font-semibold capitalize transition-all ${filterStatus === s ? 'bg-[#00E676]/10 text-[#00E676] shadow-sm' : 'text-white/30 hover:text-white/50'}`}>{s}</button>
                                        ))}
                                    </div>
                                </div>

                                <div className="rounded-2xl border border-white/[0.06] bg-[#0A0A0A] overflow-hidden">
                                    <table className="w-full text-sm">
                                        <thead><tr className="text-white/25 text-[10px] uppercase tracking-[0.15em] font-semibold border-b border-white/[0.04]">
                                            <th className="text-left px-6 py-4 font-semibold">Partner</th>
                                            <th className="text-left px-4 py-4 font-semibold">Code</th>
                                            <th className="text-center px-4 py-4 font-semibold">Conv.</th>
                                            <th className="text-right px-4 py-4 font-semibold">Earned</th>
                                            <th className="text-right px-4 py-4 font-semibold">Pending</th>
                                            <th className="text-right px-4 py-4 font-semibold">Paid</th>
                                            <th className="text-center px-4 py-4 font-semibold">Method</th>
                                            <th className="text-center px-4 py-4 font-semibold">Rate</th>
                                            <th className="text-center px-4 py-4 font-semibold">Status</th>
                                            <th className="w-12"></th>
                                        </tr></thead>
                                        <tbody>
                                            {filteredAffiliates.length === 0 ? (
                                                <tr><td colSpan={10} className="px-6 py-20 text-center text-white/15"><Users className="w-12 h-12 mx-auto mb-3 text-white/[0.05]" /><p className="font-semibold">{searchQuery ? 'No partners match' : 'No partners yet'}</p></td></tr>
                                            ) : filteredAffiliates.map(aff => {
                                                const refs = getRefs(aff.id)
                                                const method = getMethod(aff.id)
                                                const pays = getPayouts(aff.id)
                                                const open = expandedPartner === aff.id
                                                return (
                                                    <>
                                                        <tr key={aff.id} className={`border-t border-white/[0.04] hover:bg-white/[0.015] cursor-pointer transition-colors ${open ? 'bg-white/[0.02]' : ''}`} onClick={() => setExpandedPartner(open ? null : aff.id)}>
                                                            <td className="px-6 py-4">
                                                                <div className="flex items-center gap-3">
                                                                    <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#00E676] to-emerald-600 flex items-center justify-center text-[11px] font-bold text-black shrink-0 shadow-sm shadow-[#00E676]/20">{(aff.full_name || '?')[0].toUpperCase()}</div>
                                                                    <div className="min-w-0"><p className="text-[12px] font-semibold truncate">{aff.full_name}</p><p className="text-[10px] text-white/20 truncate">{aff.email}</p></div>
                                                                </div>
                                                            </td>
                                                            <td className="px-4 py-4"><span className="font-mono text-[11px] text-[#00E676] bg-[#00E676]/[0.04] px-2.5 py-1 rounded-lg border border-[#00E676]/10">{aff.code}</span></td>
                                                            <td className="px-4 py-4 text-center text-[12px] font-bold">{refs.length}</td>
                                                            <td className="px-4 py-4 text-right text-[12px] font-bold">${(aff.total_earnings || 0).toFixed(2)}</td>
                                                            <td className="px-4 py-4 text-right"><span className={`text-[12px] font-bold ${(aff.pending_payout || 0) > 0 ? 'text-orange-400' : 'text-white/15'}`}>${(aff.pending_payout || 0).toFixed(2)}</span></td>
                                                            <td className="px-4 py-4 text-right text-[12px] text-white/30">${(aff.total_paid || 0).toFixed(2)}</td>
                                                            <td className="px-4 py-4 text-center">{method ? <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#00E676]/[0.04] text-[10px] text-[#00E676] border border-[#00E676]/10 font-semibold">{methodIcon(method.method_type)} {methodLabel(method.method_type)}</div> : <span className="text-[10px] text-red-400/50">None</span>}</td>
                                                            <td className="px-4 py-4 text-center" onClick={e => e.stopPropagation()}>
                                                                {editingCommission === aff.id ? (
                                                                    <div className="inline-flex items-center gap-1">
                                                                        <input type="number" value={commissionValue} onChange={e => setCommissionValue(e.target.value)} className="w-14 bg-black/50 border border-[#00E676]/30 rounded-lg px-2 py-1 text-[12px] text-center focus:outline-none" autoFocus />
                                                                        <button onClick={async () => { await updateCommission(aff.id, parseFloat(commissionValue)); setEditingCommission(null) }} className="p-1 hover:bg-[#00E676]/10 rounded-lg"><Check className="w-3.5 h-3.5 text-[#00E676]" /></button>
                                                                        <button onClick={() => setEditingCommission(null)} className="p-1 hover:bg-red-500/10 rounded-lg"><X className="w-3.5 h-3.5 text-red-400" /></button>
                                                                    </div>
                                                                ) : (
                                                                    <button onClick={() => { setEditingCommission(aff.id); setCommissionValue(String(aff.commission_rate)) }} className="inline-flex items-center gap-1 text-[12px] hover:text-[#00E676] transition-colors group font-semibold">{aff.commission_rate}%<Edit3 className="w-3 h-3 text-white/10 group-hover:text-[#00E676]/60" /></button>
                                                                )}
                                                            </td>
                                                            <td className="px-4 py-4 text-center" onClick={e => e.stopPropagation()}>
                                                                <select value={aff.status} onChange={async e => await updateAffiliateStatus(aff.id, e.target.value)}
                                                                    className={`text-[10px] font-bold uppercase px-3 py-1 rounded-full cursor-pointer border focus:outline-none ${aff.status === 'active' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : aff.status === 'suspended' ? 'bg-red-500/10 text-red-400 border-red-500/20' : 'bg-amber-500/10 text-amber-400 border-amber-500/20'}`}>
                                                                    <option value="active">Active</option><option value="suspended">Suspended</option><option value="pending">Pending</option>
                                                                </select>
                                                            </td>
                                                            <td className="px-3 py-4">{open ? <ChevronDown className="w-4 h-4 text-white/20" /> : <ChevronRight className="w-4 h-4 text-white/20" />}</td>
                                                        </tr>

                                                        {/* Expanded */}
                                                        {open && (<tr key={`${aff.id}-exp`}><td colSpan={10} className="px-6 py-0 border-t border-white/[0.04]">
                                                            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} className="py-6 space-y-5 overflow-hidden">
                                                                <div className="grid grid-cols-4 gap-4">
                                                                    {[
                                                                        { label: 'Email', value: aff.email, icon: Mail },
                                                                        { label: 'Joined', value: new Date(aff.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }), icon: Calendar },
                                                                        { label: 'Referral Link', value: `thetradal.com?ref=${aff.code}`, icon: Globe, mono: true, green: true },
                                                                        { label: 'Payout Method', value: method ? methodLabel(method.method_type) : 'Not set', icon: Wallet, warn: !method },
                                                                    ].map(c => (
                                                                        <div key={c.label} className="bg-black/30 border border-white/[0.06] rounded-2xl p-5">
                                                                            <c.icon className="w-4 h-4 text-[#00E676] mb-3" />
                                                                            <p className="text-[10px] text-white/25 mb-1 font-semibold uppercase tracking-wider">{c.label}</p>
                                                                            <p className={`text-[12px] font-medium truncate ${(c as any).mono ? 'font-mono' : ''} ${(c as any).green ? 'text-[#00E676]' : ''} ${(c as any).warn ? 'text-red-400/60' : ''}`}>{c.value}</p>
                                                                        </div>
                                                                    ))}
                                                                </div>
                                                                <div className="grid grid-cols-2 gap-5">
                                                                    {/* Converted Members */}
                                                                    <div className="bg-black/30 border border-white/[0.06] rounded-2xl p-6">
                                                                        <h4 className="text-[13px] font-bold mb-4 flex items-center gap-2"><UserCheck className="w-4 h-4 text-[#00E676]" /> Converted Members ({refs.length})</h4>
                                                                        {refs.length === 0 ? <p className="text-[11px] text-white/20">No conversions yet</p> : (
                                                                            <div className="space-y-2.5 max-h-60 overflow-y-auto">
                                                                                {refs.map((r: any) => (
                                                                                    <div key={r.id} className="flex items-center justify-between p-3 rounded-xl bg-white/[0.01] border border-white/[0.04]">
                                                                                        <div className="flex items-center gap-3">
                                                                                            <div className="w-7 h-7 rounded-lg bg-white/[0.04] flex items-center justify-center text-[9px] font-bold text-white/30">{(r.referred_name || '?')[0].toUpperCase()}</div>
                                                                                            <div>
                                                                                                <p className="text-[11px] font-semibold">{r.referred_name || 'Anonymous'}</p>
                                                                                                <p className="text-[9px] text-white/20">{r.referred_email} • {r.plan_purchased}</p>
                                                                                            </div>
                                                                                        </div>
                                                                                        <div className="text-right flex items-center gap-3">
                                                                                            <span className="text-[11px] text-[#00E676] font-bold">+${r.earnings.toFixed(2)}</span>
                                                                                            {badge(r.status)}
                                                                                        </div>
                                                                                    </div>
                                                                                ))}
                                                                            </div>
                                                                        )}
                                                                    </div>
                                                                    {/* Financial */}
                                                                    <div className="bg-black/30 border border-white/[0.06] rounded-2xl p-6">
                                                                        <h4 className="text-[13px] font-bold mb-4 flex items-center gap-2"><DollarSign className="w-4 h-4 text-[#00E676]" /> Financial Summary</h4>
                                                                        <div className="space-y-3">
                                                                            {[
                                                                                { l: 'Total Earned', v: `$${(aff.total_earnings || 0).toFixed(2)}`, c: 'text-white' },
                                                                                { l: 'Already Paid', v: `$${(aff.total_paid || 0).toFixed(2)}`, c: 'text-[#00E676]' },
                                                                                { l: 'Pending Payout', v: `$${(aff.pending_payout || 0).toFixed(2)}`, c: 'text-orange-400' },
                                                                            ].map(item => (
                                                                                <div key={item.l} className="flex justify-between text-[12px] p-3 rounded-xl bg-white/[0.01]">
                                                                                    <span className="text-white/30">{item.l}</span>
                                                                                    <span className={`font-bold ${item.c}`}>{item.v}</span>
                                                                                </div>
                                                                            ))}
                                                                        </div>
                                                                        {(aff.pending_payout || 0) > 0 && method && (
                                                                            <button onClick={async () => await processPayoutAction(aff.id, aff.pending_payout, method.method_type)}
                                                                                className="w-full mt-5 bg-[#00E676]/10 text-[#00E676] border border-[#00E676]/20 hover:bg-[#00E676]/20 rounded-xl py-3 text-[13px] font-bold transition-all flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-[#00E676]/10"><Send className="w-4 h-4" /> Process Payout (${(aff.pending_payout || 0).toFixed(2)})</button>
                                                                        )}
                                                                        {pays.length > 0 && (
                                                                            <div className="mt-5 border-t border-white/[0.06] pt-4">
                                                                                <p className="text-[10px] text-white/20 mb-2 font-semibold uppercase tracking-wider">Previous Payouts</p>
                                                                                {pays.map((p: any) => (
                                                                                    <div key={p.id} className="flex justify-between text-[11px] py-1.5"><span className="text-white/20">{new Date(p.created_at).toLocaleDateString()}</span><span className={p.status === 'completed' ? 'text-[#00E676] font-semibold' : 'text-amber-400'}>${p.amount.toFixed(2)} • {p.status}</span></div>
                                                                                ))}
                                                                            </div>
                                                                        )}
                                                                    </div>
                                                                </div>
                                                            </motion.div>
                                                        </td></tr>)}
                                                    </>
                                                )
                                            })}
                                        </tbody>
                                    </table>
                                </div>
                            </motion.div>
                        )}

                        {/* ═══ CONVERSIONS ═══ */}
                        {activePage === 'conversions' && (
                            <motion.div key="cv" {...fadeIn} className="space-y-5">
                                <div className="grid grid-cols-4 gap-4">
                                    {[
                                        { label: 'Total', value: allReferrals.length, icon: Activity, color: '#00E676' },
                                        { label: 'Pending', value: allReferrals.filter(r => r.status === 'pending').length, icon: Clock, color: '#fbbf24' },
                                        { label: 'Converted', value: allReferrals.filter(r => r.status === 'converted').length, icon: ArrowUpRight, color: '#3b82f6' },
                                        { label: 'Paid', value: allReferrals.filter(r => r.status === 'paid').length, icon: Check, color: '#00E676' },
                                    ].map((s, i) => (
                                        <div key={i} className="rounded-2xl border border-white/[0.06] bg-[#0A0A0A] p-5">
                                            <div className="w-9 h-9 rounded-xl bg-white/[0.04] border border-white/[0.06] flex items-center justify-center mb-3"><s.icon className="w-4 h-4" style={{ color: s.color }} /></div>
                                            <h3 className="text-2xl font-bold">{s.value}</h3>
                                            <p className="text-[10px] text-white/25 mt-0.5 font-medium">{s.label}</p>
                                        </div>
                                    ))}
                                </div>
                                <div className="rounded-2xl border border-white/[0.06] bg-[#0A0A0A] overflow-hidden">
                                    <table className="w-full text-sm">
                                        <thead><tr className="text-white/25 text-[10px] uppercase tracking-[0.15em] font-semibold border-b border-white/[0.04]">
                                            <th className="text-left px-6 py-3.5">Member</th><th className="text-left px-4 py-3.5">Email</th><th className="text-left px-4 py-3.5">Partner</th><th className="text-left px-4 py-3.5">Plan</th><th className="text-right px-4 py-3.5">Amount</th><th className="text-right px-4 py-3.5">Commission</th><th className="text-center px-4 py-3.5">Status</th><th className="text-right px-6 py-3.5">Date</th>
                                        </tr></thead>
                                        <tbody>
                                            {allReferrals.map(r => {
                                                const partner = affiliates.find((a: any) => a.id === r.affiliate_id)
                                                return (
                                                    <tr key={r.id} className="border-t border-white/[0.04] hover:bg-white/[0.015]">
                                                        <td className="px-6 py-3.5"><div className="flex items-center gap-2"><div className="w-7 h-7 rounded-lg bg-white/[0.04] border border-white/[0.06] flex items-center justify-center text-[9px] font-bold text-white/30">{(r.referred_name || '?')[0].toUpperCase()}</div><span className="text-[12px] font-semibold">{r.referred_name}</span></div></td>
                                                        <td className="px-4 py-3.5 text-[11px] text-white/25">{r.referred_email}</td>
                                                        <td className="px-4 py-3.5"><span className="text-[11px] text-[#00E676] font-semibold">{partner?.full_name || '—'}</span></td>
                                                        <td className="px-4 py-3.5 text-[11px]">{r.plan_purchased}</td>
                                                        <td className="px-4 py-3.5 text-right text-[11px]">${r.amount?.toFixed(2)}</td>
                                                        <td className="px-4 py-3.5 text-right text-[12px] font-bold text-[#00E676]">+${r.earnings.toFixed(2)}</td>
                                                        <td className="px-4 py-3.5 text-center">{badge(r.status)}</td>
                                                        <td className="px-6 py-3.5 text-right text-[11px] text-white/25">{new Date(r.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</td>
                                                    </tr>
                                                )
                                            })}
                                        </tbody>
                                    </table>
                                </div>
                            </motion.div>
                        )}

                        {/* ═══ PAYOUTS ═══ */}
                        {activePage === 'payouts' && (
                            <motion.div key="py" {...fadeIn} className="space-y-5">
                                <div className="grid grid-cols-3 gap-5">
                                    {[
                                        { label: 'Total Paid Out', value: `$${stats.totalPaid.toFixed(2)}`, icon: Send, color: '#00E676', glow: true },
                                        { label: 'Pending Payouts', value: `$${stats.totalPending.toFixed(2)}`, icon: Clock, color: '#f97316' },
                                        { label: 'Total Transactions', value: allPayouts.length, icon: Activity, color: '#a78bfa' },
                                    ].map((s, i) => (
                                        <div key={i} className="rounded-2xl border border-white/[0.06] bg-[#0A0A0A] p-6 relative overflow-hidden">
                                            {s.glow && <div className="absolute top-0 right-0 w-40 h-40 bg-[#00E676]/[0.04] rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2" />}
                                            <div className="relative"><div className="w-10 h-10 rounded-xl bg-white/[0.04] border border-white/[0.06] flex items-center justify-center mb-3"><s.icon className="w-5 h-5" style={{ color: s.color }} /></div><h3 className="text-2xl font-bold" style={{ color: s.color }}>{s.value}</h3><p className="text-[10px] text-white/25 mt-0.5 font-medium">{s.label}</p></div>
                                        </div>
                                    ))}
                                </div>

                                {/* Pending per partner */}
                                {affiliates.filter(a => (a.pending_payout || 0) > 0).length > 0 && (
                                    <div className="rounded-2xl border border-white/[0.06] bg-[#0A0A0A] p-6">
                                        <h3 className="text-[14px] font-bold mb-5 flex items-center gap-2"><AlertCircle className="w-4 h-4 text-orange-400" /> Pending Payouts</h3>
                                        <div className="space-y-3">
                                            {affiliates.filter(a => (a.pending_payout || 0) > 0).map(aff => {
                                                const method = getMethod(aff.id)
                                                return (
                                                    <div key={aff.id} className="flex items-center justify-between bg-black/30 border border-white/[0.06] rounded-2xl p-5">
                                                        <div className="flex items-center gap-3">
                                                            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#00E676] to-emerald-600 flex items-center justify-center text-[11px] font-bold text-black">{(aff.full_name || '?')[0].toUpperCase()}</div>
                                                            <div><p className="text-[12px] font-semibold">{aff.full_name}</p><p className="text-[10px] text-white/20">{aff.email}</p></div>
                                                        </div>
                                                        <div className="flex items-center gap-4">
                                                            {method ? <div className="flex items-center gap-1.5 text-[10px] text-white/25">{methodIcon(method.method_type)} {methodLabel(method.method_type)}</div> : <span className="text-[10px] text-red-400/60">No method</span>}
                                                            <span className="text-[14px] font-black text-orange-400">${(aff.pending_payout || 0).toFixed(2)}</span>
                                                            {method && <button onClick={async () => await processPayoutAction(aff.id, aff.pending_payout, method.method_type)} className="bg-[#00E676]/10 text-[#00E676] border border-[#00E676]/20 hover:bg-[#00E676]/20 rounded-xl px-5 py-2.5 text-[12px] font-bold transition-all flex items-center gap-2 hover:shadow-lg hover:shadow-[#00E676]/10"><Send className="w-3.5 h-3.5" /> Process</button>}
                                                        </div>
                                                    </div>
                                                )
                                            })}
                                        </div>
                                    </div>
                                )}

                                <div className="rounded-2xl border border-white/[0.06] bg-[#0A0A0A] overflow-hidden">
                                    <div className="p-6 border-b border-white/[0.04]"><h3 className="text-[14px] font-bold">All Payout History</h3></div>
                                    <table className="w-full text-sm">
                                        <thead><tr className="text-white/25 text-[10px] uppercase tracking-[0.15em] font-semibold border-b border-white/[0.04]">
                                            <th className="text-left px-6 py-3">Partner</th><th className="text-left px-4 py-3">Method</th><th className="text-right px-4 py-3">Amount</th><th className="text-center px-4 py-3">Status</th><th className="text-right px-6 py-3">Date</th>
                                        </tr></thead>
                                        <tbody>
                                            {allPayouts.map(p => {
                                                const partner = affiliates.find((a: any) => a.id === p.affiliate_id)
                                                return (
                                                    <tr key={p.id} className="border-t border-white/[0.04] hover:bg-white/[0.015]">
                                                        <td className="px-6 py-3.5"><div className="flex items-center gap-2"><div className="w-7 h-7 rounded-xl bg-gradient-to-br from-[#00E676] to-emerald-600 flex items-center justify-center text-[9px] font-bold text-black">{(partner?.full_name || '?')[0].toUpperCase()}</div><span className="text-[12px] font-semibold">{partner?.full_name}</span></div></td>
                                                        <td className="px-4 py-3.5"><div className="flex items-center gap-1.5 text-[11px]">{methodIcon(p.method_type)} {methodLabel(p.method_type)}</div></td>
                                                        <td className="px-4 py-3.5 text-right text-[12px] font-bold">${p.amount.toFixed(2)}</td>
                                                        <td className="px-4 py-3.5 text-center">{badge(p.status)}</td>
                                                        <td className="px-6 py-3.5 text-right text-[11px] text-white/25">{new Date(p.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</td>
                                                    </tr>
                                                )
                                            })}
                                        </tbody>
                                    </table>
                                </div>
                            </motion.div>
                        )}

                        {/* ═══ ANALYTICS ═══ */}
                        {activePage === 'analytics' && (
                            <motion.div key="an" {...fadeIn} className="space-y-6">
                                <div className="grid grid-cols-2 gap-5">
                                    {/* Plan Breakdown */}
                                    <div className="rounded-2xl border border-white/[0.06] bg-[#0A0A0A] p-6">
                                        <h3 className="text-[14px] font-bold mb-1">Plan Breakdown</h3>
                                        <p className="text-[11px] text-white/20 mb-5">Conversions by subscription tier</p>
                                        <div className="space-y-4">
                                            {Object.entries(planStats).sort(([, a], [, b]) => (b as number) - (a as number)).map(([plan, count]) => {
                                                const pct = allReferrals.length > 0 ? ((count as number) / allReferrals.length * 100) : 0
                                                return (
                                                    <div key={plan}>
                                                        <div className="flex justify-between text-[12px] mb-2"><span className="font-semibold">{plan}</span><span className="text-white/30">{count as number} ({pct.toFixed(0)}%)</span></div>
                                                        <div className="w-full bg-white/[0.04] rounded-full h-2.5 overflow-hidden"><motion.div initial={{ width: 0 }} animate={{ width: `${pct}%` }} transition={{ delay: 0.3 }} className="bg-gradient-to-r from-[#00E676]/40 to-[#00E676] rounded-full h-2.5" /></div>
                                                    </div>
                                                )
                                            })}
                                        </div>
                                    </div>
                                    {/* Partner Status */}
                                    <div className="rounded-2xl border border-white/[0.06] bg-[#0A0A0A] p-6">
                                        <h3 className="text-[14px] font-bold mb-1">Partner Status</h3>
                                        <p className="text-[11px] text-white/20 mb-5">Breakdown by account status</p>
                                        <div className="space-y-4">
                                            {[
                                                { label: 'Active', count: affiliates.filter(a => a.status === 'active').length, color: '#00E676' },
                                                { label: 'Pending', count: affiliates.filter(a => a.status === 'pending').length, color: '#fbbf24' },
                                                { label: 'Suspended', count: affiliates.filter(a => a.status === 'suspended').length, color: '#f87171' },
                                            ].map(item => {
                                                const pct = affiliates.length > 0 ? (item.count / affiliates.length * 100) : 0
                                                return (
                                                    <div key={item.label}>
                                                        <div className="flex justify-between text-[12px] mb-2"><span className="font-semibold" style={{ color: item.color }}>{item.label}</span><span className="text-white/30">{item.count} ({pct.toFixed(0)}%)</span></div>
                                                        <div className="w-full bg-white/[0.04] rounded-full h-2.5 overflow-hidden"><motion.div initial={{ width: 0 }} animate={{ width: `${pct}%` }} transition={{ delay: 0.3 }} className="rounded-full h-2.5" style={{ backgroundColor: item.color }} /></div>
                                                    </div>
                                                )
                                            })}
                                        </div>
                                    </div>
                                </div>

                                {/* KPIs */}
                                <div className="grid grid-cols-4 gap-4">
                                    {[
                                        { label: 'Revenue/Partner', value: `$${affiliates.length ? (totalRevenueGenerated / affiliates.length).toFixed(2) : '0'}` },
                                        { label: 'Commission/Conv.', value: `$${allReferrals.length ? (stats.totalEarnings / allReferrals.length).toFixed(2) : '0'}` },
                                        { label: 'Payout Ratio', value: `${stats.totalEarnings > 0 ? ((stats.totalPaid / stats.totalEarnings) * 100).toFixed(0) : 0}%` },
                                        { label: 'Active Rate', value: `${stats.totalPartners > 0 ? ((stats.activePartners / stats.totalPartners) * 100).toFixed(0) : 0}%` },
                                    ].map((k, i) => (
                                        <div key={i} className="rounded-2xl border border-white/[0.06] bg-[#0A0A0A] p-5 text-center">
                                            <h3 className="text-2xl font-black text-[#00E676]">{k.value}</h3>
                                            <p className="text-[10px] text-white/25 mt-1 font-medium">{k.label}</p>
                                        </div>
                                    ))}
                                </div>

                                {/* All Partners table (analytics view) */}
                                <div className="rounded-2xl border border-white/[0.06] bg-[#0A0A0A] p-6">
                                    <h3 className="text-[14px] font-bold mb-5">Partner Performance</h3>
                                    <table className="w-full text-sm">
                                        <thead><tr className="text-white/25 text-[10px] uppercase tracking-[0.15em] font-semibold border-b border-white/[0.04]">
                                            <th className="text-left px-4 py-3">Partner</th><th className="text-center px-4 py-3">Conv.</th><th className="text-right px-4 py-3">Earnings</th><th className="text-center px-4 py-3">Rate</th><th className="text-right px-4 py-3">Avg/Conv</th><th className="text-center px-4 py-3">Status</th>
                                        </tr></thead>
                                        <tbody>
                                            {[...affiliates].sort((a, b) => b.total_earnings - a.total_earnings).map(a => {
                                                const rc = getRefs(a.id).length
                                                return (
                                                    <tr key={a.id} className="border-t border-white/[0.04]">
                                                        <td className="px-4 py-3"><div className="flex items-center gap-2"><div className="w-7 h-7 rounded-lg bg-gradient-to-br from-[#00E676] to-emerald-600 flex items-center justify-center text-[9px] font-bold text-black">{(a.full_name || '?')[0].toUpperCase()}</div><span className="text-[12px] font-semibold">{a.full_name}</span></div></td>
                                                        <td className="px-4 py-3 text-center text-[12px] font-bold">{rc}</td>
                                                        <td className="px-4 py-3 text-right text-[12px] font-bold text-[#00E676]">${a.total_earnings.toFixed(2)}</td>
                                                        <td className="px-4 py-3 text-center text-[11px]">{a.commission_rate}%</td>
                                                        <td className="px-4 py-3 text-right text-[11px] text-white/30">${rc > 0 ? (a.total_earnings / rc).toFixed(2) : '0.00'}</td>
                                                        <td className="px-4 py-3 text-center">{badge(a.status)}</td>
                                                    </tr>
                                                )
                                            })}
                                        </tbody>
                                    </table>
                                </div>
                            </motion.div>
                        )}

                    </AnimatePresence>
                </div>
            </main>
        </div>
    )
}
