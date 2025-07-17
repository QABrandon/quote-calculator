import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import QuoteForm from '@/components/QuoteForm'

export default function EstimatorPage() {
  const handleQuoteGenerated = (quoteData) => {
    console.log('Quote generated:', quoteData)
    // Here you could redirect to a quote details page or show a success message
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
          <h1 className="text-3xl font-bold text-gray-900">
            Quote Estimator
          </h1>
          <p className="text-gray-600">
            Select services to calculate your project cost
          </p>
        </div>
      </div>

      <QuoteForm onQuoteGenerated={handleQuoteGenerated} />
    </div>
  )
} 