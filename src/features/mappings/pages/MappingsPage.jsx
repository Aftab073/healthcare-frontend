// src/features/mappings/pages/MappingsPage.jsx

import PageHeader from '@/components/common/PageHeader'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'

/**
 * Mappings Page - Placeholder
 */

const MappingsPage = () => {
  return (
    <div>
      <PageHeader
        title="Patient-Doctor Assignments"
        subtitle="Manage patient and doctor relationships"
      />

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
            <Button>Assign Doctor to Patient</Button>
          </div>
        </div>
      </Card>
    </div>
  )
}

export default MappingsPage