import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import Rus from './ru.json'
import Eng from './en.json'


i18n.use(initReactI18next).init({
  resources: {
    ru: { translation: Rus },
    en: { translation: Eng },
  },
  lng: 'en', 
  fallbackLng: 'en', 
  interpolation: {
    escapeValue: false, 
},
});

export default i18n;
