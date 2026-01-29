interface PromptParams {
  type: "resume" | "role";
  role?: string;
  difficulty: string;
  duration: number;
  skills?: string[];
}

export function generateInterviewPrompt({
  type,
  role,
  difficulty,
  duration,
  skills,
}: PromptParams) {
  const base = `
You are a professional technical interviewer.
This is a voice-based mock interview.

Rules:
- Ask ONE question at a time
- Wait for the candidate to finish before responding
- Be concise and professional
- Adjust difficulty to: ${difficulty}
- Total interview duration: ${duration} minutes
- When time is nearly over, ask a final question and conclude politely
`;

  if (type === "resume") {
    return `
${base}
Interview should be based on the candidate's resume.

Key skills:
${skills?.join(", ") || "Not specified"}

Focus on real experience, problem solving, and understanding.
`;
  }

  return `
${base}
Interview role: ${role}

Focus on role-specific fundamentals, practical scenarios, and reasoning.
`;
}
