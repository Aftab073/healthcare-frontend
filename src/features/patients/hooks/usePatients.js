// src/features/patients/hooks/usePatients.js

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { patientsApi } from '../api/patientsApi'
import { QUERY_KEYS } from '../../../lib/utils/constants'
import toast from 'react-hot-toast'

/**
 * Custom hooks for patient data management
 */

// Get all patients
export const usePatients = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.PATIENTS],
    queryFn: patientsApi.getAll,
  })
}

// Get single patient
export const usePatient = (id) => {
  return useQuery({
    queryKey: [QUERY_KEYS.PATIENT_DETAIL, id],
    queryFn: () => patientsApi.getById(id),
    enabled: !!id, // Only run query if id exists
  })
}

// Create patient
export const useCreatePatient = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: patientsApi.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.PATIENTS] })
      toast.success('Patient created successfully')
    },
    onError: (error) => {
      const message = error.response?.data?.error || 'Failed to create patient'
      toast.error(message)
    },
  })
}

// Update patient
export const useUpdatePatient = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, data }) => patientsApi.update(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.PATIENTS] })
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.PATIENT_DETAIL, variables.id] })
      toast.success('Patient updated successfully')
    },
    onError: (error) => {
      const message = error.response?.data?.error || 'Failed to update patient'
      toast.error(message)
    },
  })
}

// Delete patient
export const useDeletePatient = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: patientsApi.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.PATIENTS] })
      toast.success('Patient deleted successfully')
    },
    onError: (error) => {
      const message = error.response?.data?.error || 'Failed to delete patient'
      toast.error(message)
    },
  })
}