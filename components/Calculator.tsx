import React, { useState } from 'react';
import { Calculator as CalcIcon } from 'lucide-react';
import { Currency } from '../types/calculator';
import { ComparisonResults } from './ComparisonResults';
import { useLanguage } from '../contexts/LanguageContext';
import { translations } from '../utils/translations';
import { calculateFees, PROVIDERS } from '../utils/feeCalculator';
import { trackCompareProviders } from '../utils/analytics';

export function Calculator() {
  const [amount, setAmount] = useState<string>('');
  const [currency, setCurrency] = useState<Currency>('EUR');
  const [showResults, setShowResults] = useState(false);
  const { language } = useLanguage();
  const t = translations[language].calculator;

  const handleCompare = () => {
    if (amount && parseFloat(amount) > 0) {
      setShowResults(true);
      // Calculate results for tracking
      const amountNum = parseFloat(amount);
      const djamoBreakdown = calculateFees(amountNum, currency, 'djamo');
      const waveBreakdown = calculateFees(amountNum, currency, 'wave');
      const cheapestProvider = djamoBreakdown.totalCost < waveBreakdown.totalCost ? 'Djamo' : 'Wave';
      const savings = Math.abs(djamoBreakdown.totalCost - waveBreakdown.totalCost);
      
      // Track the comparison event
      trackCompareProviders({
        amount: amountNum,
        currency,
        djamoTotalCost: djamoBreakdown.totalCost,
        waveTotalCost: waveBreakdown.totalCost,
        cheapestProvider,
        savings
      });
    }
  };

  const handleAmountChange = (value: string) => {
    // Only allow numbers and decimal point
    if (value === '' || /^\d*\.?\d*$/.test(value)) {
      setAmount(value);
      setShowResults(false);
    }
  };

  return (
    <section className="py-4 bg-white">
      <div className="px-4">
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-gray-900 rounded-xl mb-3">
            <CalcIcon className="w-6 h-6 text-white" />
          </div>
          <h2 className="text-xl font-bold text-gray-900">{t.title}</h2>
          <p className="mt-2 text-sm text-gray-600">{t.subtitle}</p>
        </div>

        <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label htmlFor="amount" className="block text-xs font-medium text-gray-700 mb-1">
                {t.amountLabel}
              </label>
              <input
                id="amount"
                type="text"
                inputMode="decimal"
                value={amount}
                onChange={(e) => handleAmountChange(e.target.value)}
                placeholder="50"
                className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-gray-900 focus:border-transparent outline-none text-sm"
              />
            </div>

            <div>
              <label htmlFor="currency" className="block text-xs font-medium text-gray-700 mb-1">
                {t.currencyLabel}
              </label>
              <select
                id="currency"
                value={currency}
                onChange={(e) => {
                  setCurrency(e.target.value as Currency);
                  setShowResults(false);
                }}
                className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-gray-900 focus:border-transparent outline-none text-sm bg-white"
              >
                <option value="EUR">{t.currencyEur}</option>
                <option value="USD">{t.currencyUsd}</option>
                <option value="XOF">{t.currencyXof}</option>
              </select>
            </div>
          </div>

          <button
            onClick={handleCompare}
            disabled={!amount || parseFloat(amount) <= 0}
            className="w-full bg-gray-900 text-white px-4 py-3 rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            {t.compareButton}
          </button>
        </div>

        {showResults && amount && (
          <ComparisonResults amount={parseFloat(amount)} currency={currency} />
        )}
      </div>
    </section>
  );
}

