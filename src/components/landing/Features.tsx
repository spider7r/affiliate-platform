'use client'

import { motion } from 'framer-motion'
import { DollarSign, BarChart3, Clock, Zap, Globe, ShieldCheck } from 'lucide-react'

const features = [
    {
        icon: DollarSign,
        title: "20% Recurring Commission",
        desc: "Earn passive income for the lifetime of every customer you refer. No caps, no limits."
    },
    {
        icon: BarChart3,
        title: "Real-Time Tracking",
        desc: "Monitor clicks, leads, and conversions instantly from your advanced partner dashboard."
    },
    {
        icon: Clock,
        title: "Monthly Payouts",
        desc: "Get paid on time, every time. We support Bank Transfer, PayPal, and Crypto payouts."
    },
    {
        icon: Zap,
        title: "High Conversion Rates",
        desc: "Our optimized funnel and premium branding ensure your traffic converts into sales."
    },
    {
        icon: Globe,
        title: "Global Reach",
        desc: "Promote to traders worldwide. Our platform supports multiple currencies and regions."
    },
    {
        icon: ShieldCheck,
        title: "Reliable Tracking",
        desc: "Advanced cookie tracking ensures you get credit even if they sign up 30 days later."
    }
]

export function Features() {
    return (
        <section id="features" className="py-24 bg-[#0A0A0A] relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#00E676]/20 to-transparent" />

            <div className="max-w-7xl mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold mb-6">Why Partner With Us?</h2>
                    <p className="text-white/40 max-w-2xl mx-auto">We provide the best tools and commissions in the industry.</p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {features.map((feature, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 }}
                            className="bg-white/[0.02] border border-white/[0.05] p-8 rounded-2xl hover:bg-white/[0.04] transition-colors group"
                        >
                            <div className="w-12 h-12 bg-[#00E676]/10 rounded-xl flex items-center justify-center text-[#00E676] mb-6 group-hover:scale-110 transition-transform">
                                <feature.icon className="w-6 h-6" />
                            </div>
                            <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                            <p className="text-white/40 text-sm leading-relaxed">{feature.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}
