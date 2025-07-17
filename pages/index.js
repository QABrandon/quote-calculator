import Link from 'next/link'
import { Calculator, Settings, ExternalLink } from 'lucide-react'

export default function HomePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <header className="text-center mb-12">
        <div className="flex items-center justify-center mb-6">
          <img 
            src="/icon.svg" 
            alt="Brandon Mosco Logo" 
            className="h-16 w-auto mr-4"
          />
        </div>
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Quote Calculator
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          An interactive quote estimator that helps users calculate project costs 
          directly in Webflow based on selected services.
        </p>
        <div className="mt-6 text-sm text-gray-500">
          Version 1.0.0 by Brandon Mosco
        </div>
      </header>

      <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        {/* Estimate a Quote Card */}
        <div className="card hover:shadow-lg transition-shadow duration-300">
          <div className="flex items-start space-x-4">
            <div className="bg-webflow-blue p-3 rounded-lg">
              <Calculator className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                Estimate a Quote
              </h2>
              <p className="text-gray-600 mb-4">
                Calculate project costs based on selected services and requirements.
              </p>
              <Link 
                href="/estimator"
                className="btn-primary inline-flex items-center space-x-2"
              >
                <span>Start Estimation</span>
                <ExternalLink className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>

        {/* Settings Card */}
        <div className="card hover:shadow-lg transition-shadow duration-300">
          <div className="flex items-start space-x-4">
            <div className="bg-gray-600 p-3 rounded-lg">
              <Settings className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                Quote Calculator Settings
              </h2>
              <p className="text-gray-600 mb-4">
                Configure pricing, services, and calculator parameters.
              </p>
              <Link 
                href="/settings"
                className="btn-secondary inline-flex items-center space-x-2"
              >
                <span>Open Settings</span>
                <ExternalLink className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-12 text-center">
        <div className="card max-w-2xl mx-auto">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Webflow Developer Platform Integration
          </h3>
          <p className="text-gray-600 text-sm">
            This app integrates with Webflow through OAuth authentication and provides 
            quote calculation functionality directly within your Webflow projects.
          </p>
        </div>
      </div>
    </div>
  )
} 