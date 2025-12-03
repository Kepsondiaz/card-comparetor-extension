# Extension Logo Setup

## Quick Setup

1. **Open the logo generator:**
   - Open `assets/generate-extension-logo.html` in your browser
   - Or run: `open assets/generate-extension-logo.html`

2. **Download the icons:**
   - Click "Download icon-16.png" → Save to `assets/` folder
   - Click "Download icon-48.png" → Save to `assets/` folder  
   - Click "Download icon-128.png" → Save to `assets/` folder

3. **Rebuild extension:**
   ```bash
   npm run build
   ```

4. **Reload extension in Chrome:**
   - Go to `chrome://extensions/`
   - Click reload icon

## Logo Design

The generated logo features:
- **Blue gradient background** (professional, trustworthy)
- **Two card shapes** (representing comparison)
- **Equals sign** (showing comparison/equality)
- **Clean, modern design** (works at all sizes)

## Customization

To customize the logo:
1. Edit `assets/generate-extension-logo.html`
2. Modify the `drawLogo()` function
3. Regenerate and download new icons

## Alternative: Use Your Own Logo

If you have your own logo:
1. Create/resize to 128×128 pixels
2. Save as `icon-128.png` in `assets/` folder
3. Resize to 48×48 → `icon-48.png`
4. Resize to 16×16 → `icon-16.png`
5. Rebuild: `npm run build`
