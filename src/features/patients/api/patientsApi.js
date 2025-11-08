// src/features/patients/api/patientsApi.js

import apiClient from '../../../lib/api/apiClient'
import { API_ENDPOINTS } from '../../../lib/api/endpoints'

/**
 * Patients API functions
 */

export const patientsApi = {
  // Get all patients
  getAll: async () => {
    const response = await apiClient.get(API_ENDPOINTS.PATIENTS.LIST)
    return response.data
  },

  // Get single patient
  getById: async (id) => {
    const response = await apiClient.get(API_ENDPOINTS.PATIENTS.DETAIL(id))
    return response.data
  },

  // Create patient
  create: async (data) => {
    const response = await apiClient.post(API_ENDPOINTS.PATIENTS.CREATE, data)
    return response.data
  },

  // Update patient
  update: async (id, data) => {
    const response = await apiClient.put(API_ENDPOINTS.PATIENTS.UPDATE(id), data)
    return response.data
  },

  // Partial update patient
  partialUpdate: async (id, data) => {
    const response = await apiClient.patch(API_ENDPOINTS.PATIENTS.UPDATE(id), data)
    return response.data
  },

  // Delete patient
  delete: async (id) => {
    const response = await apiClient.delete(API_ENDPOINTS.PATIENTS.DELETE(id))
    return response.data
  },
}