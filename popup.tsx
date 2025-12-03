import './index.css';
import React, { useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { Calculator } from './components/Calculator';
import { TodayRates } from './components/TodayRates';
import { LanguageSwitch } from './components/LanguageSwitch';
import { WhatsAppButton } from './components/WhatsAppButton';
import { LanguageProvider } from './contexts/LanguageContext';
import { useExchangeRates } from './hooks/useExchangeRates';
import { initAnalytics } from './utils/analytics';

function PopupApp() {
  // Fetch and subscribe to exchange rates from Supabase
  const { isLoading, error, lastUpdated } = useExchangeRates();

  useEffect(() => {
    // Initialize Mixpanel when app loads
    initAnalytics();
  }, []);

  // Optional: Show loading or error states
  if (error) {
    console.warn('Using default rates due to error:', error);
  }

  return (
    <LanguageProvider>
      <div className="min-h-full bg-white flex flex-col">
        {/* Header with Language Switch */}
        <div className="flex items-center justify-between p-3 border-b border-gray-200 bg-white sticky top-0 z-10">
          <h1 className="text-lg font-bold text-gray-900">AfriCard Compare</h1>
          <LanguageSwitch />
        </div>

        {/* Main Content - Scrollable */}
        <div className="flex-1 overflow-y-auto">
          <Calculator />
          <TodayRates />
        </div>

        {/* Footer with WhatsApp Button */}
        <div className="p-3 border-t border-gray-200 bg-white flex items-center justify-center">
          <WhatsAppButton />
        </div>
      </div>
    </LanguageProvider>
  );
}

// Initialize React app
console.log('Popup script loading...');
console.log('Document ready state:', document.readyState);

// Wait for DOM to be ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initApp);
} else {
  initApp();
}

function initApp() {
  console.log('Initializing React app...');
  const container = document.getElementById('root');
  
  if (!container) {
    console.error('Root element not found!');
    document.body.innerHTML = `
      <div style="padding: 20px; font-family: Arial, sans-serif; color: red;">
        <h2>Error: Root element not found</h2>
        <p>The #root div is missing from popup.html</p>
      </div>
    `;
    return;
  }
  
  console.log('Root container found, creating React root...');
  
  try {
    const root = createRoot(container);
    console.log('React root created, rendering app...');
    root.render(<PopupApp />);
    console.log('React app rendered successfully!');
  } catch (error) {
    console.error('Failed to render React app:', error);
    container.innerHTML = `
      <div style="padding: 20px; font-family: Arial, sans-serif; color: red;">
        <h2>Error Loading Extension</h2>
        <p><strong>Error:</strong> ${error.message}</p>
        <p><strong>Stack:</strong></p>
        <pre style="background: #f5f5f5; padding: 10px; overflow: auto;">${error.stack || 'No stack trace'}</pre>
        <p>Please check the browser console (right-click → Inspect) for more details.</p>
      </div>
    `;
  }
}

