import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({apiKey: process.env.NEXT_PUBLIC_GEMINI_API_KEY});

export async function sendMessage(inputPrompt) {
  const response = await ai.models.generateContent({
    model: "gemini-1.5-flash",
    contents: inputPrompt,
  });
  return response.text;
}