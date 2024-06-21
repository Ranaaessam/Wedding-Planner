
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import English from './locales/en.json';
import Arabic from './locales/ar.json';


const resources = {
  en: {
    translation: English,
  },
  ar: {
    translation: Arabic,
  },
};

i18n
  .use(initReactI18next) 
  .init({
    resources,
    lng: "en",
    interpolation: {
      escapeValue: false 
    }
  });

export default i18n;
