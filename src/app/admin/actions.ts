'use server'

import { createAdminClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'

export async function updateCommission(affiliateId: string, newRate: number) {
    const supabase = createAdminClient()
    const { error } = await supabase
        .from('affiliates')
        .update({ commission_rate: newRate })
        .eq('id', affiliateId)

    if (error) throw new Error(error.message)
    revalidatePath('/admin')
}

export async function updateAffiliateStatus(affiliateId: string, status: string) {
    const supabase = createAdminClient()
    const { error } = await supabase
        .from('affiliates')
        .update({ status })
        .eq('id', affiliateId)

    if (error) throw new Error(error.message)
    revalidatePath('/admin')
}

export async function processPayoutAction(affiliateId: string, amount: number, methodType: string) {
    const supabase = createAdminClient()

    // Create payout record
    const { error: payoutError } = await supabase
        .from('payouts')
        .insert({
            affiliate_id: affiliateId,
            amount,
            method_type: methodType,
            status: 'processing',
        })

    if (payoutError) throw new Error(payoutError.message)

    // Update affiliate pending/paid amounts
    const { data: affiliate } = await supabase
        .from('affiliates')
        .select('pending_payout, total_paid')
        .eq('id', affiliateId)
        .single()

    if (affiliate) {
        await supabase
            .from('affiliates')
            .update({
                pending_payout: Math.max(0, (affiliate.pending_payout || 0) - amount),
                total_paid: (affiliate.total_paid || 0) + amount
            })
            .eq('id', affiliateId)

        // Mark referrals as paid
        await supabase
            .from('referrals')
            .update({ status: 'paid' })
            .eq('affiliate_id', affiliateId)
            .eq('status', 'converted')
    }

    revalidatePath('/admin')
}
