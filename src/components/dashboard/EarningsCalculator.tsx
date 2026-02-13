'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Calculator, TrendingUp, Users, ChevronDown, Check } from 'lucide-react'
import { getLivePricing, Plan } from '@/app/actions/pricing'

interface EarningsCalculatorProps {
    commissionRate?: number
}

export default function EarningsCalculator({ commissionRate = 20 }: EarningsCalculatorProps) {
    const [referrals, setReferrals] = useState(10)
    const [plans, setPlans] = useState<Plan[]>([])
    const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null)
    const [loading, setLoading] = useState(true)
    const [isDropdownOpen, setIsDropdownOpen] = useState(false)

    useEffect(() => {
        async function fetchPrice() {
            try {
                const data = await getLivePricing()
                setPlans(data)
                // Select "GROWTH" by default, or the middle/second plan
                const defaultPlan = data.find(p => p.name === 'GROWTH') || data[1] || data[0]
                setSelectedPlan(defaultPlan)
            } catch (error) {
                console.error('Failed to fetch price:', error)
            } finally {
                setLoading(false)
            }
        }
        fetchPrice()
    }, [])

    const monthlyEarnings = selectedPlan ? (referrals * selectedPlan.price * (commissionRate / 100)) : 0
    const yearlyEarnings = monthlyEarnings * 12

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="p-6 rounded-2xl border border-white/[0.06] bg-[#0A0A0A] relative overflow-hidden group shadow-none col-span-2 h-full flex flex-col"
        >
            {/* Background Gradients */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-[#00E676]/5 rounded-full blur-[100px] -z-10 transition-opacity opacity-50 group-hover:opacity-70 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#00E676]/[0.02] rounded-full blur-[80px] -z-10 pointer-events-none" />

            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#00E676]/20 to-emerald-500/5 flex items-center justify-center border border-[#00E676]/20 shadow-lg shadow-[#00E676]/10">
                        <Calculator className="w-6 h-6 text-[#00E676]" />
                    </div>
                    <div>
                        <h3 className="text-xl font-bold text-white tracking-tight">Earnings Calculator</h3>
                        <p className="text-sm text-white/40 font-medium">Estimate your potential income</p>
                    </div>
                </div>

                {/* Custom Plan Selector Dropdown */}
                <div className="relative min-w-[200px]">
                    <button
                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                        className="w-full flex items-center justify-between gap-3 px-4 py-3 rounded-xl bg-white/[0.03] border border-white/[0.08] hover:bg-white/[0.05] hover:border-white/[0.12] transition-all text-sm font-medium text-white group/btn"
                    >
                        <span className="flex items-center gap-2">
                            <span className="text-white/40">Plan:</span>
                            {loading ? 'Loading...' : selectedPlan?.name}
                        </span>
                        <ChevronDown className={`w-4 h-4 text-white/40 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
                    </button>

                    <AnimatePresence>
                        {isDropdownOpen && (
                            <>
                                <div className="fixed inset-0 z-40" onClick={() => setIsDropdownOpen(false)} />
                                <motion.div
                                    initial={{ opacity: 0, y: 8, scale: 0.95 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    exit={{ opacity: 0, y: 8, scale: 0.95 }}
                                    className="absolute top-full right-0 mt-2 w-full min-w-[240px] bg-[#111] border border-white/[0.1] rounded-xl shadow-2xl overflow-hidden z-50 py-1"
                                >
                                    {plans.map(plan => (
                                        <button
                                            key={plan.id}
                                            onClick={() => { setSelectedPlan(plan); setIsDropdownOpen(false) }}
                                            className="w-full flex items-center justify-between px-4 py-3 hover:bg-white/[0.04] transition-colors text-left"
                                        >
                                            <div>
                                                <div className="text-sm font-medium text-white">{plan.name}</div>
                                                <div className="text-xs text-white/40">${plan.price}/{plan.interval}</div>
                                            </div>
                                            {selectedPlan?.id === plan.id && <Check className="w-4 h-4 text-[#00E676]" />}
                                        </button>
                                    ))}
                                </motion.div>
                            </>
                        )}
                    </AnimatePresence>
                </div>
            </div>

            <div className="space-y-10">
                {/* Sliders Section */}
                <div>
                    <div className="flex justify-between items-end mb-6">
                        <label className="text-sm font-medium text-white/60 flex items-center gap-2">
                            <Users className="w-4 h-4 text-[#00E676]" /> Active Referrals
                        </label>
                        <span className="text-3xl font-black text-white tabular-nums tracking-tight">
                            {referrals}
                        </span>
                    </div>

                    <div className="relative h-6 flex items-center">
                        <div className="absolute w-full h-2 bg-white/[0.05] rounded-full overflow-hidden">
                            <div className="h-full bg-gradient-to-r from-[#00E676]/40 to-[#00E676]" style={{ width: `${(referrals / 500) * 100}%` }} />
                        </div>
                        <input
                            type="range"
                            min="1"
                            max="500"
                            step="1"
                            value={referrals}
                            onChange={(e) => setReferrals(parseInt(e.target.value))}
                            className="absolute w-full h-6 opacity-0 cursor-pointer z-10"
                        />
                        <div
                            className="absolute h-6 w-6 bg-white border-4 border-[#00E676] rounded-full shadow-lg pointer-events-none transition-all duration-75"
                            style={{ left: `calc(${(referrals / 500) * 100}% - 12px)` }}
                        />
                    </div>
                    <div className="flex justify-between mt-3 text-[11px] text-white/20 font-medium uppercase tracking-wider">
                        <span>1 Referral</span>
                        <span>250 Referrals</span>
                        <span>500+ Referrals</span>
                    </div>
                </div>

                {/* Results Section */}
                <div className="grid md:grid-cols-2 gap-5">
                    <div className="group/res p-6 rounded-2xl bg-white/[0.02] border border-white/[0.06] hover:bg-white/[0.04] transition-colors relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-br from-white/[0.05] to-transparent opacity-0 group-hover/res:opacity-100 transition-opacity" />
                        <p className="text-xs font-semibold uppercase tracking-wider text-white/40 mb-2">Monthly Income</p>
                        <div className="text-4xl font-black text-white tabular-nums tracking-tighter">
                            {loading ? (
                                <span className="animate-pulse opacity-50">...</span>
                            ) : (
                                <>
                                    <span className="text-lg align-top opacity-40 mr-1">$</span>
                                    {monthlyEarnings.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                                </>
                            )}
                        </div>
                        <div className="mt-3 text-[11px] text-[#00E676] font-medium flex items-center gap-1.5 bg-[#00E676]/10 w-fit px-2 py-1 rounded-lg">
                            <TrendingUp className="w-3 h-3" />
                            {commissionRate}% Commission on {selectedPlan?.name}
                        </div>
                    </div>

                    <div className="group/res p-6 rounded-2xl bg-gradient-to-br from-[#00E676]/10 to-[#00E676]/5 border border-[#00E676]/20 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-[#00E676]/20 rounded-full blur-[40px] -translate-y-1/2 translate-x-1/2" />
                        <p className="text-xs font-semibold uppercase tracking-wider text-[#00E676]/80 mb-2">Yearly Potential</p>
                        <div className="text-4xl font-black text-[#00E676] tabular-nums tracking-tighter">
                            {loading ? (
                                <span className="animate-pulse opacity-50">...</span>
                            ) : (
                                <>
                                    <span className="text-lg align-top opacity-60 mr-1">$</span>
                                    {yearlyEarnings.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                                </>
                            )}
                        </div>
                        <div className="mt-3 text-[11px] text-[#00E676]/60 font-medium">
                            Compounding recurring revenue
                        </div>
                    </div>
                </div>

                <div className="text-[11px] text-white/30 text-center font-medium">
                    * Estimates based on {commissionRate}% commission rate and the active "{selectedPlan?.name}" listing price.
                </div>
            </div>
        </motion.div>
    )
}
