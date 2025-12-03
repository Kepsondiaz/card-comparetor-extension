# Chrome Extension Deployment Guide

## Prerequisites

1. **Google Chrome Web Store Developer Account**
   - One-time fee: $5 USD (one-time payment)
   - Sign up at: https://chrome.google.com/webstore/devconsole
   - Use your Google account

2. **Extension Files Ready**
   - Built extension in `dist/` folder
   - Icons (16×16, 48×48, 128×128)
   - All features tested and working

## Step 1: Prepare Your Extension

### 1.1 Final Build
```bash
cd chrome-extension
npm run build
```

### 1.2 Verify Build Output
Check that `dist/` folder contains:
- ✅ `manifest.json`
- ✅ `popup.html`
- ✅ `popup.js`
- ✅ `assets/` folder with all icons and images
- ✅ All CSS files

### 1.3 Test Thoroughly
- [ ] Extension loads without errors
- [ ] Calculator works correctly
- [ ] Rates fetch from Supabase
- [ ] Language switching works
- [ ] All providers display correctly
- [ ] No console errors
- [ ] Icons display properly

## Step 2: Create Store Assets

### 2.1 Required Assets

**Screenshots:**
- **Small promotional tile**: 440×280 pixels (required)
- **Marquee promotional tile**: 920×680 pixels (optional but recommended)
- **Screenshots**: 1280×800 or 640×400 pixels (at least 1, up to 5)

**Icons:**
- Already created: `icon-16.png`, `icon-48.png`, `icon-128.png`

### 2.2 Create Screenshots

Take screenshots of your extension:
1. Open the extension popup
2. Take screenshots showing:
   - Calculator interface
   - Comparison results
   - Today's rates section
   - Language switcher

**Tools for screenshots:**
- Use Chrome DevTools (F12 → Device Toolbar)
- Or use a screenshot tool like Snagit, Lightshot, etc.
- Or use online tools like Canva to create promotional tiles

## Step 3: Package Extension

### 3.1 Create ZIP File

```bash
cd chrome-extension
# Create a zip of the dist folder contents (not the folder itself)
cd dist
zip -r ../africard-compare-extension-v1.0.0.zip .
cd ..
```

**Important:** Zip the **contents** of `dist/`, not the `dist` folder itself.

**Windows:**
```powershell
# Navigate to dist folder
cd dist
# Select all files, right-click → Send to → Compressed folder
# Rename to africard-compare-extension-v1.0.0.zip
```

**macOS:**
```bash
cd dist
zip -r ../africard-compare-extension-v1.0.0.zip .
```

### 3.2 Verify ZIP Contents

Unzip and verify it contains:
- `manifest.json` (at root level)
- `popup.html`
- `popup.js`
- `assets/` folder
- All other required files

## Step 4: Prepare Store Listing

### 4.1 Extension Details

**Name:** (max 45 characters)
```
AfriCard Compare - Money Transfer Calculator
```

**Short Description:** (max 132 characters)
```
Compare money transfer fees across West African providers (Djamo, Wave, PushCI, Orange Money, Nafolo)
```

**Detailed Description:** (max 16,000 characters)
```
AfriCard Compare helps you find the cheapest way to send money in West Africa.

FEATURES:
• Compare fees across 6 providers instantly
• Real-time exchange rates from Supabase
• Support for EUR, USD, and XOF currencies
• Bilingual interface (French/English)
• Today's rates section with live updates
• Country filtering (Senegal, Côte d'Ivoire)

PROVIDERS SUPPORTED:
• Djamo CI & SN
• Wave
• PushCI
• Orange Money Senegal
• Nafolo CI

HOW IT WORKS:
1. Enter the amount you want to send
2. Select your currency (EUR, USD, or XOF)
3. Instantly see which provider offers the best rate
4. Compare total costs including fees

PRIVACY & SECURITY:
• No sensitive data stored
• All calculations done locally
• Real-time rates from trusted Supabase database
• Open source and transparent

Perfect for anyone sending money to West Africa who wants to save on transfer fees!
```

**Category:**
- Primary: Finance
- Secondary: Productivity (optional)

### 4.2 Privacy Policy

**Required if you collect user data.** Since you use:
- Chrome Storage API (for language preference)
- Mixpanel Analytics
- Supabase (for rates)

You should create a privacy policy. Here's a template:

**Privacy Policy URL:** (host on GitHub Pages, your website, or use a service)

