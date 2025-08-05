'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { StepProps } from '@/types/form'

const ageRanges = [
  { value: '5-8', label: '5-8 years old', icon: '👶', description: 'Young children' },
  { value: '9-12', label: '9-12 years old', icon: '🧒', description: 'Pre-teens' },
  { value: '13-17', label: '13-17 years old', icon: '👨‍🎓', description: 'Teenagers' },
  { value: '18-25', label: '18-25 years old', icon: '👨‍🎓', description: 'Young adults' },
  { value: '26-35', label: '26-35 years old', icon: '👨‍💼', description: 'Adults' },
  { value: '36-50', label: '36-50 years old', icon: '👨‍💼', description: 'Adults' },
  { value: '50+', label: '50+ years old', icon: '👴', description: 'Seniors' },
]

export default function AgeRangeStep({ data, onNext, onBack, onSkip, currentStep, totalSteps }: StepProps) {
  const handleAgeSelect = (ageRange: string) => {
    onNext({ ageRange })
  }

  return (
    <div className="space-y-6">
      {/* Question */}
      <div className="text-center">
        <h3 className="text-2xl font-bold text-gray-800 mb-2">
          What's your age range?
        </h3>
        <p className="text-gray-600">
          This helps us choose age-appropriate content for you
        </p>
      </div>

      {/* Age Options */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {ageRanges.map((range, index) => (
          <motion.button
            key={range.value}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            onClick={() => handleAgeSelect(range.value)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`
              p-6 rounded-lg border-2 text-left transition-all
              ${data.ageRange === range.value
                ? 'border-blue-500 bg-blue-50 text-blue-700 shadow-lg'
                : 'border-gray-200 hover:border-gray-300 bg-white hover:shadow-md'
              }
            `}
          >
            <div className="flex items-center space-x-4">
              <div className="text-3xl">{range.icon}</div>
              <div>
                <div className="font-semibold text-lg">{range.label}</div>
                <div className="text-sm text-gray-500">{range.description}</div>
              </div>
            </div>
          </motion.button>
        ))}
      </div>

      {/* Help Text */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="bg-blue-50 p-4 rounded-lg"
      >
        <div className="flex items-start space-x-3">
          <div className="text-blue-500 text-xl">💡</div>
          <div>
            <h4 className="font-semibold text-blue-800 mb-1">Why we ask this</h4>
            <p className="text-blue-700 text-sm">
              Your age helps us create questions that are appropriate for your knowledge level 
              and interests. We'll adjust the language complexity and topic selection accordingly.
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  )
} 