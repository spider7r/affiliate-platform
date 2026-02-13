'use server'

import { createClient } from '@/utils/supabase/server'

export interface Plan {
    id: string
    name: string
    price: number
    currency: string
    interval: string
}

export async function getLivePricing(): Promise<Plan[]> {
    const supabase = await createClient()

    // Fetch all active plans
    const { data: plans, error } = await supabase
        .from('plans')
        .select('id, name, price, currency, interval')
        .eq('is_active', true)
        .order('price', { ascending: true })

    if (error) {
        console.error('Error fetching plans:', error)
        // Fallback
        return [
            { id: '1', name: 'Starter', price: 29.00, currency: 'USD', interval: 'month' },
            { id: '2', name: 'Pro', price: 49.00, currency: 'USD', interval: 'month' },
            { id: '3', name: 'Premium', price: 99.00, currency: 'USD', interval: 'month' }
        ]
    }

    return plans.map(p => ({
        id: p.id,
        name: p.name,
        price: Number(p.price),
        currency: p.currency,
        interval: p.interval
    }))
}
