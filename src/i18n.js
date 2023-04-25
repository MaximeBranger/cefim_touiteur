import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import LanguageDetector from 'i18next-browser-languagedetector';

import fr from './locales/fr.json';
import en from './locales/en.json';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'fr',
    debug: true,
    resources: {
        fr: {
            translation: fr
        },
        en: {
            translation: en
        }
    },
    bindI18n: 'loaded languageChanged',
    bindI18nStore: 'added',
    useSuspense: true,
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    }
  });


export default i18n;