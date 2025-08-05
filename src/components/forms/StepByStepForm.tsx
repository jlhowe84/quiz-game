'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { PlayerProfile } from '@/types'
import { FormStep, StepProps, FormState } from '@/types/form'
import StepContainer from './StepContainer'
import ProgressIndicator from './ProgressIndicator'
import NavigationButtons from './NavigationButtons'
import StepTransition from './StepTransition'

interface StepByStepFormProps {
  steps: FormStep[]
  onSubmit: (profile: PlayerProfile) => void
  initialData?: Partial<PlayerProfile>
  className?: string
}

export default function StepByStepForm({
  steps,
  onSubmit,
  initialData = {},
  className = ''
}: StepByStepFormProps) {
  const [currentStep, setCurrentStep] = useState(0)
  const [formData, setFormData] = useState<Partial<PlayerProfile>>(initialData)
  const [direction, setDirection] = useState<'forward' | 'backward'>('forward')

  const totalSteps = steps.length
  const currentStepData = steps[currentStep]
  const isFirstStep = currentStep === 0
  const isLastStep = currentStep === totalSteps - 1

  // Check if current step is valid
  const isCurrentStepValid = () => {
    const validation = currentStepData.validation
    return validation ? validation(formData) : true
  }

  // Handle next step
  const handleNext = () => {
    if (isCurrentStepValid() && !isLastStep) {
      setDirection('forward')
      setCurrentStep(prev => prev + 1)
    } else if (isLastStep && isCurrentStepValid()) {
      // Submit the form
      onSubmit(formData as PlayerProfile)
    }
  }

  // Handle back step
  const handleBack = () => {
    if (!isFirstStep) {
      setDirection('backward')
      setCurrentStep(prev => prev - 1)
    }
  }

  // Handle skip step
  const handleSkip = () => {
    if (currentStepData.canSkip && !isLastStep) {
      setDirection('forward')
      setCurrentStep(prev => prev + 1)
    }
  }

  // Handle step data update
  const handleStepDataUpdate = (newData: Partial<PlayerProfile>) => {
    setFormData(prev => ({ ...prev, ...newData }))
  }

  // Keyboard navigation
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key === 'Enter' && isCurrentStepValid()) {
        handleNext()
      } else if (event.key === 'ArrowLeft' && !isFirstStep) {
        handleBack()
      } else if (event.key === 'ArrowRight' && isCurrentStepValid() && !isLastStep) {
        handleNext()
      } else if (event.key === 'Escape' && currentStepData.canSkip) {
        handleSkip()
      }
    }

    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [currentStep, formData, isCurrentStepValid, isFirstStep, isLastStep])

  if (!currentStepData) {
    return <div>Error: Step not found</div>
  }

  const StepComponent = currentStepData.component

  return (
    <div className={`w-full max-w-4xl mx-auto ${className}`}>
      {/* Progress Indicator */}
      <div className="mb-8">
        <ProgressIndicator
          currentStep={currentStep + 1}
          totalSteps={totalSteps}
        />
      </div>

      {/* Step Content */}
      <StepTransition
        stepKey={currentStep}
        direction={direction}
      >
        <StepContainer
          title={currentStepData.title}
          description={currentStepData.description}
        >
          <StepComponent
            data={formData}
            onNext={handleStepDataUpdate}
            onBack={handleBack}
            onSkip={currentStepData.canSkip ? handleSkip : undefined}
            currentStep={currentStep + 1}
            totalSteps={totalSteps}
          />
        </StepContainer>
      </StepTransition>

      {/* Navigation Buttons */}
      <div className="mt-8">
        <NavigationButtons
          onBack={handleBack}
          onNext={handleNext}
          onSkip={currentStepData.canSkip ? handleSkip : undefined}
          canGoBack={!isFirstStep}
          canGoNext={isCurrentStepValid()}
          canSkip={currentStepData.canSkip}
          nextText={isLastStep ? 'Start Quiz!' : 'Next'}
          backText="Back"
          skipText="Skip"
        />
      </div>
    </div>
  )
} 