# Quote Calculator for Webflow Developer Platform

An interactive quote estimator that helps users calculate project costs directly in Webflow based on selected services.

**Version:** 1.0.0  
**Author:** Brandon Mosco

## Features

- 🧮 Interactive quote calculator with customizable services
- 🔐 Webflow OAuth integration
- ⚙️ Configurable pricing and tax settings
- 📱 Responsive design with modern UI
- 🪝 Webhook support for form submissions
- 🚀 Ready for Netlify deployment

## Tech Stack

- **Framework:** Next.js 14 with App Router
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Icons:** Lucide React
- **Authentication:** Webflow OAuth
- **Deployment:** Netlify

## Getting Started

### Prerequisites

- Node.js 18 or higher
- npm or yarn
- Webflow Developer Account

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/QABrandon/quote-calculator.git
   cd quote-calculator
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Copy the example environment file:
   ```bash
   cp env.example .env.local
   ```
   
   Update `.env.local` with your values:
   ```env
   # Webflow OAuth Configuration
   WEBFLOW_CLIENT_ID=your_client_id_here
   WEBFLOW_CLIENT_SECRET=your_client_secret_here
   WEBFLOW_REDIRECT_URI=http://localhost:3000/api/auth/callback

   # NextAuth Configuration
   NEXTAUTH_URL=http://localhost:3000
   NEXTAUTH_SECRET=your-secret-key-here

   # Application Configuration
   APP_URL=http://localhost:3000
   APP_NAME="Quote Calculator by Brandon Mosco"
   APP_VERSION="1.0.0"
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) in your browser.

## Webflow Developer Platform Setup

### 1. Create a Webflow App

1. Go to the [Webflow Developer Portal](https://developers.webflow.com/)
2. Create a new app with the following configuration:

```json
{
  "id": "quote-calculator-app",
  "name": "Quote Calculator by Brandon Mosco",
  "description": "An interactive quote estimator that helps users calculate project costs directly in Webflow based on selected services.",
  "version": "1.0.0",
  "auth": {
    "type": "oauth2",
    "scopes": [
      "sites:read",
      "collections:read",
      "forms:read",
      "forms:write"
    ],
    "redirect_uris": [
      "http://localhost:3000/api/auth/callback"
    ]
  },
  "ui": {
    "locations": {
      "siteSettings": {
        "label": "Quote Calculator Settings",
        "url": "http://localhost:3000/settings"
      },
      "projectDashboard": {
        "label": "Estimate a Quote",
        "url": "http://localhost:3000/estimator"
      }
    }
  },
  "hooks": {
    "formSubmission": {
      "url": "http://localhost:3000/webhooks/form"
    }
  }
}
```

### 2. Get OAuth Credentials

After creating your app, you'll receive:
- Client ID
- Client Secret

Add these to your `.env.local` file.

## Application Structure

```
/brandon-quote-app
├── pages/
│   ├── api/
│   │   ├── auth.js                  # OAuth Token Exchange
│   │   ├── webhook.js               # Form Hook Handler
│   │   └── quotes/
│   │       └── generate.js          # Quote generation API
│   ├── oauth/
│   │   └── callback.js              # Handles OAuth redirect
│   ├── estimator.js                 # Quote Calculator UI
│   ├── index.js                     # Homepage
│   ├── _app.js                      # App wrapper
│   └── _document.js                 # Document with fonts
├── components/
│   └── QuoteForm.js                 # Calculator Form Component
├── utils/
│   └── auth.js                      # Token mgmt helpers
├── lib/
│   └── webflow-config.ts            # Webflow configuration
├── types/
│   └── webflow.ts                   # TypeScript definitions
├── styles/
│   └── globals.css                  # Global styles
├── public/
│   └── icon.svg                     # Webflow App Icon
├── .env.local                       # Env Variables
└── webflow.app.json                 # App Manifest
```

## Configuration

### Quote Items

Default quote items are defined in `src/app/estimator/page.tsx`. You can customize:

- Service names and descriptions
- Base prices
- Estimated hours
- Complexity levels
- Categories

### Settings

The settings page (`/settings`) allows configuration of:

- Tax rates
- Currency
- Hourly rates
- Estimation buffers
- Discount settings

## API Endpoints

### Authentication
- `GET /api/auth/login` - Initiate Webflow OAuth
- `GET /api/auth/callback` - Handle OAuth callback

### Quotes
- `POST /api/quotes/generate` - Generate a quote calculation

### Webhooks
- `POST /api/webhooks/form` - Handle Webflow form submissions

## Deployment to Netlify

### 1. Prepare for Deployment

1. **Install Netlify CLI** (optional)
   ```bash
   npm install -g netlify-cli
   ```

2. **Build the project**
   ```bash
   npm run build
   ```

### 2. Deploy to Netlify

#### Option A: Deploy via Netlify Dashboard

1. Push your code to GitHub
2. Connect your repository in Netlify
3. Set build command: `npm run build`
4. Set publish directory: `.next`

#### Option B: Deploy via CLI

```bash
netlify deploy --build
netlify deploy --prod
```

### 3. Configure Environment Variables

In Netlify dashboard, go to Site settings > Environment variables and add:

```
WEBFLOW_CLIENT_ID=your_production_client_id
WEBFLOW_CLIENT_SECRET=your_production_client_secret
NEXTAUTH_URL=https://your-site.netlify.app
NEXTAUTH_SECRET=your-production-secret
APP_URL=https://your-site.netlify.app
```

### 4. Update Webflow App Configuration

Update your Webflow app's redirect URIs and webhook URLs to use your production domain:

```json
{
  "auth": {
    "redirect_uris": [
      "https://your-site.netlify.app/api/auth/callback"
    ]
  },
  "ui": {
    "locations": {
      "siteSettings": {
        "url": "https://your-site.netlify.app/settings"
      },
      "projectDashboard": {
        "url": "https://your-site.netlify.app/estimator"
      }
    }
  },
  "hooks": {
    "formSubmission": {
      "url": "https://your-site.netlify.app/webhooks/form"
    }
  }
}
```

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript check

### Adding New Services

To add new quote items:

1. Edit the `defaultQuoteItems` array in `src/app/estimator/page.tsx`
2. Add new items with the `QuoteItem` interface structure

### Customizing Styles

- Global styles: `src/app/globals.css`
- Tailwind config: `tailwind.config.js`
- Component styles: Use Tailwind classes

## Troubleshooting

### Common Issues

1. **OAuth errors**: Check client ID/secret and redirect URIs
2. **Build failures**: Ensure all environment variables are set
3. **API errors**: Check Netlify function logs

### Debug Mode

Set `NODE_ENV=development` to enable detailed logging.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Repository

**GitHub**: [https://github.com/QABrandon/quote-calculator.git](https://github.com/QABrandon/quote-calculator.git)

## Support

For support, please contact Brandon Mosco or create an issue in the [GitHub repository](https://github.com/QABrandon/quote-calculator/issues). 