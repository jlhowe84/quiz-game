import { NextResponse } from 'next/server'

// Temporarily disabled for deployment
export async function GET() {
  return NextResponse.json([])
}

export async function POST() {
  return NextResponse.json({ error: 'Not implemented' }, { status: 501 })
} 