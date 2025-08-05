'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { StepProps } from '@/types/form'

const skillLevels = [
  { 
    value: 'Beginner', 
    label: 'Beginner', 
    icon: '🌱', 
    description: 'Just starting out or learning the basics',
    color: 'bg-green-50 border-green-200 text-green-700'
  },
  { 
    value: 'Intermediate', 
    label: 'Intermediate', 
    icon: '🌿', 
    description: 'Some experience and knowledge',
    color: 'bg-blue-50 border-blue-200 text-blue-700'
  },
  { 
    value: 'Advanced', 
    label: 'Advanced', 
    icon: '🌳', 
    description: 'Good understanding and experience',
    color: 'bg-purple-50 border-purple-200 text-purple-700'
  },
  { 
    value: 'Expert', 
    label: 'Expert', 
    icon: '🏆', 
    description: 'Deep knowledge and mastery',
    color: 'bg-orange-50 border-orange-200 text-orange-700'
  },
]

export default function SkillLevelStep({ data, onNext, onBack, onSkip, currentStep, totalSteps }: StepProps) {
  const handleSkillSelect = (skillLevel: string) => {
    onNext({ skillLevel })
  }

  // Get smart suggestion based on education level
  const getSmartSuggestion = () => {
    if (!data.educationLevel) return null

    const suggestions: Record<string, string> = {
      'Elementary': 'Beginner',
      'Middle School': 'Beginner',
      'High School': 'Intermediate',
      'College': 'Advanced',
      'Graduate': 'Expert',
      'Professional': 'Advanced'
    }

    return suggestions[data.educationLevel]
  }

  const smartSuggestion = getSmartSuggestion()

  return (
    <div className="space-y-6">
      {/* Question */}
      <div className="text-center">
        <h3 className="text-2xl font-bold text-gray-800 mb-2">
          How would you rate your knowledge level?
        </h3>
        <p className="text-gray-600">
          Be honest - this helps us create the perfect challenge for you
        </p>
      </div>

      {/* Smart Suggestion */}
      {smartSuggestion && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-yellow-50 border border-yellow-200 rounded-lg p-4"
        >
          <div className="flex items-center space-x-3">
            <div className="text-yellow-500 text-xl">💡</div>
            <div>
              <h4 className="font-semibold text-yellow-800">Suggested for you</h4>
              <p className="text-yellow-700 text-sm">
                Based on your education level, we suggest starting with{' '}
                <span className="font-semibold">{smartSuggestion}</span>
              </p>
            </div>
          </div>
        </motion.div>
      )}

      {/* Skill Options */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {skillLevels.map((level, index) => (
          <motion.button
            key={level.value}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            onClick={() => handleSkillSelect(level.value)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`
              p-6 rounded-lg border-2 text-left transition-all
              ${data.skillLevel === level.value
                ? `${level.color} shadow-lg`
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
            <h4 className="font-semibold text-blue-800 mb-1">Don't worry about getting it perfect</h4>
            <p className="text-blue-700 text-sm">
              You can always adjust the difficulty later. We'll also adapt the questions 
              based on your performance, so you'll always get the right level of challenge.
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  )
} 