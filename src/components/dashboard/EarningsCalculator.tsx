'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Calculator, TrendingUp, Users } from 'lucide-react'
import { getLivePricing } from '@/app/actions/pricing'

interface EarningsCalculatorProps {
    commissionRate: number
}

export default function EarningsCalculator({ commissionRate }: EarningsCalculatorProps) {
    const [referrals, setReferrals] = useState(10)
    const [planPrice, setPlanPrice] = useState(49)
    const [currency, setCurrency] = useState('USD')
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function fetchPrice() {
            try {
                const data = await getLivePricing()
                setPlanPrice(data.price)
                setCurrency(data.currency)
            } catch (error) {
                console.error('Failed to fetch price:', error)
            } finally {
                setLoading(false)
            }
        }
        fetchPrice()
    }, [])

    const monthlyEarnings = (referrals * planPrice * (commissionRate / 100))
    const yearlyEarnings = monthlyEarnings * 12

    return (
        <div className="p-6 rounded-3xl border border-white/[0.06] bg-[#0A0A0A]/40 backdrop-blur-xl relative overflow-hidden group">
            {/* Background Gradients */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#00E676]/5 rounded-full blur-3xl -z-10 transition-opacity opacity-50 group-hover:opacity-70" />

            <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#00E676]/20 to-emerald-500/10 flex items-center justify-center border border-[#00E676]/20">
                    <Calculator className="w-5 h-5 text-[#00E676]" />
                </div>
                <div>
                    <h3 className="text-lg font-semibold text-white">Earnings Calculator</h3>
                    <p className="text-xs text-white/40">Estimate your potential income</p>
                </div>
            </div>

            <div className="space-y-8">
                {/* Sliders Section */}
                <div>
                    <div className="flex justify-between items-center mb-4">
                        <label className="text-sm text-white/60 flex items-center gap-2">
                            <Users className="w-4 h-4" /> Active Referrals
                        </label>
                        <span className="text-xl font-bold text-white tabular-nums bg-white/[0.03] px-3 py-1 rounded-lg border border-white/[0.05]">
                            {referrals}
                        </span>
                    </div>

                    <input
                        type="range"
                        min="1"
                        max="500"
                        step="1"
                        value={referrals}
                        onChange={(e) => setReferrals(parseInt(e.target.value))}
                        className="w-full h-2 bg-white/[0.1] rounded-lg appearance-none cursor-pointer accent-[#00E676] hover:accent-[#33ff96] transition-all"
                    />
                    <div className="flex justify-between mt-2 text-[10px] text-white/20 font-medium">
                        <span>1</span>
                        <span>100</span>
                        <span>250</span>
                        <span>500+</span>
                    </div>
                </div>

                {/* Results Section */}
                <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.06] hover:bg-white/[0.04] transition-colors">
                        <p className="text-xs text-white/40 mb-1">Monthly Earning</p>
                        <div className="text-2xl font-bold text-white tabular-nums tracking-tight">
                            {loading ? (
                                <span className="animate-pulse opacity-50">...</span>
                            ) : (
                                <>
                                    <span className="text-sm align-top opacity-50 mr-0.5">$</span>
                                    {monthlyEarnings.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                                </>
                            )}
                        </div>
                        <div className="mt-2 text-[10px] text-[#00E676] flex items-center gap-1">
                            <TrendingUp className="w-3 h-3" />
                            Based on {currency} {planPrice}/mo
                        </div>
                    </div>

                    <div className="p-4 rounded-2xl bg-gradient-to-br from-[#00E676]/10 to-transparent border border-[#00E676]/20">
                        <p className="text-xs text-[#00E676]/80 mb-1">Yearly Potential</p>
                        <div className="text-2xl font-bold text-[#00E676] tabular-nums tracking-tight">
                            {loading ? (
                                <span className="animate-pulse opacity-50">...</span>
                            ) : (
                                <>
                                    <span className="text-sm align-top opacity-50 mr-0.5">$</span>
                                    {yearlyEarnings.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                                </>
                            )}
                        </div>
                        <div className="mt-2 text-[10px] text-[#00E676]/60">
                            Create your legacy
                        </div>
                    </div>
                </div>

                <div className="text-[10px] text-white/20 text-center">
                    * Calculation based on {commissionRate}% commission rate and live plan pricing.
                </div>
            </div>
        </div>
    )
}
