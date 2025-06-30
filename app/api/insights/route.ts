import { NextResponse } from 'next/server'
import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export async function POST(req: Request) {
  const body = await req.json()
  const { mood, blockers, highlights, okrProgress } = body

  const prompt = `
You are an experienced Agile Coach. Based on this team's weekly check-in:

- Mood: ${mood}
- Blockers: ${blockers}
- Highlights: ${highlights}
- OKR Progress: ${okrProgress}

Provide:
1. Mood Summary
2. Detected Risks
3. Practice Recommendation
4. Agile Coaching Tip

Format it as clean, human-readable bullet points.
`

  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.7,
    })

    const reply = completion.choices[0]?.message?.content
    return NextResponse.json({ insights: reply })
  } catch (error) {
    console.error('Error calling OpenAI API:', error)
    return NextResponse.json(
      { error: 'Failed to get insights from AI' },
      { status: 500 }
    )
  }
}
