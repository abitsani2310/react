import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { indonesia } from "./id";
import { english } from "./en";
import { arabic } from "./ar";

// the translations
// (tip move them in a JSON file and import them,
// or even better, manage them separated from your code: https://react.i18next.com/guides/multiple-translation-files)
const resources = {
  id: {
    translation: indonesia,
  },
  en: {
      translation: english,
    },
  ar: {
    translation: arabic,
  },
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: "id", // language to use, more information here: https://www.i18next.com/overview/configuration-options#languages-namespaces-resources
    fallbackLng: "id",
    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  });

export default i18n;
