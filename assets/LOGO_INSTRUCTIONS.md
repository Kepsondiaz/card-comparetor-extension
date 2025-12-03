# Adding Provider Logos

## Wave Logo
1. Save the Wave logo as `wave-logo.png` in this `assets/` folder
2. Recommended size: 64x64 pixels or larger

## Djamo Logo
1. Save the Djamo logo (white "d" on black background) as `djamo-logo.png` in this `assets/` folder
2. Recommended size: 64x64 pixels or larger
3. Used for both Djamo CI and Djamo SN

## PushCI Logo
1. Save the PushCI logo (white "P" on green gradient background) as `pushci-logo.png` in this `assets/` folder
2. Recommended size: 64x64 pixels or larger

## Orange Money Logo
1. Save the Orange Money logo (white and orange arrows on black background) as `orange-logo.png` in this `assets/` folder
2. Recommended size: 64x64 pixels or larger

## Other Provider Logos
You can add logos for other providers (Nafolo) by:
1. Saving the logo file in this `assets/` folder
2. Updating the provider configuration in `utils/feeCalculator.ts`
3. Setting the `logoUrl` property: `logoUrl: getAssetUrl('assets/your-logo.png')`

## After Adding Logos
1. Rebuild the extension: `npm run build`
2. Reload the extension in Chrome

The logos will automatically appear in:
- Comparison results
- Today's rates section
- Anywhere providers are displayed
