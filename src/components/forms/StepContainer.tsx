'use client'

import { motion } from 'framer-motion'
import { ReactNode } from 'react'

interface StepContainerProps {
  children: ReactNode
  title?: string
  description?: string
  className?: string
}

export default function StepContainer({ 
  children, 
  title, 
  description, 
  className = '' 
}: StepContainerProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      className={`max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg ${className}`}
    >
      {title && (
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            {title}
          </h2>
          {description && (
            <p className="text-gray-600 text-lg">
              {description}
            </p>
          )}
        </div>
      )}
      <div className="space-y-6">
        {children}
      </div>
    </motion.div>
  )
} 