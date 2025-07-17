export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const body = req.body
    
    // Log the form submission for debugging
    console.log('Webflow form submission received:', body)
    
    // Here you can process the form submission data
    // For example, trigger quote calculations, send notifications, etc.
    
    // Example: If this is a quote request form
    if (body.formName === 'quote-request') {
      const { name, email, projectType, budget, message } = body.data
      
      // Process the quote request
      const quoteData = {
        customerName: name,
        customerEmail: email,
        projectType,
        estimatedBudget: budget,
        requirements: message,
        submittedAt: new Date().toISOString(),
        status: 'pending'
      }
      
      // In a real app, you would save this to a database
      console.log('Processing quote request:', quoteData)
      
      // You could also trigger an email notification here
      // await sendQuoteNotification(quoteData)
    }
    
    res.status(200).json({ 
      success: true, 
      message: 'Webhook processed successfully' 
    })
  } catch (error) {
    console.error('Webhook processing error:', error)
    res.status(500).json({ error: 'Failed to process webhook' })
  }
} 