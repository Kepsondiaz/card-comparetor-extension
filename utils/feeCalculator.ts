import { Currency, Provider, FeeBreakdown, ProviderInfo, RatesData } from '../types/calculator';

// Helper function to get extension asset URL safely
function getAssetUrl(path: string): string {
  if (typeof chrome !== 'undefined' && chrome.runtime && chrome.runtime.getURL) {
    return chrome.runtime.getURL(path);
  }
  // Fallback for development/testing
  return path;
}

export const PROVIDERS: Record<Provider, ProviderInfo> = {
  djamo: {
    id: 'djamo',
    name: 'Djamo CI',
    country: 'CI',
    color: 'text-emerald-700',
    bgColor: 'bg-emerald-50',
    borderColor: 'border-emerald-200',
    logoUrl: getAssetUrl('assets/djamo-logo.png')
  },
  djamosn: {
    id: 'djamosn',
    name: 'Djamo SN',
    country: 'SN',
    color: 'text-emerald-700',
    bgColor: 'bg-emerald-50',
    borderColor: 'border-emerald-200',
    logoUrl: getAssetUrl('assets/djamo-logo.png')
  },
  wave: {
    id: 'wave',
    name: 'Wave',
    country: 'ALL',
    color: 'text-blue-700',
    bgColor: 'bg-blue-50',
    borderColor: 'border-blue-200',
    logoUrl: getAssetUrl('assets/wave-logo.png')
  },
  pushci: {
    id: 'pushci',
    name: 'PushCI',
    country: 'CI',
    color: 'text-green-700',
    bgColor: 'bg-green-50',
    borderColor: 'border-green-200',
    logoUrl: getAssetUrl('assets/pushci-logo.png')
  },
  orange: {
    id: 'orange',
    name: 'Orange Money Senegal',
    country: 'SN',
    color: 'text-orange-700',
    bgColor: 'bg-orange-50',
    borderColor: 'border-orange-200',
    logoUrl: getAssetUrl('assets/orange-logo.png')
  },
  nafolo: {
    id: 'nafolo',
    name: 'Nafolo CI',
    country: 'CI',
    color: 'text-gray-700',
    bgColor: 'bg-gray-50',
    borderColor: 'border-gray-200',
    logoUrl: getAssetUrl('assets/pasted-image.png')
  }
};

// Default provider fees (fallback if Supabase not configured)
const DEFAULT_PROVIDER_FEES: Record<Provider, number | 'not_defined'> = {
  djamo: 200,
  djamosn: 200,
  wave: 0,
  pushci: 290,
  orange: 'not_defined',
  nafolo: 0
};

// Default FX rates used for calculation (fallback if Supabase not configured)
const DEFAULT_FX_RATES_CALCULATION: Record<Provider, Record<Currency, number>> = {
  djamo: {
    XOF: 1,
    EUR: 682,
    USD: 603
  },
  djamosn: {
    XOF: 1,
    EUR: 676,
    USD: 601
  },
  wave: {
    XOF: 1,
    EUR: 675.68,
    USD: 594.3
  },
  pushci: {
    XOF: 1,
    EUR: 685,
    USD: 611
  },
  orange: {
    XOF: 1,
    EUR: 669.754,
    USD: 585.773
  },
  nafolo: {
    XOF: 1,
    EUR: 693,
    USD: 605
  }
};

// Default displayed FX rates shown in UI (fallback if Supabase not configured)
const DEFAULT_FX_RATES_DISPLAY: Record<Provider, Record<Currency, number>> = {
  djamo: {
    XOF: 1,
    EUR: 682,
    USD: 603
  },
  djamosn: {
    XOF: 1,
    EUR: 676,
    USD: 601
  },
  wave: {
    XOF: 1,
    EUR: 676,
    USD: 594
  },
  pushci: {
    XOF: 1,
    EUR: 685,
    USD: 611
  },
  orange: {
    XOF: 1,
    EUR: 669.754,
    USD: 585.773
  },
  nafolo: {
    XOF: 1,
    EUR: 693,
    USD: 605
  }
};

// Dynamic rates storage (will be updated from Supabase)
let currentRatesData: RatesData | null = null;

/**
 * Update the current rates data (called when fetching from Supabase)
 */
export function updateRatesData(data: RatesData | null) {
  currentRatesData = data;
}

/**
 * Get current provider fees (from Supabase or fallback to defaults)
 * Merges Supabase data with defaults to ensure all providers exist
 */
export function getProviderFees(): Record<Provider, number | 'not_defined'> {
  // Start with defaults
  const fees: Record<Provider, number | 'not_defined'> = { ...DEFAULT_PROVIDER_FEES };
  
  // Merge in Supabase fees if available
  if (currentRatesData?.fees) {
    Object.entries(currentRatesData.fees).forEach(([provider, fee]) => {
      if (provider in fees) {
        fees[provider as Provider] = fee;
      }
    });
  }
  
  return fees;
}

/**
 * Get calculation rates (from Supabase or fallback to defaults)
 * Merges Supabase data with defaults to ensure all providers/currencies exist
 */
function getCalculationRates(): Record<Provider, Record<Currency, number>> {
  // Deep copy defaults to avoid mutating the original
  const rates: Record<Provider, Record<Currency, number>> = {} as Record<Provider, Record<Currency, number>>;
  Object.keys(DEFAULT_FX_RATES_CALCULATION).forEach((provider) => {
    rates[provider as Provider] = { ...DEFAULT_FX_RATES_CALCULATION[provider as Provider] };
  });
  
  // Merge in Supabase data if available
  if (currentRatesData?.rates) {
    Object.entries(currentRatesData.rates).forEach(([provider, currencies]) => {
      if (provider in rates) {
        Object.entries(currencies).forEach(([currency, rateData]) => {
          if (currency in rates[provider as Provider]) {
            rates[provider as Provider][currency as Currency] = rateData.calculation;
          }
        });
      }
    });
  }
  
  return rates;
}

/**
 * Get display rates (from Supabase or fallback to defaults)
 * Merges Supabase data with defaults to ensure all providers/currencies exist
 */
function getDisplayRates(): Record<Provider, Record<Currency, number>> {
  // Deep copy defaults to avoid mutating the original
  const rates: Record<Provider, Record<Currency, number>> = {} as Record<Provider, Record<Currency, number>>;
  Object.keys(DEFAULT_FX_RATES_DISPLAY).forEach((provider) => {
    rates[provider as Provider] = { ...DEFAULT_FX_RATES_DISPLAY[provider as Provider] };
  });
  
  // Merge in Supabase data if available
  if (currentRatesData?.rates) {
    Object.entries(currentRatesData.rates).forEach(([provider, currencies]) => {
      if (provider in rates) {
        Object.entries(currencies).forEach(([currency, rateData]) => {
          if (currency in rates[provider as Provider]) {
            rates[provider as Provider][currency as Currency] = rateData.display;
          }
        });
      }
    });
  }
  
  return rates;
}

export function calculateFees(amount: number, currency: Currency, provider: Provider): FeeBreakdown {
  const calculationRates = getCalculationRates();
  const displayRates = getDisplayRates();
  
  // Ensure provider and currency exist (fallback to defaults)
  const fxRate = calculationRates[provider]?.[currency] ?? DEFAULT_FX_RATES_CALCULATION[provider][currency];
  const displayedFxRate = displayRates[provider]?.[currency] ?? DEFAULT_FX_RATES_DISPLAY[provider][currency];
  
  const totalCost = currency === 'XOF' ? amount : amount * fxRate;
  return {
    fixedFee: 0,
    percentageFee: 0,
    fxRate,
    displayedFxRate,
    totalCost: Math.round(totalCost)
  };
}

export function formatXOF(amount: number): string {
  return new Intl.NumberFormat('fr-FR', {
    style: 'decimal',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount) + ' XOF';
}

