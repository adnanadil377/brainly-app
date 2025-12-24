import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.API_KEY || '';
const ai = apiKey ? new GoogleGenAI({ apiKey }) : null;

const SYSTEM_INSTRUCTION = `You are a friendly, encouraging tutor for a 3rd grader (8-9 years old). 
Keep your answers short, simple, and fun. Use emojis. 
Never give the direct answer immediately; guide the child to think.
`;

export const getRiddle = async (): Promise<string> => {
  if (!ai) return "Why did the cookie go to the hospital? Because he felt crummy! (Add API Key for more!)";

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: "Tell me a fun riddle for a 3rd grader. Just the riddle, don't give the answer yet.",
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
      }
    });
    return response.text || "I couldn't think of a riddle right now!";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Oops! My riddle brain is taking a nap. Try again later!";
  }
};

export const getRiddleAnswer = async (riddle: string): Promise<string> => {
    if (!ai) return "The answer requires an API Key!";
  
    try {
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Here is a riddle: "${riddle}". What is the answer? Explain it simply.`,
        config: {
          systemInstruction: SYSTEM_INSTRUCTION,
        }
      });
      return response.text || "I don't know!";
    } catch (error) {
      return "Error getting answer.";
    }
  };

export const getHint = async (context: string): Promise<string> => {
  if (!ai) return "Try thinking about it differently! (Add API Key for AI hints)";

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `The child is stuck on this puzzle: ${context}. Give a helpful, encouraging hint without giving away the solution completely.`,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
      }
    });
    return response.text || "You can do it! Try looking at the problem from a new angle.";
  } catch (error) {
    return "Keep trying! You're doing great.";
  }
};
