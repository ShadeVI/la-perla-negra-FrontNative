import { AllowedLanguages, dictionary } from "@/constants/Dictionary";
import { useLanguage } from "@/context/Language";
import { MultiLanguageStringField } from "@/lib/sanity/httpSanity";

export function useTextTranslation() {
  const { selectedLanguage } = useLanguage()

  function translateInAppText(key: keyof typeof dictionary) {
    return dictionary[key][selectedLanguage?.id as AllowedLanguages || "es"] || dictionary[key].es;
  }

  function translateCMSText(object: MultiLanguageStringField) {
    return object[selectedLanguage?.id as AllowedLanguages || "es"] || object.es;
  }

  return {
    translateInAppText,
    translateCMSText
  };
}