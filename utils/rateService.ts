import { supabase, isSupabaseConfigured } from './supabaseClient';
import { ExchangeRateRow, RatesData, Provider, Currency } from '../types/calculator';

/**
 * Request optional host permissions if not already granted
 */
async function ensurePermissions(): Promise<boolean> {
  try {
    const permissions = {
      origins: [
        'https://dhfvtmzvitkdydjgzrov.supabase.co/*',
        'https://api.mixpanel.com/*'
      ]
    };
    
    // Check if permissions are already granted
    const hasPermissions = await chrome.permissions.contains(permissions);
    if (hasPermissions) {
      return true;
    }
    
    // Request permissions
    const granted = await chrome.permissions.request(permissions);
    return granted;
  } catch (error) {
    // Silently fail - permissions might not be available in all contexts
    return false;
  }
}

/**
 * Fetch all active exchange rates from Supabase
 */
export async function fetchRatesFromSupabase(): Promise<RatesData | null> {
  if (!isSupabaseConfigured() || !supabase) {
    return null;
  }
  
  // Request permissions if needed
  await ensurePermissions();
  
  try {
    const { data, error } = await supabase
      .from('exchange_rates')
      .select('*')
      .eq('is_active', true);
    
    if (error) {
      return null;
    }
    
    if (!data || data.length === 0) {
      return null;
    }
    
    return transformSupabaseData(data as ExchangeRateRow[]);
  } catch (error) {
    return null;
  }
}

/**
 * Transform Supabase rows into the format used by the app
 */
function transformSupabaseData(rows: ExchangeRateRow[]): RatesData {
  const rates: Record<string, Record<string, {
    calculation: number;
    display: number;
  }>> = {};
  const fees: Record<string, number | 'not_defined'> = {};
  let lastUpdated = '';

  rows.forEach(row => {
    const provider = row.provider;
    const currency = row.currency;

    // Initialize provider object if it doesn't exist
    if (!rates[provider]) {
      rates[provider] = {};
    }

    // Add rates for this currency
    rates[provider][currency] = {
      calculation: row.calculation_rate,
      display: row.display_rate
    };

    // Store fee (only need to do this once per provider)
    if (fees[provider] === undefined) {
      fees[provider] = row.fee === null ? 'not_defined' : row.fee;
    }

    // Track most recent update
    if (!lastUpdated || row.updated_at > lastUpdated) {
      lastUpdated = row.updated_at;
    }
  });

  return {
    rates: rates as Record<Provider, Record<Currency, {
      calculation: number;
      display: number;
    }>>,
    fees: fees as Record<Provider, number | 'not_defined'>,
    lastUpdated
  };
}

/**
 * Subscribe to real-time rate updates
 */
export function subscribeToRateUpdates(callback: (data: RatesData | null) => void) {
  if (!isSupabaseConfigured() || !supabase) {
    return () => {}; // Return empty cleanup function
  }

  // Request permissions if needed (async, don't wait)
  ensurePermissions().catch(() => {});

  const channel = supabase
    .channel('exchange_rates_changes')
    .on('postgres_changes', {
      event: '*',
      schema: 'public',
      table: 'exchange_rates'
    }, async () => {
      // Refetch all rates when any change occurs
      const updatedRates = await fetchRatesFromSupabase();
      callback(updatedRates);
    })
    .subscribe();

  // Return cleanup function
  return () => {
    supabase.removeChannel(channel);
  };
}

