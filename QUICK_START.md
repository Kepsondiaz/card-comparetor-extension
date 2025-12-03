# Quick Start Guide

## 🚀 Get Started in 5 Minutes

### Step 1: Install Dependencies
```bash
cd chrome-extension
npm install
```

### Step 2: Create Icons
Open `assets/generate-icons.html` in your browser and download the three icon files. Save them as:
- `assets/icon-16.png`
- `assets/icon-48.png`
- `assets/icon-128.png`

### Step 3: Build
```bash
npm run build
```

### Step 4: Load Extension
1. Open Chrome → `chrome://extensions/`
2. Enable "Developer mode"
3. Click "Load unpacked"
4. Select the `dist` folder

### Step 5: Test
Click the extension icon in your toolbar and try comparing providers!

## 📁 Project Structure

```
chrome-extension/
├── popup.tsx          # Main entry point
├── components/       # React components
├── utils/           # Business logic
├── config/          # Supabase config
└── assets/          # Icons & images
```

## 🔧 Development

```bash
# Watch mode (auto-rebuild)
npm run dev

# Production build
npm run build
```

After rebuilding, reload the extension in Chrome.

## ✅ Checklist Before Submission

- [ ] Icons created (16, 48, 128px)
- [ ] Extension loads without errors
- [ ] Calculator works correctly
- [ ] Rates fetch successfully
- [ ] Language switching works
- [ ] No console errors
- [ ] Tested in Chrome

## 📚 More Info

- Full documentation: `README.md`
- Installation details: `INSTALLATION.md`
- Icon creation: `assets/ICONS_README.md`

