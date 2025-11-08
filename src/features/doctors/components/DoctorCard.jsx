import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import Card from '../../../components/ui/Card'
import { formatCurrency } from '../../../lib/utils/formatters'

const DoctorCard = ({ doctor }) => {
  return (
    <Link to={`/doctors/${doctor.id}`}>
      <motion.div whileHover={{ y: -4 }} transition={{ duration: 0.2 }}>
        <Card className="p-6 hover:shadow-md transition-shadow">
          <div className="flex items-start justify-between">
            <div className="flex items-start space-x-4 flex-1">
              {/* Avatar */}
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-success-100 text-success-600 rounded-full flex items-center justify-center font-semibold">
                  Dr
                </div>
              </div>

              {/* Doctor Info */}
              <div className="flex-1 min-w-0">
                <h3 className="text-lg font-semibold text-gray-900 truncate">
                  Dr. {doctor.name}
                </h3>
                <p className="text-sm text-primary-600 font-medium mt-1">
                  {doctor.specialization}
                </p>
                <p className="text-sm text-gray-600 mt-1">{doctor.email}</p>

                <div className="mt-3 flex flex-wrap items-center gap-3">
                  <div className="flex items-center text-sm text-gray-500">
                    <svg
                      className="w-4 h-4 mr-1"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                    {doctor.experience_years} years exp.
                  </div>

                  <span className="text-sm font-semibold text-gray-900">
                    {formatCurrency(doctor.consultation_fee)}
                  </span>

                  {doctor.is_available ? (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-success-100 text-success-800">
                      Available
                    </span>
                  ) : (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                      Unavailable
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Arrow Icon */}
            <div className="flex-shrink-0 ml-4">
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
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </div>
          </div>
        </Card>
      </motion.div>
    </Link>
  )
}

export default DoctorCard