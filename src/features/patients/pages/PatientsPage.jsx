// src/features/patients/pages/PatientsPage.jsx

import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import PageHeader from '../../../components/common/PageHeader'
import Button from '../../../components/ui/Button'
import Card from '../../../components/ui/Card'
import Spinner from '../../../components/ui/Spinner'
import { usePatients } from '../hooks/usePatients'
import PatientCard from '../components/PatientCard'
import { useDebounce } from '../../../lib/hooks/useDebounce'

/**
 * Patients List Page
 * Displays all patients with search functionality
 */

const PatientsPage = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const debouncedSearch = useDebounce(searchTerm, 300)

  const { data, isLoading, error } = usePatients()

  // Filter patients based on search
  const filteredPatients = data?.patients?.filter((patient) =>
    patient.name.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
    patient.email.toLowerCase().includes(debouncedSearch.toLowerCase())
  ) || []

  if (error) {
    return (
      <div>
        <PageHeader title="Patients" subtitle="Manage patient records" />
        <Card className="p-6">
          <div className="text-center text-error-600">
            <p>Error loading patients. Please try again.</p>
          </div>
        </Card>
      </div>
    )
  }

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

      {/* Search Bar */}
      <div className="mb-6">
        <div className="relative">
          <input
            type="text"
            placeholder="Search patients by name or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-3 pl-11 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
          <svg
            className="absolute left-3 top-3.5 h-5 w-5 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
      </div>

      {/* Loading State */}
      {isLoading && (
        <Card className="p-12">
          <Spinner size="lg" className="mx-auto" />
          <p className="text-center text-gray-600 mt-4">Loading patients...</p>
        </Card>
      )}

      {/* Empty State */}
      {!isLoading && filteredPatients.length === 0 && !searchTerm && (
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
      )}

      {/* No Search Results */}
      {!isLoading && filteredPatients.length === 0 && searchTerm && (
        <Card className="p-6">
          <div className="text-center py-12">
            <p className="text-gray-600">No patients found matching "{searchTerm}"</p>
          </div>
        </Card>
      )}

      {/* Patients Grid */}
      {!isLoading && filteredPatients.length > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredPatients.map((patient) => (
            <PatientCard key={patient.id} patient={patient} />
          ))}
        </motion.div>
      )}

      {/* Results Count */}
      {!isLoading && filteredPatients.length > 0 && (
        <div className="mt-6 text-center text-sm text-gray-600">
          Showing {filteredPatients.length} of {data?.count || 0} patients
        </div>
      )}
    </div>
  )
}

export default PatientsPage