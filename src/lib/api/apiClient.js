// src/lib/api/apiClient.js

import axios from 'axios'
import { BASE_URL } from './endpoints'
import tokenService from '../auth/tokenService'

/**
 * Axios instance with interceptors
 * Handles authentication and error responses
 */

const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // 10 seconds
})

// Request interceptor - Add auth token to requests
apiClient.interceptors.request.use(
  (config) => {
    const token = tokenService.getAccessToken()
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Response interceptor - Handle errors
apiClient.interceptors.response.use(
  (response) => {
    return response
  },
  async (error) => {
    const originalRequest = error.config

    // If error is 401 and we haven't tried to refresh yet
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true

      // For now, just logout on 401
      // TODO: Implement token refresh logic if backend supports it
      tokenService.removeTokens()
      window.location.href = '/login'
      return Promise.reject(error)
    }

    // Handle other errors
    return Promise.reject(error)
  }
)

export default apiClient