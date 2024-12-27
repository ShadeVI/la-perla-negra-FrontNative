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
  categoryNumber,
}`

const QUERY_DISHES = `*[_type == 'dish']{
  _id,
  title,
  "imageUrl": image.asset -> url,
  "slug": slug.current,
  dishNumber,
  isHighlighted,
  description,
  price,
  "categoryNumber": category -> categoryNumber,
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
  categoryNumber: number
}

export const fetchCategories = async (): Promise<Category[]> => {
  return await client.fetch(QUERY_CATEGORIES)
}

export interface Dish {
  _id: string;
  title: {
    [key: string]: string;
  };
  description: {
    [key: string]: string;
  };
  price: number;
  slug: string;
  imageUrl: string;
  dishNumber: number;
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