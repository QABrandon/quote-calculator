import { webflowEndpoints } from '@/lib/webflow-config'

// Token management utilities
export const TokenManager = {
  // Store tokens securely (in production, use secure storage)
  storeTokens: (accessToken, refreshToken, user) => {
    if (typeof window !== 'undefined') {
      // Client-side storage
      localStorage.setItem('webflow_access_token', accessToken)
      if (refreshToken) {
        localStorage.setItem('webflow_refresh_token', refreshToken)
      }
      localStorage.setItem('webflow_user', JSON.stringify(user))
    }
  },

  // Get stored access token
  getAccessToken: () => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('webflow_access_token')
    }
    return null
  },

  // Get stored user info
  getUser: () => {
    if (typeof window !== 'undefined') {
      const userStr = localStorage.getItem('webflow_user')
      return userStr ? JSON.parse(userStr) : null
    }
    return null
  },

  // Clear stored tokens
  clearTokens: () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('webflow_access_token')
      localStorage.removeItem('webflow_refresh_token')
      localStorage.removeItem('webflow_user')
    }
  },

  // Check if user is authenticated
  isAuthenticated: () => {
    return !!TokenManager.getAccessToken()
  }
}

// API helper with authentication
export const WebflowAPI = {
  // Make authenticated request to Webflow API
  request: async (endpoint, options = {}) => {
    const token = TokenManager.getAccessToken()
    
    if (!token) {
      throw new Error('No access token available')
    }

    const response = await fetch(`${webflowEndpoints.api}${endpoint}`, {
      ...options,
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
        ...options.headers
      }
    })

    if (!response.ok) {
      if (response.status === 401) {
        // Token expired, clear storage
        TokenManager.clearTokens()
        throw new Error('Authentication expired')
      }
      throw new Error(`API request failed: ${response.statusText}`)
    }

    return response.json()
  },

  // Get user sites
  getSites: async () => {
    return WebflowAPI.request('/sites')
  },

  // Get site details
  getSite: async (siteId) => {
    return WebflowAPI.request(`/sites/${siteId}`)
  },

  // Get user info
  getUser: async () => {
    return WebflowAPI.request('/user')
  }
}

// OAuth state management
export const OAuthState = {
  // Generate and store state for OAuth
  generateState: () => {
    const state = Math.random().toString(36).substring(2, 15) + 
                  Math.random().toString(36).substring(2, 15)
    
    if (typeof window !== 'undefined') {
      localStorage.setItem('oauth_state', state)
    }
    
    return state
  },

  // Validate OAuth state
  validateState: (receivedState) => {
    if (typeof window !== 'undefined') {
      const storedState = localStorage.getItem('oauth_state')
      localStorage.removeItem('oauth_state') // Clean up
      return storedState === receivedState
    }
    return false
  }
} 