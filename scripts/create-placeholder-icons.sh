#!/bin/bash
# Simple script to create placeholder icons using ImageMagick or sips (macOS)

SIZES=(16 48 128)
ASSETS_DIR="assets"

mkdir -p "$ASSETS_DIR"

for size in "${SIZES[@]}"; do
  if command -v convert &> /dev/null; then
    # ImageMagick
    convert -size ${size}x${size} xc:#2563eb -pointsize $((size/2)) -fill white -gravity center -annotate +0+0 "AC" "$ASSETS_DIR/icon-${size}.png"
  elif command -v sips &> /dev/null; then
    # macOS sips (create a simple colored square)
    sips -s format png --setProperty formatOptions low -z $size $size /System/Library/CoreServices/CoreTypes.bundle/Contents/Resources/GenericDocumentIcon.icns --out "$ASSETS_DIR/icon-${size}.png" 2>/dev/null || echo "Creating placeholder for icon-${size}.png"
  else
    echo "⚠ ImageMagick or sips not found. Please create icon-${size}.png manually in $ASSETS_DIR/"
  fi
done

echo "✓ Placeholder icons created in $ASSETS_DIR/"
