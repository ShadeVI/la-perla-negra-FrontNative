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
    src: ""
  },
  peanuts: {
    src: ""
  },
  soy: {
    src: ""
  },
  "tree-nuts": {
    src: ""
  },
  celery: {
    src: ""
  },
  mustard: {
    src: ""
  },
  "sesame-seeds": {
    src: ""
  },
  "sulfur-dioxide-and-sulfites": {
    src: ""
  },
  lupins: {
    src: ""
  },
  mollusks: {
    src: ""
  }
}