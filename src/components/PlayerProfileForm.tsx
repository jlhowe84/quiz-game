'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { PlayerProfile } from '@/types'

interface PlayerProfileFormProps {
  onSubmit: (profile: PlayerProfile) => void
}

const ageRanges = [
  { value: '5-8', label: '5-8 years old' },
  { value: '9-12', label: '9-12 years old' },
  { value: '13-17', label: '13-17 years old' },
  { value: '18-25', label: '18-25 years old' },
  { value: '26-35', label: '26-35 years old' },
  { value: '36-50', label: '36-50 years old' },
  { value: '50+', label: '50+ years old' },
]

const educationLevels = [
  { value: 'Elementary', label: 'Elementary School' },
  { value: 'Middle School', label: 'Middle School' },
  { value: 'High School', label: 'High School' },
  { value: 'College', label: 'College' },
  { value: 'Graduate', label: 'Graduate School' },
  { value: 'Professional', label: 'Professional' },
]

const skillLevels = [
  { value: 'Beginner', label: 'Beginner' },
  { value: 'Intermediate', label: 'Intermediate' },
  { value: 'Advanced', label: 'Advanced' },
  { value: 'Expert', label: 'Expert' },
]

const learningGoals = [
  { value: 'Fun', label: 'Just for Fun' },
  { value: 'Education', label: 'Educational' },
  { value: 'Competition', label: 'Competition' },
  { value: 'Skill Building', label: 'Skill Building' },
]

const complexityLevels = [
  { value: 'Simple', label: 'Simple' },
  { value: 'Moderate', label: 'Moderate' },
  { value: 'Challenging', label: 'Challenging' },
]

const interestOptions = [
  'Sports', 'Math', 'Science', 'History', 'Geography', 'Literature',
  'Technology', 'Entertainment', 'Art', 'Music', 'Cooking', 'Travel',
  'Animals', 'Space', 'Nature', 'Games', 'Movies', 'Books'
]

export default function PlayerProfileForm({ onSubmit }: PlayerProfileFormProps) {
  const [formData, setFormData] = useState<Partial<PlayerProfile>>({
    ageRange: '',
    educationLevel: '',
    skillLevel: '',
    interests: [],
    learningGoals: '',
    preferredComplexity: '',
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (isFormComplete()) {
      onSubmit(formData as PlayerProfile)
    }
  }

  const isFormComplete = () => {
    return (
      formData.ageRange &&
      formData.educationLevel &&
      formData.skillLevel &&
      formData.interests &&
      formData.interests.length > 0 &&
      formData.learningGoals &&
      formData.preferredComplexity
    )
  }

  const toggleInterest = (interest: string) => {
    setFormData(prev => ({
      ...prev,
      interests: prev.interests?.includes(interest)
        ? prev.interests.filter(i => i !== interest)
        : [...(prev.interests || []), interest]
    }))
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg"
    >
      <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
        Tell us about yourself!
      </h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Age Range */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            What's your age range?
          </label>
          <div className="grid grid-cols-2 gap-3">
            {ageRanges.map((range) => (
              <button
                key={range.value}
                type="button"
                onClick={() => setFormData(prev => ({ ...prev, ageRange: range.value }))}
                className={`
                  p-3 rounded-lg border-2 text-left transition-all
                  ${formData.ageRange === range.value
                    ? 'border-blue-500 bg-blue-50 text-blue-700'
                    : 'border-gray-200 hover:border-gray-300'
                  }
                `}
              >
                {range.label}
              </button>
            ))}
          </div>
        </div>

        {/* Education Level */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            What's your education level?
          </label>
          <div className="grid grid-cols-2 gap-3">
            {educationLevels.map((level) => (
              <button
                key={level.value}
                type="button"
                onClick={() => setFormData(prev => ({ ...prev, educationLevel: level.value }))}
                className={`
                  p-3 rounded-lg border-2 text-left transition-all
                  ${formData.educationLevel === level.value
                    ? 'border-blue-500 bg-blue-50 text-blue-700'
                    : 'border-gray-200 hover:border-gray-300'
                  }
                `}
              >
                {level.label}
              </button>
            ))}
          </div>
        </div>

        {/* Skill Level */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            How would you rate your knowledge level?
          </label>
          <div className="grid grid-cols-2 gap-3">
            {skillLevels.map((level) => (
              <button
                key={level.value}
                type="button"
                onClick={() => setFormData(prev => ({ ...prev, skillLevel: level.value }))}
                className={`
                  p-3 rounded-lg border-2 text-left transition-all
                  ${formData.skillLevel === level.value
                    ? 'border-blue-500 bg-blue-50 text-blue-700'
                    : 'border-gray-200 hover:border-gray-300'
                  }
                `}
              >
                {level.label}
              </button>
            ))}
          </div>
        </div>

        {/* Interests */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            What interests you? (Select multiple)
          </label>
          <div className="grid grid-cols-3 gap-2">
            {interestOptions.map((interest) => (
              <button
                key={interest}
                type="button"
                onClick={() => toggleInterest(interest)}
                className={`
                  p-2 rounded-lg border-2 text-sm transition-all
                  ${formData.interests?.includes(interest)
                    ? 'border-blue-500 bg-blue-50 text-blue-700'
                    : 'border-gray-200 hover:border-gray-300'
                  }
                `}
              >
                {interest}
              </button>
            ))}
          </div>
        </div>

        {/* Learning Goals */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            What's your main goal?
          </label>
          <div className="grid grid-cols-2 gap-3">
            {learningGoals.map((goal) => (
              <button
                key={goal.value}
                type="button"
                onClick={() => setFormData(prev => ({ ...prev, learningGoals: goal.value }))}
                className={`
                  p-3 rounded-lg border-2 text-left transition-all
                  ${formData.learningGoals === goal.value
                    ? 'border-blue-500 bg-blue-50 text-blue-700'
                    : 'border-gray-200 hover:border-gray-300'
                  }
                `}
              >
                {goal.label}
              </button>
            ))}
          </div>
        </div>

        {/* Complexity Preference */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            How challenging do you want the questions to be?
          </label>
          <div className="grid grid-cols-3 gap-3">
            {complexityLevels.map((level) => (
              <button
                key={level.value}
                type="button"
                onClick={() => setFormData(prev => ({ ...prev, preferredComplexity: level.value }))}
                className={`
                  p-3 rounded-lg border-2 text-center transition-all
                  ${formData.preferredComplexity === level.value
                    ? 'border-blue-500 bg-blue-50 text-blue-700'
                    : 'border-gray-200 hover:border-gray-300'
                  }
                `}
              >
                {level.label}
              </button>
            ))}
          </div>
        </div>

        {/* Submit Button */}
        <motion.button
          type="submit"
          disabled={!isFormComplete()}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className={`
            w-full py-4 px-6 rounded-lg font-semibold text-lg transition-all
            ${isFormComplete()
              ? 'bg-blue-500 hover:bg-blue-600 text-white shadow-lg'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }
          `}
        >
          Start Your Quiz Journey!
        </motion.button>
      </form>
    </motion.div>
  )
} 