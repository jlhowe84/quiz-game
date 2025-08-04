'use client'

import { useState } from 'react'
import { Category } from '@/types'
import { motion, AnimatePresence } from 'framer-motion'

interface CategoryCardProps {
  category: Category
  onClick: (difficulty?: 'easy' | 'medium' | 'hard') => void
  isSelected?: boolean
  isRecommended?: boolean
}

export default function CategoryCard({ category, onClick, isSelected = false, isRecommended = false }: CategoryCardProps) {
  const [showDifficulties, setShowDifficulties] = useState(false)

  const handleCardClick = () => {
    setShowDifficulties(!showDifficulties)
  }

  const handleDifficultySelect = (difficulty: 'easy' | 'medium' | 'hard') => {
    onClick(difficulty)
  }

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={handleCardClick}
      className={`
        relative p-6 rounded-lg cursor-pointer transition-all duration-200
        ${isSelected 
          ? 'bg-blue-500 text-white shadow-lg' 
          : isRecommended
          ? 'bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-300 hover:bg-gradient-to-br hover:from-blue-100 hover:to-indigo-100 text-gray-800 shadow-md hover:shadow-lg'
          : 'bg-white hover:bg-gray-50 text-gray-800 shadow-md hover:shadow-lg'
        }
        border-2 ${isSelected ? 'border-blue-600' : isRecommended ? 'border-blue-300' : 'border-gray-200'}
      `}
    >
      <div className="flex flex-col items-center text-center space-y-3">
        {category.icon && (
          <div className="text-3xl mb-2">
            {category.icon}
          </div>
        )}
        
        <h3 className="text-xl font-bold">{category.name}</h3>
        
        {category.description && (
          <p className="text-sm opacity-80">
            {category.description}
          </p>
        )}
        
        {isSelected && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute top-2 right-2 w-6 h-6 bg-white rounded-full flex items-center justify-center"
          >
            <svg className="w-4 h-4 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          </motion.div>
        )}
        
        {isRecommended && !isSelected && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute top-2 left-2 px-2 py-1 bg-blue-500 text-white text-xs font-medium rounded-full"
          >
            Recommended
          </motion.div>
        )}
      </div>

      {/* Difficulty Selection */}
      <AnimatePresence>
        {showDifficulties && !isSelected && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-4 pt-4 border-t border-gray-200"
          >
            <p className="text-sm font-medium text-gray-700 mb-3 text-center">
              Choose Difficulty:
            </p>
            <div className="grid grid-cols-3 gap-2">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={(e) => {
                  e.stopPropagation()
                  handleDifficultySelect('easy')
                }}
                className="px-3 py-2 bg-green-500 hover:bg-green-600 text-white text-sm font-medium rounded-lg transition-colors"
              >
                Easy
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={(e) => {
                  e.stopPropagation()
                  handleDifficultySelect('medium')
                }}
                className="px-3 py-2 bg-yellow-500 hover:bg-yellow-600 text-white text-sm font-medium rounded-lg transition-colors"
              >
                Medium
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={(e) => {
                  e.stopPropagation()
                  handleDifficultySelect('hard')
                }}
                className="px-3 py-2 bg-red-500 hover:bg-red-600 text-white text-sm font-medium rounded-lg transition-colors"
              >
                Hard
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
} 