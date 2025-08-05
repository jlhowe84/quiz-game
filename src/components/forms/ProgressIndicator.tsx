'use client'

import { motion } from 'framer-motion'

interface ProgressIndicatorProps {
  currentStep: number
  totalSteps: number
  className?: string
}

export default function ProgressIndicator({ 
  currentStep, 
  totalSteps, 
  className = '' 
}: ProgressIndicatorProps) {
  const progress = (currentStep / totalSteps) * 100

  return (
    <div className={`w-full ${className}`}>
      {/* Progress Bar */}
      <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
        <motion.div
          className="bg-blue-500 h-2 rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
        />
      </div>
      
      {/* Step Counter */}
      <div className="flex justify-between items-center text-sm text-gray-600">
        <span>Step {currentStep} of {totalSteps}</span>
        <span>{Math.round(progress)}% complete</span>
      </div>
    </div>
  )
} 