import Anthropic from '@anthropic-ai/sdk';
import { StreamingTextResponse, AnthropicStream } from 'ai';
import {MEEMO_AGENT_PROMPT} from "@/prompts";

export const dynamic = 'force-dynamic';

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_AI_KEY,
});

export async function POST(req: Request) {
  const { messages } = await req.json();

  const response = await anthropic.messages.create({
    model: 'claude-haiku-4-5-20251001',
    stream: true,
    max_tokens: 1024,
    messages: messages,
    temperature: 0.4,
    system: MEEMO_AGENT_PROMPT,
  });

  const stream = AnthropicStream(response);
  return new StreamingTextResponse(stream);
}
