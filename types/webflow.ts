export interface WebflowAppConfig {
  id: string
  name: string
  description: string
  version: string
  icon: string
  homepage: string
  auth: WebflowAuth
  ui: WebflowUI
  api: WebflowAPI
  hooks: WebflowHooks
}

export interface WebflowAuth {
  type: 'oauth2'
  client_id: string
  client_secret: string
  authorization_url: string
  token_url: string
  scopes: string[]
  redirect_uris: string[]
}

export interface WebflowUI {
  locations: {
    siteSettings?: UILocation
    projectDashboard?: UILocation
  }
}

export interface UILocation {
  label: string
  url: string
}

export interface WebflowAPI {
  base_url: string
}

export interface WebflowHooks {
  formSubmission?: {
    url: string
  }
}

export interface WebflowTokenResponse {
  access_token: string
  token_type: string
  scope: string
  user: WebflowUser
}

export interface WebflowUser {
  id: string
  email: string
  firstName: string
  lastName: string
}

export interface WebflowSite {
  id: string
  name: string
  shortName: string
  slug: string
  status: string
  previewUrl: string
  timezone: string
  database: string
}

export interface QuoteItem {
  id: string
  name: string
  description: string
  basePrice: number
  category: string
  estimatedHours?: number
  complexity?: 'low' | 'medium' | 'high'
}

export interface QuoteCalculation {
  items: SelectedQuoteItem[]
  subtotal: number
  tax?: number
  discount?: number
  total: number
  currency: string
  estimatedDelivery?: string
}

export interface SelectedQuoteItem extends QuoteItem {
  quantity: number
  customPrice?: number
  notes?: string
} 