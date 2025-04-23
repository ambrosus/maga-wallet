import { Language, LanguageCode } from '@types';

export interface LanguageContext {
  changeCurrentLanguage: (language: Language) => Promise<void>;
  language: LanguageCode;
}
