import { webflowConfig, webflowEndpoints } from '@/lib/webflow-config'

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const { code, state } = req.body

    if (!code) {
      return res.status(400).json({ error: 'Authorization code is required' })
    }

    // Exchange authorization code for access token
    const tokenResponse = await fetch(webflowEndpoints.token, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        grant_type: 'authorization_code',
        code,
        client_id: webflowConfig.auth.client_id,
        client_secret: webflowConfig.auth.client_secret,
        redirect_uri: webflowConfig.auth.redirect_uris[0],
      }),
    })

    if (!tokenResponse.ok) {
      const errorText = await tokenResponse.text()
      console.error('Token exchange failed:', errorText)
      return res.status(400).json({ error: 'Token exchange failed' })
    }

    const tokenData = await tokenResponse.json()

    // Get user information
    const userResponse = await fetch(webflowEndpoints.user, {
      headers: {
        'Authorization': `Bearer ${tokenData.access_token}`,
      },
    })

    if (userResponse.ok) {
      const userData = await userResponse.json()
      tokenData.user = userData
    }

    res.status(200).json({
      success: true,
      access_token: tokenData.access_token,
      token_type: tokenData.token_type,
      scope: tokenData.scope,
      user: tokenData.user
    })

  } catch (error) {
    console.error('OAuth error:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
} 