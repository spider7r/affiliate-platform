import { createAdminClient } from '@/utils/supabase/server'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
    // Verify the webhook secret
    const secret = request.headers.get('x-affiliate-secret')
    if (secret !== process.env.AFFILIATE_WEBHOOK_SECRET) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const supabase = createAdminClient()

    try {
        const body = await request.json()
        const { ref_code, amount, currency, product, transaction_id, user_email, user_name } = body

        // 1. Find Affiliate by referral code
        const { data: affiliate, error: affError } = await supabase
            .from('affiliates')
            .select('id, commission_rate, total_earnings, pending_payout')
            .eq('code', ref_code)
            .eq('status', 'active') // Only active affiliates earn commission
            .single()

        if (affError || !affiliate) {
            return NextResponse.json({ error: 'Affiliate not found or inactive' }, { status: 404 })
        }

        // 2. Calculate Commission
        const commission = parseFloat((amount * (affiliate.commission_rate / 100)).toFixed(2))

        // 3. Check for duplicate transaction
        if (transaction_id) {
            const { data: existing } = await supabase
                .from('referrals')
                .select('id')
                .eq('transaction_id', transaction_id)
                .single()

            if (existing) {
                return NextResponse.json({ error: 'Duplicate transaction' }, { status: 409 })
            }
        }

        // 4. Record Referral / Conversion
        const { error: refError } = await supabase
            .from('referrals')
            .insert({
                affiliate_id: affiliate.id,
                referred_email: user_email || null,
                referred_name: user_name || null,
                plan_purchased: product || null,
                amount: amount,
                earnings: commission,
                status: 'converted',
                transaction_id: transaction_id || null,
            })

        if (refError) {
            console.error('Referral insert error:', refError)
            return NextResponse.json({ error: 'Failed to record referral' }, { status: 500 })
        }

        // 5. Update Affiliate Earnings
        const { error: updateError } = await supabase
            .from('affiliates')
            .update({
                total_earnings: (affiliate.total_earnings || 0) + commission,
                pending_payout: (affiliate.pending_payout || 0) + commission
            })
            .eq('id', affiliate.id)

        if (updateError) {
            console.error('Affiliate update error:', updateError)
        }

        // 6. Mark matching click as converted (best-effort)
        if (user_email) {
            // Try to find a recent unconverted click and mark it
            const { data: recentClick } = await supabase
                .from('affiliate_clicks')
                .select('id')
                .eq('affiliate_id', affiliate.id)
                .eq('converted', false)
                .order('created_at', { ascending: false })
                .limit(1)
                .single()

            if (recentClick) {
                await supabase
                    .from('affiliate_clicks')
                    .update({ converted: true })
                    .eq('id', recentClick.id)
            }
        }

        return NextResponse.json({ success: true, commission })

    } catch (error) {
        console.error('Webhook error:', error)
        return NextResponse.json({ error: 'Internal error' }, { status: 500 })
    }
}
