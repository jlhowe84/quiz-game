'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useQuizStore } from '@/store/quiz-store'
import { QuizQuestion as QuizQuestionType, Category, PlayerProfile } from '@/types'
import QuizQuestion from './QuizQuestion'
import QuizResults from './QuizResults'
import AIStatusIndicator from './AIStatusIndicator'

interface QuizSessionProps {
  category: Category
  playerProfile: PlayerProfile
  questionCount: number
  difficulty: 'easy' | 'medium' | 'hard'
  onBackToCategories: () => void
  onNewQuiz: () => void
}

// Fallback mock questions if AI generation fails
const generateMockQuestions = (category: Category, count: number): QuizQuestionType[] => {
  const mockQuestions: Record<string, QuizQuestionType[]> = {
    'Sports': [
      {
        id: '1',
        question: 'Which country has won the most FIFA World Cup titles?',
        options: ['Brazil', 'Germany', 'Argentina', 'Italy'],
        correctAnswer: 'Brazil',
        explanation: 'Brazil has won the FIFA World Cup 5 times (1958, 1962, 1970, 1994, 2002).',
        difficulty: 3,
      },
      {
        id: '2',
        question: 'In basketball, how many points is a three-pointer worth?',
        options: ['2 points', '3 points', '4 points', '1 point'],
        correctAnswer: '3 points',
        explanation: 'A three-pointer is worth 3 points when scored from beyond the three-point line.',
        difficulty: 1,
      },
      {
        id: '3',
        question: 'Which sport is known as "The Beautiful Game"?',
        options: ['Basketball', 'Soccer', 'Tennis', 'Baseball'],
        correctAnswer: 'Soccer',
        explanation: 'Soccer is often called "The Beautiful Game" due to its fluid, artistic nature.',
        difficulty: 2,
      },
    ],
    'Science': [
      {
        id: '4',
        question: 'What is the chemical symbol for gold?',
        options: ['Ag', 'Au', 'Fe', 'Cu'],
        correctAnswer: 'Au',
        explanation: 'Au comes from the Latin word "aurum" which means gold.',
        difficulty: 2,
      },
      {
        id: '5',
        question: 'Which planet is known as the Red Planet?',
        options: ['Venus', 'Mars', 'Jupiter', 'Saturn'],
        correctAnswer: 'Mars',
        explanation: 'Mars appears red due to iron oxide (rust) on its surface.',
        difficulty: 1,
      },
      {
        id: '6',
        question: 'What is the hardest natural substance on Earth?',
        options: ['Steel', 'Diamond', 'Granite', 'Iron'],
        correctAnswer: 'Diamond',
        explanation: 'Diamond is the hardest known natural material on Earth.',
        difficulty: 2,
      },
    ],
    'History': [
      {
        id: '7',
        question: 'In which year did World War II end?',
        options: ['1943', '1944', '1945', '1946'],
        correctAnswer: '1945',
        explanation: 'World War II ended in 1945 with the surrender of Germany in May and Japan in September.',
        difficulty: 2,
      },
      {
        id: '8',
        question: 'Who was the first President of the United States?',
        options: ['John Adams', 'Thomas Jefferson', 'George Washington', 'Benjamin Franklin'],
        correctAnswer: 'George Washington',
        explanation: 'George Washington served as the first President from 1789 to 1797.',
        difficulty: 1,
      },
      {
        id: '9',
        question: 'Which ancient wonder was located in Alexandria?',
        options: ['Colossus of Rhodes', 'Lighthouse of Alexandria', 'Hanging Gardens', 'Temple of Artemis'],
        correctAnswer: 'Lighthouse of Alexandria',
        explanation: 'The Lighthouse of Alexandria was one of the Seven Wonders of the Ancient World.',
        difficulty: 3,
      },
    ],
    'Geography': [
      {
        id: '10',
        question: 'What is the capital of Australia?',
        options: ['Sydney', 'Melbourne', 'Canberra', 'Brisbane'],
        correctAnswer: 'Canberra',
        explanation: 'Canberra is the capital city of Australia, not Sydney or Melbourne.',
        difficulty: 2,
      },
      {
        id: '11',
        question: 'Which is the largest ocean on Earth?',
        options: ['Atlantic Ocean', 'Indian Ocean', 'Arctic Ocean', 'Pacific Ocean'],
        correctAnswer: 'Pacific Ocean',
        explanation: 'The Pacific Ocean is the largest and deepest ocean on Earth.',
        difficulty: 1,
      },
      {
        id: '12',
        question: 'What is the longest river in the world?',
        options: ['Amazon', 'Nile', 'Yangtze', 'Mississippi'],
        correctAnswer: 'Nile',
        explanation: 'The Nile River is the longest river in the world at approximately 6,650 km.',
        difficulty: 2,
      },
    ],
    'Technology': [
      {
        id: '13',
        question: 'What does CPU stand for?',
        options: ['Central Processing Unit', 'Computer Personal Unit', 'Central Personal Unit', 'Computer Processing Unit'],
        correctAnswer: 'Central Processing Unit',
        explanation: 'CPU stands for Central Processing Unit, the main processor of a computer.',
        difficulty: 1,
      },
      {
        id: '14',
        question: 'Which company created the iPhone?',
        options: ['Samsung', 'Apple', 'Google', 'Microsoft'],
        correctAnswer: 'Apple',
        explanation: 'Apple Inc. created and released the first iPhone in 2007.',
        difficulty: 1,
      },
      {
        id: '15',
        question: 'What does HTML stand for?',
        options: ['HyperText Markup Language', 'High Tech Modern Language', 'Hyper Transfer Markup Language', 'Home Tool Markup Language'],
        correctAnswer: 'HyperText Markup Language',
        explanation: 'HTML stands for HyperText Markup Language, the standard markup language for web pages.',
        difficulty: 2,
      },
    ],
    'Entertainment': [
      {
        id: '16',
        question: 'Who played Iron Man in the Marvel Cinematic Universe?',
        options: ['Chris Evans', 'Robert Downey Jr.', 'Chris Hemsworth', 'Mark Ruffalo'],
        correctAnswer: 'Robert Downey Jr.',
        explanation: 'Robert Downey Jr. played Tony Stark/Iron Man in the Marvel Cinematic Universe.',
        difficulty: 1,
      },
      {
        id: '17',
        question: 'Which band released the album "Abbey Road"?',
        options: ['The Rolling Stones', 'The Beatles', 'Led Zeppelin', 'Pink Floyd'],
        correctAnswer: 'The Beatles',
        explanation: 'The Beatles released "Abbey Road" in 1969, their final recorded album.',
        difficulty: 2,
      },
      {
        id: '18',
        question: 'What year did the first Star Wars movie release?',
        options: ['1975', '1977', '1979', '1981'],
        correctAnswer: '1977',
        explanation: 'Star Wars: Episode IV - A New Hope was released in 1977.',
        difficulty: 2,
      },
    ],
  }

  const categoryQuestions = mockQuestions[category.name] || mockQuestions['Sports']
  return categoryQuestions.slice(0, count)
}

