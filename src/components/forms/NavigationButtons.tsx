'use client'

import { motion } from 'framer-motion'

interface NavigationButtonsProps {
  onBack: () => void
  onNext: () => void
  onSkip?: () => void
  canGoBack: boolean
  canGoNext: boolean
  canSkip?: boolean
  nextText?: string
  backText?: string
  skipText?: string
  className?: string
}

export default function NavigationButtons({
  onBack,
  onNext,
  onSkip,
  canGoBack,
  canGoNext,
  canSkip = false,
  nextText = 'Next',
  backText = 'Back',
  skipText = 'Skip',
  className = ''
}: NavigationButtonsProps) {
  return (
    <div className={`flex justify-between items-center gap-4 ${className}`}>
      {/* Back Button */}
      <motion.button
        onClick={onBack}
        disabled={!canGoBack}
        whileHover={canGoBack ? { scale: 1.02 } : {}}
        whileTap={canGoBack ? { scale: 0.98 } : {}}
        className={`
          px-6 py-3 rounded-lg font-semibold transition-all
          ${canGoBack
            ? 'bg-gray-200 hover:bg-gray-300 text-gray-700'
            : 'bg-gray-100 text-gray-400 cursor-not-allowed'
          }
        `}
      >
        {backText}
      </motion.button>

      {/* Skip Button (if applicable) */}
      {canSkip && onSkip && (
        <motion.button
          onClick={onSkip}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="px-6 py-3 rounded-lg font-semibold text-gray-500 hover:text-gray-700 transition-colors"
        >
          {skipText}
        </motion.button>
      )}

      {/* Next Button */}
      <motion.button
        onClick={onNext}
        disabled={!canGoNext}
        whileHover={canGoNext ? { scale: 1.02 } : {}}
        whileTap={canGoNext ? { scale: 0.98 } : {}}
        className={`
          px-6 py-3 rounded-lg font-semibold transition-all
          ${canGoNext
            ? 'bg-blue-500 hover:bg-blue-600 text-white shadow-lg'
            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }
        `}
      >
        {nextText}
      </motion.button>
    </div>
  )
} 