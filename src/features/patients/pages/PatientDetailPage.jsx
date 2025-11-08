// src/features/patients/pages/PatientDetailPage.jsx

import { useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import PageHeader from '../../../components/common/PageHeader'
import Card from '../../../components/ui/Card'
import Button from '../../../components/ui/Button'
import Spinner from '../../../components/ui/Spinner'
import PatientForm from '../components/PatientForm'
import { usePatient, useUpdatePatient, useDeletePatient } from '../hooks/usePatients'
import { formatDate, formatPhoneNumber } from '../../../lib/utils/formatters'
import { Dialog } from '@headlessui/react'

/**
 * Patient Detail Page
 * View, edit, and delete patient information
 */

const PatientDetailPage = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [isEditing, setIsEditing] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)

  const { data: patient, isLoading, error } = usePatient(id)
  const updatePatient = useUpdatePatient()
  const deletePatient = useDeletePatient()

  const handleUpdate = async (data) => {
    try {
      await updatePatient.mutateAsync({ id, data })
      setIsEditing(false)
    } catch (error) {
      console.error('Failed to update patient:', error)
    }
  }

  const handleDelete = async () => {
    try {
      await deletePatient.mutateAsync(id)
      navigate('/patients')
    } catch (error) {
      console.error('Failed to delete patient:', error)
    }
  }

  if (isLoading) {
    return (
      <div>
        <PageHeader title="Patient Details" />
        <Card className="p-12">
          <Spinner size="lg" className="mx-auto" />
          <p className="text-center text-gray-600 mt-4">Loading patient details...</p>
        </Card>
      </div>
    )
  }

  if (error) {
    return (
      <div>
        <PageHeader title="Patient Details" />
        <Card className="p-6">
          <div className="text-center text-error-600">
            <p>Error loading patient details. Patient may not exist.</p>
            <Link to="/patients" className="mt-4 inline-block">
              <Button variant="secondary">Back to Patients</Button>
            </Link>
          </div>
        </Card>
      </div>
    )
  }

  return (
    <div>
      <PageHeader
        title={isEditing ? 'Edit Patient' : 'Patient Details'}
        subtitle={!isEditing && `Patient ID: ${id}`}
        action={
          !isEditing && (
            <div className="flex space-x-3">
              <Button variant="danger" onClick={() => setShowDeleteModal(true)}>
                <svg
                  className="w-5 h-5 mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  />
                </svg>
                Delete
              </Button>
              <Button onClick={() => setIsEditing(true)}>
                <svg
                  className="w-5 h-5 mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                  />
                </svg>
                Edit
              </Button>
            </div>
          )
        }
      />

      <Card className="p-6 max-w-4xl">
        {isEditing ? (
          <PatientForm
            defaultValues={{
              name: patient.name || '',
              email: patient.email || '',
              phone_number: patient.phone_number || '',
              address: patient.address || '',
              date_of_birth: patient.date_of_birth || '',
              blood_group: patient.blood_group || '',
              medical_history: patient.medical_history || '',
            }}
            onSubmit={handleUpdate}
            isLoading={updatePatient.isPending}
            submitLabel="Update Patient"
          />
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            {/* Patient Header */}
            <div className="flex items-center space-x-4 pb-6 border-b">
              <div className="w-20 h-20 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center text-2xl font-bold">
                {patient.name
                  .split(' ')
                  .map((n) => n[0])
                  .join('')
                  .toUpperCase()
                  .slice(0, 2)}
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">{patient.name}</h2>
                <p className="text-gray-600">{patient.email}</p>
              </div>
            </div>

            {/* Personal Information */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Personal Information
              </h3>
              <dl className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <dt className="text-sm font-medium text-gray-500">Email</dt>
                  <dd className="mt-1 text-sm text-gray-900">{patient.email}</dd>
                </div>

                {patient.phone_number && (
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Phone Number</dt>
                    <dd className="mt-1 text-sm text-gray-900">
                      {formatPhoneNumber(patient.phone_number)}
                    </dd>
                  </div>
                )}

                {patient.date_of_birth && (
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Date of Birth</dt>
                    <dd className="mt-1 text-sm text-gray-900">
                      {formatDate(patient.date_of_birth, 'MMMM dd, yyyy')}
                    </dd>
                  </div>
                )}

                {patient.address && (
                  <div className="md:col-span-2">
                    <dt className="text-sm font-medium text-gray-500">Address</dt>
                    <dd className="mt-1 text-sm text-gray-900">{patient.address}</dd>
                  </div>
                )}
              </dl>
            </div>

            {/* Medical Information */}
            <div className="pt-6 border-t">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Medical Information
              </h3>
              <dl className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {patient.blood_group && (
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Blood Group</dt>
                    <dd className="mt-1">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-error-100 text-error-800">
                        {patient.blood_group}
                      </span>
                    </dd>
                  </div>
                )}

                {patient.medical_history && (
                  <div className="md:col-span-2">
                    <dt className="text-sm font-medium text-gray-500">Medical History</dt>
                    <dd className="mt-1 text-sm text-gray-900 whitespace-pre-wrap">
                      {patient.medical_history}
                    </dd>
                  </div>
                )}
              </dl>
            </div>

            {/* System Information */}
            <div className="pt-6 border-t">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                System Information
              </h3>
              <dl className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <dt className="text-sm font-medium text-gray-500">Created By</dt>
                  <dd className="mt-1 text-sm text-gray-900">
                    {patient.created_by_details?.name || 'Unknown'}
                  </dd>
                </div>

                <div>
                  <dt className="text-sm font-medium text-gray-500">Created At</dt>
                  <dd className="mt-1 text-sm text-gray-900">
                    {formatDate(patient.created_at, 'MMMM dd, yyyy hh:mm a')}
                  </dd>
                </div>

                <div>
                  <dt className="text-sm font-medium text-gray-500">Last Updated</dt>
                  <dd className="mt-1 text-sm text-gray-900">
                    {formatDate(patient.updated_at, 'MMMM dd, yyyy hh:mm a')}
                  </dd>
                </div>
              </dl>
            </div>

            {/* Actions */}
            <div className="flex justify-between pt-6 border-t">
              <Link to="/patients">
                <Button variant="secondary">Back to Patients</Button>
              </Link>
            </div>
          </motion.div>
        )}

        {isEditing && (
          <div className="mt-4">
            <Button
              variant="secondary"
              onClick={() => setIsEditing(false)}
              disabled={updatePatient.isPending}
            >
              Cancel
            </Button>
          </div>
        )}
      </Card>

      {/* Delete Confirmation Modal */}
      <Dialog
        open={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        className="relative z-50"
      >
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />

        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="mx-auto max-w-md rounded-lg bg-white p-6 shadow-xl">
            <div className="flex items-center justify-center w-12 h-12 mx-auto bg-error-100 rounded-full mb-4">
              <svg
                className="w-6 h-6 text-error-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
            </div>

            <Dialog.Title className="text-lg font-semibold text-center text-gray-900 mb-2">
              Delete Patient
            </Dialog.Title>

            <Dialog.Description className="text-sm text-gray-600 text-center mb-6">
              Are you sure you want to delete <strong>{patient?.name}</strong>? This action
              cannot be undone.
            </Dialog.Description>

            <div className="flex space-x-3">
              <Button
                variant="secondary"
                className="flex-1"
                onClick={() => setShowDeleteModal(false)}
                disabled={deletePatient.isPending}
              >
                Cancel
              </Button>
              <Button
                variant="danger"
                className="flex-1"
                onClick={handleDelete}
                loading={deletePatient.isPending}
                disabled={deletePatient.isPending}
              >
                Delete
              </Button>
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>
    </div>
  )
}

export default PatientDetailPage