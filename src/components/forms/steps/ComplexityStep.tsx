'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { StepProps } from '@/types/form'

const complexityLevels = [
  { 
    value: 'Simple', 
    label: 'Simple', 
    icon: '🌱', 
    description: 'Easy questions, basic concepts',
    examples: ['What is 2+2?', 'What color is the sky?'],
    color: 'bg-green-50 border-green-200 text-green-700'
  },
  { 
    value: 'Moderate', 
    label: 'Moderate', 
    icon: '🌿', 
    description: 'Balanced difficulty, some challenge',
    examples: ['What is the capital of France?', 'Who wrote Romeo and Juliet?'],
    color: 'bg-blue-50 border-blue-200 text-blue-700'
  },
  { 
    value: 'Challenging', 
    label: 'Challenging', 
    icon: '🌳', 
    description: 'Difficult questions, deep knowledge',
    examples: ['What is the molecular formula for glucose?', 'Who was the first emperor of Rome?'],
    color: 'bg-purple-50 border-purple-200 text-purple-700'
  },
]

export default function ComplexityStep({ data, onNext, onBack, onSkip, currentStep, totalSteps }: StepProps) {
  const handleComplexitySelect = (preferredComplexity: string) => {
    onNext({ preferredComplexity })
  }

  // Get smart suggestion based on skill level and goals
  const getSmartSuggestion = () => {
    if (!data.skillLevel || !data.learningGoals) return null

    const suggestions: Record<string, Record<string, string>> = {
      'Beginner': {
        'Fun': 'Simple',
        'Education': 'Simple',
        'Competition': 'Moderate',
        'Skill Building': 'Simple'
      },
      'Intermediate': {
        'Fun': 'Moderate',
        'Education': 'Moderate',
        'Competition': 'Challenging',
        'Skill Building': 'Moderate'
      },
      'Advanced': {
        'Fun': 'Moderate',
        'Education': 'Challenging',
        'Competition': 'Challenging',
        'Skill Building': 'Challenging'
      },
      'Expert': {
        'Fun': 'Challenging',
        'Education': 'Challenging',
        'Competition': 'Challenging',
        'Skill Building': 'Challenging'
      }
    }

    return suggestions[data.skillLevel]?.[data.learningGoals]
  }

  const smartSuggestion = getSmartSuggestion()

  return (
    <div className="space-y-6">
      {/* Question */}
      <div className="text-center">
        <h3 className="text-2xl font-bold text-gray-800 mb-2">
          How challenging do you want the questions to be?
        </h3>
        <p className="text-gray-600">
          Choose the complexity level that matches your comfort zone
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
                Based on your skill level and goals, we suggest{' '}
                <span className="font-semibold">{smartSuggestion}</span> complexity
              </p>
            </div>
          </div>
        </motion.div>
      )}

      {/* Complexity Options */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {complexityLevels.map((level, index) => (
          <motion.button
            key={level.value}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            onClick={() => handleComplexitySelect(level.value)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`
              p-6 rounded-lg border-2 text-center transition-all
              ${data.preferredComplexity === level.value
                ? `${level.color} shadow-lg`
                : 'border-gray-200 hover:border-gray-300 bg-white hover:shadow-md'
              }
            `}
          >
            <div className="text-3xl mb-3">{level.icon}</div>
            <div className="font-semibold text-lg mb-2">{level.label}</div>
            <div className="text-sm text-gray-500 mb-4">{level.description}</div>
            
            {/* Examples */}
            <div className="text-xs text-gray-400 space-y-1">
              <div className="font-semibold">Examples:</div>
              {level.examples.map((example, i) => (
                <div key={i} className="italic">"{example}"</div>
              ))}
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
            <h4 className="font-semibold text-blue-800 mb-1">You can always adjust this later</h4>
            <p className="text-blue-700 text-sm">
              Don't worry about getting this perfect. We'll also adapt the difficulty 
              based on your performance, so you'll always get questions that are just 
              right for your current level.
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  )
} 