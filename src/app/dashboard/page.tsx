import { createClient, createAdminClient } from '@/utils/supabase/server'
import { Dashboard } from '@/components/Dashboard'
import { redirect } from 'next/navigation'

export default async function DashboardPage() {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
        redirect('/login')
    }

    const adminClient = createAdminClient()

    // 1. Get affiliate profile
    const { data: affiliate } = await adminClient
        .from('affiliates')
        .select('*')
        .eq('user_id', user.id)
        .single()

    if (!affiliate) {
        // Check if admin
        const adminEmail = process.env.ADMIN_EMAIL || 'admin@thetradal.com'
        if (user.email === adminEmail) {
            redirect('/admin')
        }

        // If not admin and not affiliate, sign them out or show error
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-[#050505] text-white p-4">
                <div className="max-w-md text-center space-y-4">
                    <h1 className="text-2xl font-bold text-red-500">Access Denied</h1>
                    <p className="text-white/60">
                        No affiliate profile found for this account. Please contact support or register as a new partner.
                    </p>
                    <form action={async () => {
                        'use server'
                        const supabase = await createClient()
                        await supabase.auth.signOut()
                        redirect('/login')
                    }}>
                        <button className="bg-white/10 hover:bg-white/20 px-6 py-2 rounded-lg text-sm font-medium transition-colors">
                            Sign Out
                        </button>
                    </form>
                </div>
            </div>
        )
    }

    // 2. Get referrals
    const { data: referrals } = await adminClient
        .from('referrals')
        .select('*')
        .eq('affiliate_id', affiliate.id)
        .order('created_at', { ascending: false })

    // 3. Get click count
    const { count: clickCount } = await adminClient
        .from('affiliate_clicks')
        .select('*', { count: 'exact', head: true })
        .eq('affiliate_id', affiliate.id)

    // 4. Get chart data (last 30 days earnings)
    const thirtyDaysAgo = new Date()
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)
    const { data: chartData } = await adminClient
        .from('referrals')
        .select('created_at, earnings')
        .eq('affiliate_id', affiliate.id)
        .gte('created_at', thirtyDaysAgo.toISOString())
        .order('created_at', { ascending: true })

    // 5. Get payout methods
    const { data: payoutMethods } = await adminClient
        .from('payout_methods')
        .select('*')
        .eq('affiliate_id', affiliate.id)
        .order('is_primary', { ascending: false })

    // 6. Get payout history
    const { data: payoutHistory } = await adminClient
        .from('payouts')
        .select('*')
        .eq('affiliate_id', affiliate.id)
        .order('created_at', { ascending: false })

    return (
        <Dashboard
            affiliate={affiliate}
            referralCount={referrals?.length || 0}
            recentReferrals={referrals || []}
            clickCount={clickCount || 0}
            chartData={chartData || []}
            payoutMethods={payoutMethods || []}
            payoutHistory={payoutHistory || []}
        />
    )
}
