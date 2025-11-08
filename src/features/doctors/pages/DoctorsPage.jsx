import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import PageHeader from '../../../components/common/PageHeader'
import Button from '../../../components/ui/Button'
import Card from '../../../components/ui/Card'
import Spinner from '../../../components/ui/Spinner'
import { useDoctors } from '../hooks/useDoctors'
import DoctorCard from '../components/DoctorCard'
import { useDebounce } from '../../../lib/hooks/useDebounce'

const DoctorsPage = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const debouncedSearch = useDebounce(searchTerm, 300)

  const { data, isLoading, error } = useDoctors()

  const filteredDoctors = data?.doctors?.filter((doctor) =>
    doctor.name.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
    doctor.specialization.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
    doctor.email.toLowerCase().includes(debouncedSearch.toLowerCase())
  ) || []

  if (error) {
    return (
      <div>
        <PageHeader title="Doctors" subtitle="Manage doctor profiles" />
        <Card className="p-6">
          <div className="text-center text-error-600">
            <p>Error loading doctors. Please try again.</p>
          </div>
        </Card>
      </div>
    )
  }

  return (
    <div>
      <PageHeader
        title="Doctors"
        subtitle="Manage doctor profiles"
        action={
          <Link to="/doctors/new">
            <Button>
              <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Add Doctor
            </Button>
          </Link>
        }
      />

      {/* Search Bar */}
      <div className="mb-6">
        <div className="relative">
          <input
            type="text"
            placeholder="Search doctors by name, specialization, or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-3 pl-11 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
          <svg className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
      </div>

      {/* Loading State */}
      {isLoading && (
        <Card className="p-12">
          <Spinner size="lg" className="mx-auto" />
          <p className="text-center text-gray-600 mt-4">Loading doctors...</p>
        </Card>
      )}

      {/* Empty State */}
      {!isLoading && filteredDoctors.length === 0 && !searchTerm && (
        <Card className="p-6">
          <div className="text-center py-12">
            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            <h3 className="mt-2 text-sm font-medium text-gray-900">No doctors</h3>
            <p className="mt-1 text-sm text-gray-500">Get started by adding a new doctor.</p>
            <div className="mt-6">
              <Link to="/doctors/new">
                <Button>Add Doctor</Button>
              </Link>
            </div>
          </div>
        </Card>
      )}

      {/* No Search Results */}
      {!isLoading && filteredDoctors.length === 0 && searchTerm && (
        <Card className="p-6">
          <div className="text-center py-12">
            <p className="text-gray-600">No doctors found matching "{searchTerm}"</p>
          </div>
        </Card>
      )}

      {/* Doctors Grid */}
      {!isLoading && filteredDoctors.length > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredDoctors.map((doctor) => (
            <DoctorCard key={doctor.id} doctor={doctor} />
          ))}
        </motion.div>
      )}

      {/* Results Count */}
      {!isLoading && filteredDoctors.length > 0 && (
        <div className="mt-6 text-center text-sm text-gray-600">
          Showing {filteredDoctors.length} of {data?.count || 0} doctors
        </div>
      )}
    </div>
  )
}

export default DoctorsPage