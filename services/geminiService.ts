
import { GoogleGenAI, Type } from "@google/genai";
import { ReviewSuggestion } from '../types';

if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable is not set.");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const reviewSchema = {
    type: Type.ARRAY,
    items: {
      type: Type.OBJECT,
      properties: {
        severity: {
          type: Type.STRING,
          description: "The severity of the issue. Must be one of: Critical, Major, Minor, Suggestion.",
          enum: ["Critical", "Major", "Minor", "Suggestion"],
        },
        category: {
          type: Type.STRING,
          description: "The category of the feedback (e.g., 'Bug', 'Performance', 'Readability', 'Security')."
        },
        description: {
          type: Type.STRING,
          description: "A detailed explanation of the issue and the suggested improvement."
        },
        code_snippet: {
          type: Type.STRING,
          description: "The exact line or block of code from the original source that the feedback applies to."
        }
      },
      required: ["severity", "category", "description", "code_snippet"]
    }
};

export const reviewCode = async (code: string, language: string): Promise<ReviewSuggestion[]> => {
    const systemInstruction = `
        You are an expert senior software engineer and an automated code review assistant.
        Your goal is to provide a thorough, constructive, and friendly code review.
        Do not be conversational. Only return the JSON response.
    `;
    
    const prompt = `
        Please review the following ${language} code.
        Focus on:
        - **Bugs and Errors:** Identify potential bugs, logic errors, or unhandled edge cases.
        - **Performance:** Suggest optimizations for performance.
        - **Best Practices & Readability:** Recommend improvements based on established best practices, coding conventions, and ways to make the code more readable and maintainable.
        - **Security:** Point out any potential security vulnerabilities.

        Provide your feedback as a JSON array of suggestions, adhering to the provided schema. For each suggestion, include the severity, category, a detailed description, and the relevant code snippet.

        Code to review:
        \`\`\`${language.toLowerCase()}
        ${code}
        \`\`\`
    `;

    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
            config: {
                systemInstruction: systemInstruction,
                responseMimeType: "application/json",
                responseSchema: reviewSchema,
                temperature: 0.2,
            },
        });

        const jsonText = response.text.trim();
        const reviewData = JSON.parse(jsonText);
        return reviewData as ReviewSuggestion[];

    } catch (error) {
        console.error("Error reviewing code with Gemini:", error);
        if (error instanceof Error) {
             throw new Error(`Failed to get review from AI: ${error.message}`);
        }
        throw new Error("An unknown error occurred during code review.");
    }
};
