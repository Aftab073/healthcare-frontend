// src/features/mappings/components/AssignDoctorForm.jsx

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { mappingSchema } from '../validation/schemas'
import Button from '../../../components/ui/Button'
import { usePatients } from '../../patients/hooks/usePatients'
import { useDoctors } from '../../doctors/hooks/useDoctors'
import Spinner from '../../../components/ui/Spinner'

/**
 * Form to assign a doctor to a patient
 */

const AssignDoctorForm = ({ onSubmit, isLoading, onCancel }) => {
  const { data: patientsData, isLoading: loadingPatients } = usePatients()
  const { data: doctorsData, isLoading: loadingDoctors } = useDoctors()

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    resolver: zodResolver(mappingSchema),
    defaultValues: {
      patient: '',
      doctor: '',
      notes: '',
      is_active: true,
    },
  })

  const selectedPatientId = watch('patient')
  const selectedDoctorId = watch('doctor')

  const selectedPatient = patientsData?.patients?.find(
    (p) => p.id === parseInt(selectedPatientId)
  )
  const selectedDoctor = doctorsData?.doctors?.find(
    (d) => d.id === parseInt(selectedDoctorId)
  )

  if (loadingPatients || loadingDoctors) {
    return (
      <div className="py-12">
        <Spinner size="lg" className="mx-auto" />
        <p className="text-center text-gray-600 mt-4">Loading data...</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Patient Selection */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Select Patient <span className="text-error-500">*</span>
        </label>
        <select
          {...register('patient', { valueAsNumber: true })}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent disabled:bg-gray-100"
          disabled={isLoading}
        >
          <option value="">Choose a patient</option>
          {patientsData?.patients?.map((patient) => (
            <option key={patient.id} value={patient.id}>
              {patient.name} ({patient.email})
            </option>
          ))}
        </select>
        {errors.patient && (
          <p className="mt-1 text-sm text-error-500">{errors.patient.message}</p>
        )}
      </div>

      {/* Doctor Selection */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Select Doctor <span className="text-error-500">*</span>
        </label>
        <select
          {...register('doctor', { valueAsNumber: true })}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent disabled:bg-gray-100"
          disabled={isLoading}
        >
          <option value="">Choose a doctor</option>
          {doctorsData?.doctors
            ?.filter((doctor) => doctor.is_available)
            .map((doctor) => (
              <option key={doctor.id} value={doctor.id}>
                Dr. {doctor.name} - {doctor.specialization}
              </option>
            ))}
        </select>
        {errors.doctor && (
          <p className="mt-1 text-sm text-error-500">{errors.doctor.message}</p>
        )}
      </div>

      {/* Notes */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Notes (Optional)
        </label>
        <textarea
          {...register('notes')}
          rows={3}
          placeholder="Any special notes about this assignment..."
          className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent disabled:bg-gray-100 resize-none"
          disabled={isLoading}
        />
        {errors.notes && (
          <p className="mt-1 text-sm text-error-500">{errors.notes.message}</p>
        )}
      </div>

      {/* Preview */}
      {selectedPatient && selectedDoctor && (
        <div className="bg-primary-50 border border-primary-200 rounded-lg p-4">
          <h4 className="text-sm font-medium text-primary-900 mb-2">Assignment Preview:</h4>
          <p className="text-sm text-primary-800">
            <strong>{selectedPatient.name}</strong> will be assigned to{' '}
            <strong>Dr. {selectedDoctor.name}</strong> ({selectedDoctor.specialization})
          </p>
        </div>
      )}

      {/* Submit Buttons */}
      <div className="flex justify-end space-x-3 pt-6 border-t">
        <Button
          type="button"
          variant="secondary"
          onClick={onCancel}
          disabled={isLoading}
        >
          Cancel
        </Button>
        <Button type="submit" loading={isLoading} disabled={isLoading}>
          Assign Doctor
        </Button>
      </div>
    </form>
  )
}

export default AssignDoctorForm