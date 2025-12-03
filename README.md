# AfriCard Compare - Chrome Extension

A Chrome extension that helps users compare money transfer fees across different providers in West Africa (Djamo CI, Djamo SN, Wave, PushCI, Orange Money, and Nafolo).

## Features

- **Quick Comparison**: Enter amount → See all providers instantly
- **Real-time Rates**: Fetches exchange rates from Supabase
- **Multi-currency Support**: EUR, USD, and XOF
- **Bilingual Support**: French/English with persistent language preference
- **Today's Rates**: Collapsible section showing current exchange rates
- **Analytics**: Mixpanel tracking for usage analytics
- **Compact Design**: Optimized for 400×600px popup

## Installation

### Development Setup

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Configure Environment Variables**
   ```bash
   # Copy the example env file
   cp .env.example .env
   
   # Edit .env and add your Supabase credentials
   # Get these from your Supabase project: Settings > API
   ```
   
   The `.env` file should contain:
   ```
   VITE_SUPABASE_URL=your_supabase_project_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

3. **Build the Extension**
   ```bash
   npm run build
   ```
   This will create a `dist` folder with the compiled extension.

3. **Load Extension in Chrome**
   - Open Chrome and navigate to `chrome://extensions/`
   - Enable "Developer mode" (toggle in top right)
   - Click "Load unpacked"
   - Select the `dist` folder from this project
   - The extension icon should appear in your toolbar

4. **Development Mode** (with auto-rebuild)
   ```bash
   npm run dev
   ```
   This watches for changes and rebuilds automatically. After rebuilding, reload the extension in Chrome.

### Production Build

```bash
npm run build
```

The `dist` folder will contain all files needed for Chrome Web Store submission.

## Project Structure

```
chrome-extension/
├── manifest.json          # Extension manifest (Manifest V3)
├── popup.html             # Popup HTML entry point
├── popup.tsx              # Main React component
├── components/            # React components
│   ├── Calculator.tsx
│   ├── ComparisonResults.tsx
│   ├── TodayRates.tsx
│   ├── LanguageSwitch.tsx
│   └── WhatsAppButton.tsx
├── utils/                 # Utility functions
│   ├── feeCalculator.ts
│   ├── rateService.ts
│   ├── supabaseClient.ts
│   ├── analytics.ts
│   └── translations.ts
├── contexts/              # React contexts
│   └── LanguageContext.tsx
├── hooks/                 # Custom React hooks
│   └── useExchangeRates.ts
├── config/                # Configuration files
│   └── supabase.config.ts
├── types/                 # TypeScript type definitions
│   └── calculator.ts
├── assets/                # Static assets (icons, images)
│   ├── icon-16.png
│   ├── icon-48.png
│   ├── icon-128.png
│   └── pasted-image.png
├── vite.config.ts         # Vite build configuration
├── tsconfig.json          # TypeScript configuration
├── tailwind.config.js     # Tailwind CSS configuration
└── package.json           # Dependencies and scripts
```

## Configuration

### Supabase Setup

The extension uses Supabase to fetch real-time exchange rates. Configuration is read from environment variables in `.env` file.

**To update Supabase credentials:**
1. Edit `.env` file (or create it from `.env.example`)
2. Set `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`
3. Rebuild the extension: `npm run build`
4. Reload the extension in Chrome

**Getting your Supabase credentials:**
- Go to your Supabase project dashboard
- Navigate to Settings > API
- Copy the "Project URL" → `VITE_SUPABASE_URL`
- Copy the "anon public" key → `VITE_SUPABASE_ANON_KEY`

### Analytics

Mixpanel analytics is configured in `utils/analytics.ts`. The token is already set, but you can update it if needed.

## Development

### Making Changes

1. Edit source files in the `chrome-extension/` directory
2. Run `npm run dev` for auto-rebuild or `npm run build` for manual build
3. Reload the extension in Chrome (`chrome://extensions/` → click reload icon)

### Testing Checklist

- [ ] Extension loads without errors
- [ ] Calculator works correctly
- [ ] Rates fetch from Supabase successfully
- [ ] Language switching persists across sessions
- [ ] Analytics events fire correctly
- [ ] Works offline (shows cached rates or fallback)
- [ ] No console errors

### Common Issues

**Extension not loading:**
- Check browser console for errors
- Verify `dist` folder contains `manifest.json`, `popup.html`, and `popup.js`
- Ensure all assets are in the correct locations

**Rates not updating:**
- Check Supabase connection in browser console
- Verify Supabase credentials in `config/supabase.config.ts`
- Check network tab for API errors

**Styling issues:**
- Ensure Tailwind CSS is properly compiled
- Check that `index.css` is imported in `popup.tsx`
- Verify Tailwind config includes all necessary files

## Chrome Web Store Submission

### Quick Start

1. **Package Extension**
   ```bash
   # Automated packaging
   ./scripts/package-for-store.sh 1.0.0
   
   # Or manually
   cd dist
   zip -r ../africard-compare-extension-v1.0.0.zip .
   ```

2. **Submit to Chrome Web Store**
   - Go to [Chrome Web Store Developer Dashboard](https://chrome.google.com/webstore/devconsole)
   - Pay one-time $5 developer fee (if not already paid)
   - Click "New Item"
   - Upload the ZIP file
   - Fill in store listing details
   - Submit for review

### Detailed Guide

See **[DEPLOYMENT.md](./DEPLOYMENT.md)** for complete step-by-step instructions including:
- Preparing store assets (screenshots, promotional tiles)
- Creating privacy policy
- Writing store listing description
- Submission checklist
- Post-submission monitoring

## Permissions Explained

- **storage**: Used to persist user language preference
- **host_permissions**: 
  - Supabase API: For fetching exchange rates
  - Mixpanel API: For analytics tracking

## Security

- No sensitive data is stored
- Supabase anon key is safe to expose (protected by RLS)
- All API calls use HTTPS
- Content Security Policy is configured in `manifest.json`

## Browser Compatibility

- Chrome 88+ (Manifest V3 support)
- Edge 88+ (Chromium-based)
- Other Chromium-based browsers with Manifest V3 support

## License

[Add your license here]

## Support

For issues or questions:
- WhatsApp: +225 07 00 59 21 64
- GitHub Issues: [Add your repo URL]

## Changelog

### v1.0.0
- Initial release
- Basic comparison functionality
- Real-time rate fetching from Supabase
- Bilingual support (FR/EN)
- Analytics tracking

