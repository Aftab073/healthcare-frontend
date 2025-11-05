// src/lib/utils/formatters.js

import { format, formatDistanceToNow, parseISO } from 'date-fns'

/**
 * Utility functions for formatting data
 */

// Format date to readable string
export const formatDate = (date, formatStr = 'MMM dd, yyyy') => {
  if (!date) return ''
  try {
    const parsedDate = typeof date === 'string' ? parseISO(date) : date
    return format(parsedDate, formatStr)
  } catch (error) {
    console.error('Error formatting date:', error)
    return ''
  }
}

// Format date to relative time (e.g., "2 hours ago")
export const formatRelativeTime = (date) => {
  if (!date) return ''
  try {
    const parsedDate = typeof date === 'string' ? parseISO(date) : date
    return formatDistanceToNow(parsedDate, { addSuffix: true })
  } catch (error) {
    console.error('Error formatting relative time:', error)
    return ''
  }
}

// Format phone number
export const formatPhoneNumber = (phone) => {
  if (!phone) return ''
  // Remove all non-digits
  const cleaned = phone.replace(/\D/g, '')
  // Format as +X (XXX) XXX-XXXX
  if (cleaned.length === 11) {
    return `+${cleaned[0]} (${cleaned.slice(1, 4)}) ${cleaned.slice(4, 7)}-${cleaned.slice(7)}`
  }
  return phone
}

// Format currency
export const formatCurrency = (amount, currency = 'USD') => {
  if (amount === null || amount === undefined) return ''
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
  }).format(amount)
}

// Truncate text
export const truncateText = (text, maxLength = 50) => {
  if (!text) return ''
  if (text.length <= maxLength) return text
  return `${text.substring(0, maxLength)}...`
}

// Capitalize first letter
export const capitalizeFirst = (str) => {
  if (!str) return ''
  return str.charAt(0).toUpperCase() + str.slice(1)
}

// Get initials from name
export const getInitials = (name) => {
  if (!name) return ''
  return name
    .split(' ')
    .map((word) => word[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)
}