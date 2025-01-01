import { PortableTextBlock, PortableTextTypeComponent } from "@portabletext/react"
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

export interface Dish {
  _id: string;
  _type: string;
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

export interface Wine {
  _id: string;
  _type: string;
  title: {
    [key: string]: string;
  };
  description: { [key: string]: PortableTextBlock[] };
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

export const fetchDishes = async (): Promise<Dish[]> => {
  return await client.fetch(QUERY_DISHES)
}