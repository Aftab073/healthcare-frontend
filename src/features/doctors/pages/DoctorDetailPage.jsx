import { useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Dialog } from '@headlessui/react'
import PageHeader from '../../../components/common/PageHeader'
import Card from '../../../components/ui/Card'
import Button from '../../../components/ui/Button'
import Spinner from '../../../components/ui/Spinner'
import DoctorForm from '../components/DoctorForm'
import { useDoctor, useUpdateDoctor, useDeleteDoctor } from '../hooks/useDoctors'
import { formatDate, formatCurrency, formatPhoneNumber } from '../../../lib/utils/formatters'

const DoctorDetailPage = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [isEditing, setIsEditing] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)

  const { data: doctor, isLoading, error } = useDoctor(id)
  const updateDoctor = useUpdateDoctor()
  const deleteDoctor = useDeleteDoctor()

  const handleUpdate = async (data) => {
    try {
      await updateDoctor.mutateAsync({ id, data })
      setIsEditing(false)
    } catch (error) {
      console.error('Failed to update doctor:', error)
    }
  }

  const handleDelete = async () => {
    try {
      await deleteDoctor.mutateAsync(id)
      navigate('/doctors')
    } catch (error) {
      console.error('Failed to delete doctor:', error)
    }
  }

  if (isLoading) {
    return (
      <div>
        <PageHeader title="Doctor Details" />
        <Card className="p-12">
          <Spinner size="lg" className="mx-auto" />
          <p className="text-center text-gray-600 mt-4">Loading doctor details...</p>
        </Card>
      </div>
    )
  }

  if (error) {
    return (
      <div>
        <PageHeader title="Doctor Details" />
        <Card className="p-6">
          <div className="text-center text-error-600">
            <p>Error loading doctor details. Doctor may not exist.</p>
            <Link to="/doctors" className="mt-4 inline-block">
              <Button variant="secondary">Back to Doctors</Button>
            </Link>
          </div>
        </Card>
      </div>
    )
  }

  return (
    <div>
      <PageHeader
        title={isEditing ? 'Edit Doctor' : 'Doctor Details'}
        subtitle={!isEditing && `Doctor ID: ${id}`}
        action={
          !isEditing && (
            <div className="flex space-x-3">
              <Button variant="danger" onClick={() => setShowDeleteModal(true)}>
                <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
                Delete
              </Button>
              <Button onClick={() => setIsEditing(true)}>
                <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
                Edit
              </Button>
            </div>
          )
        }
      />

      <Card className="p-6 max-w-4xl">
        {isEditing ? (
          <DoctorForm
            defaultValues={{
              name: doctor.name || '',
              email: doctor.email || '',
              phone_number: doctor.phone_number || '',
              specialization: doctor.specialization || '',
              qualification: doctor.qualification || '',
              experience_years: doctor.experience_years || 0,
              license_number: doctor.license_number || '',
              clinic_address: doctor.clinic_address || '',
              consultation_fee: parseFloat(doctor.consultation_fee) || 0,
              is_available: doctor.is_available !== undefined ? doctor.is_available : true,
            }}
            onSubmit={handleUpdate}
            isLoading={updateDoctor.isPending}
            submitLabel="Update Doctor"
          />
        ) : (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
            {/* Doctor Header */}
            <div className="flex items-center space-x-4 pb-6 border-b">
              <div className="w-20 h-20 bg-success-100 text-success-600 rounded-full flex items-center justify-center text-xl font-bold">
                Dr
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Dr. {doctor.name}</h2>
                <p className="text-primary-600 font-medium">{doctor.specialization}</p>
                <p className="text-gray-600">{doctor.email}</p>
              </div>
              {doctor.is_available ? (
                <span className="ml-auto inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-success-100 text-success-800">
                  Available
                </span>
              ) : (
                <span className="ml-auto inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-800">
                  Unavailable
                </span>
              )}
            </div>

            {/* Personal Information */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Personal Information</h3>
              <dl className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <dt className="text-sm font-medium text-gray-500">Email</dt>
                  <dd className="mt-1 text-sm text-gray-900">{doctor.email}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">Phone Number</dt>
                  <dd className="mt-1 text-sm text-gray-900">{formatPhoneNumber(doctor.phone_number)}</dd>
                </div>
              </dl>
            </div>

            {/* Professional Information */}
            <div className="pt-6 border-t">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Professional Information</h3>
              <dl className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <dt className="text-sm font-medium text-gray-500">Specialization</dt>
                  <dd className="mt-1 text-sm text-gray-900">{doctor.specialization}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">Qualification</dt>
                  <dd className="mt-1 text-sm text-gray-900">{doctor.qualification}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">Experience</dt>
                  <dd className="mt-1 text-sm text-gray-900">{doctor.experience_years} years</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">License Number</dt>
                  <dd className="mt-1 text-sm text-gray-900">{doctor.license_number}</dd>
                </div>
              </dl>
            </div>

            {/* Practice Details */}
            <div className="pt-6 border-t">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Practice Details</h3>
              <dl className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <dt className="text-sm font-medium text-gray-500">Consultation Fee</dt>
                  <dd className="mt-1 text-lg font-semibold text-gray-900">{formatCurrency(doctor.consultation_fee)}</dd>
                </div>
                <div className="md:col-span-2">
                  <dt className="text-sm font-medium text-gray-500">Clinic Address</dt>
                  <dd className="mt-1 text-sm text-gray-900 whitespace-pre-wrap">{doctor.clinic_address}</dd>
                </div>
              </dl>
            </div>

            {/* System Information */}
            <div className="pt-6 border-t">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">System Information</h3>
              <dl className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <dt className="text-sm font-medium text-gray-500">Created At</dt>
                  <dd className="mt-1 text-sm text-gray-900">{formatDate(doctor.created_at, 'MMMM dd, yyyy hh:mm a')}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">Last Updated</dt>
                  <dd className="mt-1 text-sm text-gray-900">{formatDate(doctor.updated_at, 'MMMM dd, yyyy hh:mm a')}</dd>
                </div>
              </dl>
            </div>

            {/* Actions */}
            <div className="flex justify-between pt-6 border-t">
              <Link to="/doctors">
                <Button variant="secondary">Back to Doctors</Button>
              </Link>
            </div>
          </motion.div>
        )}

        {isEditing && (
          <div className="mt-4">
            <Button variant="secondary" onClick={() => setIsEditing(false)} disabled={updateDoctor.isPending}>
              Cancel
            </Button>
          </div>
        )}
      </Card>

      {/* Delete Confirmation Modal */}
      <Dialog open={showDeleteModal} onClose={() => setShowDeleteModal(false)} className="relative z-50">
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="mx-auto max-w-md rounded-lg bg-white p-6 shadow-xl">
            <div className="flex items-center justify-center w-12 h-12 mx-auto bg-error-100 rounded-full mb-4">
              <svg className="w-6 h-6 text-error-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <Dialog.Title className="text-lg font-semibold text-center text-gray-900 mb-2">
              Delete Doctor
            </Dialog.Title>
            <Dialog.Description className="text-sm text-gray-600 text-center mb-6">
              Are you sure you want to delete <strong>Dr. {doctor?.name}</strong>? This action cannot be undone.
            </Dialog.Description>
            <div className="flex space-x-3">
              <Button variant="secondary" className="flex-1" onClick={() => setShowDeleteModal(false)} disabled={deleteDoctor.isPending}>
                Cancel
              </Button>
              <Button variant="danger" className="flex-1" onClick={handleDelete} loading={deleteDoctor.isPending} disabled={deleteDoctor.isPending}>
                Delete
              </Button>
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>
    </div>
  )
}

export default DoctorDetailPage