// src/features/doctors/api/doctorsApi.js

import apiClient from '../../../lib/api/apiClient'
import { API_ENDPOINTS } from '../../../lib/api/endpoints'

export const doctorsApi = {
  getAll: async () => {
    const response = await apiClient.get(API_ENDPOINTS.DOCTORS.LIST)
    return response.data
  },

  getById: async (id) => {
    const response = await apiClient.get(API_ENDPOINTS.DOCTORS.DETAIL(id))
    return response.data
  },

  create: async (data) => {
    const response = await apiClient.post(API_ENDPOINTS.DOCTORS.CREATE, data)
    return response.data
  },

  update: async (id, data) => {
    const response = await apiClient.put(API_ENDPOINTS.DOCTORS.UPDATE(id), data)
    return response.data
  },

  delete: async (id) => {
    const response = await apiClient.delete(API_ENDPOINTS.DOCTORS.DELETE(id))
    return response.data
  },
}