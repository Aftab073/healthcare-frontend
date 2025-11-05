// src/features/patients/pages/PatientsPage.jsx

import { Link } from 'react-router-dom'
import PageHeader from '@/components/common/PageHeader'
import Button from '@/components/ui/Button'
import Card from '@/components/ui/Card'

/**
 * Patients List Page - Placeholder
 */

const PatientsPage = () => {
  return (
    <div>
      <PageHeader
        title="Patients"
        subtitle="Manage patient records"
        action={
          <Link to="/patients/new">
            <Button>
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
              Add Patient
            </Button>
          </Link>
        }
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
              d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
            />
          </svg>
          <h3 className="mt-2 text-sm font-medium text-gray-900">No patients</h3>
          <p className="mt-1 text-sm text-gray-500">
            Get started by adding a new patient.
          </p>
          <div className="mt-6">
            <Link to="/patients/new">
              <Button>Add Patient</Button>
            </Link>
          </div>
        </div>
      </Card>
    </div>
  )
}

export default PatientsPage