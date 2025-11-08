// src/features/mappings/pages/MappingsPage.jsx

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Dialog } from '@headlessui/react'
import PageHeader from '../../../components/common/PageHeader'
import Button from '../../../components/ui/Button'
import Card from '../../../components/ui/Card'
import Spinner from '../../../components/ui/Spinner'
import { useMappings, useCreateMapping } from '../hooks/useMappings'
import MappingCard from '../components/MappingCard'
import AssignDoctorForm from '../components/AssignDoctorForm'

/**
 * Mappings Page
 * Manage patient-doctor assignments
 */

const MappingsPage = () => {
  const [showAssignModal, setShowAssignModal] = useState(false)

  const { data, isLoading, error } = useMappings()
  const createMapping = useCreateMapping()

  const handleAssign = async (formData) => {
    try {
      await createMapping.mutateAsync(formData)
      setShowAssignModal(false)
    } catch (error) {
      console.error('Failed to create mapping:', error)
    }
  }

  if (error) {
    return (
      <div>
        <PageHeader
          title="Patient-Doctor Assignments"
          subtitle="Manage patient and doctor relationships"
        />
        <Card className="p-6">
          <div className="text-center text-error-600">
            <p>Error loading assignments. Please try again.</p>
          </div>
        </Card>
      </div>
    )
  }

  return (
    <div>
      <PageHeader
        title="Patient-Doctor Assignments"
        subtitle="Manage patient and doctor relationships"
        action={
          <Button onClick={() => setShowAssignModal(true)}>
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
                d="M12 4v16m8-8H4"
              />
            </svg>
            Assign Doctor to Patient
          </Button>
        }
      />

      {/* Loading State */}
      {isLoading && (
        <Card className="p-12">
          <Spinner size="lg" className="mx-auto" />
          <p className="text-center text-gray-600 mt-4">Loading assignments...</p>
        </Card>
      )}

      {/* Empty State */}
      {!isLoading && (!data?.mappings || data.mappings.length === 0) && (
        <Card className="p-6">
          <div className="text-center py-12">
            <svg
              className="mx-auto h-12 w-12 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 10V3L4 14h7v7l9-11h-7z"
              />
            </svg>
            <h3 className="mt-2 text-sm font-medium text-gray-900">No assignments</h3>
            <p className="mt-1 text-sm text-gray-500">
              Assign doctors to patients to get started.
            </p>
            <div className="mt-6">
              <Button onClick={() => setShowAssignModal(true)}>
                Assign Doctor to Patient
              </Button>
            </div>
          </div>
        </Card>
      )}

      {/* Mappings Grid */}
      {!isLoading && data?.mappings && data.mappings.length > 0 && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {data.mappings.map((mapping) => (
              <MappingCard key={mapping.id} mapping={mapping} />
            ))}
          </motion.div>

          {/* Results Count */}
          <div className="mt-6 text-center text-sm text-gray-600">
            Showing {data.count} assignment{data.count !== 1 ? 's' : ''}
          </div>
        </>
      )}

      {/* Assign Doctor Modal */}
      <Dialog
        open={showAssignModal}
        onClose={() => setShowAssignModal(false)}
        className="relative z-50"
      >
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />

        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="mx-auto max-w-2xl w-full rounded-lg bg-white p-6 shadow-xl">
            <Dialog.Title className="text-xl font-semibold text-gray-900 mb-6">
              Assign Doctor to Patient
            </Dialog.Title>

            <AssignDoctorForm
              onSubmit={handleAssign}
              isLoading={createMapping.isPending}
              onCancel={() => setShowAssignModal(false)}
            />
          </Dialog.Panel>
        </div>
      </Dialog>
    </div>
  )
}

export default MappingsPage