'use client'

import { Navbar } from './Navbar'
import { Hero } from './Hero'
import { Features } from './Features'
import { HowItWorks } from './HowItWorks'
import { FAQ } from './FAQ'
import { CTA } from './CTA'
import { Footer } from './Footer'

export function LandingPage() {
    return (
        <div className="min-h-screen bg-[#050505] text-white selection:bg-[#00E676] selection:text-black font-sans">
            <Navbar />
            <Hero />
            <Features />
            <HowItWorks />
            <FAQ />
            <CTA />
            <Footer />
        </div>
    )
}