// Generate AI questions based on player profile
const generateAIQuestions = async (
  category: Category, 
  playerProfile: PlayerProfile, 
  count: number,
  difficultyLevel: number
): Promise<QuizQuestionType[]> => {
  try {
    console.log('🔍 Attempting AI question generation...')
    console.log('Category:', category.name)
    console.log('Player Profile:', playerProfile)
    console.log('Difficulty Level:', difficultyLevel)
    
    const requestBody = {
      category: category.name,
      playerProfile,
      difficulty: difficultyLevel,
      count
    }
    
    console.log('Request body:', requestBody)
    
    const response = await fetch('/api/ai-questions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    })

    console.log('Response status:', response.status)
    console.log('Response ok:', response.ok)

    if (!response.ok) {
      const errorText = await response.text()
      console.error('Response error:', errorText)
      throw new Error(`AI generation failed: ${response.statusText} - ${errorText}`)
    }

    const data = await response.json()
    console.log('AI Response data:', data)
    
    if (!data.success || !data.questions) {
      throw new Error('Invalid response from AI service')
    }

    console.log('✅ AI questions generated successfully!')
    console.log('Number of questions:', data.questions.length)

    // Convert AI questions to our format
    return data.questions.map((q: any, index: number) => ({
      id: `ai-${Date.now()}-${index}`,
      question: q.question,
      options: q.options,
      correctAnswer: q.correctAnswer,
      explanation: q.explanation,
      difficulty: q.difficulty
    }))

  } catch (error) {
    console.error('❌ AI question generation failed, falling back to mock questions:', error)
    return generateMockQuestions(category, count)
  }
}

// Determine difficulty based on player profile
const getDifficultyFromProfile = (profile: PlayerProfile): number => {
  const skillLevelMap: Record<string, number> = {
    'Beginner': 2,
    'Intermediate': 5,
    'Advanced': 7,
    'Expert': 9
  }

  const complexityMap: Record<string, number> = {
    'Simple': 1,
    'Moderate': 4,
    'Challenging': 7
  }

  const baseDifficulty = skillLevelMap[profile.skillLevel] || 5
  const complexityBonus = complexityMap[profile.preferredComplexity] || 0

  return Math.min(10, Math.max(1, baseDifficulty + complexityBonus))
}

export default function QuizSession({
  category,
  playerProfile,
  questionCount,
  difficulty,
  onBackToCategories,
  onNewQuiz,
}: QuizSessionProps) {
  const [questions, setQuestions] = useState<QuizQuestionType[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [isComplete, setIsComplete] = useState(false)
  const [isAIGenerating, setIsAIGenerating] = useState(false)
  const [isAIGenerated, setIsAIGenerated] = useState(false)
  
  const { quizState, startQuiz, answerQuestion, nextQuestion, completeQuiz, resetQuiz } = useQuizStore()

  useEffect(() => {
    const loadQuestions = async () => {
      setIsLoading(true)
      setIsAIGenerating(true)
      try {
        // Convert difficulty string to number
        const difficultyMap = { easy: 3, medium: 6, hard: 9 }
        const difficultyLevel = difficultyMap[difficulty]
        
        console.log('🔍 Attempting AI question generation...')
        console.log('Category:', category.name)
        console.log('Player Profile:', playerProfile)
        console.log('Selected difficulty:', difficulty, '-> Level:', difficultyLevel)
        
        // Try AI generation first, fallback to mock questions
        const generatedQuestions = await generateAIQuestions(category, playerProfile, questionCount, difficultyLevel)
        setQuestions(generatedQuestions)
        startQuiz(generatedQuestions)
        setIsAIGenerated(true)
      } catch (error) {
        console.error('Failed to load questions:', error)
        // Fallback to mock questions
        const mockQuestions = generateMockQuestions(category, questionCount)
        setQuestions(mockQuestions)
        startQuiz(mockQuestions)
        setIsAIGenerated(false)
      } finally {
        setIsLoading(false)
        setIsAIGenerating(false)
      }
    }

    loadQuestions()
  }, [category, questionCount, startQuiz, playerProfile, difficulty])

  const handleAnswer = (answer: string) => {
    answerQuestion(answer)
    
    // Move to next question after a delay
    setTimeout(() => {
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(prev => prev + 1)
        nextQuestion()
      } else {
        completeQuiz()
        setIsComplete(true)
      }
    }, 1500)
  }

  const handleTimeUp = () => {
    // Auto-answer with null/empty when time runs out
    handleAnswer('')
  }

  const handleRestart = () => {
    setCurrentQuestionIndex(0)
    setIsComplete(false)
    resetQuiz()
    startQuiz(questions)
  }

  const handleNewQuiz = () => {
    resetQuiz()
    onNewQuiz()
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your personalized quiz...</p>
        </div>
      </div>
    )
  }

  if (isComplete && quizState) {
    return (
      <QuizResults
        quizState={quizState}
        questions={questions}
        categoryName={category.name}
        onRestart={handleRestart}
        onNewQuiz={handleNewQuiz}
      />
    )
  }

  if (!quizState || currentQuestionIndex >= questions.length) {
    return (
      <div className="text-center">
        <p className="text-gray-600">No questions available for this category.</p>
        <button
          onClick={onBackToCategories}
          className="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
        >
          Back to Categories
        </button>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <AIStatusIndicator isGenerating={isAIGenerating} isAIGenerated={isAIGenerated} />
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            {category.name} Quiz
          </h1>
          <p className="text-gray-600">
            Personalized for your level and interests
          </p>
        </div>

        {/* Quiz Question */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentQuestionIndex}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
          >
            <QuizQuestion
              question={questions[currentQuestionIndex]}
              questionNumber={currentQuestionIndex + 1}
              totalQuestions={questions.length}
              onAnswer={handleAnswer}
              timeLimit={30}
              onTimeUp={handleTimeUp}
            />
          </motion.div>
        </AnimatePresence>

        {/* Back Button */}
        <div className="text-center mt-8">
          <button
            onClick={onBackToCategories}
            className="text-blue-600 hover:text-blue-800 underline"
          >
            ← Back to Categories
          </button>
        </div>
      </div>
    </div>
  )
} 