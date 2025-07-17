export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const { items, settings } = req.body

    if (!items || items.length === 0) {
      return res.status(400).json({ error: 'No items provided for quote calculation' })
    }

    // Calculate subtotal
    const subtotal = items.reduce((sum, item) => {
      const price = item.customPrice || item.basePrice
      return sum + (price * item.quantity)
    }, 0)

    // Apply settings or defaults
    const taxRate = settings?.taxRate || 8.0
    const discountRate = settings?.discountRate || 0
    const currency = settings?.currency || 'USD'

    // Calculate discount and tax
    const discountAmount = subtotal * (discountRate / 100)
    const discountedSubtotal = subtotal - discountAmount
    const tax = discountedSubtotal * (taxRate / 100)
    const total = discountedSubtotal + tax

    // Calculate estimated delivery time
    const totalHours = items.reduce((sum, item) => {
      return sum + ((item.estimatedHours || 0) * item.quantity)
    }, 0)

    // Estimate delivery (assuming 8 hours per day, 5 days per week)
    const workingDaysNeeded = Math.ceil(totalHours / 8)
    const weeksNeeded = Math.ceil(workingDaysNeeded / 5)
    const estimatedDelivery = `${weeksNeeded} week${weeksNeeded > 1 ? 's' : ''}`

    const quote = {
      items,
      subtotal,
      discount: discountAmount,
      tax,
      total,
      currency,
      estimatedDelivery
    }

    // Generate quote ID
    const quoteId = `QUOTE-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`

    // In a real app, you would save this quote to a database
    console.log('Generated quote:', { quoteId, quote })

    res.status(200).json({
      success: true,
      quoteId,
      quote,
      generatedAt: new Date().toISOString()
    })

  } catch (error) {
    console.error('Quote generation error:', error)
    res.status(500).json({ error: 'Failed to generate quote' })
  }
} 