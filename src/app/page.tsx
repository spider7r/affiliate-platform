import { createClient } from '@/utils/supabase/server'
import { LandingPage } from '@/components/landing/LandingPage'
import { redirect } from 'next/navigation'

export default async function Home() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  // Logged in → Redirect to Dashboard
  if (user) {
    redirect('/dashboard')
  }

  // Not logged in → Show Landing Page
  return <LandingPage />
}
