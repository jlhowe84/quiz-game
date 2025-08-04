import OpenAI from 'openai'
import { PlayerProfile } from '@/types'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export interface AIQuestionRequest {
  category: string
  playerProfile: PlayerProfile
  difficulty: number
  count: number
}

export interface AIQuestion {
  question: string
  options: string[]
  correctAnswer: string
  explanation: string
  difficulty: number
}

export class AIService {
  static async generateQuestions(request: AIQuestionRequest): Promise<AIQuestion[]> {
    try {
      console.log('🤖 AIService.generateQuestions called')
      console.log('API Key available:', !!process.env.OPENAI_API_KEY)
      
      const { category, playerProfile, difficulty, count } = request
      console.log('Request params:', { category, difficulty, count })

      const prompt = this.buildPrompt(category, playerProfile, difficulty, count)
      console.log('Generated prompt length:', prompt.length)
      
      console.log('🔄 Calling OpenAI API...')
      const completion = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: "You are an expert quiz question generator. Create engaging, accurate, and age-appropriate multiple choice questions."
          },
          {
            role: "user",
            content: prompt
          }
        ],
        temperature: 0.7,
        max_tokens: 2000,
      })

      console.log('✅ OpenAI API response received')
      const response = completion.choices[0]?.message?.content
      if (!response) {
        throw new Error('No response from OpenAI')
      }

      console.log('Response length:', response.length)
      console.log('Response preview:', response.substring(0, 200) + '...')

      const questions = this.parseQuestions(response, count)
      console.log('✅ Parsed questions:', questions.length)
      
      return questions
    } catch (error) {
      console.error('❌ Error in AIService.generateQuestions:', error)
      
      // Handle specific OpenAI errors
      if (error && typeof error === 'object' && 'status' in error) {
        if (error.status === 429) {
          throw new Error('OpenAI quota exceeded. Please check your billing or try again later.')
        } else if (error.status === 401) {
          throw new Error('OpenAI API key is invalid. Please check your configuration.')
        }
      }
      
      throw new Error('Failed to generate questions')
    }
  }

  private static buildPrompt(category: string, profile: PlayerProfile, difficulty: number, count: number): string {
    const difficultyText = this.getDifficultyText(difficulty)
    const ageAppropriate = this.getAgeAppropriateText(profile.ageRange)
    const educationLevel = this.getEducationLevelText(profile.educationLevel)

    return `
Generate ${count} multiple choice questions for the category: "${category}"

Requirements:
- Difficulty level: ${difficultyText}
- Age appropriate for: ${ageAppropriate}
- Education level: ${educationLevel}
- Player interests: ${profile.interests.join(', ')}
- Learning goal: ${profile.learningGoals}
- Preferred complexity: ${profile.preferredComplexity}

Format each question as JSON:
{
  "question": "Question text here?",
  "options": ["Option A", "Option B", "Option C", "Option D"],
  "correctAnswer": "Option A",
  "explanation": "Brief explanation of why this is correct",
  "difficulty": ${difficulty}
}

Return only the JSON array of questions, no additional text.
`
  }

  private static getDifficultyText(difficulty: number): string {
    if (difficulty <= 3) return "Beginner - Basic knowledge, simple concepts"
    if (difficulty <= 6) return "Intermediate - Moderate knowledge, some complex concepts"
    return "Advanced - Deep knowledge, complex concepts"
  }

  private static getAgeAppropriateText(ageRange: string): string {
    const ageMap: Record<string, string> = {
      '5-8': 'Young children (5-8 years) - Simple language, basic concepts, fun facts',
      '9-12': 'Pre-teens (9-12 years) - Clear language, educational content, engaging topics',
      '13-17': 'Teenagers (13-17 years) - Standard language, academic content, current topics',
      '18-25': 'Young adults (18-25 years) - Sophisticated language, detailed content',
      '26-35': 'Adults (26-35 years) - Professional language, comprehensive content',
      '36-50': 'Adults (36-50 years) - Mature language, in-depth content',
      '50+': 'Seniors (50+ years) - Clear language, relevant content for mature learners'
    }
    return ageMap[ageRange] || 'General audience'
  }

  private static getEducationLevelText(educationLevel: string): string {
    const educationMap: Record<string, string> = {
      'Elementary': 'Elementary school level - Basic concepts, simple explanations',
      'Middle School': 'Middle school level - Intermediate concepts, clear explanations',
      'High School': 'High school level - Standard academic concepts',
      'College': 'College level - Advanced concepts, detailed explanations',
      'Graduate': 'Graduate level - Expert concepts, comprehensive explanations',
      'Professional': 'Professional level - Industry-specific knowledge, practical applications'
    }
    return educationMap[educationLevel] || 'General knowledge'
  }

  private static parseQuestions(response: string, expectedCount: number): AIQuestion[] {
    try {
      // Clean the response and extract JSON
      const jsonMatch = response.match(/\[[\s\S]*\]/)
      if (!jsonMatch) {
        throw new Error('No valid JSON found in response')
      }

      const questions = JSON.parse(jsonMatch[0]) as AIQuestion[]
      
      // Validate questions
      if (!Array.isArray(questions)) {
        throw new Error('Response is not an array')
      }

      // Ensure we have the expected number of questions
      if (questions.length < expectedCount) {
        console.warn(`Expected ${expectedCount} questions, got ${questions.length}`)
      }

      // Shuffle the options for each question
      const shuffledQuestions = questions.slice(0, expectedCount).map((question, index) => {
        console.log(`🔄 Shuffling question ${index + 1}:`, {
          original: question.options,
          correctAnswer: question.correctAnswer
        })
        
        const shuffled = this.shuffleQuestionOptions(question)
        
        console.log(`✅ Shuffled question ${index + 1}:`, {
          shuffled: shuffled.options,
          correctAnswer: shuffled.correctAnswer
        })
        
        return shuffled
      })

      return shuffledQuestions
    } catch (error) {
      console.error('Error parsing questions:', error)
      throw new Error('Failed to parse generated questions')
    }
  }

  private static shuffleQuestionOptions(question: AIQuestion): AIQuestion {
    // Create a copy of the options array
    const shuffledOptions = [...question.options]
    
    // Fisher-Yates shuffle algorithm
    for (let i = shuffledOptions.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[shuffledOptions[i], shuffledOptions[j]] = [shuffledOptions[j], shuffledOptions[i]]
    }
    
    // Find the new position of the correct answer
    const newCorrectAnswer = question.correctAnswer
    
    return {
      ...question,
      options: shuffledOptions,
      correctAnswer: newCorrectAnswer // Keep the same correct answer text
    }
  }

  static async validateQuestion(question: AIQuestion): Promise<boolean> {
    try {
      const prompt = `
Validate this quiz question for accuracy and appropriateness:

Question: "${question.question}"
Options: ${question.options.join(', ')}
Correct Answer: "${question.correctAnswer}"
Explanation: "${question.explanation}"

Respond with only "VALID" or "INVALID" and a brief reason.
`

      const completion = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: "You are a fact-checker and content validator for educational quiz questions."
          },
          {
            role: "user",
            content: prompt
          }
        ],
        temperature: 0.1,
        max_tokens: 100,
      })

      const response = completion.choices[0]?.message?.content?.toLowerCase()
      return response?.includes('valid') || false
    } catch (error) {
      console.error('Error validating question:', error)
      return true // Default to valid if validation fails
    }
  }
} 