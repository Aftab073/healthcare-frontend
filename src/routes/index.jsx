// src/routes/index.jsx

import { createBrowserRouter, Navigate } from 'react-router-dom'
import ProtectedRoute from '@/components/common/ProtectedRoute'
import DashboardLayout from '@/components/layout/DashboardLayout'
import AuthLayout from '@/components/layout/AuthLayout'

// Auth pages
import LoginPage from '@/features/auth/pages/LoginPage'
import RegisterPage from '@/features/auth/pages/RegisterPage'

// Dashboard pages
import DashboardPage from '@/features/dashboard/pages/DashboardPage'

// Patient pages
import PatientsPage from '@/features/patients/pages/PatientsPage'
import PatientDetailPage from '@/features/patients/pages/PatientDetailPage'
import CreatePatientPage from '@/features/patients/pages/CreatePatientPage'

// Doctor pages
import DoctorsPage from '@/features/doctors/pages/DoctorsPage'
import DoctorDetailPage from '@/features/doctors/pages/DoctorDetailPage'
import CreateDoctorPage from '@/features/doctors/pages/CreateDoctorPage'

// Mapping pages
import MappingsPage from '@/features/mappings/pages/MappingsPage'

/**
 * Main Router Configuration
 */

const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to="/dashboard" replace />,
  },
  {
    path: '/',
    element: <AuthLayout />,
    children: [
      {
        path: 'login',
        element: <LoginPage />,
      },
      {
        path: 'register',
        element: <RegisterPage />,
      },
    ],
  },
  {
    path: '/',
    element: (
      <ProtectedRoute>
        <DashboardLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        path: 'dashboard',
        element: <DashboardPage />,
      },
      {
        path: 'patients',
        element: <PatientsPage />,
      },
      {
        path: 'patients/new',
        element: <CreatePatientPage />,
      },
      {
        path: 'patients/:id',
        element: <PatientDetailPage />,
      },
      {
        path: 'doctors',
        element: <DoctorsPage />,
      },
      {
        path: 'doctors/new',
        element: <CreateDoctorPage />,
      },
      {
        path: 'doctors/:id',
        element: <DoctorDetailPage />,
      },
      {
        path: 'mappings',
        element: <MappingsPage />,
      },
    ],
  },
  {
    path: '*',
    element: (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h1 className="text-6xl font-bold text-gray-900">404</h1>
          <p className="mt-4 text-xl text-gray-600">Page not found</p>
          <a href="/" className="mt-6 inline-block text-primary-600 hover:text-primary-700">
            Go back home
          </a>
        </div>
      </div>
    ),
  },
])

export default router