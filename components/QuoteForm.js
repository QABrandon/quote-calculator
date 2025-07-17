import { useState, useEffect } from 'react'
import { Plus, Minus, DollarSign, Clock, Calculator } from 'lucide-react'

const defaultQuoteItems = [
  {
    id: 'web-design',
    name: 'Web Design',
    description: 'Custom website design and visual concepts',
    basePrice: 2500,
    category: 'Design',
    estimatedHours: 40,
    complexity: 'medium'
  },
  {
    id: 'web-development',
    name: 'Web Development',
    description: 'Front-end and back-end development',
    basePrice: 5000,
    category: 'Development',
    estimatedHours: 80,
    complexity: 'high'
  },
  {
    id: 'cms-setup',
    name: 'CMS Setup',
    description: 'Content Management System configuration',
    basePrice: 1200,
    category: 'Development',
    estimatedHours: 15,
    complexity: 'low'
  },
  {
    id: 'seo-optimization',
    name: 'SEO Optimization',
    description: 'Search engine optimization and setup',
    basePrice: 800,
    category: 'Marketing',
    estimatedHours: 12,
    complexity: 'medium'
  },
  {
    id: 'e-commerce',
    name: 'E-commerce Integration',
    description: 'Online store setup and payment processing',
    basePrice: 3500,
    category: 'Development',
    estimatedHours: 50,
    complexity: 'high'
  },
  {
    id: 'maintenance',
    name: 'Monthly Maintenance',
    description: 'Ongoing website maintenance and updates',
    basePrice: 300,
    category: 'Support',
    estimatedHours: 4,
    complexity: 'low'
  }
]

export default function QuoteForm({ onQuoteGenerated }) {
  const [selectedItems, setSelectedItems] = useState([])
  const [calculation, setCalculation] = useState({
    items: [],
    subtotal: 0,
    tax: 0,
    total: 0,
    currency: 'USD'
  })

  const addItem = (item) => {
    const existingItem = selectedItems.find(selected => selected.id === item.id)
    
    if (existingItem) {
      setSelectedItems(prev => 
        prev.map(selected => 
          selected.id === item.id 
            ? { ...selected, quantity: selected.quantity + 1 }
            : selected
        )
      )
    } else {
      setSelectedItems(prev => [...prev, { ...item, quantity: 1 }])
    }
  }

  const removeItem = (itemId) => {
    setSelectedItems(prev => prev.filter(item => item.id !== itemId))
  }

  const updateQuantity = (itemId, quantity) => {
    if (quantity <= 0) {
      removeItem(itemId)
      return
    }

    setSelectedItems(prev =>
      prev.map(item =>
        item.id === itemId ? { ...item, quantity } : item
      )
    )
  }

  const generateQuote = async () => {
    try {
      const response = await fetch('/api/quotes/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          items: selectedItems,
          settings: {
            taxRate: 8.0,
            currency: 'USD'
          }
        })
      })

      if (response.ok) {
        const result = await response.json()
        if (onQuoteGenerated) {
          onQuoteGenerated(result)
        }
        alert(`Quote Generated! ID: ${result.quoteId}`)
      } else {
        alert('Failed to generate quote')
      }
    } catch (error) {
      console.error('Error generating quote:', error)
      alert('Error generating quote')
    }
  }

  useEffect(() => {
    const subtotal = selectedItems.reduce((sum, item) => {
      const price = item.customPrice || item.basePrice
      return sum + (price * item.quantity)
    }, 0)

    const tax = subtotal * 0.08 // 8% tax rate
    const total = subtotal + tax

    setCalculation({
      items: selectedItems,
      subtotal,
      tax,
      total,
      currency: 'USD'
    })
  }, [selectedItems])

  return (
    <div className="grid lg:grid-cols-3 gap-8">
      {/* Available Services */}
      <div className="lg:col-span-2">
        <h2 className="section-title">Available Services</h2>
        <div className="grid md:grid-cols-2 gap-4">
          {defaultQuoteItems.map((item) => (
            <div key={item.id} className="card hover:shadow-lg transition-shadow">
              <div className="flex justify-between items-start mb-3">
                <h3 className="font-semibold text-gray-900">{item.name}</h3>
                <span className={`px-2 py-1 text-xs rounded-full ${
                  item.complexity === 'high' ? 'bg-red-100 text-red-700' :
                  item.complexity === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                  'bg-green-100 text-green-700'
                }`}>
                  {item.complexity}
                </span>
              </div>
              <p className="text-gray-600 text-sm mb-3">{item.description}</p>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-4 text-sm text-gray-500">
                  <div className="flex items-center">
                    <DollarSign className="w-4 h-4 mr-1" />
                    ${item.basePrice.toLocaleString()}
                  </div>
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-1" />
                    {item.estimatedHours}h
                  </div>
                </div>
              </div>
              <button
                onClick={() => addItem(item)}
                className="btn-primary w-full"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add to Quote
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Quote Summary */}
      <div className="lg:col-span-1">
        <div className="card sticky top-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
            <Calculator className="w-5 h-5 mr-2" />
            Quote Summary
          </h2>

          {selectedItems.length === 0 ? (
            <p className="text-gray-500 text-center py-8">
              No items selected yet
            </p>
          ) : (
            <>
              <div className="space-y-4 mb-6">
                {selectedItems.map((item) => (
                  <div key={item.id} className="quote-item">
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900">{item.name}</h4>
                      <div className="flex items-center space-x-2 mt-1">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center hover:bg-gray-300"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-8 text-center">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center hover:bg-gray-300"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium text-gray-900">
                        ${((item.customPrice || item.basePrice) * item.quantity).toLocaleString()}
                      </div>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-red-500 hover:text-red-700 text-sm"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t pt-4 space-y-2">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal:</span>
                  <span>${calculation.subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Tax (8%):</span>
                  <span>${calculation.tax?.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-lg font-semibold text-gray-900 border-t pt-2">
                  <span>Total:</span>
                  <span>${calculation.total.toLocaleString()}</span>
                </div>
              </div>

              <button 
                onClick={generateQuote}
                className="btn-primary w-full mt-6"
              >
                Generate Quote
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  )
} 