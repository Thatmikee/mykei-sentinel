import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI("AIzaSyBXReBPmN61CmTtfi-ao9_lwmoXwjkZwrU");

export const startSentinelAssessment = async (storeContext: string) => {
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
  
  const prompt = `
    You are the Intelligence Core of Mykei Securities. 
    Managing Director Michael Esema has tasked you with assessing a new retail site.
    Context: "${storeContext}". 
    Task: Provide a clinical security analysis. Highlight the 'Evidence Gap' risks. 
    Final Question: Ask for their estimated annual loss to bulk-sweeping to qualify them for our pilot.
  `;

  const result = await model.generateContent(prompt);
  return result.response.text();
};
