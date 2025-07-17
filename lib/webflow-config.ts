import { WebflowAppConfig } from '@/types/webflow'

export const webflowConfig: WebflowAppConfig = {
  id: "quote-calculator-app",
  name: "Quote Calculator by Brandon Mosco",
  description: "An interactive quote estimator that helps users calculate project costs directly in Webflow based on selected services.",
  version: "1.0.0",
  icon: "https://yourdomain.com/icon.svg",
  homepage: "https://yourdomain.com",
  auth: {
    type: "oauth2",
    client_id: process.env.WEBFLOW_CLIENT_ID || "YOUR_CLIENT_ID_HERE",
    client_secret: process.env.WEBFLOW_CLIENT_SECRET || "YOUR_CLIENT_SECRET_HERE",
    authorization_url: "https://webflow.com/oauth/authorize",
    token_url: "https://api.webflow.com/oauth/access_token",
    scopes: [
      "sites:read",
      "collections:read",
      "forms:read",
      "forms:write"
    ],
    redirect_uris: [
      process.env.WEBFLOW_REDIRECT_URI || "http://localhost:3000/oauth/callback"
    ]
  },
  ui: {
    locations: {
      siteSettings: {
        label: "Quote Calculator Settings",
        url: `${process.env.APP_URL || 'http://localhost:3000'}/settings`
      },
      projectDashboard: {
        label: "Estimate a Quote",
        url: `${process.env.APP_URL || 'http://localhost:3000'}/estimator`
      }
    }
  },
  api: {
    base_url: `${process.env.APP_URL || 'http://localhost:3000'}/api`
  },
  hooks: {
    formSubmission: {
      url: `${process.env.APP_URL || 'http://localhost:3000'}/api/webhook`
    }
  }
}

export const webflowEndpoints = {
  authorize: 'https://webflow.com/oauth/authorize',
  token: 'https://api.webflow.com/oauth/access_token',
  api: 'https://api.webflow.com/v2',
  sites: 'https://api.webflow.com/v2/sites',
  user: 'https://api.webflow.com/v2/user'
}

export function getAuthorizationURL(state?: string): string {
  const params = new URLSearchParams({
    response_type: 'code',
    client_id: webflowConfig.auth.client_id,
    redirect_uri: webflowConfig.auth.redirect_uris[0],
    scope: webflowConfig.auth.scopes.join(' '),
    ...(state && { state })
  })

  return `${webflowConfig.auth.authorization_url}?${params.toString()}`
} 