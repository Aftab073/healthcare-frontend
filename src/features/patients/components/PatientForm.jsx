// src/features/patients/components/PatientForm.jsx

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { patientSchema } from '../validation/schemas'
import Input from '../../../components/ui/Input'
import Button from '../../../components/ui/Button'
import { BLOOD_GROUPS } from '../../../lib/utils/constants'

/**
 * Reusable Patient Form Component
 * Used for both create and edit
 */

const PatientForm = ({ onSubmit, defaultValues, isLoading, submitLabel = 'Save' }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(patientSchema),
    defaultValues: defaultValues || {
      name: '',
      email: '',
      phone_number: '',
      address: '',
      date_of_birth: '',
      blood_group: '',
      medical_history: '',
    },
  })

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Personal Information Section */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Personal Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input
            {...register('name')}
            label="Full Name"
            placeholder="Enter patient name"
            error={errors.name?.message}
            disabled={isLoading}
            required
          />

          <Input
            {...register('email')}
            label="Email"
            type="email"
            placeholder="patient@example.com"
            error={errors.email?.message}
            disabled={isLoading}
            required
          />

          <Input
            {...register('phone_number')}
            label="Phone Number"
            placeholder="+1234567890"
            error={errors.phone_number?.message}
            disabled={isLoading}
          />

          <Input
            {...register('date_of_birth')}
            label="Date of Birth"
            type="date"
            error={errors.date_of_birth?.message}
            disabled={isLoading}
          />
        </div>

        <div className="mt-6">
          <Input
            {...register('address')}
            label="Address"
            placeholder="Enter full address"
            error={errors.address?.message}
            disabled={isLoading}
          />
        </div>
      </div>

      {/* Medical Information Section */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Medical Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Blood Group
            </label>
            <select
              {...register('blood_group')}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent disabled:bg-gray-100"
              disabled={isLoading}
            >
              <option value="">Select blood group</option>
              {BLOOD_GROUPS.map((group) => (
                <option key={group.value} value={group.value}>
                  {group.label}
                </option>
              ))}
            </select>
            {errors.blood_group && (
              <p className="mt-1 text-sm text-error-500">{errors.blood_group.message}</p>
            )}
          </div>
        </div>

        <div className="mt-6">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Medical History
          </label>
          <textarea
            {...register('medical_history')}
            rows={4}
            placeholder="Any relevant medical history, allergies, or conditions..."
            className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent disabled:bg-gray-100 resize-none"
            disabled={isLoading}
          />
          {errors.medical_history && (
            <p className="mt-1 text-sm text-error-500">{errors.medical_history.message}</p>
          )}
        </div>
      </div>

      {/* Submit Button */}
      <div className="flex justify-end space-x-3 pt-6 border-t">
        <Button
          type="button"
          variant="secondary"
          onClick={() => window.history.back()}
          disabled={isLoading}
        >
          Cancel
        </Button>
        <Button type="submit" loading={isLoading} disabled={isLoading}>
          {submitLabel}
        </Button>
      </div>
    </form>
  )
}

export default PatientForm