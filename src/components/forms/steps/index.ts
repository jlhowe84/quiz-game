import { FormStep } from '@/types/form'
import WelcomeStep from './WelcomeStep'
import AgeRangeStep from './AgeRangeStep'
import EducationStep from './EducationStep'
import SkillLevelStep from './SkillLevelStep'
import InterestsStep from './InterestsStep'
import GoalsStep from './GoalsStep'
import ComplexityStep from './ComplexityStep'
import ReviewStep from './ReviewStep'

// Validation functions
const validateAgeRange = (data: any) => !!data.ageRange
const validateEducationLevel = (data: any) => !!data.educationLevel
const validateSkillLevel = (data: any) => !!data.skillLevel
const validateInterests = (data: any) => data.interests && data.interests.length > 0
const validateLearningGoals = (data: any) => !!data.learningGoals
const validatePreferredComplexity = (data: any) => !!data.preferredComplexity

// Step configuration
export const formSteps: FormStep[] = [
  {
    id: 'welcome',
    title: 'Welcome to Quiz Master!',
    description: 'Let\'s personalize your quiz experience',
    component: WelcomeStep,
    validation: () => true, // Always valid
    isOptional: false,
    canSkip: false,
  },
  {
    id: 'age-range',
    title: 'Age Range',
    description: 'This helps us choose age-appropriate content for you',
    component: AgeRangeStep,
    validation: validateAgeRange,
    isOptional: false,
    canSkip: false,
  },
  {
    id: 'education-level',
    title: 'Education Level',
    description: 'This affects question complexity and terminology',
    component: EducationStep,
    validation: validateEducationLevel,
    isOptional: false,
    canSkip: false,
  },
  {
    id: 'skill-level',
    title: 'Skill Level',
    description: 'Be honest - this helps us create the perfect challenge for you',
    component: SkillLevelStep,
    validation: validateSkillLevel,
    isOptional: false,
    canSkip: false,
  },
  {
    id: 'interests',
    title: 'Interests',
    description: 'Select all that apply - this helps us create personalized questions',
    component: InterestsStep,
    validation: validateInterests,
    isOptional: false,
    canSkip: false,
  },
  {
    id: 'learning-goals',
    title: 'Learning Goals',
    description: 'This helps us tailor your experience to what you want to achieve',
    component: GoalsStep,
    validation: validateLearningGoals,
    isOptional: false,
    canSkip: false,
  },
  {
    id: 'complexity',
    title: 'Complexity Preference',
    description: 'Choose the complexity level that matches your comfort zone',
    component: ComplexityStep,
    validation: validatePreferredComplexity,
    isOptional: false,
    canSkip: false,
  },
  {
    id: 'review',
    title: 'Review Your Profile',
    description: 'Let\'s make sure everything looks right before we start your personalized quiz',
    component: ReviewStep,
    validation: () => true, // Always valid for review
    isOptional: false,
    canSkip: false,
  },
]

export {
  WelcomeStep,
  AgeRangeStep,
  EducationStep,
  SkillLevelStep,
  InterestsStep,
  GoalsStep,
  ComplexityStep,
  ReviewStep,
} 