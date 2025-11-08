// src/features/doctors/hooks/useDoctors.js

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { doctorsApi } from '../api/doctorsApi'
import { QUERY_KEYS } from '../../../lib/utils/constants'
import toast from 'react-hot-toast'

export const useDoctors = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.DOCTORS],
    queryFn: doctorsApi.getAll,
  })
}

export const useDoctor = (id) => {
  return useQuery({
    queryKey: [QUERY_KEYS.DOCTOR_DETAIL, id],
    queryFn: () => doctorsApi.getById(id),
    enabled: !!id,
  })
}

export const useCreateDoctor = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: doctorsApi.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.DOCTORS] })
      toast.success('Doctor created successfully')
    },
    onError: (error) => {
      const message = error.response?.data?.error || 'Failed to create doctor'
      toast.error(message)
    },
  })
}

export const useUpdateDoctor = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, data }) => doctorsApi.update(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.DOCTORS] })
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.DOCTOR_DETAIL, variables.id] })
      toast.success('Doctor updated successfully')
    },
    onError: (error) => {
      const message = error.response?.data?.error || 'Failed to update doctor'
      toast.error(message)
    },
  })
}

export const useDeleteDoctor = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: doctorsApi.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.DOCTORS] })
      toast.success('Doctor deleted successfully')
    },
    onError: (error) => {
      const message = error.response?.data?.error || 'Failed to delete doctor'
      toast.error(message)
    },
  })
}