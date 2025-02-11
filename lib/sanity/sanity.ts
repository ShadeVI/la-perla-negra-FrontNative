import { createClient } from '@sanity/client'
const SANITY_PROJECT_ID = process.env.EXPO_PUBLIC_SANITY_PROJECT_ID
const SANITY_DATASET = process.env.EXPO_PUBLIC_SANITY_DATASET
const SANITY_API_VERSION = process.env.EXPO_PUBLIC_SANITY_API_VERSION
// Import using ESM URL imports in environments that supports it:
// import {createClient} from 'https://esm.sh/@sanity/client'

export const client = createClient({
  projectId: SANITY_PROJECT_ID,
  dataset: SANITY_DATASET,
  useCdn: true, // set to `false` to bypass the edge cache
  apiVersion: SANITY_API_VERSION, // use current date (YYYY-MM-DD) to target the latest API version
  // token: process.env.SANITY_SECRET_TOKEN // Needed for certain operations like updating content or accessing previewDrafts perspective
})