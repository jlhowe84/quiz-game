'use client'

import React from 'react'
import { StepProps } from '@/types/form'

const WelcomeStep: React.FC<StepProps> = ({ data, onNext, onBack, onSkip, currentStep, totalSteps }) => {
  return (
    <div className="text-center space-y-6">
      <h1 className="text-4xl font-bold text-gray-800">
        Welcome to Quiz Master!
      </h1>
      <p className="text-xl text-gray-600">
        Let's personalize your quiz experience
      </p>
      <button
        onClick={() => onNext({})}
        className="mt-8 px-8 py-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg text-lg shadow-lg transition-all"
      >
        Get Started →
      </button>
    </div>
  )
}

export default WelcomeStep 