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
    const isCorrect = answer === currentQuestion.correctAnswer
    
    const newAnswers = { ...quizState.answers, [currentQuestionIndex]: answer }
    const newScore = isCorrect ? quizState.score + 1 : quizState.score
    
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
    
    set({
      quizState: {
        ...quizState,
        isComplete: true,
        timeElapsed: get().timeElapsed,
      },
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