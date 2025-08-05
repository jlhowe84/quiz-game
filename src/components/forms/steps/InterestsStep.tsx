'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { StepProps } from '@/types/form'

const interestOptions = [
  { value: 'Sports', icon: '⚽', category: 'Physical' },
  { value: 'Math', icon: '🔢', category: 'Academic' },
  { value: 'Science', icon: '🔬', category: 'Academic' },
  { value: 'History', icon: '📚', category: 'Academic' },
  { value: 'Geography', icon: '🌍', category: 'Academic' },
  { value: 'Literature', icon: '📖', category: 'Arts' },
  { value: 'Technology', icon: '💻', category: 'Technical' },
  { value: 'Entertainment', icon: '🎬', category: 'Media' },
  { value: 'Art', icon: '🎨', category: 'Arts' },
  { value: 'Music', icon: '🎵', category: 'Arts' },
  { value: 'Cooking', icon: '👨‍🍳', category: 'Lifestyle' },
  { value: 'Travel', icon: '✈️', category: 'Lifestyle' },
  { value: 'Animals', icon: '🐾', category: 'Nature' },
  { value: 'Space', icon: '🚀', category: 'Science' },
  { value: 'Nature', icon: '🌿', category: 'Nature' },
  { value: 'Games', icon: '🎮', category: 'Entertainment' },
  { value: 'Movies', icon: '🎭', category: 'Media' },
  { value: 'Books', icon: '📚', category: 'Arts' },
]

export default function InterestsStep({ data, onNext, onBack, onSkip, currentStep, totalSteps }: StepProps) {
  const currentInterests = data.interests || []

  const handleInterestToggle = (interest: string) => {
    const newInterests = currentInterests.includes(interest)
      ? currentInterests.filter(i => i !== interest)
      : [...currentInterests, interest]
    
    onNext({ interests: newInterests })
  }

  // Group interests by category
  const groupedInterests = interestOptions.reduce((acc, interest) => {
    if (!acc[interest.category]) {
      acc[interest.category] = []
    }
    acc[interest.category].push(interest)
    return acc
  }, {} as Record<string, typeof interestOptions>)

  return (
    <div className="space-y-6">
      {/* Question */}
      <div className="text-center">
        <h3 className="text-2xl font-bold text-gray-800 mb-2">
          What interests you?
        </h3>
        <p className="text-gray-600">
          Select all that apply - this helps us create personalized questions
        </p>
      </div>

      {/* Interest Categories */}
      <div className="space-y-6">
        {Object.entries(groupedInterests).map(([category, interests]) => (
          <div key={category} className="space-y-3">
            <h4 className="font-semibold text-gray-700 text-lg">{category}</h4>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {interests.map((interest, index) => (
                <motion.button
                  key={interest.value}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  onClick={() => handleInterestToggle(interest.value)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`
                    p-4 rounded-lg border-2 text-center transition-all
                    ${currentInterests.includes(interest.value)
                      ? 'border-blue-500 bg-blue-50 text-blue-700 shadow-lg'
                      : 'border-gray-200 hover:border-gray-300 bg-white hover:shadow-md'
                    }
                  `}
                >
                  <div className="text-2xl mb-2">{interest.icon}</div>
                  <div className="font-medium text-sm">{interest.value}</div>
                </motion.button>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Selection Summary */}
      {currentInterests.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-green-50 border border-green-200 rounded-lg p-4"
        >
          <div className="flex items-center space-x-3">
            <div className="text-green-500 text-xl">✅</div>
            <div>
              <h4 className="font-semibold text-green-800 mb-1">Great choices!</h4>
              <p className="text-green-700 text-sm">
                You've selected {currentInterests.length} interest{currentInterests.length !== 1 ? 's' : ''}:{' '}
                <span className="font-semibold">{currentInterests.join(', ')}</span>
              </p>
            </div>
          </div>
        </motion.div>
      )}

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
              Your interests help us create questions that are engaging and relevant to you. 
              We'll prioritize topics you're passionate about while still covering a good 
              range of subjects.
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  )
} 