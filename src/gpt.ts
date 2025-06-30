import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true, // Only for demo/dev purposes
});

export async function rewriteGoalAsOKR(goal: string) {
  const prompt = `Rewrite the following goal as an OKR (Objective and Key Results):\n\nGoal: ${goal}\n\nFormat:\nObjective: <objective>\nKey Results: <key results>`;
  const completion = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo',
    messages: [
      { role: 'system', content: 'You are an OKR assistant.' },
      { role: 'user', content: prompt },
    ],
    max_tokens: 300,
    temperature: 0.7,
  });

  const text = completion.choices[0]?.message?.content || '';
  const [objectiveLine, ...keyResultsLines] = text.split(/\n/).filter(Boolean);
  const objective = objectiveLine.replace(/^Objective:\s*/, '');
  const keyResults = keyResultsLines.join('\n').replace(/^Key Results:\s*/, '');

  return {
    objective,
    keyResults,
  };
}

export async function getAgileCoachInsights({
  mood,
  blockers,
  highlights,
  okrProgress,
}: {
  mood: string;
  blockers: string;
  highlights: string;
  okrProgress: string;
}) {
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
`;

  const completion = await openai.chat.completions.create({
    model: 'gpt-4',
    messages: [{ role: 'user', content: prompt }],
    temperature: 0.7,
  });

  return completion.choices[0]?.message?.content;
} 