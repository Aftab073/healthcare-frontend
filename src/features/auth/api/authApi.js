// src/features/auth/api/authApi.js

import apiClient from '../../../lib/api/apiClient'
import { API_ENDPOINTS } from '../../../lib/api/endpoints'

/**
 * Authentication API functions
 */

export const authApi = {
  // Login user
  login: async (credentials) => {
    const response = await apiClient.post(API_ENDPOINTS.AUTH.LOGIN, credentials)
    return response.data
  },

  // Register user
  register: async (userData) => {
    const response = await apiClient.post(API_ENDPOINTS.AUTH.REGISTER, userData)
    return response.data
  },
}