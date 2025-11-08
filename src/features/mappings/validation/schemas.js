// src/features/mappings/validation/schemas.js

import { z } from 'zod'

/**
 * Validation schema for patient-doctor mapping
 */

export const mappingSchema = z.object({
  patient: z
    .number()
    .positive('Please select a patient'),
  
  doctor: z
    .number()
    .positive('Please select a doctor'),
  
  notes: z
    .string()
    .max(500, 'Notes must not exceed 500 characters')
    .optional(),
  
  is_active: z
    .boolean()
    .default(true),
})