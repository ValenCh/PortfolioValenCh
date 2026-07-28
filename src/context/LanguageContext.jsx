import { createContext, useContext, useEffect, useState, useCallback } from 'react';

const LanguageContext = createContext(null);
const STORAGE_KEY = 'vch-portfolio-lang';

function getInitialLanguage() {
  if (typeof window === 'undefined') return 'es';
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored === 'es' || stored === 'en') return stored;
  } catch {
    /* localStorage no disponible */
  }
  return 'es';
}

export function LanguageProvider({ children }) {
  const [language, setLanguageState] = useState(getInitialLanguage);

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, language);
    } catch {
      /* noop */
    }
    document.documentElement.lang = language;
  }, [language]);

  const setLanguage = useCallback((lang) => {
    setLanguageState(lang === 'en' ? 'en' : 'es');
  }, []);

  const toggleLanguage = useCallback(() => {
    setLanguageState((prev) => (prev === 'es' ? 'en' : 'es'));
  }, []);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error('useLanguage debe usarse dentro de un <LanguageProvider>');
  }
  return ctx;
}