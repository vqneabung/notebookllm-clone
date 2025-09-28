import {
  convertToModelMessages,
  StopCondition,
  streamText,
  ToolSet,
  UIMessage,
} from "ai";
import { qwen3 } from "./model/ollama";

const SYSTEM_PROMPT = `You are a helpful assistant. Check your knowledge base before answering any questions.
    Only respond to questions using information from tool calls.
    if no relevant information is found in the tool calls, respond, "Sorry, I don't know."`;

export async function StreamingTextGeneration(prompt: string) {
  const result = streamText({
    model: qwen3,
    prompt: prompt,
  });

  for await (const textPart of result.textStream) {
    console.log(textPart);
    return textPart;
  }
}

export function StreamingTextGenerationFromPromptToResult(prompt: string) {
  const result = streamText({
    model: qwen3,
    prompt: prompt,
  });

  return result;
}

export function StreamingTextGenerationFromMessagesToResult(
  messages: UIMessage[]
) {
  const result = streamText({
    model: qwen3,
    system: SYSTEM_PROMPT,
    messages: convertToModelMessages(messages),
  });

  return result;
}

export function StreamingTextGenerationWithToolFromMessagesToResult(
  messages: UIMessage[],
  tools: ToolSet,
  stopWhen?: StopCondition<ToolSet>
) {
  const result = streamText({
    model: qwen3,
    messages: convertToModelMessages(messages),
    tools: tools,
    stopWhen: stopWhen || undefined,
  });

  return result;
}
