import Anthropic from '@anthropic-ai/sdk';
import {TOOL_HELPER_PROMPT} from "@/prompts";

export const dynamic = 'force-dynamic';

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_AI_KEY,
});

function formatForClaude(message: { role:string, content: string }) {
  return {
    role: 'user',
    content: message.content,
  }
}

export async function POST(req: Request) {
  const { messages } = await req.json();

  const response = await anthropic.beta.tools.messages.create({
    model: 'claude-3-sonnet-20240229',
    max_tokens: 1024,
    messages: messages.map(formatForClaude),
    temperature: 0.4,
    system: TOOL_HELPER_PROMPT,
    tools: [
      {
        name: "show_project",
        description: "Show projects that Marcus has worked on.",
        input_schema: {
          type: 'object',
          properties: {
            projects: {
              type: 'array',
              items: {
                type: 'string',
                enum: [
                  'Ila Lantern',
                  'Odyssey Journal',
                  'Bid Management',
                  "Redeemer's Church Ventura",
                  "Prequalification"
                ]
              }
            }
          },
          required: ["projects"]
        },
      }
    ]
  });

  return Response.json(response)
}
