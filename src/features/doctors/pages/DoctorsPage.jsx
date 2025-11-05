// src/features/doctors/pages/DoctorsPage.jsx

import { Link } from 'react-router-dom'
import PageHeader from '@/components/common/PageHeader'
import Button from '@/components/ui/Button'
import Card from '@/components/ui/Card'

/**
 * Doctors List Page - Placeholder
 */

const DoctorsPage = () => {
  return (
    <div>
      <PageHeader
        title="Doctors"
        subtitle="Manage doctor profiles"
        action={
          <Link to="/doctors/new">
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
              Add Doctor
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
              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
            />
          </svg>
          <h3 className="mt-2 text-sm font-medium text-gray-900">No doctors</h3>
          <p className="mt-1 text-sm text-gray-500">
            Get started by adding a new doctor.
          </p>
          <div className="mt-6">
            <Link to="/doctors/new">
              <Button>Add Doctor</Button>
            </Link>
          </div>
        </div>
      </Card>
    </div>
  )
}

export default DoctorsPage