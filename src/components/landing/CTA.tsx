'use client'

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import Image from 'next/image';

export function CTA() {
    const handleStartEarning = () => {
        window.location.href = '/signup';
    };

    return (
        <section className="py-32 relative overflow-hidden bg-[#050505]">
            {/* Background Effects */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#00E676]/10 via-[#050505] to-[#050505] opacity-50 pointer-events-none" />

            <div className="max-w-4xl mx-auto px-6 relative z-10 text-center">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                >
                    <h2 className="text-4xl md:text-7xl font-black text-white mb-8 tracking-tighter">
                        READY TO <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00E676] to-[#00c764]">SCALE?</span>
                    </h2>
                    <p className="text-xl text-slate-400 mb-12 max-w-2xl mx-auto font-medium">
                        Join hundreds of partners earning passive income with the world's most advanced trading journal.
                    </p>

                    <button
                        onClick={handleStartEarning}
                        className="group relative inline-flex items-center justify-center px-10 py-5 text-lg font-bold text-black transition-all duration-200 bg-[#00E676] rounded-full hover:bg-[#00c764] hover:scale-105 shadow-[0_0_40px_-10px_rgba(0,230,118,0.5)]"
                    >
                        <Sparkles className="w-5 h-5 mr-2" />
                        Start Earning Now
                        <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                    </button>

                    <p className="mt-6 text-sm text-white/30 font-medium">
                        No credit card required. Instant approval.
                    </p>
                </motion.div>
            </div>
        </section>
    );
};
