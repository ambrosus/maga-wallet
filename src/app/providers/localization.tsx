import 'moment/min/locales';
import { PropsWithChildren, useEffect, useState } from 'react';
import moment from 'moment';
import { LocalizationContext } from '@contexts/localization';
import { mmkv } from '@lib';
import { MMKV_KEYS } from '@lib/mmkv/keys';
import i18n from '@localization/i18n';
import { Language, LanguageCode } from '@types';
import { LocalizationUtils } from '@utils';

export const LocalizationProvider = ({ children }: PropsWithChildren) => {
  const [language, setLanguage] = useState<LanguageCode>('en');

  useEffect(() => {
    const locale = mmkv.getItem(MMKV_KEYS.localization);

    if (typeof locale === 'string') {
      setLanguage(LocalizationUtils.languageToCode(locale as Language));
      moment.locale(LocalizationUtils.languageToCode(locale as Language));
    } else {
      mmkv.setItem(MMKV_KEYS.localization, 'en');
      moment.locale('en');
      setLanguage('en');
    }
  }, []);

  const changeCurrentLanguage = async (newLanguage: Language) => {
    setLanguage(LocalizationUtils.languageToCode(newLanguage));
    moment.locale(LocalizationUtils.languageToCode(newLanguage));
    mmkv.setItem(MMKV_KEYS.localization, newLanguage);
  };

  useEffect(() => {
    i18n.changeLanguage(language);
  }, [language]);

  return (
    <LocalizationContext.Provider
      value={{
        language,
        changeCurrentLanguage
      }}
    >
      {children}
    </LocalizationContext.Provider>
  );
};
