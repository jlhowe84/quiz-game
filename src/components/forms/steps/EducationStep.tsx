'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { StepProps } from '@/types/form'

const educationLevels = [
  { value: 'Elementary', label: 'Elementary School', icon: '🏫', description: 'Grades K-5' },
  { value: 'Middle School', label: 'Middle School', icon: '🏫', description: 'Grades 6-8' },
  { value: 'High School', label: 'High School', icon: '🎓', description: 'Grades 9-12' },
  { value: 'College', label: 'College', icon: '🎓', description: 'Undergraduate' },
  { value: 'Graduate', label: 'Graduate School', icon: '🎓', description: 'Master\'s or PhD' },
  { value: 'Professional', label: 'Professional', icon: '💼', description: 'Working professional' },
]

export default function EducationStep({ data, onNext, onBack, onSkip, currentStep, totalSteps }: StepProps) {
  const handleEducationSelect = (educationLevel: string) => {
    onNext({ educationLevel })
  }

  // Filter education levels based on age range
  const getFilteredEducationLevels = () => {
    if (!data.ageRange) return educationLevels

    const ageRange = data.ageRange
    if (ageRange === '5-8') {
      return educationLevels.filter(level => ['Elementary'].includes(level.value))
    } else if (ageRange === '9-12') {
      return educationLevels.filter(level => ['Elementary', 'Middle School'].includes(level.value))
    } else if (ageRange === '13-17') {
      return educationLevels.filter(level => ['Middle School', 'High School'].includes(level.value))
    } else if (ageRange === '18-25') {
      return educationLevels.filter(level => ['High School', 'College', 'Graduate'].includes(level.value))
    } else {
      return educationLevels
    }
  }

  const filteredLevels = getFilteredEducationLevels()

  return (
    <div className="space-y-6">
      {/* Question */}
      <div className="text-center">
        <h3 className="text-2xl font-bold text-gray-800 mb-2">
          What's your education level?
        </h3>
        <p className="text-gray-600">
          This affects question complexity and terminology
        </p>
      </div>

      {/* Education Options */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredLevels.map((level, index) => (
          <motion.button
            key={level.value}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            onClick={() => handleEducationSelect(level.value)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`
              p-6 rounded-lg border-2 text-left transition-all
              ${data.educationLevel === level.value
                ? 'border-blue-500 bg-blue-50 text-blue-700 shadow-lg'
                : 'border-gray-200 hover:border-gray-300 bg-white hover:shadow-md'
              }
            `}
          >
            <div className="flex items-center space-x-4">
              <div className="text-3xl">{level.icon}</div>
              <div>
                <div className="font-semibold text-lg">{level.label}</div>
                <div className="text-sm text-gray-500">{level.description}</div>
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
              Your education level helps us determine the appropriate complexity of questions 
              and the terminology we use. This ensures you get questions that match your 
              current knowledge and learning goals.
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  )
} 