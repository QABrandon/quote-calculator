import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Save, ArrowLeft, Settings as SettingsIcon, DollarSign } from 'lucide-react'
import { getAuthorizationURL } from '@/lib/webflow-config'
import { TokenManager, OAuthState } from '@/utils/auth'

export default function SettingsPage() {
  const [settings, setSettings] = useState({
    taxRate: 8.0,
    currency: 'USD',
    discountEnabled: true,
    defaultDiscount: 0,
    estimationBuffer: 1.2,
    hourlyRate: 125
  })

  const [saved, setSaved] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    // Check authentication status
    setIsAuthenticated(TokenManager.isAuthenticated())
    
    // Load saved settings
    const savedSettings = localStorage.getItem('calculator-settings')
    if (savedSettings) {
      setSettings(JSON.parse(savedSettings))
    }
  }, [])

  const handleSave = async () => {
    try {
      localStorage.setItem('calculator-settings', JSON.stringify(settings))
      setSaved(true)
      setTimeout(() => setSaved(false), 2000)
    } catch (error) {
      console.error('Failed to save settings:', error)
    }
  }

  const handleWebflowLogin = () => {
    const state = OAuthState.generateState()
    const authUrl = getAuthorizationURL(state)
    window.location.href = authUrl
  }

  const handleWebflowLogout = () => {
    TokenManager.clearTokens()
    setIsAuthenticated(false)
  }

  const updateSetting = (key, value) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }))
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center mb-8">
        <Link 
          href="/"
          className="mr-4 p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center">
            <SettingsIcon className="w-8 h-8 mr-3" />
            Quote Calculator Settings
          </h1>
          <p className="text-gray-600">
            Configure pricing, tax rates, and calculation parameters
          </p>
        </div>
      </div>

      <div className="max-w-2xl mx-auto space-y-8">
        {/* Webflow Integration */}
        <div className="card">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">
            Webflow Integration
          </h2>
          
          <div className={`border rounded-lg p-4 ${
            isAuthenticated ? 'bg-green-50 border-green-200' : 'bg-blue-50 border-blue-200'
          }`}>
            <h3 className={`font-medium mb-2 ${
              isAuthenticated ? 'text-green-900' : 'text-blue-900'
            }`}>
              {isAuthenticated ? 'Connected to Webflow' : 'Connect to Webflow'}
            </h3>
            <p className={`text-sm mb-4 ${
              isAuthenticated ? 'text-green-700' : 'text-blue-700'
            }`}>
              {isAuthenticated 
                ? 'Your app is connected to Webflow with the following scopes:'
                : 'Connect your app to Webflow to enable OAuth authentication:'
              }
            </p>
            <ul className={`text-sm mb-4 space-y-1 ${
              isAuthenticated ? 'text-green-700' : 'text-blue-700'
            }`}>
              <li>• sites:read - Access to site information</li>
              <li>• collections:read - Read collection data</li>
              <li>• forms:read - Read form submissions</li>
              <li>• forms:write - Create and update forms</li>
            </ul>
            
            <div className="flex space-x-3">
              {isAuthenticated ? (
                <button
                  onClick={handleWebflowLogout}
                  className="btn-secondary"
                >
                  Disconnect
                </button>
              ) : (
                <button
                  onClick={handleWebflowLogin}
                  className="btn-primary"
                >
                  Connect to Webflow
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Pricing Configuration */}
        <div className="card">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">
            Pricing Configuration
          </h2>

          <div className="space-y-6">
            {/* Tax Rate */}
            <div>
              <label htmlFor="taxRate" className="block text-sm font-medium text-gray-700 mb-2">
                Tax Rate (%)
              </label>
              <input
                type="number"
                id="taxRate"
                step="0.1"
                min="0"
                max="100"
                value={settings.taxRate}
                onChange={(e) => updateSetting('taxRate', parseFloat(e.target.value) || 0)}
                className="input-field"
              />
              <p className="text-sm text-gray-500 mt-1">
                Default tax rate applied to all quotes
              </p>
            </div>

            {/* Currency */}
            <div>
              <label htmlFor="currency" className="block text-sm font-medium text-gray-700 mb-2">
                Currency
              </label>
              <select
                id="currency"
                value={settings.currency}
                onChange={(e) => updateSetting('currency', e.target.value)}
                className="input-field"
              >
                <option value="USD">USD - US Dollar</option>
                <option value="EUR">EUR - Euro</option>
                <option value="GBP">GBP - British Pound</option>
                <option value="CAD">CAD - Canadian Dollar</option>
              </select>
            </div>

            {/* Hourly Rate */}
            <div>
              <label htmlFor="hourlyRate" className="block text-sm font-medium text-gray-700 mb-2">
                Default Hourly Rate ({settings.currency})
              </label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="number"
                  id="hourlyRate"
                  min="0"
                  value={settings.hourlyRate}
                  onChange={(e) => updateSetting('hourlyRate', parseFloat(e.target.value) || 0)}
                  className="input-field pl-10"
                />
              </div>
              <p className="text-sm text-gray-500 mt-1">
                Base hourly rate for time-based calculations
              </p>
            </div>

            {/* Estimation Buffer */}
            <div>
              <label htmlFor="estimationBuffer" className="block text-sm font-medium text-gray-700 mb-2">
                Estimation Buffer Multiplier
              </label>
              <input
                type="number"
                id="estimationBuffer"
                step="0.1"
                min="1"
                max="3"
                value={settings.estimationBuffer}
                onChange={(e) => updateSetting('estimationBuffer', parseFloat(e.target.value) || 1)}
                className="input-field"
              />
              <p className="text-sm text-gray-500 mt-1">
                Multiplier for time estimates (1.2 = 20% buffer)
              </p>
            </div>

            {/* Discount Settings */}
            <div className="border-t pt-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Discount Settings</h3>
              
              <div className="flex items-center mb-4">
                <input
                  type="checkbox"
                  id="discountEnabled"
                  checked={settings.discountEnabled}
                  onChange={(e) => updateSetting('discountEnabled', e.target.checked)}
                  className="h-4 w-4 text-webflow-blue focus:ring-webflow-blue border-gray-300 rounded"
                />
                <label htmlFor="discountEnabled" className="ml-2 block text-sm text-gray-900">
                  Enable discount functionality
                </label>
              </div>

              {settings.discountEnabled && (
                <div>
                  <label htmlFor="defaultDiscount" className="block text-sm font-medium text-gray-700 mb-2">
                    Default Discount (%)
                  </label>
                  <input
                    type="number"
                    id="defaultDiscount"
                    min="0"
                    max="100"
                    value={settings.defaultDiscount}
                    onChange={(e) => updateSetting('defaultDiscount', parseFloat(e.target.value) || 0)}
                    className="input-field"
                  />
                </div>
              )}
            </div>
          </div>

          <div className="mt-8 flex justify-end">
            <button
              onClick={handleSave}
              className={`btn-primary flex items-center space-x-2 ${
                saved ? 'bg-green-600 hover:bg-green-700' : ''
              }`}
            >
              <Save className="w-4 h-4" />
              <span>{saved ? 'Saved!' : 'Save Settings'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
} 