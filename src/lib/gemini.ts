import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_KEY ?? "");

export const runIntakeAssessment = async (rawQuery: string) => {
  const query = rawQuery.replace(/["`\\]/g, "").slice(0, 500);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
  const prompt = `You are the Mykei Securities Technical Analyst. A user asks: "${query}".
  Provide a clinical security analysis regarding bulk-sweeping and ask for their monthly shrinkage rate. 
  Maintain a professional, institutional tone.`;

  const result = await model.generateContent(prompt);
  return result.response.text();
};
