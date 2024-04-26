import OpenAI from 'openai';
import { OpenAIStream, StreamingTextResponse } from 'ai';

export const dynamic = 'force-dynamic';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  // Extract the `messages` from the body of the request
  const { messages } = await req.json();

  // Request the OpenAI API for the response based on the prompt
  const response = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo-0125',
    stream: true,
    messages: messages,
    temperature: 0.4,
    tools: [
      {
        type: 'function',
        function: {
          description: 'Show a project that Marcus has worked on.',
          name: 'show_project',
          parameters: {
            type: 'object',
            properties: {
              project: { enum: ['Ila Lantern', 'Odyssey Journal', 'Bid Management', "Redeemer's App"] }
            },
            required: ["project"]
          },
        }
      }
    ],
  });

  console.info('Streaming', response)
  // Convert the response into a friendly text-stream
  const stream = OpenAIStream(response);

  // Respond with the stream
  return new StreamingTextResponse(stream);
}