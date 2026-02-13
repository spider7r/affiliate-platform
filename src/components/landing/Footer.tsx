'use client'

import React from 'react';
import Link from 'next/link';
import { Twitter, Instagram, Linkedin, Send } from 'lucide-react';
import Image from 'next/image';

export function Footer() {
    return (
        <footer className="bg-[#020202] border-t border-white/5 pt-20 pb-10">
            <div className="max-w-[1400px] mx-auto px-6">

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 mb-20">

                    {/* Brand Column */}
                    <div className="lg:col-span-4 flex flex-col gap-6">
                        <div className="flex items-center gap-3">
                            {/* Logo Only - No Text */}
                            <div className="w-36 h-12 relative">
                                <Image src="/partnerslogo.png" alt="Tradal Logo" fill className="object-contain" />
                            </div>
                        </div>
                        <p className="text-slate-500 text-sm leading-relaxed max-w-sm font-medium">
                            The official partner program for the world's most advanced trading journal.
                            Scale your income by referring traders to the best tool in the industry.
                        </p>

                        <div className="flex gap-4">
                            {[Twitter, Instagram, Linkedin].map((Icon, i) => (
                                <a key={i} href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-slate-400 hover:bg-[#00E676] hover:text-black transition-all">
                                    <Icon className="w-4 h-4" />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Links Column 1 */}
                    <div className="lg:col-span-2">
                        <h4 className="text-white font-bold mb-6">Program</h4>
                        <ul className="space-y-4 text-sm text-slate-500 font-medium">
                            <li><Link href="#features" className="hover:text-[#00E676] transition-colors">Benefits</Link></li>
                            <li><Link href="#" className="hover:text-[#00E676] transition-colors">Commission Structure</Link></li>
                            <li><Link href="#" className="hover:text-[#00E676] transition-colors">Success Stories</Link></li>
                            <li><Link href="/login" className="hover:text-[#00E676] transition-colors">Partner Login</Link></li>
                        </ul>
                    </div>

                    {/* Links Column 2 */}
                    <div className="lg:col-span-2">
                        <h4 className="text-white font-bold mb-6">Company</h4>
                        <ul className="space-y-4 text-sm text-slate-500 font-medium">
                            <li><Link href="https://thetradal.com/about" className="hover:text-[#00E676] transition-colors">About Us</Link></li>
                            <li><Link href="#" className="hover:text-[#00E676] transition-colors">Contact Support</Link></li>
                            <li><Link href="#" className="hover:text-[#00E676] transition-colors">Media Kit</Link></li>
                        </ul>
                    </div>

                    {/* Newsletter Column */}
                    <div className="lg:col-span-4">
                        <h4 className="text-white font-bold mb-6">Stay Updated</h4>
                        <p className="text-slate-500 text-sm mb-4 font-medium">
                            Get tips on how to maximize your affiliate earnings.
                        </p>
                        <div className="flex gap-2">
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="bg-[#0A0A0A] border border-white/10 rounded-lg px-4 py-3 text-sm text-white w-full focus:outline-none focus:border-[#00E676]/50 focus:ring-1 focus:ring-[#00E676]/20 transition-all placeholder:text-slate-600"
                            />
                            <button className="bg-[#00E676] hover:bg-[#00c764] text-black px-4 rounded-lg flex items-center justify-center transition-colors">
                                <Send className="w-4 h-4" />
                            </button>
                        </div>
                    </div>

                </div>

                {/* Risk Disclaimer - Added for Compliance */}
                <div className="border-t border-white/5 pt-8 pb-8 mb-4">
                    <p className="text-[10px] text-slate-600 leading-relaxed text-justify font-sans">
                        <span className="font-bold text-slate-500">PROGRAM DISCLAIMER:</span> Tradal Partners is the affiliate program for Tradal. Participation is subject to approval. We reserve the right to modify commission rates, payment terms, and program policies at any time. Earnings examples are hypothetical and depend on your traffic quality, audience engagement, and marketing efforts. We do not guarantee specific income levels.
                        <br /><br />
                        <span className="font-bold text-slate-500">RISK DISCLOSURE:</span> Tradal is a software-as-a-service (SaaS) platform designed for trade journaling, data analysis, and historical simulation. We are not a registered broker-dealer, investment advisor, or financial analyst. All tools, content, and simulated results provided on this platform are strictly for <strong>educational and research purposes only</strong>.
                    </p>
                </div>

                <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                    <div className="text-[11px] font-mono text-slate-400">
                        © 2026 TRADAL INC. ALL RIGHTS RESERVED.
                    </div>
                    <div className="flex gap-8 text-[11px] font-mono font-bold text-slate-400 uppercase tracking-wider">
                        <Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link>
                        <Link href="#" className="hover:text-white transition-colors">Terms of Service</Link>
                        <Link href="#" className="hover:text-white transition-colors">Affiliate Agreement</Link>
                    </div>
                </div>

            </div>
        </footer>
    );
};
