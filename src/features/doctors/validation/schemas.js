// src/features/doctors/validation/schemas.js

import { z } from 'zod'

export const doctorSchema = z.object({
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
    .regex(/^\+?[1-9]\d{9,14}$/, 'Invalid phone number format (e.g., +1234567890)'),
  
  specialization: z
    .string()
    .min(1, 'Specialization is required'),
  
  qualification: z
    .string()
    .min(1, 'Qualification is required')
    .max(255, 'Qualification must not exceed 255 characters'),
  
  experience_years: z
    .number()
    .min(0, 'Experience cannot be negative')
    .max(70, 'Experience must be realistic'),
  
  license_number: z
    .string()
    .min(1, 'License number is required')
    .max(50, 'License number must not exceed 50 characters'),
  
  clinic_address: z
    .string()
    .min(1, 'Clinic address is required')
    .max(500, 'Clinic address must not exceed 500 characters'),
  
  consultation_fee: z
    .number()
    .min(0, 'Consultation fee cannot be negative'),
  
  is_available: z
    .boolean()
    .default(true),
})