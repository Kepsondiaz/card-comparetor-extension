export const translations = {
  fr: {
    calculator: {
      title: 'Comparer les coûts de paiement',
      subtitle: 'Entrez les détails de votre paiement pour voir quel fournisseur offre le meilleur taux',
      amountLabel: 'Montant du paiement',
      currencyLabel: 'Devise',
      compareButton: 'Comparer les fournisseurs',
      currencyEur: 'EUR (Euro)',
      currencyUsd: 'USD (Dollar américain)',
      currencyXof: 'XOF (Franc CFA)'
    },
    todayRates: {
      title: "Taux d'aujourd'hui",
      subtitle: 'Taux de change actuels pour tous les fournisseurs',
      perUnit: 'pour 1',
      bestRate: 'MEILLEUR TAUX'
    },
    results: {
      title: 'Résultats de la comparaison',
      bestOption: 'MEILLEURE OPTION',
      mostAffordable: 'Le plus abordable',
      totalCost: 'Coût total',
      conversionRate: 'Taux de conversion',
      totalCharge: 'Montant facturé',
      fxRate: 'Taux de change',
      savings: 'Différence',
      fee: 'Frais',
      feeNotSpecified: 'Frais non communiqués',
      note: "Ces calculs utilisent les taux de change actuels. Les coûts réels peuvent varier légèrement. Vérifiez toujours le montant final dans l'application de votre fournisseur avant de confirmer le paiement.",
      filterByCountry: 'Filtrer par pays',
      allCountries: 'Tous les pays',
      senegal: 'Sénégal',
      coteDivoire: "Côte d'Ivoire"
    }
  },
  en: {
    calculator: {
      title: 'Compare payment costs',
      subtitle: 'Enter your payment details to see which provider offers the best rate',
      amountLabel: 'Payment amount',
      currencyLabel: 'Currency',
      compareButton: 'Compare providers',
      currencyEur: 'EUR (Euro)',
      currencyUsd: 'USD (US Dollar)',
      currencyXof: 'XOF (West African CFA)'
    },
    todayRates: {
      title: "Today's Rates",
      subtitle: 'Current exchange rates across all providers',
      perUnit: 'per 1',
      bestRate: 'BEST RATE'
    },
    results: {
      title: 'Comparison results',
      bestOption: 'BEST OPTION',
      mostAffordable: 'Most affordable',
      totalCost: 'Total cost',
      conversionRate: 'Conversion rate',
      totalCharge: 'Total charge',
      fxRate: 'FX Rate',
      savings: 'Difference',
      fee: 'Fee',
      feeNotSpecified: 'Fees not disclosed',
      note: "These calculations use current exchange rates. Actual costs may vary slightly. Always verify the final amount in your provider's app before confirming payment.",
      filterByCountry: 'Filter by country',
      allCountries: 'All countries',
      senegal: 'Senegal',
      coteDivoire: 'Ivory Coast'
    }
  }
};

export type TranslationKey = keyof typeof translations.fr;

