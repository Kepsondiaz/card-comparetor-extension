# Debugging Image Display Issues

## Check if logo files exist:
```bash
ls -la assets/*logo*.png
```

## Check if images are copied to dist:
```bash
ls -la dist/assets/*logo*.png
```

## Verify image URLs in browser console:
1. Open extension popup
2. Right-click → Inspect
3. In console, check:
   ```javascript
   chrome.runtime.getURL('assets/wave-logo.png')
   ```

## Common Issues:

1. **Images not copied to dist**: Rebuild with `npm run build`
2. **Wrong filename**: Check exact filename matches in `feeCalculator.ts`
3. **CSP blocking**: Images should work with current manifest.json
4. **Path issue**: Use `chrome.runtime.getURL()` for extension assets

## Quick Fix:
If images don't load, they'll automatically fallback to text initials (first letter of provider name).
