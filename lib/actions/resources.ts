"use server";

import {
  NewResourceParams,
  insertResourceSchema,
  resources,
} from "../db/schema/resources";
import { db } from "../db";
import { generateEmbeddings } from "../ai/embedding";
import { embeddings } from "../db/schema/embeddings";
import { toSql } from "pgvector";


export const createResource = async (fileName: string, input: NewResourceParams) => {
  try {

    const { content } = insertResourceSchema.parse(input);

    console.log("Inserting resource into database...");

    const inputWithFileName =  content + `\n\nSource: ${fileName}`;

    const [resource] = await db
      .insert(resources)
      .values({ content: inputWithFileName })
      .returning();

    console.log("Resource inserted with ID:", resource.id);

    const embeddingResult = await generateEmbeddings(content);
    console.log("Generated embeddings count:", embeddingResult.length);

    await db.insert(embeddings).values(
      embeddingResult.map((embedding) => ({
        resourceId: resource.id,
        content: embedding.content ?? "",
        embedding: embedding.embedding,
      }))
    );

    console.log("Resource and embeddings created with ID:", resource.id);

    return true;
  } catch (e) {
    if (e instanceof Error) {
      console.error("Error creating resource:", e.message);
      return false;
    }
  }
};
