// src/lib/api/queryClient.js

import { QueryClient } from '@tanstack/react-query'

/**
 * React Query Client Configuration
 */

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false, // Don't refetch on window focus
      retry: 1, // Retry failed requests once
      staleTime: 5 * 60 * 1000, // Data is fresh for 5 minutes
      cacheTime: 10 * 60 * 1000, // Cache data for 10 minutes
    },
    mutations: {
      retry: false, // Don't retry mutations
    },
  },
})