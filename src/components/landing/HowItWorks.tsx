'use client'

import { motion } from 'framer-motion'
import { UserPlus, Share2, DollarSign } from 'lucide-react'
import EarningsCalculator from '../dashboard/EarningsCalculator'

const steps = [
    {
        icon: UserPlus,
        title: "Join the Program",
        desc: "Sign up in seconds. Instant approval for most applications. Get your unique tracking link immediately."
    },
    {
        icon: Share2,
        title: "Promote Tradal",
        desc: "Share your link with your community, audience, or network. Use our provided banners and marketing assets."
    },
    {
        icon: DollarSign,
        title: "Earn Recurring Revenue",
        desc: "Get paid 20% commission every month for every active user you refer. Watch your passive income grow."
    }
]

export function HowItWorks() {
    return (
        <section className="py-24 bg-[#050505] relative">
            <div className="max-w-7xl mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold mb-6">How It Works</h2>
                    <p className="text-white/40 max-w-2xl mx-auto">Three simple steps to start monetizing your influence.</p>
                </div>

                <div className="grid md:grid-cols-3 gap-12 relative">
                    {/* Connecting Line (Desktop) */}
                    <div className="hidden md:block absolute top-12 left-[16%] right-[16%] h-[2px] bg-gradient-to-r from-transparent via-[#00E676]/20 to-transparent z-0" />

                    {steps.map((step, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.2 }}
                            className="relative z-10 text-center"
                        >
                            <div className="w-24 h-24 bg-[#0A0A0A] border border-[#00E676]/20 rounded-full flex items-center justify-center mx-auto mb-8 shadow-[0_0_30px_-10px_rgba(0,230,118,0.3)]">
                                <step.icon className="w-10 h-10 text-[#00E676]" />
                            </div>
                            <h3 className="text-xl font-bold mb-4">{step.title}</h3>
                            <p className="text-white/40 leading-relaxed">{step.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
            <div className="mt-20 max-w-4xl mx-auto">
                <EarningsCalculator />
            </div>
        </div>
        </section >
    )
}
