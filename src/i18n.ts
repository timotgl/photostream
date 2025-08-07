import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import config from './config';
import translationDE from './i18n/locales/de_DE.json';
import translationEN from './i18n/locales/en_US.json';

const resources = {
  'de-DE': {
    translation: translationDE,
  },
  'en-US': {
    translation: translationEN,
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: config.LOCALE,
  fallbackLng: 'en-US',

  interpolation: {
    escapeValue: false, // React already escapes by default
  },
});

export default i18n;
