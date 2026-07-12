import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getTrigExplanation = async (
  angle: number, 
  sin: number, 
  cos: number, 
  tan: number,
  cot: number,
  sec: number,
  csc: number
): Promise<string> => {
  try {
    const prompt = `
      You are a helpful math tutor. Explain the trigonometric properties of an angle of ${angle.toFixed(1)} degrees.
      
      Current values:
      - Sine: ${sin.toFixed(4)}
      - Cosine: ${cos.toFixed(4)}
      - Tangent: ${tan.toFixed(4)}
      - Cosecant: ${csc.toFixed(4)}
      - Secant: ${sec.toFixed(4)}
      - Cotangent: ${cot.toFixed(4)}

      Explain briefly (max 3-4 sentences) the relationships here. 
      Focus on how the reciprocal functions (Csc, Sec, Cot) relate to the primary ones (Sin, Cos, Tan).
      If values are undefined or very large (asymptotes), explain why visually.
      Keep the tone encouraging and simple.
    `;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });

    return response.text || "Could not generate explanation.";
  } catch (error) {
    console.error("Error fetching explanation:", error);
    return "I'm having trouble connecting to the math tutor right now. Try again later!";
  }
};