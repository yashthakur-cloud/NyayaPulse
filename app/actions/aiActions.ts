"use server"
import{GoogleGenAI} from "@google/genai"

const ai = new GoogleGenAI({
  apiKey: process.env.GOOGLE_API_KEY ,
  })


export async function generateText(prompt: string): Promise<string> {
  const interaction = await ai.interactions.create({
  model: "gemini-3.8-flash",
  input: prompt,
});

  return interaction.output_text||"No output generated";
}
