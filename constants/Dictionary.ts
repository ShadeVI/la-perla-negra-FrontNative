export type AllowedLanguages = "es" | "en" | "de"

type AllowedDictionaryKeys = "tab-home" | "tab-explore-menu" | "tab-memo" | "ingredients" | "btn-add-memo" | "no-data-found" | "memo-title" | "btn-memo-reset-text"

export const dictionary: Record<AllowedDictionaryKeys, Record<AllowedLanguages, string>> = {
  "tab-home": {
    "es": "Inicio",
    "en": "Home",
    "de": "Start"
  },
  "tab-explore-menu": {
    "es": "Explorar la carta",
    "en": "Explore menu",
    "de": "Menü erkunden"
  },
  "tab-memo": {
    "es": "Tu lista",
    "en": "Your memo",
    "de": "Ihre Nachricht"
  },
  "ingredients": {
    "es": "Ingredientes",
    "en": "Ingredients",
    "de": "Zutaten"
  },
  "btn-add-memo": {
    "es": "Añadir a la lista",
    "en": "Add to memo",
    "de": "Zur Nachricht hinzufügen"
  },
  "no-data-found": {
    "es": "No se encontraron datos.",
    "en": "No data found.",
    "de": "Keine Daten gefunden."
  },
  "memo-title": {
    "es": "Tu lista",
    "en": "Your order list",
    "de": "Ihre Bestellliste"
  },
  "btn-memo-reset-text": {
    "es": "Limpiar lista",
    "en": "Clear list",
    "de": "Liste löschen"
  }
}
