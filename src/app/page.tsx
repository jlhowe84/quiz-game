'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import PlayerProfileForm from '@/components/PlayerProfileForm'
import CategoryCard from '@/components/CategoryCard'
import QuizSession from '@/components/QuizSession'
import { PlayerProfile, Category } from '@/types'

export default function Home() {
  const [currentStep, setCurrentStep] = useState<'profile' | 'categories' | 'quiz'>('profile')
  const [playerProfile, setPlayerProfile] = useState<PlayerProfile | null>(null)
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null)
  const [questionCount, setQuestionCount] = useState<number>(10)

  // Mock categories for now - will be fetched from API
  const mockCategories: Category[] = [
    {
      id: '1',
      name: 'Sports',
      description: 'Test your knowledge about various sports and athletes',
      icon: '⚽',
      color: '#3B82F6',
      createdAt: new Date(),
    },
    {
      id: '2',
      name: 'Science',
      description: 'Explore the wonders of science and discovery',
      icon: '🔬',
      color: '#10B981',
      createdAt: new Date(),
    },
    {
      id: '3',
      name: 'History',
      description: 'Journey through time with historical facts and events',
      icon: '📚',
      color: '#F59E0B',
      createdAt: new Date(),
    },
    {
      id: '4',
      name: 'Geography',
      description: 'Discover the world through geography and culture',
      icon: '🌍',
      color: '#8B5CF6',
      createdAt: new Date(),
    },
    {
      id: '5',
      name: 'Technology',
      description: 'Stay updated with the latest in technology',
      icon: '💻',
      color: '#EF4444',
      createdAt: new Date(),
    },
    {
      id: '6',
      name: 'Entertainment',
      description: 'Test your knowledge of movies, music, and pop culture',
      icon: '🎬',
      color: '#EC4899',
      createdAt: new Date(),
    },
  ]

  const handleProfileSubmit = (profile: PlayerProfile) => {
    setPlayerProfile(profile)
    setCurrentStep('categories')
  }

  const handleCategorySelect = (category: Category) => {
    setSelectedCategory(category)
    setQuestionCount(10) // Default to 10 questions
    setCurrentStep('quiz')
  }

  const handleStartQuiz = (count: number) => {
    setQuestionCount(count)
    setCurrentStep('quiz')
  }

  const handleBackToCategories = () => {
    setCurrentStep('categories')
  }

  const handleBackToProfile = () => {
    setCurrentStep('profile')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Quiz Master
          </h1>
          <p className="text-lg text-gray-600">
            Personalized quizzes tailored just for you
          </p>
        </motion.div>

        {/* Progress Indicator */}
        <div className="flex justify-center mb-8">
          <div className="flex items-center space-x-4">
            <div className={`flex items-center ${currentStep === 'profile' ? 'text-blue-600' : 'text-gray-400'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${
                currentStep === 'profile' ? 'border-blue-600 bg-blue-600 text-white' : 'border-gray-300'
              }`}>
                1
              </div>
              <span className="ml-2 font-medium">Profile</span>
            </div>
            <div className={`w-12 h-0.5 ${currentStep === 'categories' || currentStep === 'quiz' ? 'bg-blue-600' : 'bg-gray-300'}`} />
            <div className={`flex items-center ${currentStep === 'categories' ? 'text-blue-600' : currentStep === 'quiz' ? 'text-green-600' : 'text-gray-400'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${
                currentStep === 'categories' ? 'border-blue-600 bg-blue-600 text-white' : 
                currentStep === 'quiz' ? 'border-green-600 bg-green-600 text-white' : 'border-gray-300'
              }`}>
                2
              </div>
              <span className="ml-2 font-medium">Category</span>
            </div>
            <div className={`w-12 h-0.5 ${currentStep === 'quiz' ? 'bg-green-600' : 'bg-gray-300'}`} />
            <div className={`flex items-center ${currentStep === 'quiz' ? 'text-green-600' : 'text-gray-400'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${
                currentStep === 'quiz' ? 'border-green-600 bg-green-600 text-white' : 'border-gray-300'
              }`}>
                3
              </div>
              <span className="ml-2 font-medium">Quiz</span>
            </div>
          </div>
        </div>

        {/* Content */}
        <AnimatePresence mode="wait">
          {currentStep === 'profile' && (
            <motion.div
              key="profile"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
            >
              <PlayerProfileForm onSubmit={handleProfileSubmit} />
            </motion.div>
          )}

          {currentStep === 'categories' && (
            <motion.div
              key="categories"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
              className="max-w-4xl mx-auto"
            >
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-2">
                  Choose Your Category
                </h2>
                <p className="text-gray-600">
                  Based on your profile, here are some great categories to start with
                </p>
                <button
                  onClick={handleBackToProfile}
                  className="mt-4 text-blue-600 hover:text-blue-800 underline"
                >
                  ← Back to Profile
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {mockCategories.map((category) => (
                  <CategoryCard
                    key={category.id}
                    category={category}
                    onClick={() => handleCategorySelect(category)}
                    isSelected={selectedCategory?.id === category.id}
                  />
                ))}
              </div>
            </motion.div>
          )}

          {currentStep === 'quiz' && selectedCategory && playerProfile && (
            <motion.div
              key="quiz"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
            >
              <QuizSession
                category={selectedCategory}
                playerProfile={playerProfile}
                questionCount={questionCount}
                onBackToCategories={handleBackToCategories}
                onNewQuiz={() => setCurrentStep('categories')}
              />
            </motion.div>
          )}


        </AnimatePresence>
      </div>
    </div>
  )
}
