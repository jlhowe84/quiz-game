'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { StepProps } from '@/types/form'

export default function WelcomeStep({ data, onNext, onBack, onSkip, currentStep, totalSteps }: StepProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-center space-y-6"
    >
      {/* Welcome Icon */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
        className="w-24 h-24 mx-auto bg-blue-100 rounded-full flex items-center justify-center"
      >
        <span className="text-4xl">🎯</span>
      </motion.div>

      {/* Welcome Text */}
      <div className="space-y-4">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-4xl font-bold text-gray-800"
        >
          Welcome to Quiz Master!
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-xl text-gray-600"
        >
          Let's personalize your quiz experience
        </motion.p>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-lg text-gray-500"
        >
          This will only take 2-3 minutes
        </motion.p>
      </div>

      {/* Features Preview */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8"
      >
        <div className="bg-blue-50 p-4 rounded-lg">
          <div className="text-2xl mb-2">🎨</div>
          <h3 className="font-semibold text-gray-800">Personalized</h3>
          <p className="text-sm text-gray-600">Questions tailored to your interests</p>
        </div>
        <div className="bg-green-50 p-4 rounded-lg">
          <div className="text-2xl mb-2">🚀</div>
          <h3 className="font-semibold text-gray-800">AI-Powered</h3>
          <p className="text-sm text-gray-600">Dynamic question generation</p>
        </div>
        <div className="bg-purple-50 p-4 rounded-lg">
          <div className="text-2xl mb-2">📊</div>
          <h3 className="font-semibold text-gray-800">Analytics</h3>
          <p className="text-sm text-gray-600">Track your progress and improvement</p>
        </div>
      </motion.div>

      {/* Get Started Button */}
      <motion.button
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        onClick={() => onNext({})}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="mt-8 px-8 py-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg text-lg shadow-lg transition-all"
      >
        Get Started →
      </motion.button>
    </motion.div>
  )
} 