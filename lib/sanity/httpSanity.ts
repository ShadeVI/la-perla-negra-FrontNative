import { PortableTextBlock } from "@portabletext/react"
import { client } from "./sanity"

const QUERY_SUPPORTED_LANGUAGES = `*[_type == 'supportedLanguages']{
  id,
  title,
  isDefault
}`

const QUERY_CATEGORIES = `*[_type == 'category']{
  _id,
  title,
  "slug": slug.current,
  identifierNumber,
}`

const QUERY_DISHES = `*[_type in ['dish', 'drink', 'wine', 'cocktail', 'beer', 'coffee']]{
  ...,
  _type,
  _id,
  title,
  "imageUrl": image.asset -> url,
  "verticalImageUrl": verticalImage.asset -> url,
  "slug": slug.current,
  identifierNumber,
  isHighlighted,
  description,
  price,
  "categoryNumber": category -> identifierNumber,
  ingredients[]->{
    name,
    _id
  },
  isVisible,
  type
}`

export interface MultiLanguageStringField {
  [key: string]: string
}


export const fetchSupportedLanguages = async () => {
  return await client.fetch(QUERY_SUPPORTED_LANGUAGES)
}

export interface Category {
  _id: string,
  title: MultiLanguageStringField,
  slug: string,
  identifierNumber: number
}

export const fetchCategories = async (): Promise<Category[]> => {
  return await client.fetch(QUERY_CATEGORIES)
}



export enum SanityDocumentTypes {
  DISH = 'dish',
  DRINK = 'drink',
  WINE = 'wine',
  COCKTAIL = 'cocktail',
  BEER = 'beer',
  COFFEE = 'coffee'
}

export type SanityAllowedDocumentTypes = SanityDocumentTypes.DISH | SanityDocumentTypes.DRINK | SanityDocumentTypes.WINE | SanityDocumentTypes.COCKTAIL | SanityDocumentTypes.BEER | SanityDocumentTypes.COFFEE

type Ingredient = {
  name: MultiLanguageStringField;
  _id: string;
}

export interface BaseData {
  _id: string;
  _type: SanityAllowedDocumentTypes;
  title: MultiLanguageStringField;
  description: { [key: string]: PortableTextBlock[] };
  price: number;
  slug: string;
  imageUrl: string;
  identifierNumber: number;
  isHighlighted: boolean;
  categoryNumber: number;
  ingredients: Ingredient[];
  isVisible: boolean;
}

export interface Dish extends BaseData {
}

export enum WineType {
  RED = 'red',
  WHITE = 'white',
  ROSE = 'rose',
  SPARKLING = 'sparkling',
}

export interface Wine extends BaseData {
  isAlchohol: boolean;
  verticalImageUrl: string;
  type: WineType;
}

export interface Drink extends BaseData {
  isAlchohol: boolean;
}

export interface Cocktail extends BaseData {
  isAlchohol: boolean;
}

export interface Beer extends BaseData {
  isAlchohol: boolean;
}

export interface Coffee extends BaseData {
  isAlchohol: boolean;
}

export type GenericSimpleDescriptionDrink = Drink | Beer | Cocktail | Coffee

export type SanityReturnData = (Dish | Wine | GenericSimpleDescriptionDrink)

export const fetchData = async (): Promise<SanityReturnData[]> => {
  return await client.fetch(QUERY_DISHES)
}