// src/lib/utils/constants.js

/**
 * Application constants
 */

export const BLOOD_GROUPS = [
  { value: 'A+', label: 'A+' },
  { value: 'A-', label: 'A-' },
  { value: 'B+', label: 'B+' },
  { value: 'B-', label: 'B-' },
  { value: 'O+', label: 'O+' },
  { value: 'O-', label: 'O-' },
  { value: 'AB+', label: 'AB+' },
  { value: 'AB-', label: 'AB-' },
]

export const SPECIALIZATIONS = [
  'Cardiologist',
  'Dermatologist',
  'Neurologist',
  'Orthopedic',
  'Pediatrician',
  'Psychiatrist',
  'Radiologist',
  'General Physician',
  'Surgeon',
  'Dentist',
]

export const TOAST_DURATION = 4000 // 4 seconds

export const QUERY_KEYS = {
  PATIENTS: 'patients',
  PATIENT_DETAIL: 'patient-detail',
  DOCTORS: 'doctors',
  DOCTOR_DETAIL: 'doctor-detail',
  MAPPINGS: 'mappings',
  PATIENT_DOCTORS: 'patient-doctors',
}