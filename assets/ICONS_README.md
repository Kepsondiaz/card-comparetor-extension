# Extension Icons

This directory should contain the following icon files:

- `icon-16.png` - 16×16 pixels (toolbar icon)
- `icon-48.png` - 48×48 pixels (extension management page)
- `icon-128.png` - 128×128 pixels (Chrome Web Store)

## Creating Icons

You can create icons using any image editing tool. Here are some options:

### Option 1: Online Tools
- Use [Canva](https://www.canva.com/) or [Figma](https://www.figma.com/) to design icons
- Export as PNG with the required dimensions

### Option 2: ImageMagick (Command Line)
If you have a source image (e.g., `logo.png`), you can resize it:

```bash
# Install ImageMagick (macOS)
brew install imagemagick

# Resize to required dimensions
convert logo.png -resize 16x16 icon-16.png
convert logo.png -resize 48x48 icon-48.png
convert logo.png -resize 128x128 icon-128.png
```

### Option 3: Python Script
Create a simple Python script to generate icons:

```python
from PIL import Image

# Open source image
img = Image.open('source-logo.png')

# Create icons
sizes = [16, 48, 128]
for size in sizes:
    resized = img.resize((size, size), Image.Resampling.LANCZOS)
    resized.save(f'icon-{size}.png')
```

### Design Guidelines

- Use a simple, recognizable design
- Ensure icons are readable at small sizes (16×16)
- Use high contrast colors
- Consider your brand colors
- Test icons at all sizes to ensure clarity

### Temporary Placeholder

If you need to test the extension before creating final icons, you can:
1. Create simple colored squares as placeholders
2. Use text-based icons (e.g., "AC" for AfriCard)
3. Use the logo image from the main app

The extension will work with any PNG images, but custom branded icons are recommended for production.

