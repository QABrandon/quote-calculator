import { webflowConfig } from '@/lib/webflow-config'

export default function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    // Return sanitized environment info (never expose secrets)
    const envInfo = {
      clientId: webflowConfig.auth.client_id ? 
        `${webflowConfig.auth.client_id.substring(0, 8)}...` : 'NOT_SET',
      clientSecret: webflowConfig.auth.client_secret ? 
        `${webflowConfig.auth.client_secret.substring(0, 8)}...` : 'NOT_SET',
      redirectUri: webflowConfig.auth.redirect_uris[0],
      authUrl: webflowConfig.auth.authorization_url,
      tokenUrl: webflowConfig.auth.token_url,
      scopes: webflowConfig.auth.scopes,
      appUrl: process.env.APP_URL || 'NOT_SET',
      nodeEnv: process.env.NODE_ENV || 'development',
      hasNextAuthSecret: !!process.env.NEXTAUTH_SECRET,
      timestamp: new Date().toISOString()
    }

    // Check if required variables are set
    const isConfigured = !!(
      webflowConfig.auth.client_id && 
      webflowConfig.auth.client_secret &&
      webflowConfig.auth.client_id !== 'YOUR_CLIENT_ID_HERE' &&
      webflowConfig.auth.client_secret !== 'YOUR_CLIENT_SECRET_HERE'
    )

    res.status(200).json({
      configured: isConfigured,
      environment: envInfo,
      status: isConfigured ? 'Ready for OAuth testing' : 'Missing required credentials'
    })
  } catch (error) {
    console.error('Environment test error:', error)
    res.status(500).json({ error: 'Environment test failed', details: error.message })
  }
} 