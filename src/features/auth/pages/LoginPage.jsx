// src/features/auth/pages/LoginPage.jsx

import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useAuth } from '../../../lib/auth/authContext'
import { loginSchema } from '../validation/schemas'
import Button from '../../../components/ui/Button'
import Input from '../../../components/ui/Input'

/**
 * Login Page
 * Allows users to sign in with email and password
 */

const LoginPage = () => {
  const navigate = useNavigate()
  const { login } = useAuth()
  const [isLoading, setIsLoading] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const onSubmit = async (data) => {
    setIsLoading(true)

    try {
      const result = await login(data)

      if (result.success) {
        navigate('/dashboard')
      } else {
        // Show error from backend
        setError('root', {
          type: 'manual',
          message: result.error || 'Login failed',
        })
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
        <h2 className="text-2xl font-bold text-gray-900">Welcome back</h2>
        <p className="mt-2 text-gray-600">Sign in to your account</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Root error (general login error) */}
        {errors.root && (
          <div className="bg-error-50 border border-error-200 text-error-700 px-4 py-3 rounded-lg">
            <p className="text-sm">{errors.root.message}</p>
          </div>
        )}

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
          placeholder="Enter your password"
          error={errors.password?.message}
          disabled={isLoading}
          required
        />

        <Button type="submit" className="w-full" loading={isLoading} disabled={isLoading}>
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