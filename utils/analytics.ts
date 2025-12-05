// Lightweight Mixpanel implementation using HTTP API (no package required)
// Note: To enable Mixpanel tracking, set MIXPANEL_TOKEN below
const MIXPANEL_TOKEN = 'e012ca6c8919718e9267f2d731c3a7af';
const MIXPANEL_API_HOST = 'https://api.mixpanel.com';

// Generate a simple device ID for tracking (using Chrome storage)
async function getDeviceId(): Promise<string> {
  return new Promise((resolve) => {
    chrome.storage.local.get(['mp_device_id'], (result) => {
      let deviceId = result.mp_device_id;
      if (!deviceId) {
        deviceId = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
        chrome.storage.local.set({ mp_device_id: deviceId }, () => {
          resolve(deviceId);
        });
      } else {
        resolve(deviceId);
      }
    });
  });
}

// Request optional host permissions if not already granted
async function ensureMixpanelPermissions(): Promise<boolean> {
  try {
    const permissions = {
      origins: ['https://api.mixpanel.com/*']
    };
    
    // Check if permissions are already granted
    const hasPermissions = await chrome.permissions.contains(permissions);
    if (hasPermissions) {
      return true;
    }
    
    // Request permissions (non-blocking for analytics)
    const granted = await chrome.permissions.request(permissions);
    return granted;
  } catch (error) {
    return false;
  }
}

// Send event to Mixpanel via HTTP API
async function sendToMixpanel(eventName: string, properties: Record<string, any> = {}) {
  if (!MIXPANEL_TOKEN) {
    return;
  }
  
  // Request permissions if needed (non-blocking)
  await ensureMixpanelPermissions();
  
  try {
    const deviceId = await getDeviceId();
    const data = {
      event: eventName,
      properties: {
        token: MIXPANEL_TOKEN,
        distinct_id: deviceId,
        time: Date.now(),
        ...properties
      }
    };
    const encoded = btoa(JSON.stringify(data));

    // Use POST method with proper CORS handling
    await fetch(`${MIXPANEL_API_HOST}/track`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: `data=${encodeURIComponent(encoded)}`
    });
  } catch (error) {
    // Silently fail - don't log analytics errors
  }
}

export function initAnalytics() {
  // Initialize device ID on first load
  getDeviceId();

  // Track page load
  trackPageView('Extension Popup Loaded');
}

export function trackEvent(eventName: string, properties?: Record<string, any>) {
  sendToMixpanel(eventName, properties);
}

export function trackCompareProviders(data: {
  amount: number;
  currency: string;
  djamoTotalCost: number;
  waveTotalCost: number;
  cheapestProvider: string;
  savings: number;
}) {
  trackEvent('Compare Providers', {
    amount: data.amount,
    currency: data.currency,
    djamo_total_cost: data.djamoTotalCost,
    wave_total_cost: data.waveTotalCost,
    cheapest_provider: data.cheapestProvider,
    savings_xof: data.savings,
    timestamp: new Date().toISOString()
  });
}

export function trackLanguageChange(language: string) {
  trackEvent('Language Changed', {
    language,
    timestamp: new Date().toISOString()
  });
}

export function trackPageView(pageName: string) {
  trackEvent('Page View', {
    page: pageName,
    timestamp: new Date().toISOString()
  });
}

