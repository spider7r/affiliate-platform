'use client'

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, Sparkles, Lock, ChevronDown } from 'lucide-react';
import Image from 'next/image';

export function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    // Handle scroll for navbar background
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleStartEarning = () => {
        window.location.href = '/signup';
        setIsMobileMenuOpen(false);
    };

    return (
        <>
            <div className="fixed top-6 left-0 right-0 z-50 flex justify-center px-4">
                <nav
                    className={`relative transition-all duration-500 ease-in-out ${isScrolled
                        ? 'w-full max-w-6xl backdrop-blur-xl bg-black/80 border border-white/10 rounded-full py-2 px-8 shadow-2xl shadow-[#00E676]/5'
                        : 'w-full max-w-7xl py-4 px-4 bg-transparent border-transparent'
                        }`}
                >
                    <div className="flex justify-between items-center h-14">
                        {/* Logo */}
                        <Link
                            href="/"
                            className="flex items-center cursor-pointer group"
                        >
                            <div className="relative w-36 h-12 flex items-center justify-center -ml-2">
                                <div className="absolute inset-0 bg-[#00E676]/10 blur-xl rounded-full group-hover:bg-[#00E676]/20 transition-all duration-300 opacity-0 group-hover:opacity-100"></div>
                                <Image
                                    src="/partnerslogo.png"
                                    alt="Tradal Partners"
                                    width={140}
                                    height={40}
                                    className="object-contain relative z-10"
                                />
                            </div>
                        </Link>

                        {/* Desktop Nav */}
                        <div className={`hidden md:flex items-center ${isScrolled ? 'space-x-1' : 'space-x-6'}`}>
                            <div className={`flex items-center bg-white/5 rounded-full px-2 ${isScrolled ? 'py-1' : 'py-2 border border-white/10'}`}>

                                <Link
                                    href="#features"
                                    className="px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-300 font-sans text-gray-300 hover:text-white hover:bg-white/10"
                                >
                                    Benefits
                                </Link>

                                <Link
                                    href="/login"
                                    className="px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-300 font-sans text-gray-300 hover:text-white hover:bg-white/10"
                                >
                                    Login
                                </Link>

                                <Link
                                    href="https://thetradal.com"
                                    target="_blank"
                                    className="px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-300 font-sans text-gray-300 hover:text-white hover:bg-white/10"
                                >
                                    Main Site
                                </Link>

                                <Link
                                    href="#"
                                    className="px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-300 font-sans text-gray-300 hover:text-white hover:bg-white/10"
                                >
                                    Contact
                                </Link>
                            </div>

                            <button
                                onClick={handleStartEarning}
                                className="flex items-center px-5 py-2.5 bg-white text-black rounded-full font-bold text-sm hover:bg-[#00E676] hover:text-black transition-all duration-300 shadow-lg shadow-white/10"
                            >
                                <Sparkles className="w-4 h-4 mr-2" />
                                Start Earning
                            </button>
                        </div>

                        {/* Mobile Toggle */}
                        <button
                            className="md:hidden p-2 text-white bg-white/10 rounded-full hover:bg-[#00E676] hover:text-black transition-colors"
                            onClick={() => setIsMobileMenuOpen(true)}
                        >
                            <Menu className="w-6 h-6" />
                        </button>
                    </div>
                </nav>
            </div>

            {/* Mobile Menu Overlay */}
            <div
                className={`fixed inset-0 bg-black/95 backdrop-blur-3xl z-[60] transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] ${isMobileMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-full pointer-events-none'
                    }`}
            >
                <div className="p-6 flex flex-col h-full relative overflow-hidden">
                    {/* Background decoration */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-[#00E676]/20 rounded-full blur-[100px] pointer-events-none"></div>

                    <div className="flex justify-between items-center mb-16 relative z-10">
                        <span className="text-2xl font-bold font-sans text-white">Menu</span>
                        <button onClick={() => setIsMobileMenuOpen(false)} className="p-2 bg-white/10 rounded-full text-white hover:bg-[#00E676] hover:text-black transition-colors">
                            <X className="w-6 h-6" />
                        </button>
                    </div>

                    <div className="flex flex-col space-y-4 flex-1 relative z-10">
                        <Link href="#features" onClick={() => setIsMobileMenuOpen(false)} className="text-3xl font-sans font-medium text-left text-white/60 hover:text-white">Benefits</Link>
                        <Link href="/login" onClick={() => setIsMobileMenuOpen(false)} className="text-3xl font-sans font-medium text-left text-white/60 hover:text-white">Login</Link>
                        <Link href="https://thetradal.com" onClick={() => setIsMobileMenuOpen(false)} className="text-3xl font-sans font-bold text-left text-[#00E676] hover:text-[#00c764]">Main Site</Link>
                        <Link href="#" onClick={() => setIsMobileMenuOpen(false)} className="text-3xl font-sans font-medium text-left text-white/60 hover:text-white">Contact</Link>
                    </div>

                    <button
                        onClick={handleStartEarning}
                        className="w-full py-5 bg-gradient-to-r from-[#00E676] to-[#00c764] rounded-2xl text-black font-bold text-xl mt-auto relative overflow-hidden group"
                    >
                        <div className="absolute inset-0 bg-white/40 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                        <span className="relative z-10 flex items-center justify-center gap-2">
                            <Lock className="w-5 h-5" />
                            Partner Login / Sign Up
                        </span>
                    </button>
                </div>
            </div>
        </>
    );
};
