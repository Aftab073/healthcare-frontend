// src/features/mappings/hooks/useMappings.js

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { mappingsApi } from '../api/mappingsApi'
import { QUERY_KEYS } from '../../../lib/utils/constants'
import toast from 'react-hot-toast'

/**
 * Custom hooks for mapping data management
 */

// Get all mappings
export const useMappings = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.MAPPINGS],
    queryFn: mappingsApi.getAll,
  })
}

// Get doctors for a specific patient
export const usePatientDoctors = (patientId) => {
  return useQuery({
    queryKey: [QUERY_KEYS.PATIENT_DOCTORS, patientId],
    queryFn: () => mappingsApi.getDoctorsByPatient(patientId),
    enabled: !!patientId,
  })
}

// Create mapping (assign doctor to patient)
export const useCreateMapping = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: mappingsApi.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.MAPPINGS] })
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.PATIENT_DOCTORS] })
      toast.success('Doctor assigned to patient successfully')
    },
    onError: (error) => {
      const message = error.response?.data?.error || 
                      error.response?.data?.details?.error?.[0] ||
                      'Failed to assign doctor'
      toast.error(message)
    },
  })
}

// Delete mapping
export const useDeleteMapping = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: mappingsApi.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.MAPPINGS] })
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.PATIENT_DOCTORS] })
      toast.success('Doctor removed from patient successfully')
    },
    onError: (error) => {
      const message = error.response?.data?.error || 'Failed to remove assignment'
      toast.error(message)
    },
  })
}