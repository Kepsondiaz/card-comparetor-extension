export type Currency = 'XOF' | 'EUR' | 'USD';
export type Country = 'SN' | 'CI' | 'ALL';
export type Provider = 'djamo' | 'djamosn' | 'wave' | 'pushci' | 'orange' | 'nafolo';
export interface ProviderInfo {
  id: Provider;
  name: string;
  country: Country;
  color: string;
  bgColor: string;
  borderColor: string;
  logoUrl?: string;
}
export interface FeeBreakdown {
  fixedFee: number;
  percentageFee: number;
  fxRate: number;
  displayedFxRate: number;
  totalCost: number;
}
export interface ComparisonResult {
  provider: ProviderInfo;
  breakdown: FeeBreakdown;
  isCheapest: boolean;
}

// Supabase types
export interface ExchangeRateRow {
  id: string;
  provider: Provider;
  currency: Currency;
  calculation_rate: number;
  display_rate: number;
  fee: number | null;
  updated_at: string;
  is_active: boolean;
}
export interface RatesData {
  rates: Record<Provider, Record<Currency, {
    calculation: number;
    display: number;
  }>>;
  fees: Record<Provider, number | 'not_defined'>;
  lastUpdated: string;
}

