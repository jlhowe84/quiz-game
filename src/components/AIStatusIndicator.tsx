'use client'

import { motion } from 'framer-motion'

interface AIStatusIndicatorProps {
  isGenerating: boolean
  isAIGenerated: boolean
}

export default function AIStatusIndicator({ isGenerating, isAIGenerated }: AIStatusIndicatorProps) {
  if (!isGenerating && !isAIGenerated) return null

  return (
    <div className="fixed top-4 right-4 z-50">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className={`
          flex items-center space-x-2 px-4 py-2 rounded-full shadow-lg
          ${isGenerating 
            ? 'bg-blue-500 text-white' 
            : 'bg-green-500 text-white'
          }
        `}
      >
        {isGenerating ? (
          <>
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
            <span className="text-sm font-medium">AI Generating Questions...</span>
          </>
        ) : (
          <>
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            <span className="text-sm font-medium">AI Generated Questions</span>
          </>
        )}
      </motion.div>
    </div>
  )
} 