// src/features/auth/pages/RegisterPage.jsx

import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useAuth } from '../../../lib/auth/authContext'
import { registerSchema } from '../validation/schemas'
import Button from '../../../components/ui/Button'
import Input from '../../../components/ui/Input'

/**
 * Register Page
 * Allows new users to create an account
 */

const RegisterPage = () => {
  const navigate = useNavigate()
  const { register: registerUser } = useAuth()
  const [isLoading, setIsLoading] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      password2: '',
    },
  })

  const onSubmit = async (data) => {
    setIsLoading(true)

    try {
      const result = await registerUser(data)

      if (result.success) {
        // Registration successful, redirect to login
        navigate('/login')
      } else {
        // Handle backend validation errors
        if (typeof result.error === 'object') {
          // Set field-specific errors
          Object.keys(result.error).forEach((field) => {
            if (result.error[field] && Array.isArray(result.error[field])) {
              setError(field, {
                type: 'manual',
                message: result.error[field][0],
              })
            }
          })
        } else {
          // Set general error
          setError('root', {
            type: 'manual',
            message: result.error || 'Registration failed',
          })
        }
      }
    } catch (error) {
      setError('root', {
        type: 'manual',
        message: 'An unexpected error occurred. Please try again.',
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div>
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900">Create an account</h2>
        <p className="mt-2 text-gray-600">Get started with Healthcare System</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Root error (general registration error) */}
        {errors.root && (
          <div className="bg-error-50 border border-error-200 text-error-700 px-4 py-3 rounded-lg">
            <p className="text-sm">{errors.root.message}</p>
          </div>
        )}

        <Input
          {...register('name')}
          label="Full Name"
          type="text"
          placeholder="Enter your full name"
          error={errors.name?.message}
          disabled={isLoading}
          required
        />

        <Input
          {...register('email')}
          label="Email"
          type="email"
          placeholder="Enter your email"
          error={errors.email?.message}
          disabled={isLoading}
          required
        />

        <Input
          {...register('password')}
          label="Password"
          type="password"
          placeholder="Create a password (min. 8 characters)"
          error={errors.password?.message}
          disabled={isLoading}
          required
        />

        <Input
          {...register('password2')}
          label="Confirm Password"
          type="password"
          placeholder="Confirm your password"
          error={errors.password2?.message}
          disabled={isLoading}
          required
        />

        <div className="text-xs text-gray-500">
          Password must contain:
          <ul className="list-disc list-inside mt-1 space-y-1">
            <li>At least 8 characters</li>
            <li>One uppercase letter</li>
            <li>One lowercase letter</li>
            <li>One number</li>
          </ul>
        </div>

        <Button type="submit" className="w-full" loading={isLoading} disabled={isLoading}>
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