import { createAdminClient } from '@/utils/supabase/server'
import { NextResponse } from 'next/server'
import { headers } from 'next/headers'

// GET /api/track?ref=CODE
// Records a click and redirects to the main app
export async function GET(request: Request) {
    const { searchParams } = new URL(request.url)
    const ref = searchParams.get('ref')

    if (!ref) {
        return NextResponse.redirect(process.env.MAIN_APP_URL || 'https://thetradal.com')
    }

    const supabase = createAdminClient()
    const headersList = await headers()

    // Find the affiliate
    const { data: affiliate } = await supabase
        .from('affiliates')
        .select('id, status')
        .eq('code', ref)
        .single()

    if (affiliate && affiliate.status === 'active') {
        // Detect device type from user agent
        const ua = headersList.get('user-agent') || ''
        let deviceType = 'desktop'
        if (/mobile|android|iphone|ipad/i.test(ua)) {
            deviceType = /ipad|tablet/i.test(ua) ? 'tablet' : 'mobile'
        }

        // Record the click
        await supabase.from('affiliate_clicks').insert({
            affiliate_id: affiliate.id,
            ip_address: headersList.get('x-forwarded-for')?.split(',')[0]?.trim() || headersList.get('x-real-ip') || 'unknown',
            user_agent: ua.substring(0, 500), // Truncate very long UAs
            referrer_url: headersList.get('referer') || null,
            landing_page: '/',
            device_type: deviceType,
            converted: false,
        })

        // Increment total clicks on the affiliate
        const { error: rpcError } = await supabase.rpc('increment_clicks', { affiliate_id_input: affiliate.id })
        if (rpcError) {
            // Fallback: direct update if RPC doesn't exist
            await supabase
                .from('affiliates')
                .update({ total_clicks: 1 })
                .eq('id', affiliate.id)
        }
    }

    // Redirect to main app with ref code preserved
    const mainAppUrl = process.env.MAIN_APP_URL || 'https://thetradal.com'
    return NextResponse.redirect(`${mainAppUrl}?ref=${ref}`)
}
