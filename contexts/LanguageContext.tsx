import React, { useState, createContext, useContext, useEffect, ReactNode } from 'react';
import { trackLanguageChange } from '../utils/analytics';

export type Language = 'fr' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>('fr');
  const [isLoaded, setIsLoaded] = useState(false);

  // Load language preference from Chrome storage on mount
  useEffect(() => {
    chrome.storage.local.get(['language'], (result) => {
      if (result.language && (result.language === 'fr' || result.language === 'en')) {
        setLanguageState(result.language);
      }
      setIsLoaded(true);
    });
  }, []);

  const handleSetLanguage = (lang: Language) => {
    setLanguageState(lang);
    // Save to Chrome storage
    chrome.storage.local.set({ language: lang }, () => {
      trackLanguageChange(lang);
    });
  };

  // Show a loading state instead of returning null (prevents white screen)
  if (!isLoaded) {
    return (
      <div style={{ padding: '20px', textAlign: 'center', fontFamily: 'Arial, sans-serif' }}>
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}

