'use client'

import { motion } from 'framer-motion'
import { QuizState, QuizQuestion } from '@/types'

interface QuizResultsProps {
  quizState: QuizState
  questions: QuizQuestion[]
  categoryName: string
  onRestart: () => void
  onNewQuiz: () => void
}

export default function QuizResults({
  quizState,
  questions,
  categoryName,
  onRestart,
  onNewQuiz,
}: QuizResultsProps) {
  const score = quizState.score
  const totalQuestions = quizState.totalQuestions
  const percentage = Math.round((score / totalQuestions) * 100)
  const timeElapsed = quizState.timeElapsed
  const averageTime = Math.round(timeElapsed / totalQuestions)

  const getScoreMessage = () => {
    if (percentage >= 90) return { message: 'Excellent!', color: 'text-green-600', bg: 'bg-green-50' }
    if (percentage >= 80) return { message: 'Great job!', color: 'text-green-600', bg: 'bg-green-50' }
    if (percentage >= 70) return { message: 'Good work!', color: 'text-blue-600', bg: 'bg-blue-50' }
    if (percentage >= 60) return { message: 'Not bad!', color: 'text-yellow-600', bg: 'bg-yellow-50' }
    if (percentage >= 50) return { message: 'Keep practicing!', color: 'text-orange-600', bg: 'bg-orange-50' }
    return { message: 'Better luck next time!', color: 'text-red-600', bg: 'bg-red-50' }
  }

  const scoreInfo = getScoreMessage()

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Main Results Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-lg shadow-lg p-8 mb-8"
      >
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">
            Quiz Complete!
          </h2>
          <p className="text-gray-600">
            Category: <span className="font-semibold">{categoryName}</span>
          </p>
        </div>

        {/* Score Display */}
        <div className={`rounded-lg p-6 mb-8 ${scoreInfo.bg}`}>
          <div className="text-center">
            <div className="text-6xl font-bold mb-4 text-gray-800">
              {percentage}%
            </div>
            <div className={`text-2xl font-semibold mb-2 ${scoreInfo.color}`}>
              {scoreInfo.message}
            </div>
            <div className="text-lg text-gray-600">
              {score} out of {totalQuestions} questions correct
            </div>
          </div>
        </div>

        {/* Performance Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-gray-50 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-gray-800">{score}</div>
            <div className="text-sm text-gray-600">Correct Answers</div>
          </div>
          <div className="bg-gray-50 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-gray-800">{formatTime(timeElapsed)}</div>
            <div className="text-sm text-gray-600">Total Time</div>
          </div>
          <div className="bg-gray-50 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-gray-800">{formatTime(averageTime)}</div>
            <div className="text-sm text-gray-600">Average per Question</div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          <motion.button
            onClick={onRestart}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex-1 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
          >
            Try Again
          </motion.button>
          <motion.button
            onClick={onNewQuiz}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex-1 bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
          >
            New Quiz
          </motion.button>
        </div>
      </motion.div>

      {/* Question Review */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white rounded-lg shadow-lg p-8"
      >
        <h3 className="text-2xl font-bold text-gray-800 mb-6">
          Question Review
        </h3>
        
        <div className="space-y-4">
          {questions.map((question, index) => {
            const userAnswer = quizState.answers[index]
            const isCorrect = userAnswer === question.correctAnswer
            
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`border rounded-lg p-4 ${
                  isCorrect ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50'
                }`}
              >
                <div className="flex items-start justify-between mb-2">
                  <span className="font-semibold text-gray-800">
                    Question {index + 1}
                  </span>
                  <span className={`text-sm font-semibold ${
                    isCorrect ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {isCorrect ? '✓ Correct' : '✗ Incorrect'}
                  </span>
                </div>
                
                <p className="text-gray-700 mb-3">{question.question}</p>
                
                <div className="space-y-1">
                  {question.options.map((option, optionIndex) => (
                    <div
                      key={optionIndex}
                      className={`text-sm p-2 rounded ${
                        option === question.correctAnswer
                          ? 'bg-green-100 text-green-800 font-semibold'
                          : option === userAnswer && !isCorrect
                          ? 'bg-red-100 text-red-800 font-semibold'
                          : 'bg-gray-100 text-gray-600'
                      }`}
                    >
                      {String.fromCharCode(65 + optionIndex)}. {option}
                      {option === question.correctAnswer && ' (Correct)'}
                      {option === userAnswer && !isCorrect && ' (Your Answer)'}
                    </div>
                  ))}
                </div>
                
                {question.explanation && (
                  <div className="mt-3 p-3 bg-blue-50 border border-blue-200 rounded">
                    <span className="text-sm font-semibold text-blue-800">Explanation: </span>
                    <span className="text-sm text-blue-700">{question.explanation}</span>
                  </div>
                )}
              </motion.div>
            )
          })}
        </div>
      </motion.div>
    </div>
  )
} 