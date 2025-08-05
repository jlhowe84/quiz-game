'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { StepProps } from '@/types/form'

const learningGoals = [
  { 
    value: 'Fun', 
    label: 'Just for Fun', 
    icon: '🎉', 
    description: 'I want to have a good time and learn something new',
    color: 'bg-yellow-50 border-yellow-200 text-yellow-700'
  },
  { 
    value: 'Education', 
    label: 'Educational', 
    icon: '📚', 
    description: 'I want to learn and expand my knowledge',
    color: 'bg-blue-50 border-blue-200 text-blue-700'
  },
  { 
    value: 'Competition', 
    label: 'Competition', 
    icon: '🏆', 
    description: 'I want to challenge myself and compete',
    color: 'bg-purple-50 border-purple-200 text-purple-700'
  },
  { 
    value: 'Skill Building', 
    label: 'Skill Building', 
    icon: '🔨', 
    description: 'I want to improve specific skills',
    color: 'bg-green-50 border-green-200 text-green-700'
  },
]

export default function GoalsStep({ data, onNext, onBack, onSkip, currentStep, totalSteps }: StepProps) {
  const handleGoalSelect = (learningGoals: string) => {
    onNext({ learningGoals })
  }

  return (
    <div className="space-y-6">
      {/* Question */}
      <div className="text-center">
        <h3 className="text-2xl font-bold text-gray-800 mb-2">
          What's your main goal?
        </h3>
        <p className="text-gray-600">
          This helps us tailor your experience to what you want to achieve
        </p>
      </div>

      {/* Goal Options */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {learningGoals.map((goal, index) => (
          <motion.button
            key={goal.value}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            onClick={() => handleGoalSelect(goal.value)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`
              p-6 rounded-lg border-2 text-left transition-all
              ${data.learningGoals === goal.value
                ? `${goal.color} shadow-lg`
                : 'border-gray-200 hover:border-gray-300 bg-white hover:shadow-md'
              }
            `}
          >
            <div className="flex items-center space-x-4">
              <div className="text-3xl">{goal.icon}</div>
              <div>
                <div className="font-semibold text-lg">{goal.label}</div>
                <div className="text-sm text-gray-500">{goal.description}</div>
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
              Your learning goal helps us determine the tone, difficulty, and focus of your 
              questions. Whether you want to have fun, learn seriously, compete, or build 
              specific skills, we'll adjust the experience accordingly.
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  )
} 