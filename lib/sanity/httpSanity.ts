import { client } from "./sanity"

const QUERY_SUPPORTED_LANGUAGES = `*[_type == 'supportedLanguages']{
  id,
  title,
  isDefault
}`

export const fetchSupportedLanguages = async () => {
  const result = await client.fetch(QUERY_SUPPORTED_LANGUAGES)
  return result
}