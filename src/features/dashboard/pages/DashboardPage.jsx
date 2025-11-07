// src/features/dashboard/pages/DashboardPage.jsx

import { Link } from 'react-router-dom'
import PageHeader from '../../../components/common/PageHeader'
import Card from '../../../components/ui/Card'

/**
 * Dashboard Page - Placeholder
 * Will show stats and overview
 */

const DashboardPage = () => {
  const stats = [
    {
      title: 'Total Patients',
      value: '0',
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
          />
        </svg>
      ),
      color: 'bg-primary-100 text-primary-600',
    },
    {
      title: 'Total Doctors',
      value: '0',
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
          />
        </svg>
      ),
      color: 'bg-success-100 text-success-600',
    },
    {
      title: 'Active Assignments',
      value: '0',
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M13 10V3L4 14h7v7l9-11h-7z"
          />
        </svg>
      ),
      color: 'bg-warning-100 text-warning-600',
    },
  ]

  return (
    <div>
      <PageHeader
        title="Dashboard"
        subtitle="Welcome back! Here's an overview of your healthcare system."
      />

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {stats.map((stat, index) => (
          <Card key={index} className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">{stat.title}</p>
                <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
              </div>
              <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${stat.color}`}>
                {stat.icon}
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Quick Actions */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          <Link
            to="/patients/new"
            className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-primary-500 hover:bg-primary-50 transition-colors text-center"
          >
            <div className="text-primary-600 font-medium">Add New Patient</div>
          </Link>

          <Link
            to="/doctors/new"
            className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-success-500 hover:bg-success-50 transition-colors text-center"
          >
            <div className="text-success-600 font-medium">Add New Doctor</div>
          </Link>

          <Link
            to="/mappings"
            className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-warning-500 hover:bg-warning-50 transition-colors text-center"
          >
            <div className="text-warning-600 font-medium">Assign Doctor</div>
          </Link>

          <Link
            to="/patients"
            className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-gray-500 hover:bg-gray-50 transition-colors text-center"
          >
            <div className="text-gray-600 font-medium">View All Patients</div>
          </Link>
        </div>
      </Card>
    </div>
  )
}

export default DashboardPage