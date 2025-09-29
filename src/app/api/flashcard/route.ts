import { qwen3 } from "@/chatbot/helper/model/ollama";
import { generateObject, tool } from "ai";
import z from "zod";
import { getResourceById } from "../../../../lib/ai/resources";

// Tool muc dich tong hop noi dung sau do tao flashcard
async function generateFlashcardFromContent(content: string) {
  const { object: flashcardObject } = await generateObject({
    model: qwen3,
    schema: z.object({
      flashcards: z
        .array(
          z.object({
            front: z
              .string()
              .describe(
                "The front side of the flashcard - should be a clear, concise question, term, or concept that tests understanding"
              ),
            back: z
              .string()
              .describe(
                "The back side of the flashcard - should be a comprehensive but concise answer, definition, or explanation"
              ),
          })
        )
        .describe("Array of flashcards generated from the content"),
    }),
    prompt: `You are an expert educator creating high-quality flashcards for studying. Based on the following content, generate 3-5 flashcards that will help students learn and retain the key concepts.

CONTENT:
${content}

INSTRUCTIONS:
1. Create flashcards that test understanding, not just memorization
2. Front side should be:
   - Clear, specific questions or key terms
   - Focus on important concepts, definitions, relationships
   - Use "What is...", "How does...", "Why does...", "Define..." formats when appropriate
3. Back side should be:
   - Concise but complete answers
   - Include relevant examples when helpful
   - Use clear, simple language
   - Maximum 2-3 sentences for complex concepts

EXAMPLES OF GOOD FLASHCARDS:
- Front: "What is the relationship between matter and consciousness in dialectical materialism?"
- Back: "In dialectical materialism, matter is primary and consciousness is secondary, meaning consciousness arises from and is determined by material conditions."

Generate flashcards that capture the most important learning points from the content above.`,
  });

  return flashcardObject;
}

export async function POST(req: Request) {
  try {
    const { resourceId } = await req.json();

    if (!resourceId) {
      return new Response("Resource ID is required", { status: 400 });
    }

    // Truy van noi dung tu resourceId
    var resource = await getResourceById(resourceId);

    if (!resource) {
      return new Response("Resource not found", { status: 404 });
    }

    const flashcards = await generateFlashcardFromContent(resource.content);

    return Response.json(flashcards);
  } catch (error) {
    console.error("Flashcard generation error:", error);
    return new Response("Failed to generate flashcards", { status: 500 });
  }
}
