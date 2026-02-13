'use client'

import { motion } from 'framer-motion'
import { Sparkles, ArrowRight } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

export function Navbar() {
    return (
        <motion.nav
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="fixed top-0 left-0 right-0 z-50 px-6 py-4"
        >
            <div className="max-w-7xl mx-auto">
                <div className="bg-[#0A0A0A]/80 backdrop-blur-xl border border-white/[0.06] rounded-2xl px-6 py-3 flex items-center justify-between shadow-2xl shadow-black/50">
                    <div className="flex items-center gap-2">
                        <div className="flex items-center gap-2">
                            <Image src="/tradalpartner.png" alt="Tradal Partners" width={140} height={40} className="relative object-contain" />
                        </div>
                    </div>

                    <div className="hidden md:flex items-center gap-8 text-[13px] font-medium text-white/50">
                        <Link href="#features" className="hover:text-white transition-colors">Benefits</Link>
                        <Link href="#how-it-works" className="hover:text-white transition-colors">How it Works</Link>
                        <Link href="#faq" className="hover:text-white transition-colors">FAQ</Link>
                    </div>

                    <div className="flex items-center gap-4">
                        <Link
                            href="https://thetradal.com"
                            className="hidden sm:block text-[13px] font-medium text-white/50 hover:text-white transition-colors"
                        >
                            Main Site
                        </Link>
                        <button
                            onClick={() => document.getElementById('auth-section')?.scrollIntoView({ behavior: 'smooth' })}
                            className="bg-[#00E676]/10 hover:bg-[#00E676]/20 text-[#00E676] border border-[#00E676]/20 px-4 py-2 rounded-lg text-[13px] font-semibold transition-all flex items-center gap-2 group"
                        >
                            Partner Login
                            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                        </button>
                    </div>
                </div>
            </div>
        </motion.nav>
    )
}
