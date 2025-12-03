# Installation Guide

## Quick Start

1. **Install Dependencies**
   ```bash
   cd chrome-extension
   npm install
   ```

2. **Create Icons** (Required before building)
   
   You need to create three icon files in the `assets/` folder:
   - `icon-16.png` (16×16 pixels)
   - `icon-48.png` (48×48 pixels)
   - `icon-128.png` (128×128 pixels)
   
   **Easy way:** Open `assets/generate-icons.html` in your browser and download the generated icons.
   
   **Or manually:** Use any image editor to create square PNG icons with your branding.

3. **Build the Extension**
   ```bash
   npm run build
   ```
   
   This creates a `dist` folder with the compiled extension.

4. **Load in Chrome**
   - Open Chrome and go to `chrome://extensions/`
   - Enable "Developer mode" (toggle in top right)
   - Click "Load unpacked"
   - Select the `dist` folder
   - The extension icon should appear in your toolbar

5. **Test the Extension**
   - Click the extension icon in your toolbar
   - The popup should open showing the calculator
   - Try entering an amount and comparing providers

## Development Mode

For active development with auto-rebuild:

```bash
npm run dev
```

Then reload the extension in Chrome after each rebuild.

## Troubleshooting

**Extension won't load:**
- Make sure you selected the `dist` folder (not the parent folder)
- Check browser console for errors
- Verify `manifest.json` exists in `dist/`

**Icons not showing:**
- Ensure all three icon files exist in `dist/assets/`
- Check file names match exactly: `icon-16.png`, `icon-48.png`, `icon-128.png`

**Rates not loading:**
- Check browser console for Supabase connection errors
- Verify Supabase credentials in `config/supabase.config.ts`
- Check network tab for API errors

**Styling looks broken:**
- Ensure `npm run build` completed successfully
- Check that CSS files are in `dist/assets/`
- Clear browser cache and reload extension

## Next Steps

- Customize the extension with your branding
- Update Supabase credentials if needed
- Test all features thoroughly
- Prepare for Chrome Web Store submission (see README.md)

