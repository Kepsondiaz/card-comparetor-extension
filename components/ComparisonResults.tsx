import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Crown, TrendingDown } from 'lucide-react';
import { Currency, ComparisonResult, Country, ProviderInfo } from '../types/calculator';
import { calculateFees, PROVIDERS, getProviderFees, formatXOF } from '../utils/feeCalculator';
import { useLanguage } from '../contexts/LanguageContext';
import { translations } from '../utils/translations';

// Component to handle logo display with fallback
function ProviderLogo({ provider, size = 'md' }: { provider: ProviderInfo; size?: 'sm' | 'md' | 'lg' }) {
  const [imageError, setImageError] = useState(false);
  const sizeClasses = {
    sm: 'w-6 h-6',
    md: 'w-7 h-7',
    lg: 'w-8 h-8'
  };
  const textSizeClasses = {
    sm: 'text-sm',
    md: 'text-lg',
    lg: 'text-xl'
  };

  if (!provider.logoUrl || imageError) {
    return (
      <span className={`${textSizeClasses[size]} font-bold ${provider.color}`}>
        {provider.name.charAt(0)}
      </span>
    );
  }

  return (
    <img
      src={provider.logoUrl}
      alt={provider.name}
      className={`${sizeClasses[size]} object-contain`}
      onError={() => setImageError(true)}
    />
  );
}

interface ComparisonResultsProps {
  amount: number;
  currency: Currency;
}

export function ComparisonResults({ amount, currency }: ComparisonResultsProps) {
  const { language } = useLanguage();
  const t = translations[language].results;
  const [selectedCountry, setSelectedCountry] = useState<Country>('ALL');

  const results: ComparisonResult[] = Object.values(PROVIDERS).map((provider) => {
    const breakdown = calculateFees(amount, currency, provider.id);
    return {
      provider,
      breakdown,
      isCheapest: false
    };
  });

  // Filter by country
  const filteredResults = results.filter((result) => {
    if (selectedCountry === 'ALL') return true;
    return result.provider.country === selectedCountry || result.provider.country === 'ALL';
  });

  // Get current provider fees (dynamic from Supabase or defaults)
  const PROVIDER_FEES = getProviderFees();

  // Calculate total charge for each provider and sort by it
  const resultsWithCharge = filteredResults.map((result) => {
    const fee = PROVIDER_FEES[result.provider.id];
    const totalCharge = fee === 'not_defined' || fee === undefined ? Infinity : result.breakdown.totalCost + (fee as number);
    return {
      ...result,
      totalCharge
    };
  });

  // Sort by total charge (lowest first, undefined fees last)
  resultsWithCharge.sort((a, b) => a.totalCharge - b.totalCharge);

  // Mark the cheapest (first one with defined fee)
  const cheapestIndex = resultsWithCharge.findIndex((r) => r.totalCharge !== Infinity);
  if (cheapestIndex !== -1) {
    resultsWithCharge[cheapestIndex].isCheapest = true;
  }

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="mt-4">
      <div className="flex flex-col gap-3 mb-4">
        <div className="flex items-center gap-2">
          <TrendingDown className="w-4 h-4 text-emerald-600" />
          <h3 className="text-lg font-bold text-gray-900">{t.title}</h3>
        </div>

        {/* Country Filter */}
        <div className="flex flex-col gap-2">
          <span className="text-xs text-gray-600">{t.filterByCountry}:</span>
          <div className="flex gap-2 flex-wrap">
            <button
              onClick={() => setSelectedCountry('ALL')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                selectedCountry === 'ALL'
                  ? 'bg-emerald-500 text-white shadow-md'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {t.allCountries}
            </button>
            <button
              onClick={() => setSelectedCountry('SN')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                selectedCountry === 'SN'
                  ? 'bg-emerald-500 text-white shadow-md'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              🇸🇳 {t.senegal}
            </button>
            <button
              onClick={() => setSelectedCountry('CI')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                selectedCountry === 'CI'
                  ? 'bg-emerald-500 text-white shadow-md'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              🇨🇮 {t.coteDivoire}
            </button>
          </div>
        </div>
      </div>

      <div className="space-y-3 max-h-96 overflow-y-auto">
        {resultsWithCharge.map((result, index) => {
          const fee = PROVIDER_FEES[result.provider.id];
          const feeDisplay = fee === 'not_defined' || fee === undefined ? t.feeNotSpecified : formatXOF(fee);
          const totalChargeDisplay = result.totalCharge === Infinity ? t.feeNotSpecified : formatXOF(result.totalCharge);
          
          // Calculate savings compared to cheapest option
          const cheapestCharge = resultsWithCharge[cheapestIndex]?.totalCharge;
          const savingsAmount =
            result.totalCharge === Infinity || cheapestCharge === Infinity
              ? null
              : result.totalCharge - cheapestCharge;

          return (
            <motion.div
              key={result.provider.id}
              variants={item}
              className={`relative bg-white rounded-lg p-4 border-2 transition-all ${
                result.isCheapest ? 'border-emerald-500 shadow-lg' : 'border-gray-200 shadow-sm'
              }`}
            >
              {result.isCheapest && (
                <div className="absolute -top-2 left-4 bg-emerald-500 text-white text-xs font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                  <Crown className="w-3 h-3" />
                  {t.bestOption}
                </div>
              )}

              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className={`w-10 h-10 ${result.provider.bgColor} rounded-lg flex items-center justify-center overflow-hidden`}>
                    <ProviderLogo provider={result.provider} size="lg" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-gray-900">{result.provider.name}</h4>
                    <p className="text-xs text-gray-500">
                      #{index + 1} {t.mostAffordable}
                    </p>
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-lg font-bold text-gray-900">{totalChargeDisplay}</div>
                  <div className="text-xs text-gray-500">{t.totalCharge}</div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-3 border-t border-gray-100">
                <div>
                  <div className="text-xs text-gray-500 mb-1">{t.conversionRate}</div>
                  <div className="text-xs font-semibold text-gray-900">
                    {formatXOF(result.breakdown.totalCost)}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-gray-500 mb-1">{t.fee}</div>
                  <div className="text-xs font-semibold text-gray-900">{feeDisplay}</div>
                </div>
                <div>
                  <div className="text-xs text-gray-500 mb-1">{t.fxRate}</div>
                  <div className="text-xs font-semibold text-gray-900">
                    {currency === 'XOF' ? '1:1' : `${result.breakdown.displayedFxRate} XOF`}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-gray-500 mb-1">{t.savings}</div>
                  <div
                    className={`text-xs font-semibold ${
                      result.isCheapest || savingsAmount === null ? 'text-gray-900' : 'text-red-600'
                    }`}
                  >
                    {result.isCheapest || savingsAmount === null ? '—' : `+${formatXOF(savingsAmount)}`}
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
        <p className="text-xs text-blue-900">
          <strong>Note:</strong> {t.note}
        </p>
      </div>
    </motion.div>
  );
}

