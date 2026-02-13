'use client'

import { AuthCard } from './AuthCard'

export function AuthSection() {
    return (
        <section id="auth-section" className="py-24 relative overflow-hidden flex items-center justify-center">
            {/* Background glow effects */}
            <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-[#00E676]/[0.03] rounded-full blur-[150px] -z-10" />
            <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-[#00E676]/[0.02] rounded-full blur-[120px] -z-10" />

            <div className="w-full max-w-7xl mx-auto px-6">
                <AuthCard />
            </div>
        </section>
    )
}
