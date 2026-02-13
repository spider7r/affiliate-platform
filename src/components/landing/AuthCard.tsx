'use client'

import { useState } from 'react'
import { registerAffiliate, loginAffiliate } from '@/app/actions'
import { motion, AnimatePresence } from 'framer-motion'
import { Loader2, ArrowRight, CheckCircle2, Mail, Lock, User, Sparkles } from 'lucide-react'
import Image from 'next/image'

interface AuthCardProps {
    initialView?: 'login' | 'register'
}

export function AuthCard({ initialView = 'login' }: AuthCardProps) {
    const [isRegister, setIsRegister] = useState(initialView === 'register')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [success, setSuccess] = useState(false)

    async function handleSubmit(formData: FormData) {
        setLoading(true)
        setError(null)

        try {
            if (isRegister) {
                const result = await registerAffiliate(formData)
                if (result?.error) {
                    setError(result.error)
                } else if (result?.redirect) {
                    window.location.href = result.redirect
                } else {
                    setSuccess(true)
                    // Wait a moment for the success animation then redirect
                    setTimeout(() => {
                        window.location.href = '/dashboard'
                    }, 2000)
                }
            } else {
                const result = await loginAffiliate(formData)
                if (result?.error) {
                    setError(result.error)
                }
            }
        } catch (e) {
            setError('Something went wrong. Please try again.')
        }
        setLoading(false)
    }

    return (
        <div className="w-full max-w-[440px] mx-auto relative z-10">
            {/* Logo */}
            <div className="text-center mb-8">
                <Image src="/partnerslogo.png" alt="Tradal Partners" width={200} height={60} className="mx-auto object-contain" />
            </div>

            {/* Card */}
            <div className="bg-[#0A0A0A]/80 backdrop-blur-2xl rounded-2xl border border-white/[0.06] p-8 shadow-2xl shadow-black/50">
                {/* Tab Switch */}
                <div className="flex bg-black/40 p-1 rounded-xl mb-7 border border-white/[0.04]">
                    <button
                        onClick={() => { setIsRegister(false); setError(null) }}
                        className={`flex-1 py-2.5 text-[13px] font-semibold rounded-lg transition-all ${!isRegister
                            ? 'bg-[#00E676]/10 text-[#00E676] border border-[#00E676]/20 shadow-sm shadow-[#00E676]/5'
                            : 'text-white/30 hover:text-white/50 border border-transparent'
                            }`}
                    >
                        Login
                    </button>
                    <button
                        onClick={() => { setIsRegister(true); setError(null) }}
                        className={`flex-1 py-2.5 text-[13px] font-semibold rounded-lg transition-all ${isRegister
                            ? 'bg-[#00E676]/10 text-[#00E676] border border-[#00E676]/20 shadow-sm shadow-[#00E676]/5'
                            : 'text-white/30 hover:text-white/50 border border-transparent'
                            }`}
                    >
                        Register
                    </button>
                </div>

                <AnimatePresence mode="wait">
                    {success ? (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="text-center py-6 space-y-5"
                        >
                            <div className="w-16 h-16 bg-[#00E676]/10 rounded-2xl flex items-center justify-center mx-auto border border-[#00E676]/20 shadow-lg shadow-[#00E676]/10">
                                <CheckCircle2 className="w-8 h-8 text-[#00E676]" />
                            </div>
                            <div>
                                <h3 className="text-lg font-bold">Registration Successful!</h3>
                                <p className="text-[13px] text-white/30 mt-1.5 leading-relaxed">Account created successfully.<br />Logging you in...</p>
                            </div>
                            <div className="flex justify-center pt-2">
                                <Loader2 className="w-5 h-5 animate-spin text-[#00E676]" />
                            </div>
                        </motion.div>
                    ) : (
                        <motion.form
                            key={isRegister ? 'register' : 'login'}
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -8 }}
                            transition={{ duration: 0.2 }}
                            action={handleSubmit}
                            className="space-y-4"
                        >
                            {isRegister && (
                                <div>
                                    <label className="block text-[11px] font-semibold text-white/25 mb-2 uppercase tracking-wider">Full Name</label>
                                    <div className="relative">
                                        <User className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-white/15" />
                                        <input
                                            name="fullName"
                                            type="text"
                                            required
                                            className="w-full bg-black/40 border border-white/[0.06] rounded-xl pl-11 pr-4 py-3.5 text-[13px] text-white focus:outline-none focus:border-[#00E676]/30 focus:bg-black/60 transition-all placeholder:text-white/15"
                                            placeholder="John Doe"
                                        />
                                    </div>
                                </div>
                            )}
                            <div>
                                <label className="block text-[11px] font-semibold text-white/25 mb-2 uppercase tracking-wider">Email</label>
                                <div className="relative">
                                    <Mail className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-white/15" />
                                    <input
                                        name="email"
                                        type="email"
                                        required
                                        className="w-full bg-black/40 border border-white/[0.06] rounded-xl pl-11 pr-4 py-3.5 text-[13px] text-white focus:outline-none focus:border-[#00E676]/30 focus:bg-black/60 transition-all placeholder:text-white/15"
                                        placeholder="partner@example.com"
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-[11px] font-semibold text-white/25 mb-2 uppercase tracking-wider">Password</label>
                                <div className="relative">
                                    <Lock className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-white/15" />
                                    <input
                                        name="password"
                                        type="password"
                                        required
                                        minLength={6}
                                        className="w-full bg-black/40 border border-white/[0.06] rounded-xl pl-11 pr-4 py-3.5 text-[13px] text-white focus:outline-none focus:border-[#00E676]/30 focus:bg-black/60 transition-all placeholder:text-white/15"
                                        placeholder="••••••••"
                                    />
                                </div>
                            </div>

                            {error && (
                                <motion.div
                                    initial={{ opacity: 0, y: -4 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="text-red-400 text-[12px] bg-red-500/[0.06] p-3.5 rounded-xl border border-red-500/10 font-medium"
                                >
                                    {error}
                                </motion.div>
                            )}

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-[#00E676] hover:bg-[#00c764] text-black font-bold py-3.5 rounded-xl transition-all flex items-center justify-center gap-2 group shadow-lg shadow-[#00E676]/20 hover:shadow-[#00E676]/30 text-[14px] mt-2 disabled:opacity-50"
                            >
                                {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : (
                                    <>
                                        {isRegister ? 'Start Earning' : 'Access Dashboard'}
                                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                    </>
                                )}
                            </button>
                        </motion.form>
                    )}
                </AnimatePresence>
            </div>

            {/* Bottom info */}
            <div className="text-center mt-6 space-y-2">
                <p className="text-[11px] text-white/15">Earn <span className="text-[#00E676]/60 font-semibold">20% commission</span> on every referral</p>
                <div className="flex items-center justify-center gap-1.5 text-[10px] text-white/10">
                    <Sparkles className="w-3 h-3" />
                    <span>Powered by Tradal</span>
                </div>
            </div>
        </div>
    )
}
