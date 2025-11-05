// src/components/ui/Card.jsx

import { motion } from 'framer-motion'

/**
 * Reusable Card Component
 * Container for content sections
 */

const Card = ({ children, className = '', hover = false, ...props }) => {
  const baseStyles = 'bg-white rounded-lg shadow-sm border border-gray-200'
  
  if (hover) {
    return (
      <motion.div
        whileHover={{ y: -2, boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
        className={`${baseStyles} ${className}`}
        {...props}
      >
        {children}
      </motion.div>
    )
  }

  return (
    <div className={`${baseStyles} ${className}`} {...props}>
      {children}
    </div>
  )
}

export default Card