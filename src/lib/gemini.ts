// src/lib/gemini.ts
import { GoogleGenerativeAI } from "@google/generative-ai";

// Secure this in an .env file later, but for now, let's get it working.
const API_KEY = "AIzaSyBXReBPmN61CmTtfi-ao9_lwmoXwjkZwrU";
const genAI = new GoogleGenerativeAI(API_KEY);

export const analyzeRetailPain = async (userInput: string) => {
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
  
  const prompt = `
    You are a Security Consultant for Mykei Securities. 
    A user said: "${userInput}". 
    Summarize their pain point and ask ONE targeted question about their annual shrinkage cost (£) 
    or the 'Evidence Gap' in their current CCTV setup. 
    Be professional, direct, and authoritative.
  `;

  const result = await model.generateContent(prompt);
  return result.response.text();
};
