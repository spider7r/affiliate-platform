'use server'

import { createClient } from '@/utils/supabase/server'

export async function getLivePricing() {
    const supabase = await createClient()

    // Fetch the active Pro Plan (or default to the first active one)
    const { data: plan, error } = await supabase
        .from('plans')
        .select('price, currency, name')
        .eq('is_active', true)
        .eq('name', 'Pro Plan') // Target specific plan if needed, or remove for generic
        .single()

    if (error) {
        console.error('Error fetching plan price:', error)
        // Fallback if table is missing or empty (safety net)
        return { price: 49.00, currency: 'USD', name: 'Pro Plan (Fallback)' }
    }

    return {
        price: Number(plan.price),
        currency: plan.currency,
        name: plan.name
    }
}
