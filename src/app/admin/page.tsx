import { createClient, createAdminClient } from '@/utils/supabase/server'
import { AdminDashboard } from '@/components/AdminDashboard'
import { redirect } from 'next/navigation'

export default async function AdminPage() {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    // Must be logged in
    if (!user) {
        redirect('/')
    }

    // Must be admin
    const adminEmail = process.env.ADMIN_EMAIL || 'admin@thetradal.com'
    if (user.email !== adminEmail) {
        redirect('/')
    }

    const adminClient = createAdminClient()

    // Fetch all data
    const [
        { data: affiliates },
        { data: allReferrals },
        { data: allPayoutMethods },
        { data: allPayouts }
    ] = await Promise.all([
        adminClient.from('affiliates').select('*').order('created_at', { ascending: false }),
        adminClient.from('referrals').select('*').order('created_at', { ascending: false }),
        adminClient.from('payout_methods').select('*'),
        adminClient.from('payouts').select('*').order('created_at', { ascending: false }),
    ])

    const safeAffiliates = affiliates || []
    const safeReferrals = allReferrals || []
    const safePayoutMethods = allPayoutMethods || []
    const safePayouts = allPayouts || []

    // Compute stats
    const totalEarnings = safeAffiliates.reduce((sum, a) => sum + (a.total_earnings || 0), 0)
    const totalPaid = safeAffiliates.reduce((sum, a) => sum + (a.total_paid || 0), 0)
    const totalPending = safeAffiliates.reduce((sum, a) => sum + (a.pending_payout || 0), 0)

    return (
        <AdminDashboard
            affiliates={safeAffiliates}
            allReferrals={safeReferrals}
            allPayoutMethods={safePayoutMethods}
            allPayouts={safePayouts}
            stats={{
                totalEarnings,
                totalPaid,
                totalPending,
                totalConversions: safeReferrals.length,
                activePartners: safeAffiliates.filter(a => a.status === 'active').length,
                totalPartners: safeAffiliates.length
            }}
        />
    )
}
