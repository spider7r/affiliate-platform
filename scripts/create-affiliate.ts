
import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'
import path from 'path'

// Load env vars from .env.local
dotenv.config({ path: path.resolve(__dirname, '../.env.local') })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY
const email = 'partner@example.com'
const password = 'partnerpassword123'
const fullName = 'Test Partner'

if (!supabaseUrl || !serviceRoleKey) {
    console.error('Missing Supabase credentials in .env.local')
    process.exit(1)
}

const supabase = createClient(supabaseUrl, serviceRoleKey, {
    auth: {
        autoRefreshToken: false,
        persistSession: false
    }
})

async function createAffiliate() {
    console.log(`Checking for affiliate user: ${email}`)

    // 1. Create Auth User
    const { data: { users }, error: listError } = await supabase.auth.admin.listUsers()
    if (listError) { console.error(listError); return }

    let user = users.find(u => u.email === email)

    if (user) {
        console.log('Affiliate auth user already exists. Resetting password...')
        await supabase.auth.admin.updateUserById(user.id, { password: password, email_confirm: true })
    } else {
        console.log('Creating new auth user...')
        const { data, error } = await supabase.auth.admin.createUser({
            email,
            password,
            email_confirm: true,
            user_metadata: { full_name: fullName }
        })
        if (error) { console.error(error); return }
        user = data.user
    }

    if (!user) return

    // 2. Create Affiliate Profile
    const { data: affiliate, error: fetchError } = await supabase
        .from('affiliates')
        .select('*')
        .eq('user_id', user.id)
        .single()

    if (affiliate) {
        console.log('Affiliate profile already exists.')
    } else {
        console.log('Creating affiliate profile...')
        const code = 'TEST' + Math.random().toString(36).substring(2, 6).toUpperCase()
        const { error: insertError } = await supabase.from('affiliates').insert({
            user_id: user.id,
            full_name: fullName,
            email: email,
            code: code,
            status: 'active',
            commission_rate: 20
        })
        if (insertError) console.error('Error inserting affiliate:', insertError)
        else console.log(`Affiliate profile created with code: ${code}`)
    }

    console.log('-----------------------------------')
    console.log('Affiliate Login Ready:')
    console.log(`Email: ${email}`)
    console.log(`Password: ${password}`)
    console.log('-----------------------------------')
}

createAffiliate()
