import { Language, LanguageCode } from '@types';

const languageToCode = (lang: Language): LanguageCode => {
  switch (lang) {
    case 'English':
      return 'en';
    default:
      return 'en';
  }
};

const languageFromCode = (code: LanguageCode): Language => {
  switch (code) {
    case 'en':
      return 'English';
    default:
      return 'English';
  }
};

export const LocalizationUtils = { languageToCode, languageFromCode };
