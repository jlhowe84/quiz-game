'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { StepProps } from '@/types/form'

export default function ReviewStep({ data, onNext, onBack, onSkip, currentStep, totalSteps }: StepProps) {
  const handleEdit = (field: string) => {
    // This would trigger going back to the specific step
    // For now, we'll just show the data
    console.log(`Edit ${field}`)
  }

  const getAgeRangeLabel = (ageRange: string) => {
    const labels: Record<string, string> = {
      '5-8': '5-8 years old',
      '9-12': '9-12 years old',
      '13-17': '13-17 years old',
      '18-25': '18-25 years old',
      '26-35': '26-35 years old',
      '36-50': '36-50 years old',
      '50+': '50+ years old',
    }
    return labels[ageRange] || ageRange
  }

  const getEducationLabel = (education: string) => {
    const labels: Record<string, string> = {
      'Elementary': 'Elementary School',
      'Middle School': 'Middle School',
      'High School': 'High School',
      'College': 'College',
      'Graduate': 'Graduate School',
      'Professional': 'Professional',
    }
    return labels[education] || education
  }

  const getGoalLabel = (goal: string) => {
    const labels: Record<string, string> = {
      'Fun': 'Just for Fun',
      'Education': 'Educational',
      'Competition': 'Competition',
      'Skill Building': 'Skill Building',
    }
    return labels[goal] || goal
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h3 className="text-2xl font-bold text-gray-800 mb-2">
          Review Your Profile
        </h3>
        <p className="text-gray-600">
          Let's make sure everything looks right before we start your personalized quiz
        </p>
      </div>

      {/* Profile Summary */}
      <div className="bg-gray-50 rounded-lg p-6 space-y-4">
        <h4 className="font-semibold text-gray-800 text-lg mb-4">Your Profile Summary</h4>
        
        {/* Age Range */}
        <div className="flex justify-between items-center py-3 border-b border-gray-200">
          <div>
            <div className="font-medium text-gray-700">Age Range</div>
            <div className="text-sm text-gray-500">{getAgeRangeLabel(data.ageRange || '')}</div>
          </div>
          <button
            onClick={() => handleEdit('ageRange')}
            className="text-blue-500 hover:text-blue-700 text-sm font-medium"
          >
            Edit
          </button>
        </div>

        {/* Education Level */}
        <div className="flex justify-between items-center py-3 border-b border-gray-200">
          <div>
            <div className="font-medium text-gray-700">Education Level</div>
            <div className="text-sm text-gray-500">{getEducationLabel(data.educationLevel || '')}</div>
          </div>
          <button
            onClick={() => handleEdit('educationLevel')}
            className="text-blue-500 hover:text-blue-700 text-sm font-medium"
          >
            Edit
          </button>
        </div>

        {/* Skill Level */}
        <div className="flex justify-between items-center py-3 border-b border-gray-200">
          <div>
            <div className="font-medium text-gray-700">Skill Level</div>
            <div className="text-sm text-gray-500">{data.skillLevel || ''}</div>
          </div>
          <button
            onClick={() => handleEdit('skillLevel')}
            className="text-blue-500 hover:text-blue-700 text-sm font-medium"
          >
            Edit
          </button>
        </div>

        {/* Interests */}
        <div className="flex justify-between items-center py-3 border-b border-gray-200">
          <div>
            <div className="font-medium text-gray-700">Interests</div>
            <div className="text-sm text-gray-500">
              {data.interests && data.interests.length > 0 
                ? data.interests.join(', ')
                : 'None selected'
              }
            </div>
          </div>
          <button
            onClick={() => handleEdit('interests')}
            className="text-blue-500 hover:text-blue-700 text-sm font-medium"
          >
            Edit
          </button>
        </div>

        {/* Learning Goals */}
        <div className="flex justify-between items-center py-3 border-b border-gray-200">
          <div>
            <div className="font-medium text-gray-700">Learning Goal</div>
            <div className="text-sm text-gray-500">{getGoalLabel(data.learningGoals || '')}</div>
          </div>
          <button
            onClick={() => handleEdit('learningGoals')}
            className="text-blue-500 hover:text-blue-700 text-sm font-medium"
          >
            Edit
          </button>
        </div>

        {/* Complexity Preference */}
        <div className="flex justify-between items-center py-3">
          <div>
            <div className="font-medium text-gray-700">Complexity Preference</div>
            <div className="text-sm text-gray-500">{data.preferredComplexity || ''}</div>
          </div>
          <button
            onClick={() => handleEdit('preferredComplexity')}
            className="text-blue-500 hover:text-blue-700 text-sm font-medium"
          >
            Edit
          </button>
        </div>
      </div>

      {/* Confirmation */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-green-50 border border-green-200 rounded-lg p-4"
      >
        <div className="flex items-center space-x-3">
          <div className="text-green-500 text-xl">✅</div>
          <div>
            <h4 className="font-semibold text-green-800 mb-1">Ready to start!</h4>
            <p className="text-green-700 text-sm">
              Your profile is complete and ready. We'll use this information to create 
              personalized questions just for you. You can always update your preferences later.
            </p>
          </div>
        </div>
      </motion.div>

      {/* Start Button */}
      <motion.button
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        onClick={() => onNext({})}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="w-full py-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg text-lg shadow-lg transition-all"
      >
        Start My Personalized Quiz! 🚀
      </motion.button>
    </div>
  )
} 