'use client'

import { motion } from 'framer-motion'
import { Plus } from 'lucide-react'
import { useState } from 'react'
import { AnimatePresence } from 'framer-motion'

const faqs = [
    {
        q: "How much can I earn?",
        a: "You earn 20% recurring commission on all payments from users you refer. There is no cap on earnings. For example, if you refer 100 users on the $49/mo plan, you earn $980/month passive income."
    },
    {
        q: "When do I get paid?",
        a: "Payouts are processed monthly. You can request a withdrawal once your balance exceeds $50. We support Bank Transfer, PayPal, and Crypto payouts."
    },
    {
        q: "How long does the cookie last?",
        a: "We use a 30-day cookie window. This means if a user clicks your link and signs up within 30 days, you get credit for the referral."
    },
    {
        q: "Do you provide marketing materials?",
        a: "Yes! Once you log in to your partner dashboard, you'll have access to banners, logos, and copy templates to help you promote effectively."
    }
]

export function FAQ() {
    const [openIndex, setOpenIndex] = useState<number | null>(null)

    return (
        <section className="py-24 bg-[#0A0A0A]">
            <div className="max-w-4xl mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold mb-6">Frequently Asked Questions</h2>
                </div>

                <div className="space-y-4">
                    {faqs.map((faq, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 }}
                            className="border border-white/5 rounded-2xl overflow-hidden bg-[#050505]"
                        >
                            <button
                                onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                                className="w-full flex items-center justify-between p-6 text-left hover:bg-white/[0.02] transition-colors"
                            >
                                <span className="font-bold text-lg">{faq.q}</span>
                                <Plus className={`w-5 h-5 text-[#00E676] transition-transform duration-300 ${openIndex === idx ? 'rotate-45' : ''}`} />
                            </button>
                            <AnimatePresence>
                                {openIndex === idx && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        className="overflow-hidden"
                                    >
                                        <div className="p-6 pt-0 text-white/40 leading-relaxed">
                                            {faq.a}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}
