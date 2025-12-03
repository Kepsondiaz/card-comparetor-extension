#!/bin/bash

# Script to package extension for Chrome Web Store submission
# Usage: ./scripts/package-for-store.sh [version]

set -e

VERSION=${1:-"1.0.0"}
EXTENSION_NAME="africard-compare-extension"
ZIP_NAME="${EXTENSION_NAME}-v${VERSION}.zip"

echo "📦 Packaging extension for Chrome Web Store..."
echo "Version: ${VERSION}"
echo ""

# Check if dist folder exists
if [ ! -d "dist" ]; then
    echo "❌ Error: dist folder not found!"
    echo "Run 'npm run build' first"
    exit 1
fi

# Update version in manifest.json if needed
if [ -f "dist/manifest.json" ]; then
    # Note: This is a simple version update - you may want to use jq or similar
    echo "✓ Found manifest.json"
fi

# Create zip file
echo "📦 Creating ZIP file..."
cd dist
zip -r "../${ZIP_NAME}" . -x "*.DS_Store" "*.git*" > /dev/null
cd ..

# Check zip was created
if [ -f "${ZIP_NAME}" ]; then
    SIZE=$(du -h "${ZIP_NAME}" | cut -f1)
    echo "✅ Successfully created: ${ZIP_NAME}"
    echo "   Size: ${SIZE}"
    echo ""
    echo "📋 Next steps:"
    echo "1. Go to https://chrome.google.com/webstore/devconsole"
    echo "2. Click 'New Item'"
    echo "3. Upload: ${ZIP_NAME}"
    echo "4. Fill in store listing details"
    echo "5. Submit for review"
else
    echo "❌ Error: Failed to create ZIP file"
    exit 1
fi

