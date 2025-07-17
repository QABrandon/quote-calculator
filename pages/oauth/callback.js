import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { TokenManager, OAuthState } from '@/utils/auth'

export default function OAuthCallback() {
  const router = useRouter()
  const [status, setStatus] = useState('processing')
  const [message, setMessage] = useState('Processing OAuth callback...')

  useEffect(() => {
    const handleOAuthCallback = async () => {
      try {
        const { code, state, error } = router.query

        if (error) {
          console.error('OAuth error:', error)
          setStatus('error')
          setMessage(`OAuth error: ${error}`)
          return
        }

        if (!code) {
          setStatus('error')
          setMessage('No authorization code received')
          return
        }

        // Validate state parameter
        if (state && !OAuthState.validateState(state)) {
          setStatus('error')
          setMessage('Invalid state parameter')
          return
        }

        // Exchange code for token
        const response = await fetch('/api/auth', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ code, state }),
        })

        if (!response.ok) {
          const errorData = await response.json()
          throw new Error(errorData.error || 'Token exchange failed')
        }

        const tokenData = await response.json()
        
        // Store tokens
        TokenManager.storeTokens(
          tokenData.access_token,
          tokenData.refresh_token,
          tokenData.user
        )

        setStatus('success')
        setMessage('Authentication successful! Redirecting...')

        // Redirect to main app
        setTimeout(() => {
          router.push('/estimator')
        }, 2000)

      } catch (error) {
        console.error('OAuth callback error:', error)
        setStatus('error')
        setMessage(`Authentication failed: ${error.message}`)
      }
    }

    if (router.isReady) {
      handleOAuthCallback()
    }
  }, [router.isReady, router.query])

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="card max-w-md mx-auto text-center">
        <div className="mb-6">
          {status === 'processing' && (
            <div className="animate-spin w-8 h-8 border-4 border-webflow-blue border-t-transparent rounded-full mx-auto"></div>
          )}
          {status === 'success' && (
            <div className="w-8 h-8 bg-green-500 rounded-full mx-auto flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
          )}
          {status === 'error' && (
            <div className="w-8 h-8 bg-red-500 rounded-full mx-auto flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
          )}
        </div>
        
        <h1 className="text-xl font-semibold text-gray-900 mb-2">
          {status === 'processing' && 'Authenticating...'}
          {status === 'success' && 'Success!'}
          {status === 'error' && 'Authentication Failed'}
        </h1>
        
        <p className="text-gray-600 mb-6">
          {message}
        </p>
        
        {status === 'error' && (
          <div className="space-y-3">
            <button
              onClick={() => router.push('/')}
              className="btn-primary w-full"
            >
              Return to Home
            </button>
            <button
              onClick={() => window.location.reload()}
              className="btn-secondary w-full"
            >
              Try Again
            </button>
          </div>
        )}
      </div>
    </div>
  )
} 