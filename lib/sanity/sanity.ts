import { createClient } from '@sanity/client'
const { EXPO_PUBLIC_SANITY_PROJECT_ID, EXPO_PUBLIC_SANITY_DATASET, EXPO_PUBLIC_SANITY_API_VERSION } = process.env
// Import using ESM URL imports in environments that supports it:
// import {createClient} from 'https://esm.sh/@sanity/client'

export const client = createClient({
  projectId: EXPO_PUBLIC_SANITY_PROJECT_ID,
  dataset: EXPO_PUBLIC_SANITY_DATASET,
  useCdn: false, // set to `false` to bypass the edge cache
  apiVersion: EXPO_PUBLIC_SANITY_API_VERSION, // use current date (YYYY-MM-DD) to target the latest API version
  // token: process.env.SANITY_SECRET_TOKEN // Needed for certain operations like updating content or accessing previewDrafts perspective
})