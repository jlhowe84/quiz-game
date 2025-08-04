'use client'

import { Category } from '@/types'
import { motion } from 'framer-motion'

interface CategoryCardProps {
  category: Category
  onClick: () => void
  isSelected?: boolean
}

export default function CategoryCard({ category, onClick, isSelected = false }: CategoryCardProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={`
        relative p-6 rounded-lg cursor-pointer transition-all duration-200
        ${isSelected 
          ? 'bg-blue-500 text-white shadow-lg' 
          : 'bg-white hover:bg-gray-50 text-gray-800 shadow-md hover:shadow-lg'
        }
        border-2 ${isSelected ? 'border-blue-600' : 'border-gray-200'}
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
      </div>
    </motion.div>
  )
} 