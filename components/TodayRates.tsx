import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TrendingUp, Crown, ChevronDown } from 'lucide-react';
import { PROVIDERS, getProviderFees } from '../utils/feeCalculator';
import { useLanguage } from '../contexts/LanguageContext';
import { translations } from '../utils/translations';
import { Currency, Provider, ProviderInfo } from '../types/calculator';
import { calculateFees } from '../utils/feeCalculator';

// Component to handle logo display with fallback
function ProviderLogo({ provider }: { provider: ProviderInfo }) {
  const [imageError, setImageError] = useState(false);

  if (!provider.logoUrl || imageError) {
    return (
      <span className={`text-sm font-bold ${provider.color}`}>
        {provider.name.charAt(0)}
      </span>
    );
  }

  return (
    <img
      src={provider.logoUrl}
      alt={provider.name}
      className="w-6 h-6 object-contain"
      onError={() => setImageError(true)}
    />
  );
}

type RateCurrency = 'EUR' | 'USD';

export function TodayRates() {
  const [selectedCurrency, setSelectedCurrency] = useState<RateCurrency>('EUR');
  const [isCollapsed, setIsCollapsed] = useState(true);
  const { language } = useLanguage();
  const t = translations[language].todayRates;

  // Helper to get current rates
  const getCalculationRatesForDisplay = () => {
    const rates: Record<string, Record<string, number>> = {};
    Object.values(PROVIDERS).forEach((provider) => {
      try {
        const eurRate = calculateFees(1, 'EUR', provider.id);
        const usdRate = calculateFees(1, 'USD', provider.id);
        rates[provider.id] = {
          EUR: eurRate?.displayedFxRate || 0,
          USD: usdRate?.displayedFxRate || 0
        };
      } catch (error) {
        console.warn(`Error calculating rates for ${provider.id}:`, error);
        rates[provider.id] = { EUR: 0, USD: 0 };
      }
    });
    return rates;
  };

  const rates = getCalculationRatesForDisplay();
  
  // Safety check: ensure rates object is valid
  if (!rates || Object.keys(rates).length === 0) {
    return (
      <section className="py-4 bg-gray-50 border-t border-gray-200">
        <div className="px-4 text-center text-sm text-gray-500">
          Unable to load rates at this time.
        </div>
      </section>
    );
  }

  // Sort providers by rate (lowest/best first)
  const sortedProviders = Object.values(PROVIDERS).sort((a, b) => {
    const rateA = rates[a.id]?.[selectedCurrency] || 0;
    const rateB = rates[b.id]?.[selectedCurrency] || 0;
    return rateA - rateB;
  });

  // Find the best (lowest) rate (only consider rates > 0)
  const validRates = sortedProviders
    .map((p) => rates[p.id]?.[selectedCurrency] || 0)
    .filter((r) => r > 0);
  const bestRate = validRates.length > 0 ? Math.min(...validRates) : 0;

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
    <section className="py-4 bg-gray-50 border-t border-gray-200">
      <div className="px-4">
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="w-full flex items-center justify-between mb-3"
        >
          <div className="flex items-center gap-2">
            <div className="inline-flex items-center justify-center w-10 h-10 bg-gray-900 rounded-lg">
              <TrendingUp className="w-5 h-5 text-white" />
            </div>
            <div className="text-left">
              <h3 className="text-sm font-bold text-gray-900">{t.title}</h3>
              <p className="text-xs text-gray-600">{t.subtitle}</p>
            </div>
          </div>
          <ChevronDown
            className={`w-5 h-5 text-gray-600 transition-transform ${
              isCollapsed ? '' : 'rotate-180'
            }`}
          />
        </button>

        <AnimatePresence>
          {!isCollapsed && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden"
            >
              <div className="mb-3 inline-flex items-center gap-2 bg-white rounded-lg p-1 shadow-sm border border-gray-200">
                <button
                  onClick={() => setSelectedCurrency('EUR')}
                  className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
                    selectedCurrency === 'EUR'
                      ? 'bg-gray-900 text-white shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  EUR
                </button>
                <button
                  onClick={() => setSelectedCurrency('USD')}
                  className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
                    selectedCurrency === 'USD'
                      ? 'bg-gray-900 text-white shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  USD
                </button>
              </div>

              <motion.div
                variants={container}
                initial="hidden"
                animate="show"
                className="grid grid-cols-2 gap-3"
              >
                {sortedProviders.map((provider) => {
                  const rate = rates[provider.id]?.[selectedCurrency] || 0;
                  const isBestRate = rate === bestRate && rate > 0;
                  return (
                    <motion.div
                      key={provider.id}
                      variants={item}
                      className={`relative bg-white rounded-lg p-3 border-2 transition-all ${
                        isBestRate ? 'border-emerald-500 shadow-lg' : 'border-gray-200'
                      }`}
                    >
                      {isBestRate && (
                        <div className="absolute -top-2 left-1/2 -translate-x-1/2 bg-emerald-500 text-white text-xs font-bold px-2 py-0.5 rounded-full flex items-center gap-1 whitespace-nowrap">
                          <Crown className="w-3 h-3" />
                          {t.bestRate}
                        </div>
                      )}

                      <div className="flex items-center gap-2 mb-2">
                        <div className={`w-8 h-8 ${provider.bgColor} rounded-lg flex items-center justify-center overflow-hidden`}>
                          <ProviderLogo provider={provider} />
                        </div>
                        <div>
                          <h4 className="font-bold text-gray-900 text-xs">{provider.name}</h4>
                        </div>
                      </div>

                      <div className="text-center py-2">
                        <div
                          className={`text-xl font-bold ${
                            isBestRate ? 'text-emerald-600' : 'text-gray-900'
                          }`}
                        >
                          {rate.toLocaleString('fr-FR', {
                            minimumFractionDigits: 0,
                            maximumFractionDigits: 3
                          })}
                        </div>
                        <div className="text-xs text-gray-500 mt-1">
                          XOF {t.perUnit} {selectedCurrency}
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

