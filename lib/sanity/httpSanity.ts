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
  "slug": slug.current,
  identifierNumber,
  isHighlighted,
  description,
  price,
  "categoryNumber": category -> identifierNumber,
  ingredients[]->{
    name,
    _id
  }
}`

export interface CategoryTitle {
  [key: string]: string
}


export const fetchSupportedLanguages = async () => {
  return await client.fetch(QUERY_SUPPORTED_LANGUAGES)
}

export interface Category {
  _id: string,
  title: CategoryTitle,
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

interface BaseData {
  _id: string;
  _type: SanityAllowedDocumentTypes;
  title: {
    [key: string]: string;
  };
  description: {
    [key: string]: string;
  };
  price: number;
  slug: string;
  imageUrl: string;
  identifierNumber: number;
  isHighlighted: boolean;
  categoryNumber: number;
  ingredients: {
    name: {
      [key: string]: string;
    };
    _id: string;
  }[];
}

export interface Dish extends BaseData {
}

export interface Wine extends Omit<BaseData, 'description'> {
  description: { [key: string]: PortableTextBlock[] };
  isAlchohol: boolean;
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

export type ReturnData = (Dish | Wine | GenericSimpleDescriptionDrink)[]

export const fetchData = async (): Promise<ReturnData> => {
  return await client.fetch(QUERY_DISHES)
}