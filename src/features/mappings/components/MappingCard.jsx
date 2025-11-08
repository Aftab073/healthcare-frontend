// src/features/mappings/components/MappingCard.jsx

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Dialog } from '@headlessui/react'
import Card from '../../../components/ui/Card'
import Button from '../../../components/ui/Button'
import { formatDate } from '../../../lib/utils/formatters'
import { useDeleteMapping } from '../hooks/useMappings'

/**
 * Mapping Card Component
 * Displays patient-doctor assignment
 */

const MappingCard = ({ mapping }) => {
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const deleteMapping = useDeleteMapping()

  const handleDelete = async () => {
    try {
      await deleteMapping.mutateAsync(mapping.id)
      setShowDeleteModal(false)
    } catch (error) {
      console.error('Failed to delete mapping:', error)
    }
  }

  return (
    <>
      <motion.div whileHover={{ y: -2 }} transition={{ duration: 0.2 }}>
        <Card className="p-6 hover:shadow-md transition-shadow">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              {/* Patient Info */}
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center font-semibold text-sm">
                  {mapping.patient_name
                    ?.split(' ')
                    .map((n) => n[0])
                    .join('')
                    .toUpperCase()
                    .slice(0, 2)}
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    {mapping.patient_name}
                  </p>
                  <p className="text-xs text-gray-500">Patient</p>
                </div>
              </div>

              {/* Arrow */}
              <div className="flex justify-center my-2">
                <svg
                  className="w-5 h-5 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 14l-7 7m0 0l-7-7m7 7V3"
                  />
                </svg>
              </div>

              {/* Doctor Info */}
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-success-100 text-success-600 rounded-full flex items-center justify-center font-semibold text-xs">
                  Dr
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    {mapping.doctor_name}
                  </p>
                  <p className="text-xs text-primary-600">
                    {mapping.doctor_specialization}
                  </p>
                </div>
              </div>

              {/* Metadata */}
              <div className="pt-4 border-t">
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span>Assigned {formatDate(mapping.assigned_date)}</span>
                  {mapping.is_active ? (
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-success-100 text-success-800">
                      Active
                    </span>
                  ) : (
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                      Inactive
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Delete Button */}
            <button
              onClick={() => setShowDeleteModal(true)}
              className="p-2 text-gray-400 hover:text-error-600 hover:bg-error-50 rounded-lg transition-colors"
              title="Remove assignment"
            >
              <svg
                className="w-5 h-5"
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
            </button>
          </div>
        </Card>
      </motion.div>

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
              Remove Assignment
            </Dialog.Title>

            <Dialog.Description className="text-sm text-gray-600 text-center mb-6">
              Are you sure you want to remove <strong>Dr. {mapping.doctor_name}</strong> from{' '}
              <strong>{mapping.patient_name}</strong>?
            </Dialog.Description>

            <div className="flex space-x-3">
              <Button
                variant="secondary"
                className="flex-1"
                onClick={() => setShowDeleteModal(false)}
                disabled={deleteMapping.isPending}
              >
                Cancel
              </Button>
              <Button
                variant="danger"
                className="flex-1"
                onClick={handleDelete}
                loading={deleteMapping.isPending}
                disabled={deleteMapping.isPending}
              >
                Remove
              </Button>
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>
    </>
  )
}

export default MappingCard