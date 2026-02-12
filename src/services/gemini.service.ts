import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import "dotenv/config";

export class GeminiService {
  private ai: GoogleGenAI;

  constructor() {
    if (!process.env.GEMINI_API_KEY) {
      throw new Error(
        "A variável de ambiente GEMINI_API_KEY não está definida.",
      );
    }

    if (!process.env.GEMINI_MODEL) {
      throw new Error("A variável de ambiente GEMINI_MODEL não está definida.");
    }

    this.ai = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
    });
  }

  /**
   * Gera conteúdo usando o modelo do Gemini
   * @param prompt Texto que será enviado para a IA
   */
  async generateContent(prompt: string): Promise<string> {
    const response: GenerateContentResponse =
      await this.ai.models.generateContent({
        model: process.env.GEMINI_MODEL
          ? process.env.GEMINI_MODEL
          : "gemini-2.5-flash",
        contents: prompt,
      });

    if (typeof response.text !== "string") {
      throw new Error("A resposta da IA não contém texto.");
    }
    return response.text;
  }

  cleanAIResponse(raw: string): string {
    return raw
      .replace(/^```json\s*/, "") // remove ```json no início
      .replace(/```$/, "") // remove ``` no fim
      .trim();
  }
}
