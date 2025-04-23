import { createContext, useContext } from 'react';
import { LanguageContext } from './types';

export const LocalizationContext = createContext<LanguageContext>({
  changeCurrentLanguage: async () => undefined,
  language: 'en'
});

export const useLocalization = () => useContext(LocalizationContext);
