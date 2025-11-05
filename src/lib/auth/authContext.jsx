// src/lib/auth/authContext.jsx

import { createContext, useContext, useState, useEffect } from 'react'
import apiClient from '../api/apiClient'
import { API_ENDPOINTS } from '../api/endpoints'
import tokenService from './tokenService'
import toast from 'react-hot-toast'

const AuthContext = createContext(null)

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  // Check if user is authenticated on mount
  useEffect(() => {
    const initAuth = () => {
      const token = tokenService.getAccessToken()
      const savedUser = tokenService.getUser()

      if (token && savedUser) {
        setUser(savedUser)
        setIsAuthenticated(true)
      }
      setIsLoading(false)
    }

    initAuth()
  }, [])

  // Login function
  const login = async (credentials) => {
    try {
      const response = await apiClient.post(API_ENDPOINTS.AUTH.LOGIN, credentials)
      
      const { access, refresh, user: userData } = response.data

      // Store tokens and user data
      tokenService.setTokens(access, refresh, userData)
      
      setUser(userData)
      setIsAuthenticated(true)
      
      toast.success('Login successful!')
      return { success: true }
    } catch (error) {
      const errorMessage = 
        error.response?.data?.error || 
        error.response?.data?.details?.non_field_errors?.[0] ||
        'Login failed. Please check your credentials.'
      
      toast.error(errorMessage)
      return { success: false, error: errorMessage }
    }
  }

  // Register function
  const register = async (userData) => {
    try {
      const response = await apiClient.post(API_ENDPOINTS.AUTH.REGISTER, userData)
      
      toast.success('Registration successful! Please login.')
      return { success: true, data: response.data }
    } catch (error) {
      const errorMessage = 
        error.response?.data?.error || 
        error.response?.data?.details ||
        'Registration failed. Please try again.'
      
      toast.error(typeof errorMessage === 'string' ? errorMessage : 'Registration failed')
      return { success: false, error: errorMessage }
    }
  }

  // Logout function
  const logout = () => {
    tokenService.removeTokens()
    setUser(null)
    setIsAuthenticated(false)
    toast.success('Logged out successfully')
  }

  const value = {
    user,
    isAuthenticated,
    isLoading,
    login,
    register,
    logout,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}