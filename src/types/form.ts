import React from 'react'
import { PlayerProfile } from './index'

export interface FormStep {
  id: string
  title: string
  description?: string
  component: React.ComponentType<StepProps>
  validation?: (data: Partial<PlayerProfile>) => boolean
  isOptional?: boolean
  canSkip?: boolean
}

export interface StepProps {
  data: Partial<PlayerProfile>
  onNext: (data: Partial<PlayerProfile>) => void
  onBack: () => void
  onSkip?: () => void
  currentStep: number
  totalSteps: number
}

export interface FormState {
  currentStep: number
  totalSteps: number
  formData: Partial<PlayerProfile>
  isComplete: boolean
  canProceed: boolean
  errors: Record<string, string>
}

export interface SmartDefaults {
  ageRange?: string
  educationLevel?: string
  skillLevel?: string
  interests?: string[]
  learningGoals?: string
  preferredComplexity?: string
}

export interface StepValidation {
  [key: string]: (data: Partial<PlayerProfile>) => boolean
} 