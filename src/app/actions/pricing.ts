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
    // Forcing static pricing as per user request to ensure Calculator is always correct
    // regardless of DB state.
    return [
        { id: '1', name: 'STARTER', price: 19.00, currency: 'USD', interval: 'month' },
        { id: '2', name: 'GROWTH', price: 29.00, currency: 'USD', interval: 'month' },
        { id: '3', name: 'ENTERPRISE', price: 59.00, currency: 'USD', interval: 'month' }
    ]

    /* DB Fetch temporarily disabled to enforce specific calculator prices
    const { data: plans, error } = await supabase
        .from('plans')
        .select('id, name, price, currency, interval')
        .eq('is_active', true)
        .order('price', { ascending: true })
    
    // ... mapped return ...
    */

}
