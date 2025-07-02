import { NextResponse } from 'next/server'
import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

function parseInsights(insightsString: string) {
  const result = {
    moodSummary: "",
    risks: "",
    practiceSuggestion: "",
    coachingTip: "",
  };
  if (!insightsString) return result;

  const moodMatch = insightsString.match(/Mood Summary:(.*?)(?:\n|$)/i);
  const risksMatch = insightsString.match(/Detected Risks:(.*?)(?:\n|$)/i);
  const practiceMatch = insightsString.match(/Practice Recommendation:(.*?)(?:\n|$)/i);
  const tipMatch = insightsString.match(/Agile Coaching Tip:(.*?)(?:\n|$)/i);

  result.moodSummary = moodMatch ? moodMatch[1].trim() : "";
  result.risks = risksMatch ? risksMatch[1].trim() : "";
  result.practiceSuggestion = practiceMatch ? practiceMatch[1].trim() : "";
  result.coachingTip = tipMatch ? tipMatch[1].trim() : "";

  return result;
}

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
    const insightsObject = parseInsights(reply || "")
    return NextResponse.json({ insights: insightsObject })
  } catch (error) {
    console.error('Error calling OpenAI API:', error)
    return NextResponse.json(
      { error: 'Failed to get insights from AI' },
      { status: 500 }
    )
  }
}