```markdown
# Privacy Policy for AfriCard Compare

Last updated: [Date]

## Data Collection

AfriCard Compare collects minimal data:

1. **Language Preference**: Stored locally in your browser using Chrome Storage API
2. **Usage Analytics**: Anonymous usage statistics via Mixpanel (no personal information)
3. **Exchange Rates**: Fetched from Supabase database (public data)

## Data Storage

- Language preference: Stored locally on your device
- Analytics: Anonymous, aggregated data only
- No personal information, payment details, or sensitive data is collected or stored

## Third-Party Services

- **Supabase**: Used for fetching exchange rates (public API)
- **Mixpanel**: Used for anonymous analytics

## Your Rights

You can:
- Clear extension data anytime via Chrome settings
- Disable analytics (though currently not configurable)
- Uninstall the extension at any time

## Contact

For questions: [Your contact email or WhatsApp]
```

**Host it:**
- GitHub Pages (free)
- Your website
- Privacy policy generator service

## Step 5: Submit to Chrome Web Store

### 5.1 Access Developer Dashboard

1. Go to: https://chrome.google.com/webstore/devconsole
2. Sign in with your Google account
3. Pay the one-time $5 developer fee (if not already paid)

### 5.2 Create New Item

1. Click **"New Item"** button
2. Upload your ZIP file (`africard-compare-extension-v1.0.0.zip`)
3. Wait for upload to complete

### 5.3 Fill Store Listing

**Required Fields:**

1. **Name**: `AfriCard Compare - Money Transfer Calculator`
2. **Summary**: Short description (132 chars max)
3. **Description**: Detailed description (see above)
4. **Category**: Finance
5. **Language**: English (and French if you want)
6. **Icon**: Upload `icon-128.png`
7. **Screenshots**: Upload at least 1 screenshot
8. **Small promotional tile**: Upload 440×280 image
9. **Privacy Policy**: URL to your privacy policy (required)

**Optional but Recommended:**

- **Marquee promotional tile**: 920×680
- **Additional screenshots**: Up to 5 total
- **Website**: Your website URL (if you have one)
- **Support URL**: Where users can get help

### 5.4 Distribution

**Visibility Options:**
- **Unlisted**: Only people with the link can install (good for testing)
- **Public**: Available to everyone in Chrome Web Store (recommended)

**Pricing:**
- Select **Free** (since your extension is free)

### 5.5 Submit for Review

1. Review all information
2. Check that all required fields are filled
3. Click **"Submit for Review"**

**Review Process:**
- Usually takes 1-3 business days
- Google will check for:
  - Policy compliance
  - Functionality
  - Security issues
  - Accurate description

## Step 6: Post-Submission

### 6.1 Monitor Status

- Check developer dashboard for review status
- You'll receive email notifications about:
  - Review started
  - Review completed
  - Any issues found

### 6.2 If Rejected

Common reasons:
- **Privacy policy missing**: Add privacy policy URL
- **Description issues**: Make sure description matches functionality
- **Screenshot issues**: Ensure screenshots show actual extension
- **Policy violations**: Review Chrome Web Store policies

Fix issues and resubmit.

### 6.3 After Approval

Once approved:
- Extension goes live immediately
- Share your Chrome Web Store URL
- Monitor user reviews and ratings
- Update as needed

## Step 7: Updates

To update your extension:

1. **Make changes** to your code
2. **Update version** in `manifest.json`:
   ```json
   "version": "1.0.1"
   ```
3. **Rebuild**: `npm run build`
4. **Create new ZIP** with updated version number
5. **Upload** in developer dashboard → "Package" tab
6. **Submit** for review (updates usually review faster)

## Quick Checklist

Before submitting:

- [ ] Extension tested and working
- [ ] Version number set in manifest.json
- [ ] Icons created (16, 48, 128px)
- [ ] Screenshots prepared
- [ ] Privacy policy created and hosted
- [ ] ZIP file created correctly
- [ ] Store listing information prepared
- [ ] Developer account created ($5 paid)
- [ ] All required fields filled

## Resources

- **Chrome Web Store Developer Dashboard**: https://chrome.google.com/webstore/devconsole
- **Chrome Web Store Policies**: https://developer.chrome.com/docs/webstore/program-policies/
- **Developer Documentation**: https://developer.chrome.com/docs/extensions/
- **Privacy Policy Generator**: https://www.freeprivacypolicy.com/

## Support

If you encounter issues:
1. Check Chrome Web Store policies
2. Review rejection reasons (if any)
3. Check extension console for errors
4. Test in a fresh Chrome profile

Good luck with your submission! 🚀

