import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const categoryId = searchParams.get('categoryId')
    const difficulty = searchParams.get('difficulty')
    const ageRange = searchParams.get('ageRange')
    const educationLevel = searchParams.get('educationLevel')
    const limit = searchParams.get('limit') || '10'

    const where: Record<string, unknown> = {}

    if (categoryId) {
      where.categoryId = categoryId
    }

    if (difficulty) {
      where.difficulty = parseInt(difficulty)
    }

    if (ageRange) {
      where.ageAppropriateness = ageRange
    }

    if (educationLevel) {
      where.educationCompatibility = educationLevel
    }

    const questions = await prisma.question.findMany({
      where,
      take: parseInt(limit),
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        category: true,
      },
    })

    return NextResponse.json(questions)
  } catch (error) {
    console.error('Error fetching questions:', error)
    return NextResponse.json(
      { error: 'Failed to fetch questions' },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const {
      categoryId,
      question,
      options,
      correctAnswer,
      explanation,
      difficulty,
      ageAppropriateness,
      educationCompatibility,
      interestTags,
    } = body

    const newQuestion = await prisma.question.create({
      data: {
        categoryId,
        question,
        options: JSON.stringify(options),
        correctAnswer,
        explanation,
        difficulty,
        ageAppropriateness,
        educationCompatibility,
        interestTags: interestTags ? JSON.stringify(interestTags) : null,
      },
    })

    return NextResponse.json(newQuestion)
  } catch (error) {
    console.error('Error creating question:', error)
    return NextResponse.json(
      { error: 'Failed to create question' },
      { status: 500 }
    )
  }
} 