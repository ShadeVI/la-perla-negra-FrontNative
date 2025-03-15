import { Allergen } from "@/lib/sanity/httpSanity";

type AllergensMapperType = {
  [key in Allergen]: {
    src: any
  }
}

export const ALLERGENS: AllergensMapperType = {
  "gluten": {
    src: require("@/assets/images/allergens/gluten.png")
  },
  "eggs": {
    src: require("@/assets/images/allergens/egg.png")
  },
  "fish": {
    src: require("@/assets/images/allergens/fish.png")
  },
  "dairy": {
    src: require("@/assets/images/allergens/dairy.png")
  },
  crustaceans: {
    src: require("@/assets/images/allergens/crustaceans.png")
  },
  peanuts: {
    src: require("@/assets/images/allergens/peanut.png")
  },
  soy: {
    src: require("@/assets/images/allergens/soy-bean.png")
  },
  "tree-nuts": {
    src: require("@/assets/images/allergens/nuts.png")
  },
  celery: {
    src: require("@/assets/images/allergens/celery.png")
  },
  mustard: {
    src: require("@/assets/images/allergens/mustard.png")
  },
  "sesame-seeds": {
    src: require("@/assets/images/allergens/sesame.png")
  },
  "sulfur-dioxide-and-sulfites": {
    src: require("@/assets/images/allergens/sulfur-dioxide-sulphites.png")
  },
  lupins: {
    src: require("@/assets/images/allergens/lupine.png")
  },
  mollusks: {
    src: require("@/assets/images/allergens/squid.png")
  }
}