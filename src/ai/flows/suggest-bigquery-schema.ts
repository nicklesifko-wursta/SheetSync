'use server';

/**
 * @fileOverview A flow that suggests a BigQuery schema based on the data structure of a Google Sheet.
 *
 * - suggestBigQuerySchema - A function that suggests a BigQuery schema for a Google Sheet.
 * - SuggestBigQuerySchemaInput - The input type for the suggestBigQuerySchema function.
 * - SuggestBigQuerySchemaOutput - The return type for the suggestBigQuerySchema function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestBigQuerySchemaInputSchema = z.object({
  spreadsheetData: z.string().describe('The data from the Google Sheet in CSV format.'),
});
export type SuggestBigQuerySchemaInput = z.infer<typeof SuggestBigQuerySchemaInputSchema>;

const SuggestBigQuerySchemaOutputSchema = z.object({
  schema: z.string().describe('The suggested BigQuery schema in JSON format.'),
});
export type SuggestBigQuerySchemaOutput = z.infer<typeof SuggestBigQuerySchemaOutputSchema>;

export async function suggestBigQuerySchema(input: SuggestBigQuerySchemaInput): Promise<SuggestBigQuerySchemaOutput> {
  return suggestBigQuerySchemaFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestBigQuerySchemaPrompt',
  input: {schema: SuggestBigQuerySchemaInputSchema},
  output: {schema: SuggestBigQuerySchemaOutputSchema},
  prompt: `You are an expert data engineer. Your task is to suggest a BigQuery schema based on the data provided from a Google Sheet.

  The data is provided in CSV format. Analyze the data and determine the appropriate data types for each column.

  Ensure that the suggested schema is a valid JSON format.

  Data:\n{{{spreadsheetData}}}`,
});

const suggestBigQuerySchemaFlow = ai.defineFlow(
  {
    name: 'suggestBigQuerySchemaFlow',
    inputSchema: SuggestBigQuerySchemaInputSchema,
    outputSchema: SuggestBigQuerySchemaOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
