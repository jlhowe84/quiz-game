export interface User {
  id: string
  username: string
  email: string
  ageRange: string
  educationLevel: string
  skillLevel: string
  interests?: string
  learningGoals: string
  preferredComplexity: string
  createdAt: Date
  updatedAt: Date
}

export interface Category {
  id: string
  name: string
  description?: string
  icon?: string
  color?: string
  createdAt: Date
}

export interface Question {
  id: string
  categoryId: string
  question: string
  options: string
  correctAnswer: string
  explanation?: string
  difficulty: number
  ageAppropriateness?: string
  educationCompatibility?: string
  interestTags?: string
  createdAt: Date
}

export interface QuizSession {
  id: string
  userId: string
  categoryId: string
  score?: number
  timeTaken?: number
  completedAt: Date
}

export interface UserProgress {
  userId: string
  categoryId: string
  questionsAnswered: number
  correctAnswers: number
  averageTime?: number
  bestScore?: number
  lastPlayed?: Date
}

export interface PlayerProfile {
  ageRange: string
  educationLevel: string
  skillLevel: string
  interests: string[]
  learningGoals: string
  preferredComplexity: string
}

export interface QuizQuestion {
  id: string
  question: string
  options: string[]
  correctAnswer: string
  explanation?: string
  difficulty: number
}

export interface QuizState {
  currentQuestion: number
  totalQuestions: number
  score: number
  timeStarted: Date
  timeElapsed: number
  answers: Record<number, string>
  isComplete: boolean
} 