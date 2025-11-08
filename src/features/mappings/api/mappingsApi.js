// src/features/mappings/api/mappingsApi.js

import apiClient from '../../../lib/api/apiClient'
import { API_ENDPOINTS } from '../../../lib/api/endpoints'

/**
 * Mappings API functions
 */

export const mappingsApi = {
  // Get all mappings
  getAll: async () => {
    const response = await apiClient.get(API_ENDPOINTS.MAPPINGS.LIST)
    return response.data
  },

  // Get doctors assigned to a specific patient
  getDoctorsByPatient: async (patientId) => {
    const response = await apiClient.get(API_ENDPOINTS.MAPPINGS.BY_PATIENT(patientId))
    return response.data
  },

  // Assign doctor to patient
  create: async (data) => {
    const response = await apiClient.post(API_ENDPOINTS.MAPPINGS.CREATE, data)
    return response.data
  },

  // Remove doctor from patient
  delete: async (id) => {
    const response = await apiClient.delete(API_ENDPOINTS.MAPPINGS.DELETE(id))
    return response.data
  },
}