
import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'
import path from 'path'

// Load env vars from .env.local
dotenv.config({ path: path.resolve(__dirname, '../.env.local') })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY
const adminEmail = process.env.ADMIN_EMAIL || 'admin@thetradal.com'
const adminPassword = 'adminpassword123'

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

async function createAdmin() {
    console.log(`Checking for admin user: ${adminEmail}`)

    // Check if user exists (by trying to sign in - poor man's check, or list users if possible)
    // Admin listUsers is better
    const { data: { users }, error: listError } = await supabase.auth.admin.listUsers()

    if (listError) {
        console.error('Error listing users:', listError)
        return
    }

    const existingAdmin = users.find(u => u.email === adminEmail)

    if (existingAdmin) {
        console.log('Admin user already exists.')
        // Optional: Reset password if you want to be sure
        const { error: updateError } = await supabase.auth.admin.updateUserById(
            existingAdmin.id,
            { password: adminPassword, email_confirm: true }
        )
        if (updateError) {
            console.error('Error updating admin password:', updateError)
        } else {
            console.log(`Admin password reset to: ${adminPassword}`)
        }
    } else {
        console.log('Creating new admin user...')
        const { data, error } = await supabase.auth.admin.createUser({
            email: adminEmail,
            password: adminPassword,
            email_confirm: true,
            user_metadata: { full_name: 'Tradal Admin' }
        })

        if (error) {
            console.error('Error creating admin:', error)
        } else {
            console.log('Admin user created successfully!')
            console.log(`Email: ${adminEmail}`)
            console.log(`Password: ${adminPassword}`)
        }
    }
}

createAdmin()
