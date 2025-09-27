import { StreamingTextGenerationFromMessagesToResult } from '@/chatbot/helper/chatbot.helper';
import { convertToModelMessages, streamText, UIMessage } from 'ai';

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages }: { messages: UIMessage[] } = await req.json();

  const result = StreamingTextGenerationFromMessagesToResult(messages);

  return result.toUIMessageStreamResponse();
}