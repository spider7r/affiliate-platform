
import { createAdminClient } from '../src/utils/supabase/server'
import dotenv from 'dotenv'
import path from 'path'

// Load env vars
dotenv.config({ path: path.resolve(__dirname, '../.env.local') })

async function checkPlans() {
    const supabase = createAdminClient()

    console.log('Checking for items in "plans" table...')
    const { data, error } = await supabase.from('plans').select('*').limit(1)

    if (error) {
        console.error('Error selecting from plans:', error.message)
    } else {
        console.log('Plans found:', data)
    }
}

checkPlans()
