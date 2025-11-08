import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { doctorSchema } from '../validation/schemas'
import Input from '../../../components/ui/Input'
import Button from '../../../components/ui/Button'
import { SPECIALIZATIONS } from '../../../lib/utils/constants'

const DoctorForm = ({ onSubmit, defaultValues, isLoading, submitLabel = 'Save' }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(doctorSchema),
    defaultValues: defaultValues || {
      name: '',
      email: '',
      phone_number: '',
      specialization: '',
      qualification: '',
      experience_years: 0,
      license_number: '',
      clinic_address: '',
      consultation_fee: 0,
      is_available: true,
    },
  })

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Personal Information */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Personal Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input
            {...register('name')}
            label="Full Name"
            placeholder="Dr. John Smith"
            error={errors.name?.message}
            disabled={isLoading}
            required
          />

          <Input
            {...register('email')}
            label="Email"
            type="email"
            placeholder="doctor@hospital.com"
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
            required
          />
        </div>
      </div>

      {/* Professional Information */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Professional Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Specialization <span className="text-error-500">*</span>
            </label>
            <select
              {...register('specialization')}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent disabled:bg-gray-100"
              disabled={isLoading}
            >
              <option value="">Select specialization</option>
              {SPECIALIZATIONS.map((spec) => (
                <option key={spec} value={spec}>
                  {spec}
                </option>
              ))}
            </select>
            {errors.specialization && (
              <p className="mt-1 text-sm text-error-500">{errors.specialization.message}</p>
            )}
          </div>

          <Input
            {...register('qualification')}
            label="Qualification"
            placeholder="MBBS, MD"
            error={errors.qualification?.message}
            disabled={isLoading}
            required
          />

          <Input
            {...register('experience_years', { valueAsNumber: true })}
            label="Years of Experience"
            type="number"
            min="0"
            placeholder="10"
            error={errors.experience_years?.message}
            disabled={isLoading}
            required
          />

          <Input
            {...register('license_number')}
            label="License Number"
            placeholder="MED-2024-001"
            error={errors.license_number?.message}
            disabled={isLoading}
            required
          />
        </div>
      </div>

      {/* Practice Details */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Practice Details</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input
            {...register('consultation_fee', { valueAsNumber: true })}
            label="Consultation Fee"
            type="number"
            min="0"
            step="0.01"
            placeholder="150.00"
            error={errors.consultation_fee?.message}
            disabled={isLoading}
            required
          />

          <div className="flex items-center pt-8">
            <input
              {...register('is_available')}
              type="checkbox"
              id="is_available"
              className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
              disabled={isLoading}
            />
            <label htmlFor="is_available" className="ml-2 block text-sm text-gray-900">
              Currently accepting patients
            </label>
          </div>
        </div>

        <div className="mt-6">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Clinic Address <span className="text-error-500">*</span>
          </label>
          <textarea
            {...register('clinic_address')}
            rows={3}
            placeholder="Hospital/Clinic name, Street, City, State, ZIP"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent disabled:bg-gray-100 resize-none"
            disabled={isLoading}
          />
          {errors.clinic_address && (
            <p className="mt-1 text-sm text-error-500">{errors.clinic_address.message}</p>
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

export default DoctorForm