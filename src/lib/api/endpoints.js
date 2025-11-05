// src/lib/api/endpoints.js

/**
 * API Endpoints Configuration
 * Centralized place for all API endpoints
 */

const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:8000/api'

export const API_ENDPOINTS = {
  // Auth endpoints
  AUTH: {
    LOGIN: '/auth/login/',
    REGISTER: '/auth/register/',
  },

  // Patient endpoints
  PATIENTS: {
    LIST: '/patients/',
    CREATE: '/patients/',
    DETAIL: (id) => `/patients/${id}/`,
    UPDATE: (id) => `/patients/${id}/`,
    DELETE: (id) => `/patients/${id}/`,
  },

  // Doctor endpoints
  DOCTORS: {
    LIST: '/doctors/',
    CREATE: '/doctors/',
    DETAIL: (id) => `/doctors/${id}/`,
    UPDATE: (id) => `/doctors/${id}/`,
    DELETE: (id) => `/doctors/${id}/`,
  },

  // Mapping endpoints
  MAPPINGS: {
    LIST: '/mappings/',
    CREATE: '/mappings/',
    BY_PATIENT: (patientId) => `/mappings/${patientId}/`,
    DELETE: (id) => `/mappings/${id}/`,
  },
}

export { BASE_URL }