import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import en from './translations/en.json';
import zh from './translations/zh.json';

type TranslationDict = typeof en;

const translations: Record<string, TranslationDict> = { en, zh };
const STORAGE_KEY = 'paperclip_language';

type I18nContextType = {
  lang: string;
  setLang: (lang: string) => void;
  t: (key: string) => string;
};

const I18nContext = createContext<I18nContextType>({
  lang: 'en',
  setLang: () => {},
  t: (key: string) => key,
});

function getNested(obj: TranslationDict | undefined, key: string): string {
  if (!obj) return key;
  const parts = key.split('.');
  let current: any = obj;
  for (const part of parts) {
    if (current == null || typeof current !== 'object') return key;
    current = current[part];
  }
  return typeof current === 'string' ? current : key;
}

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState(() => {
    try {
      return localStorage.getItem(STORAGE_KEY) || 'en';
    } catch {
      return 'en';
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch {}
  }, [lang]);

  const setLang = useCallback((newLang: string) => {
    setLangState(newLang);
  }, []);

  const t = useCallback(
    (key: string): string => {
      const dict = translations[lang] || translations.en;
      return getNested(dict, key);
    },
    [lang]
  );

  return (
    <I18nContext.Provider value={{ lang, setLang, t }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  return useContext(I18nContext);
}
