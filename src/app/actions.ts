'use server'

import { createClient, createAdminClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function registerAffiliate(formData: FormData) {
    try {
        console.log('--- registerAffiliate ACTION STARTED ---') // Debug log
        const supabase = await createClient()
        const email = formData.get('email') as string
        const password = formData.get('password') as string
        const fullName = formData.get('fullName') as string

        console.log('Registration attempt for:', email)

        // Validate
        if (!email || !password || !fullName) {
            console.log('Validation failed: missing fields')
            return { error: 'All fields are required' }
        }
        if (password.length < 6) {
            return { error: 'Password must be at least 6 characters' }
        }

        // Use regular SignUp to trigger Supabase Auth email confirmation
        console.log('Calling supabase.auth.signUp...')
        const { data: authData, error: authError } = await supabase.auth.signUp({
            email,
            password,
            options: {
                data: { full_name: fullName },
                emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback?next=/login`
            }
        })

        if (authError) {
            console.error('Supabase Auth SignUp Error:', authError)
            return { error: authError.message }
        }

        console.log('Auth successful. User ID:', authData.user?.id)

        // If signup successful (even if unconfirmed), create affiliate profile
        if (authData.user) {
            // Generate a unique referral code
            const code = fullName.split(' ')[0].toUpperCase().slice(0, 6) + Math.random().toString(36).substring(2, 6).toUpperCase()

            const adminClient = createAdminClient()
            console.log('Admin client created. Checking existing profile...')

            // Check if profile exists by User ID OR Email to prevent duplicates
            const { data: existingProfile } = await adminClient
                .from('affiliates')
                .select('id, user_id, email')
                .or(`user_id.eq.${authData.user.id},email.eq.${email}`)
                .maybeSingle()

            if (existingProfile) {
                console.log('Profile exists:', existingProfile.id)

                // If the existing profile belongs to THIS user, it's a double-submit or re-login.
                // Treat it as success (idempotent).
                if (existingProfile.user_id === authData.user.id) {
                    console.log('Profile matches current user. Returning success.')
                    return { success: true, checkEmail: true, message: 'Please check your email to confirm your account.' }
                }

                // If profile exists with this email but different user_id, it's likely an orphaned profile (previous auth user deleted).
                // We should link it to the new user.
                console.log(`Orphaned profile found (Old User ID: ${existingProfile.user_id}). Linking to New User ID: ${authData.user.id}`)

                const { error: updateError } = await adminClient
                    .from('affiliates')
                    .update({
                        user_id: authData.user.id,
                        full_name: fullName
                    })
                    .eq('id', existingProfile.id)

                if (updateError) {
                    console.error('Error linking orphaned profile:', updateError)
                    return { error: 'Failed to link account. Please contact support.' }
                }
                // fall through to success return
            } else {
                console.log('Creating new affiliate profile...')
                const { error: insertError } = await adminClient.from('affiliates').insert({
                    user_id: authData.user.id,
                    full_name: fullName,
                    email: email,
                    code: code,
                    status: 'pending',
                    commission_rate: 20
                })

                if (insertError) {
                    console.error('Affiliate insert error FULL OBJECT:', JSON.stringify(insertError, null, 2))
                    return { error: `Failed to create affiliate profile: ${insertError.message} (Code: ${insertError.code})` }
                }
                console.log('Affiliate profile created successfully.')
            }

            // Return success but indicate email verification is needed
            return { success: true, checkEmail: true, message: 'Please check your email to confirm your account.' }
        }

        return { error: 'Registration failed. User object missing from Auth response.' }
    } catch (err: any) {
        console.error('CRITICAL ERROR in registerAffiliate:', err)
        // If it's a fetch error, it might be connectivity or Supabase down
        if (err.message?.includes('fetch') || err.cause?.code === 'UND_ERR_CONNECT_TIMEOUT') {
            return { error: 'Network Error: Could not connect to authentication server. Please check your internet or try again later.' }
        }
        return { error: `System Error: ${err.message || 'Unknown error'}` }
    }
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

    revalidatePath('/dashboard')
    redirect('/dashboard')
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

export async function updatePayoutMethod(formData: FormData) {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return { error: 'Not authenticated' }

    const adminClient = createAdminClient()

    // Get method ID
    const methodId = formData.get('method_id') as string
    if (!methodId) return { error: 'Method ID is required' }

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

    // Validate
    if (methodType === 'bank_transfer' && !details.account_number) return { error: 'Account number is required' }
    if (methodType === 'paypal' && !details.email) return { error: 'PayPal email is required' }
    if (methodType === 'crypto' && !details.wallet_address) return { error: 'Wallet address is required' }

    // Update
    const { error } = await adminClient
        .from('payout_methods')
        .update({
            details: details,
            updated_at: new Date().toISOString()
        })
        .eq('id', methodId)

    if (error) return { error: error.message }

    revalidatePath('/')
    return { success: true }
}
