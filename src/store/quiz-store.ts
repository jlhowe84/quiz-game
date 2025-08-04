import { create } from 'zustand'
import { QuizState, QuizQuestion } from '@/types'

interface QuizStore {
  // Quiz state
  quizState: QuizState | null
  questions: QuizQuestion[]
  currentQuestionIndex: number
  
  // Actions
  startQuiz: (questions: QuizQuestion[]) => void
  answerQuestion: (answer: string) => void
  nextQuestion: () => void
  completeQuiz: () => void
  resetQuiz: () => void
  
  // Timer
  timeElapsed: number
  startTimer: () => void
  stopTimer: () => void
  resetTimer: () => void
}

export const useQuizStore = create<QuizStore>((set, get) => ({
  // Initial state
  quizState: null,
  questions: [],
  currentQuestionIndex: 0,
  timeElapsed: 0,
  
  // Actions
  startQuiz: (questions) => {
    const initialState: QuizState = {
      currentQuestion: 0,
      totalQuestions: questions.length,
      score: 0,
      timeStarted: new Date(),
      timeElapsed: 0,
      answers: {},
      isComplete: false,
    }
    
    set({
      quizState: initialState,
      questions,
      currentQuestionIndex: 0,
      timeElapsed: 0,
    })
    
    get().startTimer()
  },
  
  answerQuestion: (answer) => {
    const { quizState, questions, currentQuestionIndex } = get()
    if (!quizState || !questions[currentQuestionIndex]) return
    
    const currentQuestion = questions[currentQuestionIndex]
    
    // Normalize answers for comparison (trim whitespace, lowercase)
    const normalizedUserAnswer = answer.trim().toLowerCase()
    const normalizedCorrectAnswer = currentQuestion.correctAnswer.trim().toLowerCase()
    const isCorrect = normalizedUserAnswer === normalizedCorrectAnswer
    
    console.log('🔍 Answer Debug:', {
      userAnswer: answer,
      correctAnswer: currentQuestion.correctAnswer,
      normalizedUserAnswer,
      normalizedCorrectAnswer,
      questionText: currentQuestion.question,
      isCorrect: isCorrect
    })
    
    const newAnswers = { ...quizState.answers, [currentQuestionIndex]: answer }
    const newScore = isCorrect ? quizState.score + 1 : quizState.score
    
    console.log('📊 Score Update:', {
      previousScore: quizState.score,
      newScore: newScore,
      isCorrect: isCorrect
    })
    
    set({
      quizState: {
        ...quizState,
        score: newScore,
        answers: newAnswers,
      },
    })
  },
  
  nextQuestion: () => {
    const { currentQuestionIndex, questions, quizState } = get()
    if (!quizState) return
    
    const nextIndex = currentQuestionIndex + 1
    
    if (nextIndex >= questions.length) {
      get().completeQuiz()
    } else {
      set({
        currentQuestionIndex: nextIndex,
        quizState: {
          ...quizState,
          currentQuestion: nextIndex,
        },
      })
    }
  },
  
  completeQuiz: () => {
    const { quizState } = get()
    if (!quizState) return
    
    get().stopTimer()
    
    const finalState = {
      ...quizState,
      isComplete: true,
      timeElapsed: get().timeElapsed,
    }
    
    console.log('🏁 Final Quiz State:', {
      score: finalState.score,
      totalQuestions: finalState.totalQuestions,
      answers: finalState.answers,
      percentage: Math.round((finalState.score / finalState.totalQuestions) * 100)
    })
    
    set({
      quizState: finalState,
    })
  },
  
  resetQuiz: () => {
    set({
      quizState: null,
      questions: [],
      currentQuestionIndex: 0,
      timeElapsed: 0,
    })
  },
  
  // Timer actions
  startTimer: () => {
    const timer = setInterval(() => {
      set((state) => ({ timeElapsed: state.timeElapsed + 1 }))
    }, 1000)
    
    // Store timer reference (you might want to store this in a ref)
    ;(get as { timer?: NodeJS.Timeout }).timer = timer
  },
  
  stopTimer: () => {
    const timer = (get as { timer?: NodeJS.Timeout }).timer
    if (timer) {
      clearInterval(timer)
      ;(get as { timer?: NodeJS.Timeout }).timer = undefined
    }
  },
  
  resetTimer: () => {
    get().stopTimer()
    set({ timeElapsed: 0 })
  },
})) 