import { NextRequest, NextResponse } from 'next/server'
import { AIService, AIQuestionRequest } from '@/lib/ai-service'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { category, playerProfile, difficulty, count }: AIQuestionRequest = body

    // Validate required fields
    if (!category || !playerProfile || !difficulty || !count) {
      return NextResponse.json(
        { error: 'Missing required fields: category, playerProfile, difficulty, count' },
        { status: 400 }
      )
    }

    // Validate count range
    if (count < 1 || count > 20) {
      return NextResponse.json(
        { error: 'Question count must be between 1 and 20' },
        { status: 400 }
      )
    }

    // Generate questions using AI
    const questions = await AIService.generateQuestions({
      category,
      playerProfile,
      difficulty,
      count
    })

    return NextResponse.json({
      success: true,
      questions,
      generatedAt: new Date().toISOString(),
      category,
      difficulty,
      count: questions.length
    })

  } catch (error) {
    console.error('Error generating AI questions:', error)
    
    // Return a more specific error message
    if (error instanceof Error) {
      return NextResponse.json(
        { 
          error: 'Failed to generate questions',
          details: error.message 
        },
        { status: 500 }
      )
    }

    return NextResponse.json(
      { error: 'Failed to generate questions' },
      { status: 500 }
    )
  }
}

export async function GET() {
  return NextResponse.json(
    { error: 'Use POST method to generate questions' },
    { status: 405 }
  )
} 