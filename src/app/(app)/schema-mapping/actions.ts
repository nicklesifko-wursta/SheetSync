// src/app/(app)/schema-mapping/actions.ts
"use server";

import { suggestBigQuerySchema, type SuggestBigQuerySchemaInput } from "@/ai/flows/suggest-bigquery-schema";

export async function handleSuggestSchema(
  data: SuggestBigQuerySchemaInput
): Promise<{ schema?: string; error?: string }> {
  try {
    if (!data.spreadsheetData || data.spreadsheetData.trim() === "") {
      return { error: "Spreadsheet data cannot be empty." };
    }
    const result = await suggestBigQuerySchema(data);
    if (result.schema) {
      // Basic validation if schema is JSON-like
      try {
        JSON.parse(result.schema);
        return { schema: result.schema };
      } catch (jsonError) {
        console.error("AI returned non-JSON schema:", result.schema, jsonError);
        return { error: "AI returned an invalid schema format. Please try again or refine your input." };
      }
    }
    return { error: "Failed to suggest schema. The AI did not return a schema." };
  } catch (error) {
    console.error("Error suggesting schema:", error);
    if (error instanceof Error) {
      return { error: error.message };
    }
    return { error: "An unknown error occurred while suggesting the schema." };
  }
}
