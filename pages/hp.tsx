import type { GetServerSideProps } from 'next'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!)

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const forwarded = req.headers['x-forwarded-for']
  const ip = forwarded
    ? Array.isArray(forwarded)
      ? forwarded[0]
      : forwarded.split(',')[0]
    : req.socket.remoteAddress

  const userAgent = req.headers['user-agent'] || 'Unknown'
  const timestamp = new Date().toISOString()

  // Get full path and host
  const host = req.headers['host'] || 'unknown'
  const url = req.url || '/hp'
  const protocol = req.headers['x-forwarded-proto'] || 'https'
  const fullPath = `${protocol}://${host}${url}`

  // Insert into Supabase
  await supabase
    .from('honeypot_logs')
    .insert([{ timestamp, ip, user_agent: userAgent, path: fullPath, host }])

  res.statusCode = 404
  return { props: {} }
}

export default function Honeypot() {
  // This component should never render since we return 404
  return null
}
