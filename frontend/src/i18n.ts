import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n.use(initReactI18next).init({
  resources: {
    id: { translation: { "Title": "Judul" } },
    en: { translation: { "Title": "Title" } }
  },
  lng: "id",
  fallbackLng: "id",
});

export default i18n;