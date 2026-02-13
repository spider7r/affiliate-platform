import { AuthCard } from '@/components/landing/AuthCard'
import { Navbar } from '@/components/landing/Navbar'
import { Footer } from '@/components/landing/Footer'

export default function SignupPage() {
    return (
        <div className="min-h-screen bg-[#050505] flex flex-col">
            <Navbar />
            <div className="flex-1 flex items-center justify-center relative overflow-hidden py-32 px-4">
                {/* Background Gradients */}
                <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#00E676]/5 via-[#050505] to-[#050505] pointer-events-none" />
                <div className="absolute top-1/4 -left-20 w-96 h-96 bg-[#00E676]/10 blur-[120px] rounded-full pointer-events-none" />
                <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-blue-500/10 blur-[120px] rounded-full pointer-events-none" />

                <AuthCard initialView="register" />
            </div>
            <Footer />
        </div>
    )
}
