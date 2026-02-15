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
            { id: '0', name: 'FREE', price: 0.00, currency: 'USD', interval: 'month' },
            { id: '1', name: 'STARTER', price: 19.00, currency: 'USD', interval: 'month' },
            { id: '2', name: 'GROWTH', price: 29.00, currency: 'USD', interval: 'month' },
            { id: '3', name: 'ENTERPRISE', price: 59.00, currency: 'USD', interval: 'month' }
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
