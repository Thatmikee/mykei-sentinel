// src/components/AIValidator.tsx
import { GoogleGenerativeAI } from "@google/generative-ai";
import { useState } from "react";

const genAI = new GoogleGenerativeAI("YOUR_GEMINI_API_KEY");

export const AIValidator = () => {
  const [input, setInput] = useState("");
  const [response, setResponse] = useState("");

  const startValidation = async () => {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const prompt = `You are a Retail Security Consultant for Mykei. A user said: "${input}". 
    Ask them one specific follow-up question about their annual shrinkage or CCTV failure rate to see if they fit our Pilot Program.`;
    
    const result = await model.generateContent(prompt);
    setResponse(result.response.text());
  };

  return (
    <div className="p-6 bg-slate-900/50 backdrop-blur-md rounded-xl border border-white/10">
      <h3 className="text-white font-bold mb-4">AI Pilot Assessment</h3>
      <textarea 
        className="w-full bg-black/40 text-white p-3 rounded"
        placeholder="Tell us about your current security challenges..."
        onChange={(e) => setInput(e.target.value)}
      />
      <button 
        onClick={startValidation}
        className="mt-4 bg-blue-600 hover:bg-blue-500 text-white px-6 py-2 rounded-full transition"
      >
        Start Assessment
      </button>
      {response && <p className="mt-4 text-blue-300 italic">{response}</p>}
    </div>
  );
};
