'use server'

import { createClient, createAdminClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function registerAffiliate(formData: FormData) {
    const supabase = await createClient()
    const email = formData.get('email') as string
    const password = formData.get('password') as string
    const fullName = formData.get('fullName') as string

    // Validate
    if (!email || !password || !fullName) {
        return { error: 'All fields are required' }
    }
    if (password.length < 6) {
        return { error: 'Password must be at least 6 characters' }
    }

    const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
        options: {
            data: { full_name: fullName },
            emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3001'}/auth/callback`
        }
    })

    if (authError) return { error: authError.message }

    if (authData.user) {
        const adminClient = createAdminClient()
        // Generate a unique referral code
        const code = fullName.split(' ')[0].toUpperCase().slice(0, 6) + Math.random().toString(36).substring(2, 6).toUpperCase()

        const { error: insertError } = await adminClient.from('affiliates').insert({
            user_id: authData.user.id,
            full_name: fullName,
            email: email,
            code: code,
            status: 'active',
            commission_rate: 20
        })

        if (insertError) {
            console.error('Affiliate insert error:', insertError)
            return { error: 'Failed to create affiliate profile. Please contact support.' }
        }
    }

    revalidatePath('/')
    return { success: true }
}

export async function loginAffiliate(formData: FormData) {
    const supabase = await createClient()
    const email = formData.get('email') as string
    const password = formData.get('password') as string

    if (!email || !password) {
        return { error: 'Email and password are required' }
    }

    const { error } = await supabase.auth.signInWithPassword({ email, password })

    if (error) return { error: error.message }

    revalidatePath('/')
    redirect('/')
}

export async function logoutAffiliate() {
    const supabase = await createClient()
    await supabase.auth.signOut()
    revalidatePath('/')
    redirect('/')
}

export async function addPayoutMethod(formData: FormData) {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return { error: 'Not authenticated' }

    const adminClient = createAdminClient()

    // Get affiliate ID
    const { data: affiliate } = await adminClient
        .from('affiliates')
        .select('id')
        .eq('user_id', user.id)
        .single()

    if (!affiliate) return { error: 'Affiliate not found' }

    const methodType = formData.get('method_type') as string
    const details: Record<string, string> = {}

    if (methodType === 'bank_transfer') {
        details.bank_name = formData.get('bank_name') as string
        details.account_holder = formData.get('account_holder') as string
        details.account_number = formData.get('account_number') as string
        details.routing_number = formData.get('routing_number') as string
    } else if (methodType === 'paypal') {
        details.email = formData.get('paypal_email') as string
    } else if (methodType === 'crypto') {
        details.wallet_address = formData.get('wallet_address') as string
        details.network = formData.get('network') as string
    }

    // Validate that at least main detail is provided
    if (methodType === 'bank_transfer' && !details.account_number) return { error: 'Account number is required' }
    if (methodType === 'paypal' && !details.email) return { error: 'PayPal email is required' }
    if (methodType === 'crypto' && !details.wallet_address) return { error: 'Wallet address is required' }

    // Remove existing primary methods
    await adminClient
        .from('payout_methods')
        .update({ is_primary: false })
        .eq('affiliate_id', affiliate.id)

    // Add new primary method
    const { error } = await adminClient
        .from('payout_methods')
        .insert({
            affiliate_id: affiliate.id,
            method_type: methodType,
            details: details,
            is_primary: true
        })

    if (error) return { error: error.message }

    revalidatePath('/')
    return { success: true }
}

export async function removePayoutMethod(methodId: string) {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return { error: 'Not authenticated' }

    const adminClient = createAdminClient()

    // Verify ownership
    const { data: method } = await adminClient
        .from('payout_methods')
        .select('affiliate_id')
        .eq('id', methodId)
        .single()

    if (!method) return { error: 'Method not found' }

    const { data: affiliate } = await adminClient
        .from('affiliates')
        .select('id')
        .eq('user_id', user.id)
        .single()

    if (!affiliate || affiliate.id !== method.affiliate_id) {
        return { error: 'Unauthorized' }
    }

    await adminClient.from('payout_methods').delete().eq('id', methodId)

    revalidatePath('/')
    return { success: true }
}
