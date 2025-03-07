export type AllowedLanguages = "es" | "en" | "de"

type AllowedDictionaryKeys = "tab-home" | "tab-explore-menu" | "tab-memo" | "ingredients" | "btn-add-memo" | "no-data-found" | "memo-title" | "btn-memo-reset-text" | "sparkling" | "rose" | "red" | "white" | "btn-remove-filters" | "btn-go-to-memo" | "no-categories-found" | "text-product-in-list"

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
  "no-categories-found": {
    "es": "No se encontraron categorías.",
    "en": "No categories found.",
    "de": "Keine Kategorien gefunden."
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
  },
  "sparkling": {
    "es": "Espumoso",
    "en": "Sparkling",
    "de": "Perlwein"
  },
  "rose": {
    "es": "Rosado",
    "en": "Rose",
    "de": "Rosé"
  },
  "red": {
    "es": "Tinto",
    "en": "Red",
    "de": "Rot"
  },
  "white": {
    "es": "Blanco",
    "en": "White",
    "de": "Weiß"
  },
  "btn-remove-filters": {
    "es": "Eliminar filtros",
    "en": "Remove filters",
    "de": "Filter entfernen"
  },
  "btn-go-to-memo": {
    "es": "Ir a la lista",
    "en": "Go to memo",
    "de": "Zur Nachricht gehen"
  },
  "text-product-in-list": {
    "es": "en tu lista",
    "en": "in your list",
    "de": "in Ihrer Liste"
  }
}
