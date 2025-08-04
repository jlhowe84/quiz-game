'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { QuizQuestion as QuizQuestionType } from '@/types'

interface QuizQuestionProps {
  question: QuizQuestionType
  questionNumber: number
  totalQuestions: number
  onAnswer: (answer: string) => void
  timeLimit?: number // in seconds
  onTimeUp: () => void
}

export default function QuizQuestion({
  question,
  questionNumber,
  totalQuestions,
  onAnswer,
  timeLimit = 30,
  onTimeUp,
}: QuizQuestionProps) {
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)
  const [timeLeft, setTimeLeft] = useState(timeLimit)
  const [isAnswered, setIsAnswered] = useState(false)

  // Timer effect
  useEffect(() => {
    if (timeLeft <= 0) {
      onTimeUp()
      return
    }

    const timer = setInterval(() => {
      setTimeLeft(prev => prev - 1)
    }, 1000)

    return () => clearInterval(timer)
  }, [timeLeft, onTimeUp])

  const handleAnswerSelect = (answer: string) => {
    if (isAnswered) return
    
    setSelectedAnswer(answer)
    setIsAnswered(true)
    
    // Small delay to show the selection before moving to next question
    setTimeout(() => {
      onAnswer(answer)
    }, 1000)
  }

  const getAnswerClass = (answer: string) => {
    if (!isAnswered) {
      return selectedAnswer === answer
        ? 'border-blue-500 bg-blue-50'
        : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
    }

    if (answer === question.correctAnswer) {
      return 'border-green-500 bg-green-50 text-green-700'
    }

    if (selectedAnswer === answer && answer !== question.correctAnswer) {
      return 'border-red-500 bg-red-50 text-red-700'
    }

    return 'border-gray-200 bg-gray-50 text-gray-500'
  }

  const progressPercentage = ((questionNumber - 1) / totalQuestions) * 100

  return (
    <div className="max-w-2xl mx-auto">
      {/* Progress Bar */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-gray-700">
            Question {questionNumber} of {totalQuestions}
          </span>
          <span className="text-sm font-medium text-gray-700">
            {Math.ceil(timeLeft)}s
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <motion.div
            className="bg-blue-500 h-2 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${progressPercentage}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </div>

      {/* Timer Bar */}
      <div className="mb-6">
        <div className="w-full bg-gray-200 rounded-full h-1">
          <motion.div
            className={`h-1 rounded-full ${
              timeLeft > 10 ? 'bg-green-500' : timeLeft > 5 ? 'bg-yellow-500' : 'bg-red-500'
            }`}
            initial={{ width: '100%' }}
            animate={{ width: `${(timeLeft / timeLimit) * 100}%` }}
            transition={{ duration: 1, ease: 'linear' }}
          />
        </div>
      </div>

      {/* Question */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-lg shadow-lg p-8 mb-6"
      >
        <h2 className="text-xl font-semibold text-gray-800 mb-6 leading-relaxed">
          {question.question}
        </h2>

        {/* Answer Options */}
        <div className="space-y-3">
          {question.options.map((option, index) => (
            <motion.button
              key={index}
              onClick={() => handleAnswerSelect(option)}
              disabled={isAnswered}
              className={`
                w-full p-4 text-left rounded-lg border-2 transition-all duration-200
                ${getAnswerClass(option)}
                ${!isAnswered ? 'cursor-pointer' : 'cursor-default'}
              `}
              whileHover={!isAnswered ? { scale: 1.02 } : {}}
              whileTap={!isAnswered ? { scale: 0.98 } : {}}
            >
              <div className="flex items-center">
                <span className="w-8 h-8 rounded-full border-2 border-current flex items-center justify-center text-sm font-semibold mr-3">
                  {String.fromCharCode(65 + index)} {/* A, B, C, D */}
                </span>
                <span className="text-lg">{option}</span>
              </div>
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* Explanation (shown after answering) */}
      <AnimatePresence>
        {isAnswered && question.explanation && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6"
          >
            <h3 className="font-semibold text-blue-800 mb-2">Explanation:</h3>
            <p className="text-blue-700">{question.explanation}</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Next Question Button */}
      <AnimatePresence>
        {isAnswered && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <div className="text-sm text-gray-600 mb-2">
              {selectedAnswer === question.correctAnswer ? (
                <span className="text-green-600">✓ Correct!</span>
              ) : (
                <span className="text-red-600">✗ Incorrect. The correct answer was: {question.correctAnswer}</span>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
} 