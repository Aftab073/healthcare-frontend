// src/features/auth/pages/RegisterPage.jsx

import { Link } from 'react-router-dom'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'

/**
 * Register Page - Placeholder
 * Will be fully implemented in next step
 */

const RegisterPage = () => {
  return (
    <div>
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900">Create an account</h2>
        <p className="mt-2 text-gray-600">Get started with Healthcare System</p>
      </div>

      <form className="space-y-6">
        <Input
          label="Full Name"
          type="text"
          placeholder="Enter your full name"
          required
        />
        <Input
          label="Email"
          type="email"
          placeholder="Enter your email"
          required
        />
        <Input
          label="Password"
          type="password"
          placeholder="Create a password"
          required
        />
        <Input
          label="Confirm Password"
          type="password"
          placeholder="Confirm your password"
          required
        />

        <Button type="submit" className="w-full">
          Create Account
        </Button>
      </form>

      <p className="mt-6 text-center text-sm text-gray-600">
        Already have an account?{' '}
        <Link to="/login" className="text-primary-600 hover:text-primary-700 font-medium">
          Sign in
        </Link>
      </p>
    </div>
  )
}

export default RegisterPage