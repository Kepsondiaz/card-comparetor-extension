import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import { copyFileSync, mkdirSync, existsSync, readdirSync, readFileSync, writeFileSync } from 'fs';

// Plugin to copy manifest.json and assets to dist, and fix popup.html
function copyManifestAndAssets() {
  return {
    name: 'copy-manifest-and-assets',
    closeBundle() {
      const distDir = resolve(__dirname, 'dist');
      const assetsDir = resolve(distDir, 'assets');
      
      // Ensure assets directory exists
      if (!existsSync(assetsDir)) {
        mkdirSync(assetsDir, { recursive: true });
      }
      
      // Copy manifest.json
      try {
        copyFileSync(
          resolve(__dirname, 'manifest.json'),
          resolve(distDir, 'manifest.json')
        );
        console.log('✓ Copied manifest.json');
      } catch (err) {
        console.warn('⚠ Could not copy manifest.json:', err);
      }
      
      // Copy assets if they exist
      const assetsSource = resolve(__dirname, 'assets');
      if (existsSync(assetsSource)) {
        try {
          const files = readdirSync(assetsSource);
          files.forEach((file: string) => {
            if (file.endsWith('.png') || file.endsWith('.jpg') || file.endsWith('.svg')) {
              copyFileSync(
                resolve(assetsSource, file),
                resolve(assetsDir, file)
              );
            }
          });
          console.log('✓ Copied assets');
        } catch (err) {
          console.warn('⚠ Could not copy assets:', err);
        }
      }
      
      // Fix popup.html - remove crossorigin attributes (causes CSP issues in extensions)
      const popupHtmlPath = resolve(distDir, 'popup.html');
      if (existsSync(popupHtmlPath)) {
        try {
          let htmlContent = readFileSync(popupHtmlPath, 'utf-8');
          // Remove crossorigin attributes
          htmlContent = htmlContent.replace(/\s+crossorigin/g, '');
          // Ensure script is at the end of body
          if (!htmlContent.includes('</body>')) {
            htmlContent = htmlContent.replace('</html>', '</body></html>');
          }
          writeFileSync(popupHtmlPath, htmlContent);
          console.log('✓ Fixed popup.html (removed crossorigin attributes)');
        } catch (err) {
          console.warn('⚠ Could not fix popup.html:', err);
        }
      }
    }
  };
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), copyManifestAndAssets()],
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        popup: resolve(__dirname, 'popup.html'),
      },
      output: {
        entryFileNames: (chunkInfo) => {
          return chunkInfo.name === 'popup' ? 'popup.js' : '[name].js';
        },
        chunkFileNames: '[name].js',
        assetFileNames: (assetInfo) => {
          if (assetInfo.name === 'popup.html') {
            return 'popup.html';
          }
          // Keep CSS in assets folder
          if (assetInfo.name && assetInfo.name.endsWith('.css')) {
            return 'assets/[name][extname]';
          }
          return 'assets/[name][extname]';
        },
      },
    },
    // Ensure we don't minify too aggressively for extension compatibility
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: false, // Keep console logs for debugging
      },
    },
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, './'),
    },
  },
});
