// src/components/common/LoadingScreen.jsx

import Spinner from '../ui/Spinner'

/**
 * Full-screen loading component
 * Shown during initial app load or authentication check
 */

const LoadingScreen = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <Spinner size="lg" />
        <p className="mt-4 text-gray-600">Loading...</p>
      </div>
    </div>
  )
}

export default LoadingScreen