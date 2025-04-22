import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import en from './locales/English.json';

i18n.use(initReactI18next).init({
  fallbackLng: 'en',
  debug: false,
  resources: {
    en: {
      translation: en
    }
  }
});

export default i18n;
