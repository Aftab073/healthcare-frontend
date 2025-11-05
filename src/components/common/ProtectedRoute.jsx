// src/components/common/ProtectedRoute.jsx

import { Navigate } from 'react-router-dom'
import { useAuth } from '@/lib/auth/authContext'
import LoadingScreen from './LoadingScreen'

/**
 * Protected Route Component
 * Redirects to login if not authenticated
 */

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth()

  if (isLoading) {
    return <LoadingScreen />
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  return children
}

export default ProtectedRoute