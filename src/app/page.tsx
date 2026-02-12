import { createClient, createAdminClient } from '@/utils/supabase/server'
import { Dashboard } from '@/components/Dashboard'
import { LoginForm } from '@/components/LoginForm'

export default async function Home() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  // Not logged in → show login form
  if (!user) {
    return <LoginForm />
  }

  // Logged in → fetch real affiliate data
  const adminClient = createAdminClient()

  // 1. Get affiliate profile
  const { data: affiliate } = await adminClient
    .from('affiliates')
    .select('*')
    .eq('user_id', user.id)
    .single()

  if (!affiliate) {
    // User exists in auth but no affiliate row yet (edge case)
    return <LoginForm />
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
