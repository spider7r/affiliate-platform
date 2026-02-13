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
        // Edge case: User logged in but no affiliate profile. 
        // Could redirect to a setup page, but for now redirecting to home/login might be safer or showing an error.
        // Let's redirect to login to force a clear state or contact support.
        // actually, let's just let them see an empty state or redirect to root
        redirect('/')
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
