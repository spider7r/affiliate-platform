'use client'

import { Navbar } from './Navbar'
import { Hero } from './Hero'
import { Features } from './Features'
import { AuthSection } from './AuthSection'
import { Footer } from './Footer'

export function LandingPage() {
    return (
        <div className="min-h-screen bg-[#050505] text-white selection:bg-[#00E676] selection:text-black font-sans">
            <Navbar />
            <Hero />
            <Features />
            <AuthSection />
            <Footer />
        </div>
    )
}
