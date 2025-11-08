// src/features/patients/validation/schemas.js

import { z } from 'zod'

/**
 * Validation schema for patient forms
 */

export const patientSchema = z.object({
  name: z
    .string()
    .min(1, 'Name is required')
    .min(2, 'Name must be at least 2 characters')
    .max(255, 'Name must not exceed 255 characters'),
  
  email: z
    .string()
    .min(1, 'Email is required')
    .email('Invalid email address'),
  
  phone_number: z
    .string()
    .regex(/^\+?[1-9]\d{9,14}$/, 'Invalid phone number format (e.g., +1234567890)')
    .optional()
    .or(z.literal('')),
  
  address: z
    .string()
    .max(500, 'Address must not exceed 500 characters')
    .optional(),
  
  date_of_birth: z
    .string()
    .optional(),
  
  blood_group: z
    .enum(['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-', ''])
    .optional(),
  
  medical_history: z
    .string()
    .max(2000, 'Medical history must not exceed 2000 characters')
    .optional(),
})