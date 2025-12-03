import { useEffect, useState } from 'react';
import { fetchRatesFromSupabase, subscribeToRateUpdates } from '../utils/rateService';
import { updateRatesData } from '../utils/feeCalculator';
import { RatesData } from '../types/calculator';

/**
 * Custom hook to fetch and subscribe to exchange rates from Supabase
 * Automatically updates the fee calculator with new rates
 */
export function useExchangeRates() {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<string | null>(null);

  useEffect(() => {
    let unsubscribe: (() => void) | undefined;

    async function initializeRates() {
      try {
        setIsLoading(true);
        setError(null);

        // Fetch initial rates
        const ratesData = await fetchRatesFromSupabase();
        if (ratesData) {
          updateRatesData(ratesData);
          setLastUpdated(ratesData.lastUpdated);
        }

        // Subscribe to real-time updates
        unsubscribe = subscribeToRateUpdates((updatedData) => {
          if (updatedData) {
            updateRatesData(updatedData);
            setLastUpdated(updatedData.lastUpdated);
          }
        });

        setIsLoading(false);
      } catch (err) {
        setError('Failed to load exchange rates');
        setIsLoading(false);
      }
    }

    initializeRates();

    // Cleanup subscription on unmount
    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, []);

  return {
    isLoading,
    error,
    lastUpdated
  };
}

