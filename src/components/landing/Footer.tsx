'use client'

import { Twitter, Instagram, Linkedin, ArrowUp } from 'lucide-react'
import Link from 'next/link'

export function Footer() {
    return (
        <footer className="bg-[#050505] border-t border-white/[0.06] pt-16 pb-8">
            <div className="max-w-7xl mx-auto px-6">
                <div className="grid md:grid-cols-4 gap-12 mb-12">
                    <div className="col-span-1 md:col-span-2">
                        <div className="flex items-center gap-2 mb-4">
                            <span className="font-bold text-xl tracking-tight text-white">Tradal <span className="text-[#00E676]">Partners</span></span>
                        </div>
                        <p className="text-white/40 text-sm max-w-sm leading-relaxed mb-6">
                            The official affiliate program for the world's most advanced trading journal.
                            Start earning recurring commissions today.
                        </p>
                        <div className="flex items-center gap-4">
                            <Link href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white/50 hover:bg-[#00E676]/10 hover:text-[#00E676] transition-all">
                                <Twitter className="w-4 h-4" />
                            </Link>
                            <Link href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white/50 hover:bg-[#00E676]/10 hover:text-[#00E676] transition-all">
                                <Instagram className="w-4 h-4" />
                            </Link>
                            <Link href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white/50 hover:bg-[#00E676]/10 hover:text-[#00E676] transition-all">
                                <Linkedin className="w-4 h-4" />
                            </Link>
                        </div>
                    </div>

                    <div>
                        <h4 className="font-bold mb-4">Platform</h4>
                        <ul className="space-y-3 text-sm text-white/40">
                            <li><Link href="#features" className="hover:text-[#00E676] transition-colors">Benefits</Link></li>
                            <li><Link href="#" className="hover:text-[#00E676] transition-colors">Commission Structure</Link></li>
                            <li><Link href="#" className="hover:text-[#00E676] transition-colors">Resources</Link></li>
                            <li><Link href="https://thetradal.com" target="_blank" className="hover:text-[#00E676] transition-colors">Main Site</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-bold mb-4">Legal</h4>
                        <ul className="space-y-3 text-sm text-white/40">
                            <li><Link href="#" className="hover:text-[#00E676] transition-colors">Terms of Service</Link></li>
                            <li><Link href="#" className="hover:text-[#00E676] transition-colors">Privacy Policy</Link></li>
                            <li><Link href="#" className="hover:text-[#00E676] transition-colors">Affiliate Agreement</Link></li>
                            <li><Link href="#" className="hover:text-[#00E676] transition-colors">Contact Support</Link></li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-white/[0.06] pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-xs text-white/20">© 2026 Tradal Inc. All rights reserved.</p>
                    <button
                        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                        className="flex items-center gap-2 text-xs text-white/30 hover:text-white transition-colors"
                    >
                        Back to Top <ArrowUp className="w-3 h-3" />
                    </button>
                </div>
            </div>
        </footer>
    )
}
