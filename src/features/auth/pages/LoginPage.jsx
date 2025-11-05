// src/features/auth/pages/LoginPage.jsx

import { Link } from 'react-router-dom'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'

/**
 * Login Page - Placeholder
 * Will be fully implemented in next step
 */

const LoginPage = () => {
  return (
    <div>
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900">Welcome back</h2>
        <p className="mt-2 text-gray-600">Sign in to your account</p>
      </div>

      <form className="space-y-6">
        <Input
          label="Email"
          type="email"
          placeholder="Enter your email"
          required
        />
        <Input
          label="Password"
          type="password"
          placeholder="Enter your password"
          required
        />

        <Button type="submit" className="w-full">
          Sign In
        </Button>
      </form>

      <p className="mt-6 text-center text-sm text-gray-600">
        Don't have an account?{' '}
        <Link to="/register" className="text-primary-600 hover:text-primary-700 font-medium">
          Sign up
        </Link>
      </p>
    </div>
  )
}

export default LoginPage