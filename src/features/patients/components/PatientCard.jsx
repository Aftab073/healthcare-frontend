// src/features/patients/components/PatientCard.jsx

import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import Card from '../../../components/ui/Card'
import { formatDate, getInitials } from '../../../lib/utils/formatters'

/**
 * Patient Card Component
 * Displays patient information in a card format
 */

const PatientCard = ({ patient }) => {
  return (
    <Link to={`/patients/${patient.id}`}>
      <motion.div whileHover={{ y: -4 }} transition={{ duration: 0.2 }}>
        <Card className="p-6 hover:shadow-md transition-shadow">
          <div className="flex items-start space-x-4">
            {/* Avatar */}
            <div className="flex-shrink-0">
              <div className="w-12 h-12 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center font-semibold">
                {getInitials(patient.name)}
              </div>
            </div>

            {/* Patient Info */}
            <div className="flex-1 min-w-0">
              <h3 className="text-lg font-semibold text-gray-900 truncate">
                {patient.name}
              </h3>
              <p className="text-sm text-gray-600 mt-1">{patient.email}</p>

              <div className="mt-3 flex flex-wrap gap-3 text-sm">
                {patient.phone_number && (
                  <div className="flex items-center text-gray-500">
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
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      />
                    </svg>
                    {patient.phone_number}
                  </div>
                )}

                {patient.blood_group && (
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-error-100 text-error-800">
                    {patient.blood_group}
                  </span>
                )}
              </div>

              <p className="text-xs text-gray-400 mt-3">
                Added {formatDate(patient.created_at)}
              </p>
            </div>

            {/* Arrow Icon */}
            <div className="flex-shrink-0">
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

export default PatientCard